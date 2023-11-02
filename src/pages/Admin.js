import AuthorDetail from "../components/AuthorDetail";
import styles from "./Admin.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "../components/BlogItem";
import { Link } from "react-router-dom";

function Admin() {
  const [blogs, setBlogs] = useState([]);
  const [blogsTemp, setBlogsTemp] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handelOnChangeSearchInput = (e) => {
    const blogArr = blogs.filter(
      (el) =>
        el.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        el.category.des.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (blogArr.length !== 0) {
      setBlogsTemp(blogArr);
    } else {
      setBlogsTemp(blogs);
    }
    setInputValue(e.target.value);
  };

  const handelOnClickDelete = (blogId) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa không?");
    if (confirmed) {
      axios
        .delete(`http://localhost:8080/api/v1/blogs/${blogId}`)
        .then((response) => {
          if (response.data === "Xoa Thanh Cong") {
            setBlogs(blogs.filter((el) => el.id !== blogId));
          } else {
            console.log(response.data);
          }
        });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/blogs").then((response) => {
      setBlogs(response.data);
      setBlogsTemp(response.data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <AuthorDetail />
      <div className={styles.container__admin}>
        <div className={styles.container__admin__search}>
          <Link to="/newblog">
            <button className={styles.btn}>Add Blog</button>
          </Link>
          <div className={styles.search}>
            <input
              onChange={handelOnChangeSearchInput}
              type="text"
              name="search"
              value={inputValue}
            />
            <button className={styles.btn__search}>
              {" "}
              <i className="ti-search"></i>
            </button>
          </div>
        </div>
        <div className={styles.container__blogs__items}>
          {blogsTemp.map((blog) => {
            return (
              <BlogItem
                key={blog.id}
                blog={blog}
                page={"Admin"}
                handelOnClickDelete={handelOnClickDelete}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Admin;
