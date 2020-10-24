import Link from 'next/link'
import IconButton from '../../components/icon-button'
import Post from '../../icons/post'
import Author from '../../icons/author'
import Event from '../../icons/event'
import styles from './header.module.scss'

export interface Route {
  title: string
  link: {
    href: string
    as: string
  }
  icon: () => JSX.Element
}

const routes: Route[] = [
  {
    title: 'Postagens',
    link: {
      href: '/postagens/[page]',
      as: '/postagens/1'
    },
    icon: Post
  },
  {
    title: 'Autores',
    link: {
      href: '/autores/[page]',
      as: '/autores/1'
    },
    icon: Author
  },
  {
    title: 'Eventos',
    link: {
      href: '/eventos/[page]',
      as: '/eventos/1'
    },
    icon: Event
  }
]

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.brand}>
          <Link href='/'>
            <img src='/logo-white.webp' alt='Logo da Clínica Hospitalar Novo Nascer' loading='lazy'/>
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
