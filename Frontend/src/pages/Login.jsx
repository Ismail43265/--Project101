import { useState } from "react";
import Header from "../componenets/Header";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const navigate = useNavigate();

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    

    const API= import.meta.env.VITE_API_URL;

    const handlelogin= async (e)=>{
        console.log("FORM SUBMITTED"); 
        e.preventDefault();
        if(!email || !password){
            return alert("Fill all credentials");
        }
        try{
             const res = await axios.post(
                `${API}/users/login`,
                { email, password },
                {
                    withCredentials: true 
                }
            );

            console.log(res.data);

            alert("Login success");

            navigate("/dashboard");

        }
        catch(err){
            alert("wrong email password")
            console.log(err.response?.data || err.message);
        }
    }

    const handleGoogleSuccess= async (credentialResponse)=>{
        try{
            const decoded= jwtDecode(credentialResponse.credential)

            const data = {
                email: decoded.email,
                googleId: decoded.sub,
                avatar: decoded.picture,
                fullname: {
                    firstname: decoded.given_name,
                    lastname: decoded.family_name || ""
                }
            };

            let res;

            try{
                res=await axios.post(
                   `${API}/users/login`,
                   data ,
                   {
                    withCredentials: true 
                    }
                );
            }
            catch(err){
             res = await axios.post(
                    `${API}/users/signup`,
                    data,
                    {
                    withCredentials: true 
                    }
                    
                );
            }
            console.log(res.data);

            alert("Google Login Success");

            navigate("/dashboard");
        }
        catch(err){
             console.log(err);
        }
    }

    return (
       <div>
        <Header></Header>
        
        <div className="flex justify-center mt-20">
            <form 
            onSubmit={handlelogin}
            className="border p-10 rounded w-[400px]"
            >
                <h1 className="text-xl mb-5 text-center">Login</h1>

            {/*Email*/}
            <input 
            type="email" 
            onChange={(e)=>setEmail(e.target.value)}
            className="bg-gray-100 px-4 py-2 w-full mb-3 border rounded"
            value={email}
            placeholder="Email"
            />

            {/*Password*/}
            <input
            type="password"
            onChange={(e)=> setPassword(e.target.value)}
            className="bg-gray-100 px-4 py-2 w-full mb-3 border rounded"
            value={password}
            placeholder="Password"
            />

            {/*Login-Button*/}
            <button
            type="submit"
            className="bg-blue-500 text-white w-full rounded mb-4 py-2" 
            >Login</button>

            {/* GOOGLE LOGIN */}
            <div className="flex justify-center">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.log("Google Login Failed")}
                />
            </div>
            </form>
       </div>
       </div>
    )
}

export default Login;