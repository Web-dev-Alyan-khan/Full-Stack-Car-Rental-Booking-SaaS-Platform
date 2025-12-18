import express from "express"
import UserAuth from "../middleware/auth.js"
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOwnerCars, toggleCarAvailability, updateUserImage } from "../controllers/owner.controller.js"
import upload from "../middleware/multer.js"


const ownerRouter = express.Router()

ownerRouter.post("/change-role",UserAuth,changeRoleToOwner)
ownerRouter.post("/add-car",upload.single("image"),UserAuth,addCar)
ownerRouter.get("/cars",UserAuth,getOwnerCars)
ownerRouter.post("/toggle-car",UserAuth,toggleCarAvailability)
ownerRouter.post("/delete-car",UserAuth,deleteCar)

ownerRouter.get("/dashboard",UserAuth,getDashboardData)
ownerRouter.post("/update-image",upload.single('image'),UserAuth,updateUserImage)

export default ownerRouter