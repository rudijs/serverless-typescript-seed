Create frontend
npx create-react-app client --typescript
cd client
Install cypress and create an home page test
npm install -D cypress
Run crypress to create the default folder setup
npx cypress open
Update cypress.json

```
{
  "integrationFolder": "cypress/e2e"
}
```

Update cypress/plugins/index.js

```
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // config.baseUrl = "http://local-app.rudijs.com";
  config.baseUrl = 'http://localhost:3000'

  if (process.env.STAGE === 'dev') {
    config.baseUrl = 'https://dev-app.rudijs.com'
  }

  if (process.env.STAGE === 'prod') {
    config.baseUrl = 'https://app.rudijs.com'
  }

  config.viewportHeight = 900
  config.viewportWidth = 400

  if (process.env.BREAKPOINT === 'desktop') {
    config.viewportHeight = 720
    config.viewportWidth = 1280
  }

  return config
}
```

Run cypress again to pick up the new config

npx cypress open

The default test fails, add the text 'Home Page' to App.tsx to make the test pass

npm install -S @material-ui/core
