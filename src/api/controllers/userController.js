import * as userService from '../services/userService.js';

export async function createUser(req, res) {
  try {
    const { nome, email, password, administrador = false } = req.body;
    if (!nome || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const user = userService.createUser({ nome, email, password, administrador });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });
    const token = userService.authenticate(email, password);
    if (!token) return res.status(401).json({ message: 'Invalid credentials' });
    return res.status(200).json({ authorization: token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}
