'use client'

import React from 'react'
import { LeafId } from 'verses-shared/types/Tree'

export const ScrollRight: React.FC<{
  path: LeafId
  scrollContainer?: string
}> = ({ path, scrollContainer = '.layout-main' }) => {
  React.useEffect(() => {
    const el = document.querySelector(scrollContainer)
    el?.scrollTo({
      left: el.scrollWidth,
      behavior: 'smooth',
    })
  }, [path, scrollContainer])

  return null
}
