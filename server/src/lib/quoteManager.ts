import * as Joi from 'joi'
import { DataAccess } from '../data/mysql'
import { v4 as uuid } from 'uuid'

const dataAccess = new DataAccess()

// Pretend that this schema is shared with the UI
const contactSchema = {
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    mobileNumber: Joi.string().required().label('Mobile Number'),
    email: Joi.string()/*.email({ tlds: { allow: ['COM'] } })*/.required().label('Email')
}
const afterTaxIncomeSchema = {
    income: Joi.number().min(1).required().label('Income Amount'),
    frequency: Joi.string().valid('weekly', 'fortnightly', 'monthly', 'yearly').required().label('Income Frequency'),
  }
  const employerSchema = {
    name: Joi.string().required().label('Employer Name'),
    years: Joi.number().min(0).max(7).required().label('Employer Years'),
    months: Joi.number().min(0).max(11).required().label('Employer Months')
  }
  const detailsSchema = {
    relationshipStatus: Joi.string().valid('single', 'married', 'divorced').required().label('Relationship Status'),
    afterTaxIncome: Joi.object(afterTaxIncomeSchema).required(),
    occupation: Joi.string().required().label('Occupation'),
    employer: Joi.object(employerSchema).required().or('years', 'months'),
    dependants: Joi.number().min(0).max(10).required().label('Dependants')
  }
const fullSchema = Joi.object({
    contact: Joi.object(contactSchema).required(),
    details: Joi.object(detailsSchema).required()
}).required()

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