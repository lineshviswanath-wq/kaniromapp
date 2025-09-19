import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Separator } from './components/ui/separator';
import { ArrowRight, Coins, CreditCard, PiggyBank, Shield, TrendingUp, Users, CheckCircle, Clock, Zap, ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, Target, Calendar, DollarSign, Building2, Plus, Minus, Star, Smartphone, Wallet, Gift, GraduationCap, Home, Car, Plane, Bell, BellRing, Flame, Award, IndianRupee, Download, ArrowUpRight, ArrowDownLeft, Repeat, QrCode, Calculator, Fingerprint, Scan, MoreHorizontal, FileText, Menu, Search, Settings, HelpCircle, CreditCard as PayIcon, PlusCircle, Banknote, Compass, Edit, Copy, Share, Printer } from 'lucide-react';
import { PWAManager } from './components/PWAManager';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { PWAStatus } from './components/PWAStatus';
// import { Dashboard } from './Dashboard';
import kaniroLogo from 'figma:asset/59a4e87f6f8559c1e33304344c14ed5d1faafe70.png';
import promoImage from 'figma:asset/6c9f7a43bceeec40c2dac840bb2776654b079e3c.png';

type Screen = 'splash' | 'onboarding' | 'login' | 'register' | 'dashboard' | 'save' | 'pay' | 'savepay' | 'profile' | 'notifications' | 'dabba-name' | 'dabba-goal' | 'dabba-duration' | 'dabba-summary' | 'dabba-schemes' | 'dabba-compare' | 'dabba-kyc' | 'dabba-review' | 'dabba-receipt' | 'dabba-confirm' | 'dabba-success' | 'dabba-dashboard' | 'add-bank-search' | 'add-bank-details' | 'add-bank-verify' | 'add-bank-success' | 'pay-dashboard' | 'pay-banks' | 'pay-add-loan' | 'pay-micro-setup' | 'pay-micro-success' | 'pay-success' | 'pay-emandate' | 'pay-activate' | 'pay-calculator' | 'pay-overdue-table' | 'pay-micro-installment' | 'pay-bank-selection' | 'pay-confirmation';

// Bottom Navigation Component
const BottomNavigation = ({ currentScreen, setCurrentScreen }: { currentScreen: Screen, setCurrentScreen: (screen: Screen) => void }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 bottom-nav-safe z-50 max-w-md mx-auto">
      <div className="grid grid-cols-5 gap-0">
        {[
          { id: 'home', icon: Home, label: 'Home', screen: 'dashboard' },
          { id: 'save', icon: PiggyBank, label: 'Save', screen: 'dabba-name' },
          { id: 'pay', icon: PayIcon, label: 'Pay', screen: 'pay-overdue-table' },
          { id: 'search', icon: Search, label: 'Search', screen: 'dashboard' },
          { id: 'profile', icon: User, label: 'Profile', screen: 'profile' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentScreen(tab.screen as Screen)}
            className={`flex flex-col items-center justify-center py-3 px-1 text-xs transition-colors duration-200 ${
              currentScreen === tab.screen ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <tab.icon className="h-5 w-5 mb-1" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  
  // iOS PWA fix: Ensure app starts properly
  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone ||
                        document.referrer.includes('android-app://');
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isStandalone && isIOS) {
      // Force remove any splash screen after 2 seconds on iOS PWA
      setTimeout(() => {
        const splash = document.getElementById('pwa-splash');
        if (splash) {
          console.log('iOS PWA: Force removing splash screen');
          splash.remove();
        }
        
        // Ensure the app screen is visible
        const appContainer = document.querySelector('.main-container');
        if (appContainer) {
          (appContainer as HTMLElement).style.display = 'block';
          (appContainer as HTMLElement).style.visibility = 'visible';
        }
      }, 2000);
    }
  }, []);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'face' | 'mpin'>('password');
  const [mpin, setMpin] = useState('');
  const [faceLoginStatus, setFaceLoginStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [isQuickActionsExpanded, setIsQuickActionsExpanded] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  // Removed complex scroll detection variables that were causing scroll interference
  
  // Touch swipe state for carousels
  const [touchState, setTouchState] = useState({
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    isSwipe: false
  });
  
  // Registration form state
  const [regForm, setRegForm] = useState({
    name: '',
    phone: '',
    email: '',
    mpin: '',
    confirmMpin: ''
  });
  
  const [hasActiveData, setHasActiveData] = useState(true);
  
  // New Dabba Save Setup State
  const [dabbaSetup, setDabbaSetup] = useState({
    dabbaName: '',
    customDabbaName: '',
    dabbaIcon: '',
    goal: '',
    targetAmount: '',
    frequency: 'daily',
    amountPerFrequency: '',
    duration: 3,
    customEndDate: '',
    selectedScheme: null as any,
    kycComplete: false,
    autoDebitEnabled: false,
    firstDepositAmount: '',
    compareList: [] as string[],
    compareSchemes: [] as any[],
    panNumber: '',
    aadhaarOtp: '',
    otpSent: false
  });

  // Active Dabbas State
  const [activeDabbas, setActiveDabbas] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      icon: '🚨',
      targetAmount: 50000,
      savedAmount: 12750,
      frequency: 'daily',
      amountPerFrequency: 150,
      progress: 25.5,
      nextDeposit: 'Tomorrow 6:00 AM',
      autoDebit: true,
      maturityDate: '2025-06-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Dream Vacation',
      icon: '✈️',
      targetAmount: 80000,
      savedAmount: 8400,
      frequency: 'weekly',
      amountPerFrequency: 500,
      progress: 10.5,
      nextDeposit: 'Manual reminder',
      autoDebit: false,
      maturityDate: '2025-12-25',
      status: 'active'
    }
  ]);
  
  const [savingsData, setSavingsData] = useState({
    balance: 2847,
    streak: 23,
    interestEarned: 127,
    totalDeposits: 2720,
    nextDebit: '₹50 tomorrow at 6:00 AM',
    goalProgress: 32
  });

  // Existing customer data
  const [userProfile, setUserProfile] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    memberSince: 'March 2024',
    totalSavings: 15420,
    activePlans: 2,
    creditScore: 'Improving',
    completedTransactions: 89
  });

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, type: 'credit', description: 'Daily DABBA Save', amount: 50, date: '2024-12-03', status: 'completed' },
    { id: 2, type: 'credit', description: 'Weekly savings boost', amount: 200, date: '2024-12-02', status: 'completed' },
    { id: 3, type: 'debit', description: 'Loan repayment', amount: 1000, date: '2024-12-01', status: 'completed' },
    { id: 4, type: 'credit', description: 'Daily DABBA Save', amount: 50, date: '2024-11-30', status: 'completed' },
    { id: 5, type: 'credit', description: 'Interest earned', amount: 25, date: '2024-11-29', status: 'completed' }
  ]);

  const [activePlans, setActivePlans] = useState([
    {
      id: 1,
      type: 'DABBA SAVE',
      name: 'Emergency Fund',
      balance: 2847,
      target: 18000,
      dailyAmount: 50,
      progress: 32,
      nextAction: 'Next debit: Tomorrow 6:00 AM',
      status: 'active'
    },
    {
      id: 2,
      type: 'DABBA SAVE',
      name: 'Vacation Fund',
      balance: 1250,
      target: 25000,
      dailyAmount: 75,
      progress: 5,
      nextAction: 'Next debit: Tomorrow 6:30 AM',
      status: 'active'
    },
    {
      id: 3,
      type: 'DABBA PAY',
      name: 'Home Loan Repayment',
      outstanding: 125000,
      monthlyPayment: 3500,
      lastPayment: '₹3500 on Dec 1, 2024',
      nextDue: 'Jan 1, 2025',
      status: 'active'
    }
  ]);

  // Dabba Pay System State
  const [dabbaPayData, setDabbaPayData] = useState({
    dabbaBalance: 2847,
    totalSavings: 12450,
    monthlyDeposit: 0,
    activeMicroPayments: 2,
    totalInterestSaved: 4500,
    nextDeduction: 'Tomorrow 6:00 AM',
    fundFlowProjection: {
      thisMonth: 3000,
      nextMonth: 3500,
      quarter: 10200
    }
  });

  // Connected Bank Accounts
  const [connectedBanks, setConnectedBanks] = useState([
    {
      id: 1,
      bankName: 'HDFC Bank',
      accountNumber: '****1234',
      accountType: 'Savings',
      balance: 25450,
      ifsc: 'HDFC0001234',
      branch: 'Mumbai Central',
      isPrimary: true,
      isActive: true,
      lastUsed: '2024-12-03'
    },
    {
      id: 2,
      bankName: 'ICICI Bank',
      accountNumber: '****5678',
      accountType: 'Current',
      balance: 15200,
      ifsc: 'ICIC0001234',
      branch: 'Delhi NCR',
      isPrimary: false,
      isActive: true,
      lastUsed: '2024-11-28'
    }
  ]);

  // Loan Accounts with Micro-Payment Setup
  const [loanAccounts, setLoanAccounts] = useState([
    {
      id: 1,
      loanNumber: 'HL001234567',
      bankName: 'HDFC Bank',
      loanType: 'Home Loan',
      originalAmount: 2500000,
      outstandingAmount: 1847200,
      overdueAmount: 12500,
      emiAmount: 23450,
      currentInterestRate: 8.75,
      penaltyCharges: 2850,
      daysOverdue: 18,
      tenure: '20 years',
      status: 'overdue',
      microPayment: {
        isActive: true,
        frequency: 'daily',
        amount: 100,
        totalPaid: 3000,
        interestSaved: 1250,
        principalReduced: 1750,
        startDate: '2024-11-01',
        nextPayment: '2024-12-04'
      }
    },
    {
      id: 2,
      loanNumber: 'PL002345678',
      bankName: 'ICICI Bank',
      loanType: 'Personal Loan',
      originalAmount: 500000,
      outstandingAmount: 287450,
      overdueAmount: 8700,
      emiAmount: 11200,
      currentInterestRate: 12.50,
      penaltyCharges: 1200,
      daysOverdue: 8,
      tenure: '5 years',
      status: 'overdue',
      microPayment: {
        isActive: true,
        frequency: 'weekly',
        amount: 700,
        totalPaid: 5600,
        interestSaved: 2100,
        principalReduced: 3500,
        startDate: '2024-10-15',
        nextPayment: '2024-12-09'
      }
    }
  ]);

  // Micro Payment Setup State
  const [microPaymentSetup, setMicroPaymentSetup] = useState({
    selectedLoan: null as any,
    frequency: '',
    amount: '',
    sourceBank: '',
    paymentMethod: '',
    projectedSavings: {
      daily: { interest: 0, principal: 0, total: 0 },
      weekly: { interest: 0, principal: 0, total: 0 },
      monthly: { interest: 0, principal: 0, total: 0 }
    }
  });

  // Payment Setup State
  const [paymentSetup, setPaymentSetup] = useState({
    selectedLoan: null as any,
    paymentType: '',
    paymentAmount: '',
    paymentMethod: '',
    bankAccount: ''
  });

  // Payment Flow State
  const [paymentFlow, setPaymentFlow] = useState({
    selectedLoans: [] as number[],
    totalAmount: 0,
    totalOverdue: 0,
    paymentMode: '',
    microPlan: {
      frequency: '',
      amount: '',
      duration: '12'
    },
    selectedBank: '',
    otp: '',
    otpSent: false,
    isProcessing: false
  });

  // State for read more functionality
  const [expandedPromo, setExpandedPromo] = useState<number | null>(null);
  
  // Add bank form state
  const [showAddBank, setShowAddBank] = useState(false);
  const [bankSearch, setBankSearch] = useState('');
  const [newBank, setNewBank] = useState({
    bankName: '',
    accountNumber: '',
    ifsc: '',
    accountType: 'savings',
    branch: ''
  });

  // Promotional carousel data with varied images
  const promoCards = useMemo(() => [
    {
      id: 1,
      title: "Special Offer",
      subtitle: "Get ₹100 Bonus",
      description: "Open your first DABBA Save and get instant ₹100 bonus on your first deposit! Start your financial journey with extra rewards and unlock exclusive benefits from day one.",
      subItems: ["₹100 instant bonus", "First deposit reward", "No minimum balance"],
      image: "https://images.unsplash.com/photo-1740818576518-0c873d356122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBib251cyUyMG1vbmV5JTIwc2F2aW5nc3xlbnwxfHx8fDE3NTc5NDA4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Limited Time"
    },
    {
      id: 2,
      title: "Zero Fees",
      subtitle: "Save More Money",
      description: "No hidden charges or maintenance fees. 100% of your money grows with you. Complete transparency in all transactions with bank-grade security and real-time updates.",
      subItems: ["0% maintenance fees", "No hidden charges", "100% transparency"],
      image: "https://images.unsplash.com/photo-1687720657052-c026be7f388c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwc2VjdXJpdHklMjBmaW5hbmNlfGVufDF8fHx8MTc1Nzk0MDg2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Always Free"
    },
    {
      id: 3,
      title: "Refer & Earn",
      subtitle: "₹50 Per Friend",
      description: "Share the wealth! Earn ₹50 for each friend who joins and starts saving. Build your network and earn together with unlimited referral rewards and bonus incentives.",
      subItems: ["₹50 per referral", "Instant rewards", "Unlimited earning"],
      image: "https://images.unsplash.com/photo-1714598268918-ab95770723bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZlcnJhbCUyMHJld2FyZHMlMjBwcm9ncmFtfGVufDF8fHx8MTc1Nzk0MDg1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Unlimited"
    },
    {
      id: 4,
      title: "Higher Returns",
      subtitle: "Up to 8% Interest",
      description: "Competitive interest rates that beat traditional savings accounts by far. Grow your wealth faster with premium returns, compound interest benefits, and flexible withdrawal options.",
      subItems: ["Up to 8% returns", "Better than banks", "Compound interest"],
      image: "https://images.unsplash.com/photo-1579227114496-27346f474519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzf8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwcmV0dXJucyUyMGdyb3d0aHxlbnwxfHx8fDE3NTc5NDA4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "Guaranteed"
    }
  ], []);

  // AUTO-SCROLL COMPLETELY DISABLED - Fix for scroll jumping bug
  // The auto-scroll carousels were causing scroll position resets
  // Users can manually navigate carousels using the dots

  // Scroll to top when screen changes - Fix for scroll position persistence
  useEffect(() => {
    // Scroll to top immediately when screen changes
    window.scrollTo(0, 0);
    
    // Also scroll any scrollable containers to top
    const scrollableElements = document.querySelectorAll('.overflow-y-auto, .overflow-auto');
    scrollableElements.forEach(element => {
      element.scrollTop = 0;
    });
    
    // Force scroll to top with a small delay to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
  }, [currentScreen]); // Trigger whenever currentScreen changes
  
  // Touch swipe handlers for carousels
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchState({
      startX: touch.clientX,
      startY: touch.clientY,
      deltaX: 0,
      deltaY: 0,
      isSwipe: false
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchState.startX) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchState.startX;
    const deltaY = touch.clientY - touchState.startY;
    
    setTouchState(prev => ({
      ...prev,
      deltaX,
      deltaY,
      isSwipe: Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10
    }));
    
    // Prevent vertical scrolling when horizontal swiping
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      e.preventDefault();
    }
  };

  const handleServiceSwipe = (e: React.TouchEvent) => {
    if (!touchState.isSwipe || Math.abs(touchState.deltaX) < 50) return;
    
    const isSwipeLeft = touchState.deltaX < 0;
    const isSwipeRight = touchState.deltaX > 0;
    
    if (isSwipeLeft && currentServiceIndex < 2) {
      setCurrentServiceIndex(prev => prev + 1);
    } else if (isSwipeRight && currentServiceIndex > 0) {
      setCurrentServiceIndex(prev => prev - 1);
    }
    
    // Reset touch state
    setTouchState({
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      isSwipe: false
    });
  };

  const handlePromoSwipe = (e: React.TouchEvent) => {
    if (!touchState.isSwipe || Math.abs(touchState.deltaX) < 50) return;
    
    const isSwipeLeft = touchState.deltaX < 0;
    const isSwipeRight = touchState.deltaX > 0;
    
    if (isSwipeLeft && currentPromoIndex < 3) {
      setCurrentPromoIndex(prev => prev + 1);
    } else if (isSwipeRight && currentPromoIndex > 0) {
      setCurrentPromoIndex(prev => prev - 1);
    }
    
    // Reset touch state
    setTouchState({
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      isSwipe: false
    });
  };
  
  // useEffect(() => {
  //   if (currentScreen === 'dashboard') {
  //     const promoTimer = setInterval(() => {
  //       setCurrentPromoIndex((prevIndex) => 
  //         prevIndex === 3 ? 0 : prevIndex + 1
  //       );
  //     }, 6000);
  //     
  //     const serviceTimer = setInterval(() => {
  //       setCurrentServiceIndex((prevIndex) => 
  //         prevIndex === 2 ? 0 : prevIndex + 1
  //       );
  //     }, 8000);
  //     
  //     return () => {
  //       clearInterval(promoTimer);
  //       clearInterval(serviceTimer);
  //     };
  //   }
  // }, [currentScreen]);

  const LoginScreen = () => {
    const handleFaceLogin = (e?: React.MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      
      console.log('🔐 Biometric login clicked!'); // Debug log
      console.log('Current screen:', currentScreen); // Debug current state
      
      // Add visual feedback
      const biometricButton = document.querySelector('.biometric-button');
      if (biometricButton) {
        biometricButton.classList.add('animate-pulse');
        setTimeout(() => {
          biometricButton.classList.remove('animate-pulse');
        }, 500);
      }
      
      // Immediate login - no progress states
      console.log('🚀 Navigating to dashboard...');
      setCurrentScreen('dashboard');
    };

    const handleMPINInput = (value: string) => {
      setMpin(value);
      if (value.length === 4) {
        // Auto-login when MPIN is complete
        setTimeout(() => {
          setCurrentScreen('dashboard');
        }, 500);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 relative overflow-hidden font-sans">
        {/* Kaniro Brand Gradient Background */}
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-slate-900 via-blue-900 to-emerald-800 opacity-95">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-emerald-600/30 to-teal-700/20"></div>
          {/* Subtle Brand Animations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-16 left-1/4 w-24 h-24 bg-emerald-300/10 rounded-full animate-kaniro-breathe" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
            <div className="absolute top-32 right-1/4 w-20 h-20 bg-blue-300/15 rounded-full animate-brand-pulse-wave" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
            <div className="absolute top-24 right-1/6 w-16 h-16 bg-teal-300/10 rounded-full animate-security-shield" style={{ animationDelay: '4s', animationDuration: '7s' }}></div>
          </div>
        </div>
        
        <div className="relative z-10 min-h-screen flex flex-col px-4 py-6 sm:p-6">
          {/* Kaniro Logo Section */}
          <div className="text-center pt-6 sm:pt-12 mb-8 sm:mb-12">
            <img src={kaniroLogo} alt="Kaniro Financial Services" className="h-8 sm:h-12 mx-auto filter brightness-0 invert" />
            <div className="mt-2 sm:mt-3 text-white/90">
              <h1 className="text-base sm:text-xl font-semibold">Welcome Back</h1>
              <p className="text-xs sm:text-sm opacity-80">Secure access to your financial future</p>
            </div>
          </div>

          {/* Main Login Card - Overlapping with Gradient */}
          <div className="flex-1 flex items-start justify-center -mt-8">
            <div className="max-w-sm w-full">
              <Card className="bg-white shadow-2xl border-0 rounded-3xl relative overflow-hidden">
                {/* Card subtle gradient overlay */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600"></div>
                
                <CardContent className="p-4 sm:p-8">
                  <div className="text-center space-y-4 sm:space-y-8">
                    {/* Biometric Login Section - Inside White Card */}
                    <div className="space-y-3 sm:space-y-6">
                      <div className="relative mx-auto w-20 h-20 sm:w-28 sm:h-28">
                        {/* Glow effect - Behind the button */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 opacity-30 animate-pulse pointer-events-none"></div>
                        <div 
                          className="biometric-button relative z-10 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-500 to-emerald-600 flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-3xl active:scale-95"
                          onClick={handleFaceLogin}
                          style={{ 
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            WebkitTouchCallout: 'none',
                            WebkitTapHighlightColor: 'transparent'
                          }}
                        >
                          <Fingerprint className="h-10 w-10 sm:h-14 sm:w-14 text-white drop-shadow-lg transition-transform duration-200" />
                        </div>
                      </div>

                      <div className="space-y-1 sm:space-y-3">
                        <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">Biometric Login</h2>
                        <p className="text-xs sm:text-base text-gray-600">Use your fingerprint or face to login securely</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">OR</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>

                    {/* MPIN Input */}
                    <div className="space-y-3 sm:space-y-6">
                      <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                          <Lock className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Enter MPIN</h3>
                      </div>

                      {/* MPIN Input Boxes */}
                      <div className="flex justify-center space-x-2 sm:space-x-4">
                        {[0, 1, 2, 3].map((index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={mpin[index] || ''}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              if (/^\d*$/.test(newValue)) {
                                const newMpin = mpin.split('');
                                newMpin[index] = newValue;
                                const updatedMpin = newMpin.join('').slice(0, 4);
                                setMpin(updatedMpin);
                                
                                // Auto-focus next input
                                if (newValue && index < 3) {
                                  const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
                                  nextInput?.focus();
                                }
                                
                                // Auto-login when complete
                                if (updatedMpin.length === 4) {
                                  setTimeout(() => {
                                    setCurrentScreen('dashboard');
                                  }, 500);
                                }
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && !mpin[index] && index > 0) {
                                const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
                                prevInput?.focus();
                              }
                            }}
                            data-index={index}
                            className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl border-2 text-center text-base sm:text-xl font-semibold bg-white border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 hover:border-gray-400"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Social Login */}
                    <div className="space-y-2 sm:space-y-4">
                      <p className="text-gray-500 text-xs sm:text-sm">Or continue with</p>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <Button 
                          variant="outline" 
                          className="h-9 sm:h-12 bg-white border-gray-200 hover:bg-gray-50 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 font-sans transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-blue-300"
                          onClick={() => setCurrentScreen('dashboard')}
                        >
                          <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span className="text-gray-700 text-xs sm:text-base">Google</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="h-9 sm:h-12 bg-slate-900 text-white border-slate-900 hover:bg-slate-800 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 font-sans transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                          onClick={() => setCurrentScreen('dashboard')}
                        >
                          <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                          </svg>
                          <span className="text-xs sm:text-base">Apple</span>
                        </Button>
                      </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                      <p className="text-gray-600 text-xs sm:text-sm font-sans">
                        Don't have an account?{' '}
                        <button 
                          className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors duration-200 hover:underline"
                          onClick={() => setCurrentScreen('register')}
                        >
                          Sign up
                        </button>
                      </p>
                      <p className="text-gray-500 text-xs mt-1 font-sans">
                        Join thousands building their financial future
                      </p>
                    </div>

                    {/* Security Features */}
                    <div className="flex items-center justify-center space-x-4 sm:space-x-8 pt-3 sm:pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 transition-transform hover:scale-105 shadow-md">
                          <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <p className="text-xs text-gray-600 font-medium font-sans">Bank Grade</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 transition-transform hover:scale-105 shadow-md">
                          <Lock className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <p className="text-xs text-gray-600 font-medium font-sans">256-bit SSL</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 transition-transform hover:scale-105 shadow-md">
                          <HelpCircle className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <p className="text-xs text-gray-600 font-medium font-sans">24/7 Support</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Registration Screen
  const RegisterScreen = () => {
    const handleRegister = () => {
      // Simple validation
      if (regForm.name && regForm.phone && regForm.mpin === regForm.confirmMpin && regForm.mpin.length === 4) {
        // Simulate registration success
        setTimeout(() => {
          setCurrentScreen('dashboard');
        }, 1000);
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 relative overflow-hidden font-sans">
        {/* Subtle Background Animations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-green-200/20 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-blue-200/20 rounded-full animate-float" style={{ animationDelay: '3s', animationDuration: '6s' }}></div>
          <div className="absolute top-1/2 right-1/6 w-20 h-20 bg-purple-200/15 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '7s' }}></div>
        </div>
        
        <div className="relative z-10 min-h-screen flex flex-col justify-center px-4 py-6 sm:p-6">
          <div className="max-w-sm mx-auto w-full space-y-6">
            {/* Header */}
            <div className="text-center">
              <img src={kaniroLogo} alt="Kaniro Financial Services" className="h-8 sm:h-10 mx-auto mb-4 sm:mb-6" />
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-sm sm:text-base text-gray-600">Join thousands building their financial future</p>
            </div>

            {/* Registration Form */}
            <Card className="bg-white shadow-xl border-0 rounded-3xl">
              <CardContent className="p-6 sm:p-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="font-sans">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={regForm.name}
                        onChange={(e) => setRegForm(prev => ({ ...prev, name: e.target.value }))}
                        className="mt-1 font-sans"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="font-sans">Mobile Number</Label>
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={regForm.phone}
                        onChange={(e) => setRegForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="mt-1 font-sans"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="font-sans">Email (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={regForm.email}
                        onChange={(e) => setRegForm(prev => ({ ...prev, email: e.target.value }))}
                        className="mt-1 font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="font-sans">Create MPIN</Label>
                      <div className="flex justify-center space-x-3 mt-2">
                        {[0, 1, 2, 3].map((index) => (
                          <input
                            key={index}
                            type="password"
                            maxLength={1}
                            value={regForm.mpin[index] || ''}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              if (/^\d*$/.test(newValue)) {
                                const newMpin = regForm.mpin.split('');
                                newMpin[index] = newValue;
                                const updatedMpin = newMpin.join('').slice(0, 4);
                                setRegForm(prev => ({ ...prev, mpin: updatedMpin }));
                                
                                if (newValue && index < 3) {
                                  const nextInput = document.querySelector(`input[data-reg-index="${index + 1}"]`) as HTMLInputElement;
                                  nextInput?.focus();
                                }
                              }
                            }}
                            data-reg-index={index}
                            className="w-12 h-12 rounded-lg border-2 text-center text-xl font-semibold bg-white border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mt-1 text-center font-sans">4-digit secure PIN</p>
                    </div>

                    <div>
                      <Label className="font-sans">Confirm MPIN</Label>
                      <div className="flex justify-center space-x-3 mt-2">
                        {[0, 1, 2, 3].map((index) => (
                          <input
                            key={index}
                            type="password"
                            maxLength={1}
                            value={regForm.confirmMpin[index] || ''}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              if (/^\d*$/.test(newValue)) {
                                const newMpin = regForm.confirmMpin.split('');
                                newMpin[index] = newValue;
                                const updatedMpin = newMpin.join('').slice(0, 4);
                                setRegForm(prev => ({ ...prev, confirmMpin: updatedMpin }));
                                
                                if (newValue && index < 3) {
                                  const nextInput = document.querySelector(`input[data-confirm-index="${index + 1}"]`) as HTMLInputElement;
                                  nextInput?.focus();
                                }
                              }
                            }}
                            data-confirm-index={index}
                            className={`w-12 h-12 rounded-lg border-2 text-center text-xl font-semibold bg-white outline-none transition-all duration-200 ${
                              regForm.confirmMpin.length === 4 && regForm.mpin === regForm.confirmMpin
                                ? 'border-green-500 focus:ring-green-200'
                                : regForm.confirmMpin.length === 4 && regForm.mpin !== regForm.confirmMpin
                                ? 'border-red-500 focus:ring-red-200'
                                : 'border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200'
                            }`}
                          />
                        ))}
                      </div>
                      {regForm.confirmMpin.length === 4 && regForm.mpin !== regForm.confirmMpin && (
                        <p className="text-xs text-red-600 mt-1 text-center font-sans">MPIN doesn't match</p>
                      )}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 font-sans transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                    onClick={handleRegister}
                    disabled={!regForm.name || !regForm.phone || regForm.mpin !== regForm.confirmMpin || regForm.mpin.length !== 4}
                  >
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="text-center">
                    <p className="text-gray-600 text-sm font-sans">
                      Already have an account?{' '}
                      <button 
                        className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 hover:underline"
                        onClick={() => setCurrentScreen('login')}
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms & Security */}
            <div className="text-center mt-6 space-y-4">
              <p className="text-xs text-gray-500 font-sans">
                By creating an account, you agree to our{' '}
                <span className="text-blue-600 hover:underline cursor-pointer">Terms & Conditions</span>
                {' '}and{' '}
                <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
              </p>
              
              <div className="flex items-center justify-center space-x-6">
                <div className="text-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-xs text-gray-600 font-sans">Secure</p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Lock className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-xs text-gray-600 font-sans">Encrypted</p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-1">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-xs text-gray-600 font-sans">Verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardScreen = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-3 pt-safe-or-4">
          <div className="flex items-center justify-between">
            <img src={kaniroLogo} alt="Kaniro" className="h-6" />
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('notifications')} className="relative">
                <Bell className="h-5 w-5" />
                {hasActiveData && <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('profile')}>
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto">
        {/* Service Cards Carousel */}
        <div className="bg-white border-b">
          <div className="px-4 py-4">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-200/30 via-blue-200/30 to-purple-200/30 p-0.5 shadow-lg">
              <div className="relative overflow-hidden rounded-2xl bg-white">
                <div 
                  className="flex transition-transform duration-500 ease-out touch-pan-y no-select"
                  style={{ transform: `translateX(-${currentServiceIndex * 100}%)` }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleServiceSwipe}
                >
                  {/* Deposit Card */}
                  <div className="w-full flex-shrink-0">
                    <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg border-0 rounded-2xl">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="bg-white/20 p-2 rounded-full">
                              <PiggyBank className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-bold">Deposit</h3>
                              <p className="text-xs opacity-80">Dabba Save</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">₹{savingsData.balance.toLocaleString()}</div>
                            <div className="text-xs opacity-80">Total Saved</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs mt-5">
                          <div className="text-center flex-1">
                            <div className="font-bold">+₹1,500</div>
                            <div className="opacity-80">This Month</div>
                          </div>
                          <div className="w-px h-8 bg-white/30"></div>
                          <div className="text-center flex-1">
                            <div className="font-bold">{savingsData.streak} Days</div>
                            <div className="opacity-80">Streak</div>
                          </div>
                          <div className="w-px h-8 bg-white/30"></div>
                          <div className="text-center flex-1">
                            <div className="font-bold">{userProfile.activePlans}</div>
                            <div className="opacity-80">Active Plans</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Payments Card */}
                  <div className="w-full flex-shrink-0">
                    <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg border-0 rounded-2xl">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="bg-white/20 p-2 rounded-full">
                              <CreditCard className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-bold">Payments</h3>
                              <p className="text-xs opacity-80">Dabba Pay</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">₹{loanAccounts.reduce((sum, loan) => sum + loan.overdueAmount, 0).toLocaleString()}</div>
                            <div className="text-xs opacity-80">Total Overdue</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs mt-5">
                          <div className="text-center flex-1">
                            <div className="font-bold">{loanAccounts.length}</div>
                            <div className="opacity-80">Overdue Loans</div>
                          </div>
                          <div className="w-px h-8 bg-white/30"></div>
                          <div className="text-center flex-1">
                            <div className="font-bold">₹{dabbaPayData.totalInterestSaved.toLocaleString()}</div>
                            <div className="opacity-80">Interest Saved</div>
                          </div>
                          <div className="w-px h-8 bg-white/30"></div>
                          <div className="text-center flex-1">
                            <div className="font-bold">{dabbaPayData.activeMicroPayments}</div>
                            <div className="opacity-80">Micro Plans</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Offers Card */}
                  <div className="w-full flex-shrink-0">
                    <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg border-0 rounded-2xl">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="bg-white/20 p-2 rounded-full">
                              <Gift className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="font-bold">Offers & Benefits</h3>
                              <p className="text-xs opacity-80">Lakshya</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">8%</div>
                            <div className="text-xs opacity-80">Max Returns</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs mt-5">
                          <div className="text-center flex-1">
                            <div className="font-bold">₹100</div>
                            <div className="opacity-80">Welcome Bonus</div>
                          </div>
                          <div className="w-px h-8 bg-white/30"></div>
                          <div className="text-center flex-1">
                            <div className="font-bold">₹50</div>
                            <div className="opacity-80">Per Referral</div>
                          </div>
                          <div className="w-px h-8 bg-white/30"></div>
                          <div className="text-center flex-1">
                            <div className="font-bold">0%</div>
                            <div className="opacity-80">Hidden Fees</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentServiceIndex(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        currentServiceIndex === index ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Cards */}
        <div className="p-4 space-y-4">
        {/* OneDabba Services */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>OneDabba Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Dabba Save */}
            <div className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-l-4 border-l-green-500" onClick={() => setCurrentScreen('dabba-name')}>
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500 p-3 rounded-full shadow-md">
                    <PiggyBank className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1">
                      <h4 className="font-bold text-gray-900">Dabba Save</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Start daily micro-deposits from ₹10</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Building2 className="h-3 w-3" />
                        <span>40+ Banks</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>Up to 8% returns</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-green-100 rounded-full px-3 py-1">
                    <PlusCircle className="h-4 w-4 text-green-600" />
                    <span className="text-xs font-medium text-green-700">Add</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="mx-4" />

            {/* Dabba Pay */}
            <div className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-l-4 border-l-blue-500" onClick={() => setCurrentScreen('pay-overdue-table')}>
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 p-3 rounded-full shadow-md">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1">
                      <h4 className="font-bold text-gray-900">Dabba Pay</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Overdue loan repayments from ₹100</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Shield className="h-3 w-3" />
                        <span>Secure payments</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Instant processing</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-blue-100 rounded-full px-3 py-1">
                    <Banknote className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-700">Pay</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="mx-4" />

            {/* Save & Pay */}
            <div className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-l-4 border-l-purple-500" onClick={() => setCurrentScreen('savepay')}>
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500 p-3 rounded-full shadow-md">
                    <Repeat className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1">
                      <h4 className="font-bold text-gray-900">Dabba Lakshya</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Achieve Your Goals</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Zap className="h-3 w-3" />
                        <span>Auto-debit</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>30+ Partners</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 bg-purple-100 rounded-full px-3 py-1">
                    <Compass className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-medium text-purple-700">Explore</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Offers - Promotional Carousel */}
        <Card className="bg-white shadow-sm overflow-hidden">
          <CardHeader className="pb-0.5">
            <CardTitle className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Special Offers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-out touch-pan-y no-select"
                style={{ transform: `translateX(-${currentPromoIndex * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handlePromoSwipe}
              >
                {promoCards.map((promo, index) => (
                  <div key={promo.id} className="w-full flex-shrink-0">
                    <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white overflow-hidden mx-4 h-32">
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <img 
                          src={promo.image} 
                          alt={promo.title}
                          className="w-full h-full object-cover opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 via-purple-600/80 to-pink-600/80"></div>
                      </div>
                      
                      <div className="relative z-10 p-4 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1 pr-2">
                            <Badge className="bg-white/20 text-white border-white/30 mb-2 text-xs">{promo.badge}</Badge>
                            <h4 className="font-bold text-base mb-1">{promo.title}</h4>
                            <p className="text-xs opacity-90">{promo.subtitle}</p>
                          </div>
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <img 
                              src={promo.image} 
                              alt={promo.title}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-auto">
                          <p className="text-xs opacity-90 line-clamp-1 mb-2">{promo.description}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {promo.subItems.slice(0, 3).map((item, idx) => (
                              <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Navigation Dots */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
                {promoCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPromoIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      currentPromoIndex === index ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>



        {/* Recent Activity */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-600" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit' ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownLeft className="h-4 w-4 text-white" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <div className={`font-bold ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-3"
                onClick={() => setCurrentScreen('dashboard')}
              >
                View All Transactions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Info */}
        <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">40+ Associate Banks</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-2">
                {['SBI', 'HDFC', 'ICICI', 'Axis'].map((bank, index) => (
                  <div key={index} className="bg-white rounded-lg p-2 text-center border border-gray-100 shadow-sm">
                    <span className="text-xs font-medium text-gray-700">{bank}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-100 mt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1">
                      <Phone className="h-5 w-5 text-blue-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">Call Center</h5>
                    <p className="text-xs text-blue-600 font-medium">1800-123-4567</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1">
                      <HelpCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900 text-sm mb-1">24/7 Support</h5>
                    <p className="text-xs text-green-600 font-medium">Always Available</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNavigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  // Dabba Name Selection Screen - Enhanced Premium Design
  const DabbaNameScreen = () => {
    const predefinedNames = [
      // Essential Goals (First Row)
      { name: 'Emergency Fund', icon: '🚨', description: 'For unexpected expenses', category: 'essential', color: 'red' },
      { name: 'Medical Emergency', icon: '🏥', description: 'Healthcare expenses', category: 'essential', color: 'pink' },
      { name: 'Kids Future', icon: '👶', description: 'Children\'s needs', category: 'essential', color: 'blue' },
      
      // Lifestyle Goals (Second Row)  
      { name: 'Dream Vacation', icon: '✈️', description: 'Holiday savings', category: 'lifestyle', color: 'sky' },
      { name: 'Wedding Fund', icon: '💍', description: 'Big day preparations', category: 'lifestyle', color: 'purple' },
      { name: 'Festival Fund', icon: '🎉', description: 'Celebration expenses', category: 'lifestyle', color: 'orange' },
      
      // Investment Goals (Third Row)
      { name: 'New Home', icon: '🏠', description: 'House down payment', category: 'investment', color: 'green' },
      { name: 'Car Purchase', icon: '🚗', description: 'Your dream car', category: 'investment', color: 'indigo' },
      { name: 'Jewellery', icon: '💎', description: 'Gold and jewelry purchase', category: 'investment', color: 'violet' },
      
      // Growth Goals (Fourth Row)
      { name: 'Education', icon: '🎓', description: 'Learning investment', category: 'growth', color: 'emerald' },
      { name: 'Business Fund', icon: '💼', description: 'Startup investment', category: 'growth', color: 'cyan' },
      { name: 'Retirement', icon: '👴', description: 'Golden years planning', category: 'growth', color: 'amber' }
    ];

    const getCardColors = (item: any, isSelected: boolean) => {
      const colorMap = {
        red: isSelected ? 'bg-red-50 border-red-300 shadow-red-100' : 'bg-red-25 border-red-100 hover:border-red-200 hover:bg-red-50',
        pink: isSelected ? 'bg-pink-50 border-pink-300 shadow-pink-100' : 'bg-pink-25 border-pink-100 hover:border-pink-200 hover:bg-pink-50',
        blue: isSelected ? 'bg-blue-50 border-blue-300 shadow-blue-100' : 'bg-blue-25 border-blue-100 hover:border-blue-200 hover:bg-blue-50',
        sky: isSelected ? 'bg-sky-50 border-sky-300 shadow-sky-100' : 'bg-sky-25 border-sky-100 hover:border-sky-200 hover:bg-sky-50',
        purple: isSelected ? 'bg-purple-50 border-purple-300 shadow-purple-100' : 'bg-purple-25 border-purple-100 hover:border-purple-200 hover:bg-purple-50',
        orange: isSelected ? 'bg-orange-50 border-orange-300 shadow-orange-100' : 'bg-orange-25 border-orange-100 hover:border-orange-200 hover:bg-orange-50',
        green: isSelected ? 'bg-green-50 border-green-300 shadow-green-100' : 'bg-green-25 border-green-100 hover:border-green-200 hover:bg-green-50',
        indigo: isSelected ? 'bg-indigo-50 border-indigo-300 shadow-indigo-100' : 'bg-indigo-25 border-indigo-100 hover:border-indigo-200 hover:bg-indigo-50',
        violet: isSelected ? 'bg-violet-50 border-violet-300 shadow-violet-100' : 'bg-violet-25 border-violet-100 hover:border-violet-200 hover:bg-violet-50',
        emerald: isSelected ? 'bg-emerald-50 border-emerald-300 shadow-emerald-100' : 'bg-emerald-25 border-emerald-100 hover:border-emerald-200 hover:bg-emerald-50',
        cyan: isSelected ? 'bg-cyan-50 border-cyan-300 shadow-cyan-100' : 'bg-cyan-25 border-cyan-100 hover:border-cyan-200 hover:bg-cyan-50',
        amber: isSelected ? 'bg-amber-50 border-amber-300 shadow-amber-100' : 'bg-amber-25 border-amber-100 hover:border-amber-200 hover:bg-amber-50'
      };
      return colorMap[item.color as keyof typeof colorMap] || (isSelected ? 'bg-gray-50 border-gray-300' : 'bg-white border-gray-100 hover:border-gray-200');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30">
        {/* Enhanced Header with Glassmorphism */}
        <div className="glass-strong shadow-sm border-b border-white/20">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentScreen('dashboard')}
                  className="hover:bg-white/20 rounded-full transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="font-bold text-gray-900">Choose Your Dabba</h1>
                  <p className="text-sm text-gray-600">What are you saving for?</p>
                </div>
              </div>
              
              {/* Kaniro Logo */}
              <div className="flex-shrink-0">
                <img src={kaniroLogo} alt="Kaniro" className="h-6 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6 pb-24">
          {/* Enhanced Grid with Premium Styling */}
          <div className="grid grid-cols-3 gap-3">
            {predefinedNames.map((item, index) => {
              const isSelected = dabbaSetup.dabbaName === item.name;
              return (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 rounded-xl border-2 ${getCardColors(item, isSelected)} ${
                    isSelected ? 'shadow-lg ring-2 ring-white/50' : 'shadow-sm hover:shadow-md'
                  }`}
                  onClick={() => {
                    setDabbaSetup(prev => ({
                      ...prev,
                      dabbaName: item.name,
                      dabbaIcon: item.icon,
                      customDabbaName: ''
                    }));
                  }}
                >
                  <CardContent className="p-3">
                    <div className="text-center space-y-2">
                      {/* Enhanced Icon with Background */}
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                        isSelected ? 'bg-white/80 shadow-sm scale-110' : 'bg-white/50'
                      }`}>
                        {item.icon}
                      </div>
                      
                      {/* Enhanced Typography */}
                      <div>
                        <h4 className={`font-semibold text-xs leading-tight transition-colors duration-200 ${
                          isSelected ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {item.name}
                        </h4>
                      </div>
                      
                      {/* Enhanced Selection Indicator */}
                      {isSelected && (
                        <div className="animate-bounce">
                          <CheckCircle className="h-4 w-4 text-green-600 mx-auto filter drop-shadow-sm" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Enhanced Custom Input Section */}
          <Card className={`transition-all duration-300 rounded-xl border-2 ${
            dabbaSetup.customDabbaName 
              ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg ring-2 ring-white/50' 
              : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 hover:border-gray-300 hover:shadow-md'
          }`}>
            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Custom Header */}
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${
                    dabbaSetup.customDabbaName ? 'bg-white/80 shadow-sm' : 'bg-white/50'
                  }`}>
                    ✏️
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-900">Custom Savings Goal</h4>
                    <p className="text-xs text-gray-600">Create your own personalized category</p>
                  </div>
                  {dabbaSetup.customDabbaName && (
                    <div className="animate-bounce">
                      <CheckCircle className="h-5 w-5 text-green-600 filter drop-shadow-sm" />
                    </div>
                  )}
                </div>
                
                {/* Enhanced Input */}
                <div className="relative">
                  <Input
                    placeholder="e.g., Gaming Setup, Pet Care, Travel Fund..."
                    value={dabbaSetup.customDabbaName}
                    className={`h-10 text-sm transition-all duration-200 rounded-lg border-2 ${
                      dabbaSetup.customDabbaName 
                        ? 'border-purple-200 bg-white/90 focus:border-purple-400 focus:ring-purple-100' 
                        : 'border-gray-200 bg-white/70 focus:border-gray-400 focus:ring-gray-100'
                    }`}
                    onChange={(e) => {
                      setDabbaSetup(prev => ({
                        ...prev,
                        customDabbaName: e.target.value,
                        dabbaName: e.target.value ? 'custom' : '',
                        dabbaIcon: '💰'
                      }));
                    }}
                  />
                  {/* Input Icon */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-gray-400">💡</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Continue Button */}
          <Button 
            className={`w-full h-12 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
              (!dabbaSetup.dabbaName && !dabbaSetup.customDabbaName)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
            }`}
            disabled={!dabbaSetup.dabbaName && !dabbaSetup.customDabbaName}
            onClick={() => setCurrentScreen('dabba-goal')}
          >
            {(!dabbaSetup.dabbaName && !dabbaSetup.customDabbaName) ? (
              <>
                <Target className="mr-2 h-5 w-5" />
                Choose Your Goal
              </>
            ) : (
              <>
                Continue Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-gray-200 rounded-full"></div>
            <div className="w-3 h-1 bg-gray-200 rounded-full"></div>
            <div className="w-3 h-1 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    );
  };

  // Dabba Goal Screen - Enhanced with Slider, Frequency & Period Selection
  const DabbaGoalScreen = () => {
    const [sliderValue, setSliderValue] = useState(parseInt(dabbaSetup.targetAmount) || 10000);
    const [selectedDuration, setSelectedDuration] = useState(dabbaSetup.duration || 30);
    const [customPeriodInput, setCustomPeriodInput] = useState('');
    
    // Calculate deposit amount and number of payments based on frequency, target, and duration (in days)
    const calculateDepositDetails = (target: number, frequency: string, durationInDays: number) => {
      let totalPayments = 0;
      let depositAmount = 0;
      let paymentText = '';
      
      switch(frequency) {
        case 'daily':
          totalPayments = durationInDays;
          depositAmount = Math.ceil(target / totalPayments);
          paymentText = `${totalPayments} daily deposits`;
          break;
        case 'weekly':
          totalPayments = Math.ceil(durationInDays / 7);
          depositAmount = Math.ceil(target / totalPayments);
          paymentText = `${totalPayments} weekly deposits`;
          break;
        case 'monthly':
          totalPayments = Math.ceil(durationInDays / 30);
          depositAmount = Math.ceil(target / totalPayments);
          paymentText = `${totalPayments} monthly deposits`;
          break;
        default:
          totalPayments = durationInDays;
          depositAmount = Math.ceil(target / totalPayments);
          paymentText = `${totalPayments} daily deposits`;
      }
      
      return { depositAmount, totalPayments, paymentText };
    };

    const depositDetails = calculateDepositDetails(sliderValue, dabbaSetup.frequency || 'daily', selectedDuration);
    
    // Format amount for display
    const formatAmount = (amount: number) => {
      if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
      if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
      return `₹${amount}`;
    };

    const handleSliderChange = (value: number) => {
      setSliderValue(value);
      setDabbaSetup(prev => ({ ...prev, targetAmount: value.toString() }));
    };

    const handleDurationChange = (duration: number) => {
      setSelectedDuration(duration);
      setDabbaSetup(prev => ({ ...prev, duration: duration }));
    };

    // Reset duration when frequency changes to ensure valid combination
    const handleFrequencyChange = (frequency: string) => {
      setDabbaSetup(prev => ({ ...prev, frequency }));
      
      // Clear custom input when frequency changes
      setCustomPeriodInput('');
      
      // Auto-select appropriate default duration based on frequency (in days)
      const defaultDurations = {
        daily: 30,   // 30 days default for daily
        weekly: 84,  // 12 weeks (3 months) default for weekly  
        monthly: 180 // 6 months default for monthly
      };
      
      const newDuration = defaultDurations[frequency as keyof typeof defaultDurations] || 30;
      setSelectedDuration(newDuration);
      setDabbaSetup(prev => ({ ...prev, duration: newDuration }));
    };

    const handleContinue = () => {
      if (dabbaSetup.targetAmount && dabbaSetup.frequency && selectedDuration) {
        setCurrentScreen('dabba-schemes');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30">
        {/* Enhanced Header */}
        <div className="glass-strong shadow-sm border-b border-white/20">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentScreen('dabba-name')}
                  className="hover:bg-white/20 rounded-full transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="font-bold text-gray-900">Set Target Amount</h1>
                  <p className="text-sm text-gray-600">Choose amount and frequency</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img src={kaniroLogo} alt="Kaniro" className="h-6 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-4 pb-24">
          {/* Compact Header Card with Target Amount */}
          <Card className="bg-gradient-to-br from-white to-blue-50/50 border-2 border-blue-100 shadow-lg rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{dabbaSetup.dabbaIcon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{dabbaSetup.customDabbaName || dabbaSetup.dabbaName}</h3>
                    <p className="text-xs text-gray-600">Your savings journey</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-700">{formatAmount(sliderValue)}</div>
                  <div className="text-xs text-gray-600">Target Amount</div>
                </div>
              </div>

              {/* Compact Slider */}
              <div className="space-y-3">
                <input
                  type="range"
                  min="1000"
                  max="500000"
                  step="1000"
                  value={sliderValue}
                  onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-blue-200 to-green-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((sliderValue - 1000) / (500000 - 1000)) * 100}%, #e5e7eb ${((sliderValue - 1000) / (500000 - 1000)) * 100}%, #e5e7eb 100%)`
                  }}
                />
                
                {/* Compact Slider Labels */}
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹1K</span>
                  <span>₹50K</span>
                  <span>₹500K</span>
                </div>
              </div>

              {/* Compact Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[
                  { amount: 5000, label: '₹5K' },
                  { amount: 15000, label: '₹15K' },
                  { amount: 50000, label: '₹50K' },
                  { amount: 100000, label: '₹1L' }
                ].map((preset) => (
                  <Button
                    key={preset.amount}
                    variant={sliderValue === preset.amount ? "default" : "outline"}
                    size="sm"
                    className="text-xs py-1.5 h-7"
                    onClick={() => handleSliderChange(preset.amount)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compact Frequency & Period Selection */}
          <Card className="bg-gradient-to-br from-white to-green-50/50 border-2 border-green-100 shadow-lg rounded-xl">
            <CardContent className="p-4">
              {/* Frequency Selection Row */}
              <div className="mb-4">
                <h4 className="font-semibold text-sm text-gray-900 mb-2">Deposit Frequency</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { 
                      value: 'daily', 
                      label: 'Daily', 
                      icon: '📅', 
                      color: 'border-green-200 bg-green-50 text-green-700'
                    },
                    { 
                      value: 'weekly', 
                      label: 'Weekly', 
                      icon: '📊', 
                      color: 'border-blue-200 bg-blue-50 text-blue-700'
                    },
                    { 
                      value: 'monthly', 
                      label: 'Monthly', 
                      icon: '💰', 
                      color: 'border-purple-200 bg-purple-50 text-purple-700'
                    }
                  ].map((freq) => (
                    <Button
                      key={freq.value}
                      variant={dabbaSetup.frequency === freq.value ? "default" : "outline"}
                      size="sm"
                      className={`h-12 flex items-center justify-center text-xs transition-all duration-300 ${
                        dabbaSetup.frequency === freq.value
                          ? `${freq.color} scale-105 shadow-md`
                          : 'hover:shadow-sm'
                      }`}
                      onClick={() => handleFrequencyChange(freq.value)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="text-base">{freq.icon}</div>
                        <div className="font-medium">{freq.label}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Period Selection Row */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm text-gray-900">Savings Period</h4>
                  {dabbaSetup.frequency && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      {dabbaSetup.frequency === 'daily' && 'Days/Weeks'}
                      {dabbaSetup.frequency === 'weekly' && 'Weeks/Months'} 
                      {dabbaSetup.frequency === 'monthly' && 'Months/Years'}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {(() => {
                    const periodOptions = {
                      daily: [
                        { value: 10, label: '10D', days: 10 },
                        { value: 20, label: '20D', days: 20 },
                        { value: 30, label: '1M', days: 30 },
                        { value: 60, label: '2M', days: 60 },
                        { value: 90, label: '3M', days: 90 }
                      ],
                      weekly: [
                        { value: 4, label: '4W', days: 28 },
                        { value: 8, label: '2M', days: 56 },
                        { value: 12, label: '3M', days: 84 },
                        { value: 24, label: '6M', days: 168 },
                        { value: 52, label: '1Y', days: 364 }
                      ],
                      monthly: [
                        { value: 3, label: '3M', days: 90 },
                        { value: 6, label: '6M', days: 180 },
                        { value: 12, label: '1Y', days: 365 },
                        { value: 18, label: '1.5Y', days: 547 },
                        { value: 24, label: '2Y', days: 730 }
                      ]
                    };
                    
                    const currentOptions = periodOptions[dabbaSetup.frequency as keyof typeof periodOptions] || periodOptions.daily;
                    
                    return currentOptions.map((period) => (
                      <Button
                        key={period.value}
                        variant={selectedDuration === period.days ? "default" : "outline"}
                        size="sm"
                        className="text-xs py-1.5 h-8"
                        onClick={() => handleDurationChange(period.days)}
                      >
                        {period.label}
                      </Button>
                    ));
                  })()}
                </div>
              </div>

              {/* Custom Period - Inline */}
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-700 font-medium">Custom:</span>
                  <Input
                    type="number"
                    placeholder="Enter"
                    value={customPeriodInput}
                    min="1"
                    max={dabbaSetup.frequency === 'daily' ? '365' : dabbaSetup.frequency === 'weekly' ? '104' : '60'}
                    className="flex-1 h-8 text-xs border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      setCustomPeriodInput(inputValue);
                      
                      const value = parseInt(inputValue);
                      if (value && value > 0) {
                        let days;
                        if (dabbaSetup.frequency === 'daily') {
                          days = value;
                        } else if (dabbaSetup.frequency === 'weekly') {
                          days = value * 7;
                        } else {
                          days = value * 30;
                        }
                        handleDurationChange(days);
                      }
                    }}
                    onBlur={() => {
                      // Clear input if empty or invalid
                      if (!customPeriodInput || parseInt(customPeriodInput) <= 0) {
                        setCustomPeriodInput('');
                      }
                    }}
                  />
                  <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded text-center min-w-[50px]">
                    {dabbaSetup.frequency === 'daily' && 'Days'}
                    {dabbaSetup.frequency === 'weekly' && 'Weeks'} 
                    {dabbaSetup.frequency === 'monthly' && 'Months'}
                  </div>
                </div>
              </div>

              {/* Compact Deposit Prediction */}
              {dabbaSetup.frequency && selectedDuration && (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm text-green-700">Your {dabbaSetup.frequency} deposit</div>
                      <div className="text-xl font-bold text-green-800">₹{depositDetails.depositAmount.toLocaleString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-600">{depositDetails.paymentText}</div>
                      <div className="text-xs text-gray-600">
                        {(() => {
                          if (dabbaSetup.frequency === 'daily') {
                            return selectedDuration < 30 ? `${selectedDuration} days` : `${Math.round(selectedDuration/30)} months`;
                          } else if (dabbaSetup.frequency === 'weekly') {
                            return selectedDuration < 30 ? `${Math.round(selectedDuration/7)} weeks` : `${Math.round(selectedDuration/30)} months`;
                          } else {
                            return selectedDuration < 365 ? `${Math.round(selectedDuration/30)} months` : `${Math.round(selectedDuration/365)} years`;
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                  
                  {/* Inline Stats */}
                  <div className="flex justify-between items-center text-xs bg-white/50 rounded p-2">
                    <div className="text-center">
                      <div className="font-semibold text-gray-800">{depositDetails.totalPayments}</div>
                      <div className="text-gray-600">Payments</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-800">₹{(depositDetails.depositAmount * depositDetails.totalPayments).toLocaleString()}</div>
                      <div className="text-gray-600">Total</div>
                    </div>
                    <div className="text-center">
                      {depositDetails.depositAmount <= 50 && (
                        <span className="bg-green-100 px-2 py-1 rounded-full text-green-700">💡 Perfect!</span>
                      )}
                      {depositDetails.depositAmount > 50 && depositDetails.depositAmount <= 200 && (
                        <span className="bg-blue-100 px-2 py-1 rounded-full text-blue-700">📈 Balanced</span>
                      )}
                      {depositDetails.depositAmount > 200 && (
                        <span className="bg-purple-100 px-2 py-1 rounded-full text-purple-700">🚀 Ambitious</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Continue Button */}
          <Button 
            className={`w-full h-12 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
              (!dabbaSetup.targetAmount || !dabbaSetup.frequency || !selectedDuration)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
            }`}
            disabled={!dabbaSetup.targetAmount || !dabbaSetup.frequency || !selectedDuration}
            onClick={handleContinue}
          >
            {(!dabbaSetup.targetAmount || !dabbaSetup.frequency || !selectedDuration) ? (
              <>
                <Calculator className="mr-2 h-5 w-5" />
                Complete Your Plan
              </>
            ) : (
              <>
                Choose Interest Scheme
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    );
  };

  // Dabba Duration Screen
  const DabbaDurationScreen = () => {
    const calculateDailyAmount = () => {
      if (!dabbaSetup.targetAmount || !dabbaSetup.duration) return 0;
      return Math.ceil(parseInt(dabbaSetup.targetAmount) / (dabbaSetup.duration * 30));
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dabba-goal')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">Choose Duration</h1>
                <p className="text-sm text-gray-600">How long do you want to save?</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-green-600">₹{dabbaSetup.targetAmount}</div>
                <p className="text-sm text-gray-600">Target Amount</p>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[3, 6, 12, 18, 24, 36].map((months) => (
                  <Button
                    key={months}
                    variant={dabbaSetup.duration === months ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDabbaSetup(prev => ({ ...prev, duration: months }))}
                  >
                    {months}M
                  </Button>
                ))}
              </div>

              {dabbaSetup.duration && (
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-lg font-bold text-green-800">₹{calculateDailyAmount()}</div>
                  <div className="text-sm text-green-600">Daily Micro Deposit needed</div>
                </div>
              )}
            </CardContent>
          </Card>

          <div>
            <Label>Frequency</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' }
              ].map((freq) => (
                <Button
                  key={freq.value}
                  variant={dabbaSetup.frequency === freq.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDabbaSetup(prev => ({ ...prev, frequency: freq.value }))}
                >
                  {freq.label}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            className="w-full"
            disabled={!dabbaSetup.duration}
            onClick={() => setCurrentScreen('dabba-summary')}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Dabba Summary Screen
  const DabbaSummaryScreen = () => {
    const dailyAmount = Math.ceil(parseInt(dabbaSetup.targetAmount) / (dabbaSetup.duration * 30));
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dabba-duration')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">Plan Summary</h1>
                <p className="text-sm text-gray-600">Review your savings plan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <Card>
            <CardHeader>
              <div className="text-center">
                <div className="text-3xl mb-2">{dabbaSetup.dabbaIcon}</div>
                <CardTitle>{dabbaSetup.customDabbaName || dabbaSetup.dabbaName}</CardTitle>
                <CardDescription>{dabbaSetup.goal}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-700">₹{dabbaSetup.targetAmount}</div>
                    <div className="text-xs text-green-600">Target Amount</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-700">{dabbaSetup.duration} Months</div>
                    <div className="text-xs text-blue-600">Duration</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Daily Micro Deposit</span>
                    <span className="font-bold">₹{dailyAmount}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">Frequency</span>
                    <span className="font-medium capitalize">{dabbaSetup.frequency}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Auto-debit protection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Flexible withdrawal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Up to 8% returns</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            className="w-full"
            onClick={() => setCurrentScreen('dabba-schemes')}
          >
            Choose Interest Scheme
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Bank & Scheme Selection Screen
  const DabbaSchemesScreen = () => {
    const [showComparison, setShowComparison] = useState(false);
    const [selectedForComparison, setSelectedForComparison] = useState<number[]>([]);

    const bankSchemes = [
      {
        id: 1,
        bankName: 'State Bank of India',
        bankLogo: '🏛️',
        isRecommended: true,
        isPartner: true,
        schemeName: 'SBI Sukanya Samriddhi',
        interestRate: 8.2,
        minDeposit: 250,
        maxDeposit: 150000,
        tenure: '15 years',
        compounding: 'Annual',
        prematureWithdrawal: 'After 5 years',
        taxBenefit: 'Section 80C',
        features: [
          'Highest interest rate',
          'Government backed security', 
          'Tax benefits under 80C',
          'Partial withdrawal allowed',
          'Online account management'
        ],
        benefits: [
          'Zero processing fee',
          'Doorstep banking',
          'SMS & email alerts',
          'Mobile banking support'
        ],
        rating: 4.8,
        customerBase: '45M+',
        processingTime: '24 hours'
      },
      {
        id: 2,
        bankName: 'HDFC Bank',
        bankLogo: '🏢',
        isRecommended: false,
        isPartner: true,
        schemeName: 'HDFC Recurring Deposit Plus',
        interestRate: 7.75,
        minDeposit: 100,
        maxDeposit: 500000,
        tenure: '1-10 years',
        compounding: 'Quarterly',
        prematureWithdrawal: 'After 6 months',
        taxBenefit: 'TDS applicable',
        features: [
          'Flexible tenure options',
          'Auto-sweep facility',
          'Loan against deposit',
          'Online renewal',
          'Standing instructions'
        ],
        benefits: [
          'NetBanking convenience',
          'Relationship manager',
          'Priority customer service',
          'Digital statements'
        ],
        rating: 4.6,
        customerBase: '68M+',
        processingTime: '2 hours'
      },
      {
        id: 3,
        bankName: 'ICICI Bank',
        bankLogo: '🏦',
        isRecommended: false,
        isPartner: true,
        schemeName: 'ICICI iWish Flexible RD',
        interestRate: 7.25,
        minDeposit: 500,
        maxDeposit: 1000000,
        tenure: '6 months - 10 years',
        compounding: 'Quarterly',
        prematureWithdrawal: 'Anytime with penalty',
        taxBenefit: 'Standard TDS',
        features: [
          'Goal-based savings',
          'Flexible amount increase',
          'Auto debit facility',
          'iMobile app integration',
          'Instant account opening'
        ],
        benefits: [
          'Digital-first experience',
          '24/7 customer support',
          'Reward points program',
          'Video KYC available'
        ],
        rating: 4.5,
        customerBase: '50M+',
        processingTime: '1 hour'
      },
      {
        id: 4,
        bankName: 'Axis Bank',
        bankLogo: '🏛️',
        isRecommended: false,
        isPartner: true,
        schemeName: 'Axis Power Savings',
        interestRate: 7.50,
        minDeposit: 1000,
        maxDeposit: 250000,
        tenure: '1-5 years',
        compounding: 'Monthly',
        prematureWithdrawal: 'After 1 year',
        taxBenefit: 'Standard TDS',
        features: [
          'Monthly compounding',
          'High liquidity',
          'Easy top-up facility',
          'Axis Mobile integration',
          'Free NEFT/RTGS'
        ],
        benefits: [
          'Personalized service',
          'Dedicated RM support',
          'Priority banking perks',
          'Insurance tie-ups'
        ],
        rating: 4.4,
        customerBase: '25M+',
        processingTime: '4 hours'
      },
      {
        id: 5,
        bankName: 'Kotak Mahindra Bank',
        bankLogo: '🏢',
        isRecommended: false,
        isPartner: true,
        schemeName: 'Kotak ActivMoney',
        interestRate: 6.75,
        minDeposit: 2500,
        maxDeposit: 100000,
        tenure: '1-3 years',
        compounding: 'Quarterly',
        prematureWithdrawal: 'After 1 year',
        taxBenefit: 'Standard TDS',
        features: [
          'Smart auto-sweep',
          'Zero penalty charges',
          'Instant liquidity',
          'Kotak 811 integration',
          'Paperless account'
        ],
        benefits: [
          'Zero maintenance fees',
          'Quick loan approval',
          'Cashback rewards',
          'Video banking support'
        ],
        rating: 4.3,
        customerBase: '18M+',
        processingTime: '30 minutes'
      }
    ];

    const toggleComparison = (schemeId: number) => {
      if (selectedForComparison.includes(schemeId)) {
        setSelectedForComparison(prev => prev.filter(id => id !== schemeId));
      } else if (selectedForComparison.length < 3) {
        setSelectedForComparison(prev => [...prev, schemeId]);
      }
    };

    const getSelectedSchemes = () => {
      return bankSchemes.filter(scheme => selectedForComparison.includes(scheme.id));
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30">
        {/* Enhanced Header */}
        <div className="glass-strong shadow-sm border-b border-white/20">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentScreen('dabba-goal')}
                  className="hover:bg-white/20 rounded-full transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="font-bold text-gray-900">Bank & Scheme Selection</h1>
                  <p className="text-sm text-gray-600">Choose your deposit plan</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img src={kaniroLogo} alt="Kaniro" className="h-6 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-4 pb-24">
          {/* Recommended Banner */}
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Star className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">Recommended Choice</h3>
                  <p className="text-sm opacity-90">Best returns with government security</p>
                </div>
                <div className="text-2xl font-bold">8.2%</div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Toggle */}
          {selectedForComparison.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-500 p-1.5 rounded-full">
                      <Calculator className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <span className="font-medium text-blue-900">
                        {selectedForComparison.length} scheme(s) selected
                      </span>
                      <p className="text-xs text-blue-700">Compare features side by side</p>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => setShowComparison(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Compare Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Bank Schemes List */}
          <div className="space-y-4">
            {bankSchemes.map((scheme) => {
              const isSelected = dabbaSetup.selectedScheme?.id === scheme.id;
              const isInComparison = selectedForComparison.includes(scheme.id);
              
              return (
                <Card 
                  key={scheme.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] rounded-xl border-2 ${
                    isSelected 
                      ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg ring-2 ring-white/50' 
                      : isInComparison
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md bg-white'
                  }`}
                  onClick={() => setDabbaSetup(prev => ({ ...prev, selectedScheme: scheme }))}
                >
                  <CardContent className="p-3">
                    {/* Compact Bank Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="text-lg">{scheme.bankLogo}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-1 mb-0.5">
                            <h3 className="font-bold text-sm text-gray-900">{scheme.bankName}</h3>
                            {scheme.isRecommended && (
                              <Badge className="bg-green-100 text-green-700 border-green-200 text-xs px-1 py-0">
                                ⭐
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 leading-tight">{scheme.schemeName}</p>
                          <div className="flex items-center space-x-1 mt-0.5">
                            <div className="flex items-center space-x-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-2.5 w-2.5 ${
                                    i < Math.floor(scheme.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                              <span className="text-xs text-gray-500 ml-1">{scheme.rating}</span>
                            </div>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{scheme.customerBase}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">{scheme.interestRate}%</div>
                          <div className="text-xs text-gray-500">Interest</div>
                        </div>
                        
                        {/* Comparison Toggle */}
                        <Button
                          size="sm"
                          variant={isInComparison ? "default" : "outline"}
                          className="h-7 w-7 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComparison(scheme.id);
                          }}
                          disabled={!isInComparison && selectedForComparison.length >= 3}
                        >
                          {isInComparison ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <Plus className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Compact Details Grid */}
                    <div className="grid grid-cols-4 gap-1.5 mb-3">
                      <div className="bg-gray-50 rounded p-1.5 text-center">
                        <div className="text-xs font-semibold text-gray-800">₹{scheme.minDeposit >= 1000 ? Math.round(scheme.minDeposit/1000) + 'K' : scheme.minDeposit}</div>
                        <div className="text-xs text-gray-500">Min</div>
                      </div>
                      <div className="bg-gray-50 rounded p-1.5 text-center">
                        <div className="text-xs font-semibold text-gray-800">{scheme.tenure.replace(' years', 'Y').replace(' months', 'M')}</div>
                        <div className="text-xs text-gray-500">Term</div>
                      </div>
                      <div className="bg-gray-50 rounded p-1.5 text-center">
                        <div className="text-xs font-semibold text-gray-800">{scheme.processingTime.replace(' hours', 'h').replace(' hour', 'h').replace(' minutes', 'm')}</div>
                        <div className="text-xs text-gray-500">Process</div>
                      </div>
                      <div className="bg-gray-50 rounded p-1.5 text-center">
                        <div className="text-xs font-semibold text-gray-800">{scheme.taxBenefit.includes('80C') ? '80C' : 'TDS'}</div>
                        <div className="text-xs text-gray-500">Tax</div>
                      </div>
                    </div>

                    {/* Compact Features - Single Line */}
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-1">
                        {scheme.features.slice(0, 2).map((feature, index) => (
                          <div key={index} className="flex items-center space-x-1 bg-green-50 rounded-full px-2 py-0.5">
                            <CheckCircle className="h-2.5 w-2.5 text-green-600 flex-shrink-0" />
                            <span className="text-xs text-green-700 truncate">{feature.replace('Government backed security', 'Govt Security').replace('Online account management', 'Online Mgmt')}</span>
                          </div>
                        ))}
                        {scheme.features.length > 2 && (
                          <div className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-0.5">
                            <span className="text-xs text-gray-600">+{scheme.features.length - 2} more</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                        <div className="flex items-center space-x-2 text-green-700">
                          <CheckCircle className="h-3 w-3" />
                          <span className="text-xs font-medium">Selected</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => setCurrentScreen('dabba-compare')}
            >
              <Calculator className="mr-2 h-4 w-4" />
              Compare Features
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              disabled={!dabbaSetup.selectedScheme}
              onClick={() => setCurrentScreen('dabba-kyc')}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2 pt-2">
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />

        {/* Comparison Modal */}
        {showComparison && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg max-h-[80vh] overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">Scheme Comparison</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowComparison(false)}
                      className="text-white hover:bg-white/20"
                    >
                      ✕
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 overflow-y-auto max-h-[60vh]">
                  <div className="space-y-4">
                    {getSelectedSchemes().map((scheme) => (
                      <div key={scheme.id} className="border rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-lg">{scheme.bankLogo}</span>
                          <div>
                            <h4 className="font-bold text-sm">{scheme.bankName}</h4>
                            <p className="text-xs text-gray-600">{scheme.schemeName}</p>
                          </div>
                          <div className="ml-auto text-right">
                            <div className="font-bold text-green-600">{scheme.interestRate}%</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">Min Amount:</span>
                            <div className="font-medium">₹{scheme.minDeposit.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Tenure:</span>
                            <div className="font-medium">{scheme.tenure}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Processing:</span>
                            <div className="font-medium">{scheme.processingTime}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Rating:</span>
                            <div className="font-medium">{scheme.rating}/5</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    onClick={() => setShowComparison(false)}
                  >
                    Close Comparison
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };

  // Enhanced Bank & Scheme Compare Screen
  const DabbaCompareScreen = () => {
    const topBankSchemes = [
      {
        bankName: 'SBI',
        schemeName: 'Sukanya Samriddhi',
        logo: '🏛️',
        rate: 8.2,
        minDeposit: 250,
        tenure: '15 years',
        safety: 'Government Backed',
        liquidity: 'Partial after 5 years',
        taxBenefit: 'Section 80C',
        customerSupport: '24/7',
        digitalFeatures: 'Full Online',
        specialFeature: 'Highest Returns'
      },
      {
        bankName: 'HDFC',
        schemeName: 'RD Plus',
        logo: '🏢',
        rate: 7.75,
        minDeposit: 100,
        tenure: '1-10 years',
        safety: 'DICGC Insured',
        liquidity: 'After 6 months',
        taxBenefit: 'Standard TDS',
        customerSupport: 'Priority',
        digitalFeatures: 'NetBanking',
        specialFeature: 'Auto Sweep'
      },
      {
        bankName: 'ICICI',
        schemeName: 'iWish Flexible',
        logo: '🏦',
        rate: 7.25,
        minDeposit: 500,
        tenure: '6 months - 10 years',
        safety: 'DICGC Insured',
        liquidity: 'Anytime',
        taxBenefit: 'Standard TDS',
        customerSupport: '24/7 Digital',
        digitalFeatures: 'iMobile App',
        specialFeature: 'Goal Based'
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30">
        {/* Enhanced Header */}
        <div className="glass-strong shadow-sm border-b border-white/20">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentScreen('dabba-schemes')}
                  className="hover:bg-white/20 rounded-full transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="font-bold text-gray-900">Compare Banks & Schemes</h1>
                  <p className="text-sm text-gray-600">Side by side feature comparison</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img src={kaniroLogo} alt="Kaniro" className="h-6 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-4 pb-24">
          {/* Quick Comparison Cards */}
          <div className="space-y-3">
            {topBankSchemes.map((scheme, index) => (
              <Card key={index} className={`transition-all duration-300 hover:shadow-lg rounded-xl border-2 ${
                index === 0 ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50' : 'border-gray-200 bg-white'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{scheme.logo}</div>
                      <div>
                        <h3 className="font-bold text-gray-900">{scheme.bankName}</h3>
                        <p className="text-sm text-gray-600">{scheme.schemeName}</p>
                      </div>
                      {index === 0 && (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{scheme.rate}%</div>
                      <div className="text-xs text-gray-500">Interest Rate</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <span className="text-xs text-gray-500">Min Deposit</span>
                      <div className="font-semibold text-sm">₹{scheme.minDeposit.toLocaleString()}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <span className="text-xs text-gray-500">Tenure</span>
                      <div className="font-semibold text-sm">{scheme.tenure}</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-700">
                      <strong>Special:</strong> {scheme.specialFeature}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Comparison Table */}
          <Card className="bg-white shadow-lg rounded-xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <span>Detailed Feature Comparison</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 text-xs font-medium text-gray-600 uppercase">Feature</th>
                      {topBankSchemes.map((scheme) => (
                        <th key={scheme.bankName} className="text-center py-3 text-xs font-medium text-gray-600 uppercase">
                          {scheme.bankName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-3 text-sm font-medium">Interest Rate</td>
                      {topBankSchemes.map((scheme) => (
                        <td key={scheme.bankName} className="text-center py-3">
                          <span className="font-bold text-green-600">{scheme.rate}%</span>
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 text-sm font-medium">Minimum Deposit</td>
                      {topBankSchemes.map((scheme) => (
                        <td key={scheme.bankName} className="text-center py-3 text-sm">
                          ₹{scheme.minDeposit.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium">Safety Level</td>
                      {topBankSchemes.map((scheme) => (
                        <td key={scheme.bankName} className="text-center py-3 text-sm">
                          <span className={scheme.safety.includes('Government') ? 'text-green-600 font-medium' : 'text-blue-600'}>
                            {scheme.safety}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 text-sm font-medium">Liquidity</td>
                      {topBankSchemes.map((scheme) => (
                        <td key={scheme.bankName} className="text-center py-3 text-sm">
                          {scheme.liquidity}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 text-sm font-medium">Tax Benefits</td>
                      {topBankSchemes.map((scheme) => (
                        <td key={scheme.bankName} className="text-center py-3 text-sm">
                          <span className={scheme.taxBenefit.includes('80C') ? 'text-green-600 font-medium' : 'text-gray-600'}>
                            {scheme.taxBenefit}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-3 text-sm font-medium">Digital Features</td>
                      {topBankSchemes.map((scheme) => (
                        <td key={scheme.bankName} className="text-center py-3 text-sm">
                          {scheme.digitalFeatures}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Winner Recommendation */}
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Award className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">Our Recommendation</h3>
                  <p className="text-sm opacity-90">SBI Sukanya Samriddhi offers the highest returns with government backing and best tax benefits</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">8.2%</div>
                  <div className="text-xs opacity-80">Best Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => setCurrentScreen('dabba-schemes')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Selection
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              onClick={() => {
                // Auto-select the recommended scheme (SBI)
                const recommendedScheme = {
                  id: 1,
                  bankName: 'State Bank of India',
                  schemeName: 'SBI Sukanya Samriddhi',
                  interestRate: 8.2
                };
                setDabbaSetup(prev => ({ ...prev, selectedScheme: recommendedScheme }));
                setCurrentScreen('dabba-kyc');
              }}
            >
              Select Recommended
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2 pt-2">
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    );
  };

  // Dabba Review Screen - KYC Info & Scheme Summary Review
  const DabbaReviewScreen = () => {
    const depositDetails = (() => {
      const targetAmount = parseInt(dabbaSetup.targetAmount) || 0;
      const duration = dabbaSetup.duration || 30; // duration in days
      let totalPayments = 0;
      let depositAmount = 0;
      
      switch(dabbaSetup.frequency) {
        case 'daily':
          totalPayments = duration;
          depositAmount = Math.ceil(targetAmount / totalPayments);
          break;
        case 'weekly':
          totalPayments = Math.ceil(duration / 7);
          depositAmount = Math.ceil(targetAmount / totalPayments);
          break;
        case 'monthly':
          totalPayments = Math.ceil(duration / 30);
          depositAmount = Math.ceil(targetAmount / totalPayments);
          break;
        default:
          totalPayments = duration;
          depositAmount = Math.ceil(targetAmount / totalPayments);
      }
      
      return { depositAmount, totalPayments, targetAmount };
    })();

    const maturityDate = new Date();
    maturityDate.setDate(maturityDate.getDate() + dabbaSetup.duration);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30">
        {/* Enhanced Header */}
        <div className="glass-strong shadow-sm border-b border-white/20">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentScreen('dabba-kyc')}
                  className="hover:bg-white/20 rounded-full transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="font-bold text-gray-900">Review & Confirm</h1>
                  <p className="text-sm text-gray-600">Verify all details before proceeding</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img src={kaniroLogo} alt="Kaniro" className="h-6 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-4 pb-24">
          {/* KYC Information Review */}
          <Card className="bg-gradient-to-br from-white to-blue-50/30 border-2 border-blue-100 shadow-lg rounded-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm font-bold">KYC Information</CardTitle>
                  <p className="text-xs text-gray-600">Verified identity details</p>
                </div>
                <div className="ml-auto">
                  <div className="bg-green-100 rounded-full p-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500 mb-1">PAN Number</div>
                  <div className="text-sm font-semibold text-gray-900">{dabbaSetup.panNumber}</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">Verified</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="text-xs text-gray-500 mb-1">Aadhaar Status</div>
                  <div className="text-sm font-semibold text-gray-900">OTP Verified</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600">Completed</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                <div className="flex items-center space-x-2">
                  <Shield className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-medium text-green-800">KYC Verification Complete</span>
                </div>
                <p className="text-xs text-green-700 mt-1">All documents verified successfully</p>
              </div>
            </CardContent>
          </Card>

          {/* Dabba Save Plan Summary */}
          <Card className="bg-gradient-to-br from-white to-green-50/30 border-2 border-green-100 shadow-lg rounded-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="text-xl">{dabbaSetup.dabbaIcon}</div>
                <div className="flex-1">
                  <CardTitle className="text-sm font-bold">{dabbaSetup.customDabbaName || dabbaSetup.dabbaName}</CardTitle>
                  <p className="text-xs text-gray-600">Your savings plan summary</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setCurrentScreen('dabba-goal')}
                  className="text-blue-600 hover:bg-blue-50 h-6 w-6 p-0"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center bg-gray-50 rounded-lg p-2">
                  <div className="text-lg font-bold text-green-600">₹{depositDetails.targetAmount.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Target Amount</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-2">
                  <div className="text-lg font-bold text-blue-600">₹{depositDetails.depositAmount}</div>
                  <div className="text-xs text-gray-600 capitalize">{dabbaSetup.frequency} Deposit</div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-2">
                  <div className="text-lg font-bold text-purple-600">{dabbaSetup.selectedScheme?.interestRate || 8.2}%</div>
                  <div className="text-xs text-gray-600">Interest Rate</div>
                </div>
              </div>

              {/* Plan Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span className="text-xs text-gray-600">Deposit Frequency</span>
                  <span className="text-sm font-medium capitalize">{dabbaSetup.frequency}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span className="text-xs text-gray-600">Total Payments</span>
                  <span className="text-sm font-medium">{depositDetails.totalPayments} payments</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <span className="text-xs text-gray-600">Maturity Date</span>
                  <span className="text-sm font-medium">{maturityDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-xs text-gray-600">Selected Bank</span>
                  <span className="text-sm font-medium">{dabbaSetup.selectedScheme?.bankName || 'State Bank of India'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banking Partner Information */}
          <Card className="bg-gradient-to-br from-white to-indigo-50/30 border-2 border-indigo-100 shadow-lg rounded-xl">
            <CardContent className="p-3">
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-lg">🏛️</div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-900">{dabbaSetup.selectedScheme?.bankName || 'State Bank of India'}</h4>
                  <p className="text-xs text-gray-600">{dabbaSetup.selectedScheme?.schemeName || 'SBI Sukanya Samriddhi'}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-indigo-600">{dabbaSetup.selectedScheme?.interestRate || 8.2}%</div>
                  <div className="text-xs text-gray-500">Interest</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-600">Min Deposit: </span>
                  <span className="font-medium">₹{dabbaSetup.selectedScheme?.minDeposit || 250}</span>
                </div>
                <div>
                  <span className="text-gray-600">Safety: </span>
                  <span className="font-medium text-green-600">Govt. Backed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
            <CardContent className="p-3">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-3 w-3 text-gray-600" />
                <h4 className="text-sm font-semibold text-gray-900">Important Terms</h4>
              </div>
              
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-2.5 w-2.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Auto-debit is optional and can be enabled/disabled anytime</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-2.5 w-2.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Partial withdrawals allowed after completion of minimum tenure</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-2.5 w-2.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Interest rates are subject to periodic review by the bank</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-2.5 w-2.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>All deposits are insured up to ₹5 lakh by DICGC</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => setCurrentScreen('dabba-goal')}
            >
              <Edit className="mr-2 h-4 w-4" />
              Modify Plan
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              onClick={() => setCurrentScreen('dabba-receipt')}
            >
              Confirm & Proceed
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2 pt-2">
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    );
  };

  // Dabba Receipt Screen - Digital Receipt with Download Option
  const DabbaReceiptScreen = () => {
    const currentDate = new Date();
    const receiptId = `KFD${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    const depositDetails = (() => {
      const targetAmount = parseInt(dabbaSetup.targetAmount) || 0;
      const duration = dabbaSetup.duration || 30;
      let totalPayments = 0;
      let depositAmount = 0;
      
      switch(dabbaSetup.frequency) {
        case 'daily':
          totalPayments = duration;
          depositAmount = Math.ceil(targetAmount / totalPayments);
          break;
        case 'weekly':
          totalPayments = Math.ceil(duration / 7);
          depositAmount = Math.ceil(targetAmount / totalPayments);
          break;
        case 'monthly':
          totalPayments = Math.ceil(duration / 30);
          depositAmount = Math.ceil(targetAmount / totalPayments);
          break;
        default:
          totalPayments = duration;
          depositAmount = Math.ceil(targetAmount / totalPayments);
      }
      
      return { depositAmount, totalPayments, targetAmount };
    })();

    const maturityDate = new Date();
    maturityDate.setDate(maturityDate.getDate() + dabbaSetup.duration);

    const firstDepositDate = new Date();
    firstDepositDate.setDate(firstDepositDate.getDate() + 1);

    const handleDownloadReceipt = () => {
      // Simulate receipt download
      const receiptData = {
        receiptId,
        customerName: userProfile.name,
        planName: dabbaSetup.customDabbaName || dabbaSetup.dabbaName,
        targetAmount: depositDetails.targetAmount,
        frequency: dabbaSetup.frequency,
        depositAmount: depositDetails.depositAmount,
        bankName: dabbaSetup.selectedScheme?.bankName || 'State Bank of India',
        interestRate: dabbaSetup.selectedScheme?.interestRate || 8.2,
        dateCreated: currentDate.toISOString(),
        maturityDate: maturityDate.toISOString()
      };
      
      // In a real app, this would generate and download a PDF
      console.log('Downloading receipt:', receiptData);
      
      // Show success feedback
      const originalText = document.querySelector('.download-btn')?.textContent;
      const downloadBtn = document.querySelector('.download-btn');
      if (downloadBtn) {
        downloadBtn.textContent = 'Downloaded ✓';
        setTimeout(() => {
          downloadBtn.textContent = originalText;
        }, 2000);
      }
    };

    const handleShareReceipt = () => {
      // Simulate sharing
      if (navigator.share) {
        navigator.share({
          title: 'Dabba Save Receipt',
          text: `Successfully created ${dabbaSetup.customDabbaName || dabbaSetup.dabbaName} savings plan with target of ₹${depositDetails.targetAmount.toLocaleString()}`,
          url: window.location.href
        });
      } else {
        // Fallback - copy to clipboard
        const receiptText = `📄 Dabba Save Receipt\n\nPlan: ${dabbaSetup.customDabbaName || dabbaSetup.dabbaName}\nTarget: ₹${depositDetails.targetAmount.toLocaleString()}\nDeposit: ₹${depositDetails.depositAmount} ${dabbaSetup.frequency}\nBank: ${dabbaSetup.selectedScheme?.bankName || 'State Bank of India'}\nReceipt ID: ${receiptId}`;
        
        navigator.clipboard.writeText(receiptText).then(() => {
          console.log('Receipt details copied to clipboard');
        });
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30">
        {/* Enhanced Header */}
        <div className="glass-strong shadow-sm border-b border-white/20">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentScreen('dabba-review')}
                  className="hover:bg-white/20 rounded-full transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="font-bold text-gray-900">Dabba Save Receipt</h1>
                  <p className="text-sm text-gray-600">Your plan is now active</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img src={kaniroLogo} alt="Kaniro" className="h-6 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-4 pb-24">
          {/* Success Header */}
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-lg rounded-xl">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-lg font-bold mb-1">Dabba Save Created Successfully!</h2>
              <p className="opacity-90 text-xs">Your savings journey has begun</p>
            </CardContent>
          </Card>

          {/* Digital Receipt */}
          <Card className="bg-white shadow-lg rounded-xl border-2 border-gray-100" id="receipt">
            <CardContent className="p-0">
              {/* Receipt Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-t-xl">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold">DIGITAL RECEIPT</h3>
                    <p className="text-xs opacity-90">Kaniro Financial Services</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-90">Receipt ID</div>
                    <div className="font-mono text-xs">{receiptId}</div>
                  </div>
                </div>
                <div className="text-xs opacity-90">
                  Generated on: {currentDate.toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              {/* Receipt Body */}
              <div className="p-3 space-y-3">
                {/* Customer Information */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Customer Information</h4>
                  <div className="bg-gray-50 rounded-lg p-2 space-y-1 text-xs">
                    <div><span className="text-gray-600">Name:</span> <span className="font-medium">{userProfile.name}</span></div>
                    <div><span className="text-gray-600">Phone:</span> <span className="font-medium">{userProfile.phone}</span></div>
                    <div><span className="text-gray-600">KYC Status:</span> <span className="font-medium text-green-600">✓ Verified</span></div>
                  </div>
                </div>

                {/* Plan Details */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <span>{dabbaSetup.dabbaIcon}</span>
                    <span>Plan Details</span>
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-2 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan Name:</span>
                      <span className="font-medium">{dabbaSetup.customDabbaName || dabbaSetup.dabbaName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Amount:</span>
                      <span className="font-medium">₹{depositDetails.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deposit Frequency:</span>
                      <span className="font-medium capitalize">{dabbaSetup.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deposit Amount:</span>
                      <span className="font-medium">₹{depositDetails.depositAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Payments:</span>
                      <span className="font-medium">{depositDetails.totalPayments}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-1.5">
                      <span className="text-gray-600">Maturity Date:</span>
                      <span className="font-medium">{maturityDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>

                {/* Banking Partner */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Banking Partner</h4>
                  <div className="bg-gray-50 rounded-lg p-2 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-medium">{dabbaSetup.selectedScheme?.bankName || 'State Bank of India'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Scheme:</span>
                      <span className="font-medium">{dabbaSetup.selectedScheme?.schemeName || 'SBI Sukanya Samriddhi'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Rate:</span>
                      <span className="font-medium text-green-600">{dabbaSetup.selectedScheme?.interestRate || 8.2}% p.a.</span>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                  <h4 className="text-sm font-semibold text-blue-900 mb-1.5 flex items-center space-x-2">
                    <Calendar className="h-3 w-3" />
                    <span>Next Steps</span>
                  </h4>
                  <div className="space-y-0.5 text-xs text-blue-800">
                    <div>• First deposit: {firstDepositDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                    <div>• Amount: ₹{depositDetails.depositAmount}</div>
                    <div>• Auto-debit: Optional (can be enabled later)</div>
                  </div>
                </div>
              </div>

              {/* Receipt Footer */}
              <div className="bg-gray-50 px-3 py-2 rounded-b-xl border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div>Powered by Kaniro Financial Services</div>
                  <div>RBI Approved • DICGC Insured</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline"
              className="flex-1"
              onClick={handleDownloadReceipt}
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="download-btn">Download</span>
            </Button>
            <Button 
              variant="outline"
              className="flex-1"
              onClick={handleShareReceipt}
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => {
                // Copy receipt ID
                navigator.clipboard.writeText(receiptId);
                console.log('Receipt ID copied:', receiptId);
              }}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy ID
            </Button>
          </div>

          {/* Continue to Dashboard */}
          <Button 
            className="w-full h-10 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold text-sm rounded-xl"
            onClick={() => {
              // Add the new Dabba to active list
              const newDabba = {
                id: activeDabbas.length + 1,
                name: dabbaSetup.customDabbaName || dabbaSetup.dabbaName,
                icon: dabbaSetup.dabbaIcon,
                targetAmount: parseInt(dabbaSetup.targetAmount),
                savedAmount: 0,
                frequency: dabbaSetup.frequency,
                amountPerFrequency: depositDetails.depositAmount,
                progress: 0,
                nextDeposit: `Tomorrow ${dabbaSetup.frequency === 'daily' ? '6:00 AM' : 'Manual reminder'}`,
                autoDebit: false,
                maturityDate: maturityDate.toISOString().split('T')[0],
                status: 'active'
              };
              
              setActiveDabbas(prev => [...prev, newDabba]);
              setCurrentScreen('dashboard');
            }}
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Button>

          {/* Success Footer */}
          <div className="text-center pt-2">
            <p className="text-xs text-gray-600">
              🎉 Congratulations! Your financial journey has begun.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Track your progress anytime from the dashboard
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    );
  };

  // Enhanced KYC Verification Screen
  const DabbaKYCScreen = () => {
    const [panError, setPanError] = useState('');
    const [aadhaarNumber, setAadhaarNumber] = useState('');
    const [aadhaarError, setAadhaarError] = useState('');
    const [isVerifyingPAN, setIsVerifyingPAN] = useState(false);
    const [panVerified, setPanVerified] = useState(false);
    const [kycStep, setKycStep] = useState(1); // 1: PAN, 2: Aadhaar, 3: OTP
    const [otpTimer, setOtpTimer] = useState(0);
    
    // Completely isolated local PAN state - no external interference
    const [localPanValue, setLocalPanValue] = useState(dabbaSetup.panNumber || '');
    const panInputRef = useRef<HTMLInputElement>(null);

    // PAN validation function
    const validatePAN = (pan: string) => {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      return panRegex.test(pan.toUpperCase());
    };

    // Aadhaar validation function  
    const validateAadhaar = (aadhaar: string) => {
      const aadhaarRegex = /^\d{12}$/;
      return aadhaarRegex.test(aadhaar.replace(/\s/g, ''));
    };

    // Format Aadhaar number with spaces
    const formatAadhaar = (value: string) => {
      const cleaned = value.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
      if (match) {
        return [match[1], match[2], match[3]].filter(Boolean).join(' ');
      }
      return cleaned;
    };

    // Ultra-simplified PAN input handler - only updates local state
    const handlePANInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.toUpperCase();
      setLocalPanValue(value);
      // NO other state updates during typing!
    };

    // Only update global state and validation when user stops typing
    const handlePANBlur = () => {
      const upperValue = localPanValue.toUpperCase();
      
      // Update global state only on blur
      setDabbaSetup(prev => ({ ...prev, panNumber: upperValue }));
      
      // Reset verification status
      setPanVerified(false);
      
      // Validate
      if (upperValue.length > 0) {
        if (validatePAN(upperValue)) {
          setPanError('');
        } else if (upperValue.length >= 10) {
          setPanError('Invalid PAN format. Use format: ABCDE1234F');
        } else {
          setPanError('');
        }
      } else {
        setPanError('');
      }
    };

    // Initialize local state on mount
    useEffect(() => {
      if (dabbaSetup.panNumber && !localPanValue) {
        setLocalPanValue(dabbaSetup.panNumber);
      }
    }, []);

    // Handle manual PAN verification
    const handlePANVerify = () => {
      const currentValue = localPanValue.toUpperCase();
      console.log('PAN Verify clicked:', currentValue);
      
      if (validatePAN(currentValue)) {
        console.log('PAN is valid, starting verification...');
        setIsVerifyingPAN(true);
        setPanError('');
        
        // Update global state
        setDabbaSetup(prev => ({ ...prev, panNumber: currentValue }));
        
        setTimeout(() => {
          console.log('PAN verification complete!');
          setIsVerifyingPAN(false);
          setPanVerified(true);
        }, 1500);
      } else {
        console.log('PAN validation failed');
        setPanError('Invalid PAN format');
      }
    };

    // Handle Aadhaar input change - Memoized to prevent focus loss
    const handleAadhaarChange = useCallback((value: string) => {
      const formatted = formatAadhaar(value);
      setAadhaarNumber(formatted);
      
      // Use setTimeout to batch validation and prevent focus loss
      setTimeout(() => {
        if (formatted.length > 0) {
          if (validateAadhaar(formatted)) {
            setAadhaarError('');
          } else {
            setAadhaarError('Invalid Aadhaar number. Must be 12 digits.');
          }
        } else {
          setAadhaarError('');
        }
      }, 0);
    }, []);

    // Send OTP function
    const sendOTP = () => {
      if (validateAadhaar(aadhaarNumber)) {
        setDabbaSetup(prev => ({ ...prev, otpSent: true }));
        setKycStep(3);
        setOtpTimer(60);
        
        // Start countdown timer
        const timer = setInterval(() => {
          setOtpTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    };

    // Complete KYC verification
    const completeKYC = () => {
      const currentOtp = dabbaSetup.aadhaarOtp || '';
      const isOtpComplete = currentOtp.length === 6;
      
      console.log('KYC Completion attempt:', {
        otpComplete: isOtpComplete,
        otpLength: currentOtp.length,
        otp: currentOtp,
        panNumber: dabbaSetup.panNumber
      });
      
      if (isOtpComplete) {
        // Mark both PAN and KYC as verified when OTP is complete
        setPanVerified(true);
        setDabbaSetup(prev => ({ ...prev, kycComplete: true }));
        setCurrentScreen('dabba-review');
        console.log('KYC completed successfully! Moving to review screen.');
      } else {
        console.log('KYC completion failed: OTP not complete');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30">
        {/* Enhanced Header */}
        <div className="glass-strong shadow-sm border-b border-white/20">
          <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentScreen('dabba-schemes')}
                  className="hover:bg-white/20 rounded-full transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="font-bold text-gray-900">KYC Verification</h1>
                  <p className="text-sm text-gray-600">Secure identity verification</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img src={kaniroLogo} alt="Kaniro" className="h-6 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-4 pb-24">

          {/* KYC Verification Form */}
          <Card className="transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">Identity Verification</h4>
                  <p className="text-sm text-gray-600">Complete KYC to proceed</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* PAN Verification */}
                <div>
                  <Label htmlFor="pan" className="flex items-center space-x-2 mb-2">
                    <span>PAN Number</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Input
                          ref={panInputRef}
                          id="pan"
                          placeholder="ABCDE1234F"
                          value={localPanValue}
                          onChange={handlePANInput}
                          onBlur={handlePANBlur}
                          maxLength={10}
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="characters"
                          spellCheck={false}
                          inputMode="text"
                          className={`uppercase transition-all duration-200 ${
                            panError 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                              : panVerified 
                              ? 'border-green-300 focus:border-green-500 focus:ring-green-200 bg-green-50' 
                              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                          }`}
                          disabled={panVerified}
                        />
                        
                        {/* Success Icon inside input */}
                        {panVerified && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                      </div>
                      
                      {/* Verify Button */}
                      {!panVerified && !isVerifyingPAN && localPanValue && validatePAN(localPanValue) && (
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Verify button clicked!'); // Debug log
                            handlePANVerify();
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 font-semibold"
                        >
                          Verify
                        </Button>
                      )}
                      
                      {/* Loading State */}
                      {isVerifyingPAN && (
                        <div className="flex items-center space-x-2 text-blue-600 px-4">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                          <span className="text-sm">Verifying...</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Verification Status */}
                    {panVerified && (
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50 rounded-lg p-2">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">PAN Verified Successfully</span>
                      </div>
                    )}
                  </div>
                  
                  {panError && (
                    <p className="text-red-600 text-xs mt-2 flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{panError}</span>
                    </p>
                  )}
                  
                  {/* Simplified Status */}
                  <div className="text-xs text-green-600 mt-1 bg-green-50 rounded p-2">
                    ✅ PAN: "{localPanValue}" | OTP Status: {(dabbaSetup.aadhaarOtp || '').length}/6 digits
                    {dabbaSetup.aadhaarOtp && dabbaSetup.aadhaarOtp.length === 6 && (
                      <div className="font-semibold text-green-700 mt-1">🎉 Ready to Complete KYC!</div>
                    )}
                  </div>
                </div>

                {/* Aadhaar Number */}
                <div>
                  <Label htmlFor="aadhaar" className="flex items-center space-x-2 mb-2">
                    <span>Aadhaar Number</span>
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="aadhaar"
                      placeholder="1234 5678 9012"
                      value={aadhaarNumber}
                      onChange={(e) => handleAadhaarChange(e.target.value)}
                      maxLength={14}
                      autoComplete="off"
                      className={`transition-all duration-200 ${
                        aadhaarError 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : validateAadhaar(aadhaarNumber) && dabbaSetup.otpSent
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-200 bg-green-50' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                      }`}
                      disabled={dabbaSetup.otpSent}
                    />
                    
                    {dabbaSetup.otpSent && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                  </div>
                  
                  {aadhaarError && (
                    <p className="text-red-600 text-xs mt-2 flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{aadhaarError}</span>
                    </p>
                  )}

                  {validateAadhaar(aadhaarNumber) && !dabbaSetup.otpSent && (
                    <Button 
                      className="w-full mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                      onClick={sendOTP}
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      Send OTP to Registered Mobile
                    </Button>
                  )}
                </div>

                {/* OTP Input */}
                {dabbaSetup.otpSent && (
                  <div>
                    <Label className="mb-2 block">Enter OTP</Label>
                    <div className="flex justify-center space-x-2 mb-4">
                      {[0, 1, 2, 3, 4, 5].map((index) => {
                      const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                        const newValue = e.target.value;
                        if (/^\d*$/.test(newValue)) {
                          const currentOtp = dabbaSetup.aadhaarOtp || '';
                          let newOtp = currentOtp.padEnd(6, '');
                          newOtp = newOtp.substring(0, index) + newValue + newOtp.substring(index + 1);
                          const finalOtp = newOtp.replace(/\s+$/, '');
                          
                          // Update OTP immediately to maintain focus
                          setDabbaSetup(prev => ({ ...prev, aadhaarOtp: finalOtp }));
                          
                          // Use requestAnimationFrame to ensure DOM is updated before focusing
                          requestAnimationFrame(() => {
                            // Auto-verify PAN when OTP is complete (6 digits)
                            if (finalOtp.length === 6) {
                              setPanVerified(true);
                              console.log('OTP Complete - Auto-verifying PAN and enabling Complete KYC');
                            }
                            
                            // Auto-focus next input
                            if (newValue && index < 5) {
                              const nextInput = document.querySelector(`input[data-otp-index="${index + 1}"]`) as HTMLInputElement;
                              if (nextInput) {
                                nextInput.focus();
                              }
                            }
                          });
                        }
                      };

                      const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Backspace') {
                          const currentOtp = dabbaSetup.aadhaarOtp || '';
                          const currentValue = currentOtp.charAt(index) || '';
                          
                          if (!currentValue && index > 0) {
                            // If current field is empty, move to previous field and clear it
                            const prevInput = document.querySelector(`input[data-otp-index="${index - 1}"]`) as HTMLInputElement;
                            if (prevInput) {
                              prevInput.focus();
                            }
                            
                            // Clear previous field
                            let newOtp = currentOtp.padEnd(6, '');
                            newOtp = newOtp.substring(0, index - 1) + '' + newOtp.substring(index);
                            setDabbaSetup(prev => ({ ...prev, aadhaarOtp: newOtp.replace(/\s+$/, '') }));
                          } else {
                            // Clear current field
                            let newOtp = currentOtp.padEnd(6, '');
                            newOtp = newOtp.substring(0, index) + '' + newOtp.substring(index + 1);
                            setDabbaSetup(prev => ({ ...prev, aadhaarOtp: newOtp.replace(/\s+$/, '') }));
                          }
                        }
                      };

                      return (
                        <input
                          key={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={(dabbaSetup.aadhaarOtp || '').charAt(index) || ''}
                          onChange={handleOtpChange}
                          onKeyDown={handleOtpKeyDown}
                          data-otp-index={index}
                          className="w-10 h-10 text-center border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200 font-medium"
                          autoComplete="off"
                        />
                      );
                    })}
                    </div>

                    {/* KYC Progress Info */}
                    <div className="text-center mb-2">
                      <p className="text-xs text-gray-500">
                        OTP Progress: {(dabbaSetup.aadhaarOtp || '').length}/6 digits
                      </p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-center space-x-4 text-xs">
                          <div className={`flex items-center space-x-1 ${(dabbaSetup.aadhaarOtp && dabbaSetup.aadhaarOtp.length === 6) ? 'text-green-600' : 'text-gray-500'}`}>
                            {(dabbaSetup.aadhaarOtp && dabbaSetup.aadhaarOtp.length === 6) ? <CheckCircle className="h-3 w-3" /> : <span className="w-3 h-3 border border-gray-300 rounded-full"></span>}
                            <span>PAN Verified</span>
                          </div>
                          <div className={`flex items-center space-x-1 ${(dabbaSetup.aadhaarOtp && dabbaSetup.aadhaarOtp.length === 6) ? 'text-green-600' : 'text-gray-500'}`}>
                            {(dabbaSetup.aadhaarOtp && dabbaSetup.aadhaarOtp.length === 6) ? <CheckCircle className="h-3 w-3" /> : <span className="w-3 h-3 border border-gray-300 rounded-full"></span>}
                            <span>OTP Entered</span>
                          </div>
                        </div>
                        {dabbaSetup.aadhaarOtp && dabbaSetup.aadhaarOtp.length === 6 && (
                          <p className="text-xs text-green-600 font-medium">✅ Ready to Complete KYC</p>
                        )}
                      </div>
                    </div>

                    {/* Resend OTP */}
                    <div className="text-center mb-4">
                      {otpTimer > 0 ? (
                        <p className="text-sm text-gray-600">
                          Resend OTP in <span className="font-bold text-blue-600">{otpTimer}s</span>
                        </p>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={sendOTP}
                          className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        >
                          Resend OTP
                        </Button>
                      )}
                    </div>

                    {/* Complete KYC Button */}
                    <Button 
                      className={`w-full transition-all duration-300 ${
                        (dabbaSetup.aadhaarOtp && dabbaSetup.aadhaarOtp.length === 6)
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 cursor-pointer'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!dabbaSetup.aadhaarOtp || dabbaSetup.aadhaarOtp.length !== 6}
                      onClick={completeKYC}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Complete KYC Verification
                      {dabbaSetup.aadhaarOtp && dabbaSetup.aadhaarOtp.length === 6 && (
                        <span className="ml-2 text-green-200">✓</span>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Information */}
          <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900">Your Data is Secure</h4>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>256-bit SSL encryption for all data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>UIDAI compliant verification process</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Documents stored in secure vaults</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>RBI approved KYC standards</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2 pt-2">
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className="w-3 h-1 bg-green-500 rounded-full"></div>
            <div className={`w-3 h-1 rounded-full ${kycStep >= 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    );
  };

  // Dabba Confirm Screen
  const DabbaConfirmScreen = () => {
    const dailyAmount = Math.ceil(parseInt(dabbaSetup.targetAmount) / (dabbaSetup.duration * 30));

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dabba-kyc')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">Confirm & Start</h1>
                <p className="text-sm text-gray-600">Review and activate your Dabba</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <Card>
            <CardHeader>
              <div className="text-center">
                <div className="text-3xl mb-2">{dabbaSetup.dabbaIcon}</div>
                <CardTitle>{dabbaSetup.customDabbaName || dabbaSetup.dabbaName}</CardTitle>
                <CardDescription>{dabbaSetup.selectedScheme?.name} Plan</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-700">₹{dailyAmount}</div>
                  <div className="text-sm text-green-600">Daily Micro Deposit</div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div>
                    <div className="font-bold">₹{dabbaSetup.targetAmount}</div>
                    <div className="text-gray-600">Target</div>
                  </div>
                  <div>
                    <div className="font-bold">{dabbaSetup.duration}M</div>
                    <div className="text-gray-600">Duration</div>
                  </div>
                  <div>
                    <div className="font-bold">{dabbaSetup.selectedScheme?.interestRate}%</div>
                    <div className="text-gray-600">Returns</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-bold mb-3">First Deposit</h3>
              <div>
                <Label htmlFor="firstDeposit">Amount (₹)</Label>
                <Input
                  id="firstDeposit"
                  type="number"
                  placeholder={dailyAmount.toString()}
                  value={dabbaSetup.firstDepositAmount}
                  onChange={(e) => setDabbaSetup(prev => ({ ...prev, firstDepositAmount: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <Button 
            className="w-full"
            onClick={() => setCurrentScreen('dabba-success')}
          >
            Start My Dabba
            <Zap className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Dabba Success Screen
  const DabbaSuccessScreen = () => {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto p-4 flex flex-col justify-center min-h-screen">
          <Card>
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-green-700 mb-2">Dabba Created Successfully!</h1>
                <p className="text-gray-600">
                  Your <strong>{dabbaSetup.customDabbaName || dabbaSetup.dabbaName}</strong> is now active
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-green-700 mb-2">Next deposit in 24 hours</div>
                <div className="text-2xl font-bold text-green-800">₹{Math.ceil(parseInt(dabbaSetup.targetAmount) / (dabbaSetup.duration * 30))}</div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full"
                  onClick={() => setCurrentScreen('dabba-dashboard')}
                >
                  View My Dabba
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => setCurrentScreen('dashboard')}
                >
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Dabba Dashboard Screen
  const DabbaDashboardScreen = () => {
    const dailyAmount = Math.ceil(parseInt(dabbaSetup.targetAmount) / (dabbaSetup.duration * 30));
    const currentSaved = dailyAmount * 5; // Simulate some progress
    const progress = (currentSaved / parseInt(dabbaSetup.targetAmount)) * 100;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">{dabbaSetup.customDabbaName || dabbaSetup.dabbaName}</h1>
                <p className="text-sm text-gray-600">Your savings progress</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">{dabbaSetup.dabbaIcon}</div>
                <div className="text-2xl font-bold">₹{currentSaved.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Saved</div>
              </div>

              <div className="bg-gray-200 rounded-full h-2 mb-4">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div>
                  <div className="font-bold">₹{dabbaSetup.targetAmount}</div>
                  <div className="text-gray-600">Target</div>
                </div>
                <div>
                  <div className="font-bold">{Math.round(progress)}%</div>
                  <div className="text-gray-600">Progress</div>
                </div>
                <div>
                  <div className="font-bold">₹{dailyAmount}</div>
                  <div className="text-gray-600">Daily</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Money
            </Button>
            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Plus className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Daily deposit</div>
                      <div className="text-xs text-gray-500">Dec {4-i}, 2024</div>
                    </div>
                    <div className="font-bold text-green-600">+₹{dailyAmount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Pay Overdue Table Screen
  const PayOverdueTableScreen = () => {
    const [selectedLoans, setSelectedLoans] = useState<number[]>([]);

    const calculatePaymentAmount = () => {
      if (selectedLoans.length === 0) return 0;
      const selectedLoanData = loanAccounts.filter(loan => selectedLoans.includes(loan.id));
      return selectedLoanData.reduce((sum, loan) => sum + loan.overdueAmount + loan.penaltyCharges, 0);
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">Pay Overdue Loans</h1>
                <p className="text-sm text-gray-600">Select loans to pay</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-4 pb-24">
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-red-700">
                  ₹{loanAccounts.reduce((sum, loan) => sum + loan.overdueAmount + loan.penaltyCharges, 0).toLocaleString()}
                </div>
                <div className="text-xs text-red-600">Total Overdue</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-3 text-center">
                <div className="text-lg font-bold text-orange-700">{loanAccounts.length}</div>
                <div className="text-xs text-orange-600">Overdue Loans</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            {loanAccounts.map((loan) => {
              const isSelected = selectedLoans.includes(loan.id);
              const totalOverdue = loan.overdueAmount + loan.penaltyCharges;
              
              return (
                <Card 
                  key={loan.id} 
                  className={`cursor-pointer transition-all ${
                    isSelected ? 'border-green-500 bg-green-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedLoans(prev => prev.filter(id => id !== loan.id));
                    } else {
                      setSelectedLoans(prev => [...prev, loan.id]);
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-1 ${
                        isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold">{loan.loanType}</h4>
                            <p className="text-sm text-gray-600">{loan.bankName}</p>
                            <p className="text-xs text-gray-500">{loan.loanNumber}</p>
                          </div>
                          <div className="text-right">
                            <div className="bg-red-100 rounded p-1">
                              <div className="text-xs text-red-700 font-medium">OVERDUE</div>
                              <div className="font-bold text-red-800">₹{totalOverdue.toLocaleString()}</div>
                              <div className="text-xs text-red-600">{loan.daysOverdue} days</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-600">Outstanding: </span>
                            <span className="font-medium">₹{loan.outstandingAmount.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">EMI: </span>
                            <span className="font-medium">₹{loan.emiAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {selectedLoans.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <h3 className="font-bold">Payment Summary</h3>
                  <p className="text-sm text-gray-600">{selectedLoans.length} loan(s) selected</p>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4 mb-4 text-center">
                  <div className="text-sm text-red-600 mb-1">Total Amount</div>
                  <div className="text-2xl font-bold text-red-800">₹{calculatePaymentAmount().toLocaleString()}</div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => setCurrentScreen('pay-micro-installment')}
                  >
                    <Repeat className="mr-2 h-4 w-4" />
                    Micro Installments (Recommended)
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setCurrentScreen('pay-bank-selection')}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay Full Amount
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      </div>
    );
  };

  const screens = {
    login: LoginScreen,
    register: RegisterScreen,
    dashboard: DashboardScreen,
    'dabba-name': DabbaNameScreen,
    'pay-overdue-table': PayOverdueTableScreen,
    
    // Simple placeholder screens
    'pay-micro-installment': () => (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto pt-8 text-center">
          <h1>Micro Installments</h1>
          <Button onClick={() => setCurrentScreen('pay-bank-selection')}>Select Bank</Button>
        </div>
      </div>
    ),
    'pay-bank-selection': () => (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto pt-8 text-center">
          <h1>Select Bank</h1>
          <Button onClick={() => setCurrentScreen('pay-confirmation')}>Pay Now</Button>
        </div>
      </div>
    ),
    'pay-confirmation': () => (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto pt-8 text-center">
          <h1>Payment Successful! ✅</h1>
          <Button onClick={() => setCurrentScreen('dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    ),
    'profile': () => (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto pt-8 text-center">
          <h1>Profile Settings</h1>
          <Button onClick={() => setCurrentScreen('dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    ),
    'notifications': () => (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto pt-8 text-center">
          <h1>Notifications</h1>
          <Button onClick={() => setCurrentScreen('dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    ),
    'dabba-goal': DabbaGoalScreen,
    'dabba-duration': DabbaDurationScreen,
    'dabba-summary': DabbaSummaryScreen,
    'dabba-schemes': DabbaSchemesScreen,
    'dabba-compare': DabbaCompareScreen,
    'dabba-kyc': DabbaKYCScreen,
    'dabba-review': DabbaReviewScreen,
    'dabba-receipt': DabbaReceiptScreen,
    'dabba-confirm': DabbaConfirmScreen,
    'dabba-success': DabbaSuccessScreen,
    'dabba-dashboard': DabbaDashboardScreen
  };

  const CurrentScreen = screens[currentScreen] || LoginScreen;

  return (
    <>
      {/* PWA Manager - handles all PWA functionality */}
      <PWAManager />
      
      <div className="w-full max-w-md mx-auto bg-white min-h-screen relative main-container">
        {/* PWA Status Indicator */}
        <PWAStatus />
        
        <CurrentScreen />
        
        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
      </div>
    </>
  );
}

export default App;