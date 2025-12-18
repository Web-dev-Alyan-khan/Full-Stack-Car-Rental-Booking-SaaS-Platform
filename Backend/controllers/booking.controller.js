import Booking from "../models/booking.model.js"
import Car from "../models/car.model.js";


//founction To Check Availability Of Car a given Date
const checkAvailability = async (car,pickupDate,returnDate) =>{
   
        const bookings = await Booking.find({
            car,
            pickupDate: {$lte : returnDate},
            returnDate: {$gte : pickupDate}
        }) 
        return bookings.length ===0;
}

// API To Check Availability Of Car For Given Date & Location
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;

    if (!location || !pickupDate || !returnDate) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Fetch all cars by location
    const cars = await Car.find({
      location,
      isAvaliable: true,
    });

    // Check availability for each car
    const availableCarsPromises = cars.map(async (car) => {
      const isAvaliable = await checkAvailability(
        car._id,
        pickupDate,
        returnDate
      );

      return {
        ...car._doc,
        isAvaliable,
      };
    });

    let availableCars = await Promise.all(availableCarsPromises);

    //  FIXED FILTER (THIS WAS THE BUG)
    availableCars = availableCars.filter(
      (car) => car.isAvaliable === true
    );

    return res.json({
      success: true,
      availableCars,
    });

  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};


// API To Create Booking
export const createBooking = async (req, res) => {
  try {
    const { _id: userId } = req.user; // logged-in user ID
    const { car, pickupDate, returnDate } = req.body;

    // Validate input
    if (!car || !pickupDate || !returnDate) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);

    if (returned <= picked) {
      return res.json({ success: false, message: "Return date must be after pickup date" });
    }

    // Check if car is available
    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if (!isAvailable) {
      return res.json({ success: false, message: "Car is not available for selected dates" });
    }

    // Fetch car details
    const carData = await Car.findById(car);
    if (!carData) {
      return res.json({ success: false, message: "Car not found" });
    }

    // Calculate total price
    const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDays;

    // Create booking
    await Booking.create({
      car,
      owner: carData.owner,
      user: userId,
      pickupDate: picked,
      returnDate: returned,
      price,
    });

    return res.json({ success: true, message: "Booking Created Successfully" });

  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};


//API To List USer Booking
export const getUserBookings = async (req,res) =>{
try {
    const {_id} = req.user
    const bookings = await Booking.find({user:_id}).populate("car").sort({createdAt:-1})
    res.json({success:true, bookings})
} catch (error) {
    console.log(error.message)
    res.json({success:false, message:error.message})
}
}

// API: Get Owner Bookings
export const getOwnerBookings = async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car")
      .populate({
        path: "user",
        select: "-password"
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API To Change Booking Status
export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user;
    const { bookingId, status } = req.body;

    if (!bookingId || !status) {
      return res.json({
        success: false,
        message: "Booking ID and status are required",
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.json({
        success: false,
        message: "Booking not found",
      });
    }

    // Owner authorization check
    if (booking.owner.toString() !== _id.toString()) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    booking.status = status;
    await booking.save();

    res.json({
      success: true,
      message: "Booking status updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
