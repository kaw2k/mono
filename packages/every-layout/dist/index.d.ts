type SpaceIncrementsNumbers = -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5;
type SpaceIncrementsStrings = '-5' | '-4' | '-3' | '-2' | '-1' | '0' | '1' | '2' | '3' | '4' | '5';
type SpaceIncrements = SpaceIncrementsNumbers | SpaceIncrementsStrings;
declare function space(space: SpaceIncrements, unit?: string): number | string;

export { space };
