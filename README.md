# Business Accelerator Platform

A comprehensive full-stack business accelerator platform built with React, Node.js, and TypeScript. This platform helps entrepreneurs validate, develop, and scale their business ideas through AI-powered analysis, mentorship connections, investor matching, and community support.

## 🚀 Features

### Core Platform Features
- **User Authentication**: Secure registration, login, and profile management
- **Dashboard**: Comprehensive overview of business progress and metrics
- **Business Profile Management**: Detailed business information and planning tools

### AI-Powered Tools
- **Pitch Analysis**: AI-driven analysis of business pitches with actionable feedback
- **Business Validation**: Automated validation of business models and ideas
- **Market Analysis**: Insights and competitive analysis tools

### Networking & Growth
- **Mentorship Platform**: Connect with experienced mentors in your industry
- **Investor Connections**: Find and connect with potential investors
- **Funding Opportunities**: Discover grants, loans, and investment opportunities
- **Community Hub**: Connect with other entrepreneurs and share experiences

### Technical Features
- **Real-time Communication**: WebSocket integration for live chat and notifications
- **Responsive Design**: Mobile-first design with Material-UI components
- **Form Validation**: Comprehensive form validation with React Hook Form
- **Animations**: Smooth animations with Framer Motion
- **Toast Notifications**: User-friendly feedback with react-hot-toast

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI v6** for component library
- **React Router v6** for navigation
- **React Hook Form** for form management
- **Framer Motion** for animations
- **Socket.io Client** for real-time features
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Socket.io** for real-time communication
- **JWT** for authentication
- **Bcrypt** for password hashing
- **CORS** for cross-origin requests

### Development Tools
- **Vite** for fast development builds
- **ESLint** & **Prettier** for code quality
- **Concurrently** for running multiple scripts

## 📦 Project Structure

```
business-accelerator/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth, Socket)
│   │   ├── pages/         # Application pages
│   │   ├── types/         # TypeScript type definitions
│   │   └── App.tsx        # Main application component
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend application
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── middleware/    # Custom middleware
│   │   └── server.ts      # Express server setup
│   └── package.json       # Backend dependencies
└── package.json           # Root package configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd business-accelerator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

This will start both the frontend (http://localhost:3000) and backend (http://localhost:5000) concurrently.

### Available Scripts

- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build the entire application for production
- `npm run test` - Run all tests
- `npm run client` - Start only the frontend development server
- `npm run server` - Start only the backend development server

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=your_database_url

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Client Configuration
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
```

## 📱 Pages & Features

### Public Pages
- **Home**: Landing page with platform overview
- **Login**: User authentication
- **Register**: New user registration

### Protected Pages (Requires Authentication)
- **Dashboard**: Personal business overview and metrics
- **Business Profile**: Manage business information and details
- **Pitch Analysis**: AI-powered pitch analysis and feedback
- **Mentorship**: Connect with mentors and manage relationships
- **Investors**: Find and connect with potential investors
- **Funding**: Explore funding opportunities and grants
- **Community**: Connect with other entrepreneurs

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Theme**: Modern dark theme with Material-UI theming
- **Smooth Animations**: Enhanced user experience with Framer Motion
- **Toast Notifications**: Real-time feedback for user actions
- **Form Validation**: Comprehensive validation with helpful error messages
- **Loading States**: Proper loading indicators throughout the application

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Route-level authentication guards
- **CORS Configuration**: Proper cross-origin request handling
- **Password Hashing**: Secure password storage with bcrypt
- **Input Validation**: Frontend and backend input validation

## 🚀 Deployment

The application is configured for easy deployment on platforms like Vercel, Netlify, or Heroku.

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set up environment variables in Vercel dashboard
3. Configure build settings for monorepo structure
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- React team for the amazing framework
- All contributors and supporters of this project

---

**Built with ❤️ for entrepreneurs worldwide**