import { createFileRoute } from '@tanstack/react-router';
import { supabase } from '../../utils/supabase';

export const Route = createFileRoute('/events/$eventId')({
  loader: async ({ params: { eventId } }) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()

    if (error !== null) {
      throw error
    }

    return { event: data }
  },
  component: EventDetails
})

const styles = {
  body:{
    backgroundColor:'#3E3E3E'
  },
  container:{
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  card:{
    borderRadius: "15px",
    backgroundColor:'#FFFFFF',
    margin: "0.5rem 1rem",
    padding: "0.5rem"
  },
  icon:{
    margin:"0.5rem"
  }
}

function EventDetails() {
  const { event } = Route.useLoaderData()
  return (
    <div className='relative static' style={styles.body}>
      {/* 圖片 */}
      <div className='relative top-0'>
        <div className="carousel w-full">
          <div id="item1" className="carousel-item w-full">
            <img src="https://i.pinimg.com/originals/68/21/7d/68217da82cbeb3cc833ed2acdea7c738.gif" className="w-full" />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img src="https://i.pinimg.com/originals/79/de/27/79de27bafeb77f608ef74b3d02e727ba.gif"className="w-full" />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img src="https://i.pinimg.com/originals/df/f2/75/dff275ddc4aea5548575fd78d218965d.gif" className="w-full" />
          </div>
          <div id="item4" className="carousel-item w-full">
            <img src="https://i.pinimg.com/originals/fc/b4/ee/fcb4ee6e201ec8f0de461a9f1ac65d2e.gif" className="w-full" />
          </div>
        </div>
        {/* 換頁點點-要根據使用者提供的張數更改個數 */}
        <div className="absolute bottom-4 flex w-full justify-center gap-2 py-2">
          <a href="#item1" className="btn btn-xs">1</a>
          <a href="#item2" className="btn btn-xs">2</a>
          <a href="#item3" className="btn btn-xs">3</a>
          <a href="#item4" className="btn btn-xs">4</a>
        </div>
      </div>


      <div className='relative'>
        {/* 活動資訊 */}
        <div className='static relative' style={styles.card}>
          {/* 活動名稱 */}
          <div>
            <h1 className='text-xl'>{event.name}</h1>
          </div>
          {/* 收藏 */}
          <div className='flex justify-between absolute right-0 top-0'>
            <label className='swap'>
              <input type="checkbox" />
              <svg style={styles.icon} className="swap-off w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
              </svg>
              <svg style={styles.icon} className="swap-on w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
              </svg>
            </label>
          </div>
          {/* 時間 */}
          <div className='flex'>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            <p>{event.start_time}~{event.end_time}</p>
          </div>
          {/* 活動地點 */}
          <div className='flex'>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
            </svg>
          </div>
          {/* 活動價格 */}
          <div className='flex'>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"/>
            </svg>
            <p>活動價格</p>
          </div>
          
          <button className='btn absolute bottom-2 right-2'>報名活動</button>
        </div>
        
        {/* 關於活動 */}
        <div className='grid gap-y-2' style={styles.card}>
          <h1 className='text-xl'>關於活動</h1>

          <div  className='flex items-center'>
            <svg style={styles.icon} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>

            <div>
              <p>辦理單位</p>
              <p>Lorem, ipsum dolor.</p>
            </div>
          </div>

          <div className='flex items-center'>
          <svg style={styles.icon} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-width="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
          </svg>

            <div>
              <p>學生學習護照</p>
              <p>實數類型 {event.fee} 小時</p>
            </div>          
          </div>

          <div className='flex items-center'>
          <svg style={styles.icon} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
          </svg>

            <div>
              <p>條件限制</p>
              <ol>
                <li>開放期限{event.start_time}</li>
                <li>人數限制： {event.fee}</li>
                <li>{event.user_id}</li>
              </ol>
            </div>
          </div>

          <p className='divider'></p>

          <h1 className='text-xl'>活動說明</h1>
          <p>{event.description}</p>
        </div>

      </div>
    </div>
  )
}