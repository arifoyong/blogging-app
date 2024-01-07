"use client"

import React, { useState, useEffect } from 'react'
import {  Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { firebaseConfig } from '@/utils'
import Spinner from '@/components/ui/spinner';
import { Loader2 } from 'lucide-react';

const app = initializeApp(firebaseConfig)
const storage = getStorage(app, process.env.NEXT_PUBLIC_FIREBASE_URL || '')

const createUniqueFileName = (fileName: string) => {
  const timeStamp = Date.now()
  const randomString = Math.random().toString(36).substring(2,12)
  return `${fileName}-${timeStamp}-${randomString}`
}

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  },[])


  const handleImageSaveToFirebase = async (file: any) => {
    const uniqueFileName = createUniqueFileName(file?.name)
    const storageRef = ref(storage, `blog/${uniqueFileName}`)
    const uploadImg = uploadBytesResumable(storageRef, file)

    return new Promise((resolve, reject) => {
      uploadImg.on('state_changed', (snapshot) => {}, (error) => reject(error), () => {
        getDownloadURL(uploadImg.snapshot.ref)
        .then(url => resolve(url))
        .catch(error => reject(error))
      })
    })
  }

  const handleBlogImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    setImageLoading(true)
    const saveImageToFirebase = await handleImageSaveToFirebase(event.target.files[0])
    if (saveImageToFirebase !== "") {
      onChange(saveImageToFirebase as string)
    }
    setImageLoading(false)
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className=''>
      <div className="mb-4 flex flex-row items-center gap-4">
        <Input 
          id="picture" 
          type="file" 
          onChange={handleBlogImageChange}
        />
        { imageLoading && (
          <div className='flex gap-x-2'>
            <Loader2 className='animate-spin'/>
            <p>loading...</p>
          </div>
        ) }
      </div>
    </div>
  )
}

export default ImageUpload