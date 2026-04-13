import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Friend from "../assets/icons/friends.png"
import Pending from "../assets/icons/pending.png"
import Add from "../assets/icons/add-user.png"
import Noti from "../assets/icons/warning.png"

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const API = import.meta.env.VITE_API_URL;
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  // 🔥 click outside close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔍 search
  const handleSearch = (value) => {
    setQuery(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      if (!value.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await axios.get(
          `${API}/users/search?query=${value}`,
          { withCredentials: true }
        );

        setResults(res.data); // 🔥 backend se status aa raha
      } catch (err) {
        console.log(err);
      }
    }, 300);
  };

  // ➕ send request
  const sendRequest = async (id) => {
    try {
      await axios.post(
        `${API}/users/send-request`,
        { toUserId: id },
        { withCredentials: true }
      );

      // 🔥 UI update
      setResults((prev) =>
        prev.map((u) =>
          u._id.toString() === id.toString()
            ? { ...u, status: "pending" }
            : u
        )
      );
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block">

      {/* Input */}
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="border px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Results */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white text-black rounded-xl shadow-lg max-h-72 overflow-y-auto z-50 border">

          {results.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 transition"
            >
              {/* Left */}
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar || "https://via.placeholder.com/40"}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-base font-medium">
                  {user.fullname?.firstname || "User"}
                </span>
              </div>

              {/* Right */}
              <div>
            {user.status === "friend" && (
                <img src={Friend} className="w-5 h-5" />
            )}

            {user.status === "pending" && (
                <img src={Pending} className="w-5 h-5" />
            )}

            {user.status === "received" && (
                <img src={Noti} className="w-5 h-5" />
            )}

            {!user.status && (
                <button onClick={() => sendRequest(user._id)}>
                <img src={Add} className="w-6 h-6" />
                </button>
  )}
</div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Search;