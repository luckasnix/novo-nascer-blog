import PostList from '../../components/post-list'
import { PostItemProps } from '../../components/post-item'
import styles from './current-posts.module.scss'

export interface CurrentPostsProps {
  title: string
  posts: PostItemProps[]
}

export default function CurrentPosts({ title, posts }: CurrentPostsProps) {
  return (
    <div className={styles.currentPosts}>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <h1>{title}</h1>
        </div>
        <div className={styles.body}>
          {posts.length ? (
            <PostList posts={posts}/>
          ) : (
            <strong>Não há postagens</strong>
          )}
        </div>
      </div>
    </div>
  )
}
