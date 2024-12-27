# Ploshadka API

**Ploshadka API** is a backend service created for studying purposes as part of a sports leisure organization service. This project provides functionalities such as:

- Organization of events
- Management of stored sport courts
- User authorization via Google API

## Features

- **Event Management:** API endpoints to create, update, and manage sports events.
- **Court Listings:** Access and manage a database of available sports courts.
- **Google Authorization:** Integrates with Google API for secure user authentication.

## Requirements

- Node.js
- Yarn (dependency manager)
- Redis (v3.x or v4.x depending on your setup)
- TypeScript
- Google API credentials

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ploshadka.api.git
   cd ploshadka.api
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Configure the environment variables:
   - Copy the `.env.sample` file to `.env`:
     ```bash
     cp .env.sample .env
     ```
   - Update the `.env` file with your configurations:
     ```env
     VITE_API_URL=your-api-url
     VITE_GOOGLE_OAUTH_URL=your-client-id
     VITE_PRODUCTION_HOSTNAME=your-project-host
     ```
     and postgres dsn
4. Start the development server:
   ```bash
   yarn dev
   ```
   or
   ```bash
   yarn start
   ```

## Note

This project is for **learning purposes only** and is not intended for production use.
