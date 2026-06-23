export default function SectionHeader({ eyebrow, title, description, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center mx-auto';
  return (
    <div className={`max-w-3xl mb-12 ${alignClass}`}>
      {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
      <h2 className="font-display font-bold text-3xl md:text-4xl text-sky-500 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-slate-600 mt-4 text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
