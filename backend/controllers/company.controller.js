import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async(req,res) => {
    try{
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                success:false,
                message:'Company name required!!!',
            })
        }        

        let company = await Company.findOne({name : companyName});
        if(company){
            return res.status(400).json({
                success:false,
                message:'Company already exists!!',
            })
        }

        company = await Company.create({
            name:companyName,
            userId:req.id
        })

        return res.status(200).json({
            success:true,
            company,
            message:'Company registered successfully!!',
        })
    }
    catch(error){
        console.log(error);
    }
}


export const getCompany = async(req,res) => {
    try{
        const userId = req.id // loggedin user id
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(400).json({
                success:false,
                message:'No companies found!!',
            })
        }

        return res.status(200).json({
            success:true,
            companies,
        })

    }
    catch(error){
        console.log(error);
    }
}

// get comapny by id

export const getCompanyById = async(req,res) => {
    try{
        const id = req.params.id;
        
        const company = await Company.findById(id);

        if(!company){
            return res.status(400).json({
                success:false,
                message:'No company found!!',
            })
        }

        return res.status(200).json({
            company,
            success:true,
        })
    }
    catch(error){
        console.log(error);
    }
}


export const updateCompany = async(req,res) => {
    try{
        const {name,description,website,location} = req.body;
        // const file = req.file;

        
        const file = req.file;
        
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        
        const logo = cloudResponse.secure_url;
        
        const updatedData = {name,description,website,location,logo};
        const company = await Company.findByIdAndUpdate(req.params.id,updatedData,{new:true});

        
        if(!company){
            return res.status(400).json({
                success:false,
                message:'Spmething went wrong!!'
            })
        }

        return res.status(200).json({
            success:true,
            company,
            message:'information updated!!',
        })
    }
    catch(error){
        console.log(error);
    }
}

