import Link from 'next/link'
import styles from './icon-button.module.scss'

export default function IconButton({ title, link, icon: Icon }) {
  return (
    <Link href={link.href} as={link.as}>
      <a className={styles.iconButton}>
        <Icon/>
        <button>{title}</button>
      </a>
    </Link>
  )
}
