type QueryFilterOperation =
  | '<'
  | '<='
  | '=='
  | '!='
  | '>='
  | '>'
  | 'array-contains'
  | 'in'
  | 'array-contains-any'
  | 'not-in'

export interface Storage<T> {
  get(id: string): Promise<T>
  put(id: string, flashcard: T): Promise<T>
  post(flashcard: T): Promise<T>
  delete(id: string): Promise<void>
  all(): Promise<T[]>
  query: <K extends keyof T>(
    args: [fieldPath: K, opStr: QueryFilterOperation, value: T[K]][]
  ) => Promise<T[]>
}

export interface LocalStorage<T> {
  get(): Promise<T>
  post(item: T): Promise<void>
  delete(): Promise<void>
}
