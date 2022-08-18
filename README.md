## Steps to run
1. Do a `npm i` installation
2. `npm run build` to build the API
3. `typeorm migration:run -d dist/configuration/dataSource.js` to migrate the migration files
4. `npm run start` to run the API