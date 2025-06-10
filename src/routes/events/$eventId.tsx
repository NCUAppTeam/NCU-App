import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, Bell, Clock, Dollar, Heart, MapPin } from "flowbite-react-icons/outline";
import { Heart as SolidHeart, MapPin as SolidMapPin } from 'flowbite-react-icons/solid';
import { useEffect, useState } from 'react';
import EventController from '../../backend/event/Controllers/EventController';
import FavoriteController from '../../backend/favorite/Controllers/FavoriteControllers';
import UserController from '../../backend/user/Controllers/UserController';
import Announcement from '../../components/pages/events/announcement';
import CommenSection from '../../components/pages/events/commentSection';
import EditDeleteSection from '../../components/pages/events/EditDeleteSection';
import ParticipantsSection from '../../components/pages/events/participantsSection';

export const Route = createFileRoute('/events/$eventId')({
  loader: async ({ params: { eventId } }) => {
    const eventController = new EventController();
    const favoriteController = new FavoriteController();
    const userController = new UserController();

    // Get event
    const event = await eventController.findEventByID(eventId);
    if (!event) throw new Error('Event not found');

    // Get current user
    const currentUser = await userController.getCurrentUser();

    // Get type name
    let typeName = '';
    if (event.type) {
      const type = await eventController.returnEventTypesById({ type_id: event.type as number });
      typeName = type?.type_name || '未知類型';
    }

    // Get hashtags
    let hashtagString: string[] = [];
    if (event.type) {
      const hashtags = await eventController.getAllHashtagsByTypeId({ type_id: event.type as number });
      if (Array.isArray(event.hashtag) && Array.isArray(hashtags)) {
        hashtagString = hashtags
          .filter((h) => event.hashtag.includes(h.type_id))
          .map((h) => h.type_name);
      }
    }

    // Is host
    const isHost = !!currentUser && currentUser.id === event.owner_id;

    // Registration status
    let join = false;
    if (currentUser && currentUser.id && event.id) {
      join = isHost
        ? true
        : await eventController.checkUserRegistration(event.id, currentUser.id);
    }

    // Favorite status
    let isFavorite = false;
    if (currentUser && currentUser.id && event.id) {
      isFavorite = await favoriteController.isEventFavorite(currentUser.id, event.id);
    }

    return {
      event,
      typeName,
      hashtagString,
      isHost,
      join,
      isFavorite,
      currentUser,
    };
  },
  component: EventDetails,
});

function EventDetails() {
  const {
    event,
    typeName,
    hashtagString,
    isHost,
    join: initialJoin,
    isFavorite: initialFavorite,
    currentUser,
  } = Route.useLoaderData();

  // Only UI state
  const [join, setJoin] = useState(initialJoin);
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  // Card color
  const noImages = !event.img || event.img.length === 0;
  let cardColor = 'bg-gray-700';
  if (noImages) {
    switch (event.type) {
      case 1: cardColor = 'bg-[#BE9A4D]'; break;
      case 2: cardColor = 'bg-[#5E9AB5]'; break;
      case 3: cardColor = 'bg-[#5E9A6B]'; break;
      case 4: cardColor = 'bg-[#BC76A8]'; break;
      case 5: cardColor = 'bg-[#A65E9A]'; break;
    }
  }

  // Registration
  async function addRegistration() {
    try {
      if (!currentUser || !currentUser.id) {
        alert('無法獲取使用者資訊，請先登入');
        return;
      }
      const eventController = new EventController();
      const result = await eventController.registerUserToEvent(event.id, currentUser.id);
      if (result.success) {
        setJoin(true);

      } else {
        alert(result.message || '報名活動時發生錯誤');
      }
    } catch (error) {
      alert('報名活動時發生錯誤');
    }
  }

  async function cancelRegistration() {
    try {
      if (!currentUser || !currentUser.id) {
        alert('無法獲取使用者資訊，請先登入');
        return;
      }
      const eventController = new EventController();
      const result = await eventController.cancelUserRegistration(event.id, currentUser.id);
      if (result.success) {
        setJoin(false);
      } else {
        alert(result.message || '取消報名活動時發生錯誤');
      }
    } catch (error) {
      alert('取消報名活動時發生錯誤');
    }
  }

  async function addFavorite() {
    try {
      if (!currentUser || !currentUser.id) {
        alert('無法獲取使用者資訊，請先登入');
        return;
      }
      const favoriteController = new FavoriteController();
      const result = await favoriteController.addEventToFavorites(currentUser.id, event.id);
      if (result.success) {
        setIsFavorite(true);
      } else {
        alert(result.message || '新增收藏時發生錯誤');
      }
    } catch (error) {
      alert('新增收藏時發生錯誤');
    }
  }

  async function removeFavorite() {
    try {
      if (!currentUser || !currentUser.id) {
        alert('無法獲取使用者資訊，請先登入');
        return;
      }
      const favoriteController = new FavoriteController();
      const result = await favoriteController.removeEventFromFavorites(currentUser.id, event.id);
      if (result.success) {
        setIsFavorite(false);
      } else {
        alert(result.message || '取消收藏時發生錯誤');
      }
    } catch (error) {
      alert('取消收藏時發生錯誤');
    }
  }

  const handleFavoriteClick = () => {
    if (isFavorite) removeFavorite();
    else addFavorite();
  };

  function Countdown({ applyDue }: { applyDue: string }) {
    const [timeLeft, setTimeLeft] = useState(() => {
      const now = new Date();
      const due = new Date(applyDue);
      const diff = due.getTime() - now.getTime();
      return diff > 0 ? diff : 0;
    });

    // Only UI timer, not data fetching
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
                className="cursor-pointer p-2 rounded-full hover:bg-gray-200"
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
                  <button
                    className="btn w-1/2"
                    onClick={async () => {
                      await addRegistration();
                      const joinModal = document.getElementById("join_modal") as HTMLDialogElement | null;
                      joinModal?.close();
                      const joinSuccessModal = document.getElementById("joinSuccess_modal") as HTMLDialogElement | null;
                      joinSuccessModal?.showModal();
                    }}
                  >
                    好
                  </button>
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
                          <button
                            className="btn w-full"
                            onClick={() => {
                              const modal = document.getElementById("joinSuccess_modal") as HTMLDialogElement | null;
                              modal?.close();
                            }}
                          >
                            好
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <form method="dialog" className='w-1/2'>
                    <button
                      className="btn w-full"
                      onClick={() => {
                        const modal = document.getElementById("joinSuccess_modal") as HTMLDialogElement | null;
                        modal?.close();
                      }}
                    >
                      取消
                    </button>
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
                    onClick={async () => {
                      await cancelRegistration();
                      const cancelModal = document.getElementById("cancel_modal") as HTMLDialogElement | null;
                      cancelModal?.close();
                      const cancelSuccessModal = document.getElementById("cancelSuccess_modal") as HTMLDialogElement | null;
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