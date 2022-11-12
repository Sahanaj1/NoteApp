import { Link } from "react-router-dom";
import "./post.css";
import Progress from "../progress/Progress"
export default function Post({post}) {
  console.log(post,"post")
  return (
    <div className="post">
      <div className="postInfo">
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post?.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post?.createdAt).toDateString()}
        </span>
        <span className="postDesc">
          <Progress done={post.percentage}/>
        </span>
      </div>
      <p className="postDesc">{post?.desc}</p>
    </div>
  );
}