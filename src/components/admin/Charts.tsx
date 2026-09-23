import { ResponsiveContainer } from 'recharts'
import { BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { LineChart as ReLineChart, Line } from 'recharts'

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 600 },
  { name: 'Mar', value: 500 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 700 },
  { name: 'Jun', value: 900 },
  { name: 'Jul', value: 1100 },
  { name: 'Aug', value: 1000 },
]

export function BarChart() {
  return (
    <div className="bg-white rounded-xl border border-border-light p-6">
      <h3 className="font-semibold text-text-primary mb-4">Production Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function LineChart() {
  return (
    <div className="bg-white rounded-xl border border-border-light p-6">
      <h3 className="font-semibold text-text-primary mb-4">Enquiry Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#c5942f" strokeWidth={2} dot={{ r: 4, fill: '#c5942f' }} />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
