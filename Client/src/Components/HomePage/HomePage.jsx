import React from 'react'
import blogs from './LoremPosts'
import img1 from "../../Images/blank-profile.png"
import "./HomePage.css"


const HomePage = () => {
    return (
        <> 
          <div id="home"> 
          
            {blogs.map((content,index) => (
                <div key={`blog-${index}`} className="blog-box">
                    <p className='head'><img className="profile" src={img1} alt="error 404"/> {content.Username} posted:</p>  
                    <p className="date">{content.date}</p>
                    <h4 className='title'>{content.title}</h4>
                    <p className="content">{content.content}</p>
                </div>
            ))}
            </div>
        </>    
    )
  }

export default HomePage