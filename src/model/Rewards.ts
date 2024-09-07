import mongoose, { Schema, Document } from "mongoose";
import { IUser }  from "@/model/User";
import {ICampaign} from "@/model/Campaign";
import {ICustomer} from "@/model/Customers";


export interface IReward extends Document {
    fullName: string;
    email: string;
    reviewPosted: Date;
    user: IUser[];
    campaign: ICampaign[];
    customer: ICustomer[];
  }
  
  const RewardsSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    reviewPosted: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    campaign: [{ type: Schema.Types.ObjectId, ref: "Campaigns" }],
    customer: [{ type: Schema.Types.ObjectId, ref: "Customers" }],
  },
  );
  
  const RewardsModel = (mongoose.models.rewards as mongoose.Model<IReward>) || mongoose.model<IReward>("Rewards", RewardsSchema);
  
  export default RewardsModel;