import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export const generateToken = (userId: number) => {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
};

export const hashPassword = async (password: string) => {
    return bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
};

export function verifyToken(req: Request) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return false

    const token = authHeader.split(' ')[1]; // Assuming the format is "Bearer <token>"
    if (!token) return false

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded) return false
        return true
    } catch (error) {
        return false
    }
}

// export function verifyToken(req: Request) {
//     const authHeader = req.headers.get('authorization');
    
//     if (!authHeader) {
//         throw new Error('Authorization header missing');
//     }

//     const token = authHeader.split(' ')[1];
    
//     if (!token) {
//         throw new Error('Token missing');
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY);
//         return decoded; // Return decoded token instead of true
//     } catch (error) {
//         throw new Error('Invalid token');
//     }
// }
