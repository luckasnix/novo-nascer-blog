import AuthorList from '../../components/author-list'
import { AuthorItemProps } from '../../components/author-item'
import styles from './current-authors.module.scss'

export interface CurrentAuthorsProps {
  title: string
  authors: AuthorItemProps[]
}

export default function CurrentAuthors({ title, authors }: CurrentAuthorsProps) {
  return (
    <div className={styles.currentAuthors}>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <h1>{title}</h1>
        </div>
        <div className={styles.body}>
          {authors.length ? (
            <AuthorList authors={authors}/>
          ) : (
            <strong>Não há autores</strong>
          )}
        </div>
      </div>
    </div>
  )
}
