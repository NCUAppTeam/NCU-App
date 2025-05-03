import { ChevronDoubleDownIcon } from '@heroicons/react/20/solid'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import RestaurantController from '../../backend/dinner/Controllers/RestaurantController'
import Restaurant from '../../backend/dinner/Entities/Restaurant'
import { DinnerDetail } from '../../components/pages/dinner/dinnerdetail'
import { DinnerListCard } from '../../components/pages/dinner/dinnerlistcard'
import { DinnerStory } from '../../components/pages/dinner/dinnerstory'
import { AuthGuard } from '../../utils/auth'


export const Route = createFileRoute('/dinner/')({
    beforeLoad: AuthGuard,
    loader: async () => {
        const restaurantController = new RestaurantController();
        const restaurants = await restaurantController.getAllRestaurants('*', 'id', false);
        if (!restaurants) {
            throw new Error('Failed to load restaurants');
        }
        return restaurants;
    },
    component: DinnerIndex,
})

function DinnerIndex() {
    const restaurants = Route.useLoaderData() as Array<Restaurant>;
    const [selectedRestaurants, setSelectedRestaurants] = useState<Array<Restaurant>>([]);
    const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);

    const toggleSelect = (restaurant: Restaurant) => {
        setSelectedRestaurants((prevSelected) => {
            const isAlreadySelected = prevSelected.some((r) => r.id === restaurant.id);
            if (isAlreadySelected) {
                // Deselect the restaurant
                return prevSelected.filter((r) => r.id !== restaurant.id);
            } else {
                // Select the restaurant
                return [...prevSelected, restaurant];
            }
        });
    };

    const openDetail = (restaurant: Restaurant) => {
        setCurrentRestaurant(restaurant);
        (document.getElementById("dinner_detail_modal") as HTMLDialogElement)?.showModal();
    };

    const closeDetail = () => {
        setCurrentRestaurant(null);
        (document.getElementById("dinner_detail_modal") as HTMLDialogElement)?.close();
    };

    useEffect(() => {
        if (selectedRestaurants.length > 0) {
            console.log('Selected restaurants:', selectedRestaurants);
        }
    }, [selectedRestaurants]);


    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <DinnerStory />
            <p
                className="flex flex-row justify-center text-center font-serif text-xl text-green-500 p-6 rounded-lg shadow-md border-b-2 border-green-300"
                style={{ fontFamily: "'Playfair Display', serif", backgroundColor: "#f8f8f8" }}
            >
                選擇餐廳加入轉盤
                <span className="text-green-500">
                    <ChevronDoubleDownIcon className="inline-block w-6 h-6 animate-bounce" />
                </span>
            </p>
            {restaurants.map((restaurant) => (
                <DinnerListCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    toggleSelect={toggleSelect}
                    isSelected={selectedRestaurants.some((r) => r.id === restaurant.id)}
                    openDetail={openDetail}
                />
            ))}
            <DinnerDetail
                restaurant={currentRestaurant}
                closeDetail={closeDetail}
            />
        </div>
    )
}