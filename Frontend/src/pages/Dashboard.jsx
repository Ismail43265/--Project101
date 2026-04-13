import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../componenets/navbar";

const Dashboard=()=>{

    const [user, setUser]=useState(null);
    const API= import.meta.env.VITE_API_URL;

    useEffect(()=>{
        const fetchUser= async ()=>{
            try{
                const res = await axios.get(
                    `${API}/users/profile`,
                    { withCredentials: true }
                );

                setUser(res.data);
            }
            catch(err){
                console.log(err);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <Navbar user={user} />

      {/* Main Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">
          Welcome {user?.fullname?.firstname}
        </h2>
      </div>

    </div>
    )
}

export default Dashboard;