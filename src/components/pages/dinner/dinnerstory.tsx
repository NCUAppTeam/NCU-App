import squirrelImage from "../../../assets/squirrel.jpg";

export function DinnerStory() {
    return (
        <div className="card bg-base-100 image-full w-full max-w-4xl h-64 sm:h-80 md:h-96 lg:h-[28rem] shadow-sm mx-auto my-6 overflow-hidden">
            <figure className="w-full h-full">
                <img
                    src={squirrelImage}
                    alt="squirrel"
                    className="object-cover w-full h-full"
                />
            </figure>
            <div className="card-body p-4 sm:p-6 md:p-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold ">綠洲拾橡</h2>
                <h5 className="text-md sm:text-lg md:text-xl font-medium -translate-y-1 sm:-translate-y-2">Acorn Trails in the Oasis</h5>

                <p className="text-[12px] sm:text-base md:text-lg text-right">
                    當飢餓的松鼠走過乾渴的沙漠，<br />終於找到了滋養的綠洲...
                </p>
                <p className="text-[12px] sm:text-base md:text-lg text-left">
                    <span className="underline">功能說明</span><br />
                    ★隨機挑選附近的餐廳，讓每餐都充滿著探索的樂趣和驚喜<br />
                    ★詳細餐廳資訊，讓你輕鬆掌握周邊美食<br />
                </p>
                <p className="text-[12px] sm:text-base md:text-lg text-right">
                    無論是為了迅速決定吃什麼，還是發掘新餐廳，<br />「綠洲拾橡」都是你探索美味世界的最佳夥伴
                </p>
            </div>
        </div>
    );
}