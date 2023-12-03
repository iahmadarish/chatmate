import React, { useEffect, useState } from 'react'
import gl1 from '../../assets/gl1.png';
import gl2 from '../../assets/gl2.png';
import gl3 from '../../assets/gl3.png';
import { getDatabase, ref, onValue, set, push } from "firebase/database";


// import { BsThreeDotsVertical } from 'react-icons/bs'
import { useSelector } from 'react-redux';

const UserList = () => {
    const data = useSelector(state => state.userLoginInfo.userInfo)
    const db = getDatabase();
    const [userList, setUserList] = useState([])
    const [frndRqstList, setFrndRqstList] = useState([])
    const [frndList, setFrndList] = useState([])
    const [searchData, setSearchData] = useState('')



    useEffect(() => {
        const userRef = ref(db, 'users/');
        let arr = []
        onValue(userRef, (snapshot) => {
            snapshot.forEach((item) => {
                if (data.uid != item.key) {
                    arr.push({ ...item.val(), userid: item.key })
                }
            })
            setUserList(arr)

        });
    }, [])

    useEffect(() => {
        const frndRqstRef = ref(db, 'frndRqst/');
        onValue(frndRqstRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid + item.val().senderid)
            })
            setFrndRqstList(arr)
        });
    }, [])
    useEffect(() => {
        const friendRef = ref(db, 'friend/');
        onValue(friendRef, (snapshot) => {
            let arr = []
            snapshot.forEach((item) => {
                arr.push(item.val().receiverid + item.val().senderid)
            })
            setFrndList(arr)
        });
    }, [])



    const handleFrndRqst = (item) => {
        set(push(ref(db, 'frndRqst/')), {
            recevername: item.username,
            receiverid: item.userid,
            sendername: data.displayName,
            senderid: data.uid,
        });
    }

    const handleSearch = (e) => {
        let arr = []
        if (e.target.value.length == 0) {
            setSearchData([])
        } else{
            userList.filter((item)=>{
                
                if (item.username.toLowerCase().includes(e.target.value.toLowerCase())){
                    arr.push(item)
                    setSearchData(arr)
                }
            })
        }
   
    }

    return (
        <div className='shadow px-[22px] py-[20px] rounded-lg h-[400px] overflow-y-scroll'>
            <div className=' relative flex justify-between py-[10px] items-center  mb-[20px] rounded-lg px-[20px]'>
                
                <h2 className=' fixed font-pops text-[28px] font-semibold bg-[gainsboro] px-[20px] rounded-lg px-[20]'> Users</h2>

                <div className='relative'>
                <input 
                onChange={handleSearch} 
                type="text" 
                className=' fixed top-0 right-[3%] px-3 py-3 border-2 border-blue-500 rounded-lg' 
                placeholder='search user' />
                </div>

            </div>



            {
            searchData.length > 0 ?
            searchData.map((item)=>(
                <div className='flex items-center pb-[14px] border-b-2'>
                <img src={gl1} alt="" />
                <div className='ml-[20px]'>
                    <p className='font-pops text-[18px] font-semibold'>{item.username}</p>
                    <p className='font-pops text-[14px] font-medium text-third'>{item.email}</p>
                </div>
            
             {
                  frndList.includes(item.userid+data.uid)||
                  frndList.includes(data.uid+item.userid)
                  ?
                  <div className='ml-[50px]'>
                  <button className='px-[25px] py-[2px] bg-blueone rounded-md   font-pops text-[20px] font-semibold text-white'> Friend </button>
              </div>
              :
              frndRqstList.includes(item.userid+data.uid)||
              frndRqstList.includes(data.uid+item.userid)
              ?
              <div className='ml-[50px]'>
              <button className='px-[25px] py-[2px] bg-blueone rounded-md   font-pops text-[20px] font-semibold text-white'> Pending </button>
            </div>
            :
            <div className='ml-[50px]'>
            <button onClick={()=>handleFrndRqst(item)} className='px-[25px] py-[2px] bg-blueone rounded-md   font-pops text-[20px] font-semibold text-white'> + </button>
            </div>
            
             }
                
               
             
            </div>
            
            ))
             :
             userList.map((item)=>(
                <div className='flex items-center pb-[14px] border-b-2'>
                <img src={gl1} alt="" />
                <div className='ml-[20px]'>
                    <p className='font-pops text-[18px] font-semibold'>{item.username}</p>
                    <p className='font-pops text-[14px] font-medium text-third'>{item.email}</p>
                </div>
            
             {
                  frndList.includes(item.userid+data.uid)||
                  frndList.includes(data.uid+item.userid)
                  ?
                  <div className='ml-[50px]'>
                  <button className='px-[25px] py-[2px] bg-blueone rounded-md   font-pops text-[20px] font-semibold text-white'> Friend </button>
              </div>
              :
              frndRqstList.includes(item.userid+data.uid)||
              frndRqstList.includes(data.uid+item.userid)
              ?
              <div className='ml-[50px]'>
              <button className='px-[25px] py-[2px] bg-blueone rounded-md   font-pops text-[20px] font-semibold text-white'> Pending </button>
            </div>
            :
            <div className='ml-[50px]'>
            <button onClick={()=>handleFrndRqst(item)} className='px-[25px] py-[2px] bg-blueone rounded-md   font-pops text-[20px] font-semibold text-white'> + </button>
            </div>
            
             }   
             
            </div>
            
            ))
            
            }

        </div>
    )
}

export default UserList
