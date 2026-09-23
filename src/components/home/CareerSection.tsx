import { Target, GraduationCap, Heart, Briefcase } from 'lucide-react'

export function CareerSection() {
  const teamMembers = [
    { id: '1', name: 'Sh. Arun Gupta', designation: 'Managing Director', division: 'Overall' },
    { id: '2', name: 'Sh. Ramnivas Yadav', designation: 'Director', division: 'Galvanised Wire Division' },
    { id: '3', name: 'Sh. S.K. Agarwal', designation: 'Director', division: 'Profile / Shaped Wire Division' },
    { id: '4', name: 'Shri. Umesh Kumar Gupta', designation: 'Director', division: '' },
    { id: '5', name: 'Shri. Pranav Bansal', designation: 'Director', division: '' },
    { id: '6', name: 'Shri. Gaurav Gupta', designation: 'Director', division: '' },
    { id: '7', name: 'Sh. Yogesh Oberoi', designation: 'Director', division: 'Aluminium Alloy Wire Division' },
    { id: '8', name: 'Sh. Manoj Dave', designation: 'Technical Head', division: '' },
  ]

  const values = [
    { icon: Target, title: 'Safety First', desc: 'Zero harm policy across all operations' },
    { icon: GraduationCap, title: 'Continuous Learning', desc: 'Upskilling and development programs' },
    { icon: Heart, title: 'Employee First', desc: 'Holistic welfare and well-being' },
    { icon: Briefcase, title: 'Career Growth', desc: 'Clear paths for advancement' },
  ]

  const openings = [
    { title: 'Senior Engineer - Production', dept: 'Operations', location: 'Delhi', type: 'Full-time' },
    { title: 'Quality Control Inspector', dept: 'Quality', location: 'Delhi', type: 'Full-time' },
    { title: 'Sales Executive - Exports', dept: 'Sales', location: 'Delhi', type: 'Full-time' },
    { title: 'Maintenance Technician', dept: 'Engineering', location: 'Delhi', type: 'Full-time' },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Careers</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2">Join Our Team</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((v) => {
            const Icon = v.icon
            return (
              <div key={v.title} className="bg-bg-light rounded-xl p-6 text-center">
                <Icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold text-text-primary">{v.title}</h3>
                <p className="text-sm text-text-secondary mt-1">{v.desc}</p>
              </div>
            )
          })}
        </div>

        <h3 className="text-xl font-bold text-text-primary mb-6">Current Openings</h3>
        <div className="space-y-3">
          {openings.map((job) => (
            <div key={job.title} className="flex flex-wrap items-center justify-between gap-4 bg-bg-light rounded-lg p-4 hover:shadow-sm transition">
              <div>
                <h4 className="font-medium text-text-primary">{job.title}</h4>
                <div className="flex gap-3 text-xs text-text-secondary mt-1">
                  <span>{job.dept}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>
              </div>
              <button className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-primary-light transition">
                Apply
              </button>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-bold text-text-primary mt-12 mb-6">Leadership Team</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-bg-light rounded-xl p-5 text-center">
              <div className="w-16 h-16 bg-bg-light border border-border-light rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-text-primary font-bold text-lg">
                  {member.name.split(' ').slice(-2).map((n: string) => n[0]).join('')}
                </span>
              </div>
              <h4 className="font-medium text-text-primary text-sm">{member.name}</h4>
              <p className="text-xs text-text-secondary mt-1">{member.designation}</p>
              {member.division && <p className="text-xs text-accent mt-1">{member.division}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function QualitySection() {
  return (
    <section className="py-16 bg-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Quality</span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2">Certifications & Approvals</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'ISO 9001:2015', desc: 'Quality Management System' },
            { title: 'ISO 14001:2015', desc: 'Environmental Management' },
            { title: 'IATF 16949:2016', desc: 'Automotive Quality Standard' },
            { title: 'IS 6528:1995', desc: 'Indian Standard Compliance' },
          ].map((cert) => (
            <div key={cert.title} className="bg-white rounded-xl p-6 border border-border-light text-center hover:shadow-md transition">
              <div className="w-14 h-14 bg-bg-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent text-2xl">✓</span>
              </div>
              <h3 className="font-semibold text-text-primary">{cert.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
