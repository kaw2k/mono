'use client'

import clsx from 'clsx'
import NextLink from 'next/link'
import { FormEvent } from 'react'
import { useTheme } from '../hooks/useTheme'
import { UrlObject } from 'url'

interface ClickableProps extends React.PropsWithChildren {
  onClick?: (e: FormEvent) => void
  className?: string
  id?: string
  variant?: 'button' | 'link' | 'text' | 'none'

  // icon?: Icons
  // iconPosition?: 'left' | 'right' | 'above'
  // color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'white' | BaseColors
  // justify?: 'center' | 'flex-start' | 'flex-end'
  // className?: string // Not in the CMS
  // uppercase?: boolean
  // size?: 'inline' | 'inline-block' | 'full' // Not in the CMS
}

interface LinkProps extends ClickableProps {
  tag: 'link'
  href: string | UrlObject
  activeClass?: string
}

interface ButtonProps extends ClickableProps {
  tag: 'button'
  type?: 'button' | 'reset' | 'submit'
  disabled?: boolean
}

const Clickable: React.FC<LinkProps | ButtonProps> = ({ ...props }) => {
  const theme = useTheme()
  const { tag, className, variant, ...rest } = props
  const classes = clsx(
    'clickable-root',
    className,
    `clickable-variant--${variant}`
  )

  return (
    <>
      {props.tag === 'button' && (
        <button type="button" {...rest} className={classes} />
      )}
      {props.tag === 'link' && (
        <NextLink
          scroll={false}
          prefetch={false}
          {...(rest as any)}
          className={classes}
        />
      )}

      <style jsx>{`
        :global(.clickable-root) {
          display: inline-flex;
          user-select: none;
          -webkit-user-drag: none;
          -webkit-touch-callout: none;
        }

        :global(.clickable-variant--none) {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
          color: inherit;
          text-decoration: none;
        }

        :global(.clickable-variant--link) {
          text-decoration: underline;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
          color: ${theme.palette.primary};
        }

        :global(.clickable-variant--button) {
        }

        :global(.clickable-variant--text) {
        }
      `}</style>
    </>
  )
}

export const Button: React.FC<Partial<ButtonProps>> = ({
  variant = 'button',
  ...props
}) => <Clickable tag="button" variant={variant} {...props} />

export const Link: React.FC<Partial<LinkProps>> = ({
  variant = 'link',
  href = '#',
  ...props
}) => <Clickable tag="link" href={href} variant={variant} {...props} />
