import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Jwt token generation
export const generateToken = (userId) => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    
    try{
        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });
        return token;
    }
    catch(error){
        console.error("Token generation error:", error);
        throw error;
    }
};