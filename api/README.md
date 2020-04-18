## AWS Serverless API

## Unit Tests

- There are required env vars that the tests read, see [e2e/110_setup.ts](e2e/110_setup.ts)
- There is a shell script that will set these up: `devops/env-all.sh`
- `pushd ../devops; source ./env-all.sh; popd`
- You will also need the exported env var AWS_APP_ADMIN_PASSWORD (see the /devops README install for details)
- AWS_APP_ADMIN_PASSWORD is the password for the admin and user test accounts
- `export AWS_APP_ADMIN_PASSWORD=<enter_a_password>`
- `npm run test`

## End to End tests

- `npm run e2e`
