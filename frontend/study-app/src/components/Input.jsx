import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
const Input = ({onClose}) => {
    const [signup,setsignup]=useState(false);
  const [data,setdata]=useState("");
    const [error, setError] = useState(null); 

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setdata(prev=>({
        ...prev,
        [name]:value
    }))
  }
  const handlesubmit=async(e)=>{
e.preventDefault();
const endpoint=signup?"signup":"login";
    
  try {
    const res=await axios.post(`http://localhost:1000/user/${endpoint}`,data);
    localStorage.setItem("user",JSON.stringify(res.data.user));
    localStorage.setItem("token",res.data.token);
    localStorage.setItem("userId", res.data.user._id); 

     onClose()
     console.log(res.data);
     
    toast.success(signup ? "Signup successful!" : 'Login successful!');
  
     
     
  } catch (error) {

    if (error.response) {
    const errorMessage = error.response.data?.message
    setError(errorMessage);
    }
    else{
  setError('An unexpected error occurred.');

    }
  }
  }
  return (
    <form  onSubmit={handlesubmit} className="flex flex-col gap-4">
         <Toaster />
      <h2 className="text-xl font-bold text-center">Login</h2>

      <div className="flex flex-col">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
       <p onClick={()=>setsignup(pre=>!pre)}>{signup ? "Already have an account":"Create New Account"}</p>
       {error && (
        <p className='bg-red-700' >{error}</p>
       )}
      <button type="submit" className="py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold">
        {
            signup?'signup':'login'
        }
      </button>
    </form>
  );
};

export default Input;
