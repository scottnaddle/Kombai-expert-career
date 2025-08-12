import React from 'react';
import { Box, Container, Typography, Stack, Card, CardContent, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '20px',
  background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
  border: '1px solid rgba(229, 231, 235, 0.6)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12)',
    '& .feature-icon': {
      transform: 'scale(1.1) rotate(5deg)'
    }
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '20px',
    padding: '2px',
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    maskComposite: 'xor'
  }
}));

const TierBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  fontWeight: 600,
  fontSize: '0.75rem'
}));

const SolutionSection: React.FC = () => {
  const features = [
    {
      tier: 'Tier 1',
      tierColor: 'success',
      icon: <VerifiedIcon fontSize="large" />,
      title: '경력 등록 및 인증',
      subtitle: 'MVP 핵심 기능',
      description: '해외사업 분야의 파편화된 경력을 통합하여 공신력 있는 표준 증명 체계를 구축합니다.',
      features: ['프로필 생성 및 기본 정보 등록', '경력 상세 등록 (프로젝트 기반)', '경력 증빙 자료 업로드', '경력 인증서 발급'],
      gradient: 'linear-gradient(135deg, #10B981, #059669)'
    },
    {
      tier: 'Tier 2',
      tierColor: 'primary',
      icon: <PsychologyIcon fontSize="large" />,
      title: 'AI 기반 역량 분석',
      subtitle: '차별화 기능',
      description: 'AI 기술을 활용하여 개인의 잠재 역량을 발굴하고 최적의 경력 개발 경로를 제시합니다.',
      features: ['AI 역량 키워드 추출', '맞춤형 경력 개발 로드맵', '글로벌 비즈니스 정보 챗봇', '역량 맵 시각화'],
      gradient: 'linear-gradient(135deg, #2563EB, #7C3AED)'
    },
    {
      tier: 'Tier 3',
      tierColor: 'secondary',
      icon: <AssessmentOutlinedIcon fontSize="large" />,
      title: '기업 및 생태계 서비스',
      subtitle: '생태계 확장',
      description: 'B2B 및 B2G 서비스로 수익 모델을 다각화하고 산업 생태계에 기여합니다.',
      features: ['지능형 인재 검색 서비스', '산업 인력 리포트', '정부 정책 지원 데이터', '기업 맞춤 솔루션'],
      gradient: 'linear-gradient(135deg, #7C3AED, #06B6D4)'
    }
  ];

  return (
    <Box sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack spacing={8}>
          <Box textAlign="center">
            <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
              <Chip
                icon={<AutoAwesomeIcon />}
                label="AI 기반 솔루션"
                color="primary"
                variant="outlined"
                sx={{ borderRadius: '20px', px: 2 }}
              />
            </Stack>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                color: 'text.primary',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              3단계 통합 솔루션
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
            >
              단순한 경력 증명을 넘어 AI 기반 역량 분석과 성장 가이드를 제공하는 
              차세대 커리어 플랫폼입니다
            </Typography>
          </Box>

          <Stack spacing={4}>
            {features.map((feature, index) => (
              <FeatureCard key={index} elevation={0}>
                <TierBadge
                  label={feature.tier}
                  color={feature.tierColor as any}
                  variant="filled"
                />
                <CardContent sx={{ p: 4 }}>
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={4}
                    alignItems={{ xs: 'center', md: 'flex-start' }}
                  >
                    <IconWrapper
                      className="feature-icon"
                      sx={{
                        background: feature.gradient,
                        color: 'white',
                        flexShrink: 0
                      }}
                    >
                      {feature.icon}
                    </IconWrapper>
                    
                    <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                      <Typography variant="h4" color="text.primary" sx={{ mb: 1 }}>
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary.main"
                        sx={{ mb: 2, fontWeight: 500 }}
                      >
                        {feature.subtitle}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 3, lineHeight: 1.7 }}
                      >
                        {feature.description}
                      </Typography>
                      
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        justifyContent={{ xs: 'center', md: 'flex-start' }}
                      >
                        {feature.features.map((item, idx) => (
                          <Chip
                            key={idx}
                            label={item}
                            variant="outlined"
                            size="small"
                            sx={{
                              borderRadius: '16px',
                              mb: 1,
                              '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                                borderColor: 'primary.main'
                              }
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </FeatureCard>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default SolutionSection;