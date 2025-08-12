import React, { useState } from 'react';
import { Box, Container, Typography, Stack, Button, TextField, Paper, Chip, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import VerifiedIcon from '@mui/icons-material/Verified';

const CTAContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}15 0%, 
    ${theme.palette.secondary.main}10 50%, 
    ${theme.palette.info.main}12 100%)`,
  position: 'relative',
  overflow: 'hidden'
}));

const FormCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.15)'
  }
}));

const FloatingShape = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}15)`,
  animation: 'float 8s ease-in-out infinite'
}));

const CTASection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    experience: ''
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <CTAContainer sx={{ py: 12 }}>
      <FloatingShape
        sx={{
          width: 200,
          height: 200,
          top: '10%',
          left: '-5%',
          animationDelay: '0s'
        }}
      />
      <FloatingShape
        sx={{
          width: 150,
          height: 150,
          bottom: '15%',
          right: '-3%',
          animationDelay: '4s'
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={8}
          alignItems="center"
        >
          <Box sx={{ flex: 1, textAlign: { xs: 'center', lg: 'left' } }}>
            <Typography
              variant="h2"
              sx={{
                mb: 3,
                color: 'text.primary',
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              지금 시작하세요
            </Typography>
            
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              AI가 분석한 당신의 역량으로 
              글로벌 커리어의 새로운 장을 열어보세요
            </Typography>

            <Stack spacing={2} sx={{ mb: 4 }}>
              <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent={{ xs: 'center', lg: 'flex-start' }}>
                <Chip
                  icon={<RocketLaunchIcon />}
                  label="베타 서비스 무료 체험"
                  color="success"
                  variant="filled"
                  sx={{ borderRadius: '16px', px: 2 }}
                />
                <Chip
                  label="30일 무료 AI 분석"
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: '16px', px: 2 }}
                />
              </Stack>
            </Stack>

            <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
              ✓ 5분만에 프로필 생성 <br />
              ✓ AI 역량 분석 즉시 확인 <br />
              ✓ 맞춤형 성장 로드맵 제공 <br />
              ✓ 언제든 경력증명서 발급 가능
            </Typography>
          </Box>

          <Box sx={{ flex: 1, maxWidth: 500, width: '100%' }}>
            <FormCard elevation={0}>
              <Stack spacing={3}>
                <Box textAlign="center">
                  <Typography variant="h5" color="text.primary" sx={{ mb: 1 }}>
                    베타 서비스 신청
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    글로벌 커리어 링크와 함께 시작하세요
                  </Typography>
                </Box>

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="이름"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    InputProps={{
                      startAdornment: (
                        <PersonIcon sx={{ color: 'text.secondary', mr: 1 }} />
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px'
                      }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="이메일"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ color: 'text.secondary', mr: 1 }} />
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px'
                      }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="소속 회사"
                    value={formData.company}
                    onChange={handleInputChange('company')}
                    InputProps={{
                      startAdornment: (
                        <WorkIcon sx={{ color: 'text.secondary', mr: 1 }} />
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px'
                      }
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="해외사업 경험 (간단히)"
                    multiline
                    rows={3}
                    value={formData.experience}
                    onChange={handleInputChange('experience')}
                    placeholder="예: 동남아 시장 진출 3년, 베트남 현지 법인 설립 경험"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px'
                      }
                    }}
                  />
                </Stack>

                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<RocketLaunchIcon />}
                  sx={{
                    py: 2,
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme => theme.palette.primary.dark}, ${theme => theme.palette.secondary.dark})`,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(37, 99, 235, 0.3)'
                    }
                  }}
                >
                  AI 역량 분석 시작하기
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    또는
                  </Typography>
                </Divider>

                <Stack direction="row" spacing={1}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="small"
                    fullWidth
                    startIcon={<LoginIcon />}
                    sx={{ borderRadius: '12px' }}
                  >
                    로그인
                  </Button>
                  <Button
                    component={Link}
                    to="/verify"
                    variant="outlined"
                    size="small"
                    fullWidth
                    startIcon={<VerifiedIcon />}
                    sx={{ borderRadius: '12px' }}
                  >
                    인증서 검증
                  </Button>
                </Stack>

                <Typography variant="caption" color="text.secondary" textAlign="center">
                  베타 서비스 기간 중 모든 기능을 무료로 이용하실 수 있습니다. <br />
                  개인정보는 안전하게 보호되며, 언제든 탈퇴 가능합니다.
                </Typography>
              </Stack>
            </FormCard>
          </Box>
        </Stack>
      </Container>
    </CTAContainer>
  );
};

export default CTASection;