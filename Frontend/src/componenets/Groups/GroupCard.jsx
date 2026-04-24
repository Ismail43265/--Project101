import Default from "../../assets/icons/Default.png";
const GroupCard=({group})=>{
    return (
        <div className="">

            {/*Avatar*/}
            <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center text-xl">
                {group.avatar ? (
                    <img src={group.avatar} className="w-full h-full object-cover rounded-lg" />
                ):(
                    <img src={Default} className="w-full h-full object-cover rounded-lg" />
            )}
            </div>

            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                {group.description || "No description"}
            </p>

            <p className="font-semibold mt-1">{group.name}</p>
        </div>
    )
}

export default GroupCard;