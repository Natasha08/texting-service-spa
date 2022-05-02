## Texting Service SPA

[![Netlify Status](https://api.netlify.com/api/v1/badges/2349379f-1e07-4f93-8e4c-845c276a173b/deploy-status)](https://app.netlify.com/sites/natasha-texting-service/deploys)

[![CircleCI](https://circleci.com/gh/Natasha08/texting-service-spa/tree/main.svg?style=shield&circle-token=da593661935b31ef44cce1bd8446858ac36919fd)](https://circleci.com/gh/Natasha08/texting-service-spa/tree/main)

This is an application to authenticate and send messages using the [Text Messaging API](https://github.com/Natasha08/texting-service)

[Live URL](https://natasha-texting-service.netlify.app/)

## Technology and Stack
- [PostgreSQL 14.1](https://www.postgresql.org/docs/current/)
- [node](https://nodejs.org/) (see `.nvmrc` for version)
- [React](https://facebook.github.io/react/)  (see `package.json` for version)
- [Redux](http://redux.js.org/docs/basics/UsageWithReact.html)
- [lodash](https://lodash.com/docs/)
- [sass](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
- [Material UI](https://mui.com/material-ui/getting-started/installation/)

#### Testing
- [jest](https://github.com/facebook/jest)
- [testing-library](https://github.com/testing-library)

## Setup
1. `npm i` - Install dependencies
3. `cp .env.example .env` - Edit local config as necessary.

## Development server
- `npm start`
- View site at `http://localhost:3001/`

## Testing
- `npm test`

## Deployment
- CI/CD on Heroku
- Any keys required for deployment should be documented in `application.example.yml`

### Deployment

The `main` branch automatically deploys to Netlify
