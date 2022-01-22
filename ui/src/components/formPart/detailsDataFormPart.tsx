import React, { Component } from "react";

export class DetailsDataFormPart extends Component {
  render() {
    return (
      <div>
        <h2>A bit more information....</h2>

        <form className="ui form">
          <div className="field">
            <label>Relationship status</label>
            <select name="relationship-status" className="ui dropdown">
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
                <input type="text" name="income-aftertax" placeholder="After tax income"></input>
              </div>
              <div className="field">
                <select name="income-frequency" className="ui dropdown">
                  <option value="weekly">Weekly</option>
                  <option value="fortnightly">Fortnightly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label>Occupation</label>
            <input type="text" name="occupation" placeholder="Occupation"></input>
          </div>

          <div className="field">
            <label>Current employer</label>
            <input type="text" name="current-employer" placeholder="Current employer"></input>
          </div>

          <div className="field">
            <label>Time in current employment</label>
            <div className="two fields">
              <div className="field">
                <select name="employment-years" className="ui dropdown">
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
                <select name="employment-months" className="ui dropdown">
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
            <input type="number" name="dependants" placeholder="dependants" min={0} max={10}></input>
          </div>
        </form>
      </div>
    );
  }
}
