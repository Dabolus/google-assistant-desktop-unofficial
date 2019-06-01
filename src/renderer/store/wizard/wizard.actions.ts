import { FluxStandardAction } from '../store.model';

// Action types
export enum WizardActionType {
  UPDATE_STEP = 'UPDATE_STEP',
}

// Action interfaces
export type WizardActionUpdateStep = FluxStandardAction<
  WizardActionType.UPDATE_STEP,
  {
    step: number;
  }
>;

export type WizardAction = WizardActionUpdateStep;

// Actions
export const updateStep = (step: number): WizardActionUpdateStep => ({
  type: WizardActionType.UPDATE_STEP,
  payload: {
    step,
  },
});
