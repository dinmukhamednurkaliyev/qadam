import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { appConfiguration } from '@/app/app-configuration'

const client = postgres(appConfiguration.databaseUrl)

export const database = drizzle(client)
