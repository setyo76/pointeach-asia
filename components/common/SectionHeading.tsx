export function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className='space-y-3 text-center'>
      <h2 className='text-3xl font-semibold text-slate-900'>{title}</h2>
      {subtitle ? <p className='text-slate-600'>{subtitle}</p> : null}
    </div>
  );
}
