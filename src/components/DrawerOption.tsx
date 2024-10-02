import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarIcon, HStack, SidebarArrowDownIcon, SidebarArrowRightIcon, VStack } from "../components";

const options = [
    { name: "活動/揪人", engName: "Events", pageNav: "/events", icon: CalendarIcon },
    { name: "拍賣", engName: "Market", pageNav: "/sales", icon: CalendarIcon },
    { name: "行事曆", engName: "Calendar", pageNav: "/calendar", icon: CalendarIcon },
    { name: "地圖", engName: "Map", pageNav: "/map", icon: CalendarIcon },
    { name: "今晚吃什麼", engName: "Dinner Decider", pageNav: "/dinner", icon: CalendarIcon },
];

export const DrawerOption = () => {
    const [openOptions, setOpenOptions] = useState<{ [key: string]: boolean }>({});

    const toggleOption = (name: string) => {
        setOpenOptions((prev) => {
            return {
                ...prev,
                [name]: !prev[name],
            };
        });
    };

    return (
        <VStack id="all-nav-func">
            {options.map((option) => (
                <HStack className="bg-blue-200" key={option.name}>
                    <div className="flex items-center" onClick={() => toggleOption(option.name)}>
                        {openOptions[option.name] ? (
                            <SidebarArrowDownIcon fill="currentColor" stroke={"#B1B1B1"} size={20} />
                        ) : (
                            <SidebarArrowRightIcon fill="currentColor" stroke={"#B1B1B1"} size={20} />
                        )}
                    </div>
                    <Link to={option.pageNav}>
                        <li className="bg-white">
                            <VStack className="justify-start">
                                <a className="bg-green-100">{option.name}({option.engName})</a>
                            </VStack>
                        </li>
                    </Link>
                </HStack>
            ))}
        </VStack>
    );
};
