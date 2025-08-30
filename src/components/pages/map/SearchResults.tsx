import { FaDirections } from 'react-icons/fa';
import { Building } from './data/BuildingsInfo';

interface SearchResultsProps {
    textInputValue: string;
    buildings: Building[];
    onSelectBuilding: (building: Building) => void;
    getTwoPointsDistance: (lat: number, lon: number) => string;
}

export default function SearchResults({
    textInputValue,
    buildings,
    onSelectBuilding,
    getTwoPointsDistance
}: SearchResultsProps) {

    // Filter buildings based on search text
    const filteredBuildings = buildings.filter(building => {
        if (!textInputValue || textInputValue.trim() === '') {
            return false;
        }
        return (
            building.name.toLowerCase().includes(textInputValue.toLowerCase()) ||
            building.units.toLowerCase().includes(textInputValue.toLowerCase())
        );
    });

    if (filteredBuildings.length === 0) {
        return null;
    }

    return (
        <div className="absolute top-[120px] left-0 w-full bg-white shadow-lg rounded-md z-20 max-h-[70vh] overflow-y-auto">
            {filteredBuildings.map((building) => (
                <div
                    key={building.name}
                    className="flex justify-between items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                    onClick={() => onSelectBuilding(building)}
                >
                    <div className='flex-col w-2/3'>
                        <span className="font-medium">{building.name}</span>
                        <div className="text-gray-500 text-[12px]">{building.units}</div>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <span className="mr-2">{getTwoPointsDistance(building.latitude, building.longitude)} 公尺</span>
                        <FaDirections size={16} />
                    </div>
                </div>
            ))}
        </div>
    );
}
