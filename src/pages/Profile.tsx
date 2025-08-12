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
  Avatar,
  IconButton,
  Chip,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProfile, updateProfile, clearError } from '../store/slices/profileSlice';
import { logout } from '../store/slices/authSlice';

const ProfileContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}12 0%, 
    ${theme.palette.secondary.main}08 25%, 
    ${theme.palette.info.main}06 50%, 
    ${theme.palette.primary.main}10 75%, 
    ${theme.palette.secondary.main}12 100%)`,
  paddingY: theme.spacing(4)
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.12)'
  }
}));

const AIAnalysisCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}10, 
    ${theme.palette.secondary.main}08)`,
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)'
}));

const FloatingShape = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}10)`,
  animation: 'float 10s ease-in-out infinite'
}));

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector((state) => state.profile);
  const { user } = useAppSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    education: '',
    languages: '',
    certifications: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(fetchProfile());
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        education: profile.education || '',
        languages: profile.languages || '',
        certifications: profile.certifications || '',
        phone: profile.phone || '',
        address: profile.address || ''
      });
    }
  }, [profile]);

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

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const mockAIAnalysis = {
    strengths: ['글로벌 비즈니스', '프로젝트 관리', '다국어 소통', '시장 분석'],
    recommendations: ['데이터 분석 스킬 향상', '디지털 마케팅 교육', 'AI/ML 기초 과정'],
    score: 85
  };

  return (
    <ProfileContainer sx={{ position: 'relative', overflow: 'hidden' }}>
      <FloatingShape
        sx={{
          width: 150,
          height: 150,
          top: '5%',
          right: '5%',
          animationDelay: '0s'
        }}
      />
      <FloatingShape
        sx={{
          width: 100,
          height: 100,
          bottom: '10%',
          left: '8%',
          animationDelay: '5s'
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" color="text.primary">
              프로필 관리
            </Typography>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                borderRadius: '12px',
                borderColor: 'error.main',
                color: 'error.main',
                '&:hover': {
                  borderColor: 'error.dark',
                  backgroundColor: 'error.main',
                  color: 'white'
                }
              }}
            >
              로그아웃
            </Button>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
            {/* Profile Information */}
            <Box sx={{ flex: 2 }}>
              <ProfileCard elevation={0}>
                <Stack spacing={4}>
                  {/* Profile Header */}
                  <Stack direction="row" spacing={3} alignItems="center">
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`,
                        fontSize: '2.5rem'
                      }}
                    >
                      {user?.name?.charAt(0) || 'U'}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h4" color="text.primary" sx={{ mb: 1 }}>
                        {user?.name || '사용자'}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {user?.email}
                      </Typography>
                      <Button
                        variant={isEditing ? "contained" : "outlined"}
                        startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                        onClick={isEditing ? handleSave : () => setIsEditing(true)}
                        disabled={isLoading}
                        sx={{
                          borderRadius: '12px',
                          ...(isEditing && {
                            background: `linear-gradient(135deg, ${theme => theme.palette.success.main}, ${theme => theme.palette.success.dark})`
                          })
                        }}
                      >
                        {isEditing ? '저장' : '편집'}
                      </Button>
                    </Box>
                  </Stack>

                  <Divider />

                  {/* Profile Fields */}
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="이름"
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      disabled={!isEditing}
                      InputProps={{
                        startAdornment: <PersonIcon sx={{ color: 'text.secondary', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px'
                        }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="학력"
                      value={formData.education}
                      onChange={handleInputChange('education')}
                      disabled={!isEditing}
                      multiline
                      rows={2}
                      placeholder="예: 서울대학교 경영학과 학사, 연세대학교 국제학 석사"
                      InputProps={{
                        startAdornment: <SchoolIcon sx={{ color: 'text.secondary', mr: 1, alignSelf: 'flex-start', mt: 1 }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px'
                        }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="언어 능력"
                      value={formData.languages}
                      onChange={handleInputChange('languages')}
                      disabled={!isEditing}
                      placeholder="예: 한국어(원어민), 영어(고급), 중국어(중급)"
                      InputProps={{
                        startAdornment: <LanguageIcon sx={{ color: 'text.secondary', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px'
                        }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="자격증/인증"
                      value={formData.certifications}
                      onChange={handleInputChange('certifications')}
                      disabled={!isEditing}
                      multiline
                      rows={2}
                      placeholder="예: PMP, TOEIC 950, HSK 6급"
                      InputProps={{
                        startAdornment: <WorkspacePremiumIcon sx={{ color: 'text.secondary', mr: 1, alignSelf: 'flex-start', mt: 1 }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px'
                        }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="연락처"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      disabled={!isEditing}
                      placeholder="예: 010-1234-5678"
                      InputProps={{
                        startAdornment: <PhoneIcon sx={{ color: 'text.secondary', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px'
                        }
                      }}
                    />

                    <TextField
                      fullWidth
                      label="주소"
                      value={formData.address}
                      onChange={handleInputChange('address')}
                      disabled={!isEditing}
                      placeholder="예: 서울특별시 강남구"
                      InputProps={{
                        startAdornment: <LocationOnIcon sx={{ color: 'text.secondary', mr: 1 }} />
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px'
                        }
                      }}
                    />
                  </Stack>
                </Stack>
              </ProfileCard>
            </Box>

            {/* AI Analysis */}
            <Box sx={{ flex: 1 }}>
              <AIAnalysisCard elevation={0}>
                <Stack spacing={3}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <PsychologyIcon sx={{ color: 'white', fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography variant="h5" color="text.primary">
                        AI 역량 분석
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        종합 점수: {mockAIAnalysis.score}/100
                      </Typography>
                    </Box>
                  </Stack>

                  <Box>
                    <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                      핵심 강점
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {mockAIAnalysis.strengths.map((strength, index) => (
                        <Chip
                          key={index}
                          label={strength}
                          color="primary"
                          variant="filled"
                          sx={{ borderRadius: '16px' }}
                        />
                      ))}
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                      성장 추천 영역
                    </Typography>
                    <Stack spacing={1}>
                      {mockAIAnalysis.recommendations.map((rec, index) => (
                        <Typography key={index} variant="body2" color="text.secondary">
                          • {rec}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate('/career')}
                    sx={{
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${theme => theme.palette.primary.dark}, ${theme => theme.palette.secondary.dark})`
                      }
                    }}
                  >
                    상세 분석 보기
                  </Button>
                </Stack>
              </AIAnalysisCard>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </ProfileContainer>
  );
};

export default Profile;
