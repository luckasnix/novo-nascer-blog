import Link from 'next/link'
import { urlFor } from '../../utils/sanity'
import styles from './author-box.module.scss'

export interface AuthorBoxProps {
  slug: string
  profilePicture: {
    _type: string
    asset: {
      _type: string
      _ref: string
    }
  }
  name: string
}

export default function AuthorBox({ slug, profilePicture, name }: AuthorBoxProps) {
  return (
    <Link href='/autor/[slug]' as={`/autor/${slug}`}>
      <div className={styles.authorBox}>
        <img src={urlFor(profilePicture).width(64).url()} alt={`Foto do(a) ${name}`} loading='lazy'/>
        <h4>{name}</h4>
      </div>
    </Link>
  )
}
