import { Model } from "mongoose";

type TFullName = {
  firstName: string;
  lastName: string;
};

type TAddress = {
  street: string;
  city: string;
  country: string;
};
export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};

interface IUser {
  userId: number;
  userName: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders: TOrders[];
}

export default IUser;

export type TUserMethod  ={
  isUserExist(userId: number ): Promise<IUser>;
};

export type TUserModel = Model<IUser, {},TUserMethod>;
