export default function ExternalLink({ className, children, href }) {
  return (
    <a className={className} href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  )
}
