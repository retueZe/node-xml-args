export type RuntimeMode = 'development' | 'production' | 'test'

export function getRuntimeMode(): RuntimeMode {
    const env = process.env.NODE_ENV

    if (typeof env === 'undefined') return 'development'
    if (env.toUpperCase() === 'DEVELOPMENT') return 'development'
    if (env.toUpperCase() === 'PRODUCTION') return 'production'
    if (env.toUpperCase() === 'TEST') return 'test'

    return 'development'
}
