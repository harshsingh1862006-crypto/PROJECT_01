
import { Role } from '@/app/api/types';
import { getCurrentUser } from '@/app/lib/auth'
import { redirect } from 'next/navigation';

const Dashboard = async () => {

  const user = await getCurrentUser();
  if(!user){
    redirect("/login");
  }
  if(user.role == Role.ADMIN){
    redirect("/dashboard/admin")
  }
  if(user.role == Role.USER){
    redirect("/dashboard/user")
  }
  

}

export default Dashboard