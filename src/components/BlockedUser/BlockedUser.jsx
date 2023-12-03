import React, { useEffect, useState } from 'react'
import gl1 from '../../assets/gl1.png';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockedUser = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo)
    const db = getDatabase();
    const [blocList, setBlockList] = useState([])
    useEffect(() => {
        const blockRef = ref(db, 'block/');
        onValue(blockRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                if (item.val().blockbyid == data.uid) {
                    arr.push({
                        id: item.key,
                        block: item.val().block,
                        blockid: item.val().blockid
                    })
                } else if (item.val().blockid == data.uid) {
                    arr.push({
                        id: item.key,
                        blockby: item.val().blockby,
                        blockbyid: item.val().blockbyid
                    })
                }
            })
            setBlockList(arr)
        });
    }, [])

    const handleUnblock = (item) => {
        set(push(ref(db, 'friend/')), {
            sendername: item.block,
            senderid: item.blockid,
            recevername: data.displayName,
            receiverid: data.uid
        }).then(()=>{
            remove(ref(db, 'block/', + item.id))
        })    
    }

    return (
        <div className='shadow px-[22px] py-[20px] rounded-lg h-[400px] overflow-y-scroll'>

            <div className='flex justify-between py-[20px] items-center'>
                <h2 className='font-pops text-[28px] font-semibold'>Block user</h2>
                <BsThreeDotsVertical />
            </div>



            {
                blocList.map((item) => (
                    <div className='flex items-center pb-[14px] border-b-2'>
                        <img src={gl1} alt="" />
                        <div className='ml-[20px]'>
                            <p className='font-pops text-[18px] font-semibold'>{item.block}</p>
                            <p className='font-pops text-[18px] font-semibold'>{item.blockby}</p>
                            <p className='font-pops text-[14px] font-medium text-third'>Hi Guys, Wassup!</p>
                        </div>
                        <div className='ml-[50px]'>
                            {
                                !item.blockby &&
                                <button onClick={() => handleUnblock(item)} className='px-[25px] py-[2px] bg-blueone rounded-md   font-pops text-[20px] font-semibold text-white'>Unblock</button>
                            }
                        </div>
                    </div>

                ))
            }


        </div>
    )
}

export default BlockedUser