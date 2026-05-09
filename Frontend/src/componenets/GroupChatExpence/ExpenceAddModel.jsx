import { useEffect, useState } from "react";
import axios from "axios";

import MemberSelector from "./MemberSelector";

const ExpenceAddModel = ({isOpen , onClose , onCreated , id})=>{
    const [amount , setAmount] = useState("");
    const [split, setSplit] = useState("");
    const [selectedMembers , setSelectedMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const API= import.meta.env.VITE_API_URL;
    useEffect(()=>{
        const moneyPerHead=()=>{
            const perHead= amount/selectedMembers.length;
            setSplit(perHead.toFixed(2));
        }
        moneyPerHead();
    },[amount,selectedMembers])

    const resetForm= ()=>{
        setAmount("");
        setSplit("");
    }

    const handleClose = () =>{
        onClose();
        resetForm();
    }
   

    const handleAdd = async ()=>{
        if(!amount) return alert("No given Amount");

        if(selectedMembers.length<1) return alert("No selected members");

        try{
            setLoading(true);

            const expenceData= {
                amount : Number(amount),
                participants: selectedMembers,
                groupId: id
            }

            await axios.post(`${API}/api/expence/add` , expenceData ,{
                withCredentials: true
            });

            resetForm();
            onCreated();
            handleClose();

        }
        catch(err){
             alert(err.response?.data?.message || "Error");
        } 
        finally {
            setLoading(false);
        }
        
    }

    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white w-100 p-5 rounded-xl shadow-lg">

                <h2 className="text-lg font-semibold mb-3 flex items-center">Expence</h2>

                <div className="flex justify-content w-full px-2 mb-2">
                    <input 
                        placeholder="Amount"
                        className="w-full border p-2 rounded mb-2"
                        value={amount}
                        onChange={(e)=> setAmount(e.target.value)}
                    />

                    <div className="flex justify-content">
                        <h2 className="ml-2"> split:</h2>
                        <h2 className="ml-2"> {split}</h2>
                    </div>
                </div>

                <div className="mb-2">
                <MemberSelector
                    selected={selectedMembers}
                    setSelected={setSelectedMembers}
                    id={id}
                />
                </div>

                <div className="flex justify-between mt-4 ">
                    <button 
                    className="text-gray-600"
                    onClick={handleClose}>
                        Cancel
                    </button>

                    <button
                    onClick={handleAdd}
                    disabled={loading}
                    className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50">
                        {loading ? "..Adding" : "Add"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ExpenceAddModel;