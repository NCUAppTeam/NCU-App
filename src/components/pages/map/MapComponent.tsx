import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useMemo, useRef, useState } from 'react';
import BottomDrawer from './BottomDrawer';
import CategorySlider from './CategorySlider';
import BuildingsInfo, { Building } from './data/BuildingsInfo';
import MapStyle from './data/MapStyle';
import MarkersCategories from './data/MarkerCategories';
import HeaderSearchBar from './HeaderSearchBar';
import SearchResults from './SearchResults';

export default function MapComponent() {
    const [userLocation, setUserLocation] = useState({
        latitude: 24.9682806,
        longitude: 121.1928889
    });

    const [markerShowType, setMarkerShowType] = useState('');
    const [selectedMarker, setSelectedMarker] = useState<Building | null>(null);
    const [textInputValue, setTextInputValue] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    // 這裡定義Google地圖參考
    const mapRef = useRef<google.maps.Map | null>(null);
    // 追蹤地圖是否已完全載入
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    // 地圖中心位置 - 中央大學 (使用 useMemo 避免不必要的重新渲染)
    const center = useMemo(() => ({
        lat: 24.968,
        lng: 121.192
    }), []);

    // Handle marker selection
    const handleMarkerClick = (marker: Building) => {
        setSelectedMarker(marker);
        setTextInputValue(marker.name);
        setShowSearchResults(false);
    };

    // Handle closing the marker info
    const handleCloseMarkerInfo = () => {
        setSelectedMarker(null);
        setTextInputValue('');
    };

    // Handle search operations even when drawer is open
    const handleSearch = (searchTerm: string) => {
        // Always update search visibility based on search term length
        setShowSearchResults(searchTerm.length > 0);
    };

    // Calculate distance between two points
    const getTwoPointsDistance = (buildingLat: number, buildingLon: number) => {
        const userLocLat = (userLocation.latitude * Math.PI) / 180;
        const userLocLon = (userLocation.longitude * Math.PI) / 180;
        const destinationLat = (buildingLat * Math.PI) / 180;
        const destinationLon = (buildingLon * Math.PI) / 180;

        // Haversine formula
        const dlon = destinationLon - userLocLon;
        const dlat = destinationLat - userLocLat;
        const a = Math.sin(dlat / 2) ** 2 +
            Math.cos(userLocLat) * Math.cos(destinationLat) *
            Math.sin(dlon / 2) ** 2;

        const c = 2 * Math.asin(Math.sqrt(a));
        const r = 6371; // Radius of earth in kilometers

        // Calculate the result in meters
        return ((c * r * 1000).toFixed(0));
    };

    // 監聽地圖載入狀態，在地圖載入完成後確保標記顯示
    useEffect(() => {
        if (isMapLoaded && mapRef.current) {
            // console.log("地圖載入完成，準備渲染標記");

            // 立即觸發一次重新渲染
            google.maps.event.trigger(mapRef.current, 'resize');

            // 延遲再觸發一次，確保標記顯示
            setTimeout(() => {
                if (mapRef.current) {
                    // console.log("延遲觸發地圖重新渲染");
                    google.maps.event.trigger(mapRef.current, 'resize');
                }
            }, 500);
        }
    }, [isMapLoaded]);

    // Get user location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );

            // Watch position for updates
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    console.error('Error watching location:', error);
                },
                {
                    enableHighAccuracy: true
                }
            );

            return () => {
                navigator.geolocation.clearWatch(watchId);
            };
        }
    }, []);

    // 地圖容器樣式
    const mapContainerStyle = {
        width: '100%',
        height: '100%'
    };

    // 地圖選項
    const mapOptions = {
        styles: MapStyle,
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: false,
        fullscreenControl: true
    };

    // 在類別變化時確保標記顯示
    useEffect(() => {
        if (isMapLoaded && mapRef.current) {

            // 獲取過濾後的建築物數量進行調試
            const filteredCount = BuildingsInfo.filter(
                obj => markerShowType === '' || obj.type === markerShowType
            ).length;

            // 延遲觸發一次重新渲染，確保標記更新顯示
            setTimeout(() => {
                if (mapRef.current) {
                    // console.log("類別變更後觸發地圖重新渲染");
                    google.maps.event.trigger(mapRef.current, 'resize');
                }
            }, 300);
        }
    }, [markerShowType, isMapLoaded]);

    // 定義不同類型標記的圖標
    const getMarkerIcon = (type: string, isSelected: boolean) => {
        // 從 MarkerCategories 中找到匹配的類別
        const markerCategory = MarkersCategories.find(category => category.id === type);

        // 如果找到匹配的類別，使用其顏色；否則使用默認顏色
        const fillColor = markerCategory?.color || '#3B82F6';

        return {
            path: 'M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z',
            fillColor,
            fillOpacity: 1,
            strokeWeight: isSelected ? 2 : 1,
            strokeColor: '#FFFFFF',
            scale: isSelected ? 2 : 1.5,
        };
    };

    return (
        <div className="relative w-full h-screen bg-gray-100">
            {/* Google Map */}
            <LoadScript googleMapsApiKey="">
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={16}
                    options={mapOptions}
                    onLoad={map => {
                        console.log("Google Maps API 已載入");
                        mapRef.current = map;

                        // 簡化設置地圖已載入狀態的邏輯，適當延遲確保 DOM 準備好
                        setTimeout(() => {
                            // console.log("設置地圖載入狀態");
                            setIsMapLoaded(true);
                        }, 200);

                        return undefined;
                    }}
                    onIdle={() => {
                        console.log("地圖已閒置，標記應該已渲染");
                    }}
                >
                    {/* Building Markers */}
                    {isMapLoaded && BuildingsInfo.filter(
                        (obj) => markerShowType === '' || obj.type === markerShowType
                    ).map((building) => (
                        <Marker
                            key={building.name}
                            position={{ lat: building.latitude, lng: building.longitude }}
                            onClick={() => handleMarkerClick(building)}
                            icon={getMarkerIcon(building.type, selectedMarker?.name === building.name)}
                            title={building.name}
                        />
                    ))}

                    {/* User Location Marker */}
                    {isMapLoaded && (
                        <Marker
                            key="user-location"
                            position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
                            icon={{
                                path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13C19 5.13 15.87 2 12 2z',
                                fillColor: '#10B981',
                                fillOpacity: 1,
                                strokeWeight: 2,
                                strokeColor: '#fff',
                                scale: 2,
                            }}
                            title="使用者位置"
                        />
                    )}
                </GoogleMap>
            </LoadScript>

            {/* Overlay UI */}
            <div className="absolute top-0 left-0 z-10 w-full p-4">
                {/* Header Search Bar */}
                <HeaderSearchBar
                    textInputValue={textInputValue}
                    setTextInputValue={setTextInputValue}
                    showSearchResults={showSearchResults}
                    setShowSearchResults={setShowSearchResults}
                    onSearch={handleSearch}
                />

                {/* Category Slider */}
                <div className="mt-4">
                    <CategorySlider setMarkerShowType={setMarkerShowType} />
                </div>
            </div>

            {/* Bottom Drawer */}
            {
                selectedMarker && (
                    <BottomDrawer
                        selectedMarker={selectedMarker}
                        distance={getTwoPointsDistance(selectedMarker.latitude, selectedMarker.longitude)}
                        onClose={handleCloseMarkerInfo}
                    />
                )
            }

            {/* Search Results */}
            {
                showSearchResults && (
                    <SearchResults
                        textInputValue={textInputValue}
                        buildings={BuildingsInfo}
                        onSelectBuilding={handleMarkerClick}
                        getTwoPointsDistance={getTwoPointsDistance}
                    />
                )
            }
        </div >
    );
}
