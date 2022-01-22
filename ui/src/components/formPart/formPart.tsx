import React, { Component, MouseEventHandler } from "react";

interface FormPartProps {
    context: any
    onPrevious: MouseEventHandler
    onNext: MouseEventHandler
}

export class FormPart extends Component<FormPartProps> {
    constructor(props: FormPartProps) {
        super(props)

        this.onNext = props.onNext
        this.onPrevious = props.onPrevious
    }

    onNext: MouseEventHandler = () => { }

    onPrevious: MouseEventHandler = () => { }

    render() {
        return (
            <div>
                {this.props.children}

                <div className="ui hidden divider"></div>

                <button className="ui button" disabled={!this.props.context.canPrevious} onClick={this.onPrevious}>Prev</button>
                <button className="ui button" disabled={!this.props.context.canNext} onClick={this.onNext}>Next</button>
            </div>
        );
    }
}
