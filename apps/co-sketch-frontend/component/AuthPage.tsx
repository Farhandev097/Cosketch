"use client"


const AuthPage = ({isSignin} : {
    isSignin : boolean
}) => {
  return (
    <div className='w-screen text-black h-screen flex justify-center items-center'>
        <div className='p-2 m-2  rounded'>
            <div className='m-4 px-6 py-4 bg-white '>
            <input type="text" placeholder='Enter Your Email' />
            </div>
            <div className='m-4 px-6 py-4 bg-white '>
            <input type="text" placeholder='Enter Your Password' />
            </div>
            <div className='m-4 px-6 py-4 bg-white '>
            <button onClick={() => {

            }} >{isSignin ? "Sign In" : "Sign Up"}</button>
            </div>
         </div>              
    </div>
  )
}

export default AuthPage
