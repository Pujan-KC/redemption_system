import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class GenerealInformation extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    public id:string
    
    @CreateDateColumn({name:'created_at'})
    public createdAt: Date

    @UpdateDateColumn({name:'updated_at'})
    public updatedAt: Date

    @DeleteDateColumn({name:'deleted_at', select:false})
    public deletedAt: Date
}