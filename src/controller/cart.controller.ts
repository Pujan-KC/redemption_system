import {NextFunction, Request, Response} from "express";
import { getRepository } from "typeorm";
import { User2 } from "../entity/user2.entity";
import { cartEntity } from "../entity/cart.entity";
import { CartItemEntity } from "../entity/cart-items.entity";


export const getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
      const { id } = request.user
      // const id= Number(req.query.id)

    const registeredUser = await getRepository(User2).findOne({where:{id}})
    let cart:cartEntity
     cart = await getRepository(cartEntity).findOne({where:{user:{id}}})
    if(!cart){
      const  newCart = await getRepository(cartEntity).save({user:registeredUser})
      cart = await getRepository(cartEntity).findOne({where:{user:{id}}})
    }
      res.status(418).send(cart);
    } catch (err: any) {
      next(err);
    }
  };

  export const addItemToCart = async (req:Request, res: Response, next: NextFunction) => {
    try {
      // const id= Number(req.query.id)
      //@ts-ignore
      const id= req.user.id
      const { name, sku, points, quantity, image_link} = req.body
      const checkItem = await getRepository(CartItemEntity).findOne({where:{sku}})
      if(checkItem){
        checkItem.quantity += quantity
        await getRepository(CartItemEntity).save(checkItem)
      }else {
        const cart = await getRepository(cartEntity).findOne({where:{user:{id}}})
        const addItemResult = await getRepository(CartItemEntity).save({name,sku,points,quantity,image_link,cart})
        console.log(addItemResult)
      }
     const updatedCart = await getRepository(cartEntity).findOne({where:{user:{id}}})
     console.log(updatedCart)
      return res.status(418).send(updatedCart)
     
      
    } catch (err : any) {
      next(err)
      
    }
  }
  
  export const updateCartItem = async (req:Request, res:Response, next: NextFunction) => {
    try {
      //@ts-ignore
      // const id = Number(req.query.id)
      const id= req.user.id
      const {quantity, sku} = req.body
      console.log({quantity,sku})
      const existingCartItem = await getRepository(CartItemEntity).findOne({where:{sku,cart:{user:{id}}}})
      if(!existingCartItem){
        return res.status(418).send('Item Not Found')
      }
      quantity ? existingCartItem.quantity = quantity : existingCartItem.quantity+=1;
      await getRepository(CartItemEntity).save(existingCartItem)
      const updatedCart = await getRepository(cartEntity).findOne({where:{user:{id}}})
      console.log(updatedCart)
       return res.status(418).send(updatedCart)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  export const deleteItemFromCart = async (req:Request, res:Response, next:NextFunction) => {
    //@ts-ignore
    const id= req.user.id

    const itemId = req.params.id
    await getRepository(CartItemEntity).delete(id)
    const updatedCart = await getRepository(cartEntity).findOne({where:{user:{id}}})
    console.log(updatedCart)
     return res.status(418).send(updatedCart)
  }