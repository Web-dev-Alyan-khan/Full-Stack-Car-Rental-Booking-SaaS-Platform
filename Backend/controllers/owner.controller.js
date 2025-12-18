import { log } from "console";
import imagekit from "../config/imagekit.js";
import Booking from "../models/booking.model.js";
import Car from "../models/car.model.js";
import User from "../models/user.model.js";
import fs from "fs"

export const changeRoleToOwner = async (req,res) =>{
try {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id,{role:"owner"})
    res.json({success:true, message:"Now you can list cars"})
} catch (error) {
    console.log(error.message)
    res.json({success:false, message:error.message})
}
}

//API TO List Car
export const addCar = async (req, res) => {
    try {
        const { _id } = req.user; // from auth middleware
        const imageFile = req.file;
        const car = JSON.parse(req.body.carData);

        // Backend validation
        const requiredFields = ["brand","model","year","category","seating_capacity","fuel_type","transmission","pricePerDay","location","description"];
        for (let field of requiredFields) {
            if (!car[field]) {
                return res.status(400).json({ success: false, message: `${field} is required` });
            }
        }

        if (!imageFile) return res.status(400).json({ success: false, message: "Car image is required" });

        // Upload image to ImageKit
        const response = await imagekit.upload({
            file: imageFile.buffer,
            fileName: imageFile.originalname,
            folder: "/cars"
        });

        const optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                { height: "1280" },
                { quality: "auto" },
                { format: "webp" }
            ]
        });

        // Save to DB
        const newCar = await Car.create({ ...car, owner: _id, image: optimizedImageURL });

        res.json({ success: true, message: "Car added successfully", car: newCar });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};



//API To List Owner Cars
export const getOwnerCars = async (req,res) =>{
  try {
    const {_id} = req.user
    const cars = await Car.find({owner:_id})
    res.json({success:true, cars})
  } catch (error) {
     console.log(error.message)
    res.json({success:false,message:error.message})
  }
}

//API To Toggle Car Availability
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    // FIXED: use findById
    const car = await Car.findById(carId);

    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    // Check ownership
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // FIXED: property name must match schema → isAvaliable
    car.isAvaliable = !car.isAvaliable;

    await car.save();

    res.json({ success: true, message: "Availability Toggled" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Delete Car
// DELETE CAR --- FIXED
export const deleteCar = async (req, res) => {
  try {
    const { _id } = req.user;       // logged-in owner ID
    const { carId } = req.body;     // ID of the car to remove

    // Validate
    if (!carId) {
      return res.json({ success: false, message: "carId is required" });
    }

    // ❗ find() requires object → use findById instead (correct)
    const car = await Car.findById(carId);

    if (!car) {
      return res.json({ success: false, message: "Car not found" });
    }

    // Check ownership
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // Remove ownership & mark unavailable
    car.owner = null;               // FIX: Use =, not ==
    car.isAvaliable = false;

    await car.save();

    res.json({ success: true, message: "Car Removed" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//API To Get Dashboard Data
export const getDashboardData = async(req,res) =>{
try {
    const {_id, role} = req.user;
    if(role !== 'owner'){
        return res.json({success:false, message:"Unauthorized"})
    }
    const cars = await Car.find({owner:_id})
    const bookings = await Booking.find({owner:_id}).populate('car').sort({createdAt: -1})

    const pendingBookings = await Booking.find({owner:_id,status:"pending"})
    const completedBookings = await Booking.find({owner:_id,status:"confirmed"})

    //Calculate monthlyRevenue From bookings where status is comfirmed
    const monthlyRevenue = bookings.slice().filter(booking => booking.status === "confirmed").reduce((acc,booking)=> acc + booking.price,0)

    const dashboardData = {
        totalCars : cars.length,
        totalBookings: bookings.length,
        pendingBookings: pendingBookings.length,
        completedBookings: completedBookings.length,
        recentBookings: bookings.slice(0,3),
        monthlyRevenue
    }

    res.json({success:true, dashboardData})
    
} catch (error) {
     console.log(error.message)
     res.json({success:false,message:error.message})
}
}

//API To update User Image
export const updateUserImage = async (req, res) => {
  try {
    // console.log("req.file:", req.file); // debug
    // console.log("req.body:", req.body);

    const { _id } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file received",
      });
    }

    // Upload to ImageKit
    const uploadRes = await imagekit.upload({
      file: req.file.buffer,            // IMPORTANT
      fileName: req.file.originalname,
      folder: "/users",
    });

    const imageURL = imagekit.url({
      path: uploadRes.filePath,
      transformation: [
        { height: "400" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    await User.findByIdAndUpdate(_id, { image: imageURL });

    res.json({
      success: true,
      message: "Profile image updated",
      imageURL,
    });
  } catch (error) {
    console.log("Upload Error:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
};
