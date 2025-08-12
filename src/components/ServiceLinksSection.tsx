import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack, 
  Paper,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import VerifiedIcon from '@mui/icons-material/Verified';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const ServiceContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.background.default} 0%, 
    ${theme.palette.grey[50]} 50%, 
    ${theme.palette.background.default} 100%)`,
  position: 'relative',
  overflow: 'hidden'
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '20px',
  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12)'
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease'
}));

const FloatingShape = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}06)`,
  animation: 'float 20s ease-in-out infinite'
}));

const ServiceLinksSection: React.FC = () => {
  const services = [
    {
      title: '프로필 관리',
      description: '개인 정보와 경력 사항을 체계적으로 관리하고 AI 분석 결과를 확인하세요',
      icon: <AccountCircleIcon sx={{ fontSize: 32 }} />,
      link: '/profile',
      color: 'primary',
      features: ['개인정보 관리', 'AI 역량 분석', '성장 추천']
    },
    {
      title: '커리어 관리',
      description: '해외사업 경험을 등록하고 AI 기반 역량 분석과 성장 로드맵을 받아보세요',
      icon: <WorkIcon sx={{ fontSize: 32 }} />,
      link: '/career',
      color: 'secondary',
      features: ['경력 등록', '역량 시각화', '성장 로드맵']
    },
    {
      title: '인증서 발급',
      description: 'AI 분석 결과를 바탕으로 공식 경력증명서를 생성하고 관리하세요',
      icon: <WorkspacePremiumIcon sx={{ fontSize: 32 }} />,
      link: '/certification',
      color: 'success',
      features: ['인증서 생성', '템플릿 선택', '다운로드']
    },
    {
      title: '인증서 검증',
      description: 'QR 코드나 인증 번호로 발급된 경력증명서의 진위를 확인하세요',
      icon: <VerifiedIcon sx={{ fontSize: 32 }} />,
      link: '/verify',
      color: 'info',
      features: ['QR 스캔', '코드 검증', '진위 확인']
    }
  ];

  return (
    <ServiceContainer sx={{ py: 12 }}>
      <FloatingShape
        sx={{
          width: 100,
          height: 100,
          top: '10%',
          left: '5%',
          animationDelay: '0s'
        }}
      />
      <FloatingShape
        sx={{
          width: 60,
          height: 60,
          bottom: '15%',
          right: '8%',
          animationDelay: '10s'
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={6}>
          {/* Section Header */}
          <Box textAlign="center">
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                color: 'text.primary',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              서비스 둘러보기
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              글로벌 커리어 링크의 모든 기능을 
              체험해보세요
            </Typography>
          </Box>

          {/* Service Cards */}
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={4}
            sx={{ mb: 6 }}
          >
            {services.map((service, index) => (
              <ServiceCard key={index} elevation={0}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <IconWrapper
                    sx={{
                      background: `linear-gradient(135deg, ${theme => theme.palette[service.color as keyof typeof theme.palette].main}, ${theme => theme.palette[service.color as keyof typeof theme.palette].light})`,
                      color: 'white',
                      mx: 'auto'
                    }}
                  >
                    {service.icon}
                  </IconWrapper>
                  
                  <Typography variant="h5" color="text.primary" sx={{ mb: 2 }}>
                    {service.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {service.description}
                  </Typography>
                  
                  <Stack spacing={1}>
                    {service.features.map((feature, featureIndex) => (
                      <Typography key={featureIndex} variant="caption" color="text.secondary">
                        ✓ {feature}
                      </Typography>
                    ))}
                  </Stack>
                </CardContent>
                
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    component={Link}
                    to={service.link}
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${theme => theme.palette[service.color as keyof typeof theme.palette].main}, ${theme => theme.palette[service.color as keyof typeof theme.palette].dark})`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme => theme.palette[service.color as keyof typeof theme.palette].dark}, ${theme => theme.palette[service.color as keyof typeof theme.palette].main})`,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
                      }
                    }}
                  >
                    시작하기
                  </Button>
                </CardActions>
              </ServiceCard>
            ))}
          </Stack>

          {/* Auth Section */}
          <Box textAlign="center">
            <Paper
              sx={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
                p: 4,
                maxWidth: 500,
                mx: 'auto'
              }}
            >
              <Typography variant="h5" color="text.primary" sx={{ mb: 2 }}>
                지금 바로 시작하세요
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                계정을 만들고 AI 기반 글로벌 커리어 분석을 경험해보세요
              </Typography>
              
              <Stack direction="row" spacing={2}>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  fullWidth
                  startIcon={<PersonAddIcon />}
                  sx={{
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme => theme.palette.primary.dark}, ${theme => theme.palette.secondary.dark})`,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  회원가입
                </Button>
                
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  fullWidth
                  startIcon={<LoginIcon />}
                  sx={{
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
                  로그인
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Stack>
      </Container>
    </ServiceContainer>
  );
};

export default ServiceLinksSection;