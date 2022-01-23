import React, { Component, ChangeEvent } from "react";
import { threadId } from "worker_threads";
import { DetailsData } from '../../types'

interface DetailsDataProps {
  machine: any
}

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
      income: '0',
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

  next() {
    this.machine.send('NEXT', { details: this.state })
  }

  previous() {
    this.machine.send('PREVIOUS')
  }

  relationshipStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({ relationshipStatus: event.target.value });
  }

  afterTaxIncomeIncomeChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ afterTaxIncome: { ...this.state.afterTaxIncome, income: event.target.value } });
  }

  afterTaxIncomeFrequencyChange(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({ afterTaxIncome: { ...this.state.afterTaxIncome, frequency: event.target.value } });
  }

  occupationChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ occupation: event.target.value });
  }

  employerNameChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ employer: { ...this.state.employer, name: event.target.value } });
  }

  employerYearsChange(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({ employer: { ...this.state.employer, years: event.target.value } });
  }

  employerMonthsChange(event: ChangeEvent<HTMLSelectElement>) {
    this.setState({ employer: { ...this.state.employer, months: event.target.value } });
  }

  dependantsChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ dependants: event.target.value });
  }

  render() {
    return (
      <div>
        <h2>A bit more information....</h2>

        <form className="ui form">
          <div className="field">
            <label>Relationship status</label>
            <select name="relationship-status" className="ui dropdown" value={this.state.relationshipStatus} onChange={this.relationshipStatusChange}>
              <option value=""></option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>

          <div className="field">
            <label>After tax income and frequency</label>

            <div className="two fields">
              <div className="field">
                <input type="text" name="income-aftertax" placeholder="After tax income" value={this.state.afterTaxIncome.income} onChange={this.afterTaxIncomeIncomeChange}></input>
              </div>
              <div className="field">
                <select name="income-frequency" className="ui dropdown" value={this.state.afterTaxIncome.frequency} onChange={this.afterTaxIncomeFrequencyChange}>
                  <option value="weekly">Weekly</option>
                  <option value="fortnightly">Fortnightly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label>Occupation</label>
            <input type="text" name="occupation" placeholder="Occupation" value={this.state.occupation} onChange={this.occupationChange}></input>
          </div>

          <div className="field">
            <label>Current employer</label>
            <input type="text" name="current-employer" placeholder="Current employer" value={this.state.employer.name} onChange={this.employerNameChange}></input>
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
                  <option value="7+">7+ years</option>
                </select>
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
              </div>
            </div>
          </div>

          <div className="field">
            <label>Dependants</label>
            <input type="number" name="dependants" placeholder="dependants" min={0} max={10} value={this.state.dependants} onChange={this.dependantsChange}></input>
          </div>
        </form>

        <div className="ui hidden divider"></div>

        <button className="ui button" disabled={!this.machine.current.context.canPrevious} onClick={this.previous}>Prev</button>
        <button className="ui button" disabled={!this.machine.current.context.canNext} onClick={this.next}>Next</button>

        <pre style={{ textAlign: "left" }}>
          {JSON.stringify(
            { state: this.state },
            null,
            2
          )}
        </pre>
      </div>
    );
  }
}
