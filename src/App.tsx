import React, { useState, useEffect, useMemo } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Separator } from './components/ui/separator';
import { ArrowRight, Coins, CreditCard, PiggyBank, Shield, TrendingUp, Users, CheckCircle, Clock, Zap, ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, Target, Calendar, DollarSign, Building2, Plus, Minus, Star, Smartphone, Wallet, Gift, GraduationCap, Home, Car, Plane, Bell, BellRing, Flame, Award, IndianRupee, Download, ArrowUpRight, ArrowDownLeft, Repeat, QrCode, Calculator, Fingerprint, Scan, MoreHorizontal, FileText, Menu, Search, Settings, HelpCircle, CreditCard as PayIcon, PlusCircle, Banknote, Compass } from 'lucide-react';
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

  // Auto-scroll promotional carousel
  useEffect(() => {
    if (currentScreen === 'dashboard') {
      const timer = setInterval(() => {
        setCurrentPromoIndex((prevIndex) => 
          prevIndex === 3 ? 0 : prevIndex + 1
        );
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [currentScreen]);

  // Auto-scroll service cards carousel
  useEffect(() => {
    if (currentScreen === 'dashboard') {
      const timer = setInterval(() => {
        setCurrentServiceIndex((prevIndex) => 
          prevIndex === 2 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentScreen]);

  const LoginScreen = () => {
    const handleFaceLogin = async () => {
      setFaceLoginStatus('scanning');
      // Simulate face recognition process
      setTimeout(() => {
        setFaceLoginStatus('success');
        setTimeout(() => {
          setCurrentScreen('dashboard');
        }, 1000);
      }, 2500);
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
        {/* Subtle Background Animations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/20 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-green-200/20 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
          <div className="absolute top-1/2 left-1/6 w-20 h-20 bg-purple-200/15 rounded-full animate-float" style={{ animationDelay: '4s', animationDuration: '7s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-indigo-200/15 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '9s' }}></div>
        </div>
        
        <div className="relative z-10 min-h-screen flex flex-col justify-center p-6">
          <div className="max-w-sm mx-auto w-full">
            {/* Logo Only */}
            <div className="text-center mb-12">
              <img src={kaniroLogo} alt="Kaniro Financial Services" className="h-10 mx-auto" />
            </div>

            {/* Main Login Card */}
            <Card className="bg-white shadow-xl border-0 rounded-3xl">
              <CardContent className="p-8">
                <div className="text-center space-y-8">
                  {/* Biometric Login Section */}
                  <div className="space-y-6">
                    <div className="relative mx-auto w-24 h-24">
                      {faceLoginStatus === 'idle' && (
                        <div 
                          className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-blue-600 active:scale-95"
                          onClick={handleFaceLogin}
                        >
                          <Fingerprint className="h-12 w-12 text-white transition-transform duration-200" />
                        </div>
                      )}
                      
                      {faceLoginStatus === 'scanning' && (
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center animate-pulse shadow-lg">
                            <Scan className="h-12 w-12 text-white animate-bounce" />
                          </div>
                          <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-ping"></div>
                        </div>
                      )}
                      
                      {faceLoginStatus === 'success' && (
                        <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                          <CheckCircle className="h-12 w-12 text-white" />
                        </div>
                      )}
                      
                      {faceLoginStatus === 'failed' && (
                        <div 
                          className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center shadow-lg cursor-pointer"
                          onClick={() => {
                            setFaceLoginStatus('idle');
                            handleFaceLogin();
                          }}
                        >
                          <Eye className="h-12 w-12 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {faceLoginStatus === 'idle' && 'Biometric Login'}
                        {faceLoginStatus === 'scanning' && 'Scanning...'}
                        {faceLoginStatus === 'success' && 'Success! Redirecting...'}
                        {faceLoginStatus === 'failed' && 'Try Again'}
                      </h2>
                      <p className="text-gray-600">
                        {faceLoginStatus === 'idle' && 'Use your fingerprint or face to login securely'}
                        {faceLoginStatus === 'scanning' && 'Please hold still while we verify your identity'}
                        {faceLoginStatus === 'success' && 'Authentication successful'}
                        {faceLoginStatus === 'failed' && 'Authentication failed. Please try again'}
                      </p>
                    </div>
                  </div>

                  {/* MPIN Input Only */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                        <Lock className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Enter MPIN</h3>
                    </div>

                    {/* MPIN Input Boxes */}
                    <div className="flex justify-center space-x-4">
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
                          className="w-14 h-14 rounded-xl border-2 text-center text-xl font-semibold bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 hover:border-gray-400"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Social Login */}
                  <div className="space-y-4">
                    <p className="text-gray-500 text-sm">Or continue with</p>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        className="h-12 bg-white border-gray-200 hover:bg-gray-50 rounded-lg flex items-center justify-center space-x-2 font-sans transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                        onClick={() => setCurrentScreen('dashboard')}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-gray-700">Google</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="h-12 bg-black text-white border-black hover:bg-gray-800 rounded-lg flex items-center justify-center space-x-2 font-sans transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                        onClick={() => setCurrentScreen('dashboard')}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        <span>Apple</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-gray-600 text-sm font-sans">
                Don't have an account?{' '}
                <button 
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200 hover:underline"
                  onClick={() => setCurrentScreen('register')}
                >
                  Sign up
                </button>
              </p>
              <p className="text-gray-500 text-xs mt-2 font-sans">
                Join thousands building their financial future
              </p>
            </div>

            {/* Security Features */}
            <div className="flex items-center justify-center space-x-8 mt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 transition-transform hover:scale-105">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs text-gray-600 font-medium font-sans">Bank Grade</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 transition-transform hover:scale-105">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs text-gray-600 font-medium font-sans">256-bit SSL</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2 transition-transform hover:scale-105">
                  <HelpCircle className="h-6 w-6 text-white" />
                </div>
                <p className="text-xs text-gray-600 font-medium font-sans">24/7 Support</p>
              </div>
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
        
        <div className="relative z-10 min-h-screen flex flex-col justify-center p-6">
          <div className="max-w-sm mx-auto w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <img src={kaniroLogo} alt="Kaniro Financial Services" className="h-10 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-600">Join thousands building their financial future</p>
            </div>

            {/* Registration Form */}
            <Card className="bg-white shadow-xl border-0 rounded-3xl">
              <CardContent className="p-8">
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

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Unified Header Frame */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-md mx-auto">
          {/* Logo & Navigation Row */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <img src={kaniroLogo} alt="Kaniro" className="h-6" />
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('notifications')}>
                  <Bell className="h-5 w-5" />
                  {hasActiveData && <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('profile')}>
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Service Cards Carousel - Horizontal Auto-Scroll */}
          <div className="px-3 pb-4">
            <div className="relative overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-r from-green-200/30 via-blue-200/30 to-purple-200/30 p-0.5 shadow-lg">
              {/* Animated Border Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/40 via-blue-400/40 to-purple-400/40 animate-premium-shimmer opacity-60"></div>
              
              {/* Subtle Pulsing Outer Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-green-300/20 via-blue-300/20 to-purple-300/20 animate-pulse blur-sm"></div>
              
              {/* Top Border Accent */}
              <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"></div>
              
              {/* Side Border Accents */}
              <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent rounded-full"></div>
              <div className="absolute right-0 top-1/4 bottom-1/4 w-0.5 bg-gradient-to-b from-transparent via-white/40 to-transparent rounded-full"></div>
              
              <div className="relative overflow-hidden rounded-2xl bg-white z-10">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentServiceIndex * 100}%)` }}
              >
                {/* Deposit Card */}
                <div className="w-full flex-shrink-0 relative">
                  <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-15">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full transform translate-x-8 -translate-y-8 animate-float"></div>
                      <div className="absolute bottom-0 left-0 w-18 h-18 bg-white/10 rounded-full transform -translate-x-6 translate-y-6 animate-financial-drift"></div>
                      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                    </div>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-premium-shimmer"></div>
                    
                    {/* Bottom Fade Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    
                    {/* Bottom Color Border - Green */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 pointer-events-none"></div>
                    
                    <CardContent className="p-4 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-white/20 p-2 rounded-full relative">
                            <PiggyBank className="h-4 w-4" />
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-300 rounded-full"></div>
                          </div>
                          <div>
                            <h3 className="font-bold">Deposit</h3>
                            <p className="text-xs opacity-80">↓ Dabba Save</p>
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
                <div className="w-full flex-shrink-0 relative">
                  <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-15">
                      <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full transform -translate-x-8 -translate-y-8 animate-currency-float"></div>
                      <div className="absolute bottom-0 right-0 w-22 h-22 bg-white/10 rounded-full transform translate-x-8 translate-y-8 animate-security-shield"></div>
                      <div className="absolute top-1/3 left-2/3 w-14 h-14 bg-white/5 rounded-full animate-wealth-pulse"></div>
                    </div>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent animate-premium-shimmer" style={{ animationDelay: '1s' }}></div>
                    
                    {/* Bottom Fade Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    
                    {/* Bottom Color Border - Blue */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 pointer-events-none"></div>
                    
                    <CardContent className="p-4 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-white/20 p-2 rounded-full relative">
                            <CreditCard className="h-4 w-4" />
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-300 rounded-full"></div>
                          </div>
                          <div>
                            <h3 className="font-bold">Payments</h3>
                            <p className="text-xs opacity-80">↓ Dabba Pay</p>
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

                {/* Offers & Benefits Card */}
                <div className="w-full flex-shrink-0 relative">
                  <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-15">
                      <div className="absolute top-0 right-0 w-26 h-26 bg-white/10 rounded-full transform translate-x-10 -translate-y-10 animate-trust-network"></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full transform -translate-x-6 translate-y-6 animate-prosperity-flow"></div>
                      <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-white/5 rounded-full animate-banking-confidence"></div>
                    </div>
                    
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-premium-shimmer" style={{ animationDelay: '2s' }}></div>
                    
                    {/* Bottom Fade Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    
                    {/* Bottom Color Border - Purple */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500 pointer-events-none"></div>
                    
                    <CardContent className="p-4 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="bg-white/20 p-2 rounded-full relative">
                            <Gift className="h-4 w-4" />
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-300 rounded-full"></div>
                          </div>
                          <div>
                            <h3 className="font-bold">Offers & Benefits</h3>
                            <p className="text-xs opacity-80">↓ Save & Pay</p>
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

        {/* Connecting Bridge Element */}
        <div className="relative max-w-md mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-white/60 to-gray-300"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-6 w-4 h-4 bg-white border-2 border-gray-300 rounded-full shadow-sm"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-24 space-y-4">

        {/* OneDabba Services - Connected to Top Carousel */}
        <div className="space-y-4 relative">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <h3 className="font-bold text-gray-900">OneDabba Services</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>
          
          <Card className="bg-white shadow-md border-l-4 border-l-blue-500 relative overflow-hidden">
            {/* Subtle connecting visual */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-20"></div>
            <CardContent className="p-0">
              {/* Dabba Save - Connected to Deposit Card */}
              <div className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer relative" onClick={() => setCurrentScreen('dabba-name')}>
                {/* Connection indicator */}
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-green-500 to-green-400"></div>
                <div className="p-4 pl-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500 p-3 rounded-full shadow-md relative">
                      <PiggyBank className="h-6 w-6 text-white" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full animate-ping"></div>
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

              {/* Dabba Pay - Connected to Payments Card */}
              <div className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer relative" onClick={() => setCurrentScreen('pay-overdue-table')}>
                {/* Connection indicator */}
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-400"></div>
                <div className="p-4 pl-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-500 p-3 rounded-full shadow-md relative">
                      <CreditCard className="h-6 w-6 text-white" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-300 rounded-full animate-ping"></div>
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

              {/* Save & Pay - Connected to Offers & Benefits Card */}
              <div className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer relative" onClick={() => setCurrentScreen('savepay')}>
                {/* Connection indicator */}
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-purple-400"></div>
                <div className="p-4 pl-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-500 p-3 rounded-full shadow-md relative">
                      <Repeat className="h-6 w-6 text-white" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-300 rounded-full animate-ping"></div>
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
        </div>

        {/* Special Offers Carousel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Special Offers</h3>
            <div className="flex items-center space-x-1">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentPromoIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentPromoIndex * 100}%)` }}
            >
              {/* Offer 1 - Welcome Bonus */}
              <div className="w-full flex-shrink-0 relative">
                <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-xl overflow-hidden relative">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16 animate-float"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12 animate-bounce"></div>
                    <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-white/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-premium-shimmer"></div>
                  
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          <Gift className="h-4 w-4" />
                          <Badge className="bg-white/20 text-white border-0 text-xs">Limited Time</Badge>
                        </div>
                        <h4 className="font-bold">Welcome Bonus</h4>
                        <p className="text-white/90 text-xs">Start your journey with ₹100 instant bonus</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">₹100</div>
                        <div className="text-xs opacity-80">Instant Bonus</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs space-y-0.5">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>No minimum balance</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>First deposit reward</span>
                        </div>
                      </div>
                      <img 
                        src="https://images.unsplash.com/photo-1750079521605-9ac6f0edd902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzYXZpbmdzJTIwcHJvbW90aW9uJTIwYmFubmVyfGVufDF8fHx8MTc1Nzg1MzQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Welcome Bonus" 
                        className="w-16 h-12 object-cover rounded-lg opacity-80"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Offer 2 - Zero Fees */}
              <div className="w-full flex-shrink-0 relative">
                <Card className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-xl overflow-hidden relative">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-0 left-0 w-28 h-28 bg-white/10 rounded-full transform -translate-x-8 -translate-y-8 animate-currency-float"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 rounded-full transform translate-x-8 translate-y-8 animate-financial-drift"></div>
                    <div className="absolute top-2/3 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-constellation-drift"></div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent animate-premium-shimmer" style={{ animationDelay: '1s' }}></div>
                  
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          <Shield className="h-4 w-4" />
                          <Badge className="bg-white/20 text-white border-0 text-xs">Always Free</Badge>
                        </div>
                        <h4 className="font-bold">Zero Fees</h4>
                        <p className="text-white/90 text-xs">No hidden charges, 100% transparency</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">0%</div>
                        <div className="text-xs opacity-80">Hidden Fees</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs space-y-0.5">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>No maintenance fees</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>100% transparency</span>
                        </div>
                      </div>
                      <img 
                        src="https://images.unsplash.com/photo-1642055509518-adafcad1d22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBiYW5raW5nJTIwYXBwJTIwcHJvbW90aW9ufGVufDF8fHx8MTc1Nzg1MzQ1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Zero Fees" 
                        className="w-16 h-12 object-cover rounded-lg opacity-80"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Offer 3 - Refer & Earn */}
              <div className="w-full flex-shrink-0 relative">
                <Card className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-xl overflow-hidden relative">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-0 right-0 w-30 h-30 bg-white/10 rounded-full transform translate-x-10 -translate-y-10 animate-trust-network"></div>
                    <div className="absolute bottom-0 left-0 w-18 h-18 bg-white/10 rounded-full transform -translate-x-6 translate-y-6 animate-prosperity-flow"></div>
                    <div className="absolute top-1/2 right-1/3 w-14 h-14 bg-white/5 rounded-full animate-banking-confidence"></div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-premium-shimmer" style={{ animationDelay: '2s' }}></div>
                  
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          <Users className="h-4 w-4" />
                          <Badge className="bg-white/20 text-white border-0 text-xs">Unlimited</Badge>
                        </div>
                        <h4 className="font-bold">Refer & Earn</h4>
                        <p className="text-white/90 text-xs">₹50 for each friend who joins</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">₹50</div>
                        <div className="text-xs opacity-80">Per Referral</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs space-y-0.5">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Instant rewards</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Unlimited earning</span>
                        </div>
                      </div>
                      <img 
                        src="https://images.unsplash.com/photo-1579227114496-27346f474519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwZ3Jvd3RoJTIwcmV3YXJkc3xlbnwxfHx8fDE3NTc4NTM0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Refer & Earn" 
                        className="w-16 h-12 object-cover rounded-lg opacity-80"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Offer 4 - Higher Returns */}
              <div className="w-full flex-shrink-0 relative">
                <Card className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white shadow-xl overflow-hidden relative">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-0 left-0 w-26 h-26 bg-white/10 rounded-full transform -translate-x-8 -translate-y-8 animate-wealth-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-22 h-22 bg-white/10 rounded-full transform translate-x-8 translate-y-8 animate-security-shield"></div>
                    <div className="absolute top-1/3 left-2/3 w-12 h-12 bg-white/5 rounded-full animate-logo-essence"></div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent animate-premium-shimmer" style={{ animationDelay: '3s' }}></div>
                  
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          <TrendingUp className="h-4 w-4" />
                          <Badge className="bg-white/20 text-white border-0 text-xs">Guaranteed</Badge>
                        </div>
                        <h4 className="font-bold">Higher Returns</h4>
                        <p className="text-white/90 text-xs">Up to 8% interest beats banks</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">8%</div>
                        <div className="text-xs opacity-80">Annual Return</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs space-y-0.5">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Better than banks</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Compound interest</span>
                        </div>
                      </div>
                      <img 
                        src="https://images.unsplash.com/photo-1585401586477-2a671e1cae4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwd2FsbGV0JTIwY2FzaGJhY2t8ZW58MXx8fHwxNzU3ODUzNDY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Higher Returns" 
                        className="w-16 h-12 object-cover rounded-lg opacity-80"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Navigation Dots - Touch Enabled */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPromoIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentPromoIndex === index ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Side Navigation - Hidden on mobile for clean look */}
            <button
              onClick={() => setCurrentPromoIndex(currentPromoIndex === 0 ? 3 : currentPromoIndex - 1)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 hidden sm:flex"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setCurrentPromoIndex(currentPromoIndex === 3 ? 0 : currentPromoIndex + 1)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200 hidden sm:flex"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-900">Quick Actions</h3>
          
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
              <Card 
                key={index} 
                className={`${action.bgColor} ${action.borderColor} hover:shadow-lg ${action.hoverColor} transition-all duration-200 cursor-pointer transform hover:scale-105 active:scale-95`}
                onClick={() => setCurrentScreen(action.screen as Screen)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-full ${action.bgColor} flex items-center justify-center mx-auto mb-3 shadow-sm`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{action.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Support & Banking Info Card */}
        <div className="space-y-3">
          <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border-gray-200 shadow-md">
            <CardContent className="p-6">
              {/* Associate Banks Section */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">40+ Associate Banks</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">Trusted partnerships with leading financial institutions</p>
                
                <div className="grid grid-cols-4 gap-2">
                  {['SBI', 'HDFC', 'ICICI', 'Axis', 'PNB', 'BOB', 'IDBI', 'YES'].map((bank, index) => (
                    <div key={index} className="bg-white rounded-lg p-2 text-center border border-gray-100 shadow-sm">
                      <span className="text-xs font-medium text-gray-700">{bank}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Support Services Section */}
              <div className="space-y-4">
                {/* Door Step Support */}
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Home className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Door Step Support</h4>
                    <p className="text-sm text-gray-600">Personal assistance at your convenience</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">Available</Badge>
                </div>

                {/* 24/7 Support */}
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <HelpCircle className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                    <p className="text-sm text-gray-600">Round-the-clock assistance when you need it</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Live</span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Call Center */}
                    <div className="text-center">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-1">Call Center</h5>
                      <p className="text-sm text-blue-600 font-medium">1800-123-4567</p>
                      <p className="text-xs text-gray-500">Toll Free</p>
                    </div>

                    {/* WhatsApp Support */}
                    <div className="text-center">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515"/>
                        </svg>
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-1">WhatsApp</h5>
                      <p className="text-sm text-green-600 font-medium">+91 98765 43210</p>
                      <p className="text-xs text-gray-500">24/7 Chat</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-5 gap-0">
            {[
              { id: 'home', icon: Home, label: 'Home', screen: 'dashboard' },
              { id: 'save', icon: PiggyBank, label: 'Save', screen: 'save' },
              { id: 'pay', icon: PayIcon, label: 'Pay', screen: 'pay-overdue-table' },
              { id: 'search', icon: Search, label: 'Search', screen: 'dashboard' },
              { id: 'profile', icon: User, label: 'Profile', screen: 'profile' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentScreen(tab.screen as Screen)}
                className={`flex flex-col items-center justify-center py-2 px-2 text-xs ${
                  currentScreen === tab.screen ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <tab.icon className="h-5 w-5 mb-1" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
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

  // Dabba Goal Setup Screen
  const DabbaGoalScreen = () => {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dabba-name')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">Set Your Goal</h1>
                <p className="text-sm text-gray-600">Define your savings target</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">{dabbaSetup.dabbaIcon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {dabbaSetup.customDabbaName || dabbaSetup.dabbaName}
            </h2>
            <p className="text-gray-600">How much do you want to save?</p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target">Target Amount</Label>
                <div className="relative">
                  <Input
                    id="target"
                    type="number"
                    placeholder="0"
                    value={dabbaSetup.targetAmount}
                    onChange={(e) => setDabbaSetup(prev => ({ ...prev, targetAmount: e.target.value }))}
                    className="text-2xl pl-8"
                  />
                  <IndianRupee className="absolute left-2 top-3 h-6 w-6 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Saving Frequency</Label>
                <Select value={dabbaSetup.frequency} onValueChange={(value) => setDabbaSetup(prev => ({ ...prev, frequency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount Per {dabbaSetup.frequency === 'daily' ? 'Day' : dabbaSetup.frequency === 'weekly' ? 'Week' : 'Month'}</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={dabbaSetup.amountPerFrequency}
                    onChange={(e) => setDabbaSetup(prev => ({ ...prev, amountPerFrequency: e.target.value }))}
                    className="pl-8"
                  />
                  <IndianRupee className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {dabbaSetup.targetAmount && dabbaSetup.amountPerFrequency && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Goal Projection</h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div className="flex justify-between">
                      <span>Target Amount:</span>
                      <span>₹{parseFloat(dabbaSetup.targetAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Per {dabbaSetup.frequency}:</span>
                      <span>₹{parseFloat(dabbaSetup.amountPerFrequency).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Time to Goal:</span>
                      <span>
                        {Math.ceil(parseFloat(dabbaSetup.targetAmount) / parseFloat(dabbaSetup.amountPerFrequency))} {
                          dabbaSetup.frequency === 'daily' ? 'days' : 
                          dabbaSetup.frequency === 'weekly' ? 'weeks' : 'months'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Button 
            className="w-full"
            disabled={!dabbaSetup.targetAmount || !dabbaSetup.amountPerFrequency}
            onClick={() => setCurrentScreen('dabba-duration')}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Dabba Duration Screen
  const DabbaDurationScreen = () => {
    const durationOptions = [
      { months: 3, label: '3 Months', description: 'Short term goal' },
      { months: 6, label: '6 Months', description: 'Medium term planning' },
      { months: 12, label: '1 Year', description: 'Annual target' },
      { months: 24, label: '2 Years', description: 'Long term vision' },
      { months: 36, label: '3 Years', description: 'Extended planning' }
    ];

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
          <div className="text-center">
            <Calendar className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Set Duration</h2>
            <p className="text-gray-600">Choose your savings timeline</p>
          </div>

          <div className="space-y-3">
            {durationOptions.map((option) => (
              <Card 
                key={option.months}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  dabbaSetup.duration === option.months ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setDabbaSetup(prev => ({ ...prev, duration: option.months }))}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{option.label}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                    {dabbaSetup.duration === option.months && (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <h4 className="font-semibold">Custom End Date</h4>
                      <p className="text-sm text-gray-600">Set your own timeline</p>
                    </div>
                  </div>
                  <Input
                    type="date"
                    value={dabbaSetup.customEndDate}
                    onChange={(e) => setDabbaSetup(prev => ({ ...prev, customEndDate: e.target.value, duration: 0 }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Button 
            className="w-full"
            disabled={!dabbaSetup.duration && !dabbaSetup.customEndDate}
            onClick={() => setCurrentScreen('dabba-summary')}
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

  // Benefit Summary Screen
  const BenefitSummaryScreen = () => {
    const maturityDate = dabbaSetup.customEndDate || 
      new Date(Date.now() + dabbaSetup.duration * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const totalAmount = parseFloat(dabbaSetup.targetAmount) || 0;
    const frequency = dabbaSetup.frequency;
    const perAmount = parseFloat(dabbaSetup.amountPerFrequency) || 0;
    const timeToGoal = Math.ceil(totalAmount / perAmount);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dabba-duration')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">Benefit Summary</h1>
                <p className="text-sm text-gray-600">Review your savings plan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">{dabbaSetup.dabbaIcon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {dabbaSetup.customDabbaName || dabbaSetup.dabbaName}
            </h2>
            <p className="text-gray-600">Your savings plan summary</p>
          </div>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-lg font-bold mb-4">Plan Overview</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="opacity-80">Target Amount</div>
                    <div className="text-xl font-bold">₹{totalAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="opacity-80">Frequency</div>
                    <div className="text-xl font-bold capitalize">{frequency}</div>
                  </div>
                  <div>
                    <div className="opacity-80">Per {frequency}</div>
                    <div className="text-xl font-bold">₹{perAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="opacity-80">Maturity</div>
                    <div className="text-xl font-bold">{new Date(maturityDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Benefits & Features</h3>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Bank-Grade Security</h4>
                    <p className="text-sm text-gray-600">Your money is 100% safe and secure</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Competitive Returns</h4>
                    <p className="text-sm text-gray-600">Up to 8% annual interest rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Flexible Withdrawals</h4>
                    <p className="text-sm text-gray-600">Access your money when you need it</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="text-center">
                <h4 className="font-semibold text-blue-900 mb-2">Projected Growth</h4>
                <div className="text-sm text-blue-800">
                  <div className="flex justify-between mb-1">
                    <span>Principal Amount:</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Expected Interest (8% p.a.):</span>
                    <span>₹{Math.round(totalAmount * 0.08 * (dabbaSetup.duration / 12)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-1">
                    <span>Maturity Value:</span>
                    <span>₹{(totalAmount + Math.round(totalAmount * 0.08 * (dabbaSetup.duration / 12))).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            className="w-full"
            onClick={() => setCurrentScreen('dabba-schemes')}
          >
            Continue to Bank Schemes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Bank Scheme Marketplace Screen
  const BankSchemeMarketplaceScreen = () => {
    const bankSchemes = [
      {
        id: 1,
        bankName: 'HDFC Bank',
        schemeName: 'FlexiSave Plus',
        interestRate: 7.8,
        minAmount: 1000,
        tenure: '3-36 months',
        features: ['Flexible tenure', 'Premature withdrawal', 'Auto-renewal'],
        rating: 4.8,
        popular: true
      },
      {
        id: 2,
        bankName: 'ICICI Bank',
        schemeName: 'Power Save',
        interestRate: 7.5,
        minAmount: 500,
        tenure: '6-60 months',
        features: ['High liquidity', 'Monthly interest', 'Online management'],
        rating: 4.6,
        popular: false
      },
      {
        id: 3,
        bankName: 'SBI',
        schemeName: 'Smart Deposit',
        interestRate: 7.2,
        minAmount: 1000,
        tenure: '12-120 months',
        features: ['Government backed', 'Stable returns', 'Tax benefits'],
        rating: 4.5,
        popular: false
      },
      {
        id: 4,
        bankName: 'Axis Bank',
        schemeName: 'Growth Plus',
        interestRate: 8.0,
        minAmount: 2000,
        tenure: '6-36 months',
        features: ['Highest returns', 'Quarterly payouts', 'Premium banking'],
        rating: 4.7,
        popular: true
      }
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dabba-summary')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">Bank Schemes</h1>
                <p className="text-sm text-gray-600">Choose your investment scheme</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Available Schemes</h2>
            <Button variant="outline" size="sm" onClick={() => setCurrentScreen('dabba-compare')}>
              Compare
            </Button>
          </div>

          <div className="space-y-3">
            {bankSchemes.map((scheme) => (
              <Card 
                key={scheme.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  dabbaSetup.selectedScheme?.id === scheme.id ? 'border-green-500 bg-green-50' : ''
                } ${scheme.popular ? 'border-orange-300' : ''}`}
                onClick={() => setDabbaSetup(prev => ({ ...prev, selectedScheme: scheme }))}
              >
                <CardContent className="p-4">
                  {scheme.popular && (
                    <Badge className="mb-2 bg-orange-500">Most Popular</Badge>
                  )}
                  
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold">{scheme.schemeName}</h4>
                      <p className="text-sm text-gray-600">{scheme.bankName}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-gray-600">{scheme.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{scheme.interestRate}%</div>
                      <div className="text-xs text-gray-600">per annum</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-gray-600">Min Amount: </span>
                      <span className="font-medium">₹{scheme.minAmount}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Tenure: </span>
                      <span className="font-medium">{scheme.tenure}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {scheme.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">{feature}</Badge>
                    ))}
                  </div>

                  {dabbaSetup.selectedScheme?.id === scheme.id && (
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Selected</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Button 
            className="w-full"
            disabled={!dabbaSetup.selectedScheme}
            onClick={() => setCurrentScreen('dabba-kyc')}
          >
            Continue with Selected Scheme
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Compare Schemes Screen
  const CompareSchemesScreen = () => {
    const bankSchemes = [
      {
        id: 1,
        bankName: 'HDFC Bank',
        schemeName: 'FlexiSave Plus',
        interestRate: 7.8,
        minAmount: 1000,
        tenure: '3-36 months',
        features: ['Flexible tenure', 'Premature withdrawal', 'Auto-renewal'],
        rating: 4.8
      },
      {
        id: 4,
        bankName: 'Axis Bank',
        schemeName: 'Growth Plus',
        interestRate: 8.0,
        minAmount: 2000,
        tenure: '6-36 months',
        features: ['Highest returns', 'Quarterly payouts', 'Premium banking'],
        rating: 4.7
      }
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dabba-schemes')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">Compare Schemes</h1>
                <p className="text-sm text-gray-600">Side by side comparison</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {bankSchemes.map((scheme) => (
              <Card key={scheme.id} className="h-full">
                <CardContent className="p-4">
                  <div className="text-center mb-4">
                    <h4 className="font-bold text-sm">{scheme.schemeName}</h4>
                    <p className="text-xs text-gray-600">{scheme.bankName}</p>
                    <div className="text-lg font-bold text-green-600 mt-2">{scheme.interestRate}%</div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Amount:</span>
                      <span className="font-medium">₹{scheme.minAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tenure:</span>
                      <span className="font-medium">{scheme.tenure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium">{scheme.rating}★</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <div className="text-xs text-gray-600 mb-2">Features:</div>
                    <div className="space-y-1">
                      {scheme.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => {
                      setDabbaSetup(prev => ({ ...prev, selectedScheme: scheme }));
                      setCurrentScreen('dabba-kyc');
                    }}
                  >
                    Select
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Comparison Summary</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <div>• HDFC offers more flexibility and lower minimum</div>
                <div>• Axis provides highest returns but requires ₹2000 minimum</div>
                <div>• Both schemes are highly rated and trusted</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // e-KYC Verification Screen
  const KYCVerificationScreen = () => {
    const handleSendOTP = () => {
      setDabbaSetup(prev => ({ ...prev, otpSent: true }));
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dabba-schemes')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">e-KYC Verification</h1>
                <p className="text-sm text-gray-600">Verify your identity</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <div className="text-center">
            <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Secure Verification</h2>
            <p className="text-gray-600">Complete your KYC to activate your Dabba Save</p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input
                  id="pan"
                  placeholder="ABCDE1234F"
                  value={dabbaSetup.panNumber}
                  onChange={(e) => setDabbaSetup(prev => ({ ...prev, panNumber: e.target.value.toUpperCase() }))}
                  className="uppercase"
                />
                <p className="text-xs text-gray-600">Enter your 10-digit PAN number</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aadhaar">Aadhaar Verification</Label>
                <div className="flex space-x-2">
                  <Input
                    id="aadhaar"
                    placeholder="1234 5678 9012"
                    className="flex-1"
                    disabled={dabbaSetup.otpSent}
                  />
                  <Button 
                    variant="outline"
                    onClick={handleSendOTP}
                    disabled={dabbaSetup.otpSent}
                  >
                    {dabbaSetup.otpSent ? 'Sent' : 'Send OTP'}
                  </Button>
                </div>
                <p className="text-xs text-gray-600">Enter your 12-digit Aadhaar number</p>
              </div>

              {dabbaSetup.otpSent && (
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    value={dabbaSetup.aadhaarOtp}
                    onChange={(e) => setDabbaSetup(prev => ({ ...prev, aadhaarOtp: e.target.value }))}
                    maxLength={6}
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>OTP sent to your registered mobile</span>
                    <Button variant="link" className="h-auto p-0 text-xs">Resend OTP</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-yellow-600" />
                <h4 className="font-semibold text-yellow-800">Why KYC?</h4>
              </div>
              <div className="text-sm text-yellow-800 space-y-1">
                <div>• Required by RBI for all financial services</div>
                <div>• Ensures account security and compliance</div>
                <div>• One-time verification process</div>
              </div>
            </CardContent>
          </Card>

          <Button 
            className="w-full"
            disabled={!dabbaSetup.panNumber || !dabbaSetup.aadhaarOtp}
            onClick={() => {
              setDabbaSetup(prev => ({ ...prev, kycComplete: true }));
              setCurrentScreen('dabba-confirm');
            }}
          >
            Complete Verification
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Review & Confirmation Screen
  const ReviewConfirmationScreen = () => {
    const maturityDate = dabbaSetup.customEndDate || 
      new Date(Date.now() + dabbaSetup.duration * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const totalAmount = parseFloat(dabbaSetup.targetAmount) || 0;
    const perAmount = parseFloat(dabbaSetup.amountPerFrequency) || 0;

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dabba-kyc')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">Review & Confirm</h1>
                <p className="text-sm text-gray-600">Final confirmation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <div className="text-center">
            <div className="text-4xl mb-4">{dabbaSetup.dabbaIcon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {dabbaSetup.customDabbaName || dabbaSetup.dabbaName}
            </h2>
            <p className="text-gray-600">Review your complete savings plan</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Savings Plan Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Target Amount:</span>
                  <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frequency:</span>
                  <span className="font-medium capitalize">{dabbaSetup.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount per {dabbaSetup.frequency}:</span>
                  <span className="font-medium">₹{perAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{dabbaSetup.duration} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maturity Date:</span>
                  <span className="font-medium">{new Date(maturityDate).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Selected Bank Scheme</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank:</span>
                  <span className="font-medium">{dabbaSetup.selectedScheme?.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Scheme:</span>
                  <span className="font-medium">{dabbaSetup.selectedScheme?.schemeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-medium text-green-600">{dabbaSetup.selectedScheme?.interestRate}% p.a.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-blue-900">Auto-Debit Setup</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="autoDebit"
                    checked={dabbaSetup.autoDebitEnabled}
                    onChange={(e) => setDabbaSetup(prev => ({ ...prev, autoDebitEnabled: e.target.checked }))}
                    className="rounded"
                  />
                  <label htmlFor="autoDebit" className="text-sm font-medium text-blue-900">
                    {dabbaSetup.autoDebitEnabled ? 'ON' : 'OFF'}
                  </label>
                </div>
              </div>
              <p className="text-sm text-blue-800">
                {dabbaSetup.autoDebitEnabled 
                  ? `Auto-debit ₹${perAmount} ${dabbaSetup.frequency} from your selected bank account. You can disable this anytime.`
                  : 'Manual deposits - you will receive reminders to make deposits manually.'
                }
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <h4 className="font-semibold text-green-800">KYC Verified</h4>
              </div>
              <p className="text-sm text-green-800">Your identity has been successfully verified</p>
            </CardContent>
          </Card>

          <Button 
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => setCurrentScreen('dabba-success')}
          >
            Confirm & Create Dabba Save
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>

          <p className="text-xs text-gray-600 text-center">
            By confirming, you agree to our Terms & Conditions and Privacy Policy
          </p>
        </div>
      </div>
    );
  };

  // Success & Receipt Screen
  const SuccessReceiptScreen = () => {
    const receiptId = `DS${Date.now().toString().slice(-8)}`;
    const currentDate = new Date().toLocaleDateString();

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="text-center">
              <h1 className="font-bold">Dabba Save Created</h1>
              <p className="text-sm text-gray-600">Success confirmation</p>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
            <p className="text-gray-600">Your Dabba Save has been created successfully</p>
          </div>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl mb-2">{dabbaSetup.dabbaIcon}</div>
                <h3 className="text-lg font-bold mb-2">
                  {dabbaSetup.customDabbaName || dabbaSetup.dabbaName}
                </h3>
                <div className="text-2xl font-bold">₹{parseFloat(dabbaSetup.targetAmount).toLocaleString()}</div>
                <div className="text-sm opacity-80">Target Amount</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Receipt Details</h3>
                <Badge variant="outline">#{receiptId}</Badge>
              </div>
              
              <div className="space-y-2 text-sm border-dashed border-2 border-gray-200 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span>Date Created:</span>
                  <span>{currentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dabba Name:</span>
                  <span>{dabbaSetup.customDabbaName || dabbaSetup.dabbaName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Amount:</span>
                  <span>₹{parseFloat(dabbaSetup.targetAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frequency:</span>
                  <span className="capitalize">{dabbaSetup.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bank Scheme:</span>
                  <span>{dabbaSetup.selectedScheme?.schemeName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Interest Rate:</span>
                  <span>{dabbaSetup.selectedScheme?.interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span>Auto-Debit:</span>
                  <span>{dabbaSetup.autoDebitEnabled ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="flex-1">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <Button 
            className="w-full"
            onClick={() => {
              // Add the new dabba to active dabbas
              const newDabba = {
                id: Date.now(),
                name: dabbaSetup.customDabbaName || dabbaSetup.dabbaName,
                icon: dabbaSetup.dabbaIcon,
                targetAmount: parseFloat(dabbaSetup.targetAmount),
                savedAmount: 0,
                frequency: dabbaSetup.frequency,
                amountPerFrequency: parseFloat(dabbaSetup.amountPerFrequency),
                progress: 0,
                nextDeposit: dabbaSetup.autoDebitEnabled ? 'Tomorrow 6:00 AM' : 'Manual reminder',
                autoDebit: dabbaSetup.autoDebitEnabled,
                maturityDate: dabbaSetup.customEndDate || new Date(Date.now() + dabbaSetup.duration * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: 'active'
              };
              setActiveDabbas(prev => [...prev, newDabba]);
              
              // Reset dabba setup
              setDabbaSetup({
                dabbaName: '',
                customDabbaName: '',
                dabbaIcon: '',
                goal: '',
                targetAmount: '',
                frequency: 'daily',
                amountPerFrequency: '',
                duration: 3,
                customEndDate: '',
                selectedScheme: null,
                kycComplete: false,
                autoDebitEnabled: false,
                firstDepositAmount: '',
                compareList: [],
                compareSchemes: [],
                panNumber: '',
                aadhaarOtp: '',
                otpSent: false
              });
              
              setCurrentScreen('dabba-dashboard');
            }}
          >
            View My Dabba
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  // Updated Dabba Dashboard Screen
  const DabbaDashboardScreen = () => {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-bold">My Dabba Saves</h1>
                <p className="text-sm text-gray-600">{activeDabbas.length} active savings goals</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-lg font-bold">
                    ₹{activeDabbas.reduce((sum, dabba) => sum + dabba.savedAmount, 0).toLocaleString()}
                  </div>
                  <div className="text-xs opacity-80">Total Saved</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-lg font-bold">
                    ₹{activeDabbas.reduce((sum, dabba) => sum + dabba.targetAmount, 0).toLocaleString()}
                  </div>
                  <div className="text-xs opacity-80">Total Target</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Active Dabbas</h3>
              <Button variant="outline" size="sm" onClick={() => setCurrentScreen('dabba-name')}>
                <Plus className="mr-2 h-4 w-4" />
                New
              </Button>
            </div>

            {activeDabbas.map((dabba) => (
              <Card key={dabba.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl">{dabba.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{dabba.name}</h4>
                      <p className="text-sm text-gray-600">
                        {dabba.frequency} • ₹{dabba.amountPerFrequency} per {dabba.frequency}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">₹{dabba.savedAmount.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">of ₹{dabba.targetAmount.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{dabba.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${dabba.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                    <span>Next: {dabba.nextDeposit}</span>
                    <Badge variant={dabba.autoDebit ? "default" : "secondary"} className="text-xs">
                      {dabba.autoDebit ? 'Auto-debit' : 'Manual'}
                    </Badge>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Plus className="mr-2 h-3 w-3" />
                      Deposit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Clock className="mr-2 h-3 w-3" />
                      Pause
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const screens = {
    login: LoginScreen,
    register: RegisterScreen,
    dashboard: Dashboard,
    'dabba-name': DabbaNameScreen,
    'dabba-goal': DabbaGoalScreen,
    'dabba-duration': DabbaDurationScreen,
    'dabba-summary': BenefitSummaryScreen,
    'dabba-schemes': BankSchemeMarketplaceScreen,
    'dabba-compare': CompareSchemesScreen,
    'dabba-kyc': KYCVerificationScreen,
    'dabba-confirm': ReviewConfirmationScreen,
    'dabba-success': SuccessReceiptScreen,
    'dabba-dashboard': DabbaDashboardScreen,
    'pay-overdue-table': PayOverdueTableScreen,
    
    // Payment flow placeholders
    'pay-micro-installment': () => <div className="min-h-screen bg-gray-50 p-4"><div className="max-w-md mx-auto pt-8 text-center"><h1>Micro Installments</h1><Button onClick={() => setCurrentScreen('pay-bank-selection')}>Select Bank</Button></div></div>,
    'pay-bank-selection': () => <div className="min-h-screen bg-gray-50 p-4"><div className="max-w-md mx-auto pt-8 text-center"><h1>Select Bank</h1><Button onClick={() => setCurrentScreen('pay-confirmation')}>Pay Now</Button></div></div>,
    'pay-confirmation': () => <div className="min-h-screen bg-gray-50 p-4"><div className="max-w-md mx-auto pt-8 text-center"><h1>Payment Successful! ✅</h1><Button onClick={() => setCurrentScreen('dashboard')}>Back to Dashboard</Button></div></div>,
    'profile': () => <div className="min-h-screen bg-gray-50 p-4"><div className="max-w-md mx-auto pt-8 text-center"><h1>Profile Settings</h1><Button onClick={() => setCurrentScreen('dashboard')}>Back to Dashboard</Button></div></div>,
    'notifications': () => <div className="min-h-screen bg-gray-50 p-4"><div className="max-w-md mx-auto pt-8 text-center"><h1>Notifications</h1><Button onClick={() => setCurrentScreen('dashboard')}>Back to Dashboard</Button></div></div>
  };

  const CurrentScreen = screens[currentScreen] || LoginScreen;

  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen relative">
      <CurrentScreen />
    </div>
  );
}

export default App;