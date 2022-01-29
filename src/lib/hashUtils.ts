const getHashParams = () => {
  const hash = window.location.hash.substring(1)
  const hashComponents = hash.split('&')
  const hashParamsComponents = hashComponents.map((hashComponent) =>
    hashComponent.split('=')
  )
  const hashParams: { [key: string]: string | undefined } = {}
  hashParamsComponents.forEach((hashParamComponents) => {
    if (hashParamComponents.length !== 2) {
      return
    }
    hashParams[hashParamComponents[0]] = hashParamComponents[1]
  })
  return hashParams
}

export const encodeHashParam = (value: string) => {
  return encodeURIComponent(btoa(value))
}

const decodeHashParam = (value: string) => {
  return atob(decodeURIComponent(value))
}

export const getDecodedHashParam = (key: string) => {
  const hashParams = getHashParams()
  const valueEncoded = hashParams[key]
  return valueEncoded === undefined ? undefined : decodeHashParam(valueEncoded)
}
