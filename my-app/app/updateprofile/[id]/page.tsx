"use client"
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useState,useEffect } from 'react'

const page = () => {
    const navigate= useRouter();
    const {id}=useParams();
    const [users, setUsers] = useState<any>([]);
    const [judge, setJudge] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
                const response = await axios.get(`http://localhost:3000/judge/getJudgeProfileByJudgeId/${id}`);
                setJudge(response.data);
            };

        fetchData();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setJudge({ ...judge, [e.target.name]: e.target.value });
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setJudge({ ...judge, judge_profile_picture: e.target.files[0] });
        }
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
    formData.append('judge_profile_name', judge.judge_profile_name);
    formData.append('judge_profile_gender', judge.judge_profile_gender);
    formData.append('judge_profile_email', judge.judge_profile_email);
    formData.append('judge_profile_password', judge.judge_profile_password);
        formData.append('judge_profile_picture', judge.judge_profile_picture);
    await axios.put(`http://localhost:3000/judge/updatejudge/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    
    navigate.push(`/profile/${id}`);
    };
    
    
  
    return (
      <>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <table>
          <tbody>
              <tr>
                  <td>
                  <label> Name:</label>
                  </td>
                  <td>
                  <input type='text' name='judge_profile_name' value={judge.judge_profile_name} onChange={handleChange}></input>
                  </td>
              </tr>
              <tr>
                  <td>
                  <label> Gender:</label>
                  </td>
                  <td>
                  <input type='text' name='judge_profile_gender' value={judge.judge_profile_gender} onChange={handleChange}></input>
                  </td>
              </tr>
              <tr>
                  <td>
                  <label> Email:</label>
                  </td>
                  <td><input type='email' name='judge_profile_email' value={judge.judge_profile_email} onChange={handleChange}></input>
                  </td>
              </tr>
              <tr>
                  <td>
                  <label> Password:</label>
                  </td>
                  <td>
                  <input type='password' name='judge_profile_password' value={judge.judge_profile_password} onChange={handleChange}></input>
                  </td>
              </tr>
              <tr>
                  <td>
                  <label> Picture:</label>
                  </td>
                  <td>
                  <input type='file' name='judge_profile_picture'  onChange={handleFileChange}></input>
                  </td>
              </tr>
              <tr>
                  <td colSpan={2} align='center'>
                  <button type='submit'>Update</button>
                  </td>
              </tr>
              </tbody>
          </table>
      </form>
      </>
    )
}

export default page
