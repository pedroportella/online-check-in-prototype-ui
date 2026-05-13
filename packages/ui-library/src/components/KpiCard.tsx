export interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  tone?: 'neutral' | 'good' | 'warning';
}

export function KpiCard({ label, value, delta, tone = 'neutral' }: KpiCardProps) {
  return (
    <article className={`va-kpi-card va-kpi-card--${tone}`}>
      <span className="va-kpi-card__label">{label}</span>
      <strong className="va-kpi-card__value">{value}</strong>
      {delta ? <span className="va-kpi-card__delta">{delta}</span> : null}
    </article>
  );
}
