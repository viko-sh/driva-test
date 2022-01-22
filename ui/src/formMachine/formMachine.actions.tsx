import React from 'react';
import { assign } from 'xstate';

import { ContactDataFormPart } from '../components/formPart/contactDataFormPart';
import { DetailsDataFormPart } from '../components/formPart/detailsDataFormPart';
import { SubmittedDataFormPart } from '../components/formPart/submittedDataFormPart';

import { Context, View } from './formMachine.types';

export const mapNameToView: Record<string, View> = {
  contact: {
    Component: <ContactDataFormPart />,
    step: 0,
  },
  details: {
    Component: <DetailsDataFormPart />,
    step: 1,
  },
  submitted: {
    Component: <SubmittedDataFormPart />,
    step: 2,
  },
};

export const changeView = assign<Context, Event>({
  currentView: (_context, _event, { action }) => {
    if (typeof action.payload !== 'string') {
      throw new Error('Action payload should be string');
    }

    return mapNameToView[action.payload];
  },
});