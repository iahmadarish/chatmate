import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Sidebar from '../../components/Sidebar/Sidebar';
import GroupList from '../../components/GroupList/GroupList';
import { userLoginInfo } from '../../slices/userSlice';
import FriendRequest from '../../components/FriendRequest/FriendRequest';
import Friends from '../../components/Friends/Friends';
import MyGroups from '../../components/MyGropups/MyGroups';
import UserList from '../../components/UserList/UserList';
import BlockedUser from '../../components/BlockedUser/BlockedUser';


const Home = () => {

  const navigate = useNavigate();
  const auth = getAuth();
  const [verify, setVerify] = useState(false);

  const data = useSelector(state => state.userLoginInfo.userInfo)
  const dispatch= useDispatch()

  console.log(data);


    useEffect(() => {
      if(!data) {
        navigate("/Login");
      }
    }, []);

    onAuthStateChanged(auth, (user) => {
      if (user.emailVerified) {
        setVerify(true);
        dispatch(userLoginInfo(user))
        localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user)));
      }
    });

  return (
    <div>
      {
        verify ?
        <div className='flex bg-white'>
          <div className='w-[186px] '>
            <Sidebar active='home'/>
          </div>
          <div className='w-[487px] ml-[43px] pt-[10px]'>
            <GroupList/>
<br />
<br /><br />

           <FriendRequest/>
          </div>
          <div className='w-[487px] ml-[43px] pt-[10px]'>
          <Friends/>
          <br />
          <br />
          <br />
          <MyGroups/>
          </div>
          <div className='w-[487px] ml-[43px]  pt-[10px]'>
            
            <UserList/><br /><br /><br />
            <BlockedUser/>
          </div>
        </div>
        :
        <div className='h-screen w-full bg-blueone flex justify-center items-center'>
          <div className='bg-white py-[140px] px-[180px] text-center rounded-lg'>
            <h1 className='font-sans font-bold text-[34.40px] text-secondary mb-[40px]'>🚨 Please Verify Your Email !! 🚨</h1>
            <button className='px-[30px] py-[20px] bg-blueone rounded-[8.7px]'>
              <Link className='text-white text-center font-sans font-semibold text-[20px]' to='/Login'>Back to Login</Link>
            </button>
          </div>
        </div>
      }
    </div>
  )
}

export default Home