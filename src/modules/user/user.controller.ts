import { Request, Response } from "express";
import { userServices } from "./user.services";
import { zodUserSchema } from "./user.validation";
import { AnyObject } from "mongoose";
import { string } from "zod";

const createUserController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodValidation = zodUserSchema.parse(userData);
    const result = await userServices.createUser(zodValidation);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "user created failed.",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
const getAllUserController = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const getAUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.getAUser(userId as string);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User fatched faild ",
      error: {
        code: 404,
        description: "user not found",
      },
    });
  }
};
const updateAUserController = async (req: Request, res: Response) => {
  try {
    const doc = req.body;
    const { userId } = req.params;
    const result = await userServices.updateAUser(userId as string, doc);

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User updated failed",
      error: {
        code: 404,
        description: "User update failed!",
      },
    });
  }
};

const deleteAUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteAUser(userId as string);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User delete failed",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};
const addNewOrderController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { userId } = req.params;
    const result = await userServices.addNewOrder(userId, data);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "order data insertaion failed",
      error: {
        code: 404,
        description: "user not found",
      },
    });
  }
};

const getAllOrderController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getAllOrder(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "order fetched failed!",
      error: {
        code: 404,
        description: "user not found",
      },
    });
  }
};
const getTotalPriceController=async(req:Request,res:Response)=>{
  try {
    const { userId } = req.params;
    const result = await userServices.getTotalPrice(userId);
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user not found",
      error: {
        code: 404,
        description: "user not found",
      },
    });
  }

}

export const userControllers = {
  createUserController,
  getAllUserController,
  getAUserController,
  updateAUserController,
  deleteAUserController,
  addNewOrderController,
  getAllOrderController,
  getTotalPriceController
};
