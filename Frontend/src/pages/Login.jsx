import { useState } from "react";
import Header from "../componenets/Header";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login=()=>{

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const [Data, setData]=useState();
    
        const submitHandler=(e)=>{
            e.preventDefault();
    
            setEmail('');
            setPassword('');
        }

    const API= import.meta.env.VITE_API_URL;

    const handlelogin= async ()=>{
        try{
            const res= await axios.post(
                `${API}/users/login`,
                {email,password}
            );

            console.log(res.data);
            alert("login succes")
        }
        catch(err){
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
                   {data} 
                );
            }
            catch(err){
             res = await axios.post(
                    `${API}/users//signup`,
                    data
                );
            }
            console.log(res.data);
            alert("Google Login Success");
        }
        catch(err){
             console.log(err);
        }
    }

    return (
       <div>
        <Header></Header>
        <div className="flex justify-center mt-20">
        <div className="border p-10 rounded w-[400px]">
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
            type="Password"
            onChange={(e)=> setPassword(e.target.value)}
            className="bg-gray-100 px-4 py-2 w-full mb-3 border rounded"
            value={password}
            placeholder="Password"
            />

            {/*Login-Button*/}
            <button
            onClick={handlelogin}
            className="bg-blue-500 text-white w-full rounded mb-4 py-2" 
            >Login</button>

            {/* GOOGLE LOGIN */}
            <div className="flex justify-center">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.log("Google Login Failed")}
                />
            </div>
        </div>
       </div>
       </div>
    )
}

export default Login;