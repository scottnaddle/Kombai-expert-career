import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}15 0%, 
    ${theme.palette.secondary.main}10 25%, 
    ${theme.palette.info.main}08 50%, 
    ${theme.palette.primary.main}12 75%, 
    ${theme.palette.secondary.main}15 100%)`,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url('https://images.unsplash.com/photo-1573497701175-00c200fd57f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbHMlMjBvZmZpY2UlMjBjb2xsYWJvcmF0aW9uJTIwaW50ZXJuYXRpb25hbCUyMHRlYW18ZW58MHwwfHxibHVlfDE3NTQ5Nzc3MzB8MA&ixlib=rb-4.1.0&q=85')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1,
    zIndex: 0
  }
}));

const GlassCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  position: 'relative',
  zIndex: 1,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 64px rgba(0, 0, 0, 0.15)'
  }
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
  animation: 'float 6s ease-in-out infinite',
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' }
  }
}));

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <FloatingElement
        sx={{
          width: 120,
          height: 120,
          top: '10%',
          right: '15%',
          animationDelay: '0s'
        }}
      />
      <FloatingElement
        sx={{
          width: 80,
          height: 80,
          bottom: '20%',
          left: '10%',
          animationDelay: '2s'
        }}
      />
      <FloatingElement
        sx={{
          width: 60,
          height: 60,
          top: '60%',
          right: '25%',
          animationDelay: '4s'
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={6}
          alignItems="center"
          sx={{ minHeight: '80vh' }}
        >
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h1"
              sx={{
                background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              AI 기반 해외사업 전문가
              <br />
              경력 인증 플랫폼
            </Typography>
            
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600, lineHeight: 1.6 }}
            >
              분산된 경력을 통합하고, AI가 분석한 역량으로 
              글로벌 커리어의 새로운 가능성을 발견하세요
            </Typography>
            
            <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<PsychologyIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme => theme.palette.primary.dark}, ${theme => theme.palette.secondary.dark})`,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)'
                  }
                }}
              >
                AI 역량 분석 시작하기
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                startIcon={<TrendingUpIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '12px',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                경력 증명서 발급
              </Button>
            </Stack>
            
            <Typography variant="body2" color="text.secondary">
              ✓ KOSA 시스템 벤치마킹 &nbsp;&nbsp; ✓ 정부 인증 기반 &nbsp;&nbsp; ✓ AI 기반 역량 분석
            </Typography>
          </Box>
          
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <GlassCard sx={{ maxWidth: 400, width: '100%' }}>
              <Stack spacing={3} alignItems="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.info.main})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <PsychologyIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                
                <Typography variant="h6" color="text.primary" textAlign="center">
                  AI 역량 맵핑
                </Typography>
                
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  프로젝트 경험을 입력하면 AI가 자동으로 핵심 역량을 추출하고 
                  시각화하여 강점과 약점을 한눈에 파악할 수 있습니다
                </Typography>
                
                <Box sx={{ width: '100%', height: 4, borderRadius: 2, bgcolor: 'grey.200', overflow: 'hidden' }}>
                  <Box
                    sx={{
                      width: '75%',
                      height: '100%',
                      background: `linear-gradient(90deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.info.main})`,
                      borderRadius: 2,
                      animation: 'progress 2s ease-in-out',
                      '@keyframes progress': {
                        '0%': { width: '0%' },
                        '100%': { width: '75%' }
                      }
                    }}
                  />
                </Box>
              </Stack>
            </GlassCard>
          </Box>
        </Stack>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;