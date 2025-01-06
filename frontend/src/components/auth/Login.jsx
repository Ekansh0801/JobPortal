import React, { useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [input,setInput] = useState({
    email:"",
    password:"",
    role:"",
  })

  const changeHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value});
  }

  const submitHandler = async(e) => {
    e.preventDefault();

    try{
      const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
        headers:{
          "Content_Type":"application/json"
        },
        withCredentials:true,
      })

      // console.log(res);

      if(res.data.success){
        toast.success(res.data.message);
        navigate("/");
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
          <h1 className="font-bold text-xl mb-5 ">Login</h1>
          <div className="my-2">
            <Label>Email</Label>
            <Input type="email" name="email" value={input.email} onChange={changeHandler} placeholder="write your email" />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input type="password" name="password" value={input.password} onChange={changeHandler} placeholder="write password" />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="student" checked={input.role==="student"} onChange={changeHandler} className="cursor-pointer"/>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input type="radio" name="role" value="recruiter" checked={input.role==="recruiter"} onChange={changeHandler} className="cursor-pointer"/>
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full my-2 bg-[#6A38C2] hover:bg-[#5b30a6]">Login</Button>
          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
