// export interface Product {
//     id: string,
//     title: string,
//     description?: string,
//     image: string,
//     price: number,
//     stock: number,
//     slug: string,
//     category: string,
//     createdAt?: string,
//     updatedAt?: string
// }

export interface Product{
    id:string,
    name:string
    image?:string | null,
    slug:string,
    description?:string | null,
    price?:number | null,
    salePrice?:number | null,
    stock?:number | null,
    productImage:ProductImage[],
    keyWords:KeyWord[],
    categories:Category[],
    variations?:ProductVariation[] | null,
    reviews?:Review[] | null,
    wishLists?:Wishlist[] | null,
    cartItems?:CartItem[] | null,
    orderItem?:OrderItem[] | null,
    createdAt?:string,
    updatedAt?:string,
    isActive?:boolean
  }

  export interface ProductImage{
    id:string,
    link:string,
    slug:string,
    productId:string
  }


  export interface ProductVariation{
    id:string,
    productId:string,
    image:string,
    variation:string,
    value:string,
    additionalPrice:number
  }

  export interface Category{
    id:string,
    name:string,
    slug:string,
    description:string,
    products:Product[],
    createdAt?:string,
    updatedAt?:string
    isActive?:boolean
  }

  export interface Review{

  }
  
  export interface Wishlist{

  }
  export interface CartItem{

  }
  export interface OrderItem{

  }

  export interface KeyWord {
    id:string,
    name:string,
  }

  export enum VariationType{
    "COLOR",
    "SIZE",
    "MATERIAL"
  }