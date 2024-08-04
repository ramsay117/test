# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Structure

src/
├── components/ # Reusable components shared across features
│ ├── Button/
│ │ ├── Button.jsx
│ │ ├── Button.module.css
│ │ └── index.js # Barrel file for easier imports
│ ├── Input/
│ │ ├── Input.jsx
│ │ ├── Input.module.css
│ │ └── index.js
│ └── ... # Other shared components
├── features/ # Feature-specific folders
│ ├── auth/
│ │ ├── components/ # Components specific to auth feature
│ │ ├── hooks/ # Custom hooks related to auth
│ │ ├── pages/ # Pages related to auth (e.g., Login, Signup)
│ │ ├── services/ # API services related to auth
│ │ └── index.js # Export the feature's main components/services
│ ├── dashboard/
│ │ ├── components/ # Components specific to dashboard feature
│ │ ├── pages/ # Pages like DashboardHome, DashboardSettings
│ │ ├── services/ # API services related to dashboard
│ │ └── index.js
│ └── ... # Other features
├── hooks/ # Reusable custom hooks
│ ├── useAuth.js
│ └── useFetch.js
├── contexts/ # React Contexts for global state management
│ ├── AuthContext.js
│ └── ThemeContext.js
├── services/ # API and other services
│ ├── apiClient.js
│ └── authService.js
├── utils/ # Utility functions
│ ├── formatDate.js
│ ├── calculate.js
│ └── index.js
├── assets/ # Static assets like images, fonts, etc.
│ ├── images/
│ ├── fonts/
│ └── ...
├── App.js # Root component
├── index.js # Entry point
├── routes.js # React Router configuration
└── styles/ # Global styles
├── variables.css
└── global.css
