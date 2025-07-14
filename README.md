# Honor of Kings API (NestJS + Prisma)

This project is an API built with [NestJS](https://nestjs.com/) and
[Prisma](https://www.prisma.io/) to scrape and serve data from the official
Honor of Kings website (HOK Camp). It integrates Google Gemini for AI-powered
insights.

---

## 📁 Project Structure

The source code is organized as follows:

```
src/
┣ config/ # Environment configuration
┣ gemini/ # Gemini-related features and endpoints
┃ ┣ dto/ # Data transfer objects for requests/responses
┃ ┣ use-cases/ # Business logic for Gemini use-cases
┃ ┣ gemini.controller.ts # Gemini endpoints
┣ heroes/ # Heroes-related features and endpoints
┃ ┣ dto/ # DTOs for heroes
┃ ┣ heroes.controller.ts # Heroes endpoints
┣ lib/ # External libraries (e.g., Gemini client)
┣ prisma/ # Prisma module/service
┣ app.module.ts # Root module
┗ main.ts # App entrypoint
```

---

## ⚙️ Requirements

- Node.js v18+
- Docker
- PostgreSQL (provided via Docker)
- Prisma CLI (for schema syncing)
- Gemini API Key (optional, for AI features)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/honor-of-kings-api.git
cd honor-of-kings-api
```


### 2. Install Dependencies

```
npm install
```

### 3. Configure Environment Variables

Create a .env file at the root of the project:

```
PORT=3001
GEMINI_API_KEY=your-gemini-key-here

DATABASE_URL="postgresql://postgres:123456@localhost:5432/hok-db"
```
🔁 Note: You can change the DATABASE_URL based on your PostgreSQL settings.


### 🐘 Database (PostgreSQL + Prisma)
Start PostgreSQL via Docker
```
docker-compose up -d
```
💡 Important: The current volume is mounted to a local path:
`/Users/home/Desktop/docker-data-hok_db/db-data`
If you prefer a different location, modify the volumes: section in docker-compose.yml.

### Prisma: Migrate & Generate Client

#### Code first
```
npx prisma generate
npx prisma migrate dev --name init
```

#### Database first
```
npx prisma prisma db pull
npx prisma generate
```
⚠️ Note: This project currently follows a **Database First** approach, meaning the Prisma schema is generated from the existing database using db pull.

However, you're free to use **Code First** if you prefer defining your models in the schema and generating the database through migrations.

### 🧪 Run the App
```
npm run start:dev
```
The API will be available at:
👉 `http://localhost:3001/api/v1`


📘 Swagger API Documentation
The Swagger UI is available at:
👉 `http://localhost:3001/api`
