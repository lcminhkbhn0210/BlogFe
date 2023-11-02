import styles from "./NewBlog.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function NewBlog() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [contentNumber, setContentNumber] = useState(1);
    const [contentFields, setContentFields] = useState([
        { header: '', body: '', footer: '' } 
      ]);
    const [formData, setFormData] = useState({
        des: "",
        title:"",
        linkImg: "",
        created: "",
        language: "",
        authorId: 1,
        categoryId: 1,
        contents: contentFields
    })

    const handelChange = e =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSelectedChange = (event) => {
        let id = 1;
        for(let i = 0; i<categories.length; i++){
            if(categories[i]?.type === event.target.value){
                id = categories[i]?.id;
            }
        }
        setFormData({
            ...formData,
            categoryId: id
        })
        setSelectedOption(event.target.value);
    }

    const handelOnClickAddContent = (e) =>{
        e.preventDefault();
        let number = contentNumber + 1;
        contentFields.push({ header: '', body: '', footer: '' });
        setContentFields(contentFields);
        setContentNumber(number);
    }

    const handelSubmitOnClick = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8080/api/v1/blogs", formData).then(response =>{
            setFormData({
                des: "",
                title:"",
                linkImg: "",
                created: "",
                language: "",
                authorId: 1,
                categoryId: 1,
                contents: [{ header: '', body: '', footer: '' }]
            })
            setContentFields([{ header: '', body: '', footer: '' }])
            setContentNumber(1);
            const confirmed = window.confirm("Thêm thành công.Bạn có muốn tiếp tục thêm blog không?");
            if(!confirmed){
                navigate("/admin");
            }
        }).catch(error =>{
            console.log(error);
        })
    }

    const handelContentChange = (type, index, content) =>{
        let contentObject = contentFields[index];
        contentObject = {
            ...contentObject,
            [type]: content
        } 
        contentFields.splice(index,1,contentObject);
        setContentFields(contentFields);
        setFormData({
            ...formData,
            contents: contentFields
        })
    }

    useEffect(() =>{
        axios.get("http://localhost:8080/api/v1/categories").then(response =>{
            const optionMap = [];
            response.data.forEach(el => {
                optionMap.push(el.type);
            })
            setCategories(response.data);
            setOptions(optionMap);
            setSelectedOption(optionMap[0]);
        })
    },[])
    return(
        <div className={styles.container}>
            <div className={styles.form__data}>
                <form onSubmit={handelSubmitOnClick} className={styles.form}>
                    <div className={styles.form__item}>
                        <label>Description</label>
                        <input 
                            onChange={handelChange} 
                            type="text" 
                            placeholder="Enter description" 
                            name="des" 
                            required
                            value={formData.des}/>
                    </div>

                    <div className={styles.form__item}>
                        <label>Title</label>
                        <input 
                            onChange={handelChange} 
                            type="text" 
                            placeholder="Enter title" 
                            name="title"
                            required 
                            value={formData.title}/>
                    </div>

                    <div className={styles.form__item}>
                        <label>Link Img</label>
                        <input 
                            onChange={handelChange} 
                            type="text" 
                            placeholder="Enter link Img" 
                            name="linkImg" 
                            required
                            value={formData.linkImg}/>
                    </div>

                    <div className={styles.form__item}>
                        <label>Language</label>
                        <input 
                            onChange={handelChange} 
                            type="text" 
                            placeholder="Enter the language" 
                            name="language"
                            required 
                            value={formData.language}/>
                    </div>

                    <div className={styles.form__item}>
                        <label>Category</label>
                        <select value={selectedOption} onChange={handleSelectedChange}>
                            {options.map(el => <option key={el} value={el}>{el}</option>)}
                        </select>
                    </div>
                    <div className={styles.form__item}>
                    {(() =>{
                        const contentArr = [];
                        for(let i = 0; i<contentNumber; i++){
                            contentArr.push(<React.Fragment key={`content${i+1}`}>
                                <label>Content {i+1}</label>
                                <textarea
                                value={contentFields[i].header}
                                required
                                onChange={(e) => handelContentChange("header", i, e.target.value)}
                                id={`header content${i+1}`} 
                                name={`header content${i+1}`}  
                                rows="2" cols="20" 
                                placeholder="Enter your header content"
                                >
                                </textarea>
                                <textarea
                                value={contentFields[i].body}
                                required
                                onChange={(e) => handelContentChange("body", i, e.target.value)}
                                id={`body content${i+1}`} 
                                name={`body content${i+1}`}  
                                rows="6" cols="40" 
                                placeholder="Enter your body content"
                                ></textarea>
                                <textarea
                                value={contentFields[i].footer}
                                required
                                onChange={(e) => handelContentChange("footer", i, e.target.value)}
                                id={`footer content${i+1}`} 
                                name={`footer content${i+1}`}  
                                rows="2" cols="20" 
                                placeholder="Enter footer content"
                                ></textarea>
                            </React.Fragment>)
                        }
                        return contentArr;
                    })()}
                    <button type="button" onClick={handelOnClickAddContent}  className={styles.btn}>Add new content</button>
                    </div>
                    <div className={styles.form__item}>
                        <button type="submit"  className={styles.btn}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewBlog;