import { useStore } from '../store/useStore'
import { productList } from '../components/home/ProductsSection'
import { Product } from '../types'
import { CheckCircle, Star, ArrowLeft, Send } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { AppWrapper } from '../components/layout/AppWrapper'
import { PageMeta } from '../components/common/PageMeta'
import { Section, SectionHeader } from '../components/common/Section'

export default function ProductDetailPage() {
  const { id } = useParams<{ id?: string }>()
  const { products } = useStore()

  const cleanId = (id || '').toLowerCase().trim()

  const storeProduct = products.find(
    (p) =>
      p.id === id ||
      p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(cleanId) ||
      p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(cleanId)
  )

  const homeProduct = productList.find(
    (p) =>
      p.id === id ||
      p.slug === id ||
      p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(cleanId) ||
      p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').includes(cleanId)
  )

  const product = storeProduct || (homeProduct ? {
    id: homeProduct.id,
    name: homeProduct.name,
    category: homeProduct.category,
    subCategory: homeProduct.category,
    description: homeProduct.description,
    image: homeProduct.image,
    specifications: homeProduct.features,
    applications: ['Automotive', 'Power & Transmission', 'Infrastructure', 'General Engineering']
  } : null)

  if (!product) {
    return (
      <AppWrapper>
        <div className="max-w-3xl mx-auto py-16 px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 font-['Lato']">Product / Specification Catalog</h2>
          <p className="text-sm text-gray-600 mt-2">
            Explore our comprehensive range of over 3,000 precision wire SKUs or submit a custom specification inquiry.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="bg-[#e31e24] text-white font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider hover:bg-[#b81419] transition"
            >
              Browse Wire Catalog
            </Link>
            <Link
              to="/contact"
              className="bg-gray-100 text-gray-800 font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider hover:bg-gray-200 transition"
            >
              Submit Custom RFQ
            </Link>
          </div>
        </div>
      </AppWrapper>
    )
  }

  return (
    <AppWrapper>
      <>
        <PageMeta title={product.name} description={product.description} />
        <Section className="bg-bg-light">
          <div className="max-w-4xl mx-auto">
            <Link to="/products" className="inline-flex items-center gap-1 text-sm text-accent mb-6 hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Link>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 dark:bg-[#151d2e] rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] border border-gray-200 dark:border-slate-800 shadow-xs flex items-center justify-center p-6">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain filter drop-shadow-md"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/bansal/DSC_4109-1-scaled.jpg'
                    }}
                  />
                ) : (
                  <div className="w-20 h-20 bg-red-50 text-[#e31e24] rounded-full flex items-center justify-center font-bold text-3xl font-['Lato']">
                    {product.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <span className="text-[#e31e24] text-xs font-bold uppercase tracking-wider">{product.category}</span>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-['Lato'] mt-1">{product.name}</h1>
                <p className="text-text-secondary mt-4 leading-relaxed">{product.description}</p>
                <div className="flex gap-4 mt-6">
                  {product.applications?.map((app) => (
                    <span key={app} className="bg-bg-light text-text-primary px-3 py-1 rounded text-sm">{app}</span>
                  )) || []}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {product.specifications && (
          <Section>
            <SectionHeader title="Specifications" />
            <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
              {product.specifications.map((spec, i) => (
                <div key={i} className="flex items-center gap-3 bg-bg-light rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm">{spec}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {product.applications && (
          <Section className="bg-bg-light">
            <SectionHeader title="Applications" />
            <div className="max-w-3xl mx-auto">
              <div className="grid sm:grid-cols-3 gap-4">
                {product.applications.map((app, i) => (
                  <div key={i} className="bg-white rounded-lg p-5 text-center border border-border-light">
                    <Star className="w-6 h-6 text-accent mx-auto mb-2" />
                    <span className="font-medium text-text-primary">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}
      </>
    </AppWrapper>
  )
}
