'use client';
import axios from 'axios';
import { useCookie } from 'next-cookie';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const jwtToken = useCookie('jwtToken');
    const cookie=jwtToken.get('jwtToken');
    const { id } = useParams();
    const [users, setUsers] = useState<any>([]);
    const navigate=useRouter();

    useEffect(() => {
        const fetchData = async () => {
                const response = await axios.get(`http://localhost:3000/judge/getJudgeProfileByJudgeId/${id}`, {
                    headers: {
                        Authorization: `Bearer ${cookie}`,
                   },
                    });
                setUsers(response.data);
            };

        fetchData();
    }, [id]);

    const [imageSrc, setImageSrc] = useState('');
    useEffect(() => {
        const img=`http://localhost:3000/judge/getimage/${users.judge_profile_picture}`;
        setImageSrc(img);
    }, [users]);
  

    const handleDelte= async ()=>{
        const response = await axios.delete(`http://localhost:3000/judge/deleteimage/${id}`, {
            headers: {
            Authorization: 'Bearer ' + cookie,
           },
            });
        navigate.push('/signup');
    }


    return (
        <table >
           <tbody>
            <tr>
                <td>Name: </td>
                <td>{users.judge_profile_name}</td>
            </tr>
            <tr>
                <td>Gender: </td>
                <td>{users.judge_profile_gender}</td>
            </tr>
            <tr>
                <td>Email: </td>
                <td>{users.judge_profile_email}</td>
            </tr>
            <tr>
                <td>Picture: </td>
                <td><img src={imageSrc}/></td>
            </tr>
            <tr>
                <td>Action: </td>
                <td><Link href={`/updateprofile/${id}`}>Edit</Link></td>
                <td><button type='submit' onClick={handleDelte}>Delete</button></td>
            </tr>
           </tbody>
        </table>
    );
}

export default Page;
