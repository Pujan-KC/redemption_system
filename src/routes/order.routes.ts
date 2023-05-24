import express from "express";
import { addItemToCart, deleteItemFromCart, getCart, updateCartItem } from "../controller/cart.controller";
import { createOrder, getOrder } from "../controller/order.controller";
import { isAuth } from "../middleware/isAuth";
const router = express.Router();


router.post('/',isAuth, createOrder)
router.get('/',isAuth,getOrder)


export default router;
