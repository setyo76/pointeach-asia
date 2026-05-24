import { useMemo } from 'react';
import { useWizardStore } from '../store/wizardStore';

export function useWizard() {
  const state = useWizardStore((s) => s);
  return useMemo(() => state, [state]);
}
