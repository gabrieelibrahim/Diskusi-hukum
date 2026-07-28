import Link from 'next/link'
import type { Category } from '@/lib/types'

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/kategori/${cat.slug}`}
          className="group bg-white rounded-xl border border-[#E2E5EC] p-6 hover:border-accent/30 hover:shadow-md transition-all duration-300"
        >
          <h3 className="font-heading font-semibold text-lg text-primary group-hover:text-accent transition-colors duration-200 mb-2">
            {cat.name}
          </h3>
          <p className="text-sm text-[#5A6577] font-body leading-relaxed mb-3">
            {cat.description}
          </p>
          <span className="text-xs font-medium text-accent">
            {cat.count} artikel
          </span>
        </Link>
      ))}
    </div>
  )
}
