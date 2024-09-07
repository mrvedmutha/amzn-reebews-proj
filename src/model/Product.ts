import mongoose, { Schema, Document } from "mongoose";
import { IUser }  from "@/model/User";

export enum Currencies {
    INDIA = "INR",         
    USA = "USD",           
    UK = "GBP",            
    CANADA = "CAD",         
    GERMANY = "EUR",        
    FRANCE = "EUR",        
    ITALY = "EUR",        
    SPAIN = "EUR",         
    JAPAN = "JPY",          
    AUSTRALIA = "AUD",      
    MEXICO = "MXN",        
    BRAZIL = "BRL",        
    NETHERLANDS = "EUR",   
    SINGAPORE = "SGD",     
    TURKEY = "TRY",        
    UAE = "AED",            
    SAUDI_ARABIA = "SAR",  
  }
export interface IProduct extends Document {
  asin: string;
  sku: string;
  productName: string;
  productSoldOnAmazon: boolean;
  productLink: string;
  price: number;
  currency: Currencies;
  user: IUser;
}

const productSchema: Schema = new Schema({
  asin: { type: String, match: /^B[0-9A-Z]{9}$/ },
  sku: {type: String, required: true},
  productName: { type: String, required: true },
  productSoldOnAmazon: { type: Boolean, required: true },
  price: { type: Number, required: true },
  currency: {
        type: String,
        required: true,
        enum: Object.values(Currencies),
    },
  productLink: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "Users" },
});


const productModel =
  mongoose.models.products ||
  mongoose.model<IProduct>("Products", productSchema);

export default productModel;
