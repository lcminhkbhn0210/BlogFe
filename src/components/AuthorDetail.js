import styles from "./AuthorDetail.module.css";

function AuthorDetail() {
  return (
    <div className={styles.container__author}>
      <div className={styles.container__author__about}>
        <img src="http://localhost:3000/blog_img.jpg" alt="" />
        <p>
          Minh is a simple responsive blog template. Easily add new posts using
          the Editor or change layout and design using the designer
        </p>
      </div>

      <div className={styles.dividing__line}></div>

      <div className={styles.container__author__feature}>
        <h4 className={styles.container__author__feature__title}>
          Featured Posts:
        </h4>
        <p>According a funnily until pre-set or arrgant well cheerful</p>
        <p>Overlaid the jeepers use lessly much excluding</p>
      </div>

      <div className={styles.dividing__line}></div>

      <div className={styles.container__author__social}>
        <div className={styles.container__author__social__icons}>
          <i className="ti-facebook"></i>
          <i className="ti-instagram"></i>
          <i className="ti-twitter-alt"></i>
          <i className="ti-linkedin"></i>
        </div>
        <div>
          <p>Built With Me</p>
        </div>
      </div>
    </div>
  );
}

export default AuthorDetail;
