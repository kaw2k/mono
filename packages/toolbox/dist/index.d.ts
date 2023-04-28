/**
 * Used to generate typesafe primatives that are not assignable to each other.
 * - The first type parameter is a unique string literal that identifies the type.
 * - The second type parameter is the type of the opaque value.
 *
 * Example Usage:
 * ```ts
 * type ID = Opaque<'ID', string>
 * interface User {
 *  id: ID
 * }
 *
 * const user: User = {
 *   id: '123' // Type 'string' is not assignable to type 'ID'
 * }
 * ```
 */
type Opaque<K, T> = T & {
    __TYPE__: K;
};

type Id = Opaque<'id', string>;
declare const Id: () => Id;

declare const shuffle: <T>(originalArray: T[]) => T[];

/**
 * A list of words to use for generating text.
 * @param type the type of text to generate. 'word' | 'sentence' | 'paragraph'. Defaults to 'word'.
 * @param size the number of {type} to generate.
 * @returns
 */
declare function text(type: 'word' | 'sentence' | 'paragraph', size?: number): string;

declare function sample<T>(vals: T[]): T;

export { Id, Opaque, sample, shuffle, text };
