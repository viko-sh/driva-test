import React from 'react';
import { useMachine } from '@xstate/react';

import { FormPart } from './components/formPart/formPart';
import { formMachine, formMachineStates } from './formMachine/formMachine';

import { ContactDataFormPart } from './components/formPart/contactDataFormPart';
import { DetailsDataFormPart } from './components/formPart/detailsDataFormPart';
import { SubmittingFormPart } from './components/formPart/submittingFormPart';
import { SubmittedFormPart } from './components/formPart/submittedFormPart';

function App() {
  const [current, send] = useMachine(formMachine);
  const machine = { current, send }

  return (
    <div className="app">
      <div className="ui hidden divider"></div>

      <div className="ui raised very padded text container segment">
        { 
        current.matches("contact") ? ( <ContactDataFormPart machine={machine}/> ) : 
        current.matches("details") ? ( <DetailsDataFormPart machine={machine}/> ) : 
        current.matches("submitting") ? ( <SubmittingFormPart/> ) : 
        current.matches("submitted") ? ( <SubmittedFormPart/> ) : 
        <div/>
        }
      </div>

      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(
          { value: current.value, context: current.context, match: current.matches("contact") },
          null,
          2
        )}
      </pre>
    </div>
  );
}

export default App;