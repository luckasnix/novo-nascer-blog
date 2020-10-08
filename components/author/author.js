import Link from 'next/link'
import { urlFor } from '../../utils/sanity'
import styles from './author.module.scss'

export default function Author({ slug, profilePicture, name, occupation }) {
  return (
    <Link href='/autor/[slug]' as={`/autor/${slug}`}>
      <div className={styles.author}>
        <div className={styles.picture}>
          <img src={urlFor(profilePicture).width(128).url()} alt={`Foto do(a) ${name}`} loading='lazy'/>
        </div>
        <div className={styles.info}>
          <h4>{name}</h4>
          <span>{occupation}</span>
        </div>
      </div>
    </Link>
  )
}
