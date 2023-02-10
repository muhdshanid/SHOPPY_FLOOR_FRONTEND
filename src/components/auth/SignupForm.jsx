import React, { useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUser, setUserToken } from '../../store/reducers/authReducer'
import { useUserRegisterMutation } from '../../store/services/authServices'

const SignupForm = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [signupUser,res] = useUserRegisterMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signup = () => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!email.match(regex) ){
      setIsEmailValid(false)
      return;
    }else{
      setIsEmailValid(true)
    }
    if(password.length < 5){
      setIsPasswordValid(false)
      return;
    }else{
      setIsPasswordValid(true)
    }
    signupUser({email,password,name})
  }
  useEffect(()=>{
    if(res.isSuccess){
      localStorage.setItem("token",res?.data?.token)
      localStorage.setItem("user",JSON.stringify(res?.data?.newUser))
      dispatch(setUserToken(res?.data?.token))
      dispatch(setUser(res?.data?.newUser))
      navigate("/")
    }
  },[dispatch, navigate, res?.data?.token, res?.data?.newUser, res?.isSuccess]) 
  return (
    <div className='w-full px-8'>
    <div className='flex flex-col  gap-6'>
    <input type="text"
    value={name}
    onChange={(e)=>setName(e.target.value)}
    className='bg-gray-50 border
    outline-none  border-green-900 w-full p-4 rounded-lg' placeholder='Name' />
    <div>
    <input type="email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    className='bg-gray-50 border
    outline-none  border-green-900 w-full p-4 rounded-lg' placeholder='Email' />
     { !isEmailValid && <div>
          <p className='font-semibold  text-rose-600 capitalize text-base'>
            invalid email
          </p>
        </div>}
    { res?.isError && res?.error?.data?.field === "Email" && <div>
          <p className='font-semibold  text-rose-600 capitalize text-base'>
            {res?.error?.data?.msg}
          </p>
        </div>}
    </div>
    <div>
    <input type="password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    className='bg-gray-50 border
    outline-none  border-green-900 w-full p-4 rounded-lg' placeholder='Password' />
     { !isPasswordValid && <div>
          <p className='font-semibold  text-rose-600 capitalize text-base'>
            password should be greater than 5 characters
          </p>
        </div>}
        { res?.isError && res?.error?.data?.field === "Password" && <div>
          <p className='font-semibold  text-rose-600 capitalize text-base'>
            {res?.error?.data?.msg}
          </p>
        </div>}
    </div>
    <div>
    <button onClick={signup} disabled={name === "" || email === "" || password === ""} className='bg-green-900 px-4 py-2 hover:bg-gray-200 hover:text-black
         rounded-full w-full flex-ic justify-center border border-black font-semibold text-white'>
          {res?.isLoading ? 
                      <>
                        <CgSpinner className="h-6 w-6 mr-2 animate-spin" />
                       
                      </>
                      :
          "Signup"}
          </button>
    </div>
    <div>
        <p className='font-semibold  text-md text-gray-900'>Already have an account ?
         <Link to={"/login"} className='font-semibold underline text-md text-gray-900'> Login</Link></p>
    </div>
    </div>
</div>
  )
}

export default SignupForm