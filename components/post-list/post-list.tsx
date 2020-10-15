import PostItem, { PostItemProps } from '../post-item'
import styles from './post-list.module.scss'

export interface PostListProps {
  mode?: 'list' | 'grid'
  posts: PostItemProps[]
}

export default function PostList({ mode = 'list', posts }: PostListProps) {
  return (
    <ul className={[styles.postList, styles[mode]].join(' ')}>
      {posts.map((post, idx) => (
        <PostItem
          key={post.slug}
          variant={mode === 'grid' && idx > 0 ? 'card' : undefined}
          {...post}
        />
      ))}
    </ul>
  )
}
