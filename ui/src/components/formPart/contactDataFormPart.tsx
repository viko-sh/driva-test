import React, { Component, ChangeEvent } from "react";

interface ContactDataProps {
    machine: any
}

interface FormData {
    firstName: string
}

export class ContactDataFormPart extends Component<ContactDataProps> {
    constructor(props: ContactDataProps) {
        super(props)

        console.log('Got machine', props.machine)
        this.machine = props.machine
        this.next = this.next.bind(this)
        this.previous = this.previous.bind(this)
        this.firstNameChange = this.firstNameChange.bind(this)
    }

    machine: any
    state: FormData = {
        firstName: ''
    }

    next() {
        this.machine.send('NEXT', this.state)
    }

    previous() {
        this.machine.send('PREVIOUS')
    }

    firstNameChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({firstName: event.target.value});
    }

    render() {
        return (
            <div>
                <h2 className="ui header">Tell us about yourself</h2>

                <form className="ui form">
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" name="first-name" placeholder="First Name" value={this.state.firstName} onChange={this.firstNameChange}></input>
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
