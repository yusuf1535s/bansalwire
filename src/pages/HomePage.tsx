import { AppWrapper } from '../components/layout/AppWrapper'
import { Hero, StatCards } from '../components/home/Hero'
import { ProductsSection } from '../components/home/ProductsSection'
import { SpecialProductsSection } from '../components/home/SpecialProductsSection'
import { AboutSection } from '../components/home/AboutSection'
import { GroupCompaniesSection } from '../components/home/GroupCompaniesSection'
import { ContactSection } from '../components/home/ContactSection'
import { PageMeta } from '../components/common/PageMeta'

export default function HomePage() {
  return (
    <AppWrapper>
      <PageMeta
        title="Stainless Steel Wire Suppliers and Exporters in India | Bansal Wire Industries"
        description="Bansal Group is engaged in manufacturing of quality stainless steel wires, high carbon steel wires, mild steel wires, shaped wires, wire ropes, and tyre bead wires."
      />
      <Hero />
      <StatCards />
      <AboutSection />
      <ProductsSection />
      <SpecialProductsSection />
      <GroupCompaniesSection />
      <ContactSection />
    </AppWrapper>
  )
}
