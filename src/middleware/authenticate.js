const {getUserIdFromToken} = require("../config/jwtProvider")
const userService = require("../service/userService");
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res.status(401).json({ message: "Unauthorized, Please provide a token" });
        }
        const userId = getUserIdFromToken(token);
        const user = await userService.findUserById(userId);



        req.user = user;
    } catch (error) {
        return res.send({error: error.message});
    }
    next();
}

module.exports = authenticate;