'use client'; 
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';
import { useCookie } from 'next-cookie';


const page = () => {
  const cookie=useCookie('jwtToken')
  const navigate= useRouter();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      const response = await axios.post('http://localhost:3000/auth/login', user);
       
      const {id, access_token} = response.data;
      cookie.set('jwtToken', access_token, {
        maxAge: 60 * 60 * 24, 
       sameSite: 'strict',
         });
        console.log(cookie);
      setUser({
        email: '',
        password: ''
      });
      navigate.push(`/home/${id}`);
  };
  
  

  return (
    <>
    <form onSubmit={handleSubmit}>
        <table>
            <tbody>
                <tr>
                    <td>
                    <label>Judge Email:</label>
                    </td>
                    <td>
                    <input type='email' name='email' onChange={handleChange}></input>
                    </td>
                </tr>
                <tr>
                    <td>
                    <label>Judge Password:</label>
                    </td>
                    <td>
                    <input type='password' name='password' onChange={handleChange}></input>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} align='center'>
                    <button type='submit'>Log in</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
    </>
  )
}

export default page
