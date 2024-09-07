import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "@/model/Product";
import { IUser }  from "@/model/User";

export enum CampaignType {
  AMZN_GIFT_CARD = "Amazon Gift Card",
  DISCOUNT_CODE = "Discount Code",
  FREE_PRODUCT = "Free Product",
  DIGITAL_PRODUCT = "Digital Product",
}

export enum Marketplaces {
  INDIA = "amazon.in",
  USA = "amazon.com",
  UK = "amazon.co.uk",
  CANADA = "amazon.ca",
  GERMANY = "amazon.de",
  FRANCE = "amazon.fr",
  ITALY = "amazon.it",
  SPAIN = "amazon.es",
  JAPAN = "amazon.co.jp",
  AUSTRALIA = "amazon.com.au",
  MEXICO = "amazon.com.mx",
  BRAZIL = "amazon.com.br",
  NETHERLANDS = "amazon.nl",
  SINGAPORE = "amazon.sg",
  TURKEY = "amazon.com.tr",
  UAE = "amazon.ae",
  SAUDI_ARABIA = "amazon.sa",
}

export interface ICampaign extends Document {
  campaignName: string;
  campaignType: CampaignType;
  isCampaignAmazon: boolean;
  createdAt: Date;
  campaignDescription: string;
  marketplace: Marketplaces;
  products: IProduct[];
  user: IUser;
}

const CampaignSchema: Schema = new Schema({
  campaignName: { type: String, required: true },
  campaignType: {
    type: String,
    required: true,
    enum: Object.values(CampaignType),
  },
  isCampaignAmazon: { type: Boolean, required: true },
  createdAt: { type: Date },
  campaignDescription: { type: String },
  marketplace: {
    type: String,
    required: true,
    enum: Object.values(Marketplaces),
  },
  products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  user: { type: Schema.Types.ObjectId, ref: "Users" },
},
);

const CampaignModel =
  (mongoose.models.campaign as mongoose.Model<ICampaign>) ||
  mongoose.model<ICampaign>("Campaigns", CampaignSchema);

export default CampaignModel; 
