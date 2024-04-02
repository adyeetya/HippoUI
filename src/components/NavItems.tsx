'use client'
import { PRODUCT_CATEGORIES } from '@/configs'
import React, { useState, useRef, useEffect } from 'react'
import NavItem from './NavItem'
import { useOnClickOutside } from '@/hooks/use-on-click-outside'

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // console.log(e.key)
      if (e.key === 'Escape') {
        setActiveIndex(null)
      }
    }
    document.addEventListener('keydown', handler)

    //clean up function to remove the event listener when the component unmounts to prevent memory leaks
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  const isAnyOpen = activeIndex !== null

  const navRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(navRef, () => setActiveIndex(null))

  return (
    <div ref={navRef} className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null)
          } else {
            setActiveIndex(i)
          }
        }

        const isOpen = i === activeIndex

        return (
          <NavItem
            key={category.value}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
          />
        )
      })}
    </div>
  )
}

export default NavItems
