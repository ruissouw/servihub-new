import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore'; 
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function Login() {
  const navigate = useNavigate();
  const setRole = useUserStore(state => state.setRole);

  const handleLogin = (role: 'customer' | 'tuition' | 'salon') => {
    setRole(role);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 px-4">
      <h1 className="text-2xl font-semibold">Select Your Role</h1>
      <Select onValueChange={(v) => handleLogin(v as 'customer' | 'tuition' | 'salon')}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Choose your role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="customer">Customer</SelectItem>
          <SelectItem value="tuition">Tuition Business</SelectItem>
          <SelectItem value="salon">Salon Business</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
