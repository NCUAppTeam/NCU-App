import { createFileRoute } from '@tanstack/react-router';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
};

export const Route = createFileRoute('/events/')({
  component: () => (
    <div style={styles.container}>
      <h1 style={{ marginLeft: 140 }} className='text-lg text-white'>活動列表</h1>
    </div>
  )
})
