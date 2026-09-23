import { AdminGuard } from '../../admin/guards'
import { PageMeta } from '../../components/common/PageMeta'
import { SettingsForm } from '../../components/admin/SettingsForm'

export default function SettingsAdminPage() {
  return (
    <AdminGuard>
      <>
        <PageMeta title="Settings" description="Admin Settings" />
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary text-sm mt-1">Manage site settings and configuration</p>
        </div>
        <SettingsForm />
      </>
    </AdminGuard>
  )
}
