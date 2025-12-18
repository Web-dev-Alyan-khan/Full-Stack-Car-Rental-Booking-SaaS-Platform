import express from"express"
import { getCars, getUserData, loginUser, register } from "../controllers/user.controller.js"
import UserAuth from "../middleware/auth.js"


const userRouter = express.Router()  

userRouter.post("/register",register)
userRouter.post("/login",loginUser)
userRouter.get("/data",UserAuth, getUserData)
userRouter.get('/cars',getCars)

export default userRouter