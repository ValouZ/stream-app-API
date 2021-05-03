const User = require('../Models/User');
const bcrypt = require("bcryptjs");

exports.userGet = async (req, res, next) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.json(error)
    }
}

// exports.userGetOne = async (req, res, next) => {
//     try {
//         const result = await bcrypt.compare(req.body.password, )

//         const search = req.body.name ? 
//         {name : req.body.name, password :  req.body.password} :
//         {email : req.body.email, password :  req.body.password}

//         const user = await User.findOne(search)
//         if(!user){
//             res.json('Could not find a user');
//             return
//         }
//         res.json(user)
//     } catch (error) {
//         res.json(error)
//     }
// }

exports.userPost = async (req, res, next) => {
    if (req.body.email && req.body.name && req.body.password){
        const cryptedPassword = await bcrypt.hash(req.body.password, 12)
        try {
            const newUser = await User.create({
                email : req.body.email,
                name : req.body.name,
                password : cryptedPassword,
                role : 'user'
            })
            res.json(newUser)
        } catch (error) {
            res.json(error);
        }
    } else {
        res.json('Error');
    }
}