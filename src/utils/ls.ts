export const createLocalStorageApi = (key: string): [(def?: number) => number | null, (v: string | number) => void] => {
  const getter = (def?: number) => {
    const v = localStorage.getItem(key)
    if (v !== null) {
      const fmt = +v
      if (!Number.isNaN(fmt)) return fmt
    }

    return def ?? null
  }
  const setter = (v: string | number) => {
    localStorage.setItem(key, `${v}`)
  }

  return [getter, setter]
}
