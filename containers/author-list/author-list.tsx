import AuthorItem, { AuthorItemProps } from '../../components/author-item'
import styles from './author-list.module.scss'

export interface AuthorListProps {
  authors: AuthorItemProps[]
}

export default function AuthorList({ authors }: AuthorListProps) {
  return (
    <div className={styles.authorList}>
      <div className={styles.wrapper}>
        <ul>
          {authors.map(author => (
            <AuthorItem key={author.slug} {...author}/>
          ))}
        </ul>
      </div>
    </div>
  )
}
