import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./confirmLog"; // ensure correct path

const API = import.meta.env.VITE_API_URL;

const ProfileDropdown=({user})=>{
    const [open, setOpen]=useState(false);
    const [showLogout, setShowLogout] = useState(false);

    const dropdownRef=useRef();
    const navigate=useNavigate();

    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        }
    })

    const handleLogout = async () => {
    try {
      await axios.post(`${API}/users/logout`, {}, {
        withCredentials: true
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
    return (
        <>
        <div ref={dropdownRef} className="relative">
            <img src={user?.avatar} 
            alt="Profile"
            onClick={()=>setOpen(!open)}
            className="w-8 h-8 rounded-full cursor-pointer border border-white" />

            {open && (
                <div className="absolute right-0  mt-2 bg-white text-black rounded shadow-lg w-40">
                    <div className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                        {user?.fullname?.firstname}
                    </div>

                    <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                        Profile
                    </button>
                    <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                        Friends
                    </button>
                    <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                        Settings
                    </button>
                    <button 
                    onClick={() => setShowLogout(true)}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                        Logout        
                    </button>

                </div>
            )}
        </div>
        {showLogout && (
        <ConfirmModal
          title="Logout"
          message="Are you sure you want to logout?"
          onCancel={() => setShowLogout(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
        
    );
};

export default ProfileDropdown;