import Link from 'next/link'
import styles from './icon-button.module.scss'

export default function IconButton({ title, href, icon: Icon }) {
  return (
    <Link href={href}>
      <a className={styles.iconButton}>
        <Icon/>
        <button>{title}</button>
      </a>
    </Link>
  )
}