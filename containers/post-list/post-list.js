import PostItem from '../../components/post-item'
import styles from './post-list.module.scss'

export default function PostList({ posts }) {
  return (
    <div className={styles.postList}>
      <div className={styles.wrapper}>
        <h1>Nossas postagens</h1>
        <ul className={styles.list}>
          {posts.map((post) => (
            <PostItem key={post.slug} {...post}/>
          ))}
        </ul>
      </div>
    </div>
  )
}
