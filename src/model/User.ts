import mongoose, {Schema, Document} from "mongoose";
import { ICampaign } from "@/model/Campaign";
import { IProduct } from "@/model/Product";
import { IReward } from "@/model/Rewards";
import { ICustomer } from "@/model/Customers";


enum UserRole {
    ADMIN = "admin",
    USER = "user",
};
enum authProviders {
    GOOGLE = "google",
    LOCAL = "local",
};

export interface IUser extends Document {
    fullname?: string;
    username: string;
    email: string;
    password?: string;
    createdAt?: Date;
    role: UserRole;
    isVerified: boolean;
    authProvider: authProviders;
    googleId?: string;
    forgotPasswordToken?: string;
    verifiedToken?: string;
    forgotPasswordTokenExpiry?: Date;
    verifiedTokenExpiry?: Date;
    campaigns?: ICampaign[];
    products?: IProduct[];
    rewards?: IReward[];
    customers?: ICustomer[];
};

const UserSchema: Schema = new Schema({
    fullname: {type: String},
    username: {type: String, required: true, unique: true, trim: true},
    email: {type: String, required: true, unique: true}, match: [/.+\@.+\..+/, "Please fill a valid email address"],
    password: {type: String, match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must contain at least 8 characters, including UPPER/lowercase and numbers"]},
    createdAt: {type: Date},
    role: {type: String, enum: Object.values(UserRole), default: UserRole.USER},
    isVerified: {type: Boolean, default: false},
    authProvider: {type: String, enum: Object.values(authProviders), default: authProviders.LOCAL},
    googleId: {type: String},
    forgotPasswordToken: {type: String},
    verifiedToken: {type: String},
    forgotPasswordTokenExpiry: {type: Date},
    verifiedTokenExpiry: {type: Date},
    campaigns: [{type: Schema.Types.ObjectId, ref: "Campaigns"}],
    products: [{type: Schema.Types.ObjectId, ref: "Producs"}],
    rewards: [{type: Schema.Types.ObjectId, ref: "Rewards"}],
    customers: [{type: Schema.Types.ObjectId, ref: "Customers"}],
},
);

const User =  (mongoose.models.User as mongoose.Model<IUser>) ||  mongoose.model<IUser>("User", UserSchema);
export default User;
