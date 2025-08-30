import { useCallback } from 'react';
import { Building } from './data/BuildingsInfo';
import MarkersCategories from './data/MarkerCategories';

// This component shows custom markers for buildings on the map
interface CustomMarkerProps {
    marker: Building;
    isSelected: boolean;
    onClick: (marker: Building) => void;
    zoomLevel?: number;
}

export default function CustomMarker({ marker, isSelected, onClick, zoomLevel = 10000 }: CustomMarkerProps) {
    const handleClick = useCallback(() => {
        onClick(marker);
    }, [marker, onClick]);

    // Find the matching category for this marker
    const category = MarkersCategories.find(cat => cat.id === marker.type);
    const Icon = category ? category.icon : null;

    // 計算地圖中心點
    const centerLat = 24.968; // 校園中心點緯度
    const centerLon = 121.192; // 校園中心點經度

    return (
        <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
                // These positions are approximate - when you integrate with Google Maps API
                // you would use their positioning system instead
                top: `${50 - (marker.latitude - centerLat) * zoomLevel}%`,
                left: `${50 + (marker.longitude - centerLon) * zoomLevel}%`,
                zIndex: isSelected ? 10 : 1
            }}
            onClick={handleClick}
        >
            <div
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 ${isSelected ? 'scale-125' : 'scale-100'}`}
                style={{
                    backgroundColor: marker.color,
                    borderWidth: '2px',
                    borderColor: category?.border || '#333'
                }}
            >
                {Icon && <Icon className="text-white" size={14} />}
            </div>
            <div className={`text-xs font-bold mt-1 bg-white px-1 rounded ${isSelected ? 'bg-yellow-100' : ''}`}>
                {marker.name}
            </div>
        </div>
    );
}
