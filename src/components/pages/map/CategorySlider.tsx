import { useState } from 'react';
import MarkersCategories, { MarkerCategory } from './data/MarkerCategories';

interface CategorySliderProps {
    setMarkerShowType: (type: string) => void;
}

export default function CategorySlider({ setMarkerShowType }: CategorySliderProps) {
    const [selectedBtn, setSelectedBtn] = useState('');
    const [showAllBtn, setShowAllBtn] = useState(false);

    const handleCategoryClick = (type: MarkerCategory) => {
        // If already selected, clear the filter
        const newType = selectedBtn === type.id ? '' : type.id;
        setSelectedBtn(newType);
        setMarkerShowType(newType);
        setShowAllBtn(newType !== '');
        console.log(`選擇的類別: ${newType}`); // Debug
    };

    const handleShowAllClick = () => {
        setSelectedBtn('');
        setMarkerShowType('');
        setShowAllBtn(false);
    };

    return (
        <div className="relative">
            <div className="bg-white py-2 px-1 shadow-sm rounded-lg mb-2">
                <div className="flex space-x-1 overflow-x-auto pb-2 no-scrollbar">
                    {MarkersCategories.map((type) => (
                        <button
                            key={type.id}
                            className="flex flex-col items-center min-w-[70px] px-1"
                            onClick={() => handleCategoryClick(type)}
                        >
                            <div
                                className={`p-2 rounded-full mb-1 transition-all ${type.id === selectedBtn || selectedBtn === ''
                                    ? 'opacity-100'
                                    : 'opacity-30'
                                    }`}
                                style={{ backgroundColor: type.color }}
                            >
                                <type.icon
                                    className="text-white"
                                    size={18}
                                />
                            </div>
                            <span
                                className={`text-xs ${type.id === selectedBtn || selectedBtn === ''
                                    ? 'text-black'
                                    : 'text-gray-300'
                                    }`}
                            >
                                {type.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {showAllBtn && (
                <div className="absolute left-0 right-0 flex justify-center z-10 animate-fade-in-down">
                    <button
                        className="bg-white px-4 py-1 rounded-full shadow-md text-sm"
                        onClick={handleShowAllClick}
                    >
                        顯示全部
                    </button>
                </div>
            )}
        </div>
    );
}
