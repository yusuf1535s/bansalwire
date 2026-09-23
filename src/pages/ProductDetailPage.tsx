import { useStore } from '../store/useStore'
import { Product } from '../types'
import { CheckCircle, Star, ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { AppWrapper } from '../components/layout/AppWrapper'
import { PageMeta } from '../components/common/PageMeta'
import { Section, SectionHeader } from '../components/common/Section'

export default function ProductDetailPage() {
  const { id } = useParams()
  const { products } = useStore()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <AppWrapper>
        <Section className="text-center">
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <Link to="/products" className="text-accent mt-4 inline-block">Back to Products</Link>
        </Section>
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
              <div className="bg-bg-light rounded-xl h-64 flex items-center justify-center border border-border-light">
                <div className="w-24 h-24 bg-black/10 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-4xl">{product.name.charAt(0)}</span>
                </div>
              </div>
              <div>
                <span className="text-accent text-sm font-medium uppercase">{product.category}</span>
                <h1 className="text-3xl font-bold text-text-primary mt-2">{product.name}</h1>
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
