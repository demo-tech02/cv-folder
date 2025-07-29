# CValue - Career Development Platform

A modern React application for CV enhancement, LinkedIn optimization, and cover letter creation services.

## 📁 Project Structure

```
src/
├── apis/                    # API services and data fetching
│   ├── base.ts             # Base API configuration
│   ├── resume.ts           # Resume-related API calls
│   ├── coverLetter.ts      # Cover letter API calls
│   └── index.ts            # API exports
├── components/             # Reusable UI components
│   ├── ui/                 # Generic UI components
│   │   ├── PaymentModal.tsx
│   │   └── index.ts
│   ├── HomePage.tsx
│   ├── OrderPage.tsx
│   ├── PreviewPage.tsx
│   ├── CoverLetterPreview.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── config/                 # Configuration files
│   └── env.ts             # Environment variables
├── constants/              # Application constants
│   └── index.ts
├── contexts/               # React contexts
│   ├── ThemeContext.tsx
│   ├── LanguageContext.tsx
│   └── index.ts
├── data/                   # Static data and content
│   └── content.ts
├── routes/                 # Route components and routing logic
│   ├── AppRouter.tsx
│   ├── HomePage.tsx
│   ├── OrderPage.tsx
│   ├── PreviewPage.tsx
│   ├── CoverLetterPreviewPage.tsx
│   └── index.ts
├── types/                  # TypeScript type definitions
│   └── index.ts
├── utils/                  # Utility functions
│   ├── validation.ts
│   ├── helpers.ts
│   └── index.ts
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## 🏗️ Architecture Overview

### **APIs Folder (`src/apis/`)**
- **Purpose**: Centralized API management and data fetching
- **Structure**:
  - `base.ts`: Axios configuration, interceptors, and common request utilities
  - `resume.ts`: Resume upload, download, and image preview services
  - `coverLetter.ts`: Cover letter generation and management
  - `index.ts`: Centralized exports for all API services

### **Components Folder (`src/components/`)**
- **Purpose**: Reusable UI components
- **Structure**:
  - `ui/`: Generic, reusable UI components (modals, buttons, etc.)
  - Page-specific components (HomePage, OrderPage, etc.)
  - Layout components (Header, Footer)

### **Config Folder (`src/config/`)**
- **Purpose**: Environment configuration and app settings
- **Features**:
  - Type-safe environment variable access
  - Validation for required environment variables
  - Centralized configuration management

### **Routes Folder (`src/routes/`)**
- **Purpose**: Routing logic and route-specific components
- **Structure**:
  - `AppRouter.tsx`: Main routing configuration
  - Route wrapper components that import and render page components
  - Centralized route management

### **Contexts Folder (`src/contexts/`)**
- **Purpose**: React context providers for global state
- **Features**:
  - Theme management (dark/light mode)
  - Language management (Arabic/English)
  - Persistent state with localStorage

### **Utils Folder (`src/utils/`)**
- **Purpose**: Utility functions and helpers
- **Structure**:
  - `validation.ts`: Form and data validation functions
  - `helpers.ts`: Common helper functions (formatting, device detection, etc.)

## 🔧 Environment Configuration

Create a `.env` file in the root directory:

```env
# Application Configuration
VITE_APP_NAME=CValue
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development

# API Configuration
VITE_API_BASE_URL=https://your-api-url.com
VITE_IMAGES_API_URL=https://your-images-api-url.com

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
```

## 🚀 Key Features

### **Type-Safe Environment Variables**
```typescript
import { env } from '../config/env';

// Type-safe access to environment variables
const apiUrl = env.API_BASE_URL;
```

### **Centralized API Management**
```typescript
import { ResumeApiService, CoverLetterApiService } from '../apis';

// Upload resume with progress tracking
const response = await ResumeApiService.uploadResume(file, setProgress);
```

### **Reusable UI Components**
```typescript
import { PaymentModal } from '../components/ui';

// Reusable payment modal with validation
<PaymentModal
  isOpen={showModal}
  onPaymentSuccess={handleSuccess}
  amount={10}
/>
```

### **Global State Management**
```typescript
import { useTheme, useLanguage } from '../contexts';

// Access global theme and language state
const { isDarkMode, toggleDarkMode } = useTheme();
const { language, toggleLanguage } = useLanguage();
```

## 📦 Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

## 🛠️ Development Guidelines

### **Adding New API Services**
1. Create service class in `src/apis/`
2. Export from `src/apis/index.ts`
3. Use base API configuration for consistency

### **Creating New Components**
1. Place in appropriate subfolder in `src/components/`
2. Use TypeScript interfaces for props
3. Follow existing naming conventions

### **Adding New Routes**
1. Create route component in `src/routes/`
2. Add route to `AppRouter.tsx`
3. Update constants if needed

### **Environment Variables**
1. Add to `.env` file with `VITE_` prefix
2. Update `src/config/env.ts` interface
3. Use type-safe access throughout app

## 🔍 Best Practices

- **Separation of Concerns**: Each folder has a specific purpose
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Error Handling**: Centralized error handling in API layer
- **Validation**: Reusable validation functions
- **Performance**: Lazy loading and code splitting where appropriate
- **Accessibility**: ARIA labels and keyboard navigation support
- **Internationalization**: Multi-language support with context

This structure provides a scalable, maintainable foundation for the CValue application with clear separation of concerns and modern React best practices.