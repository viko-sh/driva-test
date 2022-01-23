import React, { Component, ChangeEvent } from "react";
import { DetailsData } from '../../types'
import Joi from "joi"

interface DetailsDataProps {
  machine: any
}

const afterTaxIncomeSchema = {
  income: Joi.number().min(1).required().label('Income Amount'),
  frequency: Joi.string().allow('weekly', 'fortnightly', 'monthly').required().label('Income Frequency'),
}
const employerSchema = {
  name: Joi.string().required().label('Employer Name'),
  years: Joi.number().min(0).max(7).required().label('Employer Years'),
  months: Joi.number().min(0).max(11).required().label('Employer Months')
}
const schema = {
  relationshipStatus: Joi.string().allow('single', 'married', 'divorced').required().label('Relationship Status'),
  afterTaxIncome: Joi.object(afterTaxIncomeSchema).required(),
  occupation: Joi.string().required().label('Occupation'),
  employer: Joi.object(employerSchema).required().or('years', 'months'),
  dependants: Joi.number().min(0).max(10).required().label('Dependants')
}
const fullSchema = Joi.object(schema)

export class DetailsDataFormPart extends Component<DetailsDataProps> {
  constructor(props: DetailsDataProps) {
    super(props)

    this.machine = props.machine
    this.next = this.next.bind(this)
    this.previous = this.previous.bind(this)

    this.relationshipStatusChange = this.relationshipStatusChange.bind(this)
    this.afterTaxIncomeIncomeChange = this.afterTaxIncomeIncomeChange.bind(this)
    this.afterTaxIncomeFrequencyChange = this.afterTaxIncomeFrequencyChange.bind(this)
    this.occupationChange = this.occupationChange.bind(this)
    this.employerNameChange = this.employerNameChange.bind(this)
    this.employerYearsChange = this.employerYearsChange.bind(this)
    this.employerMonthsChange = this.employerMonthsChange.bind(this)
    this.dependantsChange = this.dependantsChange.bind(this)
  }

  machine: any
  state: DetailsData = {
    relationshipStatus: '',
    afterTaxIncome: {
      income: '',
      frequency: 'monthly'
    },
    occupation: '',
    employer: {
      name: '',
      years: 0,
      months: 0
    },
    dependants: 0
  }
  errors: any = {
  }

  next() {
    const { error } = fullSchema.validate(this.state, { abortEarly: false, errors: { wrap: { label: false } } })
    if (error) {
        error.details.forEach(detail => {
          if (detail.path.length > 1) {
            detail.path[1] = (detail.path[1] as string).charAt(0).toUpperCase() + (detail.path[1] as string).slice(1)
          }
          this.errors[detail.path.join('')] = detail.message
        })
        this.setState({})
        return
    }

    this.machine.send('NEXT', { details: this.state })
  }

  previous() {
    this.machine.send('PREVIOUS')
  }

  relationshipStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    const { error } = schema.relationshipStatus.validate(event.target.value, { errors: { wrap: { label: false } } })
    this.errors.relationshipStatus = error?.message

    this.setState({ relationshipStatus: event.target.value });
  }

  afterTaxIncomeIncomeChange(event: ChangeEvent<HTMLInputElement>) {
    const { error } = afterTaxIncomeSchema.income.validate(event.target.value, { errors: { wrap: { label: false } } })
    this.errors.afterTaxIncomeIncome = error?.message

    this.setState({ afterTaxIncome: { ...this.state.afterTaxIncome, income: event.target.value } });
  }

  afterTaxIncomeFrequencyChange(event: ChangeEvent<HTMLSelectElement>) {
    const { error } = afterTaxIncomeSchema.frequency.validate(event.target.value, { errors: { wrap: { label: false } } })
    this.errors.afterTaxIncomeFrequency = error?.message

    this.setState({ afterTaxIncome: { ...this.state.afterTaxIncome, frequency: event.target.value } });
  }

  occupationChange(event: ChangeEvent<HTMLInputElement>) {
    const { error } = schema.occupation.validate(event.target.value, { errors: { wrap: { label: false } } })
    this.errors.occupation = error?.message

    this.setState({ occupation: event.target.value });
  }

  employerNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { error } = employerSchema.name.validate(event.target.value, { errors: { wrap: { label: false } } })
    this.errors.employerName = error?.message

    this.setState({ employer: { ...this.state.employer, name: event.target.value } });
  }

  employerYearsChange(event: ChangeEvent<HTMLSelectElement>) {
    const { error } = employerSchema.years.validate(event.target.value, { errors: { wrap: { label: false } } })
    this.errors.employerYears = error?.message

    this.setState({ employer: { ...this.state.employer, years: event.target.value } });
  }

  employerMonthsChange(event: ChangeEvent<HTMLSelectElement>) {
    const { error } = employerSchema.months.validate(event.target.value, { errors: { wrap: { label: false } } })
    this.errors.employerMonths = error?.message

    this.setState({ employer: { ...this.state.employer, months: event.target.value } });
  }

  dependantsChange(event: ChangeEvent<HTMLInputElement>) {
    const { error } = schema.dependants.validate(event.target.value, { errors: { wrap: { label: false } } })
    this.errors.dependants = error?.message

    this.setState({ dependants: event.target.value });
  }

  render() {
    return (
      <div>
        <h2>A bit more information....</h2>

        <form className="ui form">
          <div className="field">
            <label>Relationship status</label>
            <select className="ui dropdown" value={this.state.relationshipStatus} onChange={this.relationshipStatusChange}>
              <option value=""></option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
            {this.errors['relationshipStatus'] && <div className="ui pointing red label">{this.errors['relationshipStatus']}</div>}
          </div>

          <div className="field">
            <label>After tax income and frequency</label>

            <div className="two fields">
              <div className="field">
                <input type="text" placeholder="After tax income" value={this.state.afterTaxIncome.income} onChange={this.afterTaxIncomeIncomeChange}></input>
                {this.errors['afterTaxIncomeIncome'] && <div className="ui pointing red label">{this.errors['afterTaxIncomeIncome']}</div>}
              </div>
              <div className="field">
                <select name="income-frequency" className="ui dropdown" value={this.state.afterTaxIncome.frequency} onChange={this.afterTaxIncomeFrequencyChange}>
                  <option value="weekly">Weekly</option>
                  <option value="fortnightly">Fortnightly</option>
                  <option value="monthly">Monthly</option>
                </select>
                {this.errors['afterTaxIncomeFrequency'] && <div className="ui pointing red label">{this.errors['afterTaxIncomeFrequency']}</div>}
              </div>
            </div>
          </div>

          <div className="field">
            <label>Occupation</label>
            <input type="text" name="occupation" placeholder="Occupation" value={this.state.occupation} onChange={this.occupationChange}></input>
            {this.errors['occupation'] && <div className="ui pointing red label">{this.errors['occupation']}</div>}
          </div>

          <div className="field">
            <label>Current employer</label>
            <input type="text" name="current-employer" placeholder="Current employer" value={this.state.employer.name} onChange={this.employerNameChange}></input>
            {this.errors['employerName'] && <div className="ui pointing red label">{this.errors['employerName']}</div>}
          </div>

          <div className="field">
            <label>Time in current employment</label>
            <div className="two fields">
              <div className="field">
                <select name="employment-years" className="ui dropdown" value={this.state.employer.years} onChange={this.employerYearsChange}>
                <option value="0">0 years</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5 years</option>
                  <option value="6">6 years</option>
                  <option value="7">7+ years</option>
                </select>
                {this.errors['employerYears'] && <div className="ui pointing red label">{this.errors['employerYears']}</div>}
              </div>
              <div className="field">
                <select name="employment-months" className="ui dropdown" value={this.state.employer.months} onChange={this.employerMonthsChange}>
                  <option value="0">0 months</option>
                  <option value="1">1 month</option>
                  <option value="2">2 months</option>
                  <option value="3">3 months</option>
                  <option value="4">4 months</option>
                  <option value="5">5 months</option>
                  <option value="6">6 months</option>
                  <option value="7">7 months</option>
                  <option value="8">8 months</option>
                  <option value="9">9 months</option>
                  <option value="10">10 months</option>
                  <option value="11">11 months</option>
                </select>
                {this.errors['employerMonths'] && <div className="ui pointing red label">{this.errors['employerMonths']}</div>}
              </div>
            </div>
          </div>

          <div className="field">
            <label>Dependants</label>
            <input type="number" name="dependants" placeholder="dependants" min={0} max={10} value={this.state.dependants} onChange={this.dependantsChange}></input>
            {this.errors['dependants'] && <div className="ui pointing red label">{this.errors['dependants']}</div>}
          </div>
        </form>

        <div className="ui hidden divider"></div>

        <button className="ui button" disabled={!this.machine.current.context.canPrevious} onClick={this.previous}>Prev</button>
        <button className="ui button" disabled={!this.machine.current.context.canNext} onClick={this.next}>Next</button>
      </div>
    );
  }
}
