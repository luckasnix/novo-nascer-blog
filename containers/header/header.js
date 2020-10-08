import Link from 'next/link'
import IconButton from '../../components/icon-button'
import Post from '../../icons/post'
import Author from '../../icons/author'
import Event from '../../icons/event'
import styles from './header.module.scss'

const routes = [
  { title: 'Postagens', href: '/postagens/1', icon: Post },
  { title: 'Autores', href: '/autores', icon: Author },
  { title: 'Eventos', href: '/eventos', icon: Event }
]

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.brand}>
          <Link href='/'>
            <img src='../images/logo-white.webp' alt='Logo da Clínica Hospitalar Novo Nascer' loading='lazy'/>
          </Link>
        </div>
        <nav className={styles.menu}>
          <ul>
            {routes.map(route => (
              <li key={route.title}>
                <IconButton {...route}/>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
