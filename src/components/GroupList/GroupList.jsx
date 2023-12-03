import React, { useEffect, useState } from 'react'
import gl1 from '../../assets/gl1.png';
import gl2 from '../../assets/gl2.png';
import gl3 from '../../assets/gl3.png';
import group from '../../assets/group.png';

import { BsThreeDotsVertical } from 'react-icons/bs'
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';




const GroupList = () => {
    const db = getDatabase()
    const data = useSelector(state => state.userLoginInfo.userInfo)

    const [show, setShow] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [groupTag, setGroupTag] = useState('')
    const [gnameerr, setGnameerr] = useState('')
    const [gTnameerr, setGTnameerr] = useState('')
    const [grouplist, setGrouplist] = useState([])
    const [creategroupDone, setCreategroupDone] = useState(true)

    const handleGroupPop = () => {
        setShow(!show)
    }


    const handleCreateGroup = () => {
        if (!groupName) {
            setGnameerr('group name is required')
            setGTnameerr('tag name required')
        }

        set(push(ref(db, 'groupName/')), {
            groupName: groupName,
            groupTag: groupTag,
            admin: data.displayName,
            adminId: data.uid
        }).then(() => {
            setCreategroupDone(false)

        })
    }


    useEffect(() => {
        const userRef = ref(db, 'groupName/');
        let arr = []
        onValue(userRef, (snapshot) => {
            snapshot.forEach((item) => {
                if (data.uid != item.key) {
                    if (data.uid !== item.val().adminId) {
                        arr.push(item.val())
                    }
                }
            })
            setGrouplist(arr)

        });
    }, [])




    return (
        <div className='shadow px-[22px] py-[20px] rounded-lg h-[400px] overflow-y-scroll'>
            <div className='flex justify-between py-[20px] items-center'>
                <h2 className='font-pops text-[30px] font-semibold'>Groups List</h2>
                {
                    show ?
                        <button onClick={handleGroupPop} className='p-3 bg-[red] text-[18px] font-semibold text-white rounded-lg'> Go Back </button>
                        :
                        <button onClick={handleGroupPop} className='p-3 bg-blueone text-[18px] font-semibold text-white rounded-lg'> Create Group </button>
                }

            </div>

           
            {
                show ?
                    <div className='bg-[blue] p-6 absolute top-[10%] left-[35%] h-[700px] w-[700px] border-1 rounded-[1%] z-[999999999]	'>
                        <input onChange={(e) => setGroupName(e.target.value)} value={groupName} type="text" placeholder='Group Name' className='w-full py-3 px-3 border-[3px] border-gray-300  focus:border-violet-500 outline-none rounded-lg font-nunito font-semibold text-secondary text-[21px]' />

                        {
                            gnameerr &&
                            <p className='font-pops text-[18px] font-semibold'>{groupName}</p>

                        }

                        <input onChange={(e) => setGroupTag(e.target.value)} value={groupTag} type="text" placeholder='Group Tag Name' className='w-full mt-3 py-3 px-3 border-[3px] border-gray-300  focus:border-violet-500 outline-none rounded-lg font-nunito font-semibold text-secondary text-[21px]' />
                        {
                            gTnameerr &&
                            <p className='font-pops text-[18px] font-semibold'>{groupTag}</p>

                        }

                        <div className='flex gap-10'>
                            <button onClick={handleCreateGroup} className='bg-[white] mt-4 p-4 text-[18px] text-black font-semibold  rounded-lg'>
                                Creat Group
                            </button>
                            <button onClick={handleGroupPop} className='bg-[red] mt-4 p-4 text-[18px] font-semibold text-white rounded-lg'> Go Back </button>
                        </div>
                    </div>
                    :
                    <>
                        {
                            grouplist.map((item) => (
                                <div className='flex items-center pb-[14px] border-b-2'>
                                    <img src={gl1} alt="" />
                                    <div className='ml-[20px]'>
                                        <p className='font-pops text-[18px] font-semibold'>{item.admin}</p>
                                        <p className='font-pops text-[18px] font-semibold'>{item.groupName}</p>
                                        <p className='font-pops text-[14px] font-medium text-third'>{item.groupTag}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </>

            }

        </div>
    )
}

export default GroupList