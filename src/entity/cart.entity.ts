import { AfterLoad, Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { GenerealInformation } from "./general-information.entity";
import { User2 } from "./user2.entity";
import { CartItemEntity } from "./cart-items.entity";

@Entity('cart')
export class cartEntity extends GenerealInformation {
    @OneToOne(() => User2, user => user.cart,{eager:false})
    @JoinColumn({name:'user_id',})
    public user:User2

    @OneToMany(() => CartItemEntity, cartItem => cartItem.cart, {eager:true})
    public cartItems: CartItemEntity[]

    // public subTotal: number
    // public tdsPoints:number
    // public tdsValue:number
    public totalPointsDeduction:number
    public balancePoints:number
    public grandTotal:number=0
    public itemCount
    // public remainingPoints:number

    @AfterLoad()
    public generateValues(){
        this.grandTotal = this.cartItems.reduce((prev,current) => { return prev + current.total },0);
        this.itemCount = this.cartItems.length
        // this.tdsPoints = this.subTotal * 0.1;
        // this.totalPointsDeduction = this.subTotal + this.tdsPoints
    }
}