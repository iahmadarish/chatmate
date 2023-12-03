// import React from 'react'
import gl1 from '../../assets/gl1.png';
import gl2 from '../../assets/gl2.png';
import gl3 from '../../assets/gl3.png';

import { BsThreeDotsVertical } from 'react-icons/bs'

// import { BsThreeDotsVertical } from 'react-icons/bs'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'


const Friends = () => {

    const data = useSelector(state => state.userLoginInfo.userInfo)
    const db = getDatabase();
    const [frndList, setFrndList] = useState([])

    useEffect(() => {
        const friendRef = ref(db, 'friend/');
        onValue(friendRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (data.uid == item.val().receiverid || data.uid == item.val().senderid) {
                    arr.push({...item.val(), key:item.key})
                }
            })
            setFrndList(arr)
        });
    }, [])

    const handleBlock = (item) => {
        if (data.uid == item.senderid) {
            set(push(ref(db, 'block/')), {
                block: item.recevername,                
                blockid: item.receiverid,
                blockby: item.sendername,
                blockbyid: item.senderid
            }).then(()=>{
                remove(ref(db, 'friend/', +item.key))
            })
        } else {
            set(push(ref(db, 'block/')), {
                block: item.sendername,
                blockid: item.senderid,
                blockby: item.recevername,
                blockbyid: item.receiverid
            }).then(()=>{
                remove(ref(db, 'friend/', +item.key))
            })
        }
    }



    return (
        <div className=' shadow px-[22px] py-[20px] rounded-lg h-[400px] overflow-y-scroll'>
            <div className='bg-[gainsboro] flex justify-between py-[20px] items-center mb-[20px] rounded-lg px-[20px]'>
                <h2 className='fixed font-pops text-[28px] font-semibold'>Friends</h2>
              
            </div>

            {
                frndList.map((item) => (
                    <div className='flex items-center pb-[14px] border-b-2'>
                        <img src={gl1} alt="" />
                        <div className='ml-[20px]'>
                            <p className='font-pops text-[18px] font-semibold'>
                                {
                                    item.receiverid == data.uid ? item.sendername : item.recevername
                                } </p>
                            <p className='font-pops text-[14px] font-medium text-third'>Hi Friend, Wassup!</p>
                        </div>

                        <div className=''>
                            <div className='ml-[50px]'>
                                <button onClick={() => handleBlock(item)} className='px-[25px] py-[2px] bg-blueone rounded-md   font-pops text-[20px] font-semibold text-white'>Block</button>
                            </div>
                            <div className='ml-[50px] mt-[10px]'>
                                <button className='px-[20px] py-[2px] bg-blueone rounded-md   font-pops text-[20px] font-semibold text-white'>Message</button>
                            </div>
                        </div>
                    </div>

                ))
            }





        </div>
    )
}

export default Friends