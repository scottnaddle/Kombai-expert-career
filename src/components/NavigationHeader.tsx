import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Stack, 
  IconButton,
  useScrollTrigger,
  Slide,
  Chip,
  Fade,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import VerifiedIcon from '@mui/icons-material/Verified';
import PsychologyIcon from '@mui/icons-material/Psychology';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const HeaderContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  background: 'rgba(255, 255, 255, 0.85)',
  backdropFilter: 'blur(24px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      ${theme.palette.primary.main}03 0%, 
      ${theme.palette.secondary.main}02 50%, 
      ${theme.palette.info.main}03 100%)`,
    zIndex: -1
  }
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1, 2),
  borderRadius: '16px',
  background: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.8)',
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
  }
}));

const LogoIcon = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Playfair Display", serif',
  fontWeight: 700,
  fontSize: '1.1rem',
  background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: '-0.02em'
}));

const NavContainer = styled(Stack)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  borderRadius: '20px',
  padding: theme.spacing(0.75, 1),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.04)',
  [theme.breakpoints.down('lg')]: {
    display: 'none'
  }
}));

const MobileNavContainer = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('lg')]: {
    display: 'block'
  }
}));

const NavButton = styled(Button)(({ theme }) => ({
  borderRadius: '14px',
  padding: theme.spacing(1, 2.5),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  minHeight: '40px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
    transition: 'left 0.5s ease'
  },
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
    '&::before': {
      left: '100%'
    }
  }
}));

const ServiceNavButton = styled(NavButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
  border: '1px solid transparent',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    color: theme.palette.primary.main
  }
}));

const AuthButton = styled(NavButton)(({ theme }) => ({
  '&.login': {
    color: theme.palette.text.primary,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main
    }
  },
  '&.signup': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
    '&:hover': {
      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
      boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
      transform: 'translateY(-2px)'
    }
  }
}));

const BetaChip = styled(Chip)(({ theme }) => ({
  height: '20px',
  fontSize: '0.65rem',
  fontWeight: 600,
  background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.light})`,
  color: 'white',
  border: 'none',
  marginLeft: theme.spacing(1),
  '& .MuiChip-label': {
    padding: '0 6px'
  }
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  width: 44,
  height: 44,
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.95)',
    transform: 'translateY(-1px)'
  }
}));

interface HideOnScrollProps {
  children: React.ReactElement;
}

function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const NavigationHeader: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isHomePage) {
    return null; // Only show on landing page
  }

  const serviceLinks = [
    {
      label: '커리어 관리',
      icon: <WorkIcon sx={{ fontSize: 18 }} />,
      path: '/career',
      description: '경력 분석 및 관리'
    },
    {
      label: '인증서 발급',
      icon: <WorkspacePremiumIcon sx={{ fontSize: 18 }} />,
      path: '/certification',
      description: '공식 경력증명서'
    },
    {
      label: '인증서 검증',
      icon: <VerifiedIcon sx={{ fontSize: 18 }} />,
      path: '/verify',
      description: '진위 확인 서비스'
    }
  ];

  return (
    <HideOnScroll>
      <HeaderContainer>
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ py: { xs: 1.5, md: 2 } }}
          >
            {/* Logo */}
            <LogoContainer component={Link} to="/">
              <LogoIcon>
                <PsychologyIcon sx={{ fontSize: 20, color: 'white' }} />
              </LogoIcon>
              <Box>
                <LogoText variant="body1">
                  Global Career Link
                </LogoText>
                <BetaChip label="BETA" size="small" />
              </Box>
            </LogoContainer>

            {/* Desktop Navigation */}
            <NavContainer direction="row" spacing={0.5} alignItems="center">
              {serviceLinks.map((link, index) => (
                <Tooltip 
                  key={index}
                  title={link.description}
                  placement="bottom"
                  arrow
                >
                  <ServiceNavButton
                    component={Link}
                    to={link.path}
                    startIcon={link.icon}
                    size="small"
                  >
                    {link.label}
                  </ServiceNavButton>
                </Tooltip>
              ))}
              
              <Box sx={{ width: 1, height: 20, bgcolor: 'divider', mx: 1, opacity: 0.3 }} />
              
              <AuthButton
                component={Link}
                to="/login"
                startIcon={<LoginIcon sx={{ fontSize: 18 }} />}
                size="small"
                className="login"
              >
                로그인
              </AuthButton>

              <AuthButton
                component={Link}
                to="/signup"
                startIcon={<PersonAddIcon sx={{ fontSize: 18 }} />}
                size="small"
                className="signup"
              >
                회원가입
              </AuthButton>
            </NavContainer>

            {/* Mobile Menu Button */}
            <MobileNavContainer>
              <MobileMenuButton
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                size="small"
              >
                {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </MobileMenuButton>
            </MobileNavContainer>
          </Stack>

          {/* Mobile Navigation Menu */}
          <Fade in={mobileMenuOpen}>
            <Box
              sx={{
                display: { xs: mobileMenuOpen ? 'block' : 'none', lg: 'none' },
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                p: 2,
                mb: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
              }}
            >
              <Stack spacing={1}>
                {serviceLinks.map((link, index) => (
                  <Button
                    key={index}
                    component={Link}
                    to={link.path}
                    startIcon={link.icon}
                    fullWidth
                    sx={{
                      justifyContent: 'flex-start',
                      borderRadius: '12px',
                      p: 1.5,
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white'
                      }
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Button>
                ))}
                
                <Box sx={{ height: 1, bgcolor: 'divider', my: 1, opacity: 0.3 }} />
                
                <Stack direction="row" spacing={1}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    startIcon={<LoginIcon />}
                    fullWidth
                    sx={{ borderRadius: '12px' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    로그인
                  </Button>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    fullWidth
                    sx={{
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${theme => theme.palette.primary.main}, ${theme => theme.palette.secondary.main})`
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    회원가입
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Fade>
        </Container>
      </HeaderContainer>
    </HideOnScroll>
  );
};

export default NavigationHeader;