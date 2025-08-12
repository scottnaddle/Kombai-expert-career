// Mock data for 3rd depth interfaces

// ... existing code ...

// Career Management 3rd Level Data
export const mockProjectDetails = {
  id: 'proj-001',
  name: '동남아 시장 진출 프로젝트',
  status: 'in_progress' as const,
  startDate: '2024-01-15',
  endDate: '2024-06-30',
  progress: 65,
  budget: 500000,
  spent: 325000,
  team: [
    { id: '1', name: '김팀장', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: '이개발', role: 'Developer', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: '박마케팅', role: 'Marketing Specialist', avatar: 'https://i.pravatar.cc/150?img=3' }
  ],
  milestones: [
    { id: '1', title: '시장 조사 완료', date: '2024-02-15', completed: true },
    { id: '2', title: '파트너십 체결', date: '2024-03-30', completed: true },
    { id: '3', title: '제품 현지화', date: '2024-05-15', completed: false },
    { id: '4', title: '런칭 준비', date: '2024-06-15', completed: false }
  ],
  kpis: [
    { name: '시장 점유율', target: 5, current: 3.2, unit: '%' },
    { name: '매출 증가율', target: 200, current: 150, unit: '%' },
    { name: '고객 만족도', target: 4.5, current: 4.2, unit: '/5' }
  ]
};

export const mockSkillAssessment = {
  testId: 'skill-001',
  title: '글로벌 비즈니스 역량 평가',
  duration: 45,
  totalQuestions: 30,
  categories: [
    { name: '시장 분석', questions: 8, score: 85 },
    { name: '프로젝트 관리', questions: 7, score: 92 },
    { name: '커뮤니케이션', questions: 8, score: 78 },
    { name: '리더십', questions: 7, score: 88 }
  ],
  overallScore: 86,
  recommendations: [
    '시장 분석 도구 활용 교육 추천',
    '글로벌 커뮤니케이션 스킬 향상 과정',
    'PMP 자격증 취득 고려'
  ]
};

// Profile Management 3rd Level Data
export const mockEducationDetails = [
  {
    id: 'edu-001',
    institution: '서울대학교',
    degree: 'bachelor' as const,
    major: '경영학과',
    startYear: 2015,
    endYear: 2019,
    gpa: 3.8,
    maxGpa: 4.0,
    honors: ['magna cum laude', '우등졸업'],
    transcripts: [
      { semester: '2019-2', courses: ['국제경영', '마케팅전략', '재무관리'], gpa: 3.9 },
      { semester: '2019-1', courses: ['조직행동론', '경영정보시스템'], gpa: 3.7 }
    ]
  }
];

export const mockLanguageTests = [
  {
    id: 'lang-001',
    language: '영어',
    testType: 'TOEIC',
    score: 950,
    maxScore: 990,
    date: '2023-12-15',
    skills: {
      listening: 485,
      reading: 465,
      speaking: 180,
      writing: 190
    },
    certificate: '/certificates/toeic-950.pdf'
  },
  {
    id: 'lang-002', 
    language: '중국어',
    testType: 'HSK',
    score: 6,
    maxScore: 6,
    date: '2023-10-20',
    skills: {
      listening: 88,
      reading: 85,
      writing: 82
    },
    certificate: '/certificates/hsk-6.pdf'
  }
];

// Certification 3rd Level Data
export const mockTemplateCustomization = {
  templateId: 'global-business',
  customizations: {
    primaryColor: '#2563EB',
    secondaryColor: '#7C3AED',
    fontFamily: 'Playfair Display',
    layout: 'modern',
    logoPosition: 'top-center',
    borderStyle: 'elegant',
    backgroundPattern: 'gradient'
  },
  preview: '/templates/preview-global-business.png'
};

export const mockVerificationRequests = [
  {
    id: 'verify-001',
    certificateId: 'cert-001',
    requesterName: '삼성전자 HR팀',
    requesterEmail: 'hr@samsung.com',
    requestDate: '2024-01-20',
    status: 'pending' as const,
    purpose: '채용 검토'
  },
  {
    id: 'verify-002',
    certificateId: 'cert-001', 
    requesterName: 'LG화학 인사팀',
    requesterEmail: 'recruit@lgchem.com',
    requestDate: '2024-01-18',
    status: 'verified' as const,
    purpose: '경력 확인'
  }
];

// Authentication 3rd Level Data
export const mockSecuritySettings = {
  twoFactorEnabled: true,
  backupCodes: ['ABC123', 'DEF456', 'GHI789'],
  connectedAccounts: [
    { provider: 'google', email: 'user@gmail.com', connected: true },
    { provider: 'linkedin', email: 'user@linkedin.com', connected: true },
    { provider: 'facebook', email: 'user@facebook.com', connected: false }
  ],
  loginHistory: [
    { date: '2024-01-22 09:30', location: '서울, 대한민국', device: 'Chrome on Windows', success: true },
    { date: '2024-01-21 18:45', location: '서울, 대한민국', device: 'Safari on iPhone', success: true },
    { date: '2024-01-20 14:20', location: '부산, 대한민국', device: 'Chrome on Android', success: false }
  ]
};

// Verification 3rd Level Data
export const mockVerificationHistory = [
  {
    id: 'vh-001',
    certificateId: 'cert-001',
    verifierName: '현대자동차',
    verificationDate: '2024-01-22',
    result: 'verified' as const,
    verificationMethod: 'qr_code' as const
  },
  {
    id: 'vh-002',
    certificateId: 'cert-002',
    verifierName: 'SK하이닉스',
    verificationDate: '2024-01-20',
    result: 'verified' as const,
    verificationMethod: 'link' as const
  }
];

export const mockVerificationAnalytics = {
  totalVerifications: 156,
  successRate: 98.7,
  monthlyTrend: [
    { month: '2023-12', verifications: 45, success: 44 },
    { month: '2024-01', verifications: 52, success: 51 }
  ],
  topVerifiers: [
    { name: '삼성전자', count: 23 },
    { name: 'LG전자', count: 18 },
    { name: '현대자동차', count: 15 }
  ]
};

// Career Timeline Data
export const mockCareerTimeline = [
  {
    id: 'timeline-001',
    date: '2024-01',
    title: '글로벌 프로젝트 매니저 승진',
    description: '동남아 시장 진출 프로젝트 성공적 완료로 승진',
    type: 'promotion',
    achievements: ['팀 리더십 향상', '프로젝트 관리 역량 증명']
  },
  {
    id: 'timeline-002',
    date: '2023-06',
    title: 'PMP 자격증 취득',
    description: '프로젝트 관리 전문가 자격증 취득',
    type: 'certification',
    achievements: ['국제 표준 프로젝트 관리 역량 인증']
  }
];

// Analytics Data
export const mockAnalyticsData = {
  skillGrowth: [
    { month: '2023-09', leadership: 75, communication: 80, technical: 70 },
    { month: '2023-10', leadership: 78, communication: 82, technical: 73 },
    { month: '2023-11', leadership: 82, communication: 85, technical: 76 },
    { month: '2023-12', leadership: 85, communication: 88, technical: 80 },
    { month: '2024-01', leadership: 88, communication: 90, technical: 85 }
  ],
  projectSuccess: [
    { quarter: 'Q1 2023', success: 85, total: 12 },
    { quarter: 'Q2 2023', success: 90, total: 15 },
    { quarter: 'Q3 2023', success: 88, total: 18 },
    { quarter: 'Q4 2023', success: 92, total: 20 }
  ]
};