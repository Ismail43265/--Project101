import { useState} from "react";
import Search from "./Search";
import ProfileDropdown from "./profileDropdown";
import Notification from "./Notification";

const Navbar=({user})=>{
    const [showSearch, setShowSearch]=useState(false);
    return (
        <div className="bg-blue-500 text-white sticky top-0 shadow-md z-50">
            <div className="flex justify-between items-center px-3 sm:px-6 py-3">
                {/* Logo */}
                <h1 className="text-lg sm:text-xl font-bold">
                    Money Contry
                </h1>

                {/* Right */}
                <div className="flex items-center gap-2 sm:gap-4">

                {/* Desktop Search */}
                <div className="hidden sm:block">
                    <Search />
                </div>

                 <Notification user={user} />

                {/* Mobile Search Button */}
                <button 
                    className="sm:hidden text-white"
                    onClick={() => setShowSearch(!showSearch)}
                >
                    🔍
                </button>

                {/* Profile */}
                <ProfileDropdown user={user} />
                </div>
            </div>
            {/* Mobile Search Bar */}
            {showSearch && (
                <div className="sm:hidden px-3 pb-2">
                    <Search />
                </div>
            )}
        </div>
    )
}

export default Navbar;