# Biliku React - Room Rental Platform

A modern React application for room rentals in Sarawak, built with AWS Amplify, Material-UI, and TypeScript.

## ✨ Features

- **Clean Architecture**: Built with React 18, TypeScript, and modern development practices
- **AWS Amplify Integration**: Authentication, GraphQL API, and S3 storage
- **Material-UI Design**: Modern, responsive UI with Material Design
- **State Management**: Zustand for client state, React Query for server state
- **Build System**: Vite for fast development and optimized production builds

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Material-UI v5
- **Authentication**: AWS Amplify Auth with Cognito
- **API**: AWS AppSync GraphQL
- **Storage**: AWS S3
- **State**: Zustand + React Query
- **Build**: Vite
- **Deployment**: AWS Amplify Hosting

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── layout/         # Layout components (Header, Footer)
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🔧 Development

### Prerequisites

- Node.js 18+
- AWS CLI configured
- Amplify CLI installed

### Environment Setup

1. Copy environment template:
```bash
cp .env.example .env
```

2. Configure your AWS Amplify settings in `.env`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

## 🔐 Authentication

The app uses AWS Amplify Auth with:
- Email/password authentication
- Google social login
- User attributes: email, name, gender, phone

## 📱 Pages

- **Home**: Landing page with features
- **Listings**: Room listings grid
- **Room Details**: Detailed room view
- **Profile**: User profile and account management
- **Login**: Authentication flow

## 🚀 Deployment

The app is configured for AWS Amplify hosting:

1. Connect your repository to AWS Amplify
2. The `amplify.yml` file configures the build process
3. Automatic deployments on push to main branch

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📚 Documentation

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Material-UI Documentation](https://mui.com/)
- [React Query Documentation](https://tanstack.com/query/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, create an issue in the repository or contact the development team.