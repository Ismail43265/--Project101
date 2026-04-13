import {useState, useRef, useEffect} from "react";
import axios from "axios";
import socket from "../socket"
import bell from "../assets/icons/bell.png";
const API = import.meta.env.VITE_API_URL;

const Notification=({user})=>{
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    const dropdownRef=useRef();

    useEffect(() => {
    const fetchNotifications = async () => {
        const res = await axios.get(`${API}/api/notifications`, {
        withCredentials: true
        });
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.notifications || [];

        setNotifications(data);
    };

    fetchNotifications();
    }, [user]);

    useEffect(() => {
    socket.on("new_notification", (data) => {
      
      setNotifications((prev) =>
        Array.isArray(prev) ? [data, ...prev] : [data]
      );
    });

      return () => {
        socket.off("new_notification");
      };
    }, []);

    useEffect(() => {
  if (user?._id) {
    socket.emit("join", user._id);
    console.log("JOINED ROOM:", user._id); // 🔥 DEBUG
  }
}, [user]);


    const safeNotifications = Array.isArray(notifications) ? notifications : [];
    const unreadCount = safeNotifications.filter(n => !n.isRead).length;

    const handleRead = async (id) => {
    try {
      await axios.patch(`${API}/api/notifications/${id}/read`, {}, {
        withCredentials: true
      });

      setNotifications(prev =>
        prev.map(n =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      console.log(err);
    }
  };


    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ){
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    },[]);
    return (
         <div ref={dropdownRef} className="relative">

      {/* 🔔 CUSTOM ICON BUTTON */}
      <button onClick={() => setOpen(!open)} className="relative">

        <img
          src={bell}
          alt="notifications"
          className="w-8 h-8 object-contain bg-red-500"
        />

        {/* 🔴 BADGE */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 📥 DROPDOWN */}
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl z-50"
        >
          {/* HEADER */}
          <div className="p-3 border-b font-semibold text-black">
            Notifications
          </div>

          {/* LIST */}
          <div className="max-h-80 overflow-y-auto">

            {safeNotifications.length === 0 ? (
              <p className="p-3 text-gray-500 text-sm">
                No notifications
              </p>
            ) : (
              safeNotifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => handleRead(n._id)}
                  className={`p-3 flex gap-3 items-start cursor-pointer hover:bg-gray-100 ${
                    !n.isRead ? "bg-gray-50" : ""
                  }`}
                >
                  {/* 👤 AVATAR */}
                  <img
                    src={user?.avatar || "/default-avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />

                  {/* 📝 TEXT */}
                  <div className="flex-1">
                    <p className="text-sm text-black">{n.message}</p>

                    <span className="text-xs text-gray-400">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      )}
    </div>
    )
}

export default Notification;