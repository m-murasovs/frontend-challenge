# Full-stack challenge task

This is a fun frontend challenge I did task (the company agreed to let me show it on GH), which includes some matrix magic on the backend, complemented by a fun frontend. While it's not a real-world scenario, it's a nice way to demonstrate some of my skills and technologies.

## The stack:

- Backend: NestJS and TS
- Frontend: React and TS
- Bundler: Vite
- Testing: Cypress

## Getting started

To run, install all dependencies.

```bash
npm install
cd ./frontend
npm install
cd ../backend
npm install
```

Then, you can run the project with:

```bash
npm run backend
```

```bash
npm run frontend
```

## Other commands

Lint:

```bash
npm run lint
```

To run tests on the backend, call:

```bash
npm run test:backend
```

To run tests on the frontend, there are two options.
For E2E testing you need to have both frontend and backend running and then call:

```bash
npm run test:frontend:e2e
```

For component testing, you should not have the application running and then call:

```bash
npm run test:frontend:components
```
# frontend-challenge
