import { useState } from 'react'
import { useStore } from '../../store/useStore'
import { X, Save } from 'lucide-react'

export function PageContentForm() {
  const { pageContents, updatePageContent } = useStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [text, setText] = useState('')

  const edit = (page: typeof pageContents[0]) => {
    setEditingId(page.id)
    setText(page.content)
  }

  const save = (id: string) => {
    updatePageContent(id, { content: text })
    setEditingId(null)
    setText('')
  }

  return (
    <div className="bg-white rounded-xl border border-border-light p-6">
      <h3 className="font-semibold text-text-primary mb-4">Edit Page Content</h3>
      <div className="space-y-4">
        <select
          defaultValue=""
          onChange={(e) => {
            const page = pageContents.find((p) => p.id === e.target.value)
            if (page) edit(page)
          }}
          className="w-full px-4 py-2.5 rounded-lg border border-border-light text-sm"
        >
          <option value="" disabled>Select a page to edit</option>
          {pageContents.map((page) => (
            <option key={page.id} value={page.id}>{page.title}</option>
          ))}
        </select>

        {editingId && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Content (HTML)</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} className="w-full px-4 py-2.5 rounded-lg border border-border-light text-sm font-mono resize-none" />
            <button onClick={() => save(editingId)} className="mt-2 bg-primary text-white px-4 py-2 rounded text-sm font-medium hover:bg-primary-light transition flex items-center gap-2">
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
