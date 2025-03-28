const { getUserIdFromToken } = require('../config/jwtProvider');
const User = require('../models/user.model');

module.exports = {
    async createUser(userData) {
        try{
            let{fullName,emailValue,password,role}=userData;
            const isUserExist=await User.findOne({email:emailValue});

            if(isUserExist){
                throw new error("User already exist");
            }

            password=await bcrypt.hash(password,8);

            const user=await User.create({
                fullName,
                email:emailValue,
                password:password,
                role
            });
            return user;

        }catch(error){
            throw new Error(error.message);
        }
},

async getUserByEmail(email){
    try {
        const user=await User.findOne({email:email});
        if(!user){
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
},

async findUserById(userId){
    try {
        const user= await User.findById(userId).populate("addresses");
        if(!user){
            throw new Error("User not found with id - ",userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
},

async findUserProfileByJwt(jwt){
    try {
        const userId=getUserIdFromToken(jwt);
        const user=await this.findUserById(userId);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

};