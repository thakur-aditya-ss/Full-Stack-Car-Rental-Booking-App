import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {

    const {setShowLogin, axios, setToken, navigate, setUser, setIsOwner} = useAppContext()

    const [state, setState] = React.useState("login");
    const [role, setRole] = React.useState("user");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event)=>{
        try {
            event.preventDefault();
            
            if (state === 'forgot') {
                const {data} = await axios.post(`/api/user/reset-password`, {email, password})
                if (data.success) {
                    toast.success(data.message)
                    setState('login')
                } else {
                    toast.error(data.message)
                }
                return;
            }

            const {data} = await axios.post(`/api/user/${state}`, {name, email, password, role})

            if (data.success) {
                if (data.user) {
                    setUser(data.user)
                    setIsOwner(data.user.role === 'owner')
                }

                if (data.user && data.user.role === 'owner') {
                    navigate('/owner')
                } else {
                    navigate('/')
                }
                setToken(data.token)
                localStorage.setItem('token', data.token)
                setShowLogin(false)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
        
    }

  return (
    <div onClick={()=> setShowLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-[100] flex items-center justify-center text-sm text-gray-600 bg-black/50 p-4'>

      <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 w-full max-w-sm p-6 sm:p-8 py-10 sm:py-12 rounded-lg shadow-xl border border-gray-200 bg-white max-h-[90vh] overflow-y-auto">
            
            {state !== 'forgot' && (
                <div className='flex w-full justify-between border border-gray-200 rounded-md overflow-hidden mb-2'>
                    <div onClick={() => setRole("user")} className={`flex-1 text-center py-2 cursor-pointer transition-all ${role === "user" ? "bg-primary text-white font-medium" : "bg-gray-100 text-gray-600"}`}>
                        User
                    </div>
                    <div onClick={() => setRole("owner")} className={`flex-1 text-center py-2 cursor-pointer transition-all ${role === "owner" ? "bg-primary text-white font-medium" : "bg-gray-100 text-gray-600"}`}>
                        Admin
                    </div>
                </div>
            )}

            <p className="text-2xl font-medium m-auto mb-2 text-center">
                {state === 'forgot' ? (
                    "Reset Password"
                ) : (
                    <><span className="text-primary">{role === "user" ? "User" : "Admin"}</span> {state === "login" ? "Login" : "Sign Up"}</>
                )}
            </p>
            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
            </div>
            <div className="w-full ">
                <p>{state === 'forgot' ? 'New Password' : 'Password'}</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
            </div>
            
            {state === "login" && (
                <p onClick={() => setState('forgot')} className="text-primary cursor-pointer mt-[-8px] text-sm hover:underline">
                    Forgot Password?
                </p>
            )}

            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer font-medium">click here</span>
                </p>
            ) : state === 'forgot' ? (
                <p>
                    Remember your password? <span onClick={() => setState("login")} className="text-primary cursor-pointer font-medium">Login here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer font-medium">click here</span>
                </p>
            )}
            <button className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer font-medium mt-2">
                {state === "register" ? "Create Account" : state === "forgot" ? "Reset Password" : "Login"}
            </button>
        </form>
    </div>
  )
}

export default Login
