import { createFileRoute, useSearch } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
  component: Signup,
  validateSearch: (search: Record<string, string>) => ({
    userData: search.userData ?? '{}'
  }),
});

function Signup() {
    const { userData } = useSearch({ from: '/signup' });
    const user = JSON.parse(userData); 
  
    return (
      <div>
        <h2>Signup Page</h2>
        <h3>使用者資訊:</h3>
        <p><strong>姓名:</strong> {user.chineseName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Email驗證:</strong> {user.emailVerified ? '✅ 已驗證' : '❌ 未驗證'}</p>
        <p><strong>學號:</strong> {user.studentId}</p>
        <p><strong>ID:</strong> {user.id}</p>
      </div>
    );
  }

export default Signup;