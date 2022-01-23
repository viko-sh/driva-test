import { assign } from 'xstate';

import { Context, FormEvent } from './formMachine.types';

export const changeView = assign<Context, FormEvent>({
  // currentView: (_context, _event, { action }) => {
  //   if (typeof action.payload !== 'string') {
  //     throw new Error('Action payload should be string');
  //   }

  //   // return mapNameToView[action.payload];
  // },
});