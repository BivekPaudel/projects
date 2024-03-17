// import { secretKey } from "../../token.js";
import jwt from "json-web-token"
import { secretKey } from "../../constant.js";
let isAuthenticated = async (req, res, next) => {
  try {
    //get token from postman
    let tokenString = req.headers.authorization;
    let token = tokenString.split(" ")[1];

    //verify token
    let user = await jwt.verify(token, secretKey);
    req.id = user.id;
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Token not valid.",
    });
  }
};
export default isAuthenticated;
