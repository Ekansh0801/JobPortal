import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button } from "../button";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async() => {
    try{
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
      console.log(res);
      if(res.data.success){
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    }
    catch(error){
      toast.error(res.data.message);
    }
  }
  const {user} = useSelector(store => store.auth)
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="cursor-pointer" onClick={() => (navigate("/"))}>
          <h1 className="text-2xl font-bold ">
            Job<span className="text-[#f83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {
              user && user.role === "recruiter" ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>                
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Jobs</Link></li>
                  <li><Link to="/browse">Browse</Link></li>
                </>
              )
            }
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-small text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-2 text-gray-600">
                  {
                    user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                    </div>
                    )
                  }
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
