import { ReactNode } from 'react';
import { StateNode, EventObject } from 'xstate';
import { ContactData, DetailsData } from '../types'

export type Event = { type: 'NEXT' } | { type: 'PREVIOUS' };

export type View = {
  Component: ReactNode;
  step: number;
};

export type Context = {
  canPrevious: Boolean;
  canNext: Boolean;
  // currentView: View;
};

export type State = {
  states: {
    contact: StateNode;
    details: StateNode;
    submitting: StateNode;
    failed: StateNode;
    submitted: StateNode;
  };
};

export interface FormEvent extends EventObject {
  type: string;
  contact: ContactData;
  details: DetailsData;
}