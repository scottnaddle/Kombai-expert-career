import React from 'react';
import { Box, Container, Typography, Stack, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import VerifiedIcon from '@mui/icons-material/Verified';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const ComparisonCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '20px',
  background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
  border: '1px solid rgba(229, 231, 235, 0.6)',
  height: '100%',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)'
  }
}));

const TrustBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  borderRadius: '20px',
  background: `linear-gradient(135deg, ${theme.palette.success.main}15, ${theme.palette.success.main}10)`,
  border: `1px solid ${theme.palette.success.main}30`,
  color: theme.palette.success.main
}));

const TrustSection: React.FC = () => {
  return (
    <Box sx={{ py: 10, bgcolor: 'background.default' }}>
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
              신뢰할 수 있는 플랫폼
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
            >
              KOSA 시스템의 성공 모델을 벤치마킹하여 법적 기반과 공신력을 확보했습니다
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
            <TrustBadge>
              <GavelIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" fontWeight="500">
                법적 기반 확보
              </Typography>
            </TrustBadge>
            <TrustBadge>
              <SecurityIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" fontWeight="500">
                정부 인증 시스템
              </Typography>
            </TrustBadge>
            <TrustBadge>
              <VerifiedIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2" fontWeight="500">
                검증된 프로세스
              </Typography>
            </TrustBadge>
          </Stack>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            sx={{ mt: 6 }}
          >
            <ComparisonCard elevation={0}>
              <Stack spacing={3}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      bgcolor: 'info.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    <CompareArrowsIcon />
                  </Box>
                  <Typography variant="h5" color="text.primary">
                    KOSA 시스템 벤치마킹
                  </Typography>
                </Stack>
                
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  소프트웨어 진흥법에 근거한 KOSA의 SW기술자 경력관리 시스템이 
                  십수 년간 업계 표준으로 자리잡은 성공 모델을 분석하여, 
                  해외사업 분야에 최적화된 시스템을 구축했습니다.
                </Typography>

                <Divider />

                <Stack spacing={2}>
                  <Typography variant="subtitle2" color="primary.main">
                    KOSA 시스템의 핵심 성공 요인
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      • 법적 기반과 공신력 확보
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • 명확한 시장 필요성 충족
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • 표준화된 증명 체계 구축
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </ComparisonCard>

            <ComparisonCard elevation={0}>
              <Stack spacing={3}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    <AutoAwesomeIcon />
                  </Box>
                  <Typography variant="h5" color="text.primary">
                    차별화된 AI 기능
                  </Typography>
                </Stack>
                
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  기존 시스템의 한계를 극복하고, AI 기술을 통해 
                  비정형적인 역량까지 분석하여 미래지향적인 
                  경력 개발 가이드를 제공합니다.
                </Typography>

                <Divider />

                <Stack spacing={2}>
                  <Typography variant="subtitle2" color="primary.main">
                    기존 시스템 대비 개선점
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      • AI 기반 비정형 역량 분석
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • 자동화된 심사 프로세스
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • 미래지향적 성장 가이드 제공
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </ComparisonCard>
          </Stack>

          <Box sx={{ mt: 8 }}>
            <Paper
              sx={{
                p: 4,
                borderRadius: '20px',
                background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}08, ${theme => theme.palette.secondary.main}05)`,
                border: `1px solid ${theme => theme.palette.primary.main}20`,
                textAlign: 'center'
              }}
              elevation={0}
            >
              <Typography variant="h5" color="text.primary" sx={{ mb: 2 }}>
                🏛️ 정부 기관과의 파트너십
              </Typography>
              <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                산업통상자원부, KOTRA, 무역협회, 해외건설협회 등 주요 기관과의 
                협력을 통해 공신력 있는 데이터와 인증 체계를 구축하고 있습니다.
              </Typography>
            </Paper>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default TrustSection;