import { application } from "express";
import mongoose, { mongo } from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    requirements:[{
        type:String,
        required:true,
    }],
    salary:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    jobType:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company",
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    application:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Application",            
        }
    ]
})

export const Job = mongoose.model("Job",jobSchema);