import { createFileRoute, Link } from '@tanstack/react-router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from '../../components/Common/customButton';
import { UserController } from '../../controllers/user';
import { AuthGuard } from '../../utils/auth';
import { supabase } from '../../utils/supabase';

interface EventTag {
  type_id: number;
  type_name: string;
  hashtag_relation: number[];
}

export const Route = createFileRoute('/events/create')({
  beforeLoad: AuthGuard,
  component: CreateEventScreen,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      type: search.type as string
    };
  }
})

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  text: {
    fontSize: 17,
    marginLeft: 15,
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#E8E8E8',
    alignSelf: 'center',
    color: '#000000',
    width: '93%',
  },
}

function CreateEventScreen() {
  const navigate = Route.useNavigate();
  const { type } = Route.useSearch();
  const selectedType = type ? parseInt(type) : null;
  const [selectedPhotos, setSelectedPhotos] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [inputs, setInputs] = useState({
    name: '',
    start_time: '',
    end_time: '',
    location: '',
    fee: 0,
    description: '',
    type: selectedType,
  });
  const [eventTypeInfo, setEventTypeInfo] = useState<{ type_id: number, type_name: string } | null>(null);
  const [eventTags, setEventTags] = useState<EventTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHashtags, setSelectedHashtags] = useState<number[]>([]);
  // Fetch event type information
  useEffect(() => {
    async function fetchTypeInfo() {
      if (selectedType) {
        const { data, error } = await supabase
          .from('event_type')
          .select('type_id, type_name')
          .eq('type_id', selectedType)
          .single();
          
        if (!error && data) {
          setEventTypeInfo(data);
        }
      }
    }
    
    fetchTypeInfo();
  }, [selectedType]);

  useEffect(() => {
    async function fetchEventTags() {
      try {
        setLoading(true);
        
        if (!selectedType) {
          setEventTags([]);
          return;
        }
        
        // Find all hashtags that are associated with this event type
        // These are records where hashtag_relation contains the selected type_id
        const { data, error } = await supabase
          .from('event_type')
          .select('*')
          .not('hashtag_relation', 'eq', [0])  // Exclude main event types
          .contains('hashtag_relation', [selectedType])  // Find hashtags related to this event type
          .order('type_id', { ascending: true });

        if (error) throw error;
        
        setEventTags(data || []);
      } catch (error) {
        console.error('Error fetching event tags:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEventTags();
  }, [selectedType]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedPhotos) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedPhotos)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedPhotos])

  const onSelectPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedPhotos(undefined)
      return
    }
    setSelectedPhotos(e.target.files[0])
  }

  async function addEvent(e: FormEvent) {
    e.preventDefault()
    
    if (!selectedType) {
      alert('請先選擇活動類型');
      navigate({ to: '/events/select' });
      return;
    }
    
    try {
      // Insert the event with the basic data and hashtags
      const eventInsertData = {
        ...inputs,
        user_id: (await UserController.get()).id,
        type: selectedType,
        // Store the selected hashtags as an array (even if empty)
        hashtags: selectedHashtags
      };
      
      // Insert the event
      const { data: createdEvent, error: eventError } = await supabase
        .from('events')
        .insert(eventInsertData)
        .select('*')
        .single();

      if (eventError) throw eventError;
      
      console.log('Event created with hashtags:', selectedHashtags);

      // Navigate to the event page
      navigate({
        to: '/events/$eventId',
        params: {
          'eventId': createdEvent.id.toString()
        }
      });
    } catch (error) {
      console.error('Error creating event:', error);
      alert('建立活動時發生錯誤');
    }
  }

  return (
    <form style={styles.container} onSubmit={addEvent}>
      <div className='flex'>
        <Link to="/events">
          <button className='ms-2 text-white'>返回</button>
        </Link>
        <h1 className='text-xl text-white' style={{ marginLeft: 60 }}>新增活動</h1>
      </div>
      
      {/* Display selected type */}
      <div className="px-4 py-2">
        <div className="bg-gray-700 rounded-lg p-3 mb-4">
          <h3 className="text-white font-bold mb-2">已選擇的類型</h3>
          <div className="flex flex-wrap gap-2">
            {eventTypeInfo && (
              <span className="badge badge-primary badge-lg">{eventTypeInfo.type_name}</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Display hashtags selection */}
      <div className="px-4 py-2">
        <div className="bg-gray-700 rounded-lg p-3 mb-4">
          <h3 className="text-white font-bold mb-2">選擇標籤 (可多選)</h3>
          <div className="flex flex-wrap gap-2">
            {loading ? (
              <p className="text-white">載入中...</p>
            ) : eventTags.length > 0 ? (
              eventTags.map((tag) => (
                <button
                  key={tag.type_id}
                  type="button" 
                  className={`badge ${selectedHashtags.includes(tag.type_id) ? 'badge-primary' : 'badge-outline'} badge-lg cursor-pointer`}
                  onClick={() => {
                    setSelectedHashtags(prev => 
                      prev.includes(tag.type_id)
                        ? prev.filter(id => id !== tag.type_id)
                        : [...prev, tag.type_id]
                    );
                  }}
                >
                  {tag.type_name}
                </button>
              ))
            ) : (
              <p className="text-white">沒有可用的標籤</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="grid gap-3 grid-cols-1">
        <h2 style={styles.text}>活動名稱</h2>
        <input
          style={styles.input}
          className='rounded'
          placeholder="請輸入活動名稱"
          value={inputs.name}
          onChange={(text) => { setInputs({ ...inputs, name: text.target.value }) }}
        />
        <div className="flex gap-3 mt-3 ms-4">
          <p style={styles.text}>開始時間</p>
          <input
            type="datetime-local"
            id="start-time"
            name="start-time"
            value={inputs.start_time}
            onChange={(text) => { setInputs({ ...inputs, start_time: text.target.value }) }}
          />
        </div>
        <div className="flex gap-3 mt-3 ms-4">
          <p style={styles.text}>結束時間</p>
          <input
            type="datetime-local"
            id="end-time"
            name="end-time"
            value={inputs.end_time}
            onChange={(text) => { setInputs({ ...inputs, end_time: text.target.value }) }}
          />
        </div>
        <p style={styles.text}>活動地點</p>
        <input
          style={styles.input}
          className="rounded"
          placeholder="請輸入活動地點"
          value={inputs.location}
          onChange={(text) => { setInputs({ ...inputs, location: text.target.value }) }}
        />
        <p style={styles.text}>參加費用</p>
        <input
          style={styles.input}
          className="rounded"
          placeholder="請輸入參加費用(請輸入數字，無則填0)"
          value={inputs.fee}
          onChange={(text) => { setInputs({ ...inputs, fee: Number(text.target.value) }) }}
        />
        <p style={styles.text}>活動介紹</p>
        <input
          style={styles.input}
          className="rounded"
          placeholder="請介紹你的活動"
          value={inputs.description}
          onChange={(text) => { setInputs({ ...inputs, description: text.target.value }) }}
        />
      </div>
      <div className='mt-3 ms-2'>
        <label htmlFor="photo" className='text-white'>上傳照片</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/png, image/jpeg"
          onChange={onSelectPhoto}
        />
        {
          selectedPhotos && (
            <img src={preview} style={{ width: 200, height: 100 }} />
          )}
      </div>
      <div className='mt-3'>
        <Button type='submit'>確認新增</Button>
      </div>
    </form>
  );
}
