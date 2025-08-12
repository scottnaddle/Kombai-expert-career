import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Divider,
  AvatarGroup
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ProjectCard = styled(Paper)(({ theme }) => ({
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

const StatusChip = styled(Chip)(({ theme, status }: { theme: any; status: string }) => ({
  borderRadius: '16px',
  fontWeight: 500,
  ...(status === 'in_progress' && {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText
  }),
  ...(status === 'completed' && {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText
  }),
  ...(status === 'planning' && {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText
  })
}));

const KPICard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}06)`,
  border: '1px solid rgba(255, 255, 255, 0.2)'
}));

interface ProjectDetailCardProps {
  project: {
    id: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    progress: number;
    budget: number;
    spent: number;
    team: Array<{
      id: string;
      name: string;
      role: string;
      avatar: string;
    }>;
    milestones: Array<{
      id: string;
      title: string;
      date: string;
      completed: boolean;
    }>;
    kpis: Array<{
      name: string;
      target: number;
      current: number;
      unit: string;
    }>;
  };
  onProjectUpdate?: (project: any) => void;
}

const ProjectDetailCard: React.FC<ProjectDetailCardProps> = ({ project, onProjectUpdate }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false);
  const [teamDialogOpen, setTeamDialogOpen] = useState(false);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in_progress': return '진행 중';
      case 'completed': return '완료';
      case 'planning': return '계획';
      case 'on_hold': return '보류';
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <ProjectCard elevation={0}>
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
                <FolderIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="h6" color="text.primary">
                  {project.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.startDate} - {project.endDate}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <StatusChip
                label={getStatusText(project.status)}
                status={project.status}
                size="small"
              />
              <IconButton
                size="small"
                onClick={() => setEditDialogOpen(true)}
                sx={{ color: 'primary.main' }}
              >
                <EditIcon />
              </IconButton>
            </Stack>
          </Stack>

          {/* Progress */}
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Typography variant="subtitle2" color="text.primary">
                프로젝트 진행률
              </Typography>
              <Typography variant="body2" color="primary.main" fontWeight={600}>
                {project.progress}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={project.progress}
              sx={{
                height: 8,
                borderRadius: '4px',
                backgroundColor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  borderRadius: '4px',
                  background: theme => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                }
              }}
            />
          </Box>

          {/* Budget */}
          <Stack direction="row" spacing={3}>
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <AttachMoneyIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="subtitle2" color="text.secondary">
                  예산
                </Typography>
              </Stack>
              <Typography variant="h6" color="text.primary">
                {formatCurrency(project.budget)}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <TrendingUpIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="subtitle2" color="text.secondary">
                  사용
                </Typography>
              </Stack>
              <Typography variant="h6" color="warning.main">
                {formatCurrency(project.spent)}
              </Typography>
            </Box>
          </Stack>

          <Divider />

          {/* Team */}
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.primary">
                팀 구성원
              </Typography>
              <Button
                size="small"
                startIcon={<PersonAddIcon />}
                onClick={() => setTeamDialogOpen(true)}
                sx={{ borderRadius: '8px' }}
              >
                추가
              </Button>
            </Stack>
            
            <Stack direction="row" spacing={2} alignItems="center">
              <AvatarGroup max={4}>
                {project.team.map((member) => (
                  <Avatar
                    key={member.id}
                    src={member.avatar}
                    alt={member.name}
                    sx={{ width: 40, height: 40 }}
                  />
                ))}
              </AvatarGroup>
              <Stack spacing={0.5}>
                {project.team.slice(0, 2).map((member) => (
                  <Typography key={member.id} variant="caption" color="text.secondary">
                    {member.name} - {member.role}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Box>

          <Divider />

          {/* Milestones */}
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="subtitle1" color="text.primary">
                마일스톤
              </Typography>
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={() => setMilestoneDialogOpen(true)}
                sx={{ borderRadius: '8px' }}
              >
                추가
              </Button>
            </Stack>
            
            <Stack spacing={1}>
              {project.milestones.map((milestone) => (
                <Stack key={milestone.id} direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: milestone.completed ? 'success.main' : 'grey.300'
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      color={milestone.completed ? 'text.primary' : 'text.secondary'}
                      sx={{ textDecoration: milestone.completed ? 'line-through' : 'none' }}
                    >
                      {milestone.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {milestone.date}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* KPIs */}
          <Box>
            <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2 }}>
              핵심 성과 지표
            </Typography>
            <Stack direction="row" spacing={2}>
              {project.kpis.map((kpi, index) => (
                <KPICard key={index} sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {kpi.name}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    {kpi.current}{kpi.unit}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    목표: {kpi.target}{kpi.unit}
                  </Typography>
                </KPICard>
              ))}
            </Stack>
          </Box>
        </Stack>
      </ProjectCard>

      {/* Edit Project Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
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
        <DialogTitle>프로젝트 편집</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="프로젝트 명"
              defaultValue={project.name}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField
              fullWidth
              label="상태"
              select
              defaultValue={project.status}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            >
              <MenuItem value="planning">계획</MenuItem>
              <MenuItem value="in_progress">진행 중</MenuItem>
              <MenuItem value="completed">완료</MenuItem>
              <MenuItem value="on_hold">보류</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditDialogOpen(false)}>취소</Button>
          <Button variant="contained" sx={{ borderRadius: '12px' }}>저장</Button>
        </DialogActions>
      </Dialog>

      {/* Add Milestone Dialog */}
      <Dialog
        open={milestoneDialogOpen}
        onClose={() => setMilestoneDialogOpen(false)}
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
        <DialogTitle>마일스톤 추가</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="마일스톤 제목"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField
              fullWidth
              label="완료 예정일"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setMilestoneDialogOpen(false)}>취소</Button>
          <Button variant="contained" sx={{ borderRadius: '12px' }}>추가</Button>
        </DialogActions>
      </Dialog>

      {/* Add Team Member Dialog */}
      <Dialog
        open={teamDialogOpen}
        onClose={() => setTeamDialogOpen(false)}
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
        <DialogTitle>팀원 추가</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="이름"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField
              fullWidth
              label="역할"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
            <TextField
              fullWidth
              label="이메일"
              type="email"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setTeamDialogOpen(false)}>취소</Button>
          <Button variant="contained" sx={{ borderRadius: '12px' }}>추가</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectDetailCard;