import { createFileRoute } from '@tanstack/react-router';
import { Heart } from 'flowbite-react-icons/outline';
import { AuthGuard } from '../../utils/auth';
import { supabase } from '../../utils/supabase';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  searchSection: {
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    backgroundColor: '#333',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 4,
  },
  categories: {
    display: 'inline',
    padding: 5,
  },
  categoryButton: {
    paddingLeft: 8,
    paddingRight: 8,
    margin: 2,
    backgroundColor: '#888',
    borderRadius: 12,
    color: 'black',
  },
  grid: {
    padding: '10px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
  },
  card: {
    flex: '1 1 calc(25% - 10px)',
    maxWidth: 'calc(25% - 10px)',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#555',
    borderRadius: '10px',
    color: 'white'
  },
  productName: {
    fontSize: 16,
    color: 'white',
  },
  productInfo: {
    fontSize: 14,
    color: 'gray',
  },
  icon: {
    alignSelf: 'flex-end',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200ee',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export const Route = createFileRoute('/sales/')({
  beforeLoad: AuthGuard,
  loader: async () => {
    const { data, error } = await supabase.from('sales').select('*');
    if (error !== null) {
      throw error
    }

    return { sales: data }
  },
  component: SaleIndex,
})

function SaleIndex() {
  const { sales } = Route.useLoaderData()
  return (
    <>
      <div className="container mx-auto">
        <textarea className="textarea textarea-primary w-full h-7 text-lg py-3" placeholder="Search..."></textarea>
        <div style={styles.categories}>
          <button style={styles.categoryButton}>全部</button>
          <button style={styles.categoryButton}>五金</button>
          <button style={styles.categoryButton}>飲料</button>
          <button style={styles.categoryButton}>贈品</button>
        </div>
        <div className='w-full py-6 px-3'>
          <h1 className='text-white font-bold text-2xl'>拍賣</h1>
          <div className='grid grid-cols-2 gap-1'>
            {sales.map((p) => (
              <div className='h-80 p-10 bg-stone-500 hover:bg-stone-600 active:bg-stone-700 focus:outline-none focus:ring focus:ring-violet-300 scale-95 hover:scale-100 relative overflow-hidden'>
                {/* 由於 image 欄位在資料庫不存在，使用預設圖片 */}
                <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('https://i.imgur.com/vSLHiCS.png')`, backgroundRepeat: "no-repeat" }}></div>
                <h1 className='text-slate-50 font-semibold text-xl absolute left-1 bottom-7 z-10'>{p.product}</h1>
                <Heart size={24} className="absolute top-3 right-3 z-10" />
                <h1 className='text-slate-300 font-semibold text-xl absolute left-1 bottom-1 z-10'>{p.price} 元</h1>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
