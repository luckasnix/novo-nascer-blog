import Link from 'next/link'
import { urlFor } from '../../utils/sanity'
import styles from './author-box.module.scss'

export default function AuthorBox({ slug, profilePicture, name }) {
  return (
    <Link href='/autor/[slug]' as={`/autor/${slug}`}>
      <div className={styles.authorBox}>
        <img src={urlFor(profilePicture).width(64).url()} alt={`Foto do(a) ${name}`} loading='lazy'/>
        <h4>{name}</h4>
      </div>
    </Link>
  )
}
