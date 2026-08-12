# SecureTask

> A full-stack project management application built with Django REST Framework and React.  
> Portfolio Project 1 — [StackWise](https://stackwise.dev)

![Python](https://img.shields.io/badge/Python-3.14-blue?style=flat-square&logo=python)
![Django](https://img.shields.io/badge/Django-6.0.4-green?style=flat-square&logo=django)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4.0-38BDF8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## Overview

SecureTask is a production-grade project management tool that allows teams to create projects, manage tasks on a Kanban board, and collaborate with members — all behind a secure JWT-authenticated REST API.

Built entirely from scratch without starter templates, SecureTask demonstrates full-stack engineering across database design, REST API architecture, React UI, and AWS cloud deployment.

---

## Features

- **JWT Authentication** — Secure login and registration with automatic token refresh
- **Project Management** — Create, update, and delete projects with status tracking
- **Kanban Board** — Visual task management across To Do, In Progress, In Review, and Done columns
- **Task System** — Priority levels, due dates, status tracking, and member assignment
- **Team Collaboration** — Add members to projects and assign tasks across your team
- **User Profiles** — Editable profiles with bio and avatar support
- **Dashboard** — Live stats and recent project overview
- **Production Ready** — Environment-based config, WhiteNoise static files, PostgreSQL on AWS RDS

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Python | 3.14 | Core language |
| Django | 6.0.4 | Web framework |
| Django REST Framework | 3.17.1 | REST API layer |
| SimpleJWT | 5.5.1 | JWT authentication |
| django-cors-headers | 4.9.0 | Cross-origin requests |
| Pillow | 12.2.0 | Image processing |
| WhiteNoise | — | Static file serving |
| Gunicorn | — | Production WSGI server |
| dj-database-url | — | Database URL config |
| python-dotenv | 1.2.2 | Environment variables |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | — | Build tool & dev server |
| React Router | v6 | Client-side routing |
| Axios | — | HTTP client |
| Zustand | — | Global state management |
| Tailwind CSS | 4.0 | Utility-first styling |

### Infrastructure
| Service | Purpose |
|---|---|
| AWS EC2 | Django backend hosting |
| AWS RDS (PostgreSQL) | Production database |
| AWS S3 | Media file storage |
| SQLite | Local development database |

---

## Project Structure

```
securetask/                     # Django project root
├── backend/                    # Core Django config
│   ├── settings.py             # Environment-aware settings
│   ├── urls.py                 # Root URL routing
│   └── wsgi.py                 # WSGI entry point
├── accounts/                   # User app
│   ├── models.py               # Custom User model
│   ├── serializers.py          # User & Register serializers
│   ├── views.py                # Auth views
│   ├── urls.py                 # Auth routes
│   └── admin.py                # Admin registration
├── projects/                   # Projects app
│   ├── models.py               # Project model
│   ├── serializers.py          # Project serializer
│   ├── views.py                # CRUD + member management
│   ├── urls.py                 # Project routes
│   └── admin.py                # Admin registration
├── tasks/                      # Tasks app
│   ├── models.py               # Task model
│   ├── serializers.py          # Task serializer
│   ├── views.py                # CRUD views
│   ├── urls.py                 # Task routes
│   └── admin.py                # Admin registration
├── manage.py
├── requirements.txt
├── Procfile                    # Deployment process file
└── .env                        # Environment variables (not committed)

frontend/                       # React + Vite app
├── src/
│   ├── api/                    # API service layer
│   │   ├── axios.js            # Axios instance + interceptors
│   │   ├── projects.js         # Project API functions
│   │   └── tasks.js            # Task API functions
│   ├── components/             # Reusable UI components
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx     # Navigation sidebar
│   │   │   └── AppLayout.jsx   # Page wrapper
│   │   ├── Modal.jsx           # Modal dialog
│   │   └── StatusBadge.jsx     # Status & priority badges
│   ├── hooks/                  # Custom React hooks
│   │   ├── useProjects.js      # Project state + API calls
│   │   └── useTasks.js         # Task state + API calls
│   ├── pages/                  # Page components
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectDetail.jsx   # Kanban board
│   │   ├── Tasks.jsx
│   │   └── Profile.jsx
│   ├── store/
│   │   └── authStore.js        # Zustand auth store
│   └── App.jsx                 # Router + protected routes
└── vite.config.js
```

---

## Data Models

### User
Extends Django's `AbstractUser`. Email is the login identifier.
```
id | email | username | bio | avatar | created_at | updated_at
```

### Project
```
id | title | description | status | owner → User | members → [User] | due_date | created_at | updated_at
```
Status: `planning` `active` `on_hold` `completed` `archived`

### Task
```
id | title | description | project → Project | assigned_to → User | created_by → User | priority | status | due_date | created_at | updated_at
```
Priority: `low` `medium` `high` `critical`  
Status: `todo` `in_progress` `in_review` `done`

---

## API Reference

All endpoints prefixed with `/api/`. All except `register` and `login` require:
```
Authorization: Bearer <access_token>
```

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register/` | Create account |
| POST | `/auth/login/` | Login — returns access + refresh tokens |
| POST | `/auth/token/refresh/` | Refresh access token |
| GET | `/auth/profile/` | Get current user profile |
| PATCH | `/auth/profile/` | Update profile |
| GET | `/auth/users/` | List all users |

### Projects
| Method | Endpoint | Description |
|---|---|---|
| GET | `/projects/` | List owned and member projects |
| POST | `/projects/` | Create a project |
| GET | `/projects/:id/` | Get project detail |
| PATCH | `/projects/:id/` | Update project |
| DELETE | `/projects/:id/` | Delete project |
| POST | `/projects/:id/add-member/` | Add member to project |

### Tasks
| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks/` | List all accessible tasks |
| POST | `/tasks/` | Create a task |
| GET | `/tasks/:id/` | Get task detail |
| PATCH | `/tasks/:id/` | Update task |
| DELETE | `/tasks/:id/` | Delete task |
| GET | `/tasks/project/:id/` | List tasks by project |

---

## Local Development Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/securetask.git
cd securetask
```

### 2. Backend setup
```bash
# Create and activate virtual environment
python -m venv .venv
.venv\Scripts\Activate.ps1        # Windows
source .venv/bin/activate         # macOS/Linux

# Install dependencies
cd securetask
pip install -r requirements.txt

# Create environment file
cp .env.example .env
# Edit .env and set your SECRET_KEY

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start backend
python manage.py runserver
```

### 3. Frontend setup
```bash
# In a new terminal
cd frontend
npm install
npm run dev
```

### 4. Access the app
| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API | http://127.0.0.1:8000/api/ |
| Admin panel | http://127.0.0.1:8000/admin |

---

## Environment Variables

Create a `.env` file in the `securetask/` directory:

```env
# Required
SECRET_KEY=your-secret-key-here
DEBUG=True

# Hosts
ALLOWED_HOSTS=127.0.0.1,localhost

# Database (leave blank for SQLite in development)
DATABASE_URL=

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

For production, set:
```env
DEBUG=False
SECRET_KEY=your-strong-production-key
ALLOWED_HOSTS=your-ec2-ip,yourdomain.com
DATABASE_URL=postgres://user:password@your-rds-endpoint:5432/dbname
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

---

## Deployment

### Backend (AWS EC2 + RDS)

```bash
# On your EC2 instance
git clone https://github.com/yourusername/securetask.git
cd securetask/securetask
pip install -r requirements.txt

# Set production environment variables
# Run migrations against RDS
python manage.py migrate
python manage.py collectstatic

# Start with Gunicorn
gunicorn backend.wsgi:application --bind 0.0.0.0:8000
```

### Frontend

```bash
cd frontend
npm run build
# Deploy the dist/ folder to S3 or serve via Nginx
```

---

## Security

- Passwords hashed with Django's PBKDF2 algorithm
- JWT access tokens expire after 5 minutes; refresh tokens after 1 day
- Axios interceptor silently refreshes tokens on 401 responses
- All API views enforce `IsAuthenticated` permission
- Query filtering ensures users only see data they own or are members of
- Production config enforces secure cookies and disables DEBUG
- Secrets managed via environment variables — never committed to version control

---

## Roadmap

- [ ] Drag-and-drop Kanban columns
- [ ] Real-time notifications with Django Channels + WebSockets
- [ ] File attachments on tasks (S3)
- [ ] Activity log / audit trail per project
- [ ] Email notifications for task assignments
- [ ] Role-based permissions (Admin, Member, Viewer)
- [ ] Mobile responsive improvements
- [ ] Dark/light theme toggle

---

## Author

**StackWise**  
Portfolio Project 1 — SecureTask  
Built with Django REST Framework + React

---

## License

MIT License — see [LICENSE](LICENSE) for details.