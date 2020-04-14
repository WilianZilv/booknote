import jwt from 'jsonwebtoken'

const PrivateKey_Client = "50f5c022494d511575dfe7d810c70dc8"

module.exports = async (req, res, next) => {
    const token = req.headers.auth;
    if (!token) return res.status(400).json({ message: "token error1" });
    try {
        const check = await jwt.verify(token, PrivateKey_Client, (err) => {
            if (err) return res.status(400).json({ message: "token error2" });
        });
    } catch {
        return res.status(400).json({ message: "token error4" });
    }
    return next();

} 