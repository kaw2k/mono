export function sample<T>(vals: T[]) {
  return vals[Math.floor(Math.random() * vals.length)]
}
