import { VStack } from "../../../components";


export const Filter = () => {
    const streets = [
        '校内', '宵夜街', '後門', '奢侈巷'
    ];

    return (
        <VStack>
            <div id="meal" className="grid justify-items-center mt-10">
                <p className="font-bold text-4xl text-center">找正餐</p>
                <div className="w-2/3 grid grid-rows-2 grid-flow-col gap-6 columns-2 mt-4">
                    {
                        streets.map((street) => (
                            <button key={street} className="btn bg-[#fdf7d2] text-xl text-[#8b7342] border-2 border-[#8b7342]">
                                {street}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div id="drink" className="grid justify-items-center mt-10">
                <p className="font-bold text-4xl text-center">找飲料</p>
                <div className="w-2/3 grid grid-rows-2 grid-flow-col gap-6 columns-2 mt-4">
                    {
                        streets.map((street) => (
                            <button key={street} className="btn bg-[#fdf7d2] text-xl text-[#8b7342] border-2 border-[#8b7342]">
                                {street}
                            </button>
                        ))
                    }
                </div>
            </div>
            <div id="midnight-snack" className="grid justify-items-center mt-10">
                <p className="font-bold text-4xl text-center">找宵夜</p>
                <div className="w-2/3 grid grid-flow-col gap-6 columns-2 mt-4">
                    {
                        streets.slice(1, 3).map((street) => (
                            <button key={street} className="btn bg-[#fdf7d2] text-xl text-[#8b7342] border-2 border-[#8b7342]">
                                {street}
                            </button>
                        ))
                    }
                </div>
            </div>
        </VStack >
    );
};
