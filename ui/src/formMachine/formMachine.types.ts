import { ReactNode } from 'react';
import { StateNode } from 'xstate';

export type Event = { type: 'NEXT' } | { type: 'PREVIOUS' };

export type View = {
  Component: ReactNode;
  step: number;
};

export type Context = {
  canPrevious: Boolean;
  canNext: Boolean;
  currentView: View;
};

export type State = {
  states: {
    contact: StateNode;
    details: StateNode;
    submitted: StateNode;
  };
};