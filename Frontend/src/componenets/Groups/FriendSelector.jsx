import { useEffect, useState } from "react";
import axios from "axios";

const FriendSelector = ({ selected, setSelected }) => {
  const [friends, setFriends] = useState([]);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(`${API}/users/friends`, {
          withCredentials: true,
        });

        console.log("FRIENDS:", res.data);

        setFriends(Array.isArray(res.data) ? res.data : res.data.data || []);
      } catch (err) {
        console.log("ERROR:", err);
        setFriends([]);
      }
    };

    fetchFriends();
  }, []);

  const toggleUser = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((u) => u !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="max-h-32 overflow-y-auto border rounded p-2">
      {friends.length === 0 ? (
        <p className="text-sm text-gray-400">No friends found</p>
      ) : (
        friends.map((f) => (
          <div
            key={f._id}
            onClick={() => toggleUser(f._id)}
            className="flex justify-between items-center p-1 cursor-pointer hover:bg-gray-100"
          >
            {/* ✅ NAME FIX */}
            <span>{f.fullname?.firstname || f.name || "User"}</span>

            <input
              type="checkbox"
              checked={selected.includes(f._id)}
              readOnly
            />
          </div>
        ))
      )}
    </div>
  );
};

export default FriendSelector;