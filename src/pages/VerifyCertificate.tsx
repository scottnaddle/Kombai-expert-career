import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack, 
  Paper, 
  Alert,
  TextField,
  Chip,
  Divider,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSearchParams, Link } from 'react-router-dom';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorIcon from '@mui/icons-material/Error';
import SearchIcon from '@mui/icons-material/Search';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VerifyContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${theme.palette.info.main}12 0%, 
    ${theme.palette.primary.main}08 25%, 
    ${theme.palette.secondary.main}06 50%, 
    ${theme.palette.info.main}08 75%, 
    ${theme.palette.primary.main}10 100%)`,
  paddingY: theme.spacing(4)
}));

const VerifyCard = styled(Paper)(({ theme }) => ({
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

const CertificateCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.success.main}08, 
    ${theme.palette.info.main}06)`,
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '20px',
  padding: theme.spacing(4),
  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100px',
    height: '100px',
    background: `linear-gradient(45deg, ${theme.palette.success.main}15, ${theme.palette.info.main}10)`,
    borderRadius: '50%',
    transform: 'translate(30px, -30px)'
  }
}));

const FloatingShape = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.info.main}12, ${theme.palette.primary.main}08)`,
  animation: 'float 18s ease-in-out infinite'
}));

interface CertificateData {
  id: string;
  title: string;
  holderName: string;
  holderEmail: string;
  issueDate: string;
  expiryDate?: string;
  skills: string[];
  achievements: string[];
  template: string;
  isValid: boolean;
  verificationCode: string;
}

const VerifyCertificate: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('id');
    const code = searchParams.get('code');
    
    if (id || code) {
      setVerificationCode(id || code || '');
      handleVerify(id || code || '');
    }
  }, [searchParams]);

  const handleVerify = async (code?: string) => {
    const codeToVerify = code || verificationCode;
    if (!codeToVerify) {
      setError('인증 코드를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Mock certificate data
      const mockCertificate: CertificateData = {
        id: codeToVerify,
        title: '글로벌 비즈니스 전문가 인증서',
        holderName: '김글로벌',
        holderEmail: 'global.kim@example.com',
        issueDate: '2024-01-16',
        expiryDate: '2027-01-16',
        skills: ['글로벌 비즈니스', '프로젝트 관리', '다국어 소통', '시장 분석', '팀 리더십'],
        achievements: [
          '동남아 3개국 시장 진출 프로젝트 성공적 완료',
          '현지 파트너십 구축을 통한 매출 300% 증대',
          '다국적 팀 운영 및 관리 경험 5년 이상'
        ],
        template: 'global-business',
        isValid: true,
        verificationCode: codeToVerify
      };

      setCertificate(mockCertificate);
    } catch (err) {
      setError('인증서를 찾을 수 없습니다. 인증 코드를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(event.target.value);
    setError(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleVerify();
  };

  return (
    <VerifyContainer sx={{ position: 'relative', overflow: 'hidden' }}>
      <FloatingShape
        sx={{
          width: 140,
          height: 140,
          top: '8%',
          left: '5%',
          animationDelay: '0s'
        }}
      />
      <FloatingShape
        sx={{
          width: 90,
          height: 90,
          bottom: '12%',
          right: '8%',
          animationDelay: '9s'
        }}
      />
      
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              component={Link}
              to="/"
              startIcon={<ArrowBackIcon />}
              sx={{
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white'
                }
              }}
            >
              홈으로
            </Button>
            <Typography variant="h3" color="text.primary">
              인증서 검증
            </Typography>
          </Stack>

          {/* Verification Form */}
          {!certificate && (
            <VerifyCard elevation={0}>
              <Stack spacing={4} alignItems="center">
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${theme => theme.palette.info.main}, ${theme => theme.palette.primary.main})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <QrCodeScannerIcon sx={{ fontSize: 50, color: 'white' }} />
                </Box>
                
                <Typography variant="h4" color="text.primary" textAlign="center">
                  인증서 검증
                </Typography>
                
                <Typography variant="body1" color="text.secondary" textAlign="center" maxWidth={400}>
                  QR 코드를 스캔하거나 인증 코드를 입력하여 
                  경력증명서의 진위를 확인하세요
                </Typography>

                {error && (
                  <Alert 
                    severity="error" 
                    sx={{ borderRadius: '12px', width: '100%' }}
                    icon={<ErrorIcon />}
                  >
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="인증 코드"
                      value={verificationCode}
                      onChange={handleInputChange}
                      placeholder="예: ABC123DEF456"
                      disabled={isLoading}
                      InputProps={{
                        startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
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
                      disabled={isLoading || !verificationCode}
                      startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                      sx={{
                        py: 2,
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${theme => theme.palette.info.main}, ${theme => theme.palette.primary.main})`,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme => theme.palette.info.dark}, ${theme => theme.palette.primary.dark})`,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 40px rgba(6, 182, 212, 0.3)'
                        }
                      }}
                    >
                      {isLoading ? '검증 중...' : '인증서 검증'}
                    </Button>
                  </Stack>
                </Box>

                <Typography variant="body2" color="text.secondary" textAlign="center">
                  💡 QR 코드가 있다면 카메라로 스캔하거나, 
                  <br />
                  인증서에 표시된 코드를 직접 입력하세요
                </Typography>
              </Stack>
            </VerifyCard>
          )}

          {/* Certificate Display */}
          {certificate && (
            <CertificateCard elevation={0}>
              <Stack spacing={4}>
                {/* Verification Status */}
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                  <VerifiedIcon sx={{ fontSize: 40, color: 'success.main' }} />
                  <Typography variant="h5" color="success.main" fontWeight={600}>
                    인증서가 검증되었습니다
                  </Typography>
                </Stack>

                <Divider />

                {/* Certificate Header */}
                <Stack spacing={2} alignItems="center">
                  <WorkspacePremiumIcon sx={{ fontSize: 60, color: 'primary.main' }} />
                  <Typography variant="h4" color="text.primary" textAlign="center">
                    {certificate.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Global Career Link 공식 인증서
                  </Typography>
                </Stack>

                <Divider />

                {/* Certificate Details */}
                <Stack spacing={3}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <PersonIcon sx={{ color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        인증서 소지자
                      </Typography>
                      <Typography variant="h6" color="text.primary">
                        {certificate.holderName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {certificate.holderEmail}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <CalendarTodayIcon sx={{ color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        발급 정보
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        발급일: {certificate.issueDate}
                      </Typography>
                      {certificate.expiryDate && (
                        <Typography variant="body1" color="text.primary">
                          만료일: {certificate.expiryDate}
                        </Typography>
                      )}
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <BusinessIcon sx={{ color: 'text.secondary', mt: 0.5 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        인증 역량
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {certificate.skills.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            color="primary"
                            variant="filled"
                            sx={{ borderRadius: '16px' }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Stack>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                      주요 성과
                    </Typography>
                    <Stack spacing={1}>
                      {certificate.achievements.map((achievement, index) => (
                        <Typography key={index} variant="body2" color="text.primary">
                          • {achievement}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                </Stack>

                <Divider />

                {/* Verification Info */}
                <Box sx={{ 
                  p: 3, 
                  bgcolor: 'success.main', 
                  color: 'white',
                  borderRadius: '16px',
                  textAlign: 'center'
                }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    ✅ 검증 완료
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    이 인증서는 Global Career Link에서 발급한 정식 인증서입니다.
                    <br />
                    인증 코드: {certificate.verificationCode}
                  </Typography>
                </Box>

                {/* Actions */}
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setCertificate(null);
                      setVerificationCode('');
                      setError(null);
                    }}
                    sx={{ borderRadius: '12px' }}
                  >
                    다른 인증서 검증
                  </Button>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/certification"
                    sx={{
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`
                    }}
                  >
                    내 인증서 관리
                  </Button>
                </Stack>
              </Stack>
            </CertificateCard>
          )}
        </Stack>
      </Container>
    </VerifyContainer>
  );
};

export default VerifyCertificate;