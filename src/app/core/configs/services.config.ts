import { Injectable } from "@angular/core";
import { OrderServicesEnum } from "src/types/order-services.enum";
import { ServiceInfoType } from "src/types/service-info.type";

@Injectable()
export class ServicesConfig {

    private serviceItems: ServiceInfoType[] = [
        {
            title: OrderServicesEnum.siteCreation,
            description: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
            price: 7500,
            img: 'service-img-1'
        },
        {
            title: OrderServicesEnum.promotion,
            description: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
            price: 3500,
            img: 'service-img-2'
        },
        {
            title: OrderServicesEnum.advertisement,
            description: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
            price: 1000,
            img: 'service-img-3'
        },
        {
            title: OrderServicesEnum.copywriting,
            description: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
            price: 750,
            img: 'service-img-4'
        },
    ]

    get items(): ServiceInfoType[] {
        return this.serviceItems;
    }

}