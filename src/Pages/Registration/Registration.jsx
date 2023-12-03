
import { useState } from 'react';
import registration from '../../assets/registration.png';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

import { ToastContainer, toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDatabase, set, ref } from "firebase/database";

// import LoadingSpinner from "./LoadingSpinner";


const Registration = () => {

  // ! Declaration:
  const auth = getAuth();
  const navigate = useNavigate();
  const db = getDatabase();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');

  const [nameerr, setNameerr] = useState('');
  const [emailerr, setEmailerr] = useState('');
  const [passworderr, setPassworderr] = useState('');

  // ! Functional:
  const handleName = (e) => {
    setName(e.target.value);
    setNameerr('');
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('');
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr('');
  }

  const handleClick = () => {
    //! name:
    if (!name) {
      setNameerr('name is required !');
    }

    //! email:
    if (!email) {
      setEmailerr('email is required !');
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr('You have entered an invalid email address !!');
    };

    //! password:
    if (!password) {
      setPassworderr('password is required !');
    } else if (!/(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)) {
      setPassworderr('Minimum eight characters, at least one letter and one number');
    };


    // ! Firebase :
    if (email && name && password && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) && /(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)) {

      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {

          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: "./src/assets/profile.png"
          }).then(() => {
            sendEmailVerification(auth.currentUser)
              .then(() => {
                toast.success('registration done. please verify your email');
                setEmail('');
                setName('');
                setPassword('');
                setTimeout(() => {
                  navigate('/Login')
                }, 3000)
              }).then(() => {
                console.log(user)
                set(ref(db, 'users/' + user.user.uid), {
                  username: user.user.displayName,
                  email: user.user.email,
                });
              })
          })

        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if (errorCode.includes('auth/email-already-in-use')) {
            setEmailerr('Email already exist !!!')
          }
        });
    }
  };

  return (

    // ! Tailwind Part:
    <div className='flex'>
      <div className='w-1/2 flex justify-end'>
        <div className='mr-[70px] mt-[100px]'>
          <h1 className='font-nunito font-bold text-[34.40px] text-secondary'>Get started with easily register</h1>
          <p className='font-nunito text-[20.64px] text-black opacity-50 mt-[13px]'>Free register <span className='text-[#808080] opacity-70'>and</span> you can enjoy it</p>

          {/* //! toast: */}
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />

          <div className='relative mt-[62px] w-[368px]'>
            <input type="text" value={name} onChange={handleName} className='w-full py-[27px] px-[60px] border-[3px] border-gray-300  focus:border-violet-500 outline-none rounded-[8.6px]        font-nunito font-semibold text-secondary text-[21px]' />
            <p className='absolute top-[-9px] left-[32px] px-[18px] bg-white        font-nunito font-semibold text-[14px] text-secondary tracking-[1px]'>Full Name</p>
            {
              nameerr &&
              <p className='font-sans font-semibold text-white bg-red-600 p-2 rounded mt-[3px]'>{nameerr}</p>
            }
          </div>


          <div className='relative mt-[62px] w-[368px]'>
            <input type="email" value={email} onChange={handleEmail} className='w-full py-[27px] px-[60px] border-[3px] border-gray-300 focus:border-violet-500 outline-none rounded-[8.6px]        font-nunito font-semibold text-secondary text-[21px]' />
            <p className='absolute top-[-9px] left-[32px] px-[18px] bg-white        font-nunito font-semibold text-[14px] text-secondary tracking-[1px]'>Email Address</p>
            {
              emailerr &&
              <p className='font-sans font-semibold text-white bg-red-600 p-2 rounded mt-[3px]'>{emailerr}</p>
            }
          </div>


          <div className='relative mt-[62px] w-[368px] mb-[50px]'>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePassword} className='w-full py-[27px] px-[60px] border-[3px] border-gray-300 focus:border-violet-500 outline-none rounded-[8.6px]        font-nunito font-semibold text-secondary text-[21px]' />
            <p className='absolute top-[-9px] left-[32px] px-[18px] bg-white        font-nunito font-semibold text-[14px] text-secondary tracking-[1px]'>Password</p>
            {
              showPassword ?
                <RiEyeFill onClick={() => setShowPassword(!showPassword)} className='absolute top-[37px] right-[33px] text-[22px]' />
                :
                <RiEyeOffFill onClick={() => setShowPassword(!showPassword)} className='absolute top-[37px] right-[33px] text-[22px]' />
            }

            {
              passworderr &&
              <p className='font-sans font-semibold text-white bg-red-600 p-2 rounded mt-[3px]'>{passworderr}</p>
            }
          </div>
          <div className='w-[368px]'>
            <button onClick={handleClick} className='bg-blueone rounded-[86px] text-center py-[21px] w-full'>
              <p className=' font-nunito font-semibold text-[21px] text-white'>Sign Up</p>
            </button>
            <p className='mt-[35px] font-sans text-[15px] text-[#03014C] text-center'>Already  have an account ? <span className='font-bold text-[#EA6C00]'><a href="./Login">Sign In</a></span></p>
          </div>
        </div>
      </div>
      <div className='w-1/2'>
        <img className='w-full h-screen object-cover' src={registration} alt="registration-form" />
      </div>
    </div>
  )
}

export default Registration