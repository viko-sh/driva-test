import React, { Component, ChangeEvent } from "react";
import { ContactData } from '../../types'
import Joi from "joi"

interface ContactDataProps {
    machine: any
}

const schema = {
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    mobileNumber: Joi.string().required().label('Mobile Number'),
    email: Joi.string()/*.email({ tlds: { allow: ['COM'] } })*/.required().label('Email')
}
const fullSchema = Joi.object(schema)

export class ContactDataFormPart extends Component<ContactDataProps> {
    constructor(props: ContactDataProps) {
        super(props)

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
    errors: any = {
    }

    next() {
        const { error } = fullSchema.validate(this.state, { abortEarly: false, errors: { wrap: { label: false } } })
        if (error) {
            error.details.forEach(detail => {
                this.errors[detail.path[0]] = detail.message
            })
            this.setState({})
            return
        }

        this.machine.send('NEXT', { contact: this.state })
    }

    previous() {
        this.machine.send('PREVIOUS')
    }

    firstNameChange(event: ChangeEvent<HTMLInputElement>) {
        const { error } = schema.firstName.validate(event.target.value, { errors: { wrap: { label: false } } })
        this.errors.firstName = error?.message
        
        this.setState({firstName: event.target.value});
    }

    lastNameChange(event: ChangeEvent<HTMLInputElement>) {
        const { error } = schema.lastName.validate(event.target.value, { errors: { wrap: { label: false } } })
        this.errors.lastName = error?.message

        this.setState({lastName: event.target.value});
    }

    mobileNumberChange(event: ChangeEvent<HTMLInputElement>) {
        const { error } = schema.mobileNumber.validate(event.target.value, { errors: { wrap: { label: false } } })
        this.errors.mobileNumber = error?.message

        this.setState({mobileNumber: event.target.value});
    }

    emailChange(event: ChangeEvent<HTMLInputElement>) {
        const { error } = schema.email.validate(event.target.value, { errors: { wrap: { label: false } } })
        this.errors.email = error?.message

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
                        {this.errors['firstName'] && <div className="ui pointing red label">{this.errors['firstName']}</div>}
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.lastNameChange}></input>
                        {this.errors['lastName'] && <div className="ui pointing red label">{this.errors['lastName']}</div>}
                    </div>
                    <div className="field">
                        <label>Mobile Number</label>
                        <input type="text" placeholder="Mobile Number" value={this.state.mobileNumber} onChange={this.mobileNumberChange}></input>
                        {this.errors['mobileNumber'] && <div className="ui pointing red label">{this.errors['mobileNumber']}</div>}
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" placeholder="Email" value={this.state.email} onChange={this.emailChange}></input>
                        {this.errors['email'] && <div className="ui pointing red label">{this.errors['email']}</div>}
                    </div>
                </form>

                <div className="ui hidden divider"></div>

                <button className="ui button" disabled={!this.machine.current.context.canPrevious} onClick={this.previous}>Prev</button>
                <button className="ui button" disabled={!this.machine.current.context.canNext} onClick={this.next}>Next</button>

                <pre style={{ textAlign: "left" }}>
                    {JSON.stringify(
                    { state: this.state, errors: this.errors },
                    null,
                    2
                    )}
                </pre>
            </div>
        );
    }
}
