import React, { createRef, useState } from 'react';
import profile from '../../assets/profile.png';
import { LiaHomeSolid } from 'react-icons/lia';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { IoLogOutOutline } from 'react-icons/io5';

import { getAuth, signOut, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidCloudUpload } from 'react-icons/bi';
import { AiFillMessage } from 'react-icons/ai';


import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useSelector } from 'react-redux';


const Sidebar = ({ active }) => {
  const data = useSelector(state => state.userLoginInfo.userInfo)
  console.log(data, 'jjljjjjjjjjjj')
  const navigate = useNavigate();
  const [imgUpload, setImgUpload] = useState(false)
  const auth = getAuth();
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState();
  const cropperRef = createRef();
  const storage = getStorage();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setTimeout(() => {
        navigate('/login')
      }, 2000);

    }).catch((error) => {
      console.log(error.code);
    });
  }

  const handleImageUpload = () => {
    setImgUpload(true)
  }
  const cancelImg = () => {
    setImgUpload(false)
  }
  const imgChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        console.log('Uploaded a data_url string!');
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL
          }).then(() => {
            setImgUpload(false)
            setImage('')
            setCropData('')

          })
        });
      });
    }
  };


  return (

    <div className='bg-blueone h-screen rounded-lg pt-[38px] relative'>
      <div className='group relative w-[100px] h-[100px] mx-auto '>
        <img src={data.photoURL} alt="profile" className='mx-auto rounded-full overflow-hidden w-full h-full mb-[20px]' />
        <div onClick={handleImageUpload} className='bg-overlay opacity-0 group-hover:opacity-100 rounded-full w-full h-full mx-auto absolute top-0 left-0 flex justify-center items-center cursor-pointer'>
          <BiSolidCloudUpload className='text-white text-[25px]' />
        </div>
        <h1 className='font-sans font-semibold text-[18px] text-white text-center mb-[30px]'> {data.displayName} </h1>
      </div>

      <div className={`relative mt-[78px] py-[20px] after:absolute after:content-[""] after:h-full after:w-full after:top-0 after:left-[25px] after:-z-10 z-10 ${active == 'home' && 'after:bg-white'} after:rounded-l-lg overflow-hidden before:absolute before:content-[""] before:h-full before:w-[8px] before:top-0 before:right-0 before:bg-primary before:rounded-l-lg after:cursor-pointer cursor-pointer`}>
        <Link to='/'>
          <LiaHomeSolid className={`mx-auto text-5xl ${active == 'home' ? 'text-blueone' : 'text-white'}`} />
        </Link>
      </div>

 

      <div className={`relative mt-[78px] py-[20px] after:absolute after:content-[""] after:h-full after:w-full after:top-0 after:left-[25px] after:-z-10 z-10 ${active == 'msg' && 'after:bg-white'} after:rounded-l-lg overflow-hidden before:absolute before:content-[""] before:h-full before:w-[8px] before:top-0 before:right-0 before:bg-primary before:rounded-l-lg after:cursor-pointer cursor-pointer`}>
        <Link to='/'>
          <AiFillMessage className={`mx-auto text-5xl ${active == 'msg' ? 'text-blueone' : 'text-white'}`} />
        </Link>
      </div>

      {/* <div className='mt-[80px] cursor-pointer'>
        <Link to='/'>
          <AiFillMessage className='mx-auto text-5xl text-[#bAD1FF]'/>
        </Link>
      </div> */}





      <div className='mt-[80px] cursor-pointer'>
        <IoIosNotificationsOutline className='mx-auto text-5xl text-[#BAD1FF]' />
      </div>

      <div className='mt-[80px] cursor-pointer'>
        <FiSettings className='mx-auto text-5xl text-[#BAD1FF]' />
      </div>
      
      <div className='mt-[75px] cursor-pointer'>
        <IoLogOutOutline onClick={handleSignOut} className='mx-auto text-5xl text-white' />
      </div>

      {
        imgUpload &&

        <div className='h-screen w-[1780px] h-full bg-blueone absolute top-0 left-0 z-10 flex justify-center items-center	'>
          <div className='bg-white w-[] px-[50px] py-[100px] rounded-lg'>
            <h1 className='font-sans font-bold text-[34px] text-blueone'> Image Upload </h1>


            <div className='w-[100px] h-[100px] rounded-full mx-auto overflow-hidden mb-[20px]'>
              <div className='img-preview w-[100px] h-[100px] rounded-full'></div>
            </div>




            {

              image &&
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            }

            <input type="file" className='my-[10px]' onChange={imgChange} />

            <div className='mt-[20px]'>
              <button onClick={getCropData} className='bg-blueone text-white py-[10px] px-[40px] text-[25px] rounded-lg font-bold'>
                Upload
              </button>
              <button onClick={cancelImg} className='ml-[20px] bg-[red] text-white py-[10px] px-[40px] text-[25px] rounded-lg font-bold'>
                cancel
              </button>
            </div>
          </div>


        </div>
      }
    </div>
  )
}

export default Sidebar