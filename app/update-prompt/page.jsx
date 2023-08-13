"use client";

import Form from "@components/Form";
import { useRouter,useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPrompt = () => {
  const router = useRouter();
  const seachParams = useSearchParams();
  const promptId = seachParams.get('id');  
  const [submitting, setSubmiting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
  const  getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json();
      setPost({
        prompt:data.prompt,
        tag:data.tag
      })
    }
    if(promptId) getPromptDetails();
    
  },[promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmiting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
    }
  };


  return (
    <Form
     type="Edit"
     post = {post} 
     setPost = {setPost} 
     submitting = {submitting}
     handleSubmit = {updatePrompt}    
    />
  );
};

export default EditPrompt;
