import React, { useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";

const Signup = () => {

  const [input,setInput] = useState({
    fullName:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  })

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value});
  }

  const changeFileHandler = (e) => {
    setInput({...input,file:e.target.files?.[0]});
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName",input.fullName)
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("password",input.password)
    formData.append("role",input.role)



    if(input.file){
      formData.append("file",input.file);
    }
    try{
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content_Type":"multipart/form-data"
        },
        withCredentials:true,
      })

      if(res.data.success){
        toast.success(res.data.message);
        navigate("/login");
      }
    }
    catch(error){
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 ">Signup</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input type="text" name="fullName" value={input.fullName} onChange={changeEventHandler} placeholder="write your name" />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="write your email" />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input type="phone" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="write your Phone Number" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="write password" />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" checked={input.role === "student"} onChange={changeEventHandler} value="student" className="cursor-pointer"/>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input type="radio" name="role" checked={input.role === "recruiter"} onChange={changeEventHandler} value="recruiter" className="cursor-pointer"/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer"/>
            </div>
          </div>

          <Button type="submit" className="w-full my-2 bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
