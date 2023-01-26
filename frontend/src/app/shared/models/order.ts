import { LatLng } from "leaflet";
import { CartItem } from "./cartItem";

export class Order{
  id!:number;
  items!: CartItem[];
  totalPrice!:number;
  name!:string;
  address!:string;
  addressLatLng?: LatLng;
  paymentId!:number;
  createdAt!:string;
  status!:string;
}
