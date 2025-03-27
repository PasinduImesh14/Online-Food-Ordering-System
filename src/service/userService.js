const User = require('../models/user.model');

module.exports = {
    async createUser(userData) {
        try{
            let{fullName,emailValue,password,role}=userData;
            const isUserExist=await User.findOne({email:emailValue})

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
};