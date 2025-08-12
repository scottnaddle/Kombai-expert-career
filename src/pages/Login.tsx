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
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, clearError } from '../store/slices/authSlice';

const LoginContainer = styled(Box)(({ theme }) => ({
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
    background: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbHMlMjBvZmZpY2UlMjBjb2xsYWJvcmF0aW9uJTIwaW50ZXJuYXRpb25hbCUyMHRlYW18ZW58MHwwfHxibHVlfDE3NTQ5Nzc3MzB8MA&ixlib=rb-4.1.0&q=85')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.05,
    zIndex: 0
  }
}));

const LoginCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  zIndex: 2,
  maxWidth: 450,
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
  background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}15)`,
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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, user } = useAppSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

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
    if (formData.email && formData.password) {
      dispatch(loginUser(formData));
    }
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
  };

  return (
    <LoginContainer>
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

          <LoginCard elevation={0}>
            <Stack spacing={3}>
              <Box textAlign="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                
                <Typography variant="h4" color="text.primary" sx={{ mb: 1 }}>
                  로그인
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  글로벌 커리어 링크에 오신 것을 환영합니다
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

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isLoading}
                    startIcon={<LoginIcon />}
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
                    {isLoading ? '로그인 중...' : '로그인'}
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
                  onClick={() => handleSocialLogin('google')}
                >
                  Google
                </SocialButton>
                <SocialButton
                  variant="outlined"
                  fullWidth
                  startIcon={<LinkedInIcon />}
                  onClick={() => handleSocialLogin('linkedin')}
                >
                  LinkedIn
                </SocialButton>
              </Stack>

              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  계정이 없으신가요?{' '}
                  <Typography
                    component={Link}
                    to="/signup"
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
                    회원가입
                  </Typography>
                </Typography>
              </Box>
            </Stack>
          </LoginCard>
        </Stack>
      </Container>
    </LoginContainer>
  );
};

export default Login;
