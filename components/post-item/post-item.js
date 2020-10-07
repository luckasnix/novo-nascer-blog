import Link from 'next/link'
import Date from '../date'
import { urlFor } from '../../utils/sanity'
import styles from './post-item.module.scss'

export default function PostItem({ slug, title, description, date, coverImage }) {
  return (
    <li className={styles.postItem}>
      <div className={styles.thumbnail}>
        <img src={urlFor(coverImage).width(360).url()} alt={coverImage.description} loading='lazy'/>
      </div>
      <div className={styles.content}>
        <Date date={date} size='sm'/>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link href='/postagem/[slug]' as={`/postagem/${slug}`}>
          <a>
            <button>Ler Completo</button>
          </a>
        </Link>
      </div>
    </li>
  )
}
