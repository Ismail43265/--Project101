import { useState, useRef, useEffect } from "react";

const ProfileDropdown=({user})=>{
    const [open, setOpen]=useState(false);

    const dropdownRef=useRef();

    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return ()=>{
            document.addEventListener("mousedown", handleClickOutside);
        }
    })
    return (
        <div ref={dropdownRef} className="relative">
            <img src="{user?.avatar}" 
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
                    <button className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                        Logout        
                    </button>

                </div>
            )}
        </div>
    )
}

export default ProfileDropdown;