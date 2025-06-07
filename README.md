# 1. Using the docker containers
Step 1: Clone this repo.

Step 2: You can either create a `.env` file or change the `.env.example` file to `.env` for your environment.

Step 3: Run `docker-compose up --build`.

## URL's (local version)

| URL                                                                                | Description           |
|------------------------------------------------------------------------------------|-----------------------|
| [http://localhost:8080](http://localhost:8080)                                     | (React) Application            |

# 2. Run Migrations - Seed Database
Run the following command for the migrations:

`docker-compose exec backend npx sequelize-cli db:migrate`

Run the following command to seed the database:

`docker-compose exec backend npx sequelize-cli db:seed:all`

