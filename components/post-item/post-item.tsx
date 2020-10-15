import Link from 'next/link'
import Date from '../date'
import { AuthorItemProps } from '../author-item'
import { urlFor } from '../../utils/sanity'
import styles from './post-item.module.scss'

export interface PostItemProps {
  variant?: 'item' | 'card'
  slug?: string
  title?: string
  description?: string
  date?: string
  coverImage?: {
    _type: string
    asset: {
      _type: string
      _ref: string
    }
    description: string
  }
  content?: any
  author?: AuthorItemProps
}

export default function PostItem({ variant = 'item', slug, title, description, date, coverImage }: PostItemProps) {
  return (
    <Link href='/postagem/[slug]' as={`/postagem/${slug}`}>
      <li className={[styles.postItem, styles[variant]].join(' ')}>
        <div className={styles.thumbnail}>
          <img src={urlFor(coverImage).width(360).url()} alt={coverImage.description} loading='lazy'/>
        </div>
        <div className={styles.content}>
          <Date date={date}/>
          <h2>{title}</h2>
          <p>{description}</p>        
        </div>
      </li>
    </Link>
  )
}
