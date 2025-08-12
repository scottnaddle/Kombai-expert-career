import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Stack, 
  Paper, 
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signupUser, clearError } from '../store/slices/authSlice';

const SignupContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${theme.palette.secondary.main}15 0%, 
    ${theme.palette.primary.main}10 25%, 
    ${theme.palette.info.main}08 50%, 
    ${theme.palette.secondary.main}12 75%, 
    ${theme.palette.primary.main}15 100%)`,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  paddingY: 4,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbHMlMjBvZmZpY2UlMjBjb2xsYWJvcmF0aW9uJTIwaW50ZXJuYXRpb25hbCUyMHRlYW18ZW58MHwwfHxibHVlfDE3NTQ5Nzc3MzB8MA&ixlib=rb-4.1.0&q=85')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.05,
    zIndex: 0
  }
}));

const SignupCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  zIndex: 2,
  maxWidth: 500,
  width: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.15)'
  }
}));

const FloatingShape = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.secondary.main}20, ${theme.palette.primary.main}15)`,
  animation: 'float 8s ease-in-out infinite'
}));

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.grey[300]}`,
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.grey[50],
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
  }
}));

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, user } = useAppSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!agreeTerms || !agreePrivacy) {
      alert('이용약관과 개인정보처리방침에 동의해주세요.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (formData.name && formData.email && formData.password) {
      dispatch(signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      }));
    }
  };

  const handleSocialSignup = (provider: string) => {
    // TODO: Implement social signup
    console.log(`Signup with ${provider}`);
  };

  return (
    <SignupContainer>
      <FloatingShape
        sx={{
          width: 180,
          height: 180,
          top: '5%',
          right: '-5%',
          animationDelay: '0s'
        }}
      />
      <FloatingShape
        sx={{
          width: 120,
          height: 120,
          bottom: '10%',
          left: '-3%',
          animationDelay: '4s'
        }}
      />
      
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={4} alignItems="center">
          <Box sx={{ alignSelf: 'flex-start' }}>
            <IconButton
              component={Link}
              to="/"
              sx={{
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white'
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>

          <SignupCard elevation={0}>
            <Stack spacing={3}>
              <Box textAlign="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme => theme.palette.secondary.main}, ${theme => theme.palette.primary.main})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <PersonAddIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                
                <Typography variant="h4" color="text.primary" sx={{ mb: 1 }}>
                  회원가입
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  AI 기반 글로벌 커리어 분석을 시작하세요
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ borderRadius: '12px' }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="이름"
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
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
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
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
                    label="비밀번호"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
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
                    label="비밀번호 확인"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px'
                      }
                    }}
                  />

                  <Stack spacing={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2" color="text.secondary">
                          이용약관에 동의합니다 (필수)
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={agreePrivacy}
                          onChange={(e) => setAgreePrivacy(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Typography variant="body2" color="text.secondary">
                          개인정보처리방침에 동의합니다 (필수)
                        </Typography>
                      }
                    />
                  </Stack>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isLoading}
                    startIcon={<PersonAddIcon />}
                    sx={{
                      py: 2,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${theme => theme.palette.secondary.main}, ${theme => theme.palette.primary.main})`,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme => theme.palette.secondary.dark}, ${theme => theme.palette.primary.dark})`,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(124, 58, 237, 0.3)'
                      }
                    }}
                  >
                    {isLoading ? '가입 중...' : '회원가입'}
                  </Button>
                </Stack>
              </form>

              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  또는
                </Typography>
              </Divider>

              <Stack direction="row" spacing={2}>
                <SocialButton
                  variant="outlined"
                  fullWidth
                  startIcon={<GoogleIcon />}
                  onClick={() => handleSocialSignup('google')}
                >
                  Google
                </SocialButton>
                <SocialButton
                  variant="outlined"
                  fullWidth
                  startIcon={<LinkedInIcon />}
                  onClick={() => handleSocialSignup('linkedin')}
                >
                  LinkedIn
                </SocialButton>
              </Stack>

              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  이미 계정이 있으신가요?{' '}
                  <Typography
                    component={Link}
                    to="/login"
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    로그인
                  </Typography>
                </Typography>
              </Box>
            </Stack>
          </SignupCard>
        </Stack>
      </Container>
    </SignupContainer>
  );
};

export default Signup;
