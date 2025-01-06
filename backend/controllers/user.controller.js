import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res) => {
    try{
        const {fullName,email,phoneNumber,password,role} = req.body;;
        if(!fullName || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                success:false,
                message:'All fields required!!!',
            })
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:'User already exists with this email',
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await User.create({
            fullName,
            email,
            phoneNumber,
            password:hashedPassword,
            role,

        });

        return res.status(200).json({
            success:true,
            message:'User registered successfully!!!',
        })

    }
    catch(error){
        console.log(error);
    }
}

export const login = async(req,res) => {
    try{
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                success:false,
                message:'All fields required!!!',
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User does not exist!!!',
            })
        }

        const matchPassword = await bcrypt.compare(password,user.password);
        if(!matchPassword){
            return res.status(400).json({
                success:false,
                message:'Incorrect Password!!',
            })
        };

        if(role !== user.role){
            return res.status(400).json({
                success:false,
                message:'Badmashi nahi mitrr!!',
            })
        }

        const tokenData = {
            userId:user._id,

        }

        user = {
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});

        return res.status(200).cookie("token",token,{maxAge:1 * 24 * 60 * 60 * 1000,httpsOnly:true,sameSite:'strict'}).json({
            message:`Welcome Back ${user.fullName}`,
            user,
            success:true,
        })

    }
    catch(error){
        console.log(error);
    }
}


export const logout = async(req,res) => {
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:'logged out successfully!!',
            success:true,
        })
    }
    catch(error){
        console.log(error);
    }
}

export const updateProfile = async(req,res) => {
    try{
        const {fullName,email,phoneNumber,bio,skills} = req.body;

        const userId = req.id; // to be reviewed later
        
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User not found!!!',
            })
        }
        
        if(fullName) user.fullName = fullName;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.bio = bio;
        if(skills){
            const skillsArray = skills.split(",");
            user.skills = skillsArray;
        }

        await user.save();

        user = {
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        };

        return res.status(200).json({
            message:"Profile Updated Successfully!!",
            success:true,
        })

    }
    catch(error){
         console.log(error);
    }
}