import { TOKEN_SECRET } from '../config.js';
import { createAccessToken } from '../libs/jwt.js';
import User from '../models/mongodb/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export class AuthController{

    static async register(req,res) {
        try {
            const {email, password} = req.body;

            const userFound = await User.findOne({email});
    
            if (userFound) {
                return res.status(400).json({
                    message: ["The email is already in use"],
                });
            }
            const passwordHash = await bcrypt.hash(password, 10);
    
            const newUser = new User({
                email,
                password: passwordHash
            })
    
            const userSaved= await newUser.save();
    
            const token = await createAccessToken({
                id: userSaved._id
            })

            res.cookie("token", token, {
                httpOnly: process.env.NODE_ENV !== "development",
                secure: true,
                sameSite: "none",
              });

            res.status(201).json({
                id: userSaved._id,
                email: userSaved.email
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    } 

    static async login(req, res){
        const {email, password} = req.body;

        const userFound = await User.findOne({email});

        if (!userFound) {
            return res.status(400).json({
                message: ["The email does not exist"],
            });
        }

        const isEqual = await bcrypt.compare(password, userFound.password);
        if (!isEqual) {
            return res.status(400).json({
              message: ["The password is incorrect"],
            });
        }

        const token = await createAccessToken({
            id: userFound._id,
            email: userFound.email
        })
        
        res.cookie("token", token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            sameSite: "none", 
            maxAge: 24 * 60 * 60 * 1000, 
          });

        res.json({
            message: 'Credentials correct!',
            id: userFound._id,
            email: userFound.email,
        });
    }

    static async verifyToken(req, res) {
        try {
            const { token } = req.cookies;
    
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
    
            const decoded = jwt.verify(token, TOKEN_SECRET);
    
            const userFound = await User.findById(decoded.id);
            if (!userFound) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            return res.json({
                id: userFound.id,
                email: userFound.email,
            });
        } catch (error) {
            console.error(error);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            }
    
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async logout(req, res) {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
            });
    
            return res.json({ message: 'Logged out successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error logging out' });
        }
    }
}