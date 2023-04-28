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
export type Opaque<K, T> = T & { __TYPE__: K }
