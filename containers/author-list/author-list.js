import AuthorItem from '../../components/author-item'
import styles from './author-list.module.scss'

export default function AuthorList({ authors }) {
  return (
    <div className={styles.authorList}>
      <div className={styles.wrapper}>
        <h1>Nosso autores</h1>
        <ul>
          {authors.map(author => (
            <AuthorItem key={author.slug} {...author}/>
          ))}
        </ul>
      </div>
    </div>
  )
}
