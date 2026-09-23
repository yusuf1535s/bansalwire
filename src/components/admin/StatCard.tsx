import { cn } from '../../lib/utils'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string | number
  trend: string
  color: 'primary' | 'accent' | 'success' | 'warning'
}

export function StatCard({ icon: Icon, label, value, trend, color }: StatCardProps) {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-green-50 text-green-600',
    warning: 'bg-accent/10 text-accent',
  }

  const isPositive = !trend.startsWith('-')

  return (
    <div className="bg-white rounded-xl p-5 border border-border-light">
      <div className="flex items-center justify-between">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', colorMap[color])}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={cn('flex items-center gap-0.5 text-xs font-medium', isPositive ? 'text-green-600' : 'text-red-600')}>
          {trend}
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        </div>
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-text-primary">{value}</div>
        <div className="text-sm text-text-secondary">{label}</div>
      </div>
    </div>
  )
}
