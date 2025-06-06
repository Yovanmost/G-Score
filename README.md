# 1. Using the docker containers
Step 1: Clone this repo

Step 2: Change the `.env.example` file to your environment

Step 3: Run `docker-compose up --build`

## URL's (local version)

| URL                                                                                | Description           |
|------------------------------------------------------------------------------------|-----------------------|
| [http://localhost:8080](http://localhost:8080)                                     | (React) Application            |

# 2. Run Migrations - Seed Database
Run the following command to seed the database:

`docker-compose exec backend npx sequelize-cli db:migrate`

`docker-compose exec backend npx sequelize-cli db:seed:all`

