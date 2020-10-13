import { ReactNode } from 'react'

export interface ExternalLinkProps {
  className: string
  href: string
  children: ReactNode
}

export default function ExternalLink({ className, href, children }: ExternalLinkProps) {
  return (
    <a className={className} href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  )
}
