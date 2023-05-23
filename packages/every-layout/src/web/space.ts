const ratio = 1.5

export type SpaceIncrementsNumbers =
  | -5
  | -4
  | -3
  | -2
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
export type SpaceIncrementsStrings =
  | '-5'
  | '-4'
  | '-3'
  | '-2'
  | '-1'
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'

export type SpaceIncrements = SpaceIncrementsNumbers | SpaceIncrementsStrings

export function space(space: SpaceIncrements, unit?: string): number | string {
  const gap = typeof space === 'string' ? parseInt(space, 10) : space
  const size = Math.pow(ratio, gap)
  return unit ? `${size}${unit}` : size
}
