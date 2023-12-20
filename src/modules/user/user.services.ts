import mongoose from "mongoose";
import { UserModel } from "./user.model";

const createUser = async (data: any) => {
  const user = new UserModel(data);
  if (await user.isUserExist(data.userId)) {
    throw new Error("User already exist");
  }
  const result = user.save();

  return result;
};

const getAllUser = async () => {
  const result = await UserModel.find({}).select(
    "userName fullName age email address -_id -password"
  );
  return result;
};

const getAUser = async (id: string) => {
  const result = await UserModel.findOne({ _id: id }).select("-password");

  return result;
};

const updateAUser = async (id: string, doc: any) => {
  const result = await UserModel.updateOne({ _id: id }, { $set: doc }).select(
    "-password"
  );
  if (result.modifiedCount > 0) {
    return result;
  } else {
    throw new Error("user data update failed!");
  }
};

const deleteAUser = async (id: string) => {
  const result = await UserModel.deleteOne({ _id: id }).select("-password");
  if (result.deletedCount > 0) {
    return result;
  } else {
    return {
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    };
  }
};

const addNewOrder = async (id: string, doc: any) => {
  const result = await UserModel.updateOne(
    { _id: id },
    { $push: { orders: doc } },
    { upsert: true }
  );

  return result;
};
const getAllOrder = async (id: string) => {
  const result = await UserModel.findOne({ _id: id }).select("orders -_id");
  return result;
};

const getTotalPrice = async (id: string) => {
  const result = await UserModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $addFields: {
        totalPrice: {
          $sum: {
            $map: {
              input: "$orders",
              as: "order",
              in: { $multiply: ["$$order.price", "$$order.quantity"] },
            },
          },
        },
      },
    },
    {$project:{"totalPrice":1, "_id":0}}
  ]);

  return result;
};

export const userServices = {
  createUser,
  getAllUser,
  getAUser,
  updateAUser,
  deleteAUser,
  addNewOrder,
  getAllOrder,
  getTotalPrice,
};
