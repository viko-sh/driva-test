import { MachineConfig, MachineOptions, createMachine, assign } from 'xstate';

import { changeView } from './formMachine.actions';
import { State, Context, FormEvent } from './formMachine.types';
import { ContactData } from '../types'

const initialStateName = 'contact';

const formMachineConfig: MachineConfig<Context, State, FormEvent> = {
  id: 'formState',
  initial: initialStateName,
  context: {
    canPrevious: false,
    canNext: true,
    // currentView: mapNameToView[initialStateName],
  },
  states: {
    contact: {
      on: {
        NEXT: { 
          target: 'details', 
          actions: [
            { type: 'changeView', payload: 'details' },
            assign((context, event) => { 
              console.log('Contact details', context, event)
              return {
                canNext: true, 
                canPrevious: true,
                contact: event.contact
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
          target: 'submitting', 
          actions: [
            { type: 'changeView', payload: 'submitting' },
            assign((context, event) => { 
              return {
                canNext: false, 
                canPrevious: false,
                details: event.details
              }
            })
          ]
        },
      }
    },
    submitting: {
      invoke: {
        id: "submitting",
        src: ctx => {
          return Promise.resolve()
        },
        onDone: {
          target: "submitted",
          actions: { type: 'changeView', payload: 'submitted' }
        },
        onError: "failed"
      }
    },
    failed: {
      on: {
        RETRY: "submitting"
      }
    },
    submitted: {
      type: "final"
    },
  },
};

const formMachineOptions: Partial<MachineOptions<Context, FormEvent>> = {
  actions: { changeView },
};

export const formMachine = createMachine(formMachineConfig, formMachineOptions);

export const formMachineStates = Object.keys(formMachine.states);