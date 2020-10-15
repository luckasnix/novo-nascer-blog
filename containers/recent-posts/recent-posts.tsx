import Link from 'next/link'
import PostList from '../../components/post-list'
import styles from './recent-posts.module.scss'

export default function RecentPosts({ posts }) {
  return (
    <div className={styles.recentPosts}>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <h2>Postagens mais recentes</h2>
          <h3>Importantes conteúdos sobre saúde mental</h3>
        </div>
        <div className={styles.body}>
          <PostList mode='grid' posts={posts}/>
          <Link href='/postagens/[page]' as='/postagens/1'>
            <a>&laquo; Ver mais postagens &raquo;</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
