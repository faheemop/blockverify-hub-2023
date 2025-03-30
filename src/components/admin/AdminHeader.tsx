
import { useAuth } from "@/contexts/AuthContext";

export const AdminHeader = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage business verification requests and view transaction details
        </p>
      </div>
      <div className="text-right">
        <p className="font-medium">Logged in as</p>
        <p className="text-muted-foreground">{user?.username}</p>
      </div>
    </div>
  );
};
