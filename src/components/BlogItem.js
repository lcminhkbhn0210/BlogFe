import { Link } from 'react-router-dom';
import styles from './BlogItem.module.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const normaliztionDate = date =>{
    const dateObject = new Date(date);
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate;
}


function BlogItem(props) {

    const normalzizationText = string =>{
        let arr = string.split(" ");
        return arr.slice(0,26).join(" ");
    }
    const navigate = useNavigate();
    const handelOnclickReadmore = e =>{
        navigate(`blogdetail/${props.blog.id}`)
    }
    const [blog, setBlog] = useState(props.blog);

    const handelEditOnClick = e =>{
        navigate(`/editblog/${props.blog.id}`);
    }

    const handelApproveOnClick = e =>{
        !blog.approve ? blog.approve=true : blog.approve=false;
        axios.put(`http://localhost:8080/api/v1/blogs/${props.blog.id}`, {
            des: blog.des,
            title: blog.title,
            linkImg: blog.linkImg,
            created: blog.created,
            language: blog.language,
            approve: blog.approve,
            authorId: 1,
            categoryId:blog.category.id,
            contents:blog.contents
        }).then(response => {
            setBlog(response.data);
        })
        
    }

    const handelDeleteOnClick = () => {
        props.handelOnClickDelete(props.blog.id);
    }

    const handelBodyOnClick = (e) => {
        if(props.page === "Home"){
            navigate(`blogdetail/${props.blog.id}`)
        }
    }
    return(
        <div className={props.page === "Home" ? `${styles.blog__item} ${styles.pointer}` : `${styles.blog__item}`} onClick={handelBodyOnClick}>
            <div className={styles.blog__item__content}>
                <div className={styles.blog__item__img}>
                    <img src={blog.linkImg} alt="anh am nhac" />
                </div>
                <div className={styles.blog__item__infor} >
                    <div className={styles.infor__title}>
                        <h3>{blog.title}</h3>
                    </div>

                    <div className={styles.infor__date} >
                        <p>{normaliztionDate(blog.created)}</p>
                        <p>|</p>
                        <p>{blog.category.type ? blog.category.type : "MUSIC"}</p>
                    </div>

                    <div className={styles.infor__summary}>
                        <p>
                         {normalzizationText(props.blog.des) + "... "}
                         <button className={props.page === "Home" ? `${styles.btn}` : `${styles.hidden}`} onClick={handelOnclickReadmore}><Link>Read more...</Link></button>
                        </p>
                    </div>
                    <div className={props.page === "Home" ? `${styles.hidden}` : `${styles.btns}`}>
                        <button onClick={handelEditOnClick} className={styles.btn__edit}>Edit</button>
                        <button
                            onClick={handelApproveOnClick} 
                            className={blog.approve ? `${styles.btn__approve} ${styles.approve}` : `${styles.btn__approve}`}>
                            Approve
                        </button>
                        <button className={styles.btn__delete} onClick={handelDeleteOnClick}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogItem;