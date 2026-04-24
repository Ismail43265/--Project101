import { useState } from "react";
import axios from "axios";
import FriendSelector from "./FriendSelector";

const CreateGroupModal = ({ isOpen, onClose, onCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL;

  if (!isOpen) return null;

  const resetForm = () => {
    setName("");
    setDescription("");
    setImage(null);
    setSelectedFriends([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleCreate = async () => {
    try {
      if (!name) return alert("Enter group name");

      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("members", JSON.stringify(selectedFriends));
      if (image) formData.append("avatar", image);

      await axios.post(`${API}/api/group`, formData, {
        withCredentials: true,
      });

      resetForm();
      onCreated();
      onClose();

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-96 p-5 rounded-xl shadow-lg">

        <h2 className="text-lg font-semibold mb-3">Create Group</h2>

        {/* 🔥 IMAGE PREVIEW */}
        <div className="w-full h-28 bg-gray-200 rounded mb-2 flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">No Image</span>
          )}
        </div>

        {/* IMAGE INPUT */}
        <input
          type="file"
          accept="image/*"
          className="mb-3 text-sm"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* NAME */}
        <input
          placeholder="Group Name"
          className="w-full border p-2 rounded mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded mb-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* FRIEND SELECTOR */}
        <div className="mb-2">
          <FriendSelector
            selected={selectedFriends}
            setSelected={setSelectedFriends}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between mt-4">
          <button onClick={handleClose} className="text-gray-600">
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateGroupModal;