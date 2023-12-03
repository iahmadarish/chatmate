import { useState } from 'react';
import login from '../../assets/login.png';
import {RiEyeFill,RiEyeOffFill} from 'react-icons/ri';
import {FcGoogle} from 'react-icons/fc';

import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slices/userSlice';

const Login = () => {
    
// ! Mechanical part:
    const auth = getAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const [error, setError] = useState('');
    const [forgotPass, setForgotPass] = useState(false);

    const [emailerr, setEmailerr] = useState('');
    const [passworderr, setPassworderr] = useState('');


    const handleEmail = (e) => {
      setEmail(e.target.value);
      setEmailerr('');
    };
    const handlePassword = (e) => {
      setPassword(e.target.value);
      setPassworderr('');
    };

    const handleClick = (e) => {
      e.preventDefault();

      // ! Email:
      if(!email) {
        setEmailerr('email is required !!');
      } else {
          if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailerr('You have entered an invalid email address !!')
          }
        }
      
      // ! Password:
      if(!password) {
        setPassworderr('password is required !!');
      } else {
          if(!/(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)) {
            setPassworderr('Minimum eight characters, at least one letter and one number');
          }
        }
        

      if(email && password && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) && /(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(password)) {

        // ! Firebase:
        signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          toast.success('login successfully done');
          dispatch(userLoginInfo(user))
          localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user)));

          setTimeout(() => {
            navigate('/')
          },3000)
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if(errorCode.includes('auth/invalid-login-credentials')) {
              setError('Please give your right email & password');
          }
        }); 
      }

    };


    // ! Google Sign In:
    const googleSignIn = () => {
      signInWithPopup(auth, provider)
        .then(() => {
          toast.success('sign in successfully')
          setTimeout(() => {
            navigate('/')
          }, 3000)
        }).catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
        });
    }

    //! forgot pass:
    const handleForgotPass = () => {
      setForgotPass(true)
    }
    const cancelForgotPass = () => {
      setForgotPass(false)
    }

    const submitForgotPass = () => {
      const auth = getAuth();
      // ! Email:
      if(!email) {
        setEmailerr('email is required !!');
      } else {
          if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailerr('You have entered an invalid email address !!')
          }
      }
      
      if(email && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        sendPasswordResetEmail(auth, email)
        .then(() => {
          toast('please check your email')
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
        });
      }

    }

  return (

// ! Tailwind part:
    <div>
      <div className='flex'>
        <div className='w-1/2 flex justify-end'>
          <div className='mr-[160px] mt-[100px]'>
            <h1 className='font-sans font-bold text-[34.40px] text-secondary mb-[30px]'>Login to your account!</h1>

            <button onClick={googleSignIn} className='py-[22px] px-[50px] border-[0.9px] border-[rgba(3,1,76,0.3)] rounded-[8.5px]'>
              <div className='flex items-center justify-center'>
                <FcGoogle className='text-[25px]'/>
                <p className='font-sans font-semibold text-[14px] text-[#03014C] tracking-[0.3px] pl-[10px]'>Login with Google</p>
              </div>
            </button>

            {
              error &&
              <p className='w-full rounded font-sans font-semibold text-[20px] text-white bg-red-600 mt-[8px] p-3'>{error}</p>
            }

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

            <div className='relative mt-[55px] w-[368px]'>
            <input type="email" onChange={handleEmail} className='w-full py-[27px] border-b-[3px] border-gray-300 focus:border-violet-600  outline-none       font-sans font-semibold text-[#03014C] text-[21px]'/>
            <p className='absolute top-[-5px]        font-sans text-[14px] text-[rgba(3,1,76,0.6)]'>Email Address</p>
              {
                emailerr &&
                <p className='font-sans font-semibold text-white bg-red-600 p-2 rounded mt-[3px]'>{emailerr}</p>
              }
            </div>


            <div className='relative mt-[62px] w-[368px] mb-[50px]'>
            <input type={showPassword ? 'text' : 'password'} onChange={handlePassword} className='w-full py-[27px] border-b-[3px] border-gray-300 focus:border-violet-600 outline-none pl-[5px]       font-sans font-semibold text-[#03014C] text-[21px]'/>
            <p className='absolute top-[-5px]        font-sans text-[14px] text-[rgba(3,1,76,0.6)]'>Password</p>
            {
                showPassword ?
                <RiEyeFill onClick={() => setShowPassword(!showPassword)} className='absolute top-[37px] right-[33px] text-[22px]'/>
                :
                <RiEyeOffFill onClick={() => setShowPassword(!showPassword)} className='absolute top-[37px] right-[33px] text-[22px]'/>
            }
            
            {
                passworderr &&
                <p className='font-sans font-semibold text-white bg-red-600 p-2 rounded mt-[3px]'>{passworderr}</p>
            }
            </div>
            <div className='w-[368px]'>
                  <button onClick={handleClick} className='bg-blueone rounded-[8.7px] text-center py-[21px] w-full'>
                      <p className=' font-sans font-semibold text-[21px] text-white'>Login to Continue</p>
                  </button>
                  <p className='mt-[35px] font-sans text-[15px] text-[#03014C] text-center'>Don’t have an account ? <span className='font-bold text-[#EA6C00]'><a href="./Registration">Sign Up</a></span></p>
                  <p onClick={handleForgotPass} className='text-center font-sans text-[14px] text-[#EA6C00] mt-[30px] cursor-pointer'>Forgot password?</p>
            </div>
          </div>
        </div>
        <div className='w-1/2'>
          <img className='w-full h-screen object-cover' src={login} alt="registration-form" />
        </div>
      </div>

      {
        forgotPass &&
        <div className='absolute top-0 left-0 w-full h-screen bg-blueone flex justify-center items-center'>
          <div className='bg-white py-[100px] px-[200px] rounded-lg'>

              <h2 className='font-sans font-bold text-[34px] text-secondary'>Forgot Password?</h2>
              <div className='relative mt-[30px] w-[392px] m-auto'>
              <input type="email" value={email} onChange={handleEmail} className='w-full py-[27px] px-[45px] border-[3px] border-gray-300 focus:border-violet-500 outline-none rounded-[8.6px]        font-nunito font-semibold text-secondary text-[21px]'/>
              <p className='absolute top-[-9px] left-[32px] px-[18px] bg-white        font-nunito font-semibold text-[14px] text-secondary tracking-[1px]'>Email Address</p>
              {
                emailerr &&
                <p className='font-sans font-semibold text-white bg-red-600 p-2 rounded mt-[3px]'>{emailerr}</p>
              }
              </div>

              <div className='w-[392px] mt-[15px] flex m-auto'>
              <button onClick={submitForgotPass} className='bg-blueone rounded-[8.7px] text-center py-[21px] w-full'>
                      <p className='font-sans font-semibold text-[21px] text-white'>Submit</p>
              </button>
              <button onClick={cancelForgotPass} className='ml-[10px] bg-blueone rounded-[8.7px] text-center py-[21px] w-full'>
                      <p className='font-sans font-semibold text-[21px] text-white'>Back to Login</p>
              </button>
              </div>

          </div>
        </div> 
      }    
    </div>
  )
}

export default Login