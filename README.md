# Ploshadka WEB
Web part of the sports leisure organization service

<img width="1419" alt="image" src="https://github.com/user-attachments/assets/3ffe962b-f635-40a5-8974-2ef6b809e43a" />

**Ploshadka WEB** is a FE service created for studying purposes as part of a sports leisure organization service. This project provides functionalities such as:

- Organization of events
- Management of stored sport courts
- User authorization via Google API

## Features

- **Event Management:** UI for event creation and participation.
- **Court Listings:** Find a suitable court by sport or location.
- **Google Authorization:** Integrates with Google API for secure user authentication.

## Requirements

- Node.js
- Yarn (dependency manager)
- TypeScript
- Google API credentials

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/e11sy/ploshadka.web.git
   cd ploshadka.web
   ```
2. Install dependencies:
   ```bash
   yarn
   ```
3. Configure the environment variables:
   - Copy the `.env.sample` file to `.env`:
     ```bash
     cp .env.sample .env
     ```
   - Update the `.env` file with your configurations:
     ```env
     VITE_API_URL=your-api-url
     VITE_GOOGLE_OAUTH_URL=your-api-url/oauth/google/login
     VITE_PRODUCTION_HOSTNAME=your-project-host
     ```
4. Start the development server:
   - Run server in developement mode 
   ```bash
   yarn dev
   ```
   or start preview of the builded project
   ```bash
   yarn build
   yarn preview
   ```

## Note

This project is for **learning purposes only** and is not intended for production use.
If you are interested in the development of the project or facing bugs - leave an issue or write [me](https://t.me/e11sy)
