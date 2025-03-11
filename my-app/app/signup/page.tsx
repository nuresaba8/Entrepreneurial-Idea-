"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const page = () => {
    const navigate= useRouter();
    const [judge, setJudge] = useState({
      judge_name: '',
      judge_email: '',
      judge_password: '',
      judge_gender: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setJudge({ ...judge, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('Judge data:', judge);  
        const response = await axios.post('http://localhost:3000/auth/addauthjudge', judge);
        navigate.push('/login');
    };
    
    
  
    return (
      <>
      <form onSubmit={handleSubmit}>
          <table>
          <tbody>
              <tr>
                  <td>
                  <label>Judge Name:</label>
                  </td>
                  <td>
                  <input type='text' name='judge_name' onChange={handleChange}></input>
                  </td>
              </tr>
              <tr>
                  <td>
                  <label>Judge Gender:</label>
                  </td>
                  <td>
                  <input type='text' name='judge_gender' onChange={handleChange}></input>
                  </td>
              </tr>
              <tr>
                  <td>
                  <label>Judge Email:</label>
                  </td>
                  <td><input type='email' name='judge_email' onChange={handleChange}></input>
                  </td>
              </tr>
              <tr>
                  <td>
                  <label>Judge Password:</label>
                  </td>
                  <td>
                  <input type='password' name='judge_password' onChange={handleChange}></input>
                  </td>
              </tr>
              <tr>
                  <td colSpan={2} align='center'>
                  <button type='submit'>Sign up</button>
                  </td>
              </tr>
              </tbody>
          </table>
      </form>
      </>
    )
}

export default page
