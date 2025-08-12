import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import StarIcon from '@mui/icons-material/Star';

const EducationCard = styled(Paper)(({ theme }) => ({
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

const GPADisplay = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${theme.palette.success.main}15, ${theme.palette.success.light}10)`,
  border: `1px solid ${theme.palette.success.main}30`,
  textAlign: 'center'
}));

interface EducationManagementProps {
  educations: Array<{
    id: string;
    institution: string;
    degree: string;
    major: string;
    startYear: number;
    endYear?: number;
    gpa: number;
    maxGpa: number;
    honors: string[];
    transcripts: Array<{
      semester: string;
      courses: string[];
      gpa: number;
    }>;
  }>;
  onEducationAdd?: (education: any) => void;
  onEducationUpdate?: (education: any) => void;
  onTranscriptUpload?: (file: File) => void;
}

const EducationManagement: React.FC<EducationManagementProps> = ({
  educations,
  onEducationAdd,
  onEducationUpdate,
  onTranscriptUpload
}) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [transcriptDialogOpen, setTranscriptDialogOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<any>(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: 'bachelor',
    major: '',
    startYear: new Date().getFullYear(),
    endYear: '',
    gpa: '',
    maxGpa: '4.0'
  });

  const degreeOptions = [
    { value: 'high_school', label: '고등학교' },
    { value: 'bachelor', label: '학사' },
    { value: 'master', label: '석사' },
    { value: 'doctorate', label: '박사' },
    { value: 'certificate', label: '수료증' }
  ];

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      ...formData,
      endYear: formData.endYear ? parseInt(formData.endYear) : undefined,
      gpa: parseFloat(formData.gpa),
      maxGpa: parseFloat(formData.maxGpa),
      honors: [],
      transcripts: []
    };
    
    onEducationAdd?.(newEducation);
    setAddDialogOpen(false);
    setFormData({
      institution: '',
      degree: 'bachelor',
      major: '',
      startYear: new Date().getFullYear(),
      endYear: '',
      gpa: '',
      maxGpa: '4.0'
    });
  };

  const handleEditEducation = (education: any) => {
    setSelectedEducation(education);
    setFormData({
      institution: education.institution,
      degree: education.degree,
      major: education.major,
      startYear: education.startYear,
      endYear: education.endYear?.toString() || '',
      gpa: education.gpa.toString(),
      maxGpa: education.maxGpa.toString()
    });
    setEditDialogOpen(true);
  };

  const handleUpdateEducation = () => {
    const updatedEducation = {
      ...selectedEducation,
      ...formData,
      endYear: formData.endYear ? parseInt(formData.endYear) : undefined,
      gpa: parseFloat(formData.gpa),
      maxGpa: parseFloat(formData.maxGpa)
    };
    
    onEducationUpdate?.(updatedEducation);
    setEditDialogOpen(false);
    setSelectedEducation(null);
  };

  const formatPeriod = (startYear: number, endYear?: number) => {
    if (!endYear) return `${startYear}년 ~`;
    return `${startYear}년 ~ ${endYear}년`;
  };

  const getGPAColor = (gpa: number, maxGpa: number) => {
    const percentage = (gpa / maxGpa) * 100;
    if (percentage >= 90) return 'success.main';
    if (percentage >= 80) return 'primary.main';
    if (percentage >= 70) return 'warning.main';
    return 'error.main';
  };

  return (
    <>
      <Stack spacing={3}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color="text.primary">
            학력 관리
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddDialogOpen(true)}
            sx={{
              borderRadius: '12px',
              background: theme => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
            }}
          >
            학력 추가
          </Button>
        </Stack>

        {/* Education List */}
        {educations.length === 0 ? (
          <EducationCard elevation={0}>
            <Box textAlign="center" py={4}>
              <SchoolIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                등록된 학력이 없습니다
              </Typography>
              <Typography variant="body2" color="text.secondary">
                첫 번째 학력을 추가해보세요
              </Typography>
            </Box>
          </EducationCard>
        ) : (
          educations.map((education) => (
            <EducationCard key={education.id} elevation={0}>
              <Stack spacing={3}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '12px',
                        background: theme => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <SchoolIcon sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" color="text.primary">
                        {education.institution}
                      </Typography>
                      <Typography variant="subtitle1" color="primary.main">
                        {education.major}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatPeriod(education.startYear, education.endYear)}
                      </Typography>
                    </Box>
                  </Stack>
                  
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleEditEducation(education)}
                      sx={{ color: 'primary.main' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={3}>
                  {/* GPA */}
                  <GPADisplay sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ color: getGPAColor(education.gpa, education.maxGpa), fontWeight: 700 }}>
                      {education.gpa.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      / {education.maxGpa} GPA
                    </Typography>
                  </GPADisplay>

                  {/* Honors */}
                  {education.honors.length > 0 && (
                    <Box sx={{ flex: 2 }}>
                      <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1 }}>
                        수상 및 영예
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {education.honors.map((honor, index) => (
                          <Chip
                            key={index}
                            icon={<StarIcon />}
                            label={honor}
                            color="warning"
                            variant="outlined"
                            sx={{ borderRadius: '16px' }}
                          />
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Stack>

                {/* Transcripts */}
                {education.transcripts.length > 0 && (
                  <Accordion sx={{ borderRadius: '12px' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        성적표 ({education.transcripts.length}개 학기)
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>학기</TableCell>
                              <TableCell>수강 과목</TableCell>
                              <TableCell align="center">GPA</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {education.transcripts.map((transcript, index) => (
                              <TableRow key={index}>
                                <TableCell>{transcript.semester}</TableCell>
                                <TableCell>
                                  <Stack direction="row" flexWrap="wrap" gap={0.5}>
                                    {transcript.courses.map((course, courseIndex) => (
                                      <Chip
                                        key={courseIndex}
                                        label={course}
                                        size="small"
                                        variant="outlined"
                                        sx={{ borderRadius: '12px' }}
                                      />
                                    ))}
                                  </Stack>
                                </TableCell>
                                <TableCell align="center">
                                  <Typography
                                    variant="body2"
                                    fontWeight={600}
                                    sx={{ color: getGPAColor(transcript.gpa, education.maxGpa) }}
                                  >
                                    {transcript.gpa.toFixed(2)}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                )}

                <Divider />

                {/* Actions */}
                <Stack direction="row" spacing={2}>
                  <Button
                    size="small"
                    startIcon={<FileUploadIcon />}
                    onClick={() => {
                      setSelectedEducation(education);
                      setTranscriptDialogOpen(true);
                    }}
                    sx={{ borderRadius: '8px' }}
                  >
                    성적표 업로드
                  </Button>
                  <Button
                    size="small"
                    startIcon={<DownloadIcon />}
                    sx={{ borderRadius: '8px' }}
                  >
                    졸업증명서
                  </Button>
                </Stack>
              </Stack>
            </EducationCard>
          ))
        )}
      </Stack>

      {/* Add Education Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
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
        <DialogTitle>학력 추가</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="학교명"
              value={formData.institution}
              onChange={handleInputChange('institution')}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="학위"
                select
                value={formData.degree}
                onChange={handleInputChange('degree')}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              >
                {degreeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="전공"
                value={formData.major}
                onChange={handleInputChange('major')}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Stack>
            
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="입학년도"
                type="number"
                value={formData.startYear}
                onChange={handleInputChange('startYear')}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="졸업년도"
                type="number"
                value={formData.endYear}
                onChange={handleInputChange('endYear')}
                placeholder="재학 중인 경우 비워두세요"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Stack>
            
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="GPA"
                type="number"
                value={formData.gpa}
                onChange={handleInputChange('gpa')}
                inputProps={{ step: 0.01, min: 0 }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="만점"
                type="number"
                value={formData.maxGpa}
                onChange={handleInputChange('maxGpa')}
                inputProps={{ step: 0.1, min: 0 }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setAddDialogOpen(false)}>취소</Button>
          <Button
            variant="contained"
            onClick={handleAddEducation}
            sx={{ borderRadius: '12px' }}
          >
            추가
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Education Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
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
        <DialogTitle>학력 수정</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="학교명"
              value={formData.institution}
              onChange={handleInputChange('institution')}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="학위"
                select
                value={formData.degree}
                onChange={handleInputChange('degree')}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              >
                {degreeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="전공"
                value={formData.major}
                onChange={handleInputChange('major')}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Stack>
            
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="GPA"
                type="number"
                value={formData.gpa}
                onChange={handleInputChange('gpa')}
                inputProps={{ step: 0.01, min: 0 }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="만점"
                type="number"
                value={formData.maxGpa}
                onChange={handleInputChange('maxGpa')}
                inputProps={{ step: 0.1, min: 0 }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditDialogOpen(false)}>취소</Button>
          <Button
            variant="contained"
            onClick={handleUpdateEducation}
            sx={{ borderRadius: '12px' }}
          >
            저장
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transcript Upload Dialog */}
      <Dialog
        open={transcriptDialogOpen}
        onClose={() => setTranscriptDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)'
          }
        }}
      >
        <DialogTitle>성적표 업로드</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'grey.300',
                borderRadius: '12px',
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'primary.main',
                  opacity: 0.05
                }
              }}
            >
              <FileUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                파일을 드래그하거나 클릭하여 업로드
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PDF, JPG, PNG 파일만 지원
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setTranscriptDialogOpen(false)}>취소</Button>
          <Button
            variant="contained"
            sx={{ borderRadius: '12px' }}
          >
            업로드
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EducationManagement;