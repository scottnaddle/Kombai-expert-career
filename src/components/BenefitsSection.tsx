import React from 'react';
import { Box, Container, Typography, Stack, Card, CardContent, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const BenefitCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '24px',
  background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
  border: '1px solid rgba(229, 231, 235, 0.6)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.12)',
    '& .benefit-icon': {
      transform: 'scale(1.1)',
      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
    }
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  color: 'white'
}));

const MetricBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.info.main}08)`,
  border: `1px solid ${theme.palette.primary.main}20`,
  textAlign: 'center',
  marginTop: theme.spacing(2)
}));

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      category: '개인 전문가',
      icon: <PersonIcon fontSize="large" />,
      iconBg: 'linear-gradient(135deg, #10B981, #059669)',
      title: '역량 증명 & 성장 가이드',
      description: 'AI 분석을 통한 객관적 역량 평가와 맞춤형 경력 개발 로드맵을 제공받으세요',
      benefits: [
        '공신력 있는 경력 증명서 발급',
        'AI 기반 역량 분석 및 시각화',
        '개인 맞춤형 성장 로드맵 제공',
        '글로벌 비즈니스 정보 챗봇 지원'
      ],
      metrics: [
        { label: '역량 분석 정확도', value: '95%' },
        { label: '경력 증명 발급 시간', value: '즉시' }
      ]
    },
    {
      category: '기업',
      icon: <BusinessIcon fontSize="large" />,
      iconBg: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
      title: '검증된 인재 발굴',
      description: '다차원 검색으로 정확한 역량을 가진 검증된 해외사업 전문가를 빠르게 찾으세요',
      benefits: [
        '지능형 인재 검색 서비스',
        '실시간 경력 검증 시스템',
        '역량 기반 매칭 알고리즘',
        '채용 프로세스 효율화'
      ],
      metrics: [
        { label: '채용 시간 단축', value: '70%' },
        { label: '검증 정확도', value: '98%' }
      ]
    },
    {
      category: '정부 기관',
      icon: <AccountBalanceIcon fontSize="large" />,
      iconBg: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
      title: '정책 수립 지원',
      description: '체계적인 인력 데이터 분석을 통해 효과적인 해외사업 정책 수립을 지원합니다',
      benefits: [
        '산업별 인력 현황 통계',
        '지역별 전문가 분포 분석',
        '정책 효과 예측 모델링',
        '인력 수급 계획 수립 지원'
      ],
      metrics: [
        { label: '데이터 커버리지', value: '전국' },
        { label: '분석 리포트', value: '실시간' }
      ]
    }
  ];

  return (
    <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Stack spacing={8}>
          <Box textAlign="center">
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                color: 'text.primary',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              모든 이해관계자를 위한 가치
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
            >
              개인, 기업, 정부 모두에게 실질적인 혜택을 제공하는 
              통합 생태계를 구축합니다
            </Typography>
          </Box>

          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            spacing={4}
            sx={{ mt: 6 }}
          >
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} elevation={0}>
                <CardContent sx={{ p: 4, height: '100%' }}>
                  <Stack spacing={3} height="100%">
                    <Box>
                      <IconContainer
                        className="benefit-icon"
                        sx={{ background: benefit.iconBg }}
                      >
                        {benefit.icon}
                      </IconContainer>
                      
                      <Typography
                        variant="subtitle1"
                        color="primary.main"
                        fontWeight="600"
                        sx={{ mb: 1 }}
                      >
                        {benefit.category}
                      </Typography>
                      
                      <Typography variant="h5" color="text.primary" sx={{ mb: 2 }}>
                        {benefit.title}
                      </Typography>
                      
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        lineHeight={1.6}
                        sx={{ mb: 3 }}
                      >
                        {benefit.description}
                      </Typography>
                    </Box>

                    <Stack spacing={1} sx={{ flex: 1 }}>
                      {benefit.benefits.map((item, idx) => (
                        <Stack key={idx} direction="row" spacing={1} alignItems="center">
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              bgcolor: 'primary.main'
                            }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {item}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ mt: 'auto' }}>
                      {benefit.metrics.map((metric, idx) => (
                        <MetricBox key={idx} sx={{ flex: 1 }}>
                          <Typography variant="h6" color="primary.main" fontWeight="bold">
                            {metric.value}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {metric.label}
                          </Typography>
                        </MetricBox>
                      ))}
                    </Stack>
                  </Stack>
                </CardContent>
              </BenefitCard>
            ))}
          </Stack>

          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Paper
              sx={{
                p: 6,
                borderRadius: '24px',
                background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}08, ${theme => theme.palette.secondary.main}05)`,
                border: `1px solid ${theme => theme.palette.primary.main}20`
              }}
              elevation={0}
            >
              <Typography variant="h4" color="text.primary" sx={{ mb: 3 }}>
                🌐 글로벌 스탠다드 구축
              </Typography>
              <Typography variant="body1" color="text.secondary" lineHeight={1.7} sx={{ maxWidth: 800, mx: 'auto' }}>
                우리의 목표는 단순한 국내 서비스를 넘어, 아시아 태평양 지역의 
                해외사업 전문가 인증 표준을 선도하는 플랫폼으로 성장하는 것입니다. 
                데이터와 AI를 통해 전문가의 성장을 지원하는 새로운 패러다임을 제시합니다.
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default BenefitsSection;