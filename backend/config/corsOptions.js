import { isAllowedOrigin } from './allowedOrigins.js'

export const corsOptions = {
    origin: (origin, callback) => {
        // Disallowed origins get no CORS header, so the browser blocks the request
        callback(null, isAllowedOrigin(origin))
    },
    credentials: true,
    optionsSuccessStatus: 200
}
