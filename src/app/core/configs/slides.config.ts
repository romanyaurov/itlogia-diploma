import { Injectable } from "@angular/core";
import { SlideInfoType } from "src/types/slide-info.type";

@Injectable()
export class SlideConfig {

    private slideConfig: SlideInfoType[] = [
        {
            preTitle: 'Предложение месяца',
            title: 'Продвижение в Instagram для вашего бизнеса <span>-15%</span>!',
            img: 'slide-1'
        },
        {
            preTitle: 'Акция',
            title: 'Нужен грамотный <span>копирайтер</span>?',
            subTitle: 'Весь декабрь у нас действует акция<br>на работу копирайтера.',
            img: 'slide-2'
        },
        {
            preTitle: 'Новость дня',
            title: '<span>6 место</span> в ТОП-10<br>SMM-агенств Москвы!',
            subTitle: 'Мы благодарим каждого, кто<br>голосовал за нас!',
            img: 'slide-3'
        },
    ]

    get items(): SlideInfoType[] {
        return this.slideConfig;
    }

}