import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./singlePost.css";
import { useState,useEffect,useContext } from "react";
import axios from "../../axios";
import { Context } from "../../context/Context";
import Highlighter from "react-highlight-words";
import Progress from "../progress/Progress";

export default function SinglePost() {
  const location =useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const { user } = useContext(Context);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setPercentage(res.data.percentage)
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
        percentage
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  // const[userr,setUser]=useState("")
  const[score,setScore]=useState(1)
  const[text,setText]=useState("")
  const[classname,setClassname]=useState("");
  const[arr,setArr]=useState([]);
  const[percentage,setPercentage]=useState(0);
  
  const handleMouseUp=() =>{
    setText(`Selected text: ${window.getSelection().toString()}`);
    // console.log(text)
}
useEffect(() => {
  setArr([...arr,{
    text,
    score:score
  }])
  console.log(arr)
}, [score])

function classnameFunc(userVal,val){
  if(userVal=="understood" && val==4){
    setClassname("understood");
    setScore(val);
    console.log("understood",val)
  }
  else if(userVal=="somewhat" && val==3){
    setClassname("somewhat");
    setScore(val);
    console.log("somewhat",val)
  }
  else if(userVal=="notClear" && val==2){
    setClassname("notClear");
    setScore(val);
    console.log("notClear",val)
  }
  else if(userVal=="rubbish" && val==1){
    setClassname("rubbish");
    setScore(val);
    console.log("rubbish",val)
  }
return classname;
}
var percent=0;
function CalculatePercent(arr){
   var res=arr.map(item=>(item.score))
   var sum=0;
   console.log(res,'res')
   for(var i=1;i<res.length;i++){
    sum=sum+res[i]
   }
   console.log(sum,"sum")
var totalBlocks=arr.length*4;
console.log(totalBlocks,"totalblck");
percent=(parseInt(sum)/parseInt(totalBlocks))*100;
alert(`Do you want to update your understanding to ${percent.toFixed(2)}?`);
setPercentage(percent.toFixed(2));
}
const percentUpdate= async () => {
  try {
    await axios.put(`/posts/${post._id}`, {
      username: user.username,
      percentage
    });
    setUpdateMode(false)
  } catch (err) {}
};
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <div className="singlePostDesc" >
            <div onMouseUp={handleMouseUp}>{desc}</div>
                      <Highlighter
                          highlightClassName={`${classname}`}
                          searchWords={[text]}
                          autoEscape={true}
                          activeStyle={{"fontSize":"100px"}}
                          textToHighlight={text}
                         />
                         
                         <div>
                         <Progress done={post.percentage}/>
                          <div className="buttons">
     <button className="understoodButton understood-button"onClick={()=>classnameFunc("understood",4)}>understood</button>
     <button className="SomewhatButton somewhat-button"onClick={()=>classnameFunc("somewhat",3)} >somewhat understood</button>
      <button className="notClearButton not-button"onClick={()=>classnameFunc("notClear",2)} >not clear</button>
      <button className="rubbishButton rubbish-button" onClick={()=>classnameFunc("rubbish",1)}>what a rubbish</button>
     </div>
     </div>

     <div>
     {/* {post.percentage}% understood<br/> */}
     
<button className="button glow-button" onClick={()=>CalculatePercent(arr)}>Calculate Progress</button>
<button className="button glow-button" onClick={percentUpdate}>Update Progress</button>
     </div>
                          
                         </div>
                    )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}