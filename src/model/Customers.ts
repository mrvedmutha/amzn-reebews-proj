import mongoose, { Schema, Document } from "mongoose";
import { IUser }  from "@/model/User";
import { ICampaign } from "@/model/Campaign";

export interface ICustomer extends Document {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    amazonOrderID: string;
    rating: number;
    isProductUsedSevenDays: boolean;
    reviewComment: string;
    reviewPosted: Date;
    user: IUser[];
    campaign: ICampaign[];
};

const CustomerSchema: Schema = new Schema({
    fullName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    phone: { type: String, required: true },
    amazonOrderID: { type: String, match: /^\d{3}-\d{7}-\d{7}$/ },
    rating: { type: Number, required: true },
    isProductUsedSevenDays: { type: Boolean, required: true },
    reviewComment: { type: String },
    address: { type: String },
    reviewPosted: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    campaign: [{ type: Schema.Types.ObjectId, ref: "Campaigns" }],
},
);

const CustomerModel = (mongoose.models.customers as mongoose.Model<ICustomer>) || mongoose.model<ICustomer>("Customers", CustomerSchema);
export default CustomerModel;