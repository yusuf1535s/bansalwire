import { AdminGuard } from '../../admin/guards'
import { PageMeta } from '../../components/common/PageMeta'
import { UserTable } from '../../components/admin/UserTable'

export default function UsersAdminPage() {
  return (
    <AdminGuard>
      <>
        <PageMeta title="Users" description="Manage Users" />
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Users</h1>
          <p className="text-text-secondary text-sm mt-1">Manage admin users and access</p>
        </div>
        <UserTable />
      </>
    </AdminGuard>
  )
}
