import React from 'react';
import { assign } from 'xstate';

import { ContactDataFormPart } from '../components/formPart/contactDataFormPart';
import { DetailsDataFormPart } from '../components/formPart/detailsDataFormPart';
import { SubmittingFormPart } from '../components/formPart/submittingFormPart';
import { SubmittedFormPart } from '../components/formPart/submittedFormPart';

import { Context, View, FormEvent } from './formMachine.types';

// export const mapNameToView: Record<string, View> = {
//   contact: {
//     Component: <ContactDataFormPart />,
//     step: 0,
//   },
//   details: {
//     Component: <DetailsDataFormPart />,
//     step: 1,
//   },
//   submitting: {
//     Component: <SubmittingFormPart />,
//     step: 2,
//   },
//   failed: {
//     Component: <SubmittingFormPart />,
//     step: 3,
//   },
//   submitted: {
//     Component: <SubmittedFormPart />,
//     step: 4,
//   },
// };

export const changeView = assign<Context, FormEvent>({
  // currentView: (_context, _event, { action }) => {
  //   if (typeof action.payload !== 'string') {
  //     throw new Error('Action payload should be string');
  //   }

  //   // return mapNameToView[action.payload];
  // },
});