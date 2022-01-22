import React, { Component } from "react";

export class ContactDataFormPart extends Component {
    render() {
        return (
            <div>
                <h2>Tell us about yourself</h2>

                <form className="ui form">
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" name="first-name" placeholder="First Name"></input>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" name="last-name" placeholder="Last Name"></input>
                    </div>
                    <div className="field">
                        <label>Mobile Number</label>
                        <input type="text" name="mobile-number" placeholder="Mobile Number"></input>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email-address" placeholder="Email"></input>
                    </div>
                </form>
            </div>
        );
    }
}
