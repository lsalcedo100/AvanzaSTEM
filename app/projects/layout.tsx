import type { Metadata } from 'next'
import { generateProjectsIndexMetadata } from '@/features/projects/metadata'

export function generateMetadata(): Metadata {
  return generateProjectsIndexMetadata('en')
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
