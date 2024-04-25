# Authenticator

This is a authenticator project built with TypeScript, Node.js, and Express.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js
- npm

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/jonasssneto/Authenticator.git
   ```

2. Install the dependencies:

   ```bash
   cd authenticator
   npm install
   ```

3. Configure the environment variables:

   Create a `.env` file in the root directory and provide the necessary environment like the .env.example file.

4. Start the server:

   ```bash
   npm run dev
   ```

## API endpoints 
`base URL: /api/v1`
### POST /auth/register
- Request body:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

### POST /auth/login
- Request body:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

## License

This project is licensed under the [MIT License](LICENSE).
