import express from "express";
import { addItemToCart, deleteItemFromCart, getCart, updateCartItem } from "../controller/cart.controller";
import { isAuth } from "../middleware/isAuth";
const router = express.Router();

// router.post("/register", validateRegisterSchema, registerHandler);
// router.post("/login", validateLoginSchema, loginHandler);
router.get('/get',isAuth, getCart)
router.post('/item',isAuth, addItemToCart)
router.put('/item',isAuth,updateCartItem)
router.delete('/item/:id',isAuth, deleteItemFromCart)

export default router;
