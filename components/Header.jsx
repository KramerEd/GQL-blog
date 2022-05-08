import React, { useContext } from 'react'
import Link from 'next/link'

const cats = [
  { name: 'React', slug: 'react' },
  { name: 'webdev', slug: 'fdsfs' },
]

const Header = () => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="inline-block w-full border-b-2 border-black py-8">
        <div className="block md:float-left">
          <Link href="/">
            <span className="cursor-pointer text-4xl font-bold">
              Graph-blog
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {cats.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="mt-2 ml-4 cursor-pointer align-middle font-semibold  md:float-right">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
