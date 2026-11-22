// Fixed allowed origins (LAN / Android emulator)
export const allowedOrigins = [
    'http://192.168.179.65:3000',
    'http://10.0.2.2:3000',
    'http://10.0.2.2:3001',
]

// During development allow any port on localhost / 127.0.0.1
// (React panel :3000, Flutter web :8080 or a random port)
const localhostPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/

export const isAllowedOrigin = (origin) =>
    !origin || allowedOrigins.includes(origin) || localhostPattern.test(origin)
