import { Reducer } from 'redux';
import { WizardAction, WizardActionType } from './wizard.actions';
import { WizardState } from './wizard.model';

const initialState: WizardState = {
  step: 0,
};

export const wizardReducer: Reducer<WizardState, WizardAction> = (
  state: WizardState = initialState,
  action,
) => {
  switch (action.type) {
    case WizardActionType.UPDATE_STEP:
      return {
        ...state,
        step: action.payload.step,
      };
    default:
      return state;
  }
};
