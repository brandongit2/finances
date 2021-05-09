# Personal finances manager

**Author**

- Brandon Tsang (brandononline2@gmail.com)

## Getting Started

Prerequisites:

- Node.js
- nvm (Node Version Manager)
  - Windows users: use nvm-windows, which is a completely different project (and not just a clone) of nvm for Windows.
- Yarn
- Docker
- Docker Compose

**Note**: All Windows commands below are written in PowerShell, not cmd.

First, make sure you're using the correct Node.js version:

Windows (if you're having issues with this command, see
[this link](https://github.com/brandongit2/finances/blob/main/docs/nvm-windows-notes.md)):

```powershell
nvm use $(Get-Content .nvmrc)
```

Linux/macOS:

```bash
nvm use
```

Then, make your own copy of `.env.template`:

Windows:

```powershell
copy .env.template .env.local
```

Linux/macOS:

```bash
cp .env.template .env.local
```

Populate `.env.local` with secrets given to you by lead dev or equivalent.

Next, install all Yarn packages:

Windows/Linux/macOS:

```bash
yarn
```

Finally, start the development containers:

Windows/Linux/macOS:

```bash
yarn dev:start
```

Open http://localhost:3000 in your browser to view the project! Changing source files will automatically update the
browser.

To stop the dev server, run

```bash
yarn dev:stop
```

## About the codebase

This codebase was bootstrapped with create-next-app. It uses the following technologies:

- Docker
- Docker Compose
- Yarn
- Prettier
- ESLint
- TypeScript
- Next.js
  - React.js
- PostgreSQL
- Prisma

### About Docker

This project uses Docker Compose to run two containers at once:

- `finances-db`, which is an instance of the `postgres` image, and is used to run our database, and
- `finances-app`, which is built from the Dockerfile located at `./app/Dockerfile`.

If you change any of the Docker config files, run `yarn docker-rebuild` at the project root to rebuild all the
containers.

### About the Yarn scripts

`yarn dev:start` in the project root uses Docker Compose to start up the two containers for the app. The containers
start in detached mode, meaning they run in the background. To attach to a detached container, run
`docker attach <container-name>`. To stop the containers, run `yarn dev:stop` in the project root.

The `finances-db` container just builds from the `postgres` image on Docker Hub. PostgreSQL is configured to run on
port 5433. Its username is `postgres`, its password is `postgres`, and the database name is `finances`.

The `finances-app` container builds from the Dockerfile located in `./app/`. Everything in that folder, except for the
`node_modules` folder, is mounted to `/usr/finances` in the container.
