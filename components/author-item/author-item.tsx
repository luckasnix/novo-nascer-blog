import Link from 'next/link'
import { urlFor } from '../../utils/sanity'
import styles from './author-item.module.scss'

export interface AuthorItemProps {
  slug?: string
  profilePicture?: {
    _type: string
    asset: {
      _type: string
      _ref: string
    }
  }
  name?: string
  bio?: string
}

export default function AuthorItem({ slug, profilePicture, name, bio }: AuthorItemProps) {
  return (
    <Link href='/autor/[slug]' as={`/autor/${slug}`}>
      <li className={styles.authorItem}>
        <div className={styles.picture}>
          <img src={urlFor(profilePicture).width(128).url()} alt={`Foto do(a) ${name}`} loading='lazy'/>
        </div>
        <div className={styles.info}>
          <h2>{name}</h2>
          <span>{bio}</span>
        </div>
      </li>
    </Link>
  )
}
