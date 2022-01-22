import { MachineConfig, MachineOptions, createMachine, assign } from 'xstate';

import { mapNameToView, changeView } from './formMachine.actions';
import { State, Context } from './formMachine.types';

const initialStateName = 'contact';

const formMachineConfig: MachineConfig<Context, State, Event> = {
  id: 'formState',
  initial: initialStateName,
  context: {
    canPrevious: false,
    canNext: true,
    currentView: mapNameToView[initialStateName],
  },
  states: {
    contact: {
      on: {
        NEXT: { 
          target: 'details', 
          actions: [
            { type: 'changeView', payload: 'details' },
            assign((context, event) => { 
              return {
                canNext: true, 
                canPrevious: true
              }
            })
          ]
        }
      },
    },
    details: {
      on: {
        PREVIOUS: { 
          target: 'contact', 
          actions: [
            { type: 'changeView', payload: 'contact' },
            assign((context, event) => { 
              return {
                canNext: true, 
                canPrevious: false
              }
            })
          ]
        },
        NEXT: { 
          target: 'submitted', 
          actions: [
            { type: 'changeView', payload: 'submitted' },
            assign((context, event) => { 
              return {
                canNext: false, 
                canPrevious: false
              }
            })
          ]
        },
      }
    },
    submitted: {
      on: {
        PREVIOUS: { 
          target: 'details', 
          actions: [
            { type: 'changeView', payload: 'details' },
            assign((context, event) => { 
              return {
                canNext: true, 
                canPrevious: true
              }
            })
          ]
        },
      },
    },
  },
};

const formMachineOptions: Partial<MachineOptions<Context, Event>> = {
  actions: { changeView },
};

export const formMachine = createMachine(formMachineConfig, formMachineOptions);

export const formMachineStates = Object.keys(formMachine.states);
