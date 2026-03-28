import {useState} from "react";
import Header from "../componenets/Header"
import { useNavigate } from "react-router-dom";
import axios from "axios"



const Signup=()=>{
    const navigate = useNavigate();
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPass, setConfirmPass]=useState("");

    const API = import.meta.env.VITE_API_URL;

    const handleSignup= async(e)=>{
        e.preventDefault();

        if(!firstName || !lastName || !email || !password || !confirmPass){
            return alert("All fields are required filled");
        }

        if(password.length < 6){
            return alert("password must be at least 6 characters");
        }

        if(password!=confirmPass){
            return alert("Password and Confirm-Password do not match");
        }

        try{
            const res= await axios.post(
                `${API}/users/signup`,
                {
                    fullname:{
                        firstname:firstName,
                        lastname:lastName
                    },
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            );

            console.log(res.data);
            alert("Signup success");

            navigate("/dashboard");

        }
        catch(err){
            console.log(err);
            alert(err.response?.data?.message || "Signup failed");
        }
    }
    return (
        <div>
            <Header></Header>

            <div className="flex justify-center mt-20">
                
                <form
                onSubmit={handleSignup}
                className="border rounded w-[400px] p-10 shadow-lg" 
                >
                    <h1 className="text-xl mb-5 text-center">Signup</h1>
                    <div className="flex justify-content w-full px-4 mb-2">
                        {/* first Name */}
                    <input
                     type="text"
                     className="bg-gray-100 rounded px-7 py-2 border w-full text-lg placeholder:text-base"
                     value={firstName}
                     placeholder="first-Name"
                       onChange={(e)=>{
                            setFirstName(e.target.value);
                            }}
        
                    />

                       <input
                     type="text"
                     className="bg-gray-100 ml-3 rounded px-7 py-2 border w-full text-lg placeholder:text-base"
                     value={lastName}
                     placeholder="Last-Name"
                       onChange={(e)=>{
                            setLastName(e.target.value);
                            }}
        
                    />
                    </div>
                    
                    <input
                     type="email"
                     className="bg-gray-100 rounded px-4 py-2 border w-full mb-2 "
                     value={email}
                     placeholder="Email"
                       onChange={(e)=>{
                            setEmail(e.target.value);
                            }}
        
                    />

                    <input
                     type="Password"
                     className="bg-gray-100 rounded px-4 py-2 border w-full mb-2 "
                     value={password}
                     placeholder="Password"
                       onChange={(e)=>{
                            setPassword(e.target.value);
                            }}
        
                    />

                    <input
                     type="Password"
                     className="bg-gray-100 rounded px-4 py-2 border w-full  mb-2"
                     value={confirmPass}
                     placeholder="Confirm-Password"
                       onChange={(e)=>{
                            setConfirmPass(e.target.value);
                            }}
        
                    />

                    <button
                    className="bg-blue-500 hover:bg-blue-700 active:scale-95 transition duration-200 text-white px-4 py-2 rounded w-full"
                    >
                        Submit
                    </button>

                </form>

            </div>
        </div>
    )
}

export default Signup;