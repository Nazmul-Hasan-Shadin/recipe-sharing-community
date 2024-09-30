import  { Model, Types } from "mongoose";

export interface TUser {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  isPremium: boolean;
  premiumExpiryDate?: Date;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  role: "admin" | "user";
  status: "block" | "active";
  registeredAt: Date;
  passwordChangeAt:Date
}

export interface UserModel extends Model<TUser> {
  isUserExist(id: string): Promise<TUser>;
  
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> ;
  isJwtIssuedBeforePasswordChanged(passwordChangedTime:Date,JwtIssuedTime:number):boolean
}

