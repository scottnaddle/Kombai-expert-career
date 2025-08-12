import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  TextField,
  MenuItem,
  Slider,
  ColorPicker,
  Tabs,
  Tab,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PaletteIcon from '@mui/icons-material/Palette';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import RestoreIcon from '@mui/icons-material/Restore';

const CustomizerCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  boxShadow: '0 15px 40px rgba(0, 0, 0, 0.08)'
}));

const PreviewCard = styled(Paper)(({ theme }) => ({
  background: 'white',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  minHeight: '500px',
  position: 'relative',
  overflow: 'hidden'
}));

const ColorSwatch = styled(Box)(({ color }: { color: string }) => ({
  width: 40,
  height: 40,
  borderRadius: '8px',
  backgroundColor: color,
  border: '2px solid rgba(255, 255, 255, 0.8)',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)'
  }
}));

interface TemplateCustomizerProps {
  templateId: string;
  customization: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    layout: string;
    logoPosition: string;
    borderStyle: string;
    backgroundPattern: string;
  };
  onCustomizationSave?: (customization: any) => void;
  onPreviewGenerate?: (preview: string) => void;
}

const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({
  templateId,
  customization,
  onCustomizationSave,
  onPreviewGenerate
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [localCustomization, setLocalCustomization] = useState(customization);
  const [previewMode, setPreviewMode] = useState(false);

  const colorPresets = [
    { name: 'Classic Blue', primary: '#2563EB', secondary: '#7C3AED' },
    { name: 'Emerald Green', primary: '#10B981', secondary: '#059669' },
    { name: 'Sunset Orange', primary: '#F59E0B', secondary: '#D97706' },
    { name: 'Royal Purple', primary: '#7C3AED', secondary: '#5B21B6' },
    { name: 'Rose Gold', primary: '#EC4899', secondary: '#BE185D' }
  ];

  const fontOptions = [
    { value: 'Inter', label: 'Inter (Modern Sans)' },
    { value: 'Playfair Display', label: 'Playfair Display (Elegant Serif)' },
    { value: 'Roboto', label: 'Roboto (Clean Sans)' },
    { value: 'Merriweather', label: 'Merriweather (Classic Serif)' },
    { value: 'Montserrat', label: 'Montserrat (Geometric Sans)' }
  ];

  const layoutOptions = [
    { value: 'modern', label: '모던 레이아웃' },
    { value: 'classic', label: '클래식 레이아웃' },
    { value: 'minimal', label: '미니멀 레이아웃' },
    { value: 'elegant', label: '엘레간트 레이아웃' }
  ];

  const borderStyles = [
    { value: 'none', label: '테두리 없음' },
    { value: 'simple', label: '단순 테두리' },
    { value: 'elegant', label: '우아한 테두리' },
    { value: 'decorative', label: '장식적 테두리' }
  ];

  const backgroundPatterns = [
    { value: 'solid', label: '단색' },
    { value: 'gradient', label: '그라디언트' },
    { value: 'subtle', label: '미묘한 패턴' },
    { value: 'geometric', label: '기하학적 패턴' }
  ];

  const handleCustomizationChange = (field: string, value: any) => {
    setLocalCustomization(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleColorPresetSelect = (preset: any) => {
    setLocalCustomization(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary
    }));
  };

  const handleSave = () => {
    onCustomizationSave?.(localCustomization);
  };

  const handlePreview = () => {
    setPreviewMode(!previewMode);
    onPreviewGenerate?.('/preview-url');
  };

  const handleReset = () => {
    setLocalCustomization(customization);
  };

  const TabPanel = ({ children, value, index }: { children: React.ReactNode; value: number; index: number }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Stack direction="row" spacing={4} sx={{ height: '80vh' }}>
      {/* Customization Panel */}
      <Box sx={{ width: 400 }}>
        <CustomizerCard elevation={0}>
          <Stack spacing={3}>
            <Typography variant="h6" color="text.primary">
              템플릿 커스터마이징
            </Typography>

            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
            >
              <Tab icon={<PaletteIcon />} label="색상" />
              <Tab icon={<TextFieldsIcon />} label="폰트" />
              <Tab icon={<ViewQuiltIcon />} label="레이아웃" />
            </Tabs>

            <TabPanel value={activeTab} index={0}>
              <Stack spacing={3}>
                {/* Color Presets */}
                <Box>
                  <Typography variant="subtitle2" color="text.primary" sx={{ mb: 2 }}>
                    색상 프리셋
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {colorPresets.map((preset, index) => (
                      <Box
                        key={index}
                        onClick={() => handleColorPresetSelect(preset)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <Stack direction="row" spacing={0.5}>
                          <ColorSwatch color={preset.primary} />
                          <ColorSwatch color={preset.secondary} />
                        </Stack>
                        <Typography variant="caption" color="text.secondary" textAlign="center">
                          {preset.name}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>

                <Divider />

                {/* Custom Colors */}
                <Box>
                  <Typography variant="subtitle2" color="text.primary" sx={{ mb: 2 }}>
                    커스텀 색상
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        주 색상
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <ColorSwatch color={localCustomization.primaryColor} />
                        <TextField
                          size="small"
                          value={localCustomization.primaryColor}
                          onChange={(e) => handleCustomizationChange('primaryColor', e.target.value)}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        />
                      </Stack>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        보조 색상
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <ColorSwatch color={localCustomization.secondaryColor} />
                        <TextField
                          size="small"
                          value={localCustomization.secondaryColor}
                          onChange={(e) => handleCustomizationChange('secondaryColor', e.target.value)}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                        />
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Stack>
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="폰트 패밀리"
                  select
                  value={localCustomization.fontFamily}
                  onChange={(e) => handleCustomizationChange('fontFamily', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  {fontOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Typography sx={{ fontFamily: option.value }}>
                        {option.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </TextField>

                <Box>
                  <Typography variant="subtitle2" color="text.primary" sx={{ mb: 2 }}>
                    폰트 미리보기
                  </Typography>
                  <Card sx={{ p: 2, borderRadius: '12px' }}>
                    <Typography
                      variant="h6"
                      sx={{ fontFamily: localCustomization.fontFamily, mb: 1 }}
                    >
                      Global Career Link
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: localCustomization.fontFamily }}
                    >
                      이것은 선택한 폰트의 미리보기입니다.
                    </Typography>
                  </Card>
                </Box>
              </Stack>
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="레이아웃 스타일"
                  select
                  value={localCustomization.layout}
                  onChange={(e) => handleCustomizationChange('layout', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  {layoutOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  label="테두리 스타일"
                  select
                  value={localCustomization.borderStyle}
                  onChange={(e) => handleCustomizationChange('borderStyle', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  {borderStyles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  label="배경 패턴"
                  select
                  value={localCustomization.backgroundPattern}
                  onChange={(e) => handleCustomizationChange('backgroundPattern', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                >
                  {backgroundPatterns.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <FormControlLabel
                  control={
                    <Switch
                      checked={localCustomization.logoPosition === 'top-center'}
                      onChange={(e) => handleCustomizationChange('logoPosition', e.target.checked ? 'top-center' : 'top-left')}
                    />
                  }
                  label="로고 중앙 정렬"
                />
              </Stack>
            </TabPanel>

            <Divider />

            {/* Action Buttons */}
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                startIcon={<RestoreIcon />}
                onClick={handleReset}
                sx={{ borderRadius: '12px' }}
              >
                초기화
              </Button>
              <Button
                variant="outlined"
                startIcon={<PreviewIcon />}
                onClick={handlePreview}
                sx={{ borderRadius: '12px' }}
              >
                미리보기
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{
                  borderRadius: '12px',
                  background: theme => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                }}
              >
                저장
              </Button>
            </Stack>
          </Stack>
        </CustomizerCard>
      </Box>

      {/* Preview Panel */}
      <Box sx={{ flex: 1 }}>
        <PreviewCard elevation={0}>
          <Box
            sx={{
              background: localCustomization.backgroundPattern === 'gradient'
                ? `linear-gradient(135deg, ${localCustomization.primaryColor}15, ${localCustomization.secondaryColor}10)`
                : 'white',
              minHeight: '100%',
              padding: 4,
              borderRadius: '12px',
              fontFamily: localCustomization.fontFamily
            }}
          >
            {/* Certificate Header */}
            <Box
              sx={{
                textAlign: localCustomization.logoPosition === 'top-center' ? 'center' : 'left',
                mb: 4
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: localCustomization.primaryColor,
                  fontFamily: localCustomization.fontFamily,
                  fontWeight: 700,
                  mb: 1
                }}
              >
                Global Career Link
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: localCustomization.secondaryColor,
                  fontFamily: localCustomization.fontFamily
                }}
              >
                경력증명서
              </Typography>
            </Box>

            {/* Certificate Content */}
            <Box sx={{ textAlign: 'center', my: 6 }}>
              <Typography
                variant="h3"
                sx={{
                  color: localCustomization.primaryColor,
                  fontFamily: localCustomization.fontFamily,
                  fontWeight: 600,
                  mb: 3
                }}
              >
                글로벌 비즈니스 전문가 인증서
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  color: 'text.primary',
                  fontFamily: localCustomization.fontFamily,
                  mb: 4
                }}
              >
                김글로벌
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontFamily: localCustomization.fontFamily,
                  lineHeight: 1.8,
                  mb: 4
                }}
              >
                위 사람은 글로벌 비즈니스 분야에서 뛰어난 역량과 성과를 보여주었으며,
                <br />
                국제적 프로젝트 관리 및 시장 개발 전문성을 인정받아
                <br />
                이 인증서를 수여합니다.
              </Typography>

              <Box
                sx={{
                  display: 'inline-block',
                  padding: 2,
                  border: `2px solid ${localCustomization.primaryColor}`,
                  borderRadius: localCustomization.borderStyle === 'elegant' ? '16px' : '8px',
                  background: `${localCustomization.primaryColor}08`
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: localCustomization.primaryColor,
                    fontFamily: localCustomization.fontFamily,
                    fontWeight: 600
                  }}
                >
                  발급일: 2024년 1월 16일
                </Typography>
              </Box>
            </Box>

            {/* Certificate Footer */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 32,
                left: 32,
                right: 32,
                textAlign: 'center'
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: localCustomization.secondaryColor,
                  fontFamily: localCustomization.fontFamily
                }}
              >
                이 인증서는 QR 코드를 통해 검증할 수 있습니다
              </Typography>
            </Box>
          </Box>
        </PreviewCard>
      </Box>
    </Stack>
  );
};

export default TemplateCustomizer;