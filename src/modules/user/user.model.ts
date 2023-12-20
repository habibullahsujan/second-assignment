import mongoose, { Schema } from "mongoose";
import IUser, { TOrders, TUserMethod, TUserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const orderSchema = new Schema<TOrders>({
  productName: { type: String, requird: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const userSchema = new Schema<IUser, TUserMethod, TUserModel>({
  userId: {
    type: Number,
    required: [true, "user id is required"],
  },
  userName: {
    type: String,
    required: [true, "user name is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  fullName: {
    firstName: String,
    lastName: String,
  },
  age: Number,
  email: {
    type: String,
    required: [true, "email is required"],
  },
  isActive: Boolean,
  hobbies: {
    type: [String],
  },
  address: {
    street: String,
    city: String,
    country: String,
  },
  orders: {
    type: [orderSchema],
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();

});
userSchema.post("save", function (data, next) {
  data.password = "";
  next()
});

userSchema.methods.isUserExist = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

export const UserModel = mongoose.model<IUser, TUserModel>("User", userSchema);
