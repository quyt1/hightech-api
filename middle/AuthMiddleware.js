
 const jwtHelper = require("../helper/jwt.helper");
 const blackListToken = []
 
 let isAuth = async (req, res, next) => {
   const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
   if (tokenFromClient) {
     try {
       const decoded = await jwtHelper.verifyToken(tokenFromClient);
       req.user = decoded;
       next();
     } catch (error) {
       return res.status(401).json({
         message: 'Unauthorized.',
       });
     }
   } else {
     return res.status(403).send({
       message: 'No token provided.',
     });
   }
 }
 module.exports = {
   Auth: isAuth,
   blackListToken : blackListToken
 };