import fetch from 'isomorphic-unfetch'
import { sleep } from './sleep'

export async function getWebsite(url: string, retries = 3) {
  let error

  for (let i = 0; i < retries; i++) {
    try {
      return (await fetch(url)).text()
    } catch (err) {
      console.log(`Retrying: ${url}`)
      error = err
      await sleep((i + 1) * 1000)
    }
  }

  console.log(`Failed: ${url}`)
  throw error
}
