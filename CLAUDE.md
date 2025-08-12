# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
- `npm run dev` - Start Vite development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview built app locally
- `npm run lint` - Run ESLint on all files

**TypeScript checking:**
No dedicated typecheck command defined. Use `npx tsc --noEmit` for manual type checking if needed.

## Architecture

### Overview
This is a React 19 + TypeScript + Vite application for the "Global Career Link" (글로벌 커리어 링크) platform - an AI-powered career verification service for overseas business professionals.

### Entry Points
- **HTML**: `index.html` mounts app at `#root`
- **Main**: `src/main.tsx` wraps with error boundary and KombaiWrapper
- **App**: `src/App.GlobalCareerLink.tsx` is the root component with Redux Provider and routing
- **Demo**: `src/App.ThirdDepthInterfaces.tsx` showcases all third-depth UI components with mock data

### Project Structure
```
src/
├── App.GlobalCareerLink.tsx    # Main app with Redux Provider and routing
├── theme.ts                    # MUI theme configuration
├── store/                      # Redux state management
│   ├── index.ts               # Store configuration
│   ├── hooks.ts               # Typed Redux hooks
│   └── slices/                # Redux slices
│       ├── authSlice.ts       # Authentication state
│       ├── profileSlice.ts    # User profile state
│       └── careerSlice.ts     # Career management state
├── components/                # Landing page sections + specialized components
│   ├── NavigationHeader.tsx
│   ├── HeroSection.tsx
│   ├── ProblemSection.tsx
│   ├── SolutionSection.tsx
│   ├── PersonasSection.tsx
│   ├── AIFeaturesSection.tsx
│   ├── ServiceLinksSection.tsx
│   ├── TrustSection.tsx
│   ├── BenefitsSection.tsx
│   ├── CTASection.tsx
│   ├── analytics/            # Analytics and reporting UI
│   ├── career/               # Career management components
│   ├── certification/        # Certificate creation/management
│   ├── profile/              # Profile and education management
│   └── verification/         # Certificate verification UI
├── mockData/                 # Mock data for development and demos
│   └── thirdDepthMockData.ts # Third-depth component mock data
└── pages/                     # App pages (lazy-loaded)
    ├── Login.tsx              # Enhanced with social login UI
    ├── Signup.tsx             # Enhanced with terms/privacy
    ├── Profile.tsx            # Enhanced with AI analysis
    ├── Career.tsx             # Enhanced with charts/analytics
    ├── Certification.tsx      # Full certificate management
    └── VerifyCertificate.tsx  # Certificate verification system
```

### Technology Stack
- **React 19** with automatic JSX runtime
- **TypeScript** with strict configuration
- **Material-UI v7** with Emotion styling
- **React Router v7** with lazy loading for pages
- **Redux Toolkit** with React Redux for state management and async thunks
- **Recharts** for data visualization and analytics
- **Vite** for build tooling
- **ESLint** for code quality

### State Management Architecture
- **Redux Toolkit** with typed hooks and async thunks
- **Authentication Flow**: JWT token management with localStorage persistence
- **Protected Routes**: Route guards based on authentication state
- **Error Handling**: Global error states with user-friendly messages
- **Loading States**: Granular loading indicators for better UX

### Enhanced Features Implemented
- **Social Authentication UI**: Google and LinkedIn login buttons (UI only)
- **Advanced Profile Management**: Enhanced with AI competency analysis display
- **Career Analytics**: Interactive charts showing skills and competency mapping
- **Certificate Management**: Multi-step certificate creation workflow
- **Certificate Verification**: QR code scanning and verification UI
- **Glassmorphism Design**: Modern UI with backdrop filters and floating elements

### Routing & Navigation
App uses React Router with:
- `/` - Enhanced landing page with navigation header
- `/login` - Social login options, password visibility toggle
- `/signup` - Terms/privacy checkboxes, enhanced validation
- `/profile` - AI analysis sidebar, enhanced form fields
- `/career` - Analytics dashboard with charts
- `/certification` - Certificate management with stepper UI
- `/verify` - Certificate verification with mock data

### Styling & UI Patterns
- **Glassmorphism**: Consistent use of backdrop-blur and translucent backgrounds
- **Floating Animations**: CSS animations for visual appeal
- **Gradient Overlays**: Consistent gradient patterns across components
- **Enhanced Forms**: Input adornments, password toggles, validation states
- **Chart Integration**: Recharts for bar charts and radar charts
- **Responsive Design**: Mobile-first approach with breakpoint-aware layouts

### Development Guidelines from .cursor/rules
Key patterns from the Cursor rules:
- **Project Structure**: Sections pattern for landing page components
- **MUI + Emotion**: Consistent styled components with theme integration
- **React + TypeScript**: Function components with explicit prop typing
- **Error Boundary**: Wrapped at app level with Kombai error boundary
- **Sections Pattern**: Each section is presentational and composed in main app

### Business Context (PRD Integration)
Based on PRD specifications, this implements a Korean AI-powered career verification service:
- **Target Users**: Overseas business professionals, enterprises, government agencies
- **Core Value**: AI-based competency analysis and standardized career verification
- **Tier 1 MVP**: Profile management, career tracking, certificate generation
- **Project-Based Tracking**: Detailed project history with country/industry tagging
- **AI Features**: Competency visualization and career development recommendations

### Implementation Status
✅ **Authentication System**: Complete with social login UI and validation
✅ **Profile Management**: Enhanced with AI analysis and professional credentials
✅ **Career Management**: Full analytics with charts and project-based tracking
✅ **Certificate Management**: Multi-step creation workflow with templates
✅ **Certificate Verification**: Complete UI with QR scanning and validation
✅ **Data Visualization**: Charts for competency analysis and career metrics
✅ **Responsive Design**: Mobile-optimized across all pages

### Redux State Structure
```typescript
{
  auth: {
    user: User | null,
    token: string | null,
    isLoading: boolean,
    error: string | null
  },
  profile: {
    profile: Profile | null,
    isLoading: boolean,
    error: string | null
  },
  career: {
    experiences: CareerExperience[],
    isLoading: boolean,
    error: string | null
  }
}
```

### Mock Data Integration
For development and testing:
- Certificate verification returns mock validated certificates
- AI analysis shows sample competency data
- Career charts display mock analytics
- Social login buttons show console logs (backend integration pending)
- Third-depth components use comprehensive mock data from `src/mockData/thirdDepthMockData.ts`
- Demo interface (`App.ThirdDepthInterfaces.tsx`) showcases all specialized components

### API Integration Points (To Be Implemented)
- `POST /api/auth/login` - User authentication
- `POST /api/auth/signup` - User registration  
- `GET/PUT /api/profile` - Profile management
- `GET/POST/PUT/DELETE /api/career` - Career management
- `POST /api/certificates/create` - Certificate generation
- `GET /api/certificates/verify/:id` - Certificate verification
- `GET /api/ai/competency-analysis` - AI analysis endpoints