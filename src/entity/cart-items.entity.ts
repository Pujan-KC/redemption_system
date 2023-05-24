import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { GenerealInformation } from "./general-information.entity";
import { cartEntity } from "./cart.entity";

@Entity('cart_item')
export class CartItemEntity extends GenerealInformation {
    @Column('varchar')
    public name:string

    @Column('varchar')
    public sku: string

    @Column('bigint')
    public points: number

    @Column('int')
    public quantity:number

    @Column('varchar')
    public image_link: string

    @ManyToOne(() => cartEntity, cart => cart.cartItems)
    @JoinColumn({name:'cart_id'})
    public cart: cartEntity

    public total:number
    
    @AfterLoad()
    public getTotal(){
        this.points = Number(this.points)
         this.total = this.points * this.quantity
    }
}