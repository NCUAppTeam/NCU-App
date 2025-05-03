import { useEffect, useState } from "react"
export function SmallTalk() {
    const hr = new Date().getHours()
    const [greetText, setGreetText] = useState('')

    useEffect(() => {
        if (hr > 0 && hr <= 4) {
            setGreetText('凌晨了, 還沒睡嗎? 加油! 💪')
        } else if (hr > 4 && hr <= 10) {
            setGreetText('早安, 祝你有個美好的一天🔅')
        } else if (hr > 10 && hr <= 13) {
            setGreetText('午安, 小睡片刻吧💤')
        } else if (hr > 13 && hr <= 17) {
            setGreetText('下午好, 吃個點心吧!🍩')
        } else if (hr > 17 && hr <= 23) {
            setGreetText('晚安, 祝你有個好夢~🥱')
        }

    }, [hr])

    return (
        <div className="">
            <div className="text-sm font-bold text-gray-700">
                {greetText}
            </div>
        </div>
    )
}
export default { SmallTalk }