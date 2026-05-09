import React from "react";


const ExpenceCard = ({expence , isMe}) =>{

    console.log(expence);

    const payer=expence?.paidBy;

    const firstName=payer?.fullname?.firstname || "";
    const lastName=payer?.fullname?.lastname || "";

    const time = new Date(
        expence.createdAt
    ).toLocaleTimeString([],{
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <div className={`flex mb-4 ${isMe?"justify-end" : "justify-start"}`}>
            <div 
            className={` max-w-xs md:max-w-sm
                    rounded-2xl
                    px-4 py-3
                    shadow
                    ${
                        isMe
                            ? "bg-blue-500 text-white"
                            : "bg-white text-black"
                    }`}>

                        <h2 className="font-semibold text-sm mb-1">

                        {isMe
                            ? "You"
                            : `${firstName} ${lastName}`
                        }

                        </h2>
                        <p className="text-lg font-bold">

                            ₹ {expence.amount}

                        </p>

                         <p className={`
                            text-sm mt-1
                            ${
                                isMe
                                    ? "text-blue-100"
                                    : "text-gray-500"
                            }`}
                        >

                            Split between{" "}
                            {expence.participants?.length} members

                        </p>
                        <div
                            className={`
                            text-xs mt-2 text-right
                            ${
                                isMe
                                ? "text-blue-100"
                                : "text-gray-400"
                            }
                        `}
                    >

                        {time}

                    </div>
                </div>
        </div>
    )
}

export default ExpenceCard;