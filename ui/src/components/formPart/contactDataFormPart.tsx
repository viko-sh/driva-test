import React, { Component, ChangeEvent } from "react";
import { ContactData } from '../../types'

interface ContactDataProps {
    machine: any
}

export class ContactDataFormPart extends Component<ContactDataProps> {
    constructor(props: ContactDataProps) {
        super(props)

        console.log('Got machine', props.machine)
        this.machine = props.machine
        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)

        this.firstNameChange = this.firstNameChange.bind(this)
        this.lastNameChange = this.lastNameChange.bind(this)
        this.mobileNumberChange = this.mobileNumberChange.bind(this)
        this.emailChange = this.emailChange.bind(this)
    }

    machine: any
    state: ContactData = {
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: ''
    }

    next() {
        this.machine.send('NEXT', { contact: this.state })
    }

    previous() {
        this.machine.send('PREVIOUS')
    }

    firstNameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({firstName: event.target.value});
    }

    lastNameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({lastName: event.target.value});
    }

    mobileNumberChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({mobileNumber: event.target.value});
    }

    emailChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({email: event.target.value});
    }

    render() {
        return (
            <div>
                <h2 className="ui header">Tell us about yourself</h2>

                <form className="ui form">
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.firstNameChange}></input>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.lastNameChange}></input>
                    </div>
                    <div className="field">
                        <label>Mobile Number</label>
                        <input type="text" placeholder="Mobile Number" value={this.state.mobileNumber} onChange={this.mobileNumberChange}></input>
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" placeholder="Email" value={this.state.email} onChange={this.emailChange}></input>
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
