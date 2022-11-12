import "./header.css";
import Typed from 'react-typed';

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">    
        <Typed
         strings={['Here you can add your notes.', 'Edit and delete your notes',
         'Also keep track of your understanding about the notes','Sign Up to get started']}
        typeSpeed={40}
        backSpeed={50}
                />
        </span>
      </div>
      <div
        className="headerImg"
      ></div>
    </div>
  );
}