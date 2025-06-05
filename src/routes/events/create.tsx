import { createFileRoute, Link } from '@tanstack/react-router';
import { FormEvent, useEffect, useState } from 'react';
import EventController from '../../backend/event/Controllers/EventController';
import { EventInput } from '../../backend/event/Entities/EventInput';
import { EventType } from '../../backend/event/Entities/EventType';
import FirstStage from '../../components/pages/events/create/FirstStage';
import LastStage from '../../components/pages/events/create/LastStage';
import SecondStage from '../../components/pages/events/create/SecondStage';
import { UserController } from '../../controllers/user';
import { AuthGuard } from '../../utils/auth';
import { supabase } from '../../utils/supabase';

export const Route = createFileRoute('/events/create')({
  beforeLoad: AuthGuard,
  component: CreateEventScreen,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      type: search.type as string,
    };
  },
});

function CreateEventScreen() {
  const navigate = Route.useNavigate();
  const { type } = Route.useSearch();
  const selectedType = parseInt(type)

  const [step, setStep] = useState(0); // Track the current step
  const [inputs, setInputs] = useState<EventInput>({} as EventInput);
  const [eventTypeInfo, setEventTypeInfo] = useState<EventType | null>(null);
  const [eventTags, setEventTags] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHashtags, setSelectedHashtags] = useState<number[]>([]);

  // Fetch event type information
  useEffect(() => {
    const eventController = new EventController();
    async function fetchTypeInfo() {
      if (selectedType) {
        const result = await eventController.returnEventTypesById({ type_id: selectedType });
        if (result) {
          setEventTypeInfo(result);
          setInputs((inputs) => ({ ...inputs, type: result.type_id as 1 | 2 | 3 | 4 | 5 }));
        } else {
          console.error('Failed to fetch event type information');
        }
      }
    }

    // Fetch event tags based on the selected type
    async function fetchEventTags() {
      try {
        setLoading(true);

        if (!selectedType) {
          setEventTags([]);
          return;
        }

        const hashtags = await eventController.getAllHashtagsByTypeId({ type_id: selectedType });
        if (!hashtags) {
          console.error('Failed to fetch hashtags for the selected event type');
          return;
        }
        setEventTags(hashtags || []);
      } catch (error) {
        console.error('Error fetching event tags:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEventTags();
    fetchTypeInfo();
  }, [selectedType]);

  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 2)); // Move to the next step, but not above 2
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0)); // Move to the previous step, but not below 0
  };

  async function addEvent(e: FormEvent) {
    e.preventDefault();

    try {
      const eventInsertData = {
        ...inputs,
        owner_id: (await UserController.get()).id,
        type: selectedType,
        hashtags: selectedHashtags,
      };

      const { data: createdEvent, error: eventError } = await supabase
        .from('events')
        .insert(eventInsertData)
        .select('*')
        .single();

      if (eventError) throw eventError;

      console.log('Event created with hashtags:', selectedHashtags);

      navigate({
        to: '/events/$eventId',
        params: {
          eventId: createdEvent.id.toString(),
        },
      });
    } catch (error) {
      console.error('Error creating event:', error);
      alert('建立活動時發生錯誤');
    }
  }

  return (
    <form className="flex flex-col px-4 sm:px-6 lg:px-8 w-full py-2 overflow-y-hidden" onSubmit={addEvent}>
      <div className="relative flex flex-row justify-center items-center border-b my-2 pb-2">
        <Link to='/events' className='absolute left-0'>
          <button className="btn btn-ghost">
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
                  handleNextStep={handleNextStep}
                />
              );
            case 1:
              return (
                <SecondStage
                  inputs={inputs}
                  setInputs={setInputs}
                  handlePreviousStep={handlePreviousStep}
                  handleNextStep={handleNextStep}
                />
              );
            case 2:
              return (
                <LastStage
                  inputs={inputs}
                  setInputs={setInputs}
                  handlePreviousStep={handlePreviousStep}
                  handleNextStep={handleNextStep}
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
