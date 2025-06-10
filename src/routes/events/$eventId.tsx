import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, Bell, Clock, Dollar, Heart, MapPin } from "flowbite-react-icons/outline";
import { Heart as SolidHeart, MapPin as SolidMapPin } from 'flowbite-react-icons/solid';
import { useEffect, useMemo, useState } from 'react';
import EventController from '../../backend/event/Controllers/EventController';
import { EventType } from '../../backend/event/Entities/EventType';
import FavoriteController from '../../backend/favorite/Controllers/FavoriteControllers';
import UserController from '../../backend/user/Controllers/UserController';
import Announcement from '../../components/pages/events/announcement';
import CommenSection from '../../components/pages/events/commentSection';
import EditDeleteSection from '../../components/pages/events/EditDeleteSection';
import ParticipantsSection from '../../components/pages/events/participantsSection';
import { supabase } from '../../utils/supabase';

export const Route = createFileRoute('/events/$eventId')({
  loader: async ({ params: { eventId } }) => {
    const eventController = new EventController();
    const event = await eventController.findEventByID(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  },
  component: EventDetails
});

function EventDetails() {

  const event = Route.useLoaderData();
  const [join, setJoin] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);
  const [typeName, setTypeName] = useState('');
  const [hashtagString, setHashtagString] = useState<Array<string>>([]);

  const userController = useMemo(() => new UserController(), []);
  const favoriteController = useMemo(() => new FavoriteController(), []);

  const noImages = !event.img || event.img.length === 0;
  let cardColor = 'bg-gray-700';
  if (!event.img || event.img.length === 0) {
    switch (event.type) {
      case 1: cardColor = 'bg-[#BE9A4D]'; break;
      case 2: cardColor = 'bg-[#5E9AB5]'; break;
      case 3: cardColor = 'bg-[#5E9A6B]'; break;
      case 4: cardColor = 'bg-[#BC76A8]'; break;
      case 5: cardColor = 'bg-[#A65E9A]'; break;
    }
  }
  // get the type name from supabase
  useEffect(() => {
    const fetchTypeName = async () => {
      if (!event.type) return;
      try {
        const eventController = new EventController();
        const data = await eventController.returnEventTypesById({ type_id: event.type as number });
        setTypeName(data?.type_name || '未知類型');
      } catch (err) {
        console.error('Error in fetchTypeName:', err);
      }
    };
    fetchTypeName();
  });

  // turn event hashtag id into string according to supabase event_type table using getAllHashtagsByTypeId function
  useEffect(() => {
    const fetchHashtags = async () => {
      if (!event.type) return;
      try {
        const eventController = new EventController();
        // Get all hashtags for this event type
        const hashtags = await eventController.getAllHashtagsByTypeId({ type_id: event.type as number });
        // Only keep hashtags whose id is in event.hashtag (array of ids)
        if (Array.isArray(event.hashtag) && Array.isArray(hashtags)) {
          const filtered = hashtags
            .filter((h: EventType) => event.hashtag.includes(h.type_id))
            .map((h: EventType) => h.type_name);
          setHashtagString(filtered);
        } else {
          setHashtagString([]);
        }
      } catch (err) {
        console.error('Error in fetchHashtags:', err);
        setHashtagString([]);
      }
    };
    fetchHashtags();
  });

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
  });

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      if (!event?.id) return;
      try {
        const currentUser = await userController.getCurrentUser();
        if (!currentUser || !currentUser.id) {
          setJoin(false);
          return;
        }

        // if currentUser is the host, skip registration check
        if (currentUser.id === event.owner_id) {
          setJoin(true);
          return;
        }

        const { data: registration, error } = await supabase
          .from('event_participants')
          .select('id')
          .eq('user_id', currentUser.id)
          .eq('event_id', event.id)
          .single();
        if (error && error.code !== 'PGRST116') {
          console.error('Error checking registration status:', error);
          setJoin(false);
          return;
        }
        setJoin(!!registration);
      } catch (err) {
        console.error('Error in checkRegistrationStatus:', err);
        setJoin(false);
      }
    };
    checkRegistrationStatus();
  });


  // 新增活動報名
  async function addRegistration() {
    try {
      const userData = await userController.getCurrentUser();
      if (!userData || !userData.id) {
        alert('無法獲取使用者資訊，請先登入');
        return;
      }

      // Check if already registered
      const { data: existing, error: fetchError } = await supabase
        .from('event_participants')
        .select('id')
        .eq('user_id', userData.id)
        .eq('event_id', event.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existing) {
        alert("你已經報名過此活動。Event already registered.");
        setJoin(true);
        return;
      }

      // Insert new registration
      const { error: insertError } = await supabase
        .from('event_participants')
        .insert({
          user_id: userData.id,
          event_id: event.id,
          joined_at: new Date().toISOString(),
        })
        .select('*')
        .single();

      if (insertError) throw insertError;
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

  // 取消報名
  async function cancelRegistration() {
    try {
      const userData = await userController.getCurrentUser();
      if (!userData || !userData.id) {
        alert('無法獲取使用者資訊，請先登入');
        return;
      }

      // Check if already registered
      const { data: existing, error: fetchError } = await supabase
        .from('event_participants')
        .select('id')
        .eq('user_id', userData.id)
        .eq('event_id', event.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (!existing) {
        alert("你尚未報名此活動。Event not registered.");
        setJoin(false);
        return;
      }

      // Delete registration
      const { error: deleteError } = await supabase
        .from('event_participants')
        .delete()
        .eq('user_id', userData.id)
        .eq('event_id', event.id);

      if (deleteError) throw deleteError;
      setJoin(false);

      const cancelSuccessModal = document.getElementById("cancelSuccess_modal") as HTMLDialogElement | null;
      const cancelModal = document.getElementById("cancel_modal") as HTMLDialogElement | null;
      cancelSuccessModal?.showModal();
      cancelModal?.close();

    } catch (error) {
      console.error('Error cancelling registration:', error);
      alert('取消報名活動時發生錯誤');
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

      const updatedEventIds = currentFavorite.event_id.filter((id: number) => id !== event.id);

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

  function Countdown({ applyDue }: { applyDue: string }) {
    const [timeLeft, setTimeLeft] = useState(() => {
      const now = new Date();
      const due = new Date(applyDue);
      const diff = due.getTime() - now.getTime();
      return diff > 0 ? diff : 0;
    });

    useEffect(() => {
      if (timeLeft <= 0) return;
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const next = prev - 1000;
          return next > 0 ? next : 0;
        });
      }, 1000);
      return () => clearInterval(timer);
    }, [timeLeft]);

    if (timeLeft <= 0) {
      return (
        <p className='flex text-sm text-gray-500 mt-2 justify-end'>
          剩餘報名時間：已截止
        </p>
      );
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    const result = [];
    if (days > 0) result.push(`${days}天`);
    if (hours > 0) result.push(`${hours}小時`);
    if (minutes > 0) result.push(`${minutes}分鐘`);
    if (seconds > 0 || result.length === 0) result.push(`${seconds}秒`);

    return (
      <p className='flex text-sm text-gray-500 mt-2 justify-end'>
        剩餘報名時間：{result.join(' ')}
      </p>
    );
  }

  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const checkIsHost = async () => {
      try {
        const currentUser = await userController.getCurrentUser();
        if (currentUser && currentUser.id && event.owner_id) {
          setIsHost(currentUser.id === event.owner_id);
        } else {
          setIsHost(false);
        }
      } catch (err) {
        setIsHost(false);
      }
    };
    checkIsHost();
  }, [event.owner_id, userController]);

  return (
    <div className="mx-auto">
      <div className="relative z-10">
        <Link
          to="/events"
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-white bg-opacity-70 rounded-full shadow-md hover:bg-opacity-100 transition-all duration-300"
          aria-label="Return to events"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
      <div className={`y-full overflow-y-auto bg-gray-800`}>
        {!noImages ? (
          <div className='relative '>
            <div className="carousel w-full ">
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
        ) :
          <div className='relative'>
            <div className={`carousel w-full`}>
              <p className={`relative carousel-item w-full ${cardColor} h-96`} />
            </div>
          </div>
        }

        <div className={'-translate-y-16 px-4'}>
          <div className='bg-white p-4 m-4 rounded-lg'>

            {/* Event Type and Hashtags */}
            <div className={`${cardColor} text-sm font-semibold p-2 rounded-lg mb-2 text-white w-fit`}>
              {typeName}
            </div>
            <div>
              {hashtagString.length > 0 && (
                <div className='flex flex-wrap gap-2 mb-2'>
                  {hashtagString.map((tag, index) => (
                    <span key={index} className='bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs'>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>


            <div className='flex items-center justify-between'>
              <h1 className='text-2xl m-1 font-bold'>{event.name}</h1>
              {/* Event Type and Hashtags */}
              <div>

              </div>

              <button
                onClick={handleFavoriteClick}
                disabled={isLoadingFavorite}
                className="cursor-pointer p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? (
                  <SolidHeart className='m-4 w-8 h-8 text-red-500' />
                ) : (
                  <Heart className='m-4 w-8 h-8 text-gray-500' />
                )}
              </button>
            </div>

            <div className='flex p-2 items-center'>
              <Clock className="m-1 w-6 h-6 text-gray-800 " />
              <p>
                {
                  event.startTime ?
                    `${new Date(event.startTime).toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' })} ${new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })} 
                ~ 
                ${event.endTime
                      ? `${new Date(event.endTime).toLocaleDateString([], { month: '2-digit', day: '2-digit', timeZone: 'UTC' })} ${new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' })}`
                      : '時間未提供'
                    }`

                    : '時間未提供'}
              </p>
            </div>
            {event.meeting_point === event.destination ? (
              <div className='flex p-2 items-center'>
                <SolidMapPin className="m-1 w-6 h-6 text-gray-800 " />
                <p
                  className="max-w-[150px] truncate cursor-pointer overflow-x-auto"
                  title={event.meeting_point}
                  onClick={e => {
                    const target = e.currentTarget;
                    if (target.classList.contains('truncate')) {
                      target.classList.remove('truncate');
                    } else {
                      target.classList.add('truncate');
                    }
                  }}
                >
                  {event.meeting_point}
                  <br />
                  (集合地/目的地)
                </p>
              </div>
            ) : (
              <div className='flex p-2 items-center'>
                <MapPin className="m-1 w-6 h-6 text-gray-800 " />
                <p
                  className="max-w-[150px] truncate cursor-pointer overflow-x-auto"
                  title={event.meeting_point}
                  onClick={e => {
                    const target = e.currentTarget;
                    if (target.classList.contains('truncate')) {
                      target.classList.remove('truncate');
                    } else {
                      target.classList.add('truncate');
                    }
                  }}
                >
                  {event.meeting_point}
                  <br />
                  (集合地)
                </p>
                <SolidMapPin className="m-1 w-6 h-6 text-gray-800 " />
                <p
                  className="max-w-[150px] truncate cursor-pointer overflow-x-auto"
                  title={event.destination}
                  onClick={e => {
                    const target = e.currentTarget;
                    if (target.classList.contains('truncate')) {
                      target.classList.remove('truncate');
                    } else {
                      target.classList.add('truncate');
                    }
                  }}
                >
                  {event.destination}
                  <br />
                  (目的地)
                </p>
              </div>
            )}
            <div className='flex p-2 items-center justify-between'>
              <div className='flex items-center'>
                <Dollar className="m-1 w-6 h-6 text-gray-800 " />
                <p>{event.fee ? `新台幣 ${event.fee} 元` : '費用未提供'}</p>
              </div>

              {!isHost && <button
                className={`btn bottom-1 right-1 ${join ? '' : 'bg-sky-200 hover:bg-sky-100'} ${new Date(event.apply_due) < new Date() ? 'cursor-not-allowed opacity-100' : ''}`}
                onClick={() => {
                  const joinModal = document.getElementById("join_modal") as HTMLDialogElement | null;
                  const cancelModal = document.getElementById("cancel_modal") as HTMLDialogElement | null;
                  if (join) {
                    cancelModal?.showModal();
                  } else {
                    joinModal?.showModal();
                  }
                }}
                disabled={new Date(event.apply_due) < new Date()}
              >
                {new Date(event.apply_due) < new Date() ? (
                  "報名已截止"
                ) : (join ? "已報名" : "報名活動")}
              </button>}



            </div>
            <Countdown applyDue={event.apply_due} />



            {/* --- Modals for Join/Cancel Registration --- */}
            <dialog id="join_modal" className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
                <h3 className="text-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-gray-800 mr-2" />
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
                    onClick={cancelRegistration}
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

          <div className='grid gap-y-2 bg-white p-4 m-4 rounded-lg'>
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
          <ParticipantsSection eventId={event.id} isHost={isHost} />
          <CommenSection eventId={event.id} />
          <Announcement eventId={event.id} ownerId={event.owner_id} isHost={isHost} />
          <EditDeleteSection event={event} isHost={isHost} />
        </div>
      </div>
    </div >
  );
}