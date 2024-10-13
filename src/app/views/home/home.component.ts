import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicesConfig } from 'src/app/core/configs/services.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaticImagePathPipe } from 'src/app/shared/pipes/static-image-path.pipe';
import { ArticleType } from 'src/types/article.type';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleCardComponent } from 'src/app/shared/components/article-card/article-card.component';
import { SvgIconComponent } from 'src/app/shared/components/common/svg-icon/svg-icon.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ReviewCardComponent } from 'src/app/shared/components/review-card/review-card.component';
import { SlideInfoType } from 'src/types/slide-info.type';
import { ServiceCardComponent } from 'src/app/shared/components/service-card/service-card.component';
import { SlideComponent } from 'src/app/shared/components/slide/slide.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    NgbCarouselModule,
    StaticImagePathPipe,
    ArticleCardComponent,
    SvgIconComponent,
    CarouselModule,
    ReviewCardComponent,
    NgbCarouselModule,
    ServiceCardComponent,
    SlideComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ServicesConfig]
})
export class HomeComponent implements OnInit {

  protected slides!: SlideInfoType[];
  protected advantagesData: { caption: string, text: string }[] = [];
  protected popularArticles: ArticleType[] = [];
  protected reviews: { image: string, name: string, review: string }[] = [];

  customOptions: OwlOptions = {
    items: 3,
    skip_validateItems: true,
    loop: true,
    dots: false,
    nav: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplaySpeed: 1000,
    margin: 24
  }

  constructor(
    private http: HttpClient,
    private articlesService: ArticlesService,
    private snackBar: MatSnackBar,
    protected services: ServicesConfig
  ) { }

  ngOnInit(): void {
    this.loadSlidesData()
      .subscribe(res => { this.slides = res })

    this.loadAdvantagesData()
      .subscribe(res => { this.advantagesData = res.items });

    this.articlesService.getPopularArticles()
      .subscribe({
        next: (res: ArticleType[]) => { this.popularArticles = res },
        error: (err: string) => { this.snackBar.open(err) }
      });

    this.loadReviewsData()
      .subscribe(res => { this.reviews = res.reviews });
  }

  private loadAdvantagesData(): Observable<{
    items: {caption: string, text: string}[]
  }> {
    return this.http.get<{items: {caption: string, text: string}[]}>(
      './assets/jsons/about-advantages.json'
    );
  }

  private loadReviewsData(): Observable<{
    reviews: {image: string, name: string, review: string}[]
  }> {
    return this.http.get<{
      reviews: {image: string, name: string, review: string}[]
    }>(
      './assets/jsons/reviews.json'
    );
  }

  private loadSlidesData(): Observable<SlideInfoType[]> {
    return this.http.get<SlideInfoType[]>(
      './assets/jsons/slides-info.json'
    );
  }
}
