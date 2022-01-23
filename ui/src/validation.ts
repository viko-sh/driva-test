import * as Joi from 'joi'

// Pretend that this schema is shared with the UI and server
export const contactSchema = {
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    mobileNumber: Joi.string().required().label('Mobile Number'),
    email: Joi.string()/*.email({ tlds: { allow: ['COM'] } })*/.required().label('Email')
}
export const fullContactSchema = Joi.object(contactSchema)

export const afterTaxIncomeSchema = {
    income: Joi.number().min(1).required().label('Income Amount'),
    frequency: Joi.string().valid('weekly', 'fortnightly', 'monthly', 'yearly').required().label('Income Frequency'),
}

export const employerSchema = {
    name: Joi.string().required().label('Employer Name'),
    years: Joi.number().min(0).max(7).required().label('Employer Years'),
    months: Joi.number().min(0).max(11).required().label('Employer Months')
}

export const detailsSchema = {
    relationshipStatus: Joi.string().valid('single', 'married', 'divorced').required().label('Relationship Status'),
    afterTaxIncome: Joi.object(afterTaxIncomeSchema).required(),
    occupation: Joi.string().required().label('Occupation'),
    employer: Joi.object(employerSchema).required().or('years', 'months'),
    dependants: Joi.number().min(0).max(10).required().label('Dependants')
}
export const fullDetailsSchema = Joi.object(detailsSchema)

export const fullSchema = Joi.object({
    contact: Joi.object(contactSchema).required(),
    details: Joi.object(detailsSchema).required()
}).required()