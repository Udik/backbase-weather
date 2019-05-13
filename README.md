# Backbase Weather App

Implements a simple responsive weather application based on the OpenWeatherMap api.

The app has three pages:

- a main page (/weather) that displays the current weather of five European cities (hardcoded);
- a detail page (/weather/[city]) that displays the current weather of a selected city and the forecast for the next 48 hours
- a fallback page (/error) for routing errors (pages other than /, /weather, and unrecognized city names)

Some other features:

- displays an angular material snackbar for service errors, with a Retry action
- splits forecast periods by date
- uses angular transitions to animate routing transitions
- caches service data for 60 seconds to avoid unnecessary service calls

Structure:

The app is structured in two modules (plus a "barrel" module for Angular material imports). Besides the main module, a "blocks" module groups a few small components meant to be widely reused across the solution.

The app uses router and resolvers. Data access and caching is structured in services (plus a http interceptor for service caching). Api response model interfaces are included, auto-generated from example API responses. Data models are also used to pass around data relevant to the application. Router events are intercepted to automatically display a spinner in the loading state.

The app is complete of unit and e2e tests. It uses Webpack's proxy to proxy calls to OpenWeatherMap to avoid the CORS restriction issue.

Libraries used: Angular 7, Angular Material.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Running lint

Run `npm run lint` to run the linter.
