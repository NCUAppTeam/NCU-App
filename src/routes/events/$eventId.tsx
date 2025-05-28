import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from "flowbite-react-icons/outline";
import { useState } from 'react';
import { UserController } from '../../controllers/user';
import { supabase } from '../../utils/supabase';

export const Route = createFileRoute('/events/$eventId')({
  loader: async ({ params: { eventId } }) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()

    if (error !== null) {
      throw error;
    }
    if (data && data.img === null) {
      data.img = [];
    }

    return { event: data }
  },
  component: EventDetails
})

const styles = {
  body: {
    backgroundColor: '#3E3E3E'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  card: {
    borderRadius: "15px",
    backgroundColor: '#FFFFFF',
    margin: "1rem 1.5rem",
    padding: "1rem"
  },
  icon: {
    margin: "0.5rem"
  },
}

function EventDetails() {
  const { event } = Route.useLoaderData();
  const [join, setJoin] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const noImages = !event.img || event.img.length === 0;

  // 新增活動報名
  async function addRegistration() {
    try {
      const userData = await UserController.get();
      if (!userData) {
        alert('無法獲取使用者資訊，請先登入');
        return;
      }
      const registrationInsertData = {
        uuid: userData.id,
        event_id: [event.id],
      };

      const { data: createdRegistration, error: registrationError } = await supabase
        .from('registrations')
        .insert(registrationInsertData)
        .select('*')
        .single();

      if (registrationError) throw registrationError;
      console.log("createdRegistration", createdRegistration);
      setJoin(true);
      const joinSuccessModal = document.getElementById("joinSuccess_modal") as HTMLDialogElement | null;
      const joinModal = document.getElementById("join_modal") as HTMLDialogElement | null;
      joinSuccessModal?.showModal();
      joinModal?.close();


    } catch (error) {
      console.error('Error registering event:', error);
      alert('報名活動時發生錯誤');
    }
  }

  return (
    <div className="container mx-auto">
      <div className="relative z-10">
        <Link
          to="/events"
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-white bg-opacity-70 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300"
          aria-label="Return to events"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
      {/* Apply conditional padding here */}
      <div className={`bg-gray-800 ${noImages ? 'pt-16' : ''}`}>

        {/* 圖片 */}
        {/* Only render the image section if there are images, to prevent empty div height issues */}
        {!noImages && (
          <div className='relative'>
            <div className="carousel w-full">
              {event.img && event.img.map((imageUrl, index) => (
                <div key={`item${index + 1}`} id={`item${index + 1}`} className="carousel-item w-full">
                  <img src={imageUrl} className="w-full" alt={`Event image ${index + 1}`} />
                </div>
              ))}
            </div>

            {event.img && event.img.length > 1 && (
              <div className="bottom-12 flex w-full justify-center gap-2 absolute">
                {event.img.map((_, index) => (
                  <a
                    key={`dot${index + 1}`}
                    href={`#item${index + 1}`}
                    className="btn btn-xs"
                    aria-label={`Go to image ${index + 1}`}
                  >
                    {index + 1}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* If no images, the card section should not have negative margin, or have a different margin */}
        <div className={noImages ? 'pt-4' : '-translate-y-12'}> {/* Adjust class if no images */}

          {/* 活動資訊 */}
          <div className='' style={styles.card}>
            {/* 活動名稱 */}
            <div className='flex items-center justify-between'>
              <h1 className='text-2xl m-1 font-bold'>{event.name}</h1>
              {/* 收藏 */}
              <div onClick={() => setIsFavorite(!isFavorite)} className="cursor-pointer">
                {isFavorite ? (
                  <svg style={styles.icon} className="w-8 h-8 text-red-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                  </svg>
                ) : (
                  <svg style={styles.icon} className="w-8 h-8 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                  </svg>
                )}
              </div>
            </div>
            {/* 時間 */}
            <div className='flex p-2 items-center'>
              <svg style={styles.icon} className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p>{event.start_time ? `${new Date(event.start_time).toLocaleDateString([], { month: 'numeric', day: 'numeric' })} ${new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })} ~ ${event.end_time ? `${new Date(event.end_time).toLocaleDateString([], { month: 'numeric', day: 'numeric' })} ${new Date(event.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })}` : '時間未提供'}` : '時間未提供'}</p>
            </div>
            {/* 活動目的地 */}
            <div className='flex p-2 items-center'>
              <svg style={styles.icon} className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
              </svg>
              <p>{event.meeting_point}</p>
            </div>
            {/* 活動價格 */}
            <div className='flex p-2 items-center justify-between'>
              <div className='flex items-center'>
                <svg style={styles.icon} className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2" />
                </svg>
                <p>{event.fee ? `${event.fee} 元` : '費用未提供'}</p>
              </div>

              <button className="btn bottom-1 right-1" // Make sure DaisyUI classes work as expected
                onClick={() => {
                  const joinModal = document.getElementById("join_modal") as HTMLDialogElement | null;
                  const cancelModal = document.getElementById("cancel_modal") as HTMLDialogElement | null;
                  if (join) {
                    cancelModal?.showModal();
                  } else {
                    joinModal?.showModal();
                  }
                }}>
                {join ? "已報名" : "報名活動"}
              </button>
            </div>

            <dialog id="join_modal" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="text-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
                  </svg>
                </h3>
                <p className="py-4 text-xl flex items-center justify-center">確定要報名此活動嗎？</p>
                <div className="modal-action justify-between">
                  <button className="btn w-1/2"
                    onClick={addRegistration}
                  >好</button>
                  <dialog id="joinSuccess_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <div className='flex item-center justify-center'>
                        <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
                        </svg>
                        <h3 className="font-bold text-lg">通知</h3>
                      </div>
                      <p className="py-4 flex item-center justify-center">活動報名成功！</p>
                      <div className="modal-action">
                        <form method="dialog" className='w-full'>
                          <button className="btn w-full">好</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <form method="dialog" className='w-1/2'>
                    <button className="btn w-full">取消</button>
                  </form>
                </div>
              </div>
            </dialog>
            <dialog id="cancel_modal" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <div>
                  <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
                  </svg>
                  <h3 className="text-xl flex items-center justify-center">確定要取消報名此活動嗎？</h3>
                </div>
                <div className="modal-action justify-between">
                  <button
                    className="btn w-1/2"
                    onClick={() => {
                      setJoin(false);
                      const cancelModal = document.getElementById("cancel_modal") as HTMLDialogElement | null;
                      const cancelSuccessModal = document.getElementById("cancelSuccess_modal") as HTMLDialogElement | null;
                      cancelModal?.close();
                      cancelSuccessModal?.showModal();
                    }}
                  >
                    好
                  </button>
                  <dialog id="cancelSuccess_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <div className='flex item-center justify-center'>
                        <svg className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
                        </svg>
                        <h3 className="font-bold text-lg">通知</h3>
                      </div>
                      <p className="py-4 flex item-center justify-center">活動取消報名成功！</p>
                      <div className="modal-action">
                        <form method="dialog" className='w-full'>
                          <button className="btn w-full">好</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <form method="dialog" className="w-1/2">
                    <button className="btn w-full">取消</button>
                  </form>
                </div>
              </div>
            </dialog>

          </div>

          {/* 關於活動 */}
          <div className='grid gap-y-2' style={styles.card}>
            {/*
              <h1 className='text-xl m-1 font-bold'>關於活動</h1>

              // 辦理單位
              <div className='flex items-center'>
                <svg style={styles.icon} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22">
                  <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <div className='p-2 items-center'>
                  <p>辦理單位</p>
                  <p>{event.organizer || '主辦單位未提供'}</p>
                </div>
              </div>

              // 學生學習護照
              <div className='flex items-center'>
                <svg style={styles.icon} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                </svg>
                <div className='p-2 items-center'>
                  <p>學生學習護照</p>
                  <p>{event.passport_hours ? `時數類型 ${event.passport_hours} 小時` : '護照時數未提供'}</p>
                </div>
              </div>

              // 條件限制
              <div className='flex items-center'>
                <svg style={styles.icon} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                </svg>
                <div className='p-2 items-center'>
                  <p>條件限制</p>
                  <ol className="list-decimal pl-5">
                    <li>開放期限：{event.apply_due ? new Date(event.apply_due).toLocaleDateString() : '未指定'}</li>
                    <li>人數限制： {event.max_participants !== undefined ? event.max_participants : '無限制'}</li>
                  </ol>
                </div>
              </div>

              <p className='divider'></p>
            */}

            <h1 className='text-xl font-bold'>活動說明</h1>
            {
              (!event.description || event.description.trim() === '')
              ? <p className='text-sm text-gray-500'>無</p>
              : event.description.split('\n').map((line, index) => (
                  <p key={index} className='text-sm text-gray-500'>
                    {line}
                  </p>
                ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}