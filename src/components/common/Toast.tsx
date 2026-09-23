import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '../../lib/utils'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

interface ToastProps {
  toast: Toast
  onClose: (id: string) => void
}

export function Toast({ toast, onClose }: ToastProps) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }
  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-accent/10 text-accent border-accent/50',
    info: 'bg-primary/10 text-primary border-primary/50',
  }
  const Icon = icons[toast.type]

  return (
    <div className={cn('flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg', styles[toast.type])}>
      <Icon className="w-5 h-5 shrink-0" />
      <p className="text-sm flex-1">{toast.message}</p>
      <button onClick={() => onClose(toast.id)} className="text-current opacity-50 hover:opacity-100">
        ×
      </button>
    </div>
  )
}
