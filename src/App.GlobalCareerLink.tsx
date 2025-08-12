import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import { Provider } from 'react-redux';
import createCache from '@emotion/cache';
import theme from './theme';
import { store } from './store';
import NavigationHeader from './components/NavigationHeader';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import PersonasSection from './components/PersonasSection';
import AIFeaturesSection from './components/AIFeaturesSection';
import ServiceLinksSection from './components/ServiceLinksSection';
import TrustSection from './components/TrustSection';
import BenefitsSection from './components/BenefitsSection';
import CTASection from './components/CTASection';

const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

const Landing: React.FC = () => (
  <>
    <NavigationHeader />
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <PersonasSection />
    <AIFeaturesSection />
    <ServiceLinksSection />
    <TrustSection />
    <BenefitsSection />
    <CTASection />
  </>
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<React.Suspense fallback={null}><LoginPageLazy /></React.Suspense>} />
              <Route path="/signup" element={<React.Suspense fallback={null}><SignupPageLazy /></React.Suspense>} />
              <Route path="/profile" element={<React.Suspense fallback={null}><ProfilePageLazy /></React.Suspense>} />
              <Route path="/career" element={<React.Suspense fallback={null}><CareerPageLazy /></React.Suspense>} />
              <Route path="/certification" element={<React.Suspense fallback={null}><CertificationPageLazy /></React.Suspense>} />
              <Route path="/verify" element={<React.Suspense fallback={null}><VerifyCertificatePageLazy /></React.Suspense>} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
};

const LoginPageLazy = React.lazy(() => import('./pages/Login'));
const SignupPageLazy = React.lazy(() => import('./pages/Signup'));
const ProfilePageLazy = React.lazy(() => import('./pages/Profile'));
const CareerPageLazy = React.lazy(() => import('./pages/Career'));
const CertificationPageLazy = React.lazy(() => import('./pages/Certification'));
const VerifyCertificatePageLazy = React.lazy(() => import('./pages/VerifyCertificate'));

export default App;