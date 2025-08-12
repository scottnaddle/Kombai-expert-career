import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Checkbox,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Badge,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';

const VerificationCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)'
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}06)`,
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
  textAlign: 'center'
}));

interface VerificationCenterProps {
  requests: Array<{
    id: string;
    certificateId: string;
    requesterName: string;
    requesterEmail: string;
    requestDate: string;
    status: 'pending' | 'verified' | 'rejected';
    purpose: string;
  }>;
  onVerificationApprove?: (requestId: string) => void;
  onVerificationReject?: (requestId: string) => void;
  onBatchProcess?: (requestIds: string[]) => void;
}

const VerificationCenter: React.FC<VerificationCenterProps> = ({
  requests,
  onVerificationApprove,
  onVerificationReject,
  onBatchProcess
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const filteredRequests = requests.filter(request => {
    const matchesStatus = filterStatus === 'all' || request.status === filterStatus;
    const matchesSearch = request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requesterEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const verifiedCount = requests.filter(r => r.status === 'verified').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRequests(filteredRequests.map(r => r.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleSelectRequest = (requestId: string, checked: boolean) => {
    if (checked) {
      setSelectedRequests(prev => [...prev, requestId]);
    } else {
      setSelectedRequests(prev => prev.filter(id => id !== requestId));
    }
  };

  const handleBatchApprove = () => {
    onBatchProcess?.(selectedRequests);
    setSelectedRequests([]);
  };

  const handleBatchReject = () => {
    onBatchProcess?.(selectedRequests);
    setSelectedRequests([]);
  };

  const handleViewDetail = (request: any) => {
    setSelectedRequest(request);
    setDetailDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified': return '승인됨';
      case 'pending': return '대기 중';
      case 'rejected': return '거부됨';
      default: return status;
    }
  };

  const TabPanel = ({ children, value, index }: { children: React.ReactNode; value: number; index: number }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <>
      <Stack spacing={4}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" color="text.primary">
            검증 관리 센터
          </Typography>
          <Stack direction="row" spacing={2}>
            {selectedRequests.length > 0 && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckIcon />}
                  onClick={handleBatchApprove}
                  sx={{ borderRadius: '12px' }}
                >
                  일괄 승인 ({selectedRequests.length})
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CloseIcon />}
                  onClick={handleBatchReject}
                  sx={{ borderRadius: '12px' }}
                >
                  일괄 거부
                </Button>
              </>
            )}
          </Stack>
        </Stack>

        {/* Stats */}
        <Stack direction="row" spacing={3}>
          <StatsCard sx={{ flex: 1 }}>
            <Typography variant="h3" color="warning.main" fontWeight={700}>
              {pendingCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              대기 중인 요청
            </Typography>
          </StatsCard>
          <StatsCard sx={{ flex: 1 }}>
            <Typography variant="h3" color="success.main" fontWeight={700}>
              {verifiedCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              승인된 요청
            </Typography>
          </StatsCard>
          <StatsCard sx={{ flex: 1 }}>
            <Typography variant="h3" color="error.main" fontWeight={700}>
              {rejectedCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              거부된 요청
            </Typography>
          </StatsCard>
        </Stack>

        {/* Filters and Search */}
        <VerificationCard elevation={0}>
          <Stack spacing={3}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
            >
              <Tab
                label={
                  <Badge badgeContent={pendingCount} color="warning">
                    대기 중
                  </Badge>
                }
              />
              <Tab label="승인됨" />
              <Tab label="거부됨" />
              <Tab label="전체" />
            </Tabs>

            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                size="small"
                placeholder="요청자 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                }}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': { borderRadius: '12px' }
                }}
              />
              <TextField
                size="small"
                label="상태 필터"
                select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{
                  minWidth: 120,
                  '& .MuiOutlinedInput-root': { borderRadius: '12px' }
                }}
              >
                <MenuItem value="all">전체</MenuItem>
                <MenuItem value="pending">대기 중</MenuItem>
                <MenuItem value="verified">승인됨</MenuItem>
                <MenuItem value="rejected">거부됨</MenuItem>
              </TextField>
            </Stack>
          </Stack>
        </VerificationCard>

        {/* Verification Table */}
        <VerificationCard elevation={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRequests.length === filteredRequests.length && filteredRequests.length > 0}
                      indeterminate={selectedRequests.length > 0 && selectedRequests.length < filteredRequests.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </TableCell>
                  <TableCell>요청자</TableCell>
                  <TableCell>인증서 ID</TableCell>
                  <TableCell>목적</TableCell>
                  <TableCell>요청일</TableCell>
                  <TableCell>상태</TableCell>
                  <TableCell align="center">작업</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedRequests.includes(request.id)}
                        onChange={(e) => handleSelectRequest(request.id, e.target.checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Typography variant="body2" fontWeight={500}>
                          {request.requesterName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {request.requesterEmail}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {request.certificateId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {request.purpose}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {request.requestDate}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(request.status)}
                        color={getStatusColor(request.status) as any}
                        size="small"
                        sx={{ borderRadius: '16px' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title="상세 보기">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetail(request)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        {request.status === 'pending' && (
                          <>
                            <Tooltip title="승인">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => onVerificationApprove?.(request.id)}
                              >
                                <CheckIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="거부">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => onVerificationReject?.(request.id)}
                              >
                                <CloseIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredRequests.length === 0 && (
            <Box textAlign="center" py={6}>
              <VerifiedUserIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                검증 요청이 없습니다
              </Typography>
              <Typography variant="body2" color="text.secondary">
                새로운 검증 요청을 기다리고 있습니다
              </Typography>
            </Box>
          )}
        </VerificationCard>
      </Stack>

      {/* Detail Dialog */}
      <Dialog
        open={detailDialogOpen}
        onClose={() => setDetailDialogOpen(false)}
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
          <Stack direction="row" alignItems="center" spacing={2}>
            <VerifiedUserIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6">검증 요청 상세</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Stack spacing={3}>
              <Stack direction="row" spacing={3}>
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <BusinessIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      요청 기관
                    </Typography>
                  </Stack>
                  <Typography variant="h6" color="text.primary">
                    {selectedRequest.requesterName}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      연락처
                    </Typography>
                  </Stack>
                  <Typography variant="body1" color="text.primary">
                    {selectedRequest.requesterEmail}
                  </Typography>
                </Box>
              </Stack>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  인증서 ID
                </Typography>
                <Typography variant="body1" fontFamily="monospace" color="text.primary">
                  {selectedRequest.certificateId}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  검증 목적
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {selectedRequest.purpose}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  요청일
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {selectedRequest.requestDate}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  현재 상태
                </Typography>
                <Chip
                  label={getStatusText(selectedRequest.status)}
                  color={getStatusColor(selectedRequest.status) as any}
                  sx={{ borderRadius: '16px' }}
                />
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setDetailDialogOpen(false)}
            sx={{ borderRadius: '12px' }}
          >
            닫기
          </Button>
          {selectedRequest?.status === 'pending' && (
            <>
              <Button
                variant="contained"
                color="error"
                startIcon={<CloseIcon />}
                onClick={() => {
                  onVerificationReject?.(selectedRequest.id);
                  setDetailDialogOpen(false);
                }}
                sx={{ borderRadius: '12px' }}
              >
                거부
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckIcon />}
                onClick={() => {
                  onVerificationApprove?.(selectedRequest.id);
                  setDetailDialogOpen(false);
                }}
                sx={{ borderRadius: '12px' }}
              >
                승인
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VerificationCenter;