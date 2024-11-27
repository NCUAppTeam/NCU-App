import { Link } from "@tanstack/react-router";
import { CaretDown, CaretRight } from "flowbite-react-icons/solid";
import { useState } from "react";
import { HStack, VStack } from "../components";

const options = [
    { name: "首頁", engName: "Home", pageNav: "/" },
    { name: "活動/揪人", engName: "Events", pageNav: "/events" },
    { name: "拍賣", engName: "Market", pageNav: "/sales" },
    { name: "行事曆", engName: "Calendar", pageNav: "/calendar" },
    { name: "地圖", engName: "Map", pageNav: "/map" },
    { name: "今晚吃什麼", engName: "Dinner Decider", pageNav: "/dinner" },
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
                            <CaretDown />
                        ) : (
                            <CaretRight />
                        )}
                    </div>
                    <Link to={option.pageNav}>
                        <li className="bg-white">
                            <VStack className="justify-start">
                                <p className="bg-green-100">{option.name}({option.engName})</p>
                            </VStack>
                        </li>
                    </Link>
                </HStack>
            ))}
        </VStack>
    );
};
