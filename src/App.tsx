import React, { useState, useEffect, useMemo } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Separator } from './components/ui/separator';
import { ArrowRight, Coins, CreditCard, PiggyBank, Shield, TrendingUp, Users, CheckCircle, Clock, Zap, ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, Target, Calendar, DollarSign, Building2, Plus, Minus, Star, Smartphone, Wallet, Gift, GraduationCap, Home, Car, Plane, Bell, BellRing, Flame, Award, IndianRupee, Download, ArrowUpRight, ArrowDownLeft, Repeat, QrCode, Calculator, Fingerprint, Scan, MoreHorizontal, FileText, Menu, Search, Settings, HelpCircle, CreditCard as PayIcon, PlusCircle, Banknote, Compass } from 'lucide-react';
// import { Dashboard } from './Dashboard';
import kaniroLogo from 'figma:asset/59a4e87f6f8559c1e33304344c14ed5d1faafe70.png';
import promoImage from 'figma:asset/6c9f7a43bceeec40c2dac840bb2776654b079e3c.png';

type Screen = 'splash' | 'onboarding' | 'login' | 'register' | 'dashboard' | 'save' | 'pay' | 'savepay' | 'profile' | 'notifications' | 'dabba-name' | 'dabba-goal' | 'dabba-duration' | 'dabba-summary' | 'dabba-schemes' | 'dabba-compare' | 'dabba-kyc' | 'dabba-confirm' | 'dabba-success' | 'dabba-dashboard' | 'add-bank-search' | 'add-bank-details' | 'add-bank-verify' | 'add-bank-success' | 'pay-dashboard' | 'pay-banks' | 'pay-add-loan' | 'pay-micro-setup' | 'pay-micro-success' | 'pay-success' | 'pay-emandate' | 'pay-activate' | 'pay-calculator' | 'pay-overdue-table' | 'pay-micro-installment' | 'pay-bank-selection' | 'pay-confirmation';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'face' | 'mpin'>('password');
  const [mpin, setMpin] = useState('');
  const [faceLoginStatus, setFaceLoginStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [isQuickActionsExpanded, setIsQuickActionsExpanded] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  // Removed complex scroll detection variables that were causing scroll interference
  
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

  // Promotional carousel data
  const promoCards = useMemo(() => [
    {
      id: 1,
      title: "Special Offer",
      subtitle: "Get ₹100 Bonus",
      description: "Open your first DABBA Save and get instant ₹100 bonus on your first deposit! Start your financial journey with extra rewards and unlock exclusive benefits from day one.",
      subItems: ["₹100 instant bonus", "First deposit reward", "No minimum balance"],
      image: promoImage,
      badge: "Limited Time"
    },
    {
      id: 2,
      title: "Zero Fees",
      subtitle: "Save More Money",
      description: "No hidden charges or maintenance fees. 100% of your money grows with you. Complete transparency in all transactions with bank-grade security and real-time updates.",
      subItems: ["0% maintenance fees", "No hidden charges", "100% transparency"],
      image: promoImage,
      badge: "Always Free"
    },
    {
      id: 3,
      title: "Refer & Earn",
      subtitle: "₹50 Per Friend",
      description: "Share the wealth! Earn ₹50 for each friend who joins and starts saving. Build your network and earn together with unlimited referral rewards and bonus incentives.",
      subItems: ["₹50 per referral", "Instant rewards", "Unlimited earning"],
      image: promoImage,
      badge: "Unlimited"
    },
    {
      id: 4,
      title: "Higher Returns",
      subtitle: "Up to 8% Interest",
      description: "Competitive interest rates that beat traditional savings accounts by far. Grow your wealth faster with premium returns, compound interest benefits, and flexible withdrawal options.",
      subItems: ["Up to 8% returns", "Better than banks", "Compound interest"],
      image: promoImage,
      badge: "Guaranteed"
    }
  ], []);

  // AUTO-SCROLL COMPLETELY DISABLED - Fix for scroll jumping bug
  // The auto-scroll carousels were causing scroll position resets
  // Users can manually navigate carousels using the dots
  
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
          <div className="text-center pt-8 sm:pt-12 mb-12">
            <img src={kaniroLogo} alt="Kaniro Financial Services" className="h-10 sm:h-12 mx-auto filter brightness-0 invert" />
            <div className="mt-3 text-white/90">
              <h1 className="text-lg sm:text-xl font-semibold">Welcome Back</h1>
              <p className="text-sm opacity-80">Secure access to your financial future</p>
            </div>
          </div>

          {/* Main Login Card - Overlapping with Gradient */}
          <div className="flex-1 flex items-start justify-center -mt-8">
            <div className="max-w-sm w-full">
              <Card className="bg-white shadow-2xl border-0 rounded-3xl relative overflow-hidden">
                {/* Card subtle gradient overlay */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600"></div>
                
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center space-y-6 sm:space-y-8">
                    {/* Biometric Login Section - Inside White Card */}
                    <div className="space-y-4 sm:space-y-6">
                      <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28">
                        {/* Glow effect - Behind the button */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 opacity-30 animate-pulse pointer-events-none"></div>
                        <div 
                          className="biometric-button relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-blue-500 to-emerald-600 flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-3xl active:scale-95"
                          onClick={handleFaceLogin}
                          style={{ 
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            WebkitTouchCallout: 'none',
                            WebkitTapHighlightColor: 'transparent'
                          }}
                        >
                          <Fingerprint className="h-12 w-12 sm:h-14 sm:w-14 text-white drop-shadow-lg transition-transform duration-200" />
                        </div>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Biometric Login</h2>
                        <p className="text-sm sm:text-base text-gray-600">Use your fingerprint or face to login securely</p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">OR</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>

                    {/* MPIN Input */}
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                          <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Enter MPIN</h3>
                      </div>

                      {/* MPIN Input Boxes */}
                      <div className="flex justify-center space-x-3 sm:space-x-4">
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
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 text-center text-lg sm:text-xl font-semibold bg-white border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all duration-200 hover:border-gray-400"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Social Login */}
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-gray-500 text-xs sm:text-sm">Or continue with</p>
                      
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <Button 
                          variant="outline" 
                          className="h-10 sm:h-12 bg-white border-gray-200 hover:bg-gray-50 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 font-sans transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-blue-300"
                          onClick={() => setCurrentScreen('dashboard')}
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          <span className="text-gray-700 text-sm sm:text-base">Google</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="h-10 sm:h-12 bg-slate-900 text-white border-slate-900 hover:bg-slate-800 rounded-lg flex items-center justify-center space-x-1 sm:space-x-2 font-sans transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                          onClick={() => setCurrentScreen('dashboard')}
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                          </svg>
                          <span className="text-sm sm:text-base">Apple</span>
                        </Button>
                      </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                      <p className="text-gray-600 text-sm font-sans">
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
                    <div className="flex items-center justify-center space-x-6 sm:space-x-8 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 transition-transform hover:scale-105 shadow-md">
                          <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <p className="text-xs text-gray-600 font-medium font-sans">Bank Grade</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 transition-transform hover:scale-105 shadow-md">
                          <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                        <p className="text-xs text-gray-600 font-medium font-sans">256-bit SSL</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 transition-transform hover:scale-105 shadow-md">
                          <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
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
    <div className="w-full h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header Only */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-3 pt-safe-or-4">
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

      {/* Scrollable Content - Everything moves together */}
      <div className="flex-1 overflow-y-auto dashboard-scroll-container">
        {/* Service Cards Carousel - Now Scrollable */}
        <div className="bg-white border-b">
          <div className="px-4 py-4">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-200/30 via-blue-200/30 to-purple-200/30 p-0.5 shadow-lg">
              <div className="relative overflow-hidden rounded-2xl bg-white">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentServiceIndex * 100}%)` }}
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
                              <p className="text-xs opacity-80">Save & Pay</p>
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
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-gray-900">Dabba Save</h4>
                      <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Start daily micro-deposits from just ₹10</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>2.3K+ users</span>
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
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-gray-900">Dabba Pay</h4>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">Available</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Flexible loan repayments starting from ₹100</p>
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
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-bold text-gray-900">Dabba Save & Pay</h4>
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">Available</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Automated savings for quarterly/yearly loan payments</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Zap className="h-3 w-3" />
                        <span>Smart auto-debit</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Bill scheduling</span>
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
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Special Offers</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentPromoIndex * 100}%)` }}
              >
                {promoCards.map((promo, index) => (
                  <div key={promo.id} className="w-full flex-shrink-0">
                    <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-4 text-white overflow-hidden m-4">
                      <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Badge className="bg-white/20 text-white border-white/30 mb-2">{promo.badge}</Badge>
                            <h4 className="font-bold text-lg mb-1">{promo.title}</h4>
                            <p className="text-sm opacity-90">{promo.subtitle}</p>
                          </div>
                          <div className="w-12 h-12 bg-white/20 rounded-full p-2">
                            <Gift className="w-full h-full" />
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-sm opacity-90 line-clamp-2">{promo.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {promo.subItems.slice(0, 2).map((item, idx) => (
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

        {/* Quick Actions */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {[
                { 
                  icon: PiggyBank, 
                  label: 'Deposit', 
                  color: 'text-green-600',
                  bgColor: 'bg-green-50',
                  borderColor: 'border-green-100',
                  hoverColor: 'hover:bg-green-100',
                  screen: 'dabba-name'
                },
                { 
                  icon: CreditCard, 
                  label: 'Payments', 
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-50',
                  borderColor: 'border-blue-100',
                  hoverColor: 'hover:bg-blue-100',
                  screen: 'pay-overdue-table'
                },
                { 
                  icon: Gift, 
                  label: 'Offers', 
                  color: 'text-purple-600',
                  bgColor: 'bg-purple-50',
                  borderColor: 'border-purple-100',
                  hoverColor: 'hover:bg-purple-100',
                  screen: 'dashboard'
                },
                { 
                  icon: FileText, 
                  label: 'Statement', 
                  color: 'text-orange-600',
                  bgColor: 'bg-orange-50',
                  borderColor: 'border-orange-100',
                  hoverColor: 'hover:bg-orange-100',
                  screen: 'dashboard'
                }
              ].map((action, index) => (
                <div 
                  key={index} 
                  className={`${action.bgColor} ${action.borderColor} hover:shadow-lg ${action.hoverColor} transition-all duration-200 cursor-pointer transform hover:scale-105 active:scale-95 rounded-lg border p-3 text-center`}
                  onClick={() => setCurrentScreen(action.screen)}
                >
                  <div className={`w-10 h-10 rounded-full ${action.bgColor} flex items-center justify-center mx-auto mb-2 shadow-sm`}>
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{action.label}</span>
                </div>
              ))}
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
      
      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 bottom-nav-safe">
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
    </div>
  );

  // Dabba Name Selection Screen
  const DabbaNameScreen = () => {
    const predefinedNames = [
      { name: 'Emergency Fund', icon: '🚨', description: 'For unexpected expenses' },
      { name: 'Dream Vacation', icon: '✈️', description: 'Holiday savings' },
      { name: 'Wedding Fund', icon: '💍', description: 'Big day preparations' },
      { name: 'New Home', icon: '🏠', description: 'House down payment' },
      { name: 'Car Purchase', icon: '🚗', description: 'Your dream car' },
      { name: 'Education', icon: '🎓', description: 'Learning investment' },
      { name: 'Retirement', icon: '👴', description: 'Golden years planning' },
      { name: 'Kids Future', icon: '👶', description: 'Children\'s needs' }
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">Choose Dabba Name</h1>
                <p className="text-sm text-gray-600">What are you saving for?</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <div className="text-center">
            <PiggyBank className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Name Your Dabba</h2>
            <p className="text-gray-600">Choose a meaningful name for your savings goal</p>
          </div>

          <div className="space-y-3">
            {predefinedNames.map((item, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  dabbaSetup.dabbaName === item.name ? 'border-green-500 bg-green-50' : ''
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
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    {dabbaSetup.dabbaName === item.name && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className={`cursor-pointer transition-all hover:shadow-md ${
              dabbaSetup.customDabbaName ? 'border-green-500 bg-green-50' : ''
            }`}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">✏️</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Custom Name</h4>
                      <p className="text-sm text-gray-600">Create your own unique name</p>
                    </div>
                  </div>
                  <Input
                    placeholder="Enter your custom dabba name"
                    value={dabbaSetup.customDabbaName}
                    onChange={(e) => {
                      setDabbaSetup(prev => ({
                        ...prev,
                        customDabbaName: e.target.value,
                        dabbaName: e.target.value ? 'custom' : '',
                        dabbaIcon: '💰'
                      }));
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Button 
            className="w-full"
            disabled={!dabbaSetup.dabbaName && !dabbaSetup.customDabbaName}
            onClick={() => setCurrentScreen('dabba-goal')}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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

        <div className="max-w-md mx-auto p-4 space-y-4">
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
    'dabba-goal': () => (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto pt-8 text-center">
          <h1>Dabba Goal Screen</h1>
          <Button onClick={() => setCurrentScreen('dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    )
  };

  const CurrentScreen = screens[currentScreen] || LoginScreen;

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen relative">
      <CurrentScreen />
    </div>
  );
}

export default App;