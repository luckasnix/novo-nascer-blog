import AuthorItem, { AuthorItemProps } from '../author-item'
import styles from './author-list.module.scss'

export interface AuthorListProps {
  authors: AuthorItemProps[]
}

export default function AuthorList({
  authors
}: AuthorListProps) {
  return (
    <ul className={styles.authorList}>
      {authors.map(author => (
        <AuthorItem key={author.slug} {...author}/>
      ))}
    </ul>
  )
}
