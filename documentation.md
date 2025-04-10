# Application Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Core Modules](#core-modules)
3. [Component Structure](#component-structure)
4. [Services](#services)
5. [Types & Interfaces](#types--interfaces)
6. [Utilities](#utilities)
7. [State Management](#state-management)
8. [Validation](#validation)
9. [Best Practices](#best-practices)

## Architecture Overview

### Project Structure
```
src/
├── admin-pages/           # Admin module pages
├── app/                   # Next.js app directory
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── services/             # API services
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── styles/               # Global styles
```

### Key Technologies
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Formik
- React Table
- React Toastify

## Core Modules

### 1. Admin Pages
- **Account Activity**: User activity tracking and logs
- **Account Settings**: User and system configuration
- **Brand Management**: Brand creation and management
- **Store Management**: Store builder and configuration
- **Colors**: Color management system
- **Company**: Company-wide settings and configurations

### 2. Components
- **Table**: Advanced data table with sorting, filtering, pagination
- **Forms**: Form components with validation
- **Modals**: Reusable modal components
- **UI Elements**: Buttons, Inputs, Dropdowns etc.

### 3. Authentication & Authorization
- Role-based access control
- Session management
- Security policies

## Component Structure

### 1. Base Components
```typescript
// Example Button Component Structure
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}
```

### 2. Layout Components
- PageHeader
- Sidebar
- Navigation
- Footer

### 3. Form Components
- Input fields
- Select dropdowns
- Checkboxes
- Radio buttons
- Rich text editor

## Services

### API Service Structure
```typescript
interface IApiService {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: unknown): Promise<T>;
  put<T>(url: string, data: unknown): Promise<T>;
  delete<T>(url: string): Promise<T>;
}
```

### Service Modules
1. **User Service**
   - Authentication
   - Profile management
   - Activity logging

2. **Store Service**
   - Store CRUD operations
   - Configuration management
   - Theme management

3. **Brand Service**
   - Brand management
   - Catalog operations
   - Image handling

## Types & Interfaces

### Common Types
```typescript
interface IPaginationData {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface ISortOption {
  field: string;
  direction: number;
  priority: number;
}

interface IFilterOption {
  columnName: string;
  value: unknown;
}
```

### Module-Specific Types
1. **Brand Types**
2. **Store Types**
3. **User Types**
4. **Settings Types**

## Utilities

### 1. Date Utilities
```typescript
interface IFormattedDate {
  date: string;
  time: string;
}

function getFormatDate(date: string): IFormattedDate;
```

### 2. Validation Utilities
- Form validation schemas
- Input validation helpers
- Error handling utilities

### 3. Common Utilities
- Error handling
- Data formatting
- Type checking

## State Management

### 1. Local State
- React useState for component-level state
- React useReducer for complex state logic

### 2. Form State
- Formik for form state management
- Validation using Yup schemas

### 3. Global State
- Context API for theme/user preferences
- Custom hooks for shared state

## Validation

### 1. Form Validation
```typescript
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});
```

### 2. API Validation
- Request validation
- Response validation
- Error handling

## Best Practices

### 1. Code Organization
- Feature-based folder structure
- Clear separation of concerns
- Consistent naming conventions

### 2. Performance
- Code splitting
- Lazy loading
- Memoization
- Image optimization

### 3. Security
- Input sanitization
- XSS prevention
- CSRF protection
- Secure authentication

### 4. Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast

### 5. Testing
- Unit tests
- Integration tests
- E2E tests
- Component testing

## Development Workflow

### 1. Version Control
- Feature branches
- Pull request workflow
- Code review process

### 2. Documentation
- Code comments
- API documentation
- Component documentation
- Type definitions

### 3. Error Handling
```typescript
try {
  // API calls or operations
} catch (error) {
  toast.error(getErrorMessage(error));
} finally {
  setIsLoading(false);
}
```

### 4. Deployment
- Development environment
- Staging environment
- Production environment
- CI/CD pipeline 