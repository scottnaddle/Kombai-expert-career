import React, { useState } from 'react';
import { Box, Container, Typography, Stack, Card, CardContent, Avatar, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const PersonaCard = styled(Card)<{ isActive: boolean }>(({ theme, isActive }) => ({
  height: '100%',
  borderRadius: '24px',
  background: isActive 
    ? `linear-gradient(145deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}05)`
    : 'linear-gradient(145deg, #ffffff, #f8fafc)',
  border: isActive 
    ? `2px solid ${theme.palette.primary.main}40`
    : '1px solid rgba(229, 231, 235, 0.6)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  transform: isActive ? 'scale(1.05)' : 'scale(1)',
  boxShadow: isActive 
    ? '0 20px 60px rgba(37, 99, 235, 0.15)'
    : '0 4px 20px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 20px 60px rgba(37, 99, 235, 0.15)'
  }
}));

const GradientAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  marginBottom: theme.spacing(2)
}));

const PersonasSection: React.FC = () => {
  const [activePersona, setActivePersona] = useState(0);

  const personas = [
    {
      name: '김민준',
      age: 29,
      role: '주니어 실무자',
      company: '중견 소비재 기업',
      experience: '3년차',
      region: '동남아 시장',
      icon: <PersonIcon fontSize="large" />,
      goals: ['시장 가치 객관적 평가', '중남미 시장 전문가 성장', '맞춤형 교육 추천'],
      painPoints: ['경력의 시장 경쟁력 불확실', '적합한 교육과정 선택의 어려움'],
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: '박서연',
      age: 45,
      role: '시니어 전문가',
      company: 'IT 솔루션 기업',
      experience: '15년차',
      region: '북미/유럽 시장',
      icon: <TrendingUpIcon fontSize="large" />,
      goals: ['전문성 공식 인정', '컨설팅 기회 확대', 'C-level 이직 기회'],
      painPoints: ['복잡한 경력의 효과적 표현', '검증된 인재로서의 노출 부족'],
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      name: '최팀장',
      age: 38,
      role: '기업 인사담당자',
      company: '에너지 플랜트 기업',
      experience: '인사팀장',
      region: '중동 지역',
      icon: <BusinessIcon fontSize="large" />,
      goals: ['신속한 경력 검증', '특정 역량 인재 직접 검색', '효율적 채용 프로세스'],
      painPoints: ['이력서 내용 검증의 어려움', '다양한 채용 사이트 검색의 비효율성'],
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      name: '이서기관',
      age: 50,
      role: '정부 담당자',
      company: '산업통상자원부',
      experience: '서기관',
      region: '정책 수립',
      icon: <AccountBalanceIcon fontSize="large" />,
      goals: ['인력 현황 데이터 파악', '정책 수립 근거 확보', '산업별 인력 분석'],
      painPoints: ['정확한 통계 데이터 부재', '정책 수립을 위한 예측 데이터 부족'],
      avatar: 'https://i.pravatar.cc/150?img=4'
    }
  ];

  return (
    <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          <Box textAlign="center">
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                color: 'text.primary',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              누구를 위한 서비스인가요?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              다양한 배경의 해외사업 관련자들이 각자의 목표를 달성할 수 있도록 돕습니다
            </Typography>
          </Box>

          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            spacing={3}
            sx={{ mt: 6 }}
          >
            {personas.map((persona, index) => (
              <PersonaCard
                key={index}
                isActive={activePersona === index}
                onClick={() => setActivePersona(index)}
                elevation={0}
              >
                <CardContent sx={{ p: 3, height: '100%' }}>
                  <Stack spacing={3} height="100%">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <GradientAvatar src={persona.avatar} alt={persona.name}>
                        {persona.icon}
                      </GradientAvatar>
                      <Box>
                        <Typography variant="h6" color="text.primary">
                          {persona.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {persona.age}세 • {persona.role}
                        </Typography>
                        <Typography variant="body2" color="primary.main" fontWeight="500">
                          {persona.company}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack spacing={1}>
                      <Chip
                        label={`${persona.experience} • ${persona.region}`}
                        size="small"
                        variant="outlined"
                        sx={{ alignSelf: 'flex-start', borderRadius: '12px' }}
                      />
                    </Stack>

                    <Box>
                      <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1 }}>
                        목표 (Goals)
                      </Typography>
                      <Stack spacing={0.5}>
                        {persona.goals.map((goal, idx) => (
                          <Typography key={idx} variant="body2" color="text.secondary">
                            • {goal}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>

                    <Box sx={{ mt: 'auto' }}>
                      <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1 }}>
                        고충 (Pain Points)
                      </Typography>
                      <Stack spacing={0.5}>
                        {persona.painPoints.map((pain, idx) => (
                          <Typography key={idx} variant="body2" color="warning.main">
                            • {pain}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </PersonaCard>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default PersonasSection;