// controllers/userController.js
import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Get all users (admin/debug only)
export const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username, email, created_at FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // check if email exists
        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
        if (existing.rows.length > 0) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (username, email, password_hash) 
       VALUES ($1, $2, $3) 
       RETURNING id, username, email, created_at`,
            [username, email, hashedPassword]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // generate JWT
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT id, username, email, created_at FROM users WHERE id = $1',
            [id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Delete user (cascade deletes builds, comments, ratings, posts)
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User and related data deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
