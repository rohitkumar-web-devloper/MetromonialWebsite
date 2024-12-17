"use server"

import { cookies } from 'next/headers'

export const getCookiesData = async (key: string): Promise<string | undefined> => {
    const cookie = (await cookies()).get(key)
    return cookie ? cookie.value : undefined
}
export const postCookiesData = async (key: string, value: string, options: { [key: string]: any } = {}) => {
    const cookieStore = await cookies()
    cookieStore.set(key, value, {
        ...options,  // Allow additional cookie options like maxAge, path, etc.
    })
}