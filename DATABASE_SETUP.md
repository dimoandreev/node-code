# Database Setup Instructions

Before running the application, you need to create the PostgreSQL database. You have a few options:

## Option 1: Using pgAdmin or Database GUI
1. Open pgAdmin or your PostgreSQL GUI tool
2. Connect to your PostgreSQL server using the credentials:
   - Host: localhost
   - Port: 5432
   - Username: qb_user
   - Password: TA5pJ1GhhMSHfmTi4nd6
3. Create a new database named `node_auth_db`

## Option 2: Using psql command line
If you have psql in your PATH, run:
```bash
psql -U qb_user -h localhost -d postgres -c "CREATE DATABASE node_auth_db;"
```

## Option 3: The application can create tables automatically
Once the database `node_auth_db` exists, the NestJS application will automatically create the `users` table when it starts (because `synchronize: true` is enabled in TypeORM configuration).

## After Creating the Database
Run the development server:
```bash
npm run start:dev
```

The application will be available at: http://localhost:3000/api
