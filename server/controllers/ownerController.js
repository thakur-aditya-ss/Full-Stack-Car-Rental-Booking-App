import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/User.js";
import fs from "fs";


// API to Change Role of User
export const changeRoleToOwner = async (req, res)=>{
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: "Now you can list cars"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to Get All Users Details for Admin
export const getAllUsersDetails = async (req, res) => {
    try {
        const { _id, role } = req.user;
        if(role !== 'owner'){
            return res.json({ success: false, message: "Unauthorized" });
        }
        
        // Find all bookings for this owner
        const bookings = await Booking.find({ owner: _id });
        const userIds = [...new Set(bookings.map(b => b.user.toString()))];
        
        const users = await User.find({ _id: { $in: userIds }, role: 'user' }).select('-password');
        res.json({ success: true, users });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API to get a specific user's bookings for Admin
export const getUserBookingsForAdmin = async (req, res) => {
    try {
        const { _id, role } = req.user;
        if(role !== 'owner'){
            return res.json({ success: false, message: "Unauthorized" });
        }
        const { userId } = req.params;
        const bookings = await Booking.find({ user: userId, owner: _id }).populate('car').sort({ createdAt: -1 });
        const user = await User.findById(userId).select('name email');
        res.json({ success: true, bookings, user });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API to List Car

export const addCar = async (req, res)=>{
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        
        if (!req.files || !req.files.image || !req.files.rcDocument) {
            return res.json({success: false, message: "Car Image and RC Document are required"})
        }

        const imageFile = req.files.image[0];
        const rcFile = req.files.rcDocument[0];

        // Upload Car Image to ImageKit
        const imageFileBuffer = fs.readFileSync(imageFile.path)
        const imageResponse = await imagekit.upload({
            file: imageFileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })
        const optimizedImageUrl = imagekit.url({
            path : imageResponse.filePath,
            transformation : [
                {width: '1280'}, // Width resizing
                {quality: 'auto'}, // Auto compression
                { format: 'webp' }  // Convert to modern format
            ]
        });

        // Upload RC Document to ImageKit
        const rcFileBuffer = fs.readFileSync(rcFile.path)
        const rcResponse = await imagekit.upload({
            file: rcFileBuffer,
            fileName: rcFile.originalname,
            folder: '/documents'
        })
        const optimizedRcUrl = imagekit.url({
            path : rcResponse.filePath,
            transformation : [
                {width: '1280'},
                {quality: 'auto'},
                { format: 'webp' }
            ]
        });

        const image = optimizedImageUrl;
        const rcDocument = optimizedRcUrl;
        
        await Car.create({...car, owner: _id, image, rcDocument})

        res.json({success: true, message: "Car Added"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to List Owner Cars
export const getOwnerCars = async (req, res)=>{
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner: _id })
        res.json({success: true, cars})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to Toggle Car Availability
export const toggleCarAvailability = async (req, res) =>{
    try {
        const {_id} = req.user;
        const {carId} = req.body
        const car = await Car.findById(carId)

        // Checking is car belongs to the user
        if(car.owner.toString() !== _id.toString()){
            return res.json({ success: false, message: "Unauthorized" });
        }

        car.isAvaliable = !car.isAvaliable;
        await car.save()

        res.json({success: true, message: "Availability Toggled"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Api to delete a car
export const deleteCar = async (req, res) =>{
    try {
        const {_id} = req.user;
        const {carId} = req.body
        const car = await Car.findById(carId)

        // Checking is car belongs to the user
        if(car.owner.toString() !== _id.toString()){
            return res.json({ success: false, message: "Unauthorized" });
        }

        // Delete the car from the database
        await Car.findByIdAndDelete(carId);

        res.json({success: true, message: "Car Deleted Successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to get Dashboard Data
export const getDashboardData = async (req, res) =>{
    try {
        const { _id, role } = req.user;

        if(role !== 'owner'){
            return res.json({ success: false, message: "Unauthorized" });
        }

        const cars = await Car.find({owner: _id})
        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });

        const pendingBookings = await Booking.find({owner: _id, status: "pending" })
        const completedBookings = await Booking.find({owner: _id, status: "confirmed" })

        // Calculate monthlyRevenue from bookings where status is confirmed
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking)=> acc + booking.price, 0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0,3),
            monthlyRevenue
        }

        res.json({ success: true, dashboardData });

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to update user image

export const updateUserImage = async (req, res)=>{
    try {
        const { _id } = req.user;

        const imageFile = req.file;

        // Upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        // optimization through imagekit URL transformation
        var optimizedImageUrl = imagekit.url({
            path : response.filePath,
            transformation : [
                {width: '400'}, // Width resizing
                {quality: 'auto'}, // Auto compression
                { format: 'webp' }  // Convert to modern format
            ]
        });

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id, {image});
        res.json({success: true, message: "Image Updated" })

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}   

// API to update owner profile details
export const updateOwnerProfile = async (req, res) => {
    try {
        const { _id } = req.user;
        const { name, dob, aadharNumber, panNumber, licenceNumber, address, gender } = req.body;

        await User.findByIdAndUpdate(_id, {
            name, dob, aadharNumber, panNumber, licenceNumber, address, gender
        });

        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}