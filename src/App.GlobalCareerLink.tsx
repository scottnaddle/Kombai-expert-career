import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from './theme';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import SolutionSection from './components/SolutionSection';
import PersonasSection from './components/PersonasSection';
import AIFeaturesSection from './components/AIFeaturesSection';
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

const App: React.FC = () => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <PersonasSection />
        <AIFeaturesSection />
        <TrustSection />
        <BenefitsSection />
        <CTASection />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;