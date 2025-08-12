import React from 'react';
import { Box, Container, Typography, Stack, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const ProblemCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
  border: '1px solid rgba(229, 231, 235, 0.6)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    background: `linear-gradient(180deg, ${theme.palette.warning.main}, ${theme.palette.error.main})`
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)'
  }
}));

const StatBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${theme.palette.error.main}10, ${theme.palette.warning.main}10)`,
  border: `1px solid ${theme.palette.error.main}20`
}));

const ProblemSection: React.FC = () => {
  return (
    <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
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
              해외사업 전문가들이 직면한 현실
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
            >
              파편화된 경력 관리 시스템으로 인해 전문가들의 역량이 제대로 평가받지 못하고 있습니다
            </Typography>
          </Box>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            sx={{ mt: 6 }}
          >
            <ProblemCard elevation={0}>
              <Stack spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'warning.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <ScatterPlotIcon fontSize="large" />
                </Box>
                <Typography variant="h6" color="text.primary" textAlign="center">
                  파편화된 경력 관리
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  KOTRA, 무역협회, 해외건설협회 등 여러 기관의 교육과 자격증이 
                  하나의 공신력 있는 경력 증명으로 통합되지 못함
                </Typography>
              </Stack>
            </ProblemCard>

            <ProblemCard elevation={0}>
              <Stack spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'error.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <ErrorOutlineIcon fontSize="large" />
                </Box>
                <Typography variant="h6" color="text.primary" textAlign="center">
                  정보 비대칭 문제
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  기업은 지원자의 실제 역량을 검증하기 어렵고, 
                  전문가는 자신의 다면적 역량을 효과적으로 입증하기 어려움
                </Typography>
              </Stack>
            </ProblemCard>

            <ProblemCard elevation={0}>
              <Stack spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'warning.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                >
                  <TrendingDownIcon fontSize="large" />
                </Box>
                <Typography variant="h6" color="text.primary" textAlign="center">
                  경쟁력 저하
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  채용 실패 비용 증가와 국가 전체의 해외사업 경쟁력 저하로 
                  이어지는 악순환 구조
                </Typography>
              </Stack>
            </ProblemCard>
          </Stack>

          <Box sx={{ mt: 8 }}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={4}
              justifyContent="center"
            >
              <StatBox>
                <Typography variant="h4" color="error.main" fontWeight="bold">
                  85%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  기업들이 해외사업 인재 채용에서 
                  경험하는 검증의 어려움
                </Typography>
              </StatBox>
              
              <StatBox>
                <Typography variant="h4" color="warning.main" fontWeight="bold">
                  3개월+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  적합한 해외사업 전문가를 
                  찾는 데 소요되는 평균 시간
                </Typography>
              </StatBox>
              
              <StatBox>
                <Typography variant="h4" color="error.main" fontWeight="bold">
                  분산
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  여러 기관에 흩어진 교육과 
                  자격증 관리 시스템
                </Typography>
              </StatBox>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProblemSection;