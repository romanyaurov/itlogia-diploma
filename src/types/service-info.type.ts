import { OrderServicesEnum } from "./order-services.enum"

export type ServiceInfoType = {
    title: OrderServicesEnum,
    description: string,
    price: number,
    img: string
}