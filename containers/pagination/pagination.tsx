import Link from 'next/link'
import styles from './pagination.module.scss'

export interface PaginationProps {
  numOfPages: number
  curPage: string | string[]
  basePath: string
}

export default function Pagination({ numOfPages, curPage, basePath }: PaginationProps) {
  if (curPage instanceof Array) {
    curPage = curPage[0]
  }
  const prevPage = +curPage - 1
  const nextPage = +curPage + 1
  return (
    <div className={styles.pagination}>
      <div className={styles.wrapper}>
        {(!!prevPage && prevPage > 0) && (
          <Link href={`${basePath}/[page]`} as={`${basePath}/${prevPage}`}>
            <a className={[styles.link, styles.prevPage].join(' ')}>&larr; Anterior</a>
          </Link>
        )}
        <span className={styles.curPage}>{curPage}</span>
        {(!!nextPage && nextPage <= numOfPages) && (
          <Link href={`${basePath}/[page]`} as={`${basePath}/${nextPage}`}>
            <a className={[styles.link, styles.nextPage].join(' ')}>Próxima &rarr;</a>
          </Link>
        )}
      </div>
    </div>
  )
}
