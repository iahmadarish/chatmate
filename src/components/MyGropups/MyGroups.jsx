import React, { useEffect, useState } from 'react'
import gl1 from '../../assets/gl1.png';
import gl2 from '../../assets/gl2.png';
import gl3 from '../../assets/gl3.png';
import { BsThreeDotsVertical } from 'react-icons/bs'


import { getDatabase, onValue, ref } from 'firebase/database';
import { useSelector } from 'react-redux';


const MyGroups = () => {
    const db = getDatabase()
    const data = useSelector(state => state.userLoginInfo.userInfo)
    const [myGroup, setMyGroup] = useState([])

    useEffect(() => {
        const userRef = ref(db, 'groupName/');
        let arr = []
        onValue(userRef, (snapshot) => {
            snapshot.forEach((item)=>{
                if(data.uid != item.key){
                    if(data.uid == item.val().adminId){
                        arr.push(item.val())
                    }
                }
            })
            setMyGroup(arr)

        });
    },[])


    return (
        <div className='shadow px-[22px] py-[20px] rounded-lg h-[400px] overflow-y-scroll'>
            <div className='relative flex justify-between py-[20px] items-center '>
                <h2 className='fixed font-pops text-[28px] font-semibold '> My Group Groups</h2>
                <BsThreeDotsVertical className='fixed left-[50%]' />
            </div>

            {/* users  */}
  
        {
            myGroup.map((item)=>(
                <div className='mt-[30px]'>
                <div className='flex items-center pb-[14px] border-b-2'>
                <img src={gl1} alt="" />
                <div className='ml-[20px]'>
                    <h2>{item.admin}</h2>
                    <p className='font-pops text-[18px] font-semibold'>{item.groupName}</p>
                    <p className='font-pops text-[14px] font-medium text-third'>{item.groupTag}</p>
                </div>
                <div className='ml-[50px]'>
                    <button className='px-[25px] py-[2px] bg-blueone rounded-md   font-pops text-[20px] font-semibold text-white'>Join</button>
                </div>
            </div>
               </div>
            ))
        }
        </div>
    )
}

export default MyGroups