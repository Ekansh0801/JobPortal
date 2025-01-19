import { Dialog } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setAuthUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store => store.auth);
  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map(skill => skill) || "",
    file: user?.profile?.resume || ""
});

const onChangeHandler = (e) => {
    setInput({...input,[e.target.name]:e.target.value});
}

const submitHandler = async(e) => {
    e.preventDefault();
    console.log(input);

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
        formData.append("file", input.file);
    }

    try {
        setLoading(true);
        const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });

        console.log(res);
        if (res.data.success) {
            dispatch(setAuthUser(res.data.user));
            toast.success(res.data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    } finally{
        setLoading(false);
    }


}

const fileHandler = (e) =>{
    const file = e.target.files?.[0];
    setInput({...input,file});
}
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName" className="text-right">
                  Name
                </Label>
                <Input id="fullName" name="fullName" value={input.fullName} onChange={onChangeHandler} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" name="email" value={input.email} onChange={onChangeHandler} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Number
                </Label>
                <Input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={onChangeHandler} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input id="bio" name="bio" value={input.bio} onChange={onChangeHandler} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input id="skills" name="skills" value={input.skills} onChange={onChangeHandler} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileHandler}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-2 bg-[#6A38C2] hover:bg-[#5b30a6]"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
