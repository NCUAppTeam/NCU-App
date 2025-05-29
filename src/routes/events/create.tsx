import { createFileRoute, Link } from '@tanstack/react-router';
import { FormEvent, useEffect, useState } from 'react';
// Assuming EventController, EventInput, EventType are correctly imported
// For brevity, I'll use placeholder paths. Adjust them to your actual paths.
import EventController from '../../backend/event/Controllers/EventController';
import { EventInput } from '../../backend/event/Entities/EventInput';
import { EventType } from '../../backend/event/Entities/EventType';
import FirstStage from '../../components/pages/events/create/FirstStage';
import LastStage from '../../components/pages/events/create/LastStage';
import SecondStage from '../../components/pages/events/create/SecondStage';
import { UserController } from '../../controllers/user'; // Assuming this path is correct
import { AuthGuard } from '../../utils/auth'; // Assuming this path is correct
import { supabase } from '../../utils/supabase'; // Assuming this path is correct

export const Route = createFileRoute('/events/create')({
  beforeLoad: AuthGuard,
  component: CreateEventScreen,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      type: search.type as string, // Ensure 'type' is always present or handle undefined
    };
  },
});

function CreateEventScreen() {
  const navigate = Route.useNavigate();
  const { type: typeString } = Route.useSearch(); // Renamed to typeString to avoid conflict
  const selectedType = parseInt(typeString);

  const [step, setStep] = useState(0); // Track the current step
  const [inputs, setInputs] = useState<EventInput>({} as EventInput);
  const [eventTypeInfo, setEventTypeInfo] = useState<EventType | null>(null);
  const [eventTags, setEventTags] = useState<EventType[]>([]); // Assuming EventType is also used for tags
  const [loading, setLoading] = useState(true);
  const [selectedHashtags, setSelectedHashtags] = useState<number[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Fetch current user ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Ensure UserController.get() returns a promise and the user object has an 'id'
        const user = await UserController.get();
        if (user && user.id) {
          setCurrentUserId(user.id);
        } else {
          console.error('Failed to get user ID or user object is not as expected. User:', user);
          // Potentially navigate away or show an error if user ID is critical here
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  // Fetch event type information and tags
  useEffect(() => {
    const eventController = new EventController();

    async function fetchTypeInfo() {
      if (selectedType && !isNaN(selectedType)) {
        try {
          const result = await eventController.returnEventTypesById({ type_id: selectedType });
          if (result) {
            setEventTypeInfo(result);
            // Ensure result.type_id is compatible with the expected type for inputs.type
            setInputs((prevInputs) => ({ ...prevInputs, type: result.type_id as 1 | 2 | 3 | 4 | 5 }));
          } else {
            console.error('Failed to fetch event type information for type_id:', selectedType);
          }
        } catch (error) {
            console.error('Error in fetchTypeInfo for type_id:', selectedType, error);
        }
      } else {
        console.log('selectedType is not valid for fetching type info:', selectedType);
      }
    }

    async function fetchEventTags() {
      if (selectedType && !isNaN(selectedType)) {
        try {
          setLoading(true);
          const hashtags = await eventController.getAllHashtagsByTypeId({ type_id: selectedType });
          // Ensure hashtags is an array or default to empty array
          setEventTags(hashtags || []);
        } catch (error) {
          console.error('Error fetching event tags for type_id:', selectedType, error);
          setEventTags([]); // Set to empty on error
        } finally {
          setLoading(false);
        }
      } else {
        console.log('selectedType is not valid for fetching event tags:', selectedType);
        setEventTags([]);
        setLoading(false);
      }
    }

    fetchTypeInfo();
    fetchEventTags();
  }, [selectedType]);

  // Handles moving to the next step for FirstStage and SecondStage
  const handleSimpleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 2));
  };

  // Handles moving to the previous step
  const handlePreviousStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };


  async function addEvent(e?: FormEvent, newImageUrlsFromLastStage?: string[]) {
    if (e) {
      e.preventDefault(); // Prevent default form submission if called by form
    }

    let userIdToSubmit = currentUserId;
    if (!userIdToSubmit) {
        try {
            const user = await UserController.get();
            if (user && user.id) {
                userIdToSubmit = user.id;
                setCurrentUserId(user.id); // Update state if fetched here
            } else {
                alert('無法獲取用戶資訊，請稍後再試或重新登入。');
                console.error('User ID is null, cannot create event.');
                return;
            }
        } catch (error) {
            alert('獲取用戶資訊時發生錯誤。');
            console.error('Error fetching user ID in addEvent:', error);
            return;
        }
    }


    try {
      inputs.img = newImageUrlsFromLastStage || [];
      const eventInsertData = {
        ...inputs,
        user_id: userIdToSubmit, 
        type: selectedType,    
        hashtag: selectedHashtags,
      };
      
      // Validate essential fields before insertion
      if (!eventInsertData.user_id || isNaN(eventInsertData.type)) {
        alert('活動資料不完整，無法建立活動。');
        console.error('Missing user_id or type for event insertion:', eventInsertData);
        return;
      }

      const { data: createdEvent, error: eventError } = await supabase
        .from('events')
        .insert(eventInsertData)
        .select('*')
        .single();

      if (eventError) {
        console.error('Supabase event insert error:', eventError);
        throw eventError; // Throw to be caught by the catch block
      }

      if (!createdEvent || !createdEvent.id) {
        console.error('Event created but no ID returned, or creation failed silently.');
        alert('建立活動失敗，未返回活動ID。');
        return;
      }

      console.log('Event created with ID:', createdEvent.id, 'and hashtags:', selectedHashtags);

      navigate({
        to: '/events/$eventId',
        params: {
          eventId: createdEvent.id.toString(),
        },
      });
    } catch (error: unknown) {
      console.error('Error creating event in addEvent function:', error);
      const supabaseError = error instanceof Error && error.message.includes('supabase') ? error.message : '';
      alert(`建立活動時發生錯誤: ${supabaseError || '請檢查網絡連接或稍後再試。'}`);
    }
  }

  return (
    <form className="flex flex-col px-4 sm:px-6 lg:px-8 w-full py-2 overflow-y-auto" onSubmit={addEvent}>
      <div className="relative flex flex-row justify-center items-center border-b my-2 pb-2">
        <Link to='/events' className='absolute left-0'>
          <button type="button" className="btn btn-ghost">
            取消
          </button>
        </Link>
        <h1 className="text-xl text-center ">新增</h1>
      </div>

      {/* Render content based on the current step */}
      {
        (() => {
          switch (step) {
            case 0:
              return (
                <FirstStage
                  eventTypeInfo={eventTypeInfo}
                  eventTags={eventTags}
                  selectedHashtags={selectedHashtags}
                  setSelectedHashtags={setSelectedHashtags}
                  loading={loading}
                  handleNextStep={handleSimpleNextStep} // Use the simple step advancer
                />
              );
            case 1:
              return (
                <SecondStage
                  inputs={inputs}
                  setInputs={setInputs}
                  handlePreviousStep={handlePreviousStep}
                  handleNextStep={handleSimpleNextStep} // Use the simple step advancer
                />
              );
            case 2:
              if (!currentUserId) {
                return <p className="text-center py-10">正在載入用戶資訊...</p>;
              }
              return (
                <LastStage
                  inputs={inputs}
                  setInputs={setInputs}
                  currentUserId={currentUserId}
                  handlePreviousStep={handlePreviousStep}
                  handleNextStep={addEvent}
                />
              );
            default:
              return null;
          }
        })()
      }
    </form>
  );
}
