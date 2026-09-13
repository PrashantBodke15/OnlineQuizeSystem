<<<<<<< HEAD
# Online Quiz System

A full-stack MERN online quiz platform. Students can register, take timed multiple-choice quizzes, submit answers, and view their scores. Admin users have protected REST endpoints for managing subjects, quizzes, questions, and results.

## Stack

- React 19 + Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcryptjs password hashing
- Axios REST client
- CSS responsive UI

## Project Structure

```text
onlineQuizSystem/
├── backend/
│   ├── app.js
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── test/
│   ├── .env.example
│   ├── seed.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/components/
│   ├── src/services/api.js
│   ├── src/App.jsx
│   ├── src/App.css
│   └── package.json
├── .gitignore
└── README.md
```

## Requirements

Install Node.js 20 or newer. Use either MongoDB Community Server locally or a MongoDB Atlas cluster.

## MongoDB Setup

### Local MongoDB

Install MongoDB Community Server, start the MongoDB service, then use:

```text
mongodb://127.0.0.1:27017/online_quiz_system
```

### MongoDB Atlas

Create a free cluster at https://www.mongodb.com/atlas, create a database user, add your IP address under Network Access, and copy the driver connection string. Replace the password and use the database name `online_quiz_system`.

## Install

From PowerShell in VS Code:

```powershell
cd D:\onlineQuizSystem\backend
npm install

cd ..\frontend
npm install
```

Create `backend/.env` by copying `backend/.env.example` and set:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/online_quiz_system
JWT_SECRET=use-a-long-random-secret-here
CLIENT_URL=http://localhost:5173
```

Never commit `.env` or expose `MONGO_URI` and `JWT_SECRET` in frontend code.

## Seed Sample Data

With MongoDB running:

```powershell
cd D:\onlineQuizSystem\backend
npm run seed
```

This creates:

- Admin Prashant: `prashant@gmail.com` / `Prashant@123`
- Students: `student1@gmail.com` / `Student@123`
- Students: `student2@gmail.com` / `Student@123`
- Four subjects: Java, Python, JavaScript, SQL
- Three quizzes with ten questions each

## Run the Complete Project

Open two VS Code terminals.

Terminal 1:

```powershell
cd D:\onlineQuizSystem\backend
npm run dev
```

Terminal 2:

```powershell
cd D:\onlineQuizSystem\frontend
npm run dev
```

Open http://localhost:5173. The API health check is available at http://localhost:5000/api/health.

If MongoDB is not running, the frontend still displays demo quizzes and allows a visual quiz walkthrough, but database authentication and result persistence require MongoDB and the backend.

## Backend API Structure

The backend separates API composition from process startup:

```text
backend/
├── app.js                 # Express app, middleware, health check, errors
├── server.js              # MongoDB connection and HTTP server startup
├── routes/index.js        # Central API route registry
├── routes/*Routes.js      # Resource-specific endpoints
├── controllers/           # Request handling and database operations
├── models/                # Mongoose schemas
├── middleware/            # Authentication and error handling
└── test/                  # Node API tests
```

Run the API test suite without connecting to MongoDB:

```powershell
cd D:\onlineQuizSystem\backend
npm test
```

For integration tests, import the Express app from `backend/app.js` and provide a test database connection separately. Do not import `server.js` in route tests because it is responsible for starting the real HTTP server and connecting to the configured database.

## REST API

Authentication:

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

Subjects:

```text
GET    /api/subjects
GET    /api/subjects/:id
POST   /api/subjects       (admin)
PUT    /api/subjects/:id   (admin)
DELETE /api/subjects/:id   (admin)
```

Quizzes:

```text
GET    /api/quizzes
GET    /api/quizzes/:id
POST   /api/quizzes        (admin)
PUT    /api/quizzes/:id    (admin)
DELETE /api/quizzes/:id    (admin)
```

Questions:

```text
GET    /api/questions/quiz/:quizId
POST   /api/questions      (admin)
PUT    /api/questions/:id  (admin)
DELETE /api/questions/:id  (admin)
```

Results:

```text
POST /api/results
GET  /api/results/my-results
GET  /api/results/:id
GET  /api/results/all      (admin)
```

Send protected requests with:

```text
Authorization: Bearer <jwt-token>
```

Correct answers are excluded from the question-fetch response and are evaluated only by the backend on submission.

## Postman Test Flow

Set this Postman environment variable:

```text
baseUrl = http://localhost:5000/api
token = paste-the-login-token-here
subjectId = paste-a-subject-id-here
quizId = paste-the-created-quiz-id-here
```

### 1. Login as admin

```http
POST {{baseUrl}}/auth/login
Content-Type: application/json
```

Body, using **raw > JSON**:

```json
{
	"email": "admin@gmail.com",
	"password": "Admin@123"
}
```

Copy the `token` from the response into the `token` environment variable.

### 2. Get subjects

```http
GET {{baseUrl}}/subjects
```

Copy the `_id` of the subject you want to use into `subjectId`.

### 3. Create a quiz

In Postman, choose **Authorization > Bearer Token** and set the token to `{{token}}`.

```http
POST {{baseUrl}}/quizzes
Authorization: Bearer {{token}}
Content-Type: application/json
```

Body:

```json
{
	"title": "React Component Thinking",
	"description": "Test core React component concepts.",
	"subject": "{{subjectId}}",
	"duration": 15,
	"totalQuestions": 2
}
```

Copy the created quiz `_id` from the response into `quizId`.

### 4. Add questions to the quiz

Run this request once for each question:

```http
POST {{baseUrl}}/questions
Authorization: Bearer {{token}}
Content-Type: application/json
```

Body:

```json
{
	"quiz": "{{quizId}}",
	"questionText": "Which hook is used to manage local component state?",
	"optionA": "useState",
	"optionB": "useRoute",
	"optionC": "useLink",
	"optionD": "useServer",
	"correctAnswer": "A"
}
```

### 5. Verify the quiz questions

```http
GET {{baseUrl}}/questions/quiz/{{quizId}}
Authorization: Bearer {{token}}
```

The response intentionally does not include `correctAnswer` for quiz takers.

### Success response messages

Mutation endpoints include a human-readable `message` field while preserving the resource fields used by the frontend:

```json
{
	"message": "Quiz created successfully",
	"_id": "created-quiz-id",
	"title": "React Component Thinking"
}
```

Other successful messages include `Login successful`, `Registration successful`, `Question created successfully`, `Subject created successfully`, and `Quiz result submitted successfully`.

## Troubleshooting

- MongoDB connection failed: start the local MongoDB service or verify the Atlas URI, credentials, and IP allowlist.
- Port already in use: change `PORT` in `backend/.env`, and start Vite with `npm run dev -- --port 5174` if needed.
- CORS error: set `CLIENT_URL` to the exact frontend origin, such as `http://localhost:5173`.
- Invalid JWT: log out, remove the stale browser token, and log in again.
- API 404: confirm the backend is running on port 5000 and that frontend requests use `/api` paths.
- React routing error: this starter uses client-side page state, so no server fallback configuration is required.
- npm errors: use Node.js 20+, remove `node_modules` and `package-lock.json`, then run `npm install` again.

## Production Notes

Use a strong generated JWT secret, restrict CORS to the deployed frontend origin, enable MongoDB authentication, and serve the built frontend with a static host or reverse proxy. Run `npm run build` in `frontend` before deployment.
=======
# OnlineQuizeSystem
>>>>>>> 9709512e042b3a3c73ea241dadba6b359d293213
