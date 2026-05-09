import { useState , useEffect } from "react";
import axios from "axios";

const MemberSelector =({selected , setSelected , id})=>{
    const [members,setMembers]=useState([]);

    const API= import.meta.env.VITE_API_URL;

    useEffect(()=>{
        const fetchMembers = async ()=>{
            try{
                const res = await axios.get(`${API}/api/group/${id}` ,{
                    withCredentials:true
                });
                console.log(res.data);
                setMembers(res.data?.data?.members || []);
            }
            catch(err){
                console.log(err);
                setMembers([]);
            }
        }
        fetchMembers();
    }, [id]);

    useEffect(() => {
    if (members.length > 0) {
            const allUserIds = members.map(m => m.user._id);
            setSelected(allUserIds);
        }
    }, [members]);

    const toggleUser = (userId) => {
    if (selected.includes(userId)) {
      setSelected(selected.filter((id) => id !== userId));
    } else {
      setSelected([...selected, userId]);
    }
  };

    return (
    <div className="max-h-32 overflow-y-auto border rounded p-2">
      {members.length === 0 ? (
        <p className="text-sm text-gray-400">No Members found</p>
      ) : (
        members.map((m) => {
          const userId = m.user._id;

          return (
            <div
              key={userId}
              onClick={() => toggleUser(userId)}
              className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100 rounded"
            >
              {/* ✅ User Name */}
              <span>
                {m.user?.fullname?.firstname}{" "}
                {m.user?.fullname?.lastname}
              </span>

              {/* ✅ Checkbox */}
              <input
                type="checkbox"
                checked={selected.includes(userId)}
                readOnly
              />
            </div>
          );
        })
      )}
    </div>
  );
};


export default MemberSelector;