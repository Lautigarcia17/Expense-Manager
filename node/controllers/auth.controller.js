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

    static async verifyToken(req, res){
        const { token } = req.cookies;
        if (!token) return res.send(false);

        jwt.verify(token, TOKEN_SECRET, async (error, user)=>{
            if (error) return res.sendStatus(401);
            const userFound = await User.findById(user.id);
            if(!userFound) return res.sendStatus(401);

            return res.json({
                id: userFound.id,
                email: userFound.email,
            })
        })
    }

    static async logout(req, res){
        res.cookie('token',"", {
            httpOnly: true,
            secure: true,
            expires: new Date(0)
        })
        return res.sendStatus(200);
    }
}