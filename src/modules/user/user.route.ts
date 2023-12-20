import express from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

router.post("/api/users", userControllers.createUserController);
router.get('/api/users',userControllers.getAllUserController);
router.get('/api/users/:userId',userControllers.getAUserController);
router.put('/api/users/:userId',userControllers.updateAUserController);
router.delete('/api/users/:userId',userControllers.deleteAUserController);
router.put('/api/users/:userId/orders',userControllers.addNewOrderController)
router.get('/api/users/:userId/orders',userControllers.getAllOrderController);
router.get('/api/users/:userId/orders/total-price',userControllers.getTotalPriceController)

export const UserRoute=router
