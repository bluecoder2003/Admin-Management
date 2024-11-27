# RBAC Admin Management

A comprehensive Role-Based Access Control (RBAC) system with an intuitive admin dashboard for managing users, roles, and permissions. This project demonstrates modern frontend and backend architecture, focusing on security, usability, and performance.

![Users Dashboard](https://github.com/user-attachments/assets/f7711046-a1bb-40d3-9d8d-73dd4b891285)
![Roles Management](https://github.com/user-attachments/assets/ecc3f19f-3413-4a6a-b2e8-8c441f538af8)

## Features

### Core RBAC Functionality
- **User Management**
  - Complete CRUD operations for user accounts
  - Bulk user actions (activate/deactivate, role assignment) 

- **Role Management**
  - Dynamic role creation and modification
  - Hierarchical role structures
  - Role-based permission inheritance
  - Template roles for quick setup

- **Permission System**
  - Granular permission controls
  - Custom permission groups
  - Resource-level access control
  - Action-based permissions (Create, Read, Update, Delete)

### Additional Features
- **Responsive Admin Dashboard**
  - Mobile-first design approach
  - Real-time updates using React Query
  - Interactive data tables with sorting and filtering
  - Intuitive drag-and-drop interfaces


## Tech Stack

### Frontend
- **Next.js**: Server-side rendering and robust routing
- **Tailwind CSS**: Responsive design system
- **TanStack Query**: Efficient server-state management

### Backend
- **Express**: RESTful API development
- **MySQL**: Relational database for RBAC data
- **Aiven**: Database hosting and management
- **Railway**: Backend deployment platform

### Development Tools
- **Bun**: Fast JavaScript runtime and package manager
- **TypeScript**: Type safety and better developer experience
- **ESLint/Prettier**: Code quality and formatting

## Getting Started

### Prerequisites
- Bun >= 1.0.0
- Node.js >= 18.0.0
- MySQL >= 8.0

### Environment Setup
1. Create a `.env` file in the root directory:
```env
DATABASE_URL=mysql://user:password@host:port/dbname
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/rbac-admin.git
```

2. Install dependencies:
```bash
cd rbac-admin
bun install
```

3. Set up the database:
```bash
bun run db:migrate
bun run db:seed
```

4. Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

### Production Deployment

1. Build the application:
```bash
bun run build
```

2. Start the production server:
```bash
bun run start
```

## Challenges Faced

- **Database Connectivity**: Ensuring seamless integration with the MySQL database hosted on Aiven.
- **Performance Optimization**: Utilizing Bun for faster builds and runtime efficiency.
- **Responsive Design**: Designing a user-friendly admin dashboard for all screen sizes.
- **Deployment**: Smooth backend deployment on Railway, ensuring reliable communication with the frontend.

