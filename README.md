# 🗳️ Bangkok Election 2022

Monorepo for Bangkok Election 2022 projects managed by [Turborepo](https://turborepo.org/) and [Yarn](https://classic.yarnpkg.com/lang/en/)

## 🍱 Project structure

- **`/apps`** Framework independent subprojects
  - `/landing` Landing page ([SvelteKit](https://kit.svelte.dev/))
  - `/socialtrend` Social trend analysis ([NuxtJS](https://nuxtjs.org/))
  - `/candidate` Candidates information ([NextJS](https://nextjs.org/))
- **`/moderator`**
  - Development server using [Express](https://expressjs.com/) with reverse proxy and `/static` folder serving.
  - Build script to combine every apps build file in the root `/build`
- **`/packages`** Shared packages used by apps
  - `/tailwind` Tailwind config and base stylesheet with shared design guideline
- **`/static`** Static directory serving at `/static` eg. favicon and fonts

## ⚙️ Setup

[Yarn 1](https://classic.yarnpkg.com/lang/en/) is required

Install the dependencies

```
yarn
```

### Develop

To develop all apps and packages, run the following command:

```
yarn run dev
```

Each app will be started in development server in difference port

- **Landing**: http://localhost:3001
- **Social trend**: http://localhost:3002/socialtrend
- **Candidate**: http://localhost:3003/candidate

While **moderator** will run at http://localhost:3000 and

- Forward http://localhost:3000 request to **Landing** dev server
- Forward http://localhost:3000/socialtrend request to **Social trend** dev server
- Forward http://localhost:3000/candidate request to **Candidate** dev server
- Serve files in `/static` at http://localhost:3000/static/

Each project can also be run individually with moderator proxy

```
yarn run dev:candidate
yarn run dev:landing
yarn run dev:socialtrend
```

### Build

To build all apps and packages, run the following command:

```
yarn run build
```

Each project will be built and combined in root `/build` folder

## ⚽ Working style

- We use Trunk-based development.
  - No braches, we all push to main branch.
  - Pull rebase `git pull --rebase` often. Before you start coding and pushing.
  - Continuous integration: try not to leave your code without pushing overnight.
- **[TODO]** Each time the code is pushed to main branch, Github Action will build and deploy to the staging environment.
