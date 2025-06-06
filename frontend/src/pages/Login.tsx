import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/userStore';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import bookingTemplates from '@/templates/BookingTemplates'; 

export default function Login() {
  const navigate = useNavigate();
  const setRole = useUserStore(state => state.setRole);

  const handleLogin = (role: string) => {
    setRole(role);
    console.log(role);
    navigate('/');
  };

  const roles = [
    { id: 'customer', label: 'Customer' },
    ...bookingTemplates.map(t => ({ id: t.id, label: t.label }))
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 px-4">
      <h1 className="text-2xl font-semibold">Select Your Role</h1>
      <Select onValueChange={(v) => handleLogin(v)}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select View" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.id} value={role.id}>
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
