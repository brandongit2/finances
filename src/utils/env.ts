// For environment variables defined in .env file

const isBrowser = typeof window !== `undefined`

if (process.env.DATABASE_URL === undefined && !isBrowser) throw new Error(`DATABASE_URL is not defined`)
export const DATABASE_URL = process.env.DATABASE_URL!

if (process.env.GOOGLE_CLIENT_ID === undefined && !isBrowser) throw new Error(`GOOGLE_CLIENT_ID is not defined`)
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!

if (process.env.GOOGLE_CLIENT_SECRET === undefined && !isBrowser) throw new Error(`GOOGLE_CLIENT_SECRET is not defined`)
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

if (process.env.NEXT_PUBLIC_SUPABASE_URL === undefined) throw new Error(`NEXT_PUBLIC_SUPABASE_URL is not defined`)
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === undefined)
	throw new Error(`NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined`)
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (process.env.SUPABASE_SERVICE_ROLE_KEY === undefined && !isBrowser)
	throw new Error(`SUPABASE_SERVICE_ROLE_KEY is not defined`)
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (process.env.NEXTAUTH_SECRET === undefined && !isBrowser) throw new Error(`NEXTAUTH_SECRET is not defined`)
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!
