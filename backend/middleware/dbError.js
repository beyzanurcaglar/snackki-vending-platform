// Logs database errors without exposing details to the client
export const dbError = (res, error) => {
    console.error('[DB]', error?.code || '', error?.sqlMessage || error?.message || error)
    return res.status(500).json({ message: 'Internal server error' })
}
