export function Section({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-16 ${className || ''}`}>
      {children}
    </section>
  )
}

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      {subtitle && <span className="text-accent font-medium text-sm uppercase tracking-wider">{subtitle}</span>}
      <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2">{title}</h2>
    </div>
  )
}
