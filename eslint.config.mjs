import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      'react-hooks/immutability': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      // next/link prefetches every link in the viewport and next/image proxies
      // Cloudinary photos through Vercel; both multiplied CDN requests per page
      // view. The wrappers in components/ui keep that in check.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'next/link',
              importNames: ['default'],
              message: 'Import Link from "@/components/ui/link" (no viewport prefetching).',
            },
            {
              name: 'next/image',
              importNames: ['default'],
              message: 'Import Image from "@/components/ui/image" (Cloudinary photos bypass /_next/image).',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['components/ui/link.tsx', 'components/ui/image.tsx'],
    rules: { 'no-restricted-imports': 'off' },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
