import React from "react";
import Header from "../componenets/Header";
import {Link} from "react-router-dom";
import front from "../assets/front.png"

const Home= ()=>{
    
    return (
   <div>
        <div>
            <Header></Header>
           <div  className="flex flex-col items-center mt-55">
           
                <Link 
                to="/login" 
                className="rounded bg-blue-500 text-white p-3 inline-block mt-5 px-9 mb-1"
                >
                Login
                </Link>
                <Link 
                to="/signup" 
                className="rounded bg-blue-500 text-white p-3 inline-block mt-5 px-8 "
                >
                Signup
                </Link>

           </div>
        </div>
    </div>
    )
}

export default Home;