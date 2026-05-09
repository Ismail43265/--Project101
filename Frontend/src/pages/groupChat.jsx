import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import Header from "../componenets/Header";
import Navbar from "../componenets/navbar";
import ExpenceAddModel from "../componenets/GroupChatExpence/ExpenceAddModel";
import axios from "axios";
import ExpenceCard from "../componenets/GroupChatExpence/ExpenceCard"

const API= import.meta.env.VITE_API_URL;

const GroupChat=()=>{
    const {id} = useParams();
    const navigate=useNavigate();

    const [name, setName]= useState();
    const [expence , setExpence] = useState([]);
    const [open ,setOpen] =useState(false);
    const [currentUserId, setCurrentUserId]=useState(null);

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);

    useEffect(()=>{
        const groupName= async () => {
        const res = await axios.get(`${API}/api/group/${id}`,
            {withCredentials : true}
        );
        
        setName(res.data.data.name);
    }
    if(id){
        groupName();
    }
    },[id]);

    const fetchExpence = async ()=>{
        try{
            const res = await axios.get(`${API}/api/expence/group/${id}`,{
                withCredentials: true
            });

            setExpence(res.data.data || []);
            setCurrentUserId(res.data.currentUserId);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(id){
            fetchExpence();
        }
    }, [id]);
    
    console.log(expence);

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
                         {name}
                    </div>

                    {/* MESSAGES */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        {expence.length===0 ?(
                            <p className="text-gray-400">No messages yet</p>
                        ):(
                            expence.map((item)=>{
                                const isMe= item.paidBy?._id === currentUserId;
                                console.log(item);
                                return (
                                    <ExpenceCard
                                    key={item._id}
                                    expence={item}
                                    isMe={isMe}
                                    />
                                );
                            })
                        )}
                    </div>

                    {/* INPUT */}
                   <button
                   onClick={()=> setOpen(true)}
                   className="bg-blue-500 text-white p-4 rounded ">
                        ADD
                   </button>

                </div>

            </div>
            <ExpenceAddModel
            id ={id}
            isOpen ={open}
            onClose={()=> setOpen(false)}
            onCreated = {()=>{
                setOpen(false);
                fetchExpence();
            }}
            ></ExpenceAddModel>

        </div>
    )
}

export default GroupChat;