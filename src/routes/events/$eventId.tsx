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
  container:{
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  card:{
    borderRadius: "15px",
    backgroundColor:'#7395AE',
    margin: "0.5rem 1rem",
    padding: "0.5rem"
  }
}

function EventDetails() {
  const { event } = Route.useLoaderData()
  return (
    <div>
      <div style={styles.container} className='bg-primary'>picture放這裡，要照照片大小還是給個固定高度?</div>
      <div>

        <div className='static relative' style={styles.card}>
          <div className='flex justify-between'>
            <h1 className='text-xl'>{event.name}</h1>
            <p><button className='btn'>♡</button>收藏</p>
          </div>
          <p>時間還有點搞不定，他似乎會自動換算成其他時區</p>
          <p>{event.start_time}~{event.end_time}</p>
          <p>活動價格</p>
          <button className='btn absolute bottom-2 right-2'>報名活動</button>
        </div>
        

        <div className='grid gap-y-2' style={styles.card}>
          <h1 className='text-xl'>關於活動</h1>

          <div  className='flex items-center'>
            <span className='text-2xl mr-2'>👤</span>
            <div>
              <p>辦理單位</p>
              <p>Lorem, ipsum dolor.</p>
            </div>
          </div>

          <div className='flex items-center'>
            <span className='text-2xl mr-2'>⭐</span>
            <div>
              <p>學生學習護照</p>
              <p>實數類型 {event.fee} 小時</p>
            </div>          
          </div>

          <div className='flex items-center'>
            <span className='text-2xl mr-2'>✔️</span>
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
