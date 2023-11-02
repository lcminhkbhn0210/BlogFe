import AuthorDetail from "../components/AuthorDetail";
import styles from "./Contact.module.css";
import { useState, useRef } from "react";

function Contact() {

    const [formData, setFormData] = useState({
        email: "",
        name:"",
        message:""
    });

    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const messageRef = useRef(null);
    const handelChange = e =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handelSubmitForm = e =>{
        e.preventDefault();
        emailRef.current.value = '';
        nameRef.current.value = '';
        messageRef.current.value = '';
        setFormData({
            email: "",
            name:"",
            message: ""
        })
    }
    return(
        <div className={styles.container}>
            <AuthorDetail/>
            <div className={styles.container__contact}>
                <div className={styles.container__contact__title}>
                    <h1>Get in touch</h1>
                    <p>Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu hợp tác, chúng tôi rất sẵn lòng lắng nghe. 
                        Xin vui lòng điền vào biểu mẫu liên hệ dưới đây và chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                    </p>
                    <br/>
                    <p>
                    Chúng ta luôn chào đón mọi ý kiến đóng góp từ bạn.
                    Hãy cho chúng tôi biết điều bạn nghĩ! Đừng ngần ngại, điền vào ô tin nhắn dưới đây và gửi cho chúng tôi. Chúng tôi mong được nói chuyện với bạn!
                    </p>
                </div>

                <div className={styles.container__contact__form}>
                    <form onSubmit={handelSubmitForm}>
                        <label >Name</label>
                        <br/><br/>
                        <input 
                            onChange={handelChange} 
                            name="name" 
                            type="text" 
                            id="name" 
                            placeholder="Enter your name" 
                            ref={nameRef}
                            required
                            />
                        <br/>

                        <label >Email</label>
                        <br/><br/>
                        <input 
                            onChange={handelChange} 
                            name="email" type="text" 
                            id="email" 
                            placeholder="Enter your email"
                            ref={emailRef} 
                            required
                            />
                        <br/>

                        <label >Message</label>
                        <br/><br/>
                        <textarea 
                            onChange={handelChange} 
                            id="message" 
                            name="message" 
                            rows="8" cols="50" 
                            placeholder="Enter your message" 
                            ref={messageRef}
                            required>

                            </textarea>
                        <br/>
                        <button type="submit" className={styles.btn}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;