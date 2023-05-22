'use client'

import React, { useEffect } from 'react'
import { ClientStore } from 'verses-shared/data/storeClient'
import { Column } from './column'
import { Row, RowHeader } from './row'
import { VerseIdComponents, decodeVerseId } from 'verses-shared/types/verse'
import { useSearchParams } from 'next/navigation'
import { VStack } from 'every-layout/src/web/vstack'
import { VerseDetail } from './verseDetail'

interface QueryParams extends VerseIdComponents {}

export default function Browse() {
  const query = useSearchParams()

  const { works, work, book, books, chapter, chapters, verse, verses } =
    ClientStore.getBrowsingData({
      bookId: query.get('bookId'),
      chapter: query.get('chapter'),
      verse: query.get('verse'),
      workId: query.get('workId'),
    })

  useEffect(() => {
    const el = document.querySelector('.layout-main')
    el?.scrollTo({
      left: el.scrollWidth,
      behavior: 'smooth',
    })
  }, [verse, chapter, book, work])

  function WorksColumn() {
    return (
      <Column>
        <RowHeader>Works</RowHeader>
        {works.map((work) => {
          return (
            <Row key={work.id} params={{ workId: work.id }}>
              {work.title}
            </Row>
          )
        })}
      </Column>
    )
  }

  function BooksColumn() {
    if (!work || !books || books.length === 1) return null

    return (
      <Column>
        <RowHeader canGoBack>Books</RowHeader>
        {books.map((book) => {
          return (
            <Row key={book.id} params={{ workId: work.id, bookId: book.id }}>
              {book.title}
            </Row>
          )
        })}
      </Column>
    )
  }

  function ChaptersColumn() {
    if (!book || !chapters) return null

    return (
      <Column>
        <RowHeader canGoBack>Chapters</RowHeader>
        {chapters.map((chapter) => {
          return (
            <Row
              key={chapter.number}
              params={{
                workId: work.id,
                bookId: book.id,
                chapter: chapter.number,
              }}>
              {chapter.title}
            </Row>
          )
        })}
      </Column>
    )
  }

  function VersesColumn() {
    if (!verses || !verses.length) return null

    return (
      <Column>
        <RowHeader canGoBack>Verses</RowHeader>
        {verses.map((verse) => {
          const { verse: verseNumber } = decodeVerseId(verse[0])
          return (
            <Row
              key={verse[0]}
              params={{
                workId: work.id,
                bookId: book.id,
                chapter: chapter.number,
                verse: verse[0],
              }}>
              <VStack>
                <strong>Verse {verseNumber}</strong>
                <p>{verse[1]}...</p>
              </VStack>
            </Row>
          )
        })}
      </Column>
    )
  }

  return (
    <>
      <WorksColumn />
      <BooksColumn />
      <ChaptersColumn />
      <VersesColumn />
      {verse && <VerseDetail verseId={verse[0]} />}
    </>
  )
}
