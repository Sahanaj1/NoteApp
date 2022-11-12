import Post from "../post/Post"
import "./posts.css";

export default function Posts({posts}) {
  console.log(posts)
  return (
    <div className="posts">
      {posts.map(p=>(
        // console.log(p,"p")
       <Post post={p}/>
      ))}
    </div>
    // <Post post={"hello"} />
  );
}