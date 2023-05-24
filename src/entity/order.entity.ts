import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { GenerealInformation } from "./general-information.entity";
import { User2 } from "./user2.entity";
import { CartItemEntity } from "./cart-items.entity";
import { OrderItemEntity } from "./order-item.entity";
import { OrderStatus, ShippingDetails } from "../../data/order.data";

@Entity('order')
export class OrderEntity extends GenerealInformation {
    @Column('enum', {enum:OrderStatus,enumName:'order_status_enum', default:OrderStatus.submitted})
    public status: OrderStatus

    @ManyToOne(() => User2, user => user.id)
    @JoinColumn({name:'user_id'})
    public user:User2

    @OneToMany(() => OrderItemEntity, orderItem => orderItem.order, {eager:true})
    public orderItems: OrderItemEntity[]

    @Column('jsonb',{name:'shipping_details'})
    public shippingDetails: ShippingDetails

    public subTotal: number
    // public tdsPoints:number
    // public tdsValue:number
    public totalPointsDeduction:number
    public balancePoints:number
    public grandTotal:number
    // public remainingPoints:number

    @AfterLoad()
    public generateValues(){
        this.subTotal = this.orderItems.reduce((prev,current) => { return prev + current.total },0);
        // this.tdsPoints = this.subTotal * 0.1;
        // this.totalPointsDeduction = this.subTotal + this.tdsPoints
    }
}