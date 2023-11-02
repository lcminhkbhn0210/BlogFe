import AuthorDetail from "../components/AuthorDetail";
import styles from "./About.module.css";
import {useState, useEffect} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

function About() {

    const [author, setAuthor] = useState();
    const authorId = 1;

    useEffect(() =>{
        axios.get(`http://localhost:8080/api/v1/authors/${authorId}`).then(response =>{
            setAuthor(response.data);
        })
    },[])
    
    return(
        <div className={styles.container}>
            <AuthorDetail/>
            <div className={styles.container__about}>
                <div className={styles.container__about__infor}>
                    <h1>About me</h1>
                    <p>{author?.des}</p>
                </div>

                <div className={styles.container__about__else}>
                    <h1>Something else here</h1>
                    <p>{author?.about}</p>
                    <br/>
                    <p>Qua đó, tôi mong rằng sẽ đóng góp một phần nhỏ vào việc mang lại sự tiếp thêm năng lượng tích cực và sự phát triển cho cộng đồng của chúng ta.</p>
                </div>
                <button className={styles.btn}><Link to="/contact">Get in touch</Link></button>
            </div>
        </div>
    )
}
export default About;