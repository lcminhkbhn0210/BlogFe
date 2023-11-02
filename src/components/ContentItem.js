import styles from "./ContentItem.module.css"

function ContentItem (props){
    return(
        <div className={styles.content_container}>
            <div className={styles.content__header}>
                <h3>{props.content.header}</h3>
            </div>
            <br/>
            <div className={styles.content__body}>
                <p>{props.content.body}</p>
            </div>
            <br/>
            <div className={styles.content__footer}>
                <div className={styles.dotted}></div>
                <p>{props.content.footer}</p>
            </div>
        </div>
    )
}

export default ContentItem;