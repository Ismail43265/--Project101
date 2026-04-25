import { useParams } from "react-router-dom";
import Header from "../componenets/Header";
import Navbar from "../componenets/navbar";
import { useNavigate } from "react-router-dom";

const GroupChat=()=>{
    const {id} = useParams();
    const navigate=useNavigate();

    return(
        <div className="h-screen flex flex-col overflow-hidden">

            <Navbar></Navbar>
            
            <div className="flex flex-1 overflow-hidden">

                 <div className="w-64 bg-gray-100 p-4">
                    <div
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 cursor-pointer mb-4 hover:text-blue-500"
                    >
                        <span className="text-xl">←</span>
                        
                        <h2 className="font-semibold">Groups</h2>
                    </div>
                </div>

                <div className="flex-1 flex flex-col">

                    {/* HEADER */}
                    <div className="p-4 border-b font-semibold">
                        Group ID: {id}
                    </div>

                    {/* MESSAGES */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <p>No messages yet</p>
                    </div>

                    {/* INPUT */}
                    <div className="p-5 border-t flex justify-center">
                        <button className="bg-blue-500 text-white p-4 rounded ">
                             Add
                        </button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default GroupChat;