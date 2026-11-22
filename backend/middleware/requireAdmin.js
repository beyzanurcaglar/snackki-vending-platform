// Use after verifyJWT: only admin users may pass
export const requireAdmin = (req, res, next) => {
    if (!req.user || Number(req.user.isAdmin) !== 1) {
        return res.status(403).json({ message: 'Admin rights required' })
    }
    next()
}

// Users may only access their own record (admins may access all)
export const isSelfOrAdmin = (req, id) =>
    Number(req.user?.isAdmin) === 1 || String(req.user?.id) === String(id)
