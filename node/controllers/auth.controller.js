import { TOKEN_SECRET } from '../config.js';
import { createAccessToken } from '../libs/jwt.js';
import User from '../models/mongodb/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { ERROR_MESSAGES} from '../constants/errorMessages.js'

export class AuthController{    
    static async register(req,res) {
        try {
            const {email, password} = req.body;

            const userFound = await User.findOne({email});
    
            if (userFound) {
                return res.status(400).json({
                    code: 'EMAIL_IN_USE',
                    message: ERROR_CODES.auth.EMAIL_IN_USE,
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
            return res.status(500).json({ 
                code: 'INTERNAL_SERVER_ERROR',
                message: ERROR_MESSAGES.general.INTERNAL_SERVER_ERROR
            });
        }

    } 

    static async login(req, res){
        const {email, password} = req.body;

        const userFound = await User.findOne({email});

        if (!userFound) {
            return res.status(400).json({
                code: 'EMAIL_NOT_FOUND',
                message: ERROR_MESSAGES.auth.EMAIL_NOT_FOUND,
            });
        }

        const isEqual = await bcrypt.compare(password, userFound.password);
        if (!isEqual) {
            return res.status(400).json({
              code: 'INCORRECT_PASSWORD',
              message: ERROR_MESSAGES.auth.INCORRECT_PASSWORD,
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
                return res.status(401).json({
                    code:  'NO_TOKEN_PROVIDED',
                    message: ERROR_MESSAGES.general.NO_TOKEN_PROVIDED
                });
            }
    
            const decoded = jwt.verify(token, TOKEN_SECRET);
    
            const userFound = await User.findById(decoded.id);
            if (!userFound) {
                return res.status(404).json({ 
                    code: 'USER_NOT_FOUND',
                    message: ERROR_MESSAGES.auth.USER_NOT_FOUND 
                });
            }
    
            return res.json({
                id: userFound.id,
                email: userFound.email,
            });
        } catch (error) {
            console.error(error);
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    code: 'TOKEN_EXPIRED',
                    message: ERROR_MESSAGES.general.TOKEN_EXPIRED 
                });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ 
                    code: 'INVALID_TOKEN',
                    message: ERROR_MESSAGES.general.INVALID_TOKEN 
                });
            }
    
            return res.status(500).json({
                code: 'INTERNAL_SERVER_ERROR',
                message: ERROR_MESSAGES.general.INTERNAL_SERVER_ERROR 
            });
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
            return res.status(500).json({
                code: 'LOGOUT_ERROR',
                message: ERROR_MESSAGES.auth.LOGOUT_ERROR 
            });
        }
    }
}