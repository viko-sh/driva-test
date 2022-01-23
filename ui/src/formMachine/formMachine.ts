import { MachineConfig, MachineOptions, createMachine, assign } from 'xstate';

import { changeView } from './formMachine.actions';
import { State, Context, FormEvent } from './formMachine.types';
import { Api } from '../api'

const api = new Api();
const initialStateName = 'contact';

const formMachineConfig: MachineConfig<Context, State, FormEvent> = {
  id: 'formState',
  initial: initialStateName,
  context: {
    canPrevious: false,
    canNext: true
  },
  states: {
    contact: {
      on: {
        NEXT: { 
          target: 'details', 
          actions: [
            assign((context, event) => { 
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
          return api.submitInformation({ contact: ctx.contact, details: ctx.details })
            .then(result => {
              console.log('Worked', result)
            })
            .catch(err => {
              console.error('Failed', err)
              throw err
            })
        },
        onDone: "submitted",
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
