import { Link } from "@tanstack/react-router";
import { CalendarIcon, VStack } from "../components";

const options = [
    { name: "活動/揪人", engName: "Events", pageNav: "/events", icon: CalendarIcon },
    { name: "拍賣", engName: "Market", pageNav: "/sales", icon: CalendarIcon },
    { name: "行事曆", engName: "Calendar", pageNav: "/calendar", icon: CalendarIcon },
    { name: "地圖", engName: "Map", pageNav: "/map", icon: CalendarIcon },
    { name: "今晚吃什麼", engName: "Dinner Decider", pageNav: "/dinner", icon: CalendarIcon },
];

export const DrawerOption = () => {
    return (
        <VStack id="all-nav-func">
            {options.map((option) => (
                <Link to={option.pageNav}>
                    <li key={option.name}>
                        <VStack className="justify-start">
                            <a>{option.name}</a>
                            <a>{option.engName}</a>
                        </VStack>
                    </li>
                </Link>
            ))}
        </VStack>
    );
};
