import { createFileRoute, Link } from '@tanstack/react-router';
import { BellIcon, Header, PlusIcon } from '../../components';
import { AuthGuard } from '../../utils/auth';
import { supabase } from '../../utils/supabase';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
};
export const Route = createFileRoute('/events/')({
  beforeLoad: AuthGuard,
  loader: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')

    if (error !== null) {
      throw error
    }

    return { events: data }
  },
  component: EventIndex
})

function EventIndex() {
  const { events } = Route.useLoaderData()
  const navigate = Route.useNavigate();
  return (
    <>
      <div className="container mx-auto">
        <Header />
        <div style={styles.container}>
          <h1 style={{ marginLeft: 140 }} className='text-lg text-white'>活動列表</h1>
          {
            events.map((event) => (
              <Link key={event.id} to='/events/$eventId' params={{ eventId: event.id.toString() }} >{event.name}</Link>
            ))
          }
        </div>
        <button className="btn btn-circle fixed right-4 bottom-4" onClick={()=>document.getElementById('my_modal_4').showModal()}>
          <PlusIcon />
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <div className="flex items-center justify-center">
                <BellIcon />
                <h3 className="font-bold text-2xl">通知</h3>
              </div>
              <p className="py-4 text-xl">確定要新增嗎？</p>
              <div className="modal-action flex justify-between">
              <button className="btn w-1/2" onClick={() => navigate({ to: '/events/create' })}>好</button>
                <form method="dialog" className="w-1/2">
                  {/* This button will close the dialog */}
                  <button className="btn w-full">取消</button>
                </form>
              </div>
            </div>
          </dialog>
        </button>
      </div>
    </>
  )
}
