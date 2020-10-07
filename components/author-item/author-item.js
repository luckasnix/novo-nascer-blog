import Link from 'next/link'
import { urlFor } from '../../utils/sanity'
import styles from './author-item.module.scss'

export default function AuthorItem({ slug, profilePicture, name, occupation }) {
  return (
    <Link href='/autores/[slug]' as={`/autores/${slug}`}>
      <li className={styles.authorItem}>
        <div className={styles.picture}>
          <img src={urlFor(profilePicture).width(128).url()} alt={`Foto do(a) ${name}`} loading='lazy'/>
        </div>
        <div className={styles.info}>
          <h2>{name}</h2>
          <span>{occupation}</span>
        </div>
      </li>
    </Link>
  )
}
