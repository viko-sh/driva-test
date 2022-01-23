
import { DataAccess } from '../data/mysql'
import { v4 as uuid } from 'uuid'
import { fullSchema } from './validation'

const dataAccess = new DataAccess()

export class QuoteManager {
    async submitInformation(data: any) {
        const { error } = await fullSchema.validateAsync(data)
        if (error) {
            console.error('Failed validation', error)
            throw new Error('ArgumentError, data is incorrect shape')
        }

        console.log('Insert!')
        data.guid = uuid()
        return dataAccess.insert(data)
    }
}