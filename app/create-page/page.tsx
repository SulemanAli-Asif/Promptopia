'use client';

import {useState} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Form from '@components/Form';


const CreatePost = () => {
    const [submit, setSubmit] = useState(false);
    const [post, setPost] = useState({
        'prompt': '',
        'tag': '',
    });

    const createPost = async (e) => {
        e.prevenetDefault();
        setSubmit(true);

        try{
            const response = await fetch('/api/prompt/new',{
               method:'POST' ,
               body: JSON.stringify({
                prompt:post.prompt,
                userId: session?.user.id,
                tag:post.tag
               })
            })

            if(response.ok)
            {
                router.push('/')
            }
        }
        catch(err)
        {
            console.log("error: ",err)
        }

    }

  return (
    <Form 
    type = "Create"
    post = {post}
    setPost = {setPost}
    submit = {submit}
    handleSubmit = {createPost}
    />
  )
}

export default CreatePost