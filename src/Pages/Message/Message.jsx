import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import GroupList from '../../components/GroupList/GroupList'
import Friends from '../../components/Friends/Friends'

const Message = () => {
  return (
    <div>
         <div className='flex bg-white'>
          <div className='w-[186px] '>
            <Sidebar active='msg'/>
          </div>
          <div className='w-[487px] ml-[43px] pt-[10px]'>
            <GroupList/>
            <br /><br />
            <Friends/>

          </div>
          <div className='w-[487px] ml-[43px] pt-[10px]'>
            
          </div>

        </div>
    </div>
  )
}

export default Message