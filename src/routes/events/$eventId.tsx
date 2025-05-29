import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from "flowbite-react-icons/outline";
import { useState, useEffect, useMemo } from 'react';
import UserController from '../../backend/user/Controllers/UserController'; 
import FavoriteController from '../../backend/favorite/Controllers/FavoriteControllers';
import { supabase } from '../../utils/supabase';

export const Route = createFileRoute('/events/$eventId')({
  loader: async ({ params: { eventId } }) => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (error !== null) {
      throw error;
    }
    if (data && data.img === null) {
      data.img = [];
    }

    return { event: data };
  },
  component: EventDetails
});

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
};

function EventDetails() {
  const { event } = Route.useLoaderData();
  const [join, setJoin] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);

  const userController = useMemo(() => new UserController(), []);
  const favoriteController = useMemo(() => new FavoriteController(), []);

  const noImages = !event.img || event.img.length === 0;

  // Fetch initial favorite status
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!event?.id) return;

      setIsLoadingFavorite(true);
      try {
        const currentUser = await userController.getCurrentUser();
        if (!currentUser || !currentUser.id) {
          setIsFavorite(false);
          return;
        }
        
        const userFavoritesList = await favoriteController.getFavorites("uuid, event_id");
        if (userFavoritesList && userFavoritesList.length > 0) {
          const userFavoriteEntry = userFavoritesList.find(fav => fav.id === currentUser.id);

          if (userFavoriteEntry && userFavoriteEntry.event_id && userFavoriteEntry.event_id.includes(event.id)) {
            setIsFavorite(true);
          } else {
            setIsFavorite(false);
          }
        } else {
          // Not yet exists in favorites
          setIsFavorite(false);
        }
      } catch (err) {
        console.error('Error in checkFavoriteStatus:', err);
        setIsFavorite(false);
      } finally {
        setIsLoadingFavorite(false);
      }
    };

    checkFavoriteStatus();
  }, [event.id, userController, favoriteController]);

  // 新增活動報名
  async function addRegistration() {
    try {
      const userData = await userController.getCurrentUser();
      if (!userData || !userData.id) {
        alert('無法獲取使用者資訊，請先登入');
        return;
      }
      const { data: currentReg, error: fetchError } = await supabase
        .from('registrations')
        .select('event_id')
        .eq('uuid', userData.id)
        .single();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      let newRegIds = [];
      if (currentReg && currentReg.event_id) {
        if (currentReg.event_id.includes(event.id)) {
          console.log("Event already registered.");
          setJoin(true);
          return;
        }
        newRegIds = [...currentReg.event_id, event.id];
      } else {
        newRegIds = [event.id];
      }


      const registrationInsertData = {
        uuid: userData.id,
        event_id: newRegIds,
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

  //新增收藏
  async function addFavorite() {
    if (isLoadingFavorite) return;
    setIsLoadingFavorite(true);
    try {
      const userData = await userController.getCurrentUser();
      if (!userData || !userData.id) {
        alert('無法獲取使用者資訊，請先登入');
        return;
      }

      const { data: currentFavorite, error: fetchError } = await supabase
        .from('favorites')
        .select('event_id')
        .eq('uuid', userData.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      let newEventIds = [];
      if (currentFavorite && currentFavorite.event_id) {
        if (currentFavorite.event_id.includes(event.id)) {
          console.log("Event already in favorites.");
          setIsFavorite(true);
          return;
        }
        newEventIds = [...currentFavorite.event_id, event.id];
      } else {
        newEventIds = [event.id];
      }

      const { data: upsertedFavorite, error: upsertError } = await supabase
        .from('favorites')
        .upsert({ uuid: userData.id, event_id: newEventIds }, { onConflict: 'uuid' })
        .select('*')
        .single();

      if (upsertError) throw upsertError;
      console.log("upsertedFavorite (added)", upsertedFavorite);
      setIsFavorite(true);

    } catch (error) {
      console.error('Error adding favorite:', error);
      alert('新增收藏時發生錯誤');
    } finally {
      setIsLoadingFavorite(false);
    }
  }

  // 取消收藏
  async function removeFavorite() {
    if (isLoadingFavorite) return;
    setIsLoadingFavorite(true);
    try {
      const userData = await userController.getCurrentUser();
      if (!userData || !userData.id) {
        alert('無法獲取使用者資訊，請先登入');
        return;
      }

      const { data: currentFavorite, error: fetchError } = await supabase
        .from('favorites')
        .select('event_id')
        .eq('uuid', userData.id) 
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          console.warn("No favorite entry found to remove from.");
          setIsFavorite(false);
        } else {
          throw fetchError;
        }
        return;
      }

      if (!currentFavorite || !currentFavorite.event_id || !currentFavorite.event_id.includes(event.id)) {
        console.warn("Event not found in user's favorites or favorites list is empty.");
        setIsFavorite(false);
        return;
      }

      const updatedEventIds = currentFavorite.event_id.filter(id => id !== event.id);

      const { data: updatedFavorite, error: updateError } = await supabase
        .from('favorites')
        .update({ event_id: updatedEventIds })
        .eq('uuid', userData.id)
        .select('*')
        .single();

      if (updateError) throw updateError;
      console.log("updatedFavorite (after removal)", updatedFavorite);
      setIsFavorite(false);

    } catch (error) {
      console.error('Error removing favorite:', error);
      alert('取消收藏時發生錯誤');
    } finally {
      setIsLoadingFavorite(false);
    }
  }

  const handleFavoriteClick = () => {
    if (isLoadingFavorite) return;

    if (isFavorite) {
      removeFavorite();
    } else {
      addFavorite();
    }
  };

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
      <div className={`bg-gray-800 ${noImages ? 'pt-16' : ''}`}>
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

        <div className={noImages ? 'pt-4' : '-translate-y-12'}>
          <div className='' style={styles.card}>
            <div className='flex items-center justify-between'>
              <h1 className='text-2xl m-1 font-bold'>{event.name}</h1>
              <button
                onClick={handleFavoriteClick}
                disabled={isLoadingFavorite}
                className="cursor-pointer p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <svg style={styles.icon} className="w-8 h-8 text-red-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                  </svg>
                ) : (
                  <svg style={styles.icon} className="w-8 h-8 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                  </svg>
                )}
              </button>
            </div>
            {/* ... (rest of your time, meeting point, fee, modals, etc.) ... */}
            <div className='flex p-2 items-center'>
               <svg style={styles.icon} className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
               </svg>
               <p>{event.start_time ? `${new Date(event.start_time).toLocaleDateString([], { month: 'numeric', day: 'numeric' })} ${new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })} ~ ${event.end_time ? `${new Date(event.end_time).toLocaleDateString([], { month: 'numeric', day: 'numeric' })} ${new Date(event.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })}` : '時間未提供'}` : '時間未提供'}</p>
            </div>
            <div className='flex p-2 items-center'>
              <svg style={styles.icon} className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
              </svg>
              <p>{event.meeting_point}</p>
            </div>
            <div className='flex p-2 items-center justify-between'>
              <div className='flex items-center'>
                <svg style={styles.icon} className="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2" />
                </svg>
                <p>{event.fee ? `${event.fee} 元` : '費用未提供'}</p>
              </div>

              <button className="btn bottom-1 right-1"
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

            {/* --- Modals for Join/Cancel Registration --- */}
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

          <div className='grid gap-y-2' style={styles.card}>
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
  );
}