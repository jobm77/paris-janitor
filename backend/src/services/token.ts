import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string;

export const generateToken = (userId: number) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
}

// verify is the token generated is valid
export const verifyAndRefreshToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

        const newToken = generateToken(decoded.userId);
        return { valid: true, token: newToken };
    } catch (error) {
        return { valid: false, error: 'Invalid or expired token' };  
    }
}