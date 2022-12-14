import { useContext, useState } from "react";
import "./write.css";
import axios from "../../axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
    <form className="writeForm" onSubmit={handleSubmit}>
      <div className="writeFormGroup2">
        <input
          type="text"
          placeholder="Title"
          className="writeInput"
          autoFocus={true}
          onChange={e=>setTitle(e.target.value)}
        />
      </div>
      <div className="writeFormGroup3">
        <textarea
          placeholder="Tell your story..."
          type="text"
          className="writeInput writeText"
          onChange={e=>setDesc(e.target.value)}
        ></textarea>
      </div>
      <button className="writeSubmit glow-button" type="submit">
        Add
      </button>
    </form>
  </div>
  );
}