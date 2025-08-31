import { Building } from './data/BuildingsInfo';

interface BottomDrawerProps {
    selectedMarker: Building | null;
    distance: string;
    onClose: () => void;
}

export default function BottomDrawer({ selectedMarker, distance, onClose }: BottomDrawerProps) {
    if (!selectedMarker) return null;

    return (
        <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-xl shadow-lg z-30">
            <div className="px-4 py-2 border-b border-gray-200">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-2"></div>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{selectedMarker.name}</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
            </div>

            <div className="p-4">
                <p className="text-sm text-gray-600 mb-2">
                    距離您約 {distance} 公尺
                </p>

                {selectedMarker.description && (
                    <p className="text-sm text-gray-700 mb-4">
                        {selectedMarker.description}
                    </p>
                )}

                <div className="mb-4">
                    <h3 className="font-bold text-gray-700 mb-2">開放時間</h3>
                    {selectedMarker.opentime.map((time, index) => (
                        <p key={index} className="text-sm text-gray-600 mb-1">{time}</p>
                    ))}
                </div>

                <div className="mb-4">
                    <h3 className="font-bold text-gray-700 mb-2">建築物資訊</h3>
                    <p className="text-sm text-gray-600">{selectedMarker.units}</p>
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        onClick={() => {
                            // Open Google Maps navigation in a new tab with directions
                            const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedMarker.latitude},${selectedMarker.longitude}&travelmode=walking`;
                            window.open(url, '_blank');
                        }}
                    >
                        導航
                    </button>
                    <button
                        className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
                        onClick={onClose}
                    >
                        關閉
                    </button>
                </div>
            </div>
        </div>
    );
}
