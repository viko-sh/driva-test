import React, { Component } from "react";

export class FailedFormPart extends Component {
  render() {
    return (
      <div>
        <h2>Oh dear, your information failed to submit to our system for review.</h2>

        <button className="ui button">Retry</button>
      </div>
    );
  }
}
