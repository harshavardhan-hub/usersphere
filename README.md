# UserSphere - User Management Dashboard

A modern full-stack user management dashboard built with React and Node.js.  
UserSphere provides a clean, professional interface for managing users with full CRUD operations, real-time search, and responsive design.

---

## Live Demo

Frontend (Vercel): [https://usersphere.vercel.app](https://usersphere.vercel.app)  
Backend (Render): [https://usersphere-api.onrender.com](https://usersphere-api.onrender.com)

---

## Features

- Complete CRUD Operations (Create, Read, Update, Delete)
- Real-time Search (name, email, phone, company, city)
- Dashboard Analytics (total users, filtered count)
- Fully Responsive Layout (mobile, tablet, desktop)
- Modern UI with Tailwind CSS
- Client and Server-side Validation
- Automatic A–Z Sorting
- PostgreSQL Data Persistence with Sequelize ORM
- RESTful API Architecture
- Secure and Optimized Performance

---

## Tech Stack

### Frontend
- React 18.2.0
- Vite 5.4.21
- React Router 6.21.1
- Axios 1.6.5
- Tailwind CSS 3.4.1
- SASS 1.69.7

### Backend
- Node.js 18+
- Express 4.18.2
- Sequelize 6.35.2
- PostgreSQL 12+
- Express Validator 7.0.1
- Helmet 7.1.0
- Morgan 1.10.0
- CORS 2.8.5

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

---

## Project Structure

```
usersphere/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
│
└── backend/
    ├── src/
    │   ├── config/
    │   ├── models/
    │   ├── migrations/
    │   ├── seeders/
    │   ├── routes/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── validators/
    │   └── app.js
    ├── server.js
    ├── package.json
    └── .env.example
```

---

## Setup Instructions

### Prerequisites

- Node.js >= 18.0.0  
- npm >= 9.0.0  
- PostgreSQL >= 12

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/usersphere.git
cd usersphere
```

---

### Step 2: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and configure your database credentials:

```
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=usersphere
DB_USER=postgres
DB_PASSWORD=yourpassword

ALLOWED_ORIGINS=http://localhost:5173
```

Create and seed your database:

```bash
createdb usersphere
npm run db:migrate
npm run db:seed
npm run dev
```

Backend runs at [http://localhost:5000](http://localhost:5000)

---

### Step 3: Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env`:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the development server:

```bash
npm run dev
```

Frontend runs at [http://localhost:5173](http://localhost:5173)

---

## Available Scripts

### Backend
```bash
npm run dev           # Start development server
npm start             # Start production server
npm run db:migrate    # Run database migrations
npm run db:seed       # Seed demo data
npm run db:reset      # Reset database
```

### Frontend
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
```

---

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Body |
|--------|-----------|-------------|------|
| GET | `/users` | Get all users (with search & pagination) | - |
| GET | `/users/:id` | Get user by ID | - |
| POST | `/users` | Create new user | `{ name, email, phone, company, address }` |
| PUT | `/users/:id` | Update user | `{ name, email, phone, company, address }` |
| DELETE | `/users/:id` | Delete user | - |

Example:
```bash
curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "phone": "9876543210"}'
```

---

## Database Schema

### users Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT |
| name | STRING | NOT NULL |
| email | STRING | UNIQUE, NOT NULL |
| phone | STRING | NOT NULL |
| company | STRING | NULLABLE |
| address | JSONB | NOT NULL |
| created_at | TIMESTAMP | NOT NULL |
| updated_at | TIMESTAMP | NOT NULL |

Example Address JSON:
```json
{
  "street": "123 Main St",
  "city": "New York",
  "zip": "10001",
  "geo": { "lat": "40.7128", "lng": "-74.0060" }
}
```

---

## Deployment

### Backend (Render)
1. Create a PostgreSQL instance on Render.
2. Create a Web Service and connect your GitHub repo.
3. Set:
   - Build Command: `npm install && npm run db:migrate && npm run db:seed`
   - Start Command: `npm start`
4. Add environment variables:
```
DATABASE_URL=your_render_database_url
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=5000
```

### Frontend (Vercel)
1. Push the frontend folder to GitHub.
2. Import the project in Vercel.
3. Set:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable:
```
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

---

## Screenshots

### Dashboard  
![Dashboard](https://res.cloudinary.com/drit9nkha/image/upload/v1761221620/Dashboard_durvyf.png)

### Add User  
![Add User](https://res.cloudinary.com/drit9nkha/image/upload/v1761221604/Add_User_gaemni.png)

### Edit User  
![Edit User](https://res.cloudinary.com/drit9nkha/image/upload/v1761221620/Edit_User_ryzenx.png)

### User Details  
![User Details](https://res.cloudinary.com/drit9nkha/image/upload/v1761221621/User_Details_saajaf.png)

---

## Security

- Helmet for HTTP header security
- CORS configuration for trusted origins
- Input validation with Express Validator
- SQL Injection protection via Sequelize
- Environment-based configuration management

---

## Troubleshooting

**Database connection error**  
Ensure PostgreSQL is running and credentials match `.env`.

**CORS error**  
Update `ALLOWED_ORIGINS` in backend `.env` to include frontend URL.

**Migration error**  
Run:
```bash
npm run db:migrate:undo:all
npm run db:migrate
npm run db:seed
```

---

## Contributing

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/new-feature`)  
3. Commit your changes (`git commit -m "Add new feature"`)  
4. Push to your branch (`git push origin feature/new-feature`)  
5. Open a Pull Request

---

## Author

**Harsha Vardhan Yanakandla**  
GitHub: [@harshavardhan-hub](https://github.com/harshavardhan-hub)  
LinkedIn: [Harsha Vardhan Yanakandla](https://www.linkedin.com/in/harsha-vardhan-yanakandla/)  
Email: yanakandlaharshavardhan@gmail.com

---

## Future Enhancements

- JWT Authentication and Authorization  
- Role-based Access Control (Admin, User)  
- User Avatars and Profile Management  
- CSV and PDF Export  
- Dark Mode  
- Bulk Delete and Multi-Select Actions  
- Activity Logs  
- Email Notifications  
- Swagger API Documentation

---

## Project Status

Version: 1.0.0  
Status: Production Ready  
Last Updated: October 2025
