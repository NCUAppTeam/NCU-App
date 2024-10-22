import { createFileRoute } from '@tanstack/react-router';
import { Header } from '../../components';
import { BasicIcon } from '../../components/icons/BasicIcon';
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
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },
  card: {
    width: '50%',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 10,
    color: 'white',
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
  
export const Route = createFileRoute('/sales/add_sell')({
    beforeLoad: AuthGuard,
    loader: async () => {
      const { data, error } = await supabase
        .from('sales')
        .select('*')
      if (error !== null) {
        throw error
      }
  
      return { sales: data }
    },
    component: EventSale
})
function EventSale() {
    const { sales } = Route.useLoaderData()
    return (
      <>
        <Header />
        <div style={styles.container}>
          <div style={styles.searchSection}>
            <BasicIcon size={24}>
              <circle cx="12" cy="12" r="14" />
            </BasicIcon>
              <input style={styles.searchInput} placeholder="搜尋" />
            <BasicIcon size={24}>
              <circle cx="12" cy="12" r="14" />
            </BasicIcon>
          </div>
          <div style={styles.categories}>
            <button style={styles.categoryButton}>全部</button>
            <button style={styles.categoryButton}>五金</button>
            <button style={styles.categoryButton}>飲料</button>
            <button style={styles.categoryButton}>贈品</button>
          </div>
          <div style={styles.grid}>
            {
              sales.map((p) => (
                <div key={p.id} style={styles.card}>
                  <h1 style={styles.productName}>{p.product}</h1>
                  <p style={styles.productInfo}>價格: {p.price} 元</p>
                </div>
              ))
            }{
              sales.map((p) => (
                <div key={p.id} style={styles.card}>
                  <h1 style={styles.productName}>{p.product}</h1>
                  <p style={styles.productInfo}>價格: {p.price} 元</p>
                </div>
              ))
            }
          </div>
        </div>
      </>
    )
  }
  