import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants, Button } from '../components/ui/button'
import { ArrowDownToLine, CheckCircle, Divide, Leaf } from 'lucide-react'
import ProductReel from '@/components/ProductReel'

const perks = [
  {
    name: 'Instant Delivery',
    icon: ArrowDownToLine,
    desc: 'Get your assets delivered to your email in seconds and download them right away.',
  },
  {
    name: 'Guaranteed Quality',
    icon: CheckCircle,
    desc: 'Every asset on our platform has been verified by our team to ensure highest quality standards.',
  },
  {
    name: 'For the Planet',
    icon: Leaf,
    desc: 'We have pledged 1% of our sales to the preservation and restoration of out natural habitat.',
  },
]

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Marketplace for high-quality{' '}
            <span className="text-orange-600">digital assets</span>.
          </h1>
          <p className="mt-6 text-md max-w-prose text-muted-foreground">
            Welcome to Hippo UI. Every asset on our platform has been verified
            by our team to ensure highest quality standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button className="" variant="outline">
              Our Quality Promise &rarr;
            </Button>
          </div>
        </div>
        {/* TODO add list of  products*/}
        <ProductReel
          query={{ sort: 'desc', limit: 4 }}
          title="Brand New"
          href="/products"
        />
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-0">
            {perks.map((perk) => {
              return (
                <div
                  key={perk.name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                >
                  <div className="flex md:flex-shrink-0 justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-700">
                      {<perk.icon className="w-1/3 h-1/3" />}
                    </div>
                  </div>

                  <div className="mt-6 md:ml-4 md:mt-0 lg:mt-2 lg:ml-0">
                    <h3 className="text-base font-medium text-gray-900">
                      {perk.name}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
