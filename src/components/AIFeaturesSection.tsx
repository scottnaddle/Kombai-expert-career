import React from 'react';
import { Box, Container, Typography, Stack, Paper, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import InsightIcon from '@mui/icons-material/Insights';

const GlassPanel = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}05, ${theme.palette.secondary.main}03)`,
    zIndex: -1
  }
}));

const FeatureHighlight = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.info.main}05)`,
  border: `1px solid ${theme.palette.primary.main}20`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(37, 99, 235, 0.1)'
  }
}));

const AIFeaturesSection: React.FC = () => {
  const competencyData = [
    { skill: '지역 전문성', value: 85 },
    { skill: '산업 지식', value: 72 },
    { skill: '무역 실무', value: 90 },
    { skill: '계약 협상', value: 68 },
    { skill: '언어 능력', value: 80 },
    { skill: '문화 이해', value: 75 }
  ];


  const aiFeatures = [
    {
      icon: <PsychologyIcon />,
      title: 'NLP 기반 키워드 추출',
      description: '프로젝트 경험 텍스트에서 핵심 역량을 자동 식별하고 태깅합니다'
    },
    {
      icon: <InsightIcon />,
      title: '다차원 역량 분류',
      description: '지역, 산업, 직무, 소프트 스킬 등으로 역량을 체계적으로 분류합니다'
    },
    {
      icon: <AutoAwesomeIcon />,
      title: '맞춤형 성장 로드맵',
      description: '목표와 현재 역량의 차이를 분석하여 최적의 학습 경로를 제시합니다'
    }
  ];

  return (
    <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
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
              AI가 분석하는 당신의 역량
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
            >
              인공지능이 당신의 경험을 분석하여 숨겨진 역량을 발굴하고 
              성장 방향을 제시합니다
            </Typography>
          </Box>

          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            spacing={6}
            alignItems="center"
          >
            <Box sx={{ flex: 1 }}>
              <GlassPanel elevation={0}>
                <Stack spacing={3} alignItems="center">
                  <Typography variant="h5" color="text.primary" textAlign="center">
                    AI 역량 맵 시각화
                  </Typography>
                  
                  <Box sx={{ width: '100%', px: 2 }}>
                    <Stack spacing={3}>
                      {competencyData.map((item, index) => (
                        <Box key={index}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" fontWeight="medium">
                              {item.skill}
                            </Typography>
                            <Typography variant="body2" color="primary.main" fontWeight="bold">
                              {item.value}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={item.value}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              bgcolor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 4,
                                background: `linear-gradient(90deg, #2563EB, #60A5FA)`
                              }
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    실시간으로 업데이트되는 개인 역량 프로필
                  </Typography>
                </Stack>
              </GlassPanel>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Stack spacing={3}>
                <Typography variant="h4" color="text.primary" sx={{ mb: 2 }}>
                  AI 기반 핵심 기능
                </Typography>
                
                {aiFeatures.map((feature, index) => (
                  <FeatureHighlight key={index}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '12px',
                          bgcolor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          flexShrink: 0
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" lineHeight={1.6}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </FeatureHighlight>
                ))}

                <Box sx={{ mt: 4, p: 3, borderRadius: '16px', bgcolor: 'success.main', color: 'white' }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    💡 실시간 인사이트
                  </Typography>
                  <Typography variant="body2">
                    "당신의 동남아 시장 전문성은 상위 15%에 해당합니다. 
                    중남미 진출을 위해서는 스페인어 역량과 현지 법규 지식을 보완하는 것을 추천합니다."
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default AIFeaturesSection;