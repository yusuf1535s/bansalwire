import { AppWrapper } from '../components/layout/AppWrapper'
import { Section, SectionHeader } from '../components/common/Section'

export default function NotFoundPage() {
  return (
    <AppWrapper>
      <Section className="text-center py-24">
        <span className="text-6xl font-bold text-black">404</span>
        <h2 className="text-2xl font-bold text-text-primary mt-4">Page Not Found</h2>
        <p className="text-text-secondary mt-2">The page you are looking for does not exist.</p>
      </Section>
    </AppWrapper>
  )
}
