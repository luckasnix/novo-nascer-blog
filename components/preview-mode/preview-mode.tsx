import styles from './preview-mode.module.scss'

export interface PreviewModeProps {
  onClick: () => void
}

export default function PreviewMode({ onClick }: PreviewModeProps) {
  return (
    <div className={styles.previewMode}>
      <p>Você está no modo de pré-visualização</p>
      <button onClick={onClick}>Sair</button>
    </div>
  )
}
