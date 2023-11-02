import React, { useEffect, useState } from "react";
import AuthorDetail from "../components/AuthorDetail";
import styles from "./BlogDetail.module.css";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import ContentItem from "../components/ContentItem"

const normaliztionDate = date =>{
    const dateObject = new Date(date);
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate;
}

function BlogDetail() {
    const {blogId} = useParams();
    const [blog, setBlog] = useState();

    useEffect(() =>{
        axios.get(`http://localhost:8080/api/v1/blogs/${blogId}`).then(response =>{
          setBlog(response.data);
        }).catch(error =>{
            console.log(error);
        })
      },[blogId])
    return(
    <div className={styles.container}>
        <div className={styles.container__content}>
            <AuthorDetail/>
            <div className={styles.container__blog}>
                <div className={styles.container__blog__detail}>
                    <div className={styles.img__title}>
                        <img src={blog?.linkImg} alt="Anh bia"/>
                    </div>
                    <div className={styles.title}>
                        <h1>{blog ?blog.title : ""}</h1>
                        <div className={styles.title__date}>
                            <p>{blog ? normaliztionDate(blog.created) : ""}</p>
                            <p>|</p>
                            <p>{blog ? blog.category.type : ""}</p>
                        </div>
                        <div className={styles.dividing__line}></div>
                        <div className={styles.title__content}>
                            <p>{blog ? blog.category.des : ""}</p>
                        </div>
                    </div>
                    {blog ? blog.contents.map((content,index) =>{
                        return <ContentItem key={index} content={content}/>
                    }) : ""}
                </div>
                
                <Link to="/home"><button className={styles.btn}>{`<-- All posts`}</button></Link>
            </div>
        </div>
    </div>
    )
}

export default BlogDetail;