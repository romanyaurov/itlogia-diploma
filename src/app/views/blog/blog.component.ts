import { Component, ElementRef, HostListener, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BlogService } from 'src/app/shared/services/blog.service';
import { ArticleCategoryType } from 'src/types/article-category.type';
import { ArticleType } from 'src/types/article.type';
import { ArticlesType } from 'src/types/articles.type';

@Component({
  selector: 'app-blog',
  standalone: false,
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  
  protected categories: ArticleCategoryType[] = [];
  protected isFiltersOpen: WritableSignal<boolean> = signal<boolean>(false);
  protected activeFiltersUrls$: Subject<string[] | undefined> = new Subject();
  protected currentPage: number = 1;
  protected currentPage$: Subject<number> = new Subject();
  protected articlesItems: ArticleType[] = [];
  protected totalArticlesCount: number | null = null;
  protected totalPagesCount: number | null = null;

  @ViewChild(
    'filtersMenu',
    { static: true }
  ) filtersMenu!: ElementRef;

  constructor(
    private blogService: BlogService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    this.initCurrentPage();
    this.initCategories();
    this.subscribeActiveFilters();
    this.subscribeCurrentPage();
    this.subscribeGetArticles();
  }

  protected toggleActiveFilter(category: ArticleCategoryType): void {
    category.isChosen = !category.isChosen;
    this.activeFiltersUrls$.next(
      this.getActiveFilters()?.map(item => item.url)
    );
  }

  protected getActiveFilters(): ArticleCategoryType[] | undefined {
    return this.categories.filter(item => item.isChosen);
  }

  private initCategories(): void {
    const initCategoriesParams = this.route.snapshot.queryParams['categories'];
    this.blogService.getCategories()
      .subscribe({
        next: ((res: ArticleCategoryType[]) => {
          this.categories = res.map(item => ({
            ...item,
            isChosen: initCategoriesParams && 
              initCategoriesParams.includes(item.url)
          }));
        }),
        error: ((err: string) => {
          this.snackBar.open(err);
        })
      });
  }

  private initCurrentPage(): void {
    const currentPage = this.route.snapshot.queryParams['page'];
    if (currentPage) {
      this.currentPage = +currentPage;
    }
  }

  private subscribeActiveFilters(): void {
    this.activeFiltersUrls$.subscribe(filters => {
      this.router.navigate([], {
        queryParams: { categories: filters },
        queryParamsHandling: 'merge'
      });
    });
  }

  private subscribeCurrentPage(): void {
    this.currentPage$.subscribe(page => {
      this.router.navigate([], {
        queryParams: { page: page },
        queryParamsHandling: 'merge'
      });
    })
  }

  private subscribeGetArticles(): void {
    this.route.queryParams.subscribe(params => {
      this.blogService.getArticles(
        params['page'],
        params['categories']
      )
        .subscribe({
          next: ((res: ArticlesType) => {
            if (res.items.length === 0) {
              this.currentPage = 1;
              this.currentPage$.next(this.currentPage);
            } else {
              this.articlesItems = res.items;
              this.totalArticlesCount = res.count;
              this.totalPagesCount = res.pages;
            }
          }),
          error: ((err: string) => {
            this.snackBar.open(err);
          })
        })
    })
  }

  @HostListener('document:click', ['$event'])
  private onClick(event: Event): void {
    if (
      this.filtersMenu && 
      !this.filtersMenu.nativeElement.contains(event.target)
    ) {
      this.isFiltersOpen.set(false);
    }
  }

  protected changePage(page: number | string, event: Event): void {
    if (typeof page === 'number') {
      this.currentPage = page;
    } else if (
      page === 'next' &&
      this.currentPage < this.totalPagesCount!
    ) {
      this.currentPage++;
    } else if (
      page === 'prev' &&
      this.currentPage > 1
    ) {
      this.currentPage--;
    } else {
      event.preventDefault();
      return;
    }
    this.currentPage$.next(this.currentPage);
  }

}
