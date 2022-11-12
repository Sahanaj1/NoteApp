import { useLocation } from "react-router-dom";
import { useState,useEffect,useContext } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
import axios from "../../axios";
import { Context } from "../../context/Context";
export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const { user, dispatch } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
      // console.log(res.data,"res for posts")
    };
    fetchPosts();
  }, [search]);
console.log(user,"user logged in")
var newPosts=[];
posts.map(item=>{
if(item?.username==user?.username){
  newPosts.push(item);
}else{
  return ;
}});
console.log(newPosts,"newposts")
  return (
    <>
      <Header />
      {user ? <div className="home">
        <Posts posts={newPosts}/>
      </div> : ""}
      
    </>
  );
}

