import { useStore } from '../../store/useStore'
import { Edit2, Trash2 } from 'lucide-react'
import type { PageContent } from '../../types'

export function PageListTable() {
  const { pageContents, updatePageContent } = useStore()

  const toggleActive = (id: string) => {
    const page = pageContents.find((p) => p.id === id)
    if (page) updatePageContent(id, { isActive: !page.isActive })
  }

  return (
    <div className="bg-white rounded-xl border border-border-light overflow-hidden">
      <div className="px-6 py-4 border-b border-border-light">
        <h3 className="font-semibold text-text-primary">Page Content</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-light text-xs text-text-secondary uppercase">
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Slug</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Updated</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageContents.map((page: PageContent) => (
              <tr key={page.id} className="border-b border-border-light hover:bg-bg-light">
                <td className="px-6 py-3 text-sm font-medium text-text-primary">{page.title}</td>
                <td className="px-6 py-3 text-sm text-text-secondary">/{page.slug}</td>
                <td className="px-6 py-3">
                  <button onClick={() => toggleActive(page.id)} className={`text-xs px-2 py-0.5 rounded ${page.isActive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {page.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="px-6 py-3 text-sm text-text-secondary">{page.updatedAt}</td>
                <td className="px-6 py-3">
                  <button className="p-1 hover:bg-primary/10 rounded text-primary"><Edit2 className="w-4 h-4" /></button>
                  <button className="p-1 hover:bg-red-50 rounded text-danger ml-1"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
