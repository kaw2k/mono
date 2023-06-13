export type FlexFlow = 'row' | 'column' | 'row-reverse' | 'column-reverse'

export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

export type FlexJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'

export type FlexAlign =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'stretch'

export type SafeAreaBreakpoints = 'm' | 't' | 'd'
export type SafeAreaSides = 't' | 'r' | 'b' | 'l'
export type SafeArea = `${SafeAreaBreakpoints}-${SafeAreaSides}`

export const Breakpoints = {
  min_mobile: 0,
  max_mobile: 899,
  min_tablet: 900,
  max_tablet: 1199,
  min_desktop: 1200,
  max_desktop: 9999999999,
}
