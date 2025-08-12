import React from 'react';
import { ThemeProvider, CssBaseline, Container, Typography, Stack, Box, Divider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import theme from './theme';

// Import components
import ProjectDetailCard from './components/career/ProjectDetailCard';
import SkillTestCard from './components/career/SkillTestCard';
import EducationManagement from './components/profile/EducationManagement';
import TemplateCustomizer from './components/certification/TemplateCustomizer';
import VerificationCenter from './components/verification/VerificationCenter';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';

// Import mock data
import {
  mockProjectDetails,
  mockSkillAssessment,
  mockEducationDetails,
  mockLanguageTests,
  mockTemplateCustomization,
  mockVerificationRequests,
  mockSecuritySettings,
  mockVerificationHistory,
  mockVerificationAnalytics,
  mockCareerTimeline,
  mockAnalyticsData
} from './mockData/thirdDepthMockData';

const createEmotionCache = () => {
  return createCache({
    key: "mui",
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

const SectionHeader: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h4" color="text.primary" sx={{ mb: 1 }}>
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {description}
    </Typography>
  </Box>
);

const App: React.FC = () => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            background: `linear-gradient(135deg, 
              ${theme.palette.primary.main}08 0%, 
              ${theme.palette.secondary.main}06 25%, 
              ${theme.palette.info.main}04 50%, 
              ${theme.palette.primary.main}06 75%, 
              ${theme.palette.secondary.main}08 100%)`,
            py: 4
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={6}>
              {/* Header */}
              <Box textAlign="center" sx={{ mb: 6 }}>
                <Typography variant="h2" color="text.primary" sx={{ mb: 2 }}>
                  3차 심화 인터페이스
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Global Career Link 고급 기능 및 관리 도구
                </Typography>
              </Box>

              {/* Career Management Section */}
              <Box>
                <SectionHeader
                  title="커리어 관리 시스템"
                  description="프로젝트 상세 관리, 스킬 평가, 커리어 타임라인 등 종합적인 커리어 관리 도구"
                />
                
                <Stack spacing={4}>
                  {/* Project Detail Management */}
                  <Box>
                    <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                      프로젝트 상세 관리
                    </Typography>
                    <ProjectDetailCard
                      project={mockProjectDetails}
                      onProjectUpdate={(project) => console.log('Project updated:', project)}
                    />
                  </Box>

                  {/* Skill Assessment */}
                  <Box>
                    <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                      스킬 평가 테스트
                    </Typography>
                    <SkillTestCard
                      assessment={mockSkillAssessment}
                      onTestStart={(testId) => console.log('Test started:', testId)}
                      onTestComplete={(result) => console.log('Test completed:', result)}
                    />
                  </Box>
                </Stack>
              </Box>

              <Divider />

              {/* Profile Management Section */}
              <Box>
                <SectionHeader
                  title="프로필 관리 시스템"
                  description="학력 관리, 언어 능력 테스트, 개인 브랜딩 도구 등 프로필 고도화 기능"
                />
                
                <Box>
                  <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                    학력 상세 관리
                  </Typography>
                  <EducationManagement
                    educations={mockEducationDetails}
                    onEducationAdd={(education) => console.log('Education added:', education)}
                    onEducationUpdate={(education) => console.log('Education updated:', education)}
                    onTranscriptUpload={(file) => console.log('Transcript uploaded:', file)}
                  />
                </Box>
              </Box>

              <Divider />

              {/* Certification Management Section */}
              <Box>
                <SectionHeader
                  title="인증서 관리 시스템"
                  description="템플릿 커스터마이징, 검증 관리, 공유 도구 등 인증서 전문 관리 기능"
                />
                
                <Box>
                  <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                    템플릿 커스터마이저
                  </Typography>
                  <TemplateCustomizer