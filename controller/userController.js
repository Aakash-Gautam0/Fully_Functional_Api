const userModel = require("../model/userModel")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const jwtkey = "dfffefe"
const nodemailer = require("nodemailer")
const randomstring = require("randomstring")
const Email = require("../helper/emailHelper")
const tokenSchema=require("../model/token")



exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userModel.findOne({ email: email })
        console.log("KKK", user)
        if (user) {
            res.send({ message: "user already registered" })
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const users = await userModel.create({ username: username, email: email, password: hashedPassword });
        const savedUser = await userModel.findOne({ email: email });
        const token = jwt.sign({ usid: savedUser._id }, jwtkey, { expiresIn: "5d" });
        const newToken=new tokenSchema({
            token:token,
            email:savedUser.email
        })
        await newToken.save()
        return res.status(201).json({ "status": 'User created successfully', savedUser });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getUserById = async (req, res) => {
    try {
        // let id = req.body._id;
        let id = req.query._id;

        let getUser = await userModel.findById(id);
        if (getUser) {
            return res.send({ responseMessage: "user find successfully", responseResult: getUser })
        }
        else {
            return res.send({ responseMessage: "user not found" })
        }
    }
    catch (error) {
        return res.send({ responseMessage: "invalid input" })

    }
}
exports.getAllUser = async (req, res) => {
    try {
        let id = await userModel.find();
        if (id) {
            return res.send({ responseMessage: "All users fetch Successfully", responseResult: id })
        }
    }
    catch (error) {
        res.send({ responseMessage: "invalid input" })
    }
}
exports.deleteUserById = async (req, res) => {
    try {
        let id = req.query._id;
        let deleteUser = await userModel.findByIdAndDelete(id)
        if (deleteUser) {
            return res.send({ responseMessage: "User deleted successfully" })
        }
        else {
            return res.send({ responseMessage: "User not found" })
        }

    }
    catch (error) {
        return res.send({ responseMessage: "invalid input", responseResult: error })
    }
}
exports.softdelete = async (req, res) => {
    try {
        let id = req.body._id;
        let deleteUser = await userModel.findByIdAndUpdate(id, { status: "Inactive" }, { new: true })
        if (deleteUser) {
            return res.send({ responseMessage: "User deleted successfully" })
        }
        else {
            return res.send({ responseMessage: "User not found" })
        }

    }
    catch (error) {
        return res.send({ responseMessage: "invalid input", responseResult: error })
    }
}
exports.deleteAll = async (req, res) => {
    try {
        let deleted = await userModel.deleteMany();
        if (deleted) {
            return res.send({ message: "All user deleted successfully" })
        }
        else {
            res.send({ message: "users not deleted" })
        }

    }
    catch (error) {
        res.send({ message: "something went wrong" })
    }
}
exports.updateUserById = async (req, res) => {
    try {
        let id = req.query._id;
        let username = req.body.username;
        let updateUser = await userModel.findByIdAndUpdate(id, { username }, { new: true })
        if (updateUser) {
            return res.send({ responseMessage: "user updated Successfully", responseResult: updateUser })
        }
        else {
            return res.send({ responseMessage: "User not updated" })
        }
    }
    catch (error) {
        return res.send({ responseMessage: "invalid input" })
    }
}
exports.login = async (req, res) => {
    try {
        if (req.body.password && req.body.email) {
            const result = await userModel.findOne({ email: req.body.email });
            if (!result) {
                return res.status(401).json({ message: 'User not found' });
            }

            const passCheck = await bcrypt.compare(req.body.password, result.password);
            if (!passCheck) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            jwt.sign({ result }, jwtkey, (err, token) => {
                if (err) {
                    return res.status(500).json({ message: 'Internal server error' });
                } else {
                    return res.status(200).json({
                        message: "Login successful",
                        user: result,
                        auth: token
                    });
                }
            });
        } else {
            return res.status(400).json({ message: "Email and password are required" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
exports.resetPassword = async (req, res) => {
    try {
        let id = req.query._id
        console.log("AAAA", id)
        // let newPassword = req.body.newPassword
        let user = await userModel.find({ id })
        console.log("SSSS", user)
        if (user) {
            req.body.password = bcrypt.hashSync(req.body.password)
            let update = await userModel.findByIdAndUpdate(id, { password: req.body.password }, { new: true })
            return res.send({ statusCode: 201, message: 'Password Reset Successfully', Result: update })
        } else {
            return res.send({ statusCode: 404, message: ' User Not Found' })

        }

    } catch (error) {
        return res.send({ statusCode: 500, message: 'Invalid Input', error: error.message })
    }
}
exports.forgotPassword = async (req, res) => {
    try {
        let email = req.body.email
        let result = await userModel.findOne({ email })
        if (!result) {
            return res.send({ statusCode: 404, message: 'User Not Found' })
        } else {
            let subject = `Reset your Password`
            let html = `http://localhost:8000/api/resetPassword?_id=${result._id}`
            // let html = '<p> Hii ,Please copy the link and <a href=`http://localhost:8000/api/resetPassword?_id=${result.id}`> reset your Password</a>'

            let resetMail = await Email.autoMail(to = email, subject, html)

            return res.send({ statusCode: 201, message: "Email Sent Successfully", Result: resetMail })
        }


    } catch (error) {
        return res.send({ statusCode: 500, message: 'Invalid Input' })
    }
}
exports.uploadFile = async (req, res) => {
    res.send("file upload successfully")
}