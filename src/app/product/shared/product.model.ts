import { Category } from'../../categories/shared/category.model'

export class Product {
    id:number;
    name:string;
    status:number;
    category_id:number;
    price:number;
    discount:number;
    deleted_at:string;
    created_at:string;
    updated_at:string;
    external_name:string;
    category:Category;
}
