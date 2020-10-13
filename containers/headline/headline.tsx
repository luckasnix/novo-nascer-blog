import styles from './headline.module.scss'

export interface HeadlineProps {
  title: string
}

export default function Headline({ title }: HeadlineProps) {
  return (
    <div className={styles.headline}>
      <div className={styles.wrapper}>
        <h1>{title}</h1>
      </div>
    </div>
  )
}
