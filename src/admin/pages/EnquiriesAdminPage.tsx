import { AdminGuard } from '../../admin/guards'
import { PageMeta } from '../../components/common/PageMeta'
import { EnquiryListTable } from '../../components/admin/EnquiryListTable'

export default function EnquiriesAdminPage() {
  return (
    <AdminGuard>
      <>
        <PageMeta title="Enquiries" description="Manage Enquiries" />
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">Enquiries</h1>
          <p className="text-text-secondary text-sm mt-1">Manage customer enquiries and inquiries</p>
        </div>
        <EnquiryListTable />
      </>
    </AdminGuard>
  )
}
