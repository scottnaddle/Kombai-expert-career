import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack, 
  Paper, 
  Alert,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PsychologyIcon from '@mui/icons-material/Psychology';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  fetchCareerExperiences, 
  addCareerExperience, 
  updateCareerExperience, 
  deleteCareerExperience,
  clearError,
  type CareerExperience,
  type CareerProject
} from '../store/slices/careerSlice';

const CareerContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}10 0%, 
    ${theme.palette.secondary.main}08 25%, 
    ${theme.palette.info.main}06 50%, 
    ${theme.palette.primary.main}08 75%, 
    ${theme.palette.secondary.main}10 100%)`,
  paddingY: theme.spacing(4)
}));

const CareerCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)'
  }
}));

const AnalysisCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}08, 
    ${theme.palette.secondary.main}06)`,
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)'
}));

const FloatingShape = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}12, ${theme.palette.secondary.main}08)`,
  animation: 'float 12s ease-in-out infinite'
}));

const Career: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { experiences, isLoading, error } = useAppSelector((state) => state.career);
  const { user } = useAppSelector((state) => state.auth);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<CareerExperience | null>(null);
  const [formData, setFormData] = useState<CareerExperience>({
    company: '',
    department: '',
    position: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
    projects: []
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(fetchCareerExperiences());
  }, [user, navigate, dispatch]);

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
    if (editingExperience) {
      dispatch(updateCareerExperience({ ...formData, id: editingExperience.id }));
    } else {
      dispatch(addCareerExperience(formData));
    }
    handleCloseDialog();
  };

  const handleEdit = (experience: CareerExperience) => {
    setEditingExperience(experience);
    setFormData(experience);
    setDialogOpen(true);
  };

  const handleDelete = (experienceId: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deleteCareerExperience(experienceId));
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingExperience(null);
    setFormData({
      company: '',
      department: '',
      position: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
      projects: []
    });
  };

  // Mock data for charts
  const skillsData = [
    { skill: '프로젝트 관리', level: 85 },
    { skill: '글로벌 비즈니스', level: 90 },
    { skill: '시장 분석', level: 75 },
    { skill: '팀 리더십', level: 80 },
    { skill: '다국어 소통', level: 95 }
  ];

  const radarData = [
    { subject: '전략 기획', A: 85, fullMark: 100 },
    { subject: '운영 관리', A: 75, fullMark: 100 },
    { subject: '시장 개발', A: 90, fullMark: 100 },
    { subject: '팀 관리', A: 80, fullMark: 100 },
    { subject: '문화 적응', A: 95, fullMark: 100 },
    { subject: '위험 관리', A: 70, fullMark: 100 }
  ];

  return (
    <CareerContainer sx={{ position: 'relative', overflow: 'hidden' }}>
      <FloatingShape
        sx={{
          width: 120,
          height: 120,
          top: '8%',
          right: '10%',
          animationDelay: '0s'
        }}
      />
      <FloatingShape
        sx={{
          width: 80,
          height: 80,
          bottom: '15%',
          left: '5%',
          animationDelay: '6s'
        }}
      />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" color="text.primary">
              커리어 관리
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
              경력 추가
            </Button>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <Stack direction={{ xs: 'column', xl: 'row' }} spacing={4}>
            {/* Career List */}
            <Box sx={{ flex: 2 }}>
              <Stack spacing={3}>
                <Typography variant="h5" color="text.primary">
                  경력 사항
                </Typography>
                
                {experiences.length === 0 ? (
                  <CareerCard elevation={0}>
                    <Box textAlign="center" py={4}>
                      <WorkIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        등록된 경력이 없습니다
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        첫 번째 경력을 추가해보세요
                      </Typography>
                    </Box>
                  </CareerCard>
                ) : (
                  experiences.map((experience, index) => (
                    <CareerCard key={experience.id || index} elevation={0}>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" color="text.primary">
                              {experience.position}
                            </Typography>
                            <Typography variant="subtitle1" color="primary.main" sx={{ mb: 1 }}>
                              {experience.company} • {experience.department}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {experience.startDate} - {experience.endDate}
                            </Typography>
                          </Box>
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(experience)}
                              sx={{ color: 'primary.main' }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => experience.id && handleDelete(experience.id)}
                              sx={{ color: 'error.main' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </Stack>
                        
                        <Typography variant="body2" color="text.secondary">
                          {experience.responsibilities}
                        </Typography>
                        
                        {experience.projects && experience.projects.length > 0 && (
                          <Box>
                            <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1 }}>
                              주요 프로젝트
                            </Typography>
                            <Stack spacing={1}>
                              {experience.projects.map((project, projectIndex) => (
                                <Accordion key={projectIndex} sx={{ borderRadius: '12px' }}>
                                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography variant="body2" fontWeight={500}>
                                      {project.projectName}
                                    </Typography>
                                  </AccordionSummary>
                                  <AccordionDetails>
                                    <Stack spacing={1}>
                                      <Typography variant="caption" color="text.secondary">
                                        역할: {project.role}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        국가: {project.countries?.join(', ')}
                                      </Typography>
                                      <Typography variant="body2">
                                        {project.achievements}
                                      </Typography>
                                    </Stack>
                                  </AccordionDetails>
                                </Accordion>
                              ))}
                            </Stack>
                          </Box>
                        )}
                      </Stack>
                    </CareerCard>
                  ))
                )}
              </Stack>
            </Box>

            {/* AI Analysis */}
            <Box sx={{ flex: 1 }}>
              <Stack spacing={3}>
                <Typography variant="h5" color="text.primary">
                  AI 역량 분석
                </Typography>
                
                {/* Skills Chart */}
                <AnalysisCard elevation={0}>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <InsertChartOutlinedIcon sx={{ color: 'primary.main' }} />
                      <Typography variant="h6" color="text.primary">
                        핵심 역량
                      </Typography>
                    </Stack>
                    
                    <Box sx={{ height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={skillsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="skill" 
                            fontSize={12}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                          />
                          <YAxis />
                          <Tooltip />
                          <Bar 
                            dataKey="level" 
                            fill="url(#colorGradient)"
                            radius={[4, 4, 0, 0]}
                          />
                          <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.8}/>
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Stack>
                </AnalysisCard>

                {/* Radar Chart */}
                <AnalysisCard elevation={0}>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <PsychologyIcon sx={{ color: 'secondary.main' }} />
                      <Typography variant="h6" color="text.primary">
                        종합 역량 맵
                      </Typography>
                    </Stack>
                    
                    <Box sx={{ height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" fontSize={12} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} />
                          <Radar
                            name="역량"
                            dataKey="A"
                            stroke="#7C3AED"
                            fill="#7C3AED"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </Box>
                  </Stack>
                </AnalysisCard>

                {/* Recommendations */}
                <AnalysisCard elevation={0}>
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <TrendingUpIcon sx={{ color: 'success.main' }} />
                      <Typography variant="h6" color="text.primary">
                        성장 추천
                      </Typography>
                    </Stack>
                    
                    <Stack spacing={2}>
                      <Chip
                        label="데이터 분석 역량 강화"
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: '16px' }}
                      />
                      <Chip
                        label="디지털 마케팅 교육"
                        color="secondary"
                        variant="outlined"
                        sx={{ borderRadius: '16px' }}
                      />
                      <Chip
                        label="AI/ML 기초 과정"
                        color="info"
                        variant="outlined"
                        sx={{ borderRadius: '16px' }}
                      />
                    </Stack>
                    
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate('/certification')}
                      sx={{
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${theme => theme.palette.success.main}, ${theme => theme.palette.success.dark})`,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme => theme.palette.success.dark}, ${theme => theme.palette.success.main})`
                        }
                      }}
                    >
                      경력증명서 발급
                    </Button>
                  </Stack>
                </AnalysisCard>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </Container>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
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
          {editingExperience ? '경력 수정' : '경력 추가'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="회사명"
              value={formData.company}
              onChange={handleInputChange('company')}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="부서"
                value={formData.department}
                onChange={handleInputChange('department')}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="직책"
                value={formData.position}
                onChange={handleInputChange('position')}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Stack>
            
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="시작일"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange('startDate')}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="종료일"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange('endDate')}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Stack>
            
            <TextField
              fullWidth
              label="담당 업무"
              value={formData.responsibilities}
              onChange={handleInputChange('responsibilities')}
              multiline
              rows={4}
              placeholder="주요 담당 업무와 성과를 입력해주세요"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleCloseDialog}
            sx={{ borderRadius: '12px' }}
          >
            취소
          </Button>
          <Button 
            onClick={handleSave}
            variant="contained"
            disabled={isLoading}
            sx={{
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`
            }}
          >
            {isLoading ? '저장 중...' : '저장'}
          </Button>
        </DialogActions>
      </Dialog>
    </CareerContainer>
  );
};

export default Career;
