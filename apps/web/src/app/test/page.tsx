'use client'

import {
  Layout,
  LayoutBottomTabBar,
  LayoutMain,
  LayoutSideTabBar,
} from '../../components/layouts'
import React from 'react'
import { stores } from 'verses-shared/data/store'
import { Column } from './column'
import { Row, RowHeader } from './row'
import { VerseIdComponents, decodeVerseId } from 'verses-shared/types/verse'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const data = stores.compressed

interface QueryParams extends VerseIdComponents {}

export default function Test() {
  const query = useSearchParams()

  const { works, work, book, books, chapter, chapters, verse, verses } =
    data.getBrowsingData({
      bookId: query.get('bookId'),
      chapter: query.get('chapter'),
      verse: query.get('verse'),
      workId: query.get('workId'),
    })

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
        <RowHeader backParams={{}}>Books</RowHeader>
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
        <RowHeader backParams={books.length > 1 ? { workId: work.id } : {}}>
          Chapters
        </RowHeader>
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
        <RowHeader backParams={{ workId: work.id, bookId: book.id }}>
          Verses
        </RowHeader>
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
              Verse {verseNumber}
            </Row>
          )
        })}
      </Column>
    )
  }

  function VersesDetail() {
    if (!verse) return null

    return <div>{verse[0]}</div>
  }

  return (
    <Layout>
      <LayoutMain>
        <WorksColumn />
        <BooksColumn />
        <ChaptersColumn />
        <VersesColumn />
        <VersesDetail />
      </LayoutMain>
      <LayoutBottomTabBar>bottom tabs</LayoutBottomTabBar>
      <LayoutSideTabBar>side tabs</LayoutSideTabBar>
    </Layout>
  )
}
