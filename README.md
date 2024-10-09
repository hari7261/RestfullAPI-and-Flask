# RESTful API with Flask and TypeScript

## Introduction

This project demonstrates how to create a **RESTful API** using **Flask** (Python web framework) and **TypeScript** (JavaScript with static typing). The goal of this README is to guide you through the steps of setting up, running, and understanding the project architecture.

The combination of **Flask** on the backend and **TypeScript** on the frontend or server side allows for efficient and scalable applications, leveraging the strengths of both technologies: Flask for simplicity and flexibility and TypeScript for type safety and better development experience.

---

## Table of Contents

1. [Requirements](#requirements)
2. [Project Structure](#project-structure)
3. [Installation and Setup](#installation-and-setup)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Understanding the Code](#understanding-the-code)
    - [Flask Backend](#flask-backend)
    - [TypeScript Integration](#typescript-integration)
7. [Testing the API](#testing-the-api)
8. [Deploying](#deploying)
9. [Contributing](#contributing)

---

## Requirements

To work on this project, you will need the following dependencies installed on your machine:

- **Python 3.x**: Flask backend is developed in Python.
- **Node.js** and **npm**: Used for managing TypeScript compilation.
- **Flask**: A Python framework for building web applications and APIs.
- **TypeScript**: Superset of JavaScript that adds optional static typing.
- **Postman** or **cURL**: For testing API endpoints.

### Python Dependencies

- **Flask**: `pip install Flask`
- **Flask-CORS**: `pip install Flask-CORS` (to handle CORS issues when integrating frontend)
- **Flask-RESTful**: `pip install Flask-RESTful` (for RESTful routing)
  
### Node.js Dependencies

- **TypeScript**: `npm install -g typescript`
- **ts-node**: `npm install -g ts-node` (for running TypeScript files without pre-compiling)
  
---

## Project Structure

Below is the project structure:

```
restfulapi-and-flask/
│
├── backend/                      # Backend code written in Flask
│   ├── app.py                    # Main Flask application file
│   ├── models.py                 # Defines the data models
│   ├── routes.py                 # Contains the API endpoints
│   ├── requirements.txt          # Python dependencies
│   └── tests.py                  # Unit tests for the backend API
│
├── frontend/                     # Frontend or service layer written in TypeScript
│   ├── tsconfig.json             # TypeScript configuration
│   ├── src/
│       ├── index.ts              # Entry point for TypeScript code
│       └── apiClient.ts          # TypeScript client that makes API calls
│
└── README.md                     # Project README file (this file)
```

### Key Files

- **backend/app.py**: Main Flask application with routing and initialization logic.
- **backend/routes.py**: Contains the REST API routes/endpoints.
- **frontend/src/index.ts**: Entry point of the TypeScript frontend or API client.
- **frontend/src/apiClient.ts**: Contains code for making HTTP requests to Flask API.

---

## Installation and Setup

Follow the instructions to set up and run the project.

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/restfulapi-and-flask.git
cd restfulapi-and-flask
```

### 2. Backend (Flask)

#### Install Python dependencies:

```bash
cd backend
pip install -r requirements.txt
```

#### Flask project structure:

- **`app.py`**: The main entry point for the Flask API.
- **`routes.py`**: Defines the API routes (GET, POST, PUT, DELETE).
- **`models.py`**: Manages the application’s data models (e.g., users, tasks).

#### Starting the Flask server:

```bash
export FLASK_APP=app
flask run
```

The server will start on `http://127.0.0.1:5000/`.

### 3. Frontend (TypeScript)

#### Install Node.js dependencies:

```bash
cd ../frontend
npm install
```

#### Configure TypeScript:

The **tsconfig.json** file is already included in the project. It sets up the TypeScript compiler options, such as ES6 modules and strict type checking.

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### Running the TypeScript server:

To compile and run the TypeScript files, use `ts-node`:

```bash
npx ts-node src/index.ts
```

---

## Running the Application

Once the Flask server is running, and the TypeScript client is set up, you can interact with the API through the TypeScript client or Postman/cURL.

1. **Flask API** will run on: `http://127.0.0.1:5000/`
2. **TypeScript Client** can be used to interact with Flask API by sending HTTP requests.

---

## API Endpoints

Here are some of the sample RESTful API endpoints defined in **routes.py**:

- `GET /api/items`: Fetch all items
- `GET /api/items/<id>`: Fetch a specific item by ID
- `POST /api/items`: Create a new item
- `PUT /api/items/<id>`: Update an existing item by ID
- `DELETE /api/items/<id>`: Delete an item by ID

You can test these endpoints using **Postman** or **cURL**.

Example:

```bash
curl http://127.0.0.1:5000/api/items
```

---

## Understanding the Code

### Flask Backend

#### `app.py` (Backend)

```python
from flask import Flask
from flask_cors import CORS
from routes import api

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing
api.init_app(app)

if __name__ == "__main__":
    app.run(debug=True)
```

- **Flask** initializes the API by importing the routes from `routes.py`.
- **CORS** is enabled to allow communication between different domains (important when TypeScript frontend runs on a different port).

#### `routes.py`

This file contains the API routes:

```python
from flask_restful import Api, Resource

api = Api()

class Item(Resource):
    def get(self, item_id):
        return {"item_id": item_id}

api.add_resource(Item, '/api/items/<int:item_id>')
```

### TypeScript Integration

#### `apiClient.ts` (Frontend)

```typescript
import axios from 'axios';

const BASE_URL = "http://127.0.0.1:5000";

export const getItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/items`);
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching items", error);
  }
};
```

This file uses **Axios** to make HTTP requests from the TypeScript frontend to the Flask API.

---

## Testing the API

You can test the API using the following methods:

1. **Unit Testing (Flask Backend)**:
   Write unit tests in `tests.py` to verify the functionality of your Flask routes.
   
2. **Postman / cURL**: Use these tools to manually send HTTP requests to the Flask API and verify the responses.

---

## Deploying

### Backend Deployment (Flask)

1. Deploy the Flask application using services like **Heroku**, **AWS**, or **DigitalOcean**.
2. Configure environment variables such as `FLASK_ENV`, `DATABASE_URL`, etc.

### Frontend (TypeScript)

1. Build the TypeScript project for production:

```bash
tsc
```

2. Serve the generated JavaScript bundle using a static web server or integrate it with your backend server.

---

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request.

---

## Conclusion

This project provides a basic foundation for building a full-stack application using Flask (backend) and TypeScript (frontend). Feel free to extend it by adding more routes, authentication, database integrations, and more!
