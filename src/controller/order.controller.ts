import { NextFunction, Response,Request } from "express";
import { getRepository } from "typeorm";
import { OrderEntity } from "../entity/order.entity";
import { cartEntity } from "../entity/cart.entity";
import { OrderItemEntity } from "../entity/order-item.entity";
import { CartItemEntity } from "../entity/cart-items.entity";

export const createOrder = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {shippingDetails} = req.body
        //@ts-ignore
        const id= req.user.id
        // const id= Number(req.query.id)
        console.log({id})
        const cart = await getRepository(cartEntity).findOne({where:{user:{id}},relations:['user']})
        console.log(cart.cartItems)
        if(!cart.cartItems.length){
            return res.status(404).send('There are no Items in the cart')
        }
        
        const newOrder = await getRepository(OrderEntity).save({user:cart.user,shippingDetails:shippingDetails})
        console.log(newOrder)
        await Promise.all(cart.cartItems.map(async(cartItem)=>{
            console.log({cartItem})
           await getRepository(OrderItemEntity).save({...cartItem,order:newOrder})
           await getRepository(CartItemEntity).softDelete(cartItem.id)
        }))
        const orderResponse = await getRepository(OrderEntity).findOne({where:{id:newOrder.id}});
        return res.status(200).send(orderResponse)
    } catch (errr) {
        next(errr)
    }
}

export const getOrder = async(req:Request, res:Response, next:NextFunction) => {
   try {
    //@ts-ignore
    const id= req.user.id
// const id= Number(req.query.id)
    const userOrders =await getRepository(OrderEntity).find({where:{user:{id}}})
    res.status(200).send(userOrders)
   } catch (err) {
    next(err)
   }
}