
"use client";
import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import ProfileComp from "@components/ProfileComp";




const MyProfile = () => {
  const {data:session} = useSession();
  const [posts , setPosts] = useState([]);
  const router = useRouter();
  
  useEffect(() => {
    const fetchPosts = async () => {
      const reponse = await fetch(`/api/users/${session?.user.id}/posts`)
      const data  =  await reponse.json();
      setPosts(data);
    }
    if(session?.user.id) fetchPosts();
  },[session?.user.id])



  const handleDelete = async(post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt ?")
    if(hasConfirmed)
    try {
      await fetch(`/api/prompt/${post._id.toString()}`,{
        method:'DELETE'
      });
      const filteredPosts = posts.filter((p)=>p._id !== post._id);
      setPosts(filteredPosts);
    }
     catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (post) => {
  router.push(`/update-prompt?id=${post._id}`)

  }
  return (
    <div>
      <ProfileComp
      name = "My"
      desc = "Welcome to your personalized profile page"
      data = {posts}
      handleEdit = {handleEdit}
      handleDelete = {handleDelete}
      />
      
    </div>
  );
}

export default MyProfile;
