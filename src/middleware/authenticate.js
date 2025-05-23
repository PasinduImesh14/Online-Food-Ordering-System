const { getUserIdFromToken } = require("../config/jwtProvider");
const userService = require("../service/userService");

const authenticate = async(req,res,next) => {
    //Bearer token
    try {
        const token = req.headers.authorization.splite(" ")[1];
        if (!token) {
            return res.status(401).json({message: "No token provided"});
        }
        const userId=getUserIdFromToken(token);
        const user=userService.findUserById(userId);

        req.user=user;

    } catch (error) {
        return res.send({error: error.message});
    }
    next();
}