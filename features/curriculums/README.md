# Curriculums

Course content for the six AvanzaSTEM courses. The content lives here as typed
TypeScript data rather than in a database: the pages under `app/` import these
objects directly and Next renders them statically.

## Layout

Files at the root are the cross-course registry. Everything else is one
directory per course.

```
catalog.ts          the course list that drives the curriculums hub
metadata.ts         per-page Next.js Metadata builders
structured-data.ts  schema.org JSON-LD for courses and breadcrumbs
i18n-coverage.ts    translation coverage report (see below)
components/         JSX shared across course pages

<course>/
  index.ts          the English curriculum: the structural source of truth
  i18n.ts           sparse locale overlays + the resolver for this course
  *.test.ts         tests, colocated with what they cover
```

Two courses have enough moving parts to warrant more structure:

```
intro-to-ai/
  types.ts  progress.ts  quiz.ts  skills.ts  mission.ts  final-project.ts
  weeks/        week-1.ts ... week-6.ts
  activities/   the interactive widgets for weeks 1-5

robotics/
  program.ts  progress.ts  missions.ts  quiz.ts  sim.ts
```

Because each course directory has an `index.ts`, the import path is the course
name: `@/features/curriculums/robotics` resolves to `robotics/index.ts`.

## Conventions

- **Relative imports with explicit `.ts` extensions** inside this tree. The test
  suite and `i18n-coverage.ts` run under plain `node`, which resolves neither
  the `@/` alias nor extensionless paths. Pages under `app/` still use `@/`.
- **Tests sit next to the file they cover** and end in `.test.ts`.
- **English is the structural source of truth.** Adding a week, renaming a slug,
  or changing an answer key happens in `index.ts` only.

## Translations

Non-English content uses sparse overlays rather than full copies. Each
`i18n.ts` supplies only the strings that locale has translated, deep-merged onto
English by `lib/localize-content`. Anything untranslated falls through to
English, so a course can be translated a week at a time.

The merge keeps English's structure exactly: array lengths, object keys, and
identifiers (`slug`, `href`, `id`, `order`, ...) are shared by construction, so
locales cannot structurally drift. `overlay-integrity.test.ts` enforces that for
every course and language.

Check the current state with:

```bash
npm run i18n:coverage          # percentages per course and language
npm run i18n:coverage -- --gaps  # plus the untranslated strings
```

The report skips values that are the same in every language (numbers,
measurements, code, and reserved words like `elif`). It still lists ordinary
words that happen to match English, such as a Spanish "variable", so a human
confirms those rather than the tool hiding them.

As of the last run, `science-experiments` and `intro-to-python` are fully
translated into es/zh/pt. The other four courses have working resolvers but
empty overlays, so they render in English everywhere.

## Tests

```bash
npm test    # every *.test.ts under features/ and components/
```
