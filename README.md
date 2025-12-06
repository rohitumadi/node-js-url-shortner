# 🔗 URL Shortener API

A robust and efficient URL shortening service built with modern web technologies. This project demonstrates a production-ready backend architecture using TypeScript, Express, and PostgreSQL.

## 🚀 Tech Stack

This project leverages a powerful suite of tools and libraries to ensure performance, type safety, and developer experience:

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Database**: [PostgreSQL](https://www.postgresql.org/)
-   **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
-   **Validation**: [Zod](https://zod.dev/)
-   **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/)
-   **Package Manager**: [pnpm](https://pnpm.io/)
-   **Containerization**: [Docker](https://www.docker.com/)

## ✨ Features

-   **User Authentication**: Secure Signup and Login endpoints using JWT.
-   **URL Shortening**: Generate unique, short aliases for long URLs using `nanoid`.
-   **Redirection**: Fast redirection from short codes to original URLs.
-   **Data Validation**: Strict request validation using Zod schemas.
-   **Type Safety**: Full TypeScript support across the entire codebase.

## 🛠️ Getting Started

Follow these steps to set up the project locally:

### Prerequisites

-   Node.js installed
-   Docker and Docker Compose installed
-   pnpm installed (`npm install -g pnpm`)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/rohitumadi/node-js-url-shortner.git
    cd node-js-url-shortner
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your configuration (adjust as needed):
    ```env
    PORT=3000
    DATABASE_URL=postgres://postgres:postgres@localhost:5432/url_shortner
    JWT_SECRET=your_super_secret_key
    ```

4.  **Start the Database**
    Use Docker Compose to spin up the PostgreSQL container:
    ```bash
    docker-compose up -d
    ```

5.  **Push Database Schema**
    Apply the Drizzle schema to your database:
    ```bash
    pnpm db:push
    ```

6.  **Run the Server**
    Start the development server:
    ```bash
    pnpm dev
    ```

    The server will start on `http://localhost:3000`.

## 📡 API Endpoints

### Auth
-   `POST /user/signup` - Register a new user
-   `POST /user/login` - Authenticate and receive a JWT

### URLs
-   `POST /shorten` - Create a short URL (Requires Auth Header: `Bearer <token>`)
-   `GET /:shortCode` - Redirect to the original URL

## 🗄️ Database Management

You can view and manage your database content using Drizzle Studio:

```bash
pnpm db:studio
```
