import { useNavigate } from "react-router-dom";

const GroupCard = ({ g }) => {
  const navigate= useNavigate();
  return (
    <div
    onClick={()=> navigate(`/group/${g._id}`)} 
    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer p-3 h-44 flex flex-col">

      {/* IMAGE */}
      <div className="h-20 bg-gray-200 rounded-xl mb-2"></div>

      {/* TITLE */}
      <p className="font-semibold text-gray-800 truncate">
        {g.name}
      </p>

      {/* DESCRIPTION */}
      <p className="text-xs text-gray-500 line-clamp-1">
        {g.description || "No description"}
      </p>

      {/* MEMBERS */}
      <div className="mt-auto text-xs text-gray-600 flex items-center gap-1">
        👥 {g.members?.length || 0} members
      </div>
    </div>
  );
};

export default GroupCard;