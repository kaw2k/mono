import {
  Breakpoints,
  SafeArea,
  SafeAreaBreakpoints,
  SafeAreaSides,
} from '../types'

export function getSafeArea(
  code: SafeArea,
  selector: string,
  global?: boolean
): string {
  const res = code.split('-')
  const breakpoint = res[0] as SafeAreaBreakpoints
  const side = res[1] as SafeAreaSides
  const prefixedSelector = global ? `:global(${selector})` : `${selector}`

  return `
	@media screen and (min-width: ${getSafeAreaBreakpoint(breakpoint)}px) {
		${prefixedSelector} {
			${getSafeAreaSide(side)}
		}
	}
	`.trim()
}

function getSafeAreaBreakpoint(breakpoint: SafeAreaBreakpoints): number {
  switch (breakpoint) {
    case 'm':
      return Breakpoints.min_mobile
    case 't':
      return Breakpoints.min_tablet
    case 'd':
      return Breakpoints.min_desktop
  }
}

function getSafeAreaSide(side: SafeAreaSides): string {
  switch (side) {
    case 't':
      return `padding-top: env(safe-area-inset-top);`
    case 'r':
      return `padding-right: env(safe-area-inset-right);`
    case 'b':
      return `padding-bottom: env(safe-area-inset-bottom);`
    case 'l':
      return `padding-left: env(safe-area-inset-left);`
  }
}
