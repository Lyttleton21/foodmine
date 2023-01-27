import { verify } from "jsonwebtoken";

export default (req, res, next) => {
    //const { verify } = require("jsonwebtoken");
    const token = req.headers.access_token;
    if(!token){
        return res.status(401).send();
    }else{
        try {
            const decodedUser = verify(token, process.env.secretKey); 
           
           req.user = decodedUser;
        } catch (error) {
            res.status(401).send();
        }
    }
    next();
}