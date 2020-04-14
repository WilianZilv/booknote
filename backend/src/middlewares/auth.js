import jwt from 'jsonwebtoken'

const PrivateKey_Client = "50f5c022494d511575dfe7d810c70dc8"

module.exports = async (req, res, next) => {
    const token = req.headers.auth;
    if (!token) return res.status(400).json({ message: "token error" });
    try {
        const check = await jwt.verify(token, PrivateKey_Client);
        if (!check.username) {
            return res.status(400).json({ message: "token error" });
        }
    } catch {
        return res.status(400).json({ message: "token error" });
    }
    return next();

} 