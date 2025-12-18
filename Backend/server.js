import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js"
import userRouter from "./Routes/user.routes.js"
import ownerRouter from "./Routes/owner.routes.js"
import bookingRouter from "./Routes/booking.routes.js"


const app = express()

//connect to database
await connectDB()

//Middleware
app.use(express.json())
app.use(cors())

//api end point
app.use("/api/user",userRouter)
app.use("/api/owner",ownerRouter)
app.use("/api/bookings",bookingRouter)

const PORT = 4000
app.listen(PORT,(req,res) =>{
    console.log("code is running",PORT);
})