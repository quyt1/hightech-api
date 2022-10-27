
 const jwtHelper = require("../helper/jwt.helper");
 const blackListToken = []
 const Constants = require('../constants');
 const { success, error } = require('../helper/response')

 let isAuth = async (req, res, next) => {
   const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
   if (tokenFromClient) {
     try {
       const decoded = await jwtHelper.verifyToken(tokenFromClient);
       req.user = decoded;
       next();
     } catch (e) {
       return error(req,res,'Unauthorized',401);
     }
   } else {
     return error(req,res,'No token provided',403);
   }
 }

 let isSuperAdmin = async (req, res, next) => {
  const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(tokenFromClient);
      if (decoded.role == Constants.USER_TYPE.SuperAdmin) {
        req.user = decoded;
        next();
      }else{
        return error(req,res,'Permission denied',403);
      }
    } catch (e) {
      return error(req,res,'Unauthorized',401);
    }
  } else {
    return error(req,res,'No token provided',403);
  }
 }

 let isAdmin = async (req, res, next) => {
  const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(tokenFromClient);
      if (decoded.role == Constants.USER_TYPE.SuperAdmin ||
         decoded.role == Constants.USER_TYPE.Admin) {
        req.user = decoded;
        next();
      }else{
        return error(req,res,'Permission denied',403);
      }
    } catch (e) {
      return error(req,res,'Unauthorized',401);
    }
  } else {
    return error(req,res,'No token provided',403);
  }
 }
 module.exports = {
   Auth: isAuth,
   blackListToken : blackListToken,
   isSuperAdmin : isSuperAdmin,
   isAdmin : isAdmin
 };