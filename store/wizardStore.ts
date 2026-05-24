import { create } from 'zustand';
import type { WizardState } from '../types/wizard';

interface WizardStore extends WizardState {
  setStep: (step: number) => void;
  updateData: (data: Partial<WizardState['data']>) => void;
}

export const useWizardStore = create<WizardStore>((set) => ({
  step: 1,
  data: {},
  setStep: (step) => set({ step }),
  updateData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
}));
