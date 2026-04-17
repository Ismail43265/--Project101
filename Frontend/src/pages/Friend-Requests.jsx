import {useState, useEffect} from "react";
import axios from "axios";
import Header from "../componenets/Header";
const API= import.meta.env.VITE_API_URL;

const Friend_requests= ()=>{
    const [request, setRequest]=useState([]);

    useEffect(()=>{
        const fetchRequest= async ()=>{
            const res= await axios.get(`${API}/users/friend-requests`,{
                withCredentials: true
            })

            setRequest(res.data);
        };

        fetchRequest();
    },[]);

    const handleAccept = async (fromUserId) => {
        await axios.post(
            `${API}/users/accept-request`,
            { fromUserId },
            { withCredentials: true }
        );

        setRequest(prev =>
            prev.filter(r => r.from._id !== fromUserId)
        );
    };
    
    const handleReject = async (fromUserId) => {
        await axios.post(
            `${API}/users/reject-request`,
            { fromUserId },
            { withCredentials: true }
        );
        setRequest(prev =>
            prev.filter(r => r.from._id !== fromUserId)
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">

      {/* 🔥 Container */}
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-5">

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-5 text-center">
          Friend Requests
        </h2>

        {/* Empty State */}
        {request.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg">😌 No pending requests</p>
            <p className="text-sm mt-1">You’re all caught up!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">

            {request.map((req) => (
              <div
                key={req.from._id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >

                {/* Left */}
                <div className="flex items-center gap-3">
                  <img
                    src={req.from.avatar || "/default-avatar.png"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-black">
                      {req.from.fullname.firstname}
                    </p>
                    <p className="text-xs text-gray-500">
                      wants to be your friend
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(req.from._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(req.from._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                  >
                    Reject
                  </button>
                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
    )
}

export default Friend_requests;