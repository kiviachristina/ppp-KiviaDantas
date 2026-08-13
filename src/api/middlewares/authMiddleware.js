import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'change_this_secret_in_prod';

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'Missing authorization' });
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth;
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
