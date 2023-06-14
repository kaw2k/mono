'use client'

import React from 'react'
import { PathId } from 'verses-shared/types/Tree'

export const ScrollRight: React.FC<{
  path: PathId
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
