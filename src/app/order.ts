import { Product } from './product';
export interface Order {
    id : string,
    customerId : string,
    products : Product[],
    price : number,
    address : string,
    phoneNumber : string,
    orderTime : Date
}
