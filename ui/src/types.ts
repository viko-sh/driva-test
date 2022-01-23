export interface ContactData {
    firstName: string
    lastName: string
    mobileNumber: string
    email: string
}

export interface IncomeData {
    income: string
    frequency: string
}

export interface EmployerData {
    name: string
    years: number
    months: number
}

export interface DetailsData {
    relationshipStatus: string
    afterTaxIncome: IncomeData
    occupation: string
    employer: EmployerData
    dependants: number
}
