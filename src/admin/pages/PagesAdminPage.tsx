import { AdminGuard } from '../../admin/guards'
import { PageMeta } from '../../components/common/PageMeta'
import { PageContentForm } from '../../components/admin/PageContentForm'
import { PageListTable } from '../../components/admin/PageListTable'

export default function PagesAdminPage() {
  return (
    <AdminGuard>
      <>
        <PageMeta title="Pages" description="Manage Pages" />
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Pages</h1>
          <p className="text-text-secondary text-sm mt-1">Manage website page content</p>
        </div>
        <div className="mb-6">
          <PageContentForm />
        </div>
        <PageListTable />
      </>
    </AdminGuard>
  )
}
