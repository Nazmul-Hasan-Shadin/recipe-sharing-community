import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    bio: {
      Type: String,
    },
    followers: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      required: true,
      enum: ["active", "block"],
    },
    passwordChangeAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt));
  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
});

//  check is user exist

userSchema.statics.isUserExist = async function (id: string) {
  return await User.findOne({ id }).select("+password");
};

userSchema.virtual("totalFollowers").get(function () {
  return `${this.followers.length}`;
});

export const User = model<TUser, UserModel>("User", userSchema);
