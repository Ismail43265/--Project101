import { useNavigate } from "react-router-dom";

const SideGrooupCards= ({g})=>{
    const navigate=useNavigate();
    return (
        <div
        onClick={()=> navigate(`/group/${g._id}`)} 
        className=" w-full border rounded bg-gray-400 hover hover:shadow-xl transition cursor-pointer">
            <p className="">
                {g.name}
            </p>
        </div>
    )
}

export default SideGrooupCards;