import BlogItem from "../components/BlogItem";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import axios from 'axios'
import AuthorDetail from "../components/AuthorDetail";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [blogNumber, setBlogNumber] = useState(5);

  useEffect(() =>{
    axios.get("http://localhost:8080/api/v1/blogs/blogsApprove").then(response =>{
      setBlogs(response.data)
    })
  },[])

  const handelOnClick = () =>{
    setBlogNumber(blogNumber + 3);
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__content}>
        <AuthorDetail/>
        <div className={styles.container__blogs}>
            <div className={styles.container__blogs__items}>
              {blogNumber <= blogs.length ? (() =>{
                  let arr = [];
                  for(let i = 0; i< blogNumber; i++){
                    arr.push(<BlogItem key={blogs[i].id} blog={blogs[i]} page={"Home"}/>);
                  }
                  return arr;
              })() : (() =>{
                let arr = [];
                  for(let i=0; i<blogs.length; i++){
                    arr.push(<BlogItem key={blogs[i].id} blog={blogs[i]} page={"Home"}/>)
                  }
                  return arr;
              })()}
            </div>
            <button onClick={handelOnClick} className={blogNumber > blogs.length ? `${styles.hidden}` : `${styles.btn}`}>{`More posts ->`}</button>
          </div>

      </div>
    </div>
  );
}

export default Home;
