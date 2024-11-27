# Admin Management

This project is a basic CRUD application focused on user management from the admin side. Built using a modern tech stack, it ensures high performance, scalability, and maintainability.
<img width="1470" alt="Screenshot 2024-11-28 at 1 16 30 AM" src="https://github.com/user-attachments/assets/66504ba3-fcde-410b-834b-5493c0286576">

## Tech Stack

### Frontend
- **Next.js**: For server-side rendering and building the frontend application.
- **Tailwind CSS**: For modern, utility-first styling and responsive design.
- **TanStack Query (React Query)**: For data management and server-state synchronization.

### Backend
- **Express**: For building the backend API and handling server-side logic.
- **MySQL**: For database management.
- **Aiven**: For hosting and connecting to the MySQL database.
- **Railway**: For deploying the backend services.

### Package Manager & Runtime
- **Bun**: For running the application and managing dependencies, offering faster builds and execution.

## Project Features

- **User Management**: Admins can perform CRUD operations for users.
- **Responsive Admin Dashboard**: User-friendly interface optimized for all devices.
- **Efficient Data Fetching**: Leveraging React Query for seamless server-state synchronization.

## Getting Started

### Prerequisites
- **Bun** (>= 1.x)
- **MySQL Server** (if running locally)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/admin-management.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd admin-management
   ```

3. **Install Dependencies**

   ```bash
   bun install
   ```

4. **Set Up Environment Variables**  
   Create a `.env` file in the root directory with the following:

   ```env
   DATABASE_URL=<your_mysql_connection_string>
   ```

5. **Run the Development Server**

   ```bash
   bun run dev
   ```

   The application will be available at `http://localhost:3000`.

### Building for Production

1. **Build the Project**

   ```bash
   bun run build
   ```

2. **Start the Production Server**

   ```bash
   bun run start
   ```

## Challenges Faced

- **Database Connectivity**: Ensuring seamless integration with the MySQL database hosted on Aiven.
- **Performance Optimization**: Utilizing Bun for faster builds and runtime efficiency.
- **Responsive Design**: Designing a user-friendly admin dashboard for all screen sizes.
- **Deployment**: Smooth backend deployment on Railway, ensuring reliable communication with the frontend.

## Contributing
