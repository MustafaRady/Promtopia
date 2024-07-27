"use client"
import { useState,useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList=({data,handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText,setSearchText] = useState('');
  
  const handleSearchChange=(e)=>{
    e.preventDefault();
  }
  
  const [posts,setPosts] = useState([]);
  
  useEffect(()=>{ 
    const fetchPost=async()=>{
      try{
        const response=await fetch('/api/prompt');
        const data=await response.json();
        setPosts(data);
      }catch(e){
        console.log(e);
      }
    }
    fetchPost();
  },[])

  return (
    <section className='feed'>
      <form 
       className='relative w-full flex-center' >
        <input type="text"
          value={searchText}
          placeholder='Search for a tag or a username' 
          onChange={handleSearchChange}
          required
          className='search_input peer'  
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed