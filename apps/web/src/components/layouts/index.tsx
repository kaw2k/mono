'use client'

import clsx from 'clsx'
import { Breakpoints } from 'every-layout/src/web/types'
import React from 'react'

export const MAX_MOBILE = `${Breakpoints.max_mobile}px`
export const TABLET = `${Breakpoints.min_tablet}px`
const DESKTOP = `${Breakpoints.min_desktop}px`

export const Layout: React.FC<{
  children?: React.ReactNode
  className?: string
  component?: string
  variant?: 'app'
}> = ({
  className,
  component: Component = 'div' as any,
  children,
  variant = 'app',
  ...props
}) => (
  <Component className={clsx(`layout--${variant}`, className)} {...props}>
    {children}

    {/* Base Styles */}
    <style jsx>{`
      .layout--app {
        display: grid;
        height: 100%;
        width: 100%;
      }
    `}</style>

    {/* Mobile Styles */}
    <style jsx>{`
      .layout--app {
        grid-template-areas:
          'header'
          'main'
          'footer'
          'bottom-tabs';
        grid-template-rows:
          auto
          1fr
          auto
          auto;
        grid-template-columns: 1fr;
      }
    `}</style>

    {/* Tablet Styles */}
    <style jsx>{`
      @media screen and (min-width: ${TABLET}) {
        .layout--app {
          grid-template-areas:
            'side-tabs header'
            'side-tabs main'
            'side-tabs footer';
          grid-template-rows:
            auto
            1fr
            auto;
          grid-template-columns: auto 1fr;
        }
      }
    `}</style>
  </Component>
)

export const LayoutMain: React.FC<{
  children?: React.ReactNode
  className?: string
  component?: string
}> = ({
  className,
  component: Component = 'div' as any,
  children,
  ...props
}) => (
  <Component className={clsx(`layout-main`, className)} {...props}>
    {children}

    {/* Mobile Styles */}
    <style jsx>{`
      .layout-main {
        grid-area: main;
        display: flex;
        overflow: hidden;
      }

      @media screen and (max-width: ${MAX_MOBILE}) {
        .layout-main > :global(*:not(:last-child)) {
          display: none;
        }
      }
    `}</style>

    {/* Tablet Styles */}
    <style jsx>{`
      @media screen and (min-width: ${TABLET}) {
        .layout-main {
          display: flex;
          overflow-x: auto;
        }
      }
    `}</style>
  </Component>
)

export const LayoutBottomTabBar: React.FC<{
  children?: React.ReactNode
  className?: string
  component?: string
}> = ({
  className,
  component: Component = 'div' as any,
  children,
  ...props
}) => (
  <Component className={clsx(`layout-bottom-tab-bar`, className)} {...props}>
    {children}

    {/* Mobile Styles */}
    <style jsx>{`
      .layout-bottom-tab-bar {
        grid-area: bottom-tabs;
        display: flex;
      }
    `}</style>

    {/* Tablet Styles */}
    <style jsx>{`
      @media screen and (min-width: ${TABLET}) {
        .layout-bottom-tab-bar {
          display: none;
        }
      }
    `}</style>
  </Component>
)

export const LayoutSideTabBar: React.FC<{
  children?: React.ReactNode
  className?: string
  component?: string
}> = ({
  className,
  component: Component = 'div' as any,
  children,
  ...props
}) => (
  <Component className={clsx(`layout-side-tab-bar`, className)} {...props}>
    {children}

    {/* Mobile Styles */}
    <style jsx>{`
      .layout-side-tab-bar {
        grid-area: side-tabs;
        display: none;
      }
    `}</style>

    {/* Tablet Styles */}
    <style jsx>{`
      @media screen and (min-width: ${TABLET}) {
        .layout-side-tab-bar {
          display: flex;
          flex-flow: column;
        }
      }
    `}</style>
  </Component>
)
