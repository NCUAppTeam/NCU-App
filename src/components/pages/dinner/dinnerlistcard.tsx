import { DocumentTextIcon, PlusCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import Restaurant from "../../../backend/dinner/Entities/Restaurant";

export function DinnerListCard({
    restaurant,
    toggleSelect,
    isSelected,
    openDetail,
}: {
    restaurant: Restaurant;
    toggleSelect: (restaurant: Restaurant) => void;
    isSelected: boolean;
    openDetail: (restaurant: Restaurant) => void;
}) {
    return (
        <div className="flex flex-row card card-side bg-white shadow-sm h-32 my-4 shadow-xl rounded-lg">
            {/* Image Section */}
            <div className="flex-shrink-0 w-32 h-32">
                <img
                    className="object-cover w-full h-full border-2 border-gray-200 rounded-l-lg"
                    src={restaurant.image}
                    alt={restaurant.restaurant}
                />
            </div>

            {/* Title Section */}
            <div className="flex-grow w-1/3 flex flex-col justify-center px-4">
                <h4 className="card-title text-sm font-semibold break-words">
                    {restaurant.restaurant}
                </h4>
            </div>

            {/* Button Section */}
            <div className="flex-shrink-0 w-1/3 bg-gray-100 flex flex-row justify-center items-center rounded-r-lg px-4">
                <div className="card-actions flex flex-col sm:flex-row items-center sm:justify-center space-y-2 sm:space-y-0">
                    <button
                        className={`btn btn-md ${isSelected ? "bg-rose-100 hover:bg-rose-200 text-rose-700 hover:text-rose-800" : "bg-green-600 hover:bg-green-500 text-white"}`}
                        onClick={() => toggleSelect(restaurant)}
                    >
                        {isSelected ?
                            <div className="flex flex-row items-center">
                                <XCircleIcon className="inline-block w-4 h-4 mr-1" />
                                移除
                            </div> :
                            <div className="flex flex-row items-center">
                                <PlusCircleIcon className="inline-block w-4 h-4 mr-1" />
                                加入
                            </div>
                        }
                    </button>
                    <button
                        className="btn btn-md bg-sky-200 hover:bg-sky-600 text-sky-700 hover:text-white"
                        onClick={() => openDetail(restaurant)}
                    >
                        <div className="flex flex-row items-center">
                            <DocumentTextIcon className="inline-block w-4 h-4 mr-1" />
                            詳情
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}