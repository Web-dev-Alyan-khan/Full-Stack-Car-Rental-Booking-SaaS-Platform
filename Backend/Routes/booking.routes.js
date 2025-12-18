import express from "express"
import UserAuth from "../middleware/auth.js"
import { changeBookingStatus, checkAvailabilityOfCar, createBooking, getOwnerBookings, getUserBookings } from "../controllers/booking.controller.js"


const bookingRouter = express.Router()

bookingRouter.post("/check-availability",UserAuth,checkAvailabilityOfCar)
bookingRouter.post("/create",UserAuth,createBooking)
bookingRouter.get("/user",UserAuth,getUserBookings)
bookingRouter.get("/owner",UserAuth,getOwnerBookings)
bookingRouter.post("/change-status",UserAuth,changeBookingStatus)

export default bookingRouter