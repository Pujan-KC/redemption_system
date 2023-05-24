import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { cartEntity } from "./cart.entity";
import { OrderEntity } from "./order.entity";

@Entity({name:'user2'})
export class User2 extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({name: "first_name"})
  firstName!: string;

  @Column({name: "last_name"})
  lastName!: string;

  @Column({length: 15})
  @Index({unique: true})
  phone!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  dob!: Date;

  @CreateDateColumn({name: "created_at"})
  createdAt!: Date;

  @OneToOne(()=> cartEntity, cart => cart.user)
  public cart:cartEntity

  @OneToMany(() => OrderEntity, order=>order.user)
  public orders: OrderEntity[]
  
  // @Column()
  // points!: number;
}
