import { Column, CreatedAt, DataType, DefaultScope, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Optional, UUIDV4 } from "sequelize";

interface QuoteModel {
    quoteId: number
    uuid: string
    status: number
    mobile: string
    email: string
    quoteData: string
    createdAt: Date
}

interface QuoteCreation extends Optional<QuoteModel, 'quoteId'> {}

@DefaultScope(()=>({
    attributes: ['quoteId', 'uuid', 'status', 'mobile', 'email', 'quoteData', 'createdAt']
}))
@Table({tableName:'quotes'})
export default class Quote extends Model<QuoteModel, QuoteCreation> {   
    @PrimaryKey
    @Column({field: 'quote_id', type: DataType.BIGINT})
    quoteId: number

    @Column({type: DataType.UUIDV4, defaultValue: UUIDV4})
    uuid?: string

    @Column({type: DataType.TINYINT})
    status?: number

    @Column
    mobile?: string

    @Column
    email?: string

    @Column({field: 'quote_data', type: DataType.JSON})
    quoteData: string

    @Column({field: 'created_at', type: DataType.TIME})
    createdAt?: Date
}