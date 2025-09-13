import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { ArrowRight, Coins, CreditCard, PiggyBank, Shield, TrendingUp, Users, CheckCircle, Clock, Zap, ArrowLeft, Eye, EyeOff, Mail, Lock, User, Phone, Target, Calendar, DollarSign, Building2, Plus, Minus, Star, Smartphone, Wallet, Gift, GraduationCap, Home, Car, Plane, Bell, BellRing, Flame, Award, IndianRupee, Download, ArrowUpRight, ArrowDownLeft, Repeat, QrCode, Calculator, Fingerprint, Scan, MoreHorizontal, FileText, Menu, Search, Settings, HelpCircle, CreditCard as PayIcon } from 'lucide-react';
import kaniroLogo from 'figma:asset/59a4e87f6f8559c1e33304344c14ed5d1faafe70.png';
import promoImage from 'figma:asset/6c9f7a43bceeec40c2dac840bb2776654b079e3c.png';

type Screen = 'splash' | 'onboarding' | 'login' | 'register' | 'dashboard' | 'save' | 'pay' | 'savepay' | 'profile' | 'notifications' | 'save-setup' | 'save-frequency' | 'save-amount' | 'save-bank' | 'save-confirm' | 'save-first-deposit' | 'save-success' | 'save-dashboard' | 'save-withdraw' | 'save-kyc' | 'save-complete' | 'save-summary' | 'save-receipt' | 'save-autopay' | 'pay-dashboard' | 'pay-banks' | 'pay-add-loan' | 'pay-micro-setup' | 'pay-micro-success' | 'pay-success' | 'pay-emandate' | 'pay-activate' | 'pay-calculator' | 'pay-overdue-table' | 'pay-micro-installment' | 'pay-bank-selection' | 'pay-confirmation';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isQuickActionsExpanded, setIsQuickActionsExpanded] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState('home');
  
  // Ensure proper mobile viewport handling with safe areas
  useEffect(() => {
    // Update viewport meta tag
    let viewport = document.querySelector('meta[name=viewport]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content');
    
    // Add safe area CSS variables and mobile optimizations
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --safe-area-inset-top: env(safe-area-inset-top);
        --safe-area-inset-right: env(safe-area-inset-right);
        --safe-area-inset-bottom: env(safe-area-inset-bottom);
        --safe-area-inset-left: env(safe-area-inset-left);
      }
      
      /* Force mobile app behavior */
      html, body {
        position: fixed !important;
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
      }
      
      /* Prevent iOS address bar issues */
      body {
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: none;
        touch-action: manipulation;
      }
    `;
    document.head.appendChild(style);
    
    // Set body classes for mobile
    document.body.classList.add('mobile-app');
    document.documentElement.classList.add('mobile-app');
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      document.body.classList.remove('mobile-app');
      document.documentElement.classList.remove('mobile-app');
    };
  }, []);

  // Update active bottom tab based on current screen
  useEffect(() => {
    if (currentScreen === 'dashboard') {
      setActiveBottomTab('home');
    } else if (currentScreen === 'save-setup' || currentScreen === 'save-bank' || currentScreen === 'save-confirm' || currentScreen === 'save-success') {
      setActiveBottomTab('save');
    } else if (currentScreen === 'pay' || currentScreen === 'pay-dashboard' || currentScreen === 'pay-banks' || currentScreen === 'pay-add-loan' || currentScreen === 'pay-calculator' || currentScreen === 'pay-overdue-table' || currentScreen === 'pay-micro-installment' || currentScreen === 'pay-bank-selection' || currentScreen === 'pay-confirmation') {
      setActiveBottomTab('pay');
    } else if (currentScreen === 'profile') {
      setActiveBottomTab('profile');
    }
  }, [currentScreen]);
  
  // User state management 
  const [hasActiveData, setHasActiveData] = useState(true); // Set to true to show existing customer data
  
  const [saveSetup, setSaveSetup] = useState({
    goal: '', // Always start with empty goal for new setup
    targetAmount: '',
    dailyAmount: '',
    frequency: '',
    duration: '12',
    bankAccount: '',
    scheme: '',
    ifsc: '',
    firstDeposit: '100',
    mobileVerified: false,
    kycComplete: false,
    emandateSetup: false
  });
  
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
    frequency: '', // 'daily', 'weekly', 'monthly'
    amount: '',
    sourceBank: '',
    paymentMethod: '', // 'emandate', 'upi', 'auto-debit'
    projectedSavings: {
      daily: { interest: 0, principal: 0, total: 0 },
      weekly: { interest: 0, principal: 0, total: 0 },
      monthly: { interest: 0, principal: 0, total: 0 }
    }
  });

  // Payment Setup State (for individual payments)
  const [paymentSetup, setPaymentSetup] = useState({
    selectedLoan: null as any,
    paymentType: '', // 'minimum', 'overdue', 'emi', 'custom'
    paymentAmount: '',
    paymentMethod: '', // 'upi', 'netbanking', 'card', 'wallet'
    bankAccount: ''
  });

  // Payment Flow State (clean step-by-step flow)
  const [paymentFlow, setPaymentFlow] = useState({
    selectedLoans: [] as number[],
    totalAmount: 0,
    totalOverdue: 0,
    paymentMode: '', // 'full' or 'micro'
    microPlan: {
      frequency: '', // 'daily', 'weekly', 'monthly'
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

  // Promotional carousel data with enhanced visuals - Memoized for performance
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

  // Auto-scroll promotional carousel every 4 seconds - Performance optimized
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

  const LoginScreen = () => {
    const [mpin, setMpin] = useState(['', '', '', '']);
    const [showFaceId, setShowFaceId] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    
    const handleMpinChange = useCallback((index: number, value: string) => {
      const numericRegex = /^[0-9]*$/;
      if (value.length <= 1 && numericRegex.test(value)) {
        const newMpin = [...mpin];
        newMpin[index] = value;
        setMpin(newMpin);
        
        // Auto focus next input
        if (value && index < 3) {
          const nextInput = document.getElementById(`mpin-${index + 1}`);
          nextInput?.focus();
        }
        
        // Auto submit when all 4 digits are entered
        if (newMpin.every(digit => digit !== '') && index === 3) {
          setIsAuthenticating(true);
          setTimeout(() => {
            setCurrentScreen('dashboard');
          }, 1200);
        }
      }
    }, [mpin]);
    
    const handleBackspace = useCallback((index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Backspace' && !mpin[index] && index > 0) {
        const prevInput = document.getElementById(`mpin-${index - 1}`);
        prevInput?.focus();
      }
    }, [mpin]);

    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-blue-50 to-green-50 relative">
        {/* Modern Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-green-300/15 rounded-full blur-2xl animate-float opacity-40"></div>
          <div 
            className="absolute bottom-1/3 left-1/5 w-28 h-28 bg-gradient-to-br from-green-300/15 to-blue-300/20 rounded-full blur-xl animate-float opacity-30" 
            style={{ animationDelay: '3s', animationDuration: '8s' }}
          ></div>
          <div 
            className="absolute top-1/2 right-1/5 w-24 h-24 bg-gradient-to-br from-purple-300/15 to-blue-300/20 rounded-full blur-xl animate-float opacity-25" 
            style={{ animationDelay: '1s', animationDuration: '6s' }}
          ></div>
        </div>

        {/* Main Container */}
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4">
            <div className="mb-8">
              <div className="flex items-center">
                <div className="relative group">
                  <img 
                    src={kaniroLogo} 
                    alt="Kaniro Financial Services" 
                    className="h-8 w-auto group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full shadow-sm border-2 border-white animate-pulse">
                    <div className="w-0.5 h-0.5 bg-white rounded-full mx-auto mt-0.5"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600 text-sm">Secure access to your financial future</p>
            </div>

            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/80 flex-1 flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-green-50/20 opacity-50"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/15 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-200/10 to-transparent rounded-full blur-xl"></div>
              
              <div className="relative z-10 p-6 flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <Button
                      onClick={() => setCurrentScreen('dashboard')}
                      className="relative w-20 h-20 rounded-full group overflow-hidden transition-all duration-500 hover:scale-110 transform-gpu bg-gradient-to-br from-blue-500/10 via-green-500/5 to-blue-600/10 border-2 border-gray-200 hover:border-blue-400 shadow-lg hover:shadow-2xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-blue-100/20 to-green-100/15 rounded-full backdrop-blur-md group-hover:from-blue-100/30 group-hover:to-green-100/25 transition-all duration-500"></div>
                      <div className="absolute inset-2 border-2 border-blue-400/40 rounded-full animate-pulse group-hover:border-blue-500/70 transition-all duration-500"></div>
                      <div className="relative z-10 flex items-center justify-center">
                        <Fingerprint className="w-8 h-8 text-blue-600 group-hover:text-blue-700 group-hover:scale-125 transition-all duration-500 drop-shadow-lg" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg border-2 border-white animate-bounce">
                        <div className="w-1 h-1 bg-white rounded-full mx-auto mt-0.5"></div>
                      </div>
                    </Button>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Quick Biometric Login</h3>
                  <p className="text-gray-600 text-xs mb-4">Or enter your MPIN below</p>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg mb-2 relative">
                      <Lock className="h-5 w-5 text-white drop-shadow-lg" />
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm">Enter MPIN</h4>
                  </div>

                  <div className="flex justify-center space-x-2 mb-4">
                    {mpin.map((digit, index) => (
                      <div key={index} className="relative group">
                        <input
                          id={`mpin-${index}`}
                          type="password"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleMpinChange(index, e.target.value)}
                          onKeyDown={(e) => handleBackspace(index, e)}
                          disabled={isAuthenticating}
                          className={`w-10 h-10 text-center font-bold text-base text-gray-900 bg-white border-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                            isAuthenticating ? 'opacity-50 cursor-not-allowed border-gray-200' : 'border-gray-200 hover:border-blue-300'
                          }`}
                          autoFocus={index === 0}
                        />
                        
                        {digit && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-md border-2 border-white flex items-center justify-center">
                            <CheckCircle className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="text-center mb-4">
                    {isAuthenticating ? (
                      <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs font-bold text-blue-700">Verifying...</span>
                      </div>
                    ) : mpin.every(d => d !== '') ? (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
                        onClick={() => {
                          setIsAuthenticating(true);
                          setTimeout(() => setCurrentScreen('dashboard'), 1200);
                        }}
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Login
                      </Button>
                    ) : null}
                  </div>

                  <div className="mt-auto">
                    <div className="relative mb-3">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-xs text-gray-500 font-medium">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentScreen('dashboard')}
                        className="h-8 flex items-center justify-center space-x-1.5 border border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-400 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-700">G</span>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-gray-700">Google</span>
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setCurrentScreen('dashboard')}
                        className="h-8 flex items-center justify-center space-x-1.5 border border-gray-200 bg-white hover:bg-gray-50 hover:border-green-400 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-3 h-3 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13.6823 8.07886C13.6207 7.04766 14.4157 6.40625 14.8447 6.10611C14.2788 5.33333 13.4375 5.25 13.125 5.23958C12.3333 5.125 11.2812 5.72396 10.8516 5.72396C10.4609 5.72396 9.59375 5.27083 8.96875 5.27083C7.65104 5.29167 6.35417 6.30208 5.85417 7.63542C4.82292 10.3958 5.58333 14.4792 6.625 16.7188C7.125 17.8125 7.72396 18.9792 8.60417 18.9479C9.25 18.9167 9.5625 18.5208 10.375 18.5208C11.1875 18.5208 11.4583 18.9479 12.1458 18.9271C13.0156 18.9063 13.5156 17.8646 13.9844 16.7604C14.5469 15.5469 14.7812 14.3646 14.7917 14.2917C14.7708 14.2812 13.6927 13.8333 13.6823 8.07886ZM11.8333 3.60417C12.2188 3.15625 12.4688 2.54167 12.4062 1.91667C11.8854 1.9375 11.2708 2.26042 10.8594 2.75C10.5 3.16667 10.1875 3.80208 10.2656 4.39583C10.8542 4.44792 11.4375 4.09375 11.8333 3.60417Z"/>
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-gray-700">Apple</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50/80 via-blue-50/50 to-gray-50/80 border-t border-gray-200 p-4 relative z-10">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-xs font-bold text-gray-800">Bank Grade</div>
                  </div>

                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-md">
                      <Lock className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-xs font-bold text-gray-800">256-bit SSL</div>
                  </div>

                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center shadow-md">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-xs font-bold text-gray-800">24/7 Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    return (
      <div className="min-h-full bg-gray-50 relative w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/40 to-green-50/30 -z-10"></div>
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-300/15 to-green-300/12 rounded-full blur-3xl animate-float opacity-30"></div>
          <div 
            className="absolute bottom-1/3 left-1/5 w-36 h-36 bg-gradient-to-br from-green-300/12 to-blue-300/10 rounded-full blur-2xl animate-float opacity-25" 
            style={{ animationDelay: '3s', animationDuration: '6s' }}
          ></div>
          <div 
            className="absolute top-1/2 right-1/5 w-32 h-32 bg-gradient-to-br from-purple-300/10 to-blue-300/12 rounded-full blur-3xl animate-float opacity-20" 
            style={{ animationDelay: '1s', animationDuration: '8s' }}
          ></div>
        </div>

        <div className="relative bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-xl w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 via-transparent to-green-100/30"></div>
          
          <div className="relative z-10 p-4 sm:p-6 pb-6 sm:pb-8 w-full">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 sm:hidden"
                >
                  <Menu className="h-5 w-5 text-gray-600" />
                </Button>
                
                <div className="relative group">
                  <img 
                    src={kaniroLogo} 
                    alt="Kaniro Financial Services" 
                    className="h-7 sm:h-8 w-auto group-hover:scale-105 transition-all duration-300" 
                  />
                  
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full shadow-sm border-2 border-white">
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentScreen('notifications')}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 sm:p-2.5 rounded-xl transition-all duration-200"
                  >
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  {hasActiveData && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs sm:text-xs text-white font-bold">2</span>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentScreen('profile')}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 sm:p-2.5 rounded-xl transition-all duration-200 group"
                  >
                    <User className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-200" />
                  </Button>
                  
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-500 rounded-full border-2 border-white">
                  </div>
                </div>
              </div>
            </div>

            {/* OneDabba Services */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-gray-900">OneDabba Services</h3>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="px-2 py-0.5 bg-blue-100/70 backdrop-blur-sm rounded-full border border-blue-200/60">
                    <span className="text-xs text-blue-700 font-bold">3 Active</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div 
                  onClick={() => setCurrentScreen('save-setup')}
                  className="relative bg-white/98 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/80 hover:shadow-xl hover:border-green-400/70 hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden cursor-pointer"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-green-500 to-emerald-600 rounded-l-xl shadow-sm"></div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200">
                      <PiggyBank className="h-5 w-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-bold text-gray-900">Dabba Save</h4>
                        <div className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Daily micro-deposits from ₹10</p>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 bg-green-50 px-2 py-1 rounded-lg border border-green-200/60">
                          <Coins className="h-2.5 w-2.5 text-green-600" />
                          <span className="text-xs text-green-700 font-bold">Min ₹10</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200/60">
                          <Shield className="h-2.5 w-2.5 text-emerald-600" />
                          <span className="text-xs text-emerald-700 font-bold">Secure</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm font-bold min-w-[80px] h-10">
                        Open
                      </button>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setCurrentScreen('pay-overdue-table')}
                  className="relative bg-white/98 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/80 hover:shadow-xl hover:border-blue-400/70 hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden cursor-pointer"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-l-xl shadow-sm"></div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-2.5 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-bold text-gray-900">Dabba Pay</h4>
                        <div className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Available</div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Flexible loan repayments from ₹100</p>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200/60">
                          <DollarSign className="h-2.5 w-2.5 text-blue-600" />
                          <span className="text-xs text-blue-700 font-bold">From ₹100</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-cyan-50 px-2 py-1 rounded-lg border border-cyan-200/60">
                          <Clock className="h-2.5 w-2.5 text-cyan-600" />
                          <span className="text-xs text-cyan-700 font-bold">Instant</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm font-bold min-w-[80px] h-10">
                        Pay
                      </button>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PayOverdueTableScreen = () => {
    const [selectedLoans, setSelectedLoans] = useState<number[]>([]);
    const [showQuickPay, setShowQuickPay] = useState(false);

    const calculatePaymentAmount = () => {
      if (selectedLoans.length === 0) return 0;
      const selectedLoanData = loanAccounts.filter(loan => selectedLoans.includes(loan.id));
      return selectedLoanData.reduce((sum, loan) => sum + loan.overdueAmount + loan.penaltyCharges, 0);
    };

    const handleQuickPay = (amount: number) => {
      setPaymentFlow({
        ...paymentFlow,
        selectedLoans,
        totalAmount: amount,
        paymentMode: 'full'
      });
      setCurrentScreen('pay-bank-selection');
    };

    return (
      <div className="min-h-full bg-gray-50 relative w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/40 to-green-50/30 -z-10"></div>

        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-xl w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 via-transparent to-green-100/30"></div>
          
          <div className="relative z-10 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentScreen('pay-dashboard')}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Button>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">Pay Overdue Loans</h1>
                  <p className="text-xs text-gray-600">Select loans and payment method</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentScreen('pay-calculator')}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-xl transition-all duration-200"
                >
                  <Calculator className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pb-8 space-y-4">
          {/* Loan selection interface here */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Select Loans to Pay</h3>
            
            <div className="space-y-3">
              {loanAccounts.map((loan) => {
                const isSelected = selectedLoans.includes(loan.id);
                const totalOverdueForLoan = loan.overdueAmount + loan.penaltyCharges;
                
                return (
                  <div
                    key={loan.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedLoans(prev => prev.filter(id => id !== loan.id));
                      } else {
                        setSelectedLoans(prev => [...prev, loan.id]);
                      }
                    }}
                    className={`relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer shadow-lg ${
                      isSelected
                        ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-green-200 scale-[1.02]'
                        : 'border-red-300 bg-gradient-to-r from-red-50 to-orange-50 hover:border-red-400 hover:shadow-red-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center mt-1">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          isSelected
                            ? 'bg-green-500 border-green-500 shadow-lg'
                            : 'border-gray-400 hover:border-green-400 bg-white'
                        }`}>
                          {isSelected ? (
                            <CheckCircle className="h-5 w-5 text-white" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="mb-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 text-base mb-1">{loan.loanType}</h4>
                              <p className="text-xs text-gray-600">{loan.bankName}</p>
                              <p className="text-xs text-gray-500">{loan.loanNumber}</p>
                            </div>
                            <div className="text-right ml-2">
                              <div className="bg-red-100 rounded-lg p-2 border border-red-200">
                                <div className="text-xs text-red-700 font-bold mb-1">OVERDUE AMOUNT</div>
                                <div className="text-xl font-bold text-red-800">₹{totalOverdueForLoan.toLocaleString()}</div>
                                <div className="text-xs text-red-600">{loan.daysOverdue} days</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="bg-blue-100/80 rounded-lg p-2 text-center border border-blue-200">
                            <div className="text-xs text-blue-600 font-semibold mb-1">Outstanding</div>
                            <div className="font-bold text-blue-800 text-sm">₹{loan.outstandingAmount.toLocaleString()}</div>
                          </div>
                          <div className="bg-purple-100/80 rounded-lg p-2 text-center border border-purple-200">
                            <div className="text-xs text-purple-600 font-semibold mb-1">Monthly EMI</div>
                            <div className="font-bold text-purple-800 text-sm">₹{loan.emiAmount.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Summary when loans selected */}
          {selectedLoans.length > 0 && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200 animate-fade-in">
              <div className="text-center mb-4">
                <h3 className="font-bold text-gray-900 text-lg mb-1">Payment Summary</h3>
                <p className="text-gray-600 text-sm">{selectedLoans.length} loan{selectedLoans.length !== 1 ? 's' : ''} selected</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200 mb-4 text-center relative overflow-hidden">
                <div className="text-sm text-red-600 mb-2">Total Overdue Amount</div>
                <div className="font-bold text-red-800 text-4xl mb-2">₹{calculatePaymentAmount().toLocaleString()}</div>
                <div className="text-xs text-red-600 bg-red-100 rounded-full px-3 py-1 inline-block">
                  Immediate action needed
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-gray-900 text-center">Choose Payment Method</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => {
                      setPaymentFlow({
                        ...paymentFlow,
                        selectedLoans,
                        totalAmount: calculatePaymentAmount(),
                        paymentMode: 'micro'
                      });
                      setCurrentScreen('pay-micro-installment');
                    }}
                    className="relative w-full p-4 rounded-2xl border-2 border-green-300 bg-gradient-to-r from-green-50 via-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300 group overflow-hidden"
                  >
                    <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full shadow-md border-2 border-white">
                      ⭐ RECOMMENDED
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <Repeat className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-bold text-green-800 text-lg">🎯 Micro Installments</div>
                        <div className="text-sm text-green-600">Small daily/weekly payments • Stress-free</div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-green-600 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setPaymentFlow({
                        ...paymentFlow,
                        selectedLoans,
                        totalAmount: calculatePaymentAmount(),
                        paymentMode: 'full'
                      });
                      setCurrentScreen('pay-bank-selection');
                    }}
                    className="relative w-full p-4 rounded-2xl border-2 border-blue-300 bg-gradient-to-r from-blue-50 via-blue-50 to-cyan-50 hover:shadow-xl transition-all duration-300 group overflow-hidden"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-bold text-blue-800 text-lg">💰 Pay Full Amount</div>
                        <div className="text-sm text-blue-600">Clear all overdue immediately</div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Simple placeholder screens
  const PayMicroInstallmentScreen = () => (
    <div className="min-h-full bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Micro Installment Setup</h2>
        <p className="text-gray-600 mb-6">Configure your micro payment plan</p>
        <Button onClick={() => setCurrentScreen('pay-bank-selection')}>
          Continue to Bank Selection
        </Button>
      </div>
    </div>
  );

  const PayBankSelectionScreen = () => (
    <div className="min-h-full bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Payment Source</h2>
        <p className="text-gray-600 mb-6">Choose your payment method</p>
        <Button onClick={() => setCurrentScreen('pay-confirmation')}>
          Continue to Confirmation
        </Button>
      </div>
    </div>
  );

  const PayConfirmationScreen = () => (
    <div className="min-h-full bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Payment</h2>
        <p className="text-gray-600 mb-6">Review and confirm your payment</p>
        <div className="space-y-3">
          <Button onClick={() => setCurrentScreen('dashboard')} className="w-full">
            Process Payment
          </Button>
          <Button variant="outline" onClick={() => setCurrentScreen('pay-overdue-table')} className="w-full">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );

  const PayCalculatorScreen = () => (
    <div className="min-h-full bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Calculator</h2>
        <p className="text-gray-600 mb-6">Calculate your payment options</p>
        <Button onClick={() => setCurrentScreen('pay-overdue-table')}>
          Back to Payments
        </Button>
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div className="min-h-full bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile</h2>
        <p className="text-gray-600 mb-6">Manage your account settings</p>
        <Button onClick={() => setCurrentScreen('dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );

  const NotificationsScreen = () => (
    <div className="min-h-full bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h2>
        <p className="text-gray-600 mb-6">View your notifications</p>
        <Button onClick={() => setCurrentScreen('dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );

  const SaveSetupScreen = () => (
    <div className="min-h-full bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Dabba Save Setup</h2>
        <p className="text-gray-600 mb-6">Setup your savings plan</p>
        <Button onClick={() => setCurrentScreen('dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    </div>
  );

  const screens = {
    splash: () => <div className="min-h-screen bg-gray-100 flex items-center justify-center">Splash Screen</div>,
    login: LoginScreen,
    dashboard: Dashboard,
    'save-setup': SaveSetupScreen,
    save: () => <div className="min-h-screen bg-gray-100 flex items-center justify-center">Save Screen</div>,
    'pay-overdue-table': PayOverdueTableScreen,
    'pay-micro-installment': PayMicroInstallmentScreen,
    'pay-bank-selection': PayBankSelectionScreen,
    'pay-confirmation': PayConfirmationScreen,
    'pay-calculator': PayCalculatorScreen,
    profile: ProfileScreen,
    notifications: NotificationsScreen,
    'save-withdraw': () => <div className="min-h-screen bg-gray-100 flex items-center justify-center">Withdraw Screen</div>
  };

  const CurrentScreen = screens[currentScreen] || LoginScreen;

  return (
    <div className="h-screen w-screen bg-slate-50 overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 -z-50"></div>
      
      <div className="flex-1 w-full max-w-md mx-auto bg-slate-50 relative flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <CurrentScreen />
        </div>
        
        {(currentScreen === 'dashboard' || currentScreen === 'save-setup' || currentScreen === 'pay-overdue-table' || currentScreen === 'profile' || currentScreen === 'notifications') && (
          <div className="flex-shrink-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl sm:hidden">
            <div className="grid grid-cols-5 gap-0">
              {[
                { id: 'home', icon: Home, label: 'Home', screen: 'dashboard' },
                { id: 'save', icon: PiggyBank, label: 'Save', screen: 'save-setup' },
                { id: 'pay', icon: PayIcon, label: 'Pay', screen: 'pay-overdue-table' },
                { id: 'search', icon: Search, label: 'Search', screen: 'dashboard' },
                { id: 'profile', icon: User, label: 'Profile', screen: 'profile' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveBottomTab(tab.id);
                    setCurrentScreen(tab.screen as Screen);
                  }}
                  className={`flex flex-col items-center justify-center py-3 px-2 transition-all duration-200 relative ${
                    activeBottomTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{tab.label}</span>
                  
                  {activeBottomTab === tab.id && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-b-full"></div>
                  )}
                </button>
              ))}
            </div>
            
            <div className="h-safe-bottom bg-white/95"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;