import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  MenuItem,
  TextField,
  Card,
  CardContent,
  Tabs,
  Tab,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import VerifiedIcon from '@mui/icons-material/Verified';
import DownloadIcon from '@mui/icons-material/Download';
import DateRangeIcon from '@mui/icons-material/DateRange';

const DashboardCard = styled(Paper)(({ theme }) => ({
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

const MetricCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}06)`,
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

interface AnalyticsDashboardProps {
  skillGrowthData: Array<{
    month: string;
    leadership: number;
    communication: number;
    technical: number;
  }>;
  projectSuccessData: Array<{
    quarter: string;
    success: number;
    total: number;
  }>;
  verificationAnalytics: {
    totalVerifications: number;
    successRate: number;
    monthlyTrend: Array<{
      month: string;
      verifications: number;
      success: number;
    }>;
    topVerifiers: Array<{
      name: string;
      count: number;
    }>;
  };
  timeRange?: 'week' | 'month' | 'year';
  onExportData?: () => void;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  skillGrowthData,
  projectSuccessData,
  verificationAnalytics,
  timeRange = 'month',
  onExportData
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);

  const COLORS = ['#2563EB', '#7C3AED', '#10B981', '#F59E0B', '#EF4444'];

  const skillMetrics = [
    {
      title: '총 검증 수',
      value: verificationAnalytics.totalVerifications,
      icon: <VerifiedIcon />,
      color: 'primary',
      change: '+12%'
    },
    {
      title: '성공률',
      value: `${verificationAnalytics.successRate}%`,
      icon: <TrendingUpIcon />,
      color: 'success',
      change: '+2.3%'
    },
    {
      title: '활성 사용자',
      value: '1,234',
      icon: <PeopleIcon />,
      color: 'info',
      change: '+8.1%'
    },
    {
      title: '월간 성장률',
      value: '15.2%',
      icon: <AssessmentIcon />,
      color: 'warning',
      change: '+1.2%'
    }
  ];

  const pieData = verificationAnalytics.topVerifiers.map((verifier, index) => ({
    name: verifier.name,
    value: verifier.count,
    color: COLORS[index % COLORS.length]
  }));

  const TabPanel = ({ children, value, index }: { children: React.ReactNode; value: number; index: number }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Stack spacing={4}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" color="text.primary">
          분석 대시보드
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            size="small"
            label="기간"
            select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as any)}
            sx={{
              minWidth: 120,
              '& .MuiOutlinedInput-root': { borderRadius: '12px' }
            }}
          >
            <MenuItem value="week">주간</MenuItem>
            <MenuItem value="month">월간</MenuItem>
            <MenuItem value="year">연간</MenuItem>
          </TextField>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={onExportData}
            sx={{ borderRadius: '12px' }}
          >
            데이터 내보내기
          </Button>
        </Stack>
      </Stack>

      {/* Metrics Cards */}
      <Grid container spacing={3}>
        {skillMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <MetricCard>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {metric.title}
                    </Typography>
                    <Typography variant="h4" color="text.primary" fontWeight={700}>
                      {metric.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: metric.change.startsWith('+') ? 'success.main' : 'error.main',
                        fontWeight: 600
                      }}
                    >
                      {metric.change} 지난 달 대비
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: theme => `linear-gradient(135deg, ${theme.palette[metric.color as keyof typeof theme.palette].main}, ${theme.palette[metric.color as keyof typeof theme.palette].dark})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    {metric.icon}
                  </Box>
                </Stack>
              </CardContent>
            </MetricCard>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <DashboardCard elevation={0}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
        >
          <Tab label="스킬 성장 분석" />
          <Tab label="프로젝트 성과" />
          <Tab label="검증 통계" />
          <Tab label="사용자 분석" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Stack spacing={3}>
            <Typography variant="h6" color="text.primary">
              스킬 성장 추이
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={skillGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="leadership"
                    stackId="1"
                    stroke="#2563EB"
                    fill="#2563EB"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="communication"
                    stackId="1"
                    stroke="#7C3AED"
                    fill="#7C3AED"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="technical"
                    stackId="1"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Stack spacing={3}>
            <Typography variant="h6" color="text.primary">
              프로젝트 성공률
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectSuccessData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="success" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="total" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Stack spacing={3}>
            <Typography variant="h6" color="text.primary">
              검증 통계 및 트렌드
            </Typography>
            <Stack direction="row" spacing={4}>
              {/* Line Chart */}
              <Box sx={{ flex: 2 }}>
                <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2 }}>
                  월별 검증 추이
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={verificationAnalytics.monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="verifications"
                        stroke="#2563EB"
                        strokeWidth={3}
                        dot={{ fill: '#2563EB', strokeWidth: 2, r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="success"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Box>

              {/* Pie Chart */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2 }}>
                  주요 검증 기관
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Stack spacing={3}>
            <Typography variant="h6" color="text.primary">
              사용자 활동 분석
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={skillGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="leadership"
                    stroke="#2563EB"
                    fill="url(#colorGradient)"
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Stack>
        </TabPanel>
      </DashboardCard>

      {/* Summary Cards */}
      <Stack direction="row" spacing={3}>
        <DashboardCard sx={{ flex: 1 }} elevation={0}>
          <Stack spacing={2}>
            <Typography variant="h6" color="text.primary">
              이번 달 하이라이트
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                • 검증 요청 52건 처리 (전월 대비 +15%)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • 평균 처리 시간 1.2일 (전월 대비 -0.3일)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • 신규 파트너 기업 3곳 추가
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • 사용자 만족도 4.8/5.0 달성
              </Typography>
            </Stack>
          </Stack>
        </DashboardCard>

        <DashboardCard sx={{ flex: 1 }} elevation={0}>
          <Stack spacing={2}>
            <Typography variant="h6" color="text.primary">
              개선 권장사항
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" color="text.secondary">
                • 자동화 프로세스 도입으로 처리 속도 향상
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • 모바일 앱 최적화로 사용자 경험 개선
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • AI 기반 스킬 평가 정확도 향상
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • 다국어 지원 확대로 글로벌 서비스 강화
              </Typography>
            </Stack>
          </Stack>
        </DashboardCard>
      </Stack>
    </Stack>
  );
};

export default AnalyticsDashboard;