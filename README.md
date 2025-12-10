## Get started quickly

```bash

npm run dev

docker run -d \
  --name snake-mongo \
  -p 27017:27017 \
  -v ~/docker/mongo-data:/data/db \
  mongo:latest

docker exec -it snake-mongo bash
mongosh
show dbs
use snake-mongo
show collections
db.users....

```
## Snake (brief)

Minimal browser Snake game with a small Express + MongoDB backend for authentication, scores, and a leaderboard.

## Prerequisites

- Node.js (16+)
- npm
- MongoDB (local or via Docker)

## Quick start

1. Start MongoDB (optional, Docker):

```bash
docker run -d --name snake-mongo -p 27017:27017 -v ~/docker/mongo-data:/data/db mongo:latest
```

2. Run the server:

```bash
cd server
npm install
# create a .env with at least MONGO_URI and JWT_SECRET (see below)
npm run dev
```

### What this repo contains

- Frontend: `index.html` and `js/` — simple browser game UI and client-side logic.
- Backend: `server/src` — Express API that handles auth, scores, and leaderboard stored in MongoDB.

### Features

- Register and login (email + password). Server returns a JWT.
- Authenticated users can submit scores and view their recent scores.
- Public leaderboard shows top 10 scores with the submitting user's email.

### Folder overview (important files)

- `index.html` — game entry (open in browser).
- `js/` — frontend scripts (`snake.js`, `functions.js`, `api.js`).
- `server/src/index.js` — Express app entry.
- `server/src/routes` — route definitions (`auth.js`, `scores.js`, `leaderboard.js`).
- `server/src/controllers` — route handlers; look here for payload/response details.

### API examples

1) Register

Request:

```http
POST /api/auth/register
Content-Type: application/json

{ "email": "you@example.com", "password": "secret" }
```

Response:

```json
{ "token": "<jwt>" }
```

2) Login

Request:

```http
POST /api/auth/login
Content-Type: application/json

{ "email": "you@example.com", "password": "secret" }
```

Response is the same shape as register: a JSON object with `token`.

3) Submit score (authenticated)

Request:

```http
POST /api/scores
Authorization: Bearer <jwt>
Content-Type: application/json

{ "score": 120 }
```

Response: created score object (201) with fields including `score`, `userId`, and timestamps.

4) Leaderboard (public)

Request:

```http
GET /api/leaderboard
```

Response: array of top 10 score documents populated with user email.