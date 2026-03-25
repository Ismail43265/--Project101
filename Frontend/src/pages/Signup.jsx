import {useState} from "react";
import Header from "../componenets/Header"

const Signup=()=>{
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [email, setEmail]=useState("");
    return (
        <div>
            <Header></Header>

            <div className="flex justify-center mt-20">
                
                <form
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
                            setFirst(e.value.target);
                            }}
        
                    />

                       <input
                     type="text"
                     className="bg-gray-100 ml-2 rounded px-7 py-2 border w-full text-lg placeholder:text-base"
                     value={lastName}
                     placeholder="Last-Name"
                       onChange={(e)=>{
                            setFirst(e.value.target);
                            }}
        
                    />
                    </div>
                    
                    <input
                     type="email"
                     className="bg-gray-100 rounded px-4 py-2 border w-full  "
                     value={email}
                     placeholder="Email"
                       onChange={(e)=>{
                            setFirst(e.value.target);
                            }}
        
                    />

                </form>

            </div>
        </div>
    )
}

export default Signup;