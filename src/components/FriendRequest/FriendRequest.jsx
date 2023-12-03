import React, { useEffect, useState } from 'react'
import gl1 from '../../assets/gl1.png';
import gl2 from '../../assets/gl2.png';
import gl3 from '../../assets/gl3.png';
import frnd from '../../assets/frnds.png';

import {BsThreeDotsVertical} from 'react-icons/bs'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';


const FriendRequest = () => {

    const data = useSelector(state=>state.userLoginInfo.userInfo)
    const db = getDatabase();
    const [frndRqstList, setFrndRqstList]= useState([])
    
    useEffect(()=>{
        const frndRqstRef = ref(db, 'frndRqst/');
        onValue(frndRqstRef, (snapshot) => {
            let arr = [] 
            snapshot.forEach((item)=>{
                if(item.val().receiverid==  data.uid){
                    arr.push({...item.val(), key:item.key})

                }
            })
            setFrndRqstList(arr)
        });
    }, [])

    const handleFriend =(item)=>{
        set(push(ref(db, 'friend/')), {
            ...item
          }).then(()=>{
            remove((ref(db, 'frndRqst/' + item.key)))
          })
    }


  return (
    <div className= 'shadow px-[22px] py-[20px] rounded-lg h-[400px] overflow-y-scroll'>
        
        <div className='flex justify-between py-[20px] items-center'>
            <h2 className='font-pops text-[30px] font-semibold'>Friend Request</h2>
            <BsThreeDotsVertical/>
        </div>

{
    frndRqstList.length == 0 ?
    <div>
        <h1>NO Friend Request</h1>
        <img src={frnd} className=' w-full object-cover ' alt="frnd" />
    </div>
    :
    frndRqstList .map((item)=>(
        <div className='flex items-center pb-[14px] border-b-2'>
        <img src={gl1} alt="" />
        <div className='ml-[20px]'>
            <p className='font-pops text-[18px] font-semibold'>{item.sendername} </p>
            <p className='font-pops text-[14px] font-medium text-third'>Hi Guys, Wassup!</p>
        </div>
        <div className='ml-[50px]'>
            <button onClick={()=>handleFriend(item)} className='px-[25px] py-[2px] bg-blueone rounded-md   font-pops text-[20px] font-semibold text-white'>Accept </button>
        </div>
    </div>
    ))
}

    </div>
  )
}

export default FriendRequest