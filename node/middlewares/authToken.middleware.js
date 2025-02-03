import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { ERROR_MESSAGES} from '../constants/errorMessages.js'

export function authToken(req, res, next) {
  try {
    const {token} = req.cookies;

    if (!token){
      return res.status(401).json({ 
        code: "AUTHORIZATION_DENIED",
        message: ERROR_MESSAGES.general.AUTHORIZATION_DENIED 
      });
    }
      
    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ 
          code: "INVALID_TOKEN",
          message: ERROR_MESSAGES.general.INVALID_TOKEN 
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ 
      code: 'INTERNAL_SERVER_ERROR',
      message: ERROR_MESSAGES.general.INTERNAL_SERVER_ERROR
  });
  }
};
