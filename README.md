# Bookshelf app
## Main decision drivers
* limited time for implementation
* one-man-army development
* performance is the priority
* no auth

## Main architecture concerns
* monorepo with shared frontend-server contract definitions 
* code structure - towards vertical slices/feature sliced design, but simplified for this size of the project
* performance as the critical decision driver
  * api-first design
  * caching on the frontend
* UI is secondary - having the performance in place, step-by-step improvements can be done
  * default UI components library with its default styles

## TODOs
* TESTS!!! shame on me here. 
* added typeguard for process.env instead of ternaries
* [frontend] search with live-reload while typing (debounce, and useTransition)
* [frontend] change to infinite loading with a N+1 page preloading 
* [frontend] add virtualization
* [backend] cache default view first page - invalidate on add book
