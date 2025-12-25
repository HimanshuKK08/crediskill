import { useEffect, useState } from 'react';
import { dummyUserData } from '../src/data/dummyUserData';
import ProfileDashboard from '../src/components/profile/ProfileDashboard';
import EditProfile from '../src/components/profile/EditProfile';
import DemoControls from '../src/components/ui/DemoControls';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState('profile'); // local to dashboard
  const [userData, setUserData] = useState(dummyUserData);
  const [isOwner, setIsOwner] = useState(true);

  const handleSave = async (newData) => {
    const res = await fetch('http://localhost:3000/changedata',{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      credentials:'include',
      body: JSON.stringify(newData)
    })
    const data = await res.json();
    setUserData(data.data);
    setCurrentView('profile')

  };

  useEffect(()=>{
    const fetchUserData = async () => {
    const res = await fetch('http://localhost:3000/profile', {
      credentials: 'include',
    });

    const data = await res.json();
    // console.log(data);
    setUserData(data.data);
  };

  fetchUserData(); 
  },[])

  return (
    <>
     <DemoControls isOwner={isOwner} setIsOwner={setIsOwner} />
      {currentView === 'profile' ? (
        <ProfileDashboard
          userData={userData}
          isOwner={true}
          onEditProfile={() => setCurrentView('edit')}
        />
      ) : (
        <EditProfile
          userData={userData}
          onSave={handleSave}
          onCancel={() => setCurrentView('profile')}
        />
      )}
    </>
  );
}
 