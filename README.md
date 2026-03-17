# Bookshelf app
## How to
### Starting the app locally
#### Prerequisites 
docker and nodejs >v22.

#### From the project root:

Start the docker database container
```npm
npm run db
```

Create database structure
```npm
npm run db:migrate
```

Create test data in the database
* to create ~100k records
```npm
npm run db:seed100k
```
OR 
* to create ~1M records – the docker volume takes ~2GB disk space
```npm
npm run db:seed1M 
```
Every run of either of these scripts creates randomized data in the database, so the scripts can be used multiple times to extend the amount of data to the required level.   


Build backend and and frontend
```npm
npm run build:all
```

Run api and frontend servers
```npm
npm run start:backend
```
```npm
npm run start:frontend
```

Check frontend logs and open the provided link in the browser.  

## Main decision drivers
* limited time for implementation
* one-man-army development
* performance is the top priority
* no auth

## Main architecture concerns
* monorepo with shared frontend-server contract definitions and TS types
* code structure - towards vertical slices/feature sliced design, but simplified for this size of the project
* performance as the critical decision driver
  * api-first design
  * database query performance in the first place, no ORM
  * caching on the frontend
* UI is secondary - having the performance in place, step-by-step improvements can be done
  * default UI components library with its default styles

## Major implementation decisions
* database: 
  * PostgreSQL - I know it best.
  * faker-js for data seeding - I used it before, very easy to use api for randomized, yet realistic mock data generation.
* npm workspaces for monorepo - a simple tool for a simple project, I worked with it before.
* frontend: vite, react, material UI - well established, I have fresh experience on the entire stack. 
  * tanstack query - industry standard, stale-while-revalidate support out of the box + caching.
  * zod for shared schemas, validators and TS types - I know it, very fast development
  * react-hook-forms - I personally don't like it, but I have fresh experience, and it nicely cooperates with zod.
  * material UI - I personally don't like it, but I have fresh experience. Good composition principles, perfect for fast UI implementations.
  * for this app state stored in url search params:
    * nuqs - lightweight, no routing required, only query params support. Strongly typed. Supports zod schemas parameters for parsing.
* backend: 
  * fastify - plug'n'play setup, simplistic dev-ex, nicely cooperates with zod. 
  * swagger - single plugin setup, automatic docs generation, immediate api manual test tool. Niceliy cooperates with zod. 
  * pg for database client - most popular, I know it.

## TODOs
* TESTS!!! shame on me here. 
* added typeguard for process.env instead of ternaries
* [frontend] analyze query cache invalidation 
* [frontend] search with live-reload while typing (debounce, and useTransition)
* [frontend] change to infinite loading with a N+1 page preloading 
* [frontend] add virtualization
* [backend] cache default view first page - invalidate on add book
