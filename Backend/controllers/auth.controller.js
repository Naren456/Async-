import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/token.js";

const JWT_SECRET = process.env.JWT_SECRET; 

// --- SIGNUP ---Controller -- //
export const signup = async (req, res) => {
  try {
    const { email, password, name, cohortNo } = req.body;

    if(!email || !password || !name || !cohortNo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if(password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if(cohortNo <= 0) {
      return res.status(400).json({ message: "Cohort number must be a positive integer" });
    }

    // check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        cohortNo: Number(cohortNo),
        password: hashedPassword,
      },
    });

    // generate token
    const token = generateToken(user.id);
    res.cookie('token', token , {
         httpOnly:true,
         sameSite:true,
         maxAge: 30*24*60*60*1000 // 30 days
     });

    res.status(201).json({ message :"SignUp Successfull" });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// --- SIGNIN ---
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = generateToken(user.id);
    res.cookie('token', token , {       
            httpOnly:true,
            sameSite:true,
            maxAge: 30*24*60*60*1000 // 30 days
        });

    // return user and token
    user.password = undefined; // Exclude password from the response

    res.status(200).json({message :"Signin Successfull" , user });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
