# Bookshelf app
## How to
### Starting the app locally
From project root:

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
  * database query performance in the first place
  * caching on the frontend
* UI is secondary - having the performance in place, step-by-step improvements can be done
  * default UI components library with its default styles

## TODOs
* TESTS!!! shame on me here. 
* added typeguard for process.env instead of ternaries
* [frontend] analyze query cache invalidation 
* [frontend] search with live-reload while typing (debounce, and useTransition)
* [frontend] change to infinite loading with a N+1 page preloading 
* [frontend] add virtualization
* [backend] cache default view first page - invalidate on add book
