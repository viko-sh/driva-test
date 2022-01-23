import React from 'react';
import { useMachine } from '@xstate/react';

import { formMachine } from './formMachine/formMachine';

import { ContactDataFormPart } from './components/formPart/contactDataFormPart';
import { DetailsDataFormPart } from './components/formPart/detailsDataFormPart';
import { SubmittingFormPart } from './components/formPart/submittingFormPart';
import { SubmittedFormPart } from './components/formPart/submittedFormPart';
import { FailedFormPart } from './components/formPart/failedFormPart';

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
        current.matches("failed") ? ( <FailedFormPart/> ) : 
        <div/>
        }
      </div>
    </div>
  );
}

export default App;