import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack, 
  Paper, 
  Alert,
  Card,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useAppSelector } from '../store/hooks';

const CertificationContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}08 0%, 
    ${theme.palette.secondary.main}06 25%, 
    ${theme.palette.info.main}04 50%, 
    ${theme.palette.primary.main}06 75%, 
    ${theme.palette.secondary.main}08 100%)`,
  paddingY: theme.spacing(4)
}));

const CertificationCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '20px',
  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12)'
  }
}));

const TemplateCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}10, 
    ${theme.palette.secondary.main}08)`,
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)'
  }
}));

const FloatingShape = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}08)`,
  animation: 'float 15s ease-in-out infinite'
}));

interface Certificate {
  id: string;
  title: string;
  template: string;
  status: 'draft' | 'issued' | 'pending';
  createdAt: string;
  issuedAt?: string;
  qrCode?: string;
  downloadUrl?: string;
}

const Certification: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      title: '글로벌 비즈니스 전문가 인증서',
      template: 'global-business',
      status: 'issued',
      createdAt: '2024-01-15',
      issuedAt: '2024-01-16',
      qrCode: 'https://verify.globalcareerlink.com/cert/abc123',
      downloadUrl: '/certificates/cert-1.pdf'
    },
    {
      id: '2',
      title: '해외사업 프로젝트 관리 인증서',
      template: 'project-management',
      status: 'pending',
      createdAt: '2024-01-20'
    }
  ]);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    achievements: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const templates = [
    {
      id: 'global-business',
      name: '글로벌 비즈니스 전문가',
      description: '해외사업 경험과 글로벌 역량을 인증하는 종합 인증서',
      features: ['AI 역량 분석', '프로젝트 성과', '언어 능력', '문화 적응력']
    },
    {
      id: 'project-management',
      name: '해외사업 프로젝트 관리',
      description: '국제 프로젝트 관리 경험과 성과를 인증하는 전문 인증서',
      features: ['프로젝트 성과', '팀 리더십', '위험 관리', '성과 지표']
    },
    {
      id: 'market-development',
      name: '해외시장 개발 전문가',
      description: '신규 시장 진출과 사업 개발 역량을 인증하는 인증서',
      features: ['시장 분석', '사업 전략', '현지화 경험', '성장 지표']
    }
  ];

  const steps = [
    '템플릿 선택',
    '정보 입력',
    '검토 및 발급'
  ];

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreateCertificate = () => {
    const newCertificate: Certificate = {
      id: Date.now().toString(),
      title: formData.title,
      template: selectedTemplate,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setCertificates(prev => [...prev, newCertificate]);
    setDialogOpen(false);
    setActiveStep(0);
    setFormData({ title: '', description: '', skills: '', achievements: '' });
    setSelectedTemplate('');
  };

  const handleDownload = (certificate: Certificate) => {
    // TODO: Implement actual download
    console.log('Downloading certificate:', certificate.id);
  };

  const handleShare = (certificate: Certificate) => {
    // TODO: Implement sharing functionality
    console.log('Sharing certificate:', certificate.id);
  };

  const getStatusColor = (status: Certificate['status']) => {
    switch (status) {
      case 'issued': return 'success';
      case 'pending': return 'warning';
      case 'draft': return 'info';
      default: return 'default';
    }
  };

  const getStatusText = (status: Certificate['status']) => {
    switch (status) {
      case 'issued': return '발급 완료';
      case 'pending': return '검토 중';
      case 'draft': return '임시 저장';
      default: return '알 수 없음';
    }
  };

  const getStatusIcon = (status: Certificate['status']) => {
    switch (status) {
      case 'issued': return <CheckCircleIcon />;
      case 'pending': return <PendingIcon />;
      case 'draft': return <WorkspacePremiumIcon />;
      default: return <WorkspacePremiumIcon />;
    }
  };

  return (
    <CertificationContainer sx={{ position: 'relative', overflow: 'hidden' }}>
      <FloatingShape
        sx={{
          width: 100,
          height: 100,
          top: '12%',
          right: '8%',
          animationDelay: '0s'
        }}
      />
      <FloatingShape
        sx={{
          width: 60,
          height: 60,
          bottom: '20%',
          left: '10%',
          animationDelay: '7s'
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" color="text.primary">
              경력증명서 관리
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setDialogOpen(true)}
              sx={{
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme => theme.palette.primary.dark}, ${theme => theme.palette.secondary.dark})`
                }
              }}
            >
              새 인증서 발급
            </Button>
          </Stack>

          {/* Certificates List */}
          <Stack spacing={3}>
            <Typography variant="h5" color="text.primary">
              발급된 인증서
            </Typography>
            
            {certificates.length === 0 ? (
              <CertificationCard>
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                  <WorkspacePremiumIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    발급된 인증서가 없습니다
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    첫 번째 경력증명서를 발급해보세요
                  </Typography>
                </CardContent>
              </CertificationCard>
            ) : (
              <Stack direction="row" flexWrap="wrap" gap={3}>
                {certificates.map((certificate) => (
                  <CertificationCard key={certificate.id} sx={{ minWidth: 350, flex: '1 1 300px' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
                              {certificate.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              생성일: {certificate.createdAt}
                            </Typography>
                            {certificate.issuedAt && (
                              <Typography variant="body2" color="text.secondary">
                                발급일: {certificate.issuedAt}
                              </Typography>
                            )}
                          </Box>
                          <Chip
                            icon={getStatusIcon(certificate.status)}
                            label={getStatusText(certificate.status)}
                            color={getStatusColor(certificate.status)}
                            variant="filled"
                            sx={{ borderRadius: '16px' }}
                          />
                        </Stack>
                        
                        {certificate.qrCode && (
                          <Box sx={{ 
                            p: 2, 
                            bgcolor: 'grey.50', 
                            borderRadius: '12px',
                            textAlign: 'center'
                          }}>
                            <QrCodeIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                            <Typography variant="caption" color="text.secondary">
                              QR 코드로 검증 가능
                            </Typography>
                          </Box>
                        )}
                      </Stack>
                    </CardContent>
                    
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Stack direction="row" spacing={1} width="100%">
                        {certificate.status === 'issued' && (
                          <>
                            <Button
                              size="small"
                              startIcon={<DownloadIcon />}
                              onClick={() => handleDownload(certificate)}
                              sx={{ borderRadius: '8px' }}
                            >
                              다운로드
                            </Button>
                            <Button
                              size="small"
                              startIcon={<ShareIcon />}
                              onClick={() => handleShare(certificate)}
                              sx={{ borderRadius: '8px' }}
                            >
                              공유
                            </Button>
                          </>
                        )}
                        <Button
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => navigate(`/verify?id=${certificate.id}`)}
                          sx={{ borderRadius: '8px' }}
                        >
                          미리보기
                        </Button>
                      </Stack>
                    </CardActions>
                  </CertificationCard>
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Container>

      {/* Create Certificate Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)'
          }
        }}
      >
        <DialogTitle>
          새 경력증명서 발급
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 2 }}>
            <Step>
              <StepLabel>템플릿 선택</StepLabel>
              <StepContent>
                <Stack spacing={2}>
                  <Typography variant="body2" color="text.secondary">
                    발급할 인증서 템플릿을 선택해주세요
                  </Typography>
                  <Stack spacing={2}>
                    {templates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        onClick={() => setSelectedTemplate(template.id)}
                        sx={{
                          border: selectedTemplate === template.id ? 
                            `2px solid ${theme => theme.palette.primary.main}` : 
                            '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                      >
                        <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
                          {template.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {template.description}
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1}>
                          {template.features.map((feature, index) => (
                            <Chip
                              key={index}
                              label={feature}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ borderRadius: '12px' }}
                            />
                          ))}
                        </Stack>
                      </TemplateCard>
                    ))}
                  </Stack>
                  <Box sx={{ mb: 1 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={!selectedTemplate}
                      sx={{ mt: 1, mr: 1, borderRadius: '12px' }}
                    >
                      다음
                    </Button>
                  </Box>
                </Stack>
              </StepContent>
            </Step>
            
            <Step>
              <StepLabel>정보 입력</StepLabel>
              <StepContent>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="인증서 제목"
                    value={formData.title}
                    onChange={handleInputChange('title')}
                    placeholder="예: 글로벌 비즈니스 전문가 인증서"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                  
                  <TextField
                    fullWidth
                    label="설명"
                    value={formData.description}
                    onChange={handleInputChange('description')}
                    multiline
                    rows={3}
                    placeholder="인증서에 포함될 설명을 입력해주세요"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                  
                  <TextField
                    fullWidth
                    label="주요 역량"
                    value={formData.skills}
                    onChange={handleInputChange('skills')}
                    placeholder="예: 프로젝트 관리, 글로벌 커뮤니케이션, 시장 분석"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                  
                  <TextField
                    fullWidth
                    label="주요 성과"
                    value={formData.achievements}
                    onChange={handleInputChange('achievements')}
                    multiline
                    rows={3}
                    placeholder="주요 프로젝트 성과와 결과를 입력해주세요"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                  
                  <Box sx={{ mb: 1 }}>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1, borderRadius: '12px' }}
                    >
                      다음
                    </Button>
                    <Button
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1, borderRadius: '12px' }}
                    >
                      이전
                    </Button>
                  </Box>
                </Stack>
              </StepContent>
            </Step>
            
            <Step>
              <StepLabel>검토 및 발급</StepLabel>
              <StepContent>
                <Stack spacing={2}>
                  <Typography variant="body2" color="text.secondary">
                    입력하신 정보를 검토하고 인증서를 발급합니다
                  </Typography>
                  
                  <Paper sx={{ p: 2, bgcolor: 'grey.50', borderRadius: '12px' }}>
                    <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1 }}>
                      발급 정보 요약
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • 템플릿: {templates.find(t => t.id === selectedTemplate)?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • 제목: {formData.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      • 발급 예상 시간: 1-2 영업일
                    </Typography>
                  </Paper>
                  
                  <Box sx={{ mb: 1 }}>
                    <Button
                      variant="contained"
                      onClick={handleCreateCertificate}
                      sx={{ 
                        mt: 1, 
                        mr: 1, 
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${theme => theme.palette.success.main}, ${theme => theme.palette.success.dark})`
                      }}
                    >
                      발급 신청
                    </Button>
                    <Button
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1, borderRadius: '12px' }}
                    >
                      이전
                    </Button>
                  </Box>
                </Stack>
              </StepContent>
            </Step>
          </Stepper>
        </DialogContent>
      </Dialog>
    </CertificationContainer>
  );
};

export default Certification;
