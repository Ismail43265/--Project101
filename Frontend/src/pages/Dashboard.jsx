import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "../componenets/navbar";
import CreateGroupModal from "../componenets/Groups/createGroupModel";
import GroupSection from "../componenets/Groups/GroupSection";

const Dashboard=()=>{

    const [user, setUser]=useState(null);
    const [open, setOpen] = useState(false);
    const [groups, setGroups] = useState([]);

    const API= import.meta.env.VITE_API_URL;

    useEffect(()=>{
        const fetchUser= async ()=>{
            try{
                const res = await axios.get(
                    `${API}/users/profile`,
                    { withCredentials: true }
                );

                setUser(res.data);
            }
            catch(err){
                console.log(err);
            }
        };
        fetchUser();
    }, []);

    const fetchGroups = async () => {
    const res = await axios.get(`${API}/api/group`, {
      withCredentials: true,
    });
    setGroups(res.data.data || []);
  };

  useEffect(() => {
    fetchGroups();
  }, []);
  console.log("GROUPS STATE:", groups);

    return (
        <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <Navbar user={user} />

      {/* Main Content */}
      <div className="px-8 py-6">

          <h2 className="text-xl font-semibold mb-6">
            Welcome {user?.fullname?.firstname}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

  {/* CREATE CARD */}
  <div
    onClick={() => setOpen(true)}
    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center justify-center cursor-pointer h-44 border-2 border-dashed"
  >
    <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-3xl mb-2">
      +
    </div>
    <p className="font-medium text-gray-700">Create Group</p>
  </div>

  {/* GROUPS */}
  {groups.map((g) => (
    <GroupSection key={g._id} g={g} />
  ))}

</div>

      </div> 

{/* MODAL OUTSIDE */}
<CreateGroupModal
  isOpen={open}
  onClose={() => setOpen(false)}
  onCreated={() => {
    setOpen(false);
    fetchGroups();
  }}
/>

    </div>
    )
}

export default Dashboard;