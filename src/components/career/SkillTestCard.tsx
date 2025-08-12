import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const TestCard = styled(Paper)(({ theme }) => ({
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

const ResultCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}06)`,
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)'
}));

interface SkillTestCardProps {
  assessment: {
    testId: string;
    title: string;
    duration: number;
    totalQuestions: number;
    categories: Array<{
      name: string;
      questions: number;
      score: number;
    }>;
    overallScore: number;
    recommendations: string[];
  };
  onTestStart?: (testId: string) => void;
  onTestComplete?: (result: any) => void;
}

const SkillTestCard: React.FC<SkillTestCardProps> = ({ assessment, onTestStart, onTestComplete }) => {
  const [testDialogOpen, setTestDialogOpen] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [testStarted, setTestStarted] = useState(false);

  const mockQuestions = [
    {
      question: "글로벌 시장 진출 시 가장 중요한 요소는 무엇입니까?",
      options: ["현지 문화 이해", "가격 경쟁력", "기술적 우위", "마케팅 전략"]
    },
    {
      question: "프로젝트 관리에서 위험 관리의 핵심은?",
      options: ["위험 회피", "위험 분석", "위험 대응", "위험 모니터링"]
    },
    {
      question: "효과적인 팀 커뮤니케이션을 위한 방법은?",
      options: ["정기 회의", "명확한 목표 설정", "피드백 시스템", "모든 것"]
    }
  ];

  const handleStartTest = () => {
    setTestDialogOpen(true);
    setTestStarted(true);
    onTestStart?.(assessment.testId);
  };

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Test completed
      setTestDialogOpen(false);
      setResultDialogOpen(true);
      onTestComplete?.(assessment);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'success.main';
    if (score >= 75) return 'primary.main';
    if (score >= 60) return 'warning.main';
    return 'error.main';
  };

  const radarData = assessment.categories.map(cat => ({
    subject: cat.name,
    score: cat.score,
    fullMark: 100
  }));

  return (
    <>
      <TestCard elevation={0}>
        <Stack spacing={3}>
          {/* Header */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '16px',
                background: theme => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <PsychologyIcon sx={{ color: 'white', fontSize: 30 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" color="text.primary">
                {assessment.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {assessment.duration}분 • {assessment.totalQuestions}문항
              </Typography>
            </Box>
          </Stack>

          {/* Test Info */}
          <Stack direction="row" spacing={2}>
            <Chip
              icon={<AssessmentIcon />}
              label={`${assessment.categories.length}개 영역`}
              variant="outlined"
              sx={{ borderRadius: '16px' }}
            />
            <Chip
              icon={<EmojiEventsIcon />}
              label={`최고 점수: ${assessment.overallScore}점`}
              color="primary"
              sx={{ borderRadius: '16px' }}
            />
          </Stack>

          {/* Categories */}
          <Box>
            <Typography variant="subtitle2" color="text.primary" sx={{ mb: 2 }}>
              평가 영역
            </Typography>
            <Stack spacing={2}>
              {assessment.categories.map((category, index) => (
                <Box key={index}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.primary">
                      {category.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: getScoreColor(category.score), fontWeight: 600 }}
                    >
                      {category.score}점
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={category.score}
                    sx={{
                      height: 6,
                      borderRadius: '3px',
                      backgroundColor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: '3px',
                        backgroundColor: getScoreColor(category.score)
                      }
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Actions */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              onClick={handleStartTest}
              sx={{
                borderRadius: '12px',
                background: theme => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
              }}
            >
              테스트 시작
            </Button>
            <Button
              variant="outlined"
              startIcon={<AssessmentIcon />}
              onClick={() => setResultDialogOpen(true)}
              sx={{ borderRadius: '12px' }}
            >
              결과 보기
            </Button>
          </Stack>
        </Stack>
      </TestCard>

      {/* Test Dialog */}
      <Dialog
        open={testDialogOpen}
        onClose={() => setTestDialogOpen(false)}
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
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">스킬 테스트</Typography>
            <Typography variant="body2" color="text.secondary">
              {currentQuestion + 1} / {mockQuestions.length}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Stepper activeStep={currentQuestion} alternativeLabel>
              {mockQuestions.map((_, index) => (
                <Step key={index}>
                  <StepLabel>{`문제 ${index + 1}`}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ p: 3, bgcolor: 'grey.50', borderRadius: '12px' }}>
              <Typography variant="h6" color="text.primary" sx={{ mb: 3 }}>
                {mockQuestions[currentQuestion]?.question}
              </Typography>

              <RadioGroup
                value={answers[currentQuestion] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
              >
                {mockQuestions[currentQuestion]?.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                    sx={{ mb: 1 }}
                  />
                ))}
              </RadioGroup>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setTestDialogOpen(false)}
            sx={{ borderRadius: '12px' }}
          >
            취소
          </Button>
          <Button
            variant="contained"
            onClick={handleNextQuestion}
            disabled={!answers[currentQuestion]}
            sx={{ borderRadius: '12px' }}
          >
            {currentQuestion < mockQuestions.length - 1 ? '다음' : '완료'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Results Dialog */}
      <Dialog
        open={resultDialogOpen}
        onClose={() => setResultDialogOpen(false)}
        maxWidth="lg"
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
            <EmojiEventsIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            <Typography variant="h5">테스트 결과</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={4}>
            {/* Overall Score */}
            <ResultCard>
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <Typography variant="h3" color="primary.main" fontWeight={700}>
                  {assessment.overallScore}
                </Typography>
                <Box>
                  <Typography variant="h6" color="text.primary">
                    종합 점수
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    100점 만점
                  </Typography>
                </Box>
              </Stack>
            </ResultCard>

            <Stack direction="row" spacing={4}>
              {/* Bar Chart */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                  영역별 점수
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={assessment.categories}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" fill="#2563EB" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Box>

              {/* Radar Chart */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                  역량 맵
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" fontSize={12} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="점수"
                        dataKey="score"
                        stroke="#7C3AED"
                        fill="#7C3AED"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Stack>

            {/* Recommendations */}
            <Box>
              <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
                개선 추천사항
              </Typography>
              <Stack spacing={1}>
                {assessment.recommendations.map((rec, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    • {rec}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setResultDialogOpen(false)}
            sx={{ borderRadius: '12px' }}
          >
            닫기
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: '12px' }}
          >
            결과 저장
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SkillTestCard;