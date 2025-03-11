'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const {id}=useParams();
  return (
    <div>
        <h1>Welcome Home</h1>
        <Link href={`/profile/${id}`}>Profile</Link>
    </div>
  )
}

export default page
