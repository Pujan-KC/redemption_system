import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { GenerealInformation } from "./general-information.entity";
import { cartEntity } from "./cart.entity";
import { OrderEntity } from "./order.entity";

@Entity('order_item')
export class OrderItemEntity extends GenerealInformation {
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

    @ManyToOne(() => OrderEntity, order => order.orderItems)
    @JoinColumn({name:'order_id'})
    public order: OrderEntity

    public total:number
    @AfterLoad()
    public getTotal(){
        return this.total = this.points * this.quantity
    }
}