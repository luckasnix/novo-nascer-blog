import PostList from '../../components/post-list'
import styles from './current-posts.module.scss'

export default function CurrentPosts({ posts }) {
  return (
    <div className={styles.currentPosts}>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <h1>Nossas postagens</h1>
        </div>
        <div className={styles.body}>
          <PostList posts={posts}/>
        </div>
      </div>
    </div>
  )
}
