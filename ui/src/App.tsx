import React from 'react';
import { useMachine } from '@xstate/react';

import { FormPart } from './components/formPart/formPart';
import { formMachine, formMachineStates } from './formMachine/formMachine';

function App() {
  const [current, send] = useMachine(formMachine);

  return (
    <div className="app">

      <div className="ui container">
        <FormPart
          context={current.context}
          onPrevious={() => {
            send('PREVIOUS');
          }}
          onNext={() => {
            send('NEXT');
          }}
        >
          {current.context.currentView.Component}
        </FormPart>
      </div>

      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(
          { value: current.value, context: current.context },
          null,
          2
        )}
      </pre>
    </div>
  );
}

export default App;