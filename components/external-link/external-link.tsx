import { ReactNode } from 'react'

export interface ExternalLinkProps {
  href: string
  children: ReactNode
}

export default function ExternalLink({
  href,
  children
}: ExternalLinkProps) {
  return (
    <a href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  )
}
