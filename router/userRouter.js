const router = require("express").Router()
const reqFilter=require("../middleware/auth")
const uploadss=require("../middleware/multer")
const {Validation}=require("../middleware/joi")
const { createUser, getUserById, getAllUser, deleteUserById, updateUserById, login ,softdelete,deleteAll,forgotPassword, resetPassword,uploadFile} = require("../controller/userController")
router.post("/createUser",reqFilter,Validation, createUser)
router.get("/getUserById", getUserById)
router.get("/getAllUser", getAllUser)
router.get("/deleteUserById", deleteUserById)
router.patch("/softdelete",softdelete)
router.patch("/updateUserById", updateUserById)
router.get("/login", login)
router.patch("/deleteAll",deleteAll)
router.post("/forgotPassword",forgotPassword)
router.all("/resetPassword",resetPassword)
router.post("/uploadFile",uploadss,uploadFile)         
module.exports = router 