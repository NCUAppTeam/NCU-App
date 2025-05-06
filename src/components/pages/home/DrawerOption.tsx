import { HStack, VStack } from "../..";

// for future use of other function development
// const options = [
//     { name: "首頁", engName: "Home", pageNav: "/" },
//     { name: "活動/揪人", engName: "Events", pageNav: "/events" },
//     { name: "拍賣", engName: "Market", pageNav: "/sales" },
//     { name: "行事曆", engName: "Calendar", pageNav: "/calendar" },
//     { name: "地圖", engName: "Map", pageNav: "/map" },
//     { name: "今晚吃什麼", engName: "Dinner Decider", pageNav: "/dinner" },
// ];
const options = [
    { name: "首頁", engName: "Home", pageNav: "/" },
    { name: "揪人", engName: "Gather 'Round", pageNav: "/events" },
    { name: "綠洲拾橡", engName: "Acorn Trails in the Oasis", pageNav: "/dinner" },
];

export const DrawerOption = () => {
    // for future use of several function in one page
    // const [openOptions, setOpenOptions] = useState<{ [key: string]: boolean }>({});

    // const toggleOption = (name: string) => {
    //     setOpenOptions((prev) => {
    //         return {
    //             ...prev,
    //             [name]: !prev[name],
    //         };
    //     });
    // };

    return (
        <VStack id="all-nav-func" className="gap-2">
            {options.map((option) => (
                <li
                    key={option.name}
                    onClick={() => window.location.href = option.pageNav}
                    className="cursor-pointer p-2 rounded-md hover:bg-gray-200 text-gray-500 dark:text-white hover:dark:text-gray-700 xl:w-full xl:flex xl:items-center xl:justify-between xl:gap-4 xl:p-2 xl:border xl:border-gray-300 xl:shadow-sm"
                >
                    <HStack className="xl:gap-2">
                        <VStack className="justify-start">
                            <p className="font-medium lg:text-lg">{option.name}</p>
                            <p className="text-sm lg:text-base">{option.engName}</p>
                        </VStack>
                    </HStack>
                </li>
            ))}
        </VStack>

        // for future use of several function in one page
        // <VStack id="all-nav-func">
        //     {options.map((option) => (
        //         <HStack className="bg-blue-200" key={option.name}>
        //             <div className="flex items-center" onClick={() => toggleOption(option.name)}>
        //                 {openOptions[option.name] ? (
        //                     <CaretDown />
        //                 ) : (
        //                     <CaretRight />
        //                 )}
        //             </div>
        //             <Link to={option.pageNav}>
        //                 <li className="bg-white">
        //                     <VStack className="justify-start">
        //                         <p className="bg-green-100">{option.name}({option.engName})</p>
        //                     </VStack>
        //                 </li>
        //             </Link>
        //         </HStack>
        //     ))}
        // </VStack>
    );
};
