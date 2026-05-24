export function WizardStepper({ step }: { step: number }) {
  return (
    <div className='flex items-center gap-3 text-sm text-slate-600'>
      <div className='rounded-full bg-primary px-3 py-1 text-white'>
        Langkah {step}
      </div>
      <span>Gunakan wizard untuk menyelesaikan konfigurasi.</span>
    </div>
  );
}
