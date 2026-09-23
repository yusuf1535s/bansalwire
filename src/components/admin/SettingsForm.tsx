import { useState } from 'react'
import { Save, Bell, Globe, Clock } from 'lucide-react'

export function SettingsForm() {
  const [settings, setSettings] = useState({
    siteName: 'Bansal Wire Industries Ltd.',
    email: 'info@bansalwire.com',
    phone: '011-46666750-59',
    address: 'F-3, Main Road, Shastri Nagar, New Delhi - 110052',
    notifications: true,
  })

  return (
    <div className="bg-white rounded-xl border border-border-light p-6 max-w-2xl">
      <h3 className="font-semibold text-text-primary mb-6">General Settings</h3>
      <div className="space-y-4">
        {[
          { label: 'Site Name', key: 'siteName' as const, icon: Globe },
          { label: 'Contact Email', key: 'email' as const, icon: Bell },
          { label: 'Phone', key: 'phone' as const, icon: Clock },
          { label: 'Address', key: 'address' as const, icon: Globe },
        ].map(({ label, key, icon: Icon }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-text-primary mb-1">{label}</label>
            <div className="relative">
              <Icon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                value={settings[key]}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-light text-sm"
              />
            </div>
          </div>
        ))}

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
            className="w-4 h-4 text-primary rounded"
          />
          <span className="text-sm text-text-primary">Enable Notifications</span>
        </label>

        <button className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-light transition flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  )
}
