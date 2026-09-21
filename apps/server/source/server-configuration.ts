export interface ServerConfiguration {
  readonly port: number
}

export const readServerConfiguration = (
  environment: Readonly<Record<string, string | undefined>>,
): ServerConfiguration => {
  const portValue = environment.PORT ?? '3000'
  const port = Number(portValue)

  if (!/^\d+$/.test(portValue) || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a decimal integer between 1 and 65535.')
  }

  return { port }
}
