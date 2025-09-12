import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Jwt token generation
export const generateToken = (userId) => {

    try{
   const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });
    return token;
    }
    catch(error){
        console.error("Token generation error:", error);
    }
};