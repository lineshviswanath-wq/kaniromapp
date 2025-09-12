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

type Screen = 'splash' | 'onboarding' | 'login' | 'register' | 'dashboard' | 'save' | 'pay' | 'savepay' | 'profile' | 'save-setup' | 'save-frequency' | 'save-amount' | 'save-bank' | 'save-confirm' | 'save-first-deposit' | 'save-success' | 'save-dashboard' | 'save-withdraw' | 'save-kyc' | 'save-complete' | 'save-summary' | 'save-receipt' | 'save-autopay';

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
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    
    // Add safe area CSS variables
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --safe-area-inset-top: env(safe-area-inset-top);
        --safe-area-inset-right: env(safe-area-inset-right);
        --safe-area-inset-bottom: env(safe-area-inset-bottom);
        --safe-area-inset-left: env(safe-area-inset-left);
      }
    `;
    document.head.appendChild(style);
    
    // Prevent iOS bounce scrolling
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Update active bottom tab based on current screen
  useEffect(() => {
    if (currentScreen === 'dashboard') {
      setActiveBottomTab('home');
    } else if (currentScreen === 'save-setup' || currentScreen === 'save-bank' || currentScreen === 'save-confirm' || currentScreen === 'save-success') {
      setActiveBottomTab('save');
    } else if (currentScreen === 'pay') {
      setActiveBottomTab('pay');
    } else if (currentScreen === 'profile') {
      setActiveBottomTab('profile');
    }
  }, [currentScreen]);
  
  // User state management 
  const [hasActiveData, setHasActiveData] = useState(true); // Set to true to show existing customer data
  
  const [saveSetup, setSaveSetup] = useState({
    goal: hasActiveData ? 'Emergency Fund' : '',
    targetAmount: '',
    dailyAmount: '500',
    frequency: 'monthly',
    duration: '12',
    bankAccount: hasActiveData ? 'HDFC Bank' : '',
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

  // State for read more functionality
  const [expandedPromo, setExpandedPromo] = useState<number | null>(null);

  // Promotional carousel data with enhanced visuals - Memoized for performance
  const promoCards = useMemo(() => [
    {
      id: 1,
      title: "Special Offer",
      subtitle: "Get ₹100 Bonus",
      description: "Open your first DABBA Save and get instant ₹100 bonus on your first deposit! Start your financial journey with extra rewards and unlock exclusive benefits from day one.",
      subItems: ["₹100 instant bonus", "First deposit reward", "No minimum balance"],
      image: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzYXZpbmdzJTIwbW9uZXklMjBncm93dGh8ZW58MXx8fHwxNzU3MDA5MDU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-emerald-500 via-green-500 to-teal-600",
      badge: "Limited Time",
      accent: "from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      title: "Zero Fees",
      subtitle: "Save More Money",
      description: "No hidden charges or maintenance fees. 100% of your money grows with you. Complete transparency in all transactions with bank-grade security and real-time updates.",
      subItems: ["0% maintenance fees", "No hidden charges", "100% transparency"],
      image: "https://images.unsplash.com/photo-1642055509518-adafcad1d22e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW5raW5nJTIwZmluYW5jaWFsJTIwdGVjaG5vbG9neSUyMG1vYmlsZXxlbnwxfHx8fDE3NTcwMDkwNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-blue-500 via-cyan-500 to-indigo-600", 
      badge: "Always Free",
      accent: "from-cyan-300 to-blue-400"
    },
    {
      id: 3,
      title: "Refer & Earn",
      subtitle: "₹50 Per Friend",
      description: "Share the wealth! Earn ₹50 for each friend who joins and starts saving. Build your network and earn together with unlimited referral rewards and bonus incentives.",
      subItems: ["₹50 per referral", "Instant rewards", "Unlimited earning"],
      image: "https://images.unsplash.com/photo-1653378972336-103e1ea62721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWZlcnJhbCUyMG5ldHdvcmtpbmclMjBidXNpbmVzcyUyMGVhcm5pbmd8ZW58MXx8fHwxNzU3MDA5MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-purple-500 via-violet-500 to-fuchsia-600",
      badge: "Unlimited",
      accent: "from-pink-400 to-purple-500"
    },
    {
      id: 4,
      title: "Higher Returns",
      subtitle: "Up to 8% Interest",
      description: "Competitive interest rates that beat traditional savings accounts by far. Grow your wealth faster with premium returns, compound interest benefits, and flexible withdrawal options.",
      subItems: ["Up to 8% returns", "Better than banks", "Compound interest"],
      image: "https://images.unsplash.com/photo-1644810205147-dc105542b92a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY29pbnMlMjBtb25leSUyMGludGVyZXN0JTIwcmF0ZXN8ZW58MXx8fHwxNzU3MDA5MDcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      badge: "Guaranteed",
      accent: "from-yellow-300 to-orange-400"
    }
  ], []);

  // Auto-scroll promotional carousel every 4 seconds - Performance optimized
  useEffect(() => {
    if (currentScreen === 'dashboard') {
      const timer = setInterval(() => {
        setCurrentPromoIndex((prevIndex) => 
          prevIndex === 3 ? 0 : prevIndex + 1 // Fixed length instead of promoCards.length
        );
      }, 4000); // Increased from 3000 to 4000 for better performance
      return () => clearInterval(timer);
    }
  }, [currentScreen]); // Removed promoCards.length dependency

  const LoginScreen = () => {
    const [mpin, setMpin] = useState(['', '', '', '']);
    const [showFaceId, setShowFaceId] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    
    const handleMpinChange = useCallback((index: number, value: string) => {
      if (value.length <= 1 && /^\d*$/.test(value)) {
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
          // Simulate authentication process
          setTimeout(() => {
            setCurrentScreen('dashboard');
          }, 1200); // Increased time for better user feedback
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
        {/* Modern Background Effects - Matching Inner App Design */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle Professional Floating Elements */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-green-300/15 rounded-full blur-2xl animate-float opacity-40"></div>
          <div className="absolute bottom-1/3 left-1/5 w-28 h-28 bg-gradient-to-br from-green-300/15 to-blue-300/20 rounded-full blur-xl animate-float opacity-30" style={{animationDelay: '3s', animationDuration: '8s'}}></div>
          <div className="absolute top-1/2 right-1/5 w-24 h-24 bg-gradient-to-br from-purple-300/15 to-blue-300/20 rounded-full blur-xl animate-float opacity-25" style={{animationDelay: '1s', animationDuration: '6s'}}></div>
          
          {/* Professional Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          {/* Modern Ambient Layers */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/10 via-transparent to-green-200/8"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-200/5 via-transparent to-blue-200/10"></div>
        </div>

        {/* Main Container - Modern Mobile Design */}
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          {/* Clean Header with Logo */}
          <div className="px-4 sm:px-6 pt-6 sm:pt-8 pb-4">
            {/* Top Left Kaniro Logo */}
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

            {/* Welcome Section */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600 text-sm">Secure access to your financial future</p>
            </div>

            {/* Unified Login Frame */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/80 flex-1 flex flex-col relative overflow-hidden">
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-green-50/20 opacity-50"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/15 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-200/10 to-transparent rounded-full blur-xl"></div>
              
              <div className="relative z-10 p-6 flex-1 flex flex-col">
                {/* Biometric Section */}
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

                {/* MPIN Section - Integrated */}
                <div className="flex-1 flex flex-col">
                  {/* MPIN Header */}
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl shadow-lg mb-2 relative">
                      <Lock className="h-5 w-5 text-white drop-shadow-lg" />
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm">Enter MPIN</h4>
                  </div>

                  {/* MPIN Input */}
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

                  {/* Status Display */}
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

                  {/* Alternative Options - Compact */}
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
                        <div className="w-3 h-3 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-full flex items-center justify-center">
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

              {/* Compact Security Footer */}
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
                
                <div className="text-center mt-3 pt-3 border-t border-gray-200/60">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse"></div>
                    <p className="text-xs font-bold text-gray-700">Secured by Kaniro Financial Services</p>
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  </div>
                  
                  {/* Sign Up Link */}
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">New to Kaniro? </span>
                    <button 
                      onClick={() => setCurrentScreen('register')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 underline transition-colors duration-200"
                    >
                      Sign up here
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-xs text-gray-500 font-semibold">Licensed</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span className="text-xs text-gray-500 font-semibold">Regulated</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span className="text-xs text-gray-500 font-semibold">Trusted</span>
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
      <div className="min-h-full bg-gray-200 relative w-full">
        {/* Refined Darker Background - Perfect Balance */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-slate-200 to-gray-300/90 -z-10"></div>
        
        {/* Enhanced Sophisticated Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Enhanced Floating Orbs with More Presence */}
          <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-300/35 to-green-300/30 rounded-full blur-3xl animate-float opacity-60"></div>
          <div className="absolute bottom-1/3 left-1/5 w-36 h-36 bg-gradient-to-br from-green-300/30 to-blue-300/25 rounded-full blur-2xl animate-float opacity-50" style={{animationDelay: '3s', animationDuration: '6s'}}></div>
          <div className="absolute top-1/2 right-1/5 w-32 h-32 bg-gradient-to-br from-purple-300/25 to-blue-300/30 rounded-full blur-3xl animate-float opacity-45" style={{animationDelay: '1s', animationDuration: '8s'}}></div>
          
          {/* Enhanced Texture Pattern */}
          <div className="absolute inset-0 opacity-12">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          {/* Enhanced Depth Layers */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/18 via-transparent to-green-200/15"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-200/12 via-transparent to-blue-200/15"></div>
        </div>

        {/* Enhanced Header Area - Perfect Contrast */}
        <div className="relative bg-white/90 backdrop-blur-xl border-b border-gray-400/60 shadow-xl w-full">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/60 via-transparent to-green-100/50"></div>
          
          {/* Clean Header Content */}
          <div className="relative z-10 p-4 sm:p-6 pb-6 sm:pb-8 w-full">
            {/* Mobile App Header with Hamburger Menu */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              {/* Left - Hamburger Menu & Logo */}
              <div className="flex items-center space-x-3">
                {/* Hamburger Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 sm:hidden"
                >
                  <Menu className="h-5 w-5 text-gray-600" />
                </Button>
                
                {/* Clean Kaniro Logo */}
                <div className="relative group">
                  <img 
                    src={kaniroLogo} 
                    alt="Kaniro Financial Services" 
                    className="h-7 sm:h-8 w-auto group-hover:scale-105 transition-all duration-300" 
                  />
                  
                  {/* Simple Status Indicator */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full shadow-sm border-2 border-white">
                  </div>
                </div>
              </div>

              {/* Right - Clean Notification & Profile Icons */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Clean Notification Bell */}
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 sm:p-2.5 rounded-xl transition-all duration-200"
                  >
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  {hasActiveData && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-[10px] sm:text-xs text-white font-bold">2</span>
                    </div>
                  )}
                </div>

                {/* Clean User Profile Button */}
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 sm:p-2.5 rounded-xl transition-all duration-200"
                  >
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  
                  {/* Simple Online Status */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full border-2 border-white">
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Slide-out Menu */}
            {showMobileMenu && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
                  onClick={() => setShowMobileMenu(false)}
                ></div>
                
                {/* Menu Panel */}
                <div className="fixed top-0 left-0 h-full w-4/5 max-w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50 sm:hidden animate-fade-in">
                  <div className="p-6">
                    {/* Menu Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-3">
                        <img src={kaniroLogo} alt="Kaniro" className="h-8 w-auto" />
                        <div>
                          <h2 className="font-bold text-gray-900">Kaniro</h2>
                          <p className="text-xs text-gray-600">Financial Services</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowMobileMenu(false)}
                        className="p-2 hover:bg-gray-100 rounded-xl"
                      >
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                      </Button>
                    </div>

                    {/* User Profile Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 mb-6 border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{userProfile.name}</h3>
                          <p className="text-xs text-gray-600">Member since {userProfile.memberSince}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-2">
                      {[
                        { icon: Home, label: 'Dashboard', screen: 'dashboard' },
                        { icon: PiggyBank, label: 'Dabba Save', screen: 'save-setup' },
                        { icon: PayIcon, label: 'Dabba Pay', screen: 'pay' },
                        { icon: Target, label: 'Goals & Rewards', screen: 'profile' },
                        { icon: Calculator, label: 'Calculators', screen: 'profile' },
                        { icon: FileText, label: 'Statements', screen: 'profile' },
                        { icon: HelpCircle, label: 'Help & Support', screen: 'profile' },
                        { icon: Settings, label: 'Settings', screen: 'profile' }
                      ].map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentScreen(item.screen as Screen);
                            setShowMobileMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg">
                            <item.icon className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-semibold text-gray-900">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Logout Button */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <button
                        onClick={() => setCurrentScreen('login')}
                        className="w-full flex items-center space-x-3 p-3 rounded-xl bg-red-50 hover:bg-red-100 transition-colors duration-200"
                      >
                        <div className="p-2 bg-red-500 rounded-lg">
                          <ArrowLeft className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-semibold text-red-700">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Enhanced Financial Overview Section */}
            {hasActiveData && (
              <div className="mb-8">
                {/* Welcome Message & Quick Insights - Enhanced Contrast */}
                <div className="bg-gradient-to-r from-white/98 via-blue-50/40 to-green-50/35 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-gray-300/80 mb-6 relative overflow-hidden">
                  {/* Enhanced Background Pattern */}
                  <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-2 right-4 w-20 h-20 bg-gradient-to-br from-blue-300/45 to-green-300/35 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-2 left-6 w-16 h-16 bg-gradient-to-tl from-green-300/40 to-blue-300/30 rounded-full blur-xl"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Good Morning, {userProfile.name.split(' ')[0]}! 👋</h2>
                        <p className="text-sm text-gray-600">Your financial journey is progressing well</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Member Since</div>
                        <div className="text-sm font-bold text-blue-600">{userProfile.memberSince}</div>
                      </div>
                    </div>
                    
                    {/* Quick Achievement - Refined Light Theme */}
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50/80 to-emerald-50/70 backdrop-blur-sm rounded-xl p-3 border border-green-200/60">
                      <div className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-lg">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-bold text-green-800">23-day saving streak! </span>
                        <span className="text-xs text-green-600">Keep it up!</span>
                      </div>
                      <div className="text-xs text-green-600 font-bold">+₹50 bonus</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Status Cards - Mobile Optimized */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 mb-6">
                  {/* Total Deposit - Mobile Optimized */}
                  <div className="group cursor-pointer">
                    <div className="relative bg-gradient-to-br from-white/98 via-green-50/35 to-white/95 backdrop-blur-xl rounded-xl p-3 sm:p-4 shadow-xl border border-gray-300/80 hover:shadow-green-300/70 hover:shadow-xl hover:border-green-400/70 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                      {/* Left Accent */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-emerald-600 rounded-l-xl"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl shadow-md">
                            <Wallet className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                          </div>
                          <div className="p-0.5 sm:p-1 bg-green-100/70 rounded-full">
                            <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600" />
                          </div>
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-600 mb-1 font-semibold">Total Deposit</div>
                        <div className="text-sm sm:text-lg font-bold text-gray-900 mb-1">₹{savingsData.totalDeposits.toLocaleString()}</div>
                        <div className="flex items-center space-x-1">
                          <span className="text-[9px] sm:text-xs text-green-600 font-bold">+8.2% growth</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Savings - Mobile Optimized */}
                  <div className="group cursor-pointer">
                    <div className="relative bg-gradient-to-br from-white/98 via-blue-50/35 to-white/95 backdrop-blur-xl rounded-xl p-3 sm:p-4 shadow-xl border border-gray-300/80 hover:shadow-blue-300/70 hover:shadow-xl hover:border-blue-400/70 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                      {/* Left Accent */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-l-xl"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg sm:rounded-xl shadow-md">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                          </div>
                          <div className="p-0.5 sm:p-1 bg-blue-100/70 rounded-full">
                            <Repeat className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-blue-600" />
                          </div>
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-600 mb-1 font-semibold">This Month</div>
                        <div className="text-sm sm:text-lg font-bold text-gray-900 mb-1">₹1,550</div>
                        <div className="flex items-center space-x-1">
                          <span className="text-[9px] sm:text-xs text-blue-600 font-bold">31 deposits</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Goals Progress - Full width on mobile, hide on small screens */}
                  <div className="group cursor-pointer hidden sm:block col-span-1">
                    <div className="relative bg-gradient-to-br from-white/98 via-purple-50/35 to-white/95 backdrop-blur-xl rounded-xl p-3 sm:p-4 shadow-xl border border-gray-300/80 hover:shadow-purple-300/70 hover:shadow-xl hover:border-purple-400/70 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                      {/* Left Accent */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-violet-600 rounded-l-xl"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg sm:rounded-xl shadow-md">
                            <Target className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                          </div>
                          <div className="p-0.5 sm:p-1 bg-purple-100/70 rounded-full">
                            <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-purple-600" />
                          </div>
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-600 mb-1 font-semibold">Goal Progress</div>
                        <div className="text-sm sm:text-lg font-bold text-gray-900 mb-1">32%</div>
                        <div className="flex items-center space-x-1">
                          <div className="flex-1 bg-gray-300/90 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-purple-500 to-violet-600 h-1.5 rounded-full shadow-lg" style={{width: '32%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Goal Progress Section - Only visible on small screens */}
            {hasActiveData && (
              <div className="mb-6 sm:hidden">
                <div className="relative bg-gradient-to-r from-white/98 via-purple-50/35 to-white/95 backdrop-blur-xl rounded-xl p-4 shadow-xl border border-gray-300/80">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-violet-600 rounded-l-xl"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg shadow-md">
                          <Target className="h-3 w-3 text-white" />
                        </div>
                        <div className="text-xs text-gray-600 font-semibold">Goal Progress</div>
                      </div>
                      <div className="text-lg font-bold text-gray-900">32%</div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-300/90 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-violet-600 h-2 rounded-full shadow-lg" style={{width: '32%'}}></div>
                      </div>
                      <div className="text-xs text-purple-600 font-bold">Emergency Fund</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OneDabba Services - Clean Section Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <h3 className="font-bold text-gray-900 text-lg">OneDabba Services</h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                  <div className="px-3 py-1 bg-blue-100/70 backdrop-blur-sm rounded-full border border-blue-200/60">
                    <span className="text-xs text-blue-700 font-semibold">3 Active</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Dabba Save Card - Beautiful Enhanced Design */}
                <div 
                  className="relative bg-gradient-to-r from-green-50/80 via-white to-white rounded-2xl p-6 shadow-lg border border-gray-200/60 hover:shadow-2xl hover:border-green-400 hover:shadow-green-200/60 hover:-translate-y-1 transition-all duration-400 group overflow-hidden"
                >
                  {/* Beautiful Left Accent Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-green-500 via-emerald-500 to-green-600 rounded-l-2xl group-hover:w-2 transition-all duration-300"></div>
                  
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                    <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-green-100/40 to-emerald-100/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-4 right-8 w-16 h-16 bg-gradient-to-tl from-emerald-100/30 to-green-100/10 rounded-full blur-xl"></div>
                  </div>
                  
                  <div className="relative flex items-center space-x-4">
                    {/* Enhanced Icon Container */}
                    <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-400 border border-green-400/20">
                      <PiggyBank className="h-8 w-8 text-white drop-shadow-sm" />
                      
                      {/* Glowing Ring */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400 scale-125"></div>
                      
                      {/* Success Indicator */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                    </div>
                    
                    {/* Enhanced Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-green-800 bg-clip-text text-transparent">Dabba Save</h4>
                        <div className="px-2 py-0.5 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                          Active
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">Daily micro-deposits starting from ₹10</p>
                      
                      {/* Enhanced Feature Tags */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="flex items-center space-x-1.5 bg-gradient-to-r from-green-50 to-emerald-50 px-2.5 py-1.5 rounded-xl border border-green-200/60">
                          <div className="p-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                            <Coins className="h-2.5 w-2.5 text-white" />
                          </div>
                          <span className="text-xs text-green-700 font-bold">Min ₹10</span>
                        </div>
                        <div className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-50 to-green-50 px-2.5 py-1.5 rounded-xl border border-emerald-200/60">
                          <div className="p-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full">
                            <Shield className="h-2.5 w-2.5 text-white" />
                          </div>
                          <span className="text-xs text-emerald-700 font-bold">Secure</span>
                        </div>
                      </div>
                      
                      {/* Enhanced Action Button */}
                      <div className="flex justify-center">
                        <button 
                          onClick={() => setCurrentScreen('save-setup')}
                          className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 group/btn whitespace-nowrap"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span className="text-xs font-bold">Open a new Dabba</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Enhanced Arrow with Gradient */}
                    <div className="bg-gradient-to-br from-gray-50 to-green-50/30 group-hover:from-green-100 group-hover:to-emerald-100 rounded-2xl p-3 border border-gray-200 group-hover:border-green-300 transition-all duration-300 shadow-sm group-hover:shadow-md">
                      <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-green-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                  
                  {/* Subtle Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
                </div>

                {/* Dabba Pay Card - Beautiful Enhanced Design */}
                <div 
                  className="relative bg-gradient-to-r from-blue-50/80 via-white to-white rounded-2xl p-6 shadow-lg border border-gray-200/60 hover:shadow-2xl hover:border-blue-400 hover:shadow-blue-200/60 hover:-translate-y-1 transition-all duration-400 group overflow-hidden"
                >
                  {/* Beautiful Left Accent Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-600 rounded-l-2xl group-hover:w-2 transition-all duration-300"></div>
                  
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                    <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-blue-100/40 to-cyan-100/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-4 right-8 w-16 h-16 bg-gradient-to-tl from-cyan-100/30 to-blue-100/10 rounded-full blur-xl"></div>
                  </div>
                  
                  <div className="relative flex items-center space-x-4">
                    {/* Enhanced Icon Container */}
                    <div className="relative bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-400 border border-blue-400/20">
                      <CreditCard className="h-8 w-8 text-white drop-shadow-sm" />
                      
                      {/* Glowing Ring */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400 scale-125"></div>
                      
                      {/* Success Indicator */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                    </div>
                    
                    {/* Enhanced Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">Dabba Pay</h4>
                        <div className="px-2 py-0.5 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                          Available
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">Flexible loan repayments from ₹100</p>
                      
                      {/* Enhanced Feature Tags */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 px-2.5 py-1.5 rounded-xl border border-blue-200/60">
                          <div className="p-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                            <DollarSign className="h-2.5 w-2.5 text-white" />
                          </div>
                          <span className="text-xs text-blue-700 font-bold">From ₹100</span>
                        </div>
                        <div className="flex items-center space-x-1.5 bg-gradient-to-r from-cyan-50 to-blue-50 px-2.5 py-1.5 rounded-xl border border-cyan-200/60">
                          <div className="p-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full">
                            <Clock className="h-2.5 w-2.5 text-white" />
                          </div>
                          <span className="text-xs text-cyan-700 font-bold">Instant</span>
                        </div>
                      </div>
                      
                      {/* Enhanced Action Buttons */}
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-3 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 group/btn">
                          <CreditCard className="h-3.5 w-3.5" />
                          <span className="text-xs font-bold">Pay</span>
                        </button>
                        <button className="flex items-center space-x-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-3 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 group/btn">
                          <Calendar className="h-3.5 w-3.5" />
                          <span className="text-xs font-bold">Schedule</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Enhanced Arrow with Gradient */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 group-hover:from-blue-100 group-hover:to-cyan-100 rounded-2xl p-3 border border-gray-200 group-hover:border-blue-300 transition-all duration-300 shadow-sm group-hover:shadow-md">
                      <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                  
                  {/* Subtle Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
                </div>

                {/* Dabba Save & Pay Card - Beautiful Enhanced Design */}
                <div 
                  className="relative bg-gradient-to-r from-purple-50/80 via-white to-white rounded-2xl p-6 shadow-lg border border-gray-200/60 hover:shadow-2xl hover:border-purple-400 hover:shadow-purple-200/60 hover:-translate-y-1 transition-all duration-400 group overflow-hidden"
                >
                  {/* Beautiful Left Accent Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-500 via-violet-500 to-purple-600 rounded-l-2xl group-hover:w-2 transition-all duration-300"></div>
                  
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                    <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-purple-100/40 to-violet-100/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-4 right-8 w-16 h-16 bg-gradient-to-tl from-violet-100/30 to-purple-100/10 rounded-full blur-xl"></div>
                  </div>
                  
                  <div className="relative flex items-center space-x-4">
                    {/* Enhanced Icon Container */}
                    <div className="relative bg-gradient-to-br from-purple-500 via-violet-500 to-purple-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-400 border border-purple-400/20">
                      <Zap className="h-8 w-8 text-white drop-shadow-sm" />
                      
                      {/* Glowing Ring */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-violet-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400 scale-125"></div>
                      
                      {/* Success Indicator */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
                    </div>
                    
                    {/* Enhanced Content */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-purple-800 bg-clip-text text-transparent">Dabba Save & Pay</h4>
                        <div className="px-2 py-0.5 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-700 text-xs font-bold rounded-full border border-purple-200">
                          Premium
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">Automated savings with smart payments</p>
                      
                      {/* Enhanced Feature Tags */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-50 to-violet-50 px-2.5 py-1.5 rounded-xl border border-purple-200/60">
                          <div className="p-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full">
                            <Repeat className="h-2.5 w-2.5 text-white" />
                          </div>
                          <span className="text-xs text-purple-700 font-bold">Auto</span>
                        </div>
                        <div className="flex items-center space-x-1.5 bg-gradient-to-r from-violet-50 to-purple-50 px-2.5 py-1.5 rounded-xl border border-violet-200/60">
                          <div className="p-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full">
                            <Target className="h-2.5 w-2.5 text-white" />
                          </div>
                          <span className="text-xs text-violet-700 font-bold">Smart</span>
                        </div>
                      </div>
                      
                      {/* Enhanced Action Buttons */}
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1.5 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white px-3 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 group/btn">
                          <Calendar className="h-3.5 w-3.5" />
                          <span className="text-xs font-bold">Payments</span>
                        </button>
                        <button className="flex items-center space-x-1.5 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white px-3 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 group/btn">
                          <Gift className="h-3.5 w-3.5" />
                          <span className="text-xs font-bold">Rewards</span>
                        </button>
                      </div>
                    </div>
                    
                    {/* Enhanced Arrow with Gradient */}
                    <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 group-hover:from-purple-100 group-hover:to-violet-100 rounded-2xl p-3 border border-gray-200 group-hover:border-purple-300 transition-all duration-300 shadow-sm group-hover:shadow-md">
                      <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                  
                  {/* Subtle Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Enhanced Recent Activity & Promotions Section */}
            <div className="space-y-6">
              {/* Recent Activity Widget - Enhanced Contrast */}
              {hasActiveData && (
                <div className="bg-white/98 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-gray-300/80 relative overflow-hidden">
                  {/* Enhanced Background Pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-3 right-6 w-16 h-16 bg-gradient-to-br from-blue-300/45 to-green-300/35 rounded-full blur-xl"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>Recent Activity</span>
                      </h3>
                      <button className="text-xs text-blue-600 font-bold hover:text-blue-700 transition-colors">
                        View All
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {recentTransactions.slice(0, 3).map((transaction, index) => (
                        <div key={transaction.id} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100/90 transition-colors duration-200 group">
                          <div className={`p-2 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-200 ${
                            transaction.type === 'credit' 
                              ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                              : 'bg-gradient-to-br from-red-500 to-rose-600'
                          }`}>
                            {transaction.type === 'credit' ? (
                              <ArrowDownLeft className="h-4 w-4 text-white" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-white" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="text-sm font-bold text-gray-900">{transaction.description}</div>
                            <div className="text-xs text-gray-500">{transaction.date}</div>
                          </div>
                          
                          <div className="text-right">
                            <div className={`text-sm font-bold ${
                              transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                            </div>
                            <div className="text-xs text-gray-500 capitalize">{transaction.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Promotional Carousel */}
              <div className="relative">
                <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-300/70 bg-white/95">
                  <div 
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${currentPromoIndex * 100}%)` }}
                  >
                    {promoCards.map((promo, index) => (
                      <div
                        key={promo.id}
                        className={`w-full flex-shrink-0 relative min-h-[120px] sm:min-h-[140px] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group`}
                        onClick={() => {
                          console.log('Promo clicked:', promo.title);
                        }}
                      >
                        {/* Enhanced Background */}
                        <div className="absolute inset-0">
                          <img 
                            src={promo.image} 
                            alt={promo.title}
                            className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-r ${promo.gradient} opacity-80`}></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-black/25 to-black/45"></div>
                          
                          {/* Floating Elements */}
                          <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full blur-xl animate-float"></div>
                          <div className="absolute bottom-6 left-6 w-8 h-8 bg-white/10 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
                        </div>
                        
                        {/* Enhanced Content Layout */}
                        <div className="relative z-20 p-4 sm:p-6 h-full flex items-center text-white">
                          <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                            {/* Enhanced Icon Section */}
                            <div className="relative">
                              <div className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                <Star className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                              </div>
                              
                              {/* Glow Effect */}
                              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-125"></div>
                              
                              {/* Floating Badge */}
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white animate-bounce"></div>
                            </div>
                            
                            {/* Enhanced Content Section */}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-sm sm:text-lg font-bold text-white drop-shadow-lg">{promo.title}</h3>
                                <div className={`px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gradient-to-r ${promo.accent} text-white text-[10px] sm:text-xs font-bold rounded-full shadow-md border border-white/20`}>
                                  {promo.badge}
                                </div>
                              </div>
                              
                              <p className="text-xs sm:text-sm font-semibold text-white/95 mb-2 sm:mb-3 drop-shadow-md">
                                {promo.subtitle}
                              </p>

                              <div className="grid grid-cols-2 gap-1">
                                {promo.subItems.slice(0, 2).map((item, index) => (
                                  <div key={index} className="flex items-center space-x-1.5">
                                    <div className="p-0.5 bg-white/20 rounded-full">
                                      <CheckCircle className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-xs text-white/95 font-medium drop-shadow-sm">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Enhanced Action Arrow */}
                            <div className="relative">
                              <div className="bg-white/25 backdrop-blur-md rounded-2xl p-3 group-hover:bg-white/35 transition-all duration-300 shadow-lg border border-white/20">
                                <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300 drop-shadow-lg" />
                              </div>
                              
                              {/* Pulse Effect */}
                              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Enhanced Navigation Dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                    {promoCards.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPromoIndex(index)}
                        className={`transition-all duration-300 hover:scale-125 ${
                          index === currentPromoIndex 
                            ? 'w-8 h-2 bg-white rounded-full shadow-lg' 
                            : 'w-2 h-2 bg-white/60 hover:bg-white/80 rounded-full'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
                    <span className="text-xs text-white font-bold">
                      {currentPromoIndex + 1}/{promoCards.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content continues on clean background */}
        <div className="px-4 sm:px-6 pb-4">
          {/* Additional content space */}
          <div className="h-8"></div>
        </div>
      </div>
    );
  };

  // Innovative Dabba Challenge Setup Flow Components
  const SaveSetupScreen = () => {
    const [selectedPurpose, setSelectedPurpose] = useState('');
    
    const quickAmounts = [
      { daily: 10, weekly: 70, monthly: 300 },
      { daily: 25, weekly: 175, monthly: 750 },
      { daily: 50, weekly: 350, monthly: 1500 },
      { daily: 100, weekly: 700, monthly: 3000 }
    ];

    const purposes = [
      { id: 'emergency', name: 'Emergency Fund', icon: '🛡️' },
      { id: 'vacation', name: 'Vacation', icon: '✈️' },
      { id: 'gadget', name: 'New Gadget', icon: '📱' },
      { id: 'home', name: 'Home', icon: '🏠' },
      { id: 'education', name: 'Education', icon: '🎓' },
      { id: 'other', name: 'Other Goal', icon: '💰' }
    ];

    const getAmountForFrequency = (amounts: any) => {
      if (saveSetup.frequency === 'daily') return amounts.daily;
      if (saveSetup.frequency === 'weekly') return amounts.weekly;
      return amounts.monthly;
    };

    return (
      <div className="min-h-full w-full bg-gradient-to-br from-gray-100 via-blue-50 to-green-50">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
          <div className="p-4 sm:p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen('dashboard')}
                className="p-2 hover:bg-gray-100 rounded-xl"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Quick Dabba Setup</h1>
                <p className="text-sm text-gray-600">Start saving in under 2 minutes</p>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-1/3"></div>
              </div>
              <span className="text-xs text-gray-500 font-semibold">Step 1 of 3</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 pb-8">
          {/* Frequency Selection */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4">How often do you want to save?</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'daily', name: 'Daily', desc: '30 days', color: 'from-green-500 to-emerald-500' },
                { id: 'weekly', name: 'Weekly', desc: '12 weeks', color: 'from-blue-500 to-cyan-500' },
                { id: 'monthly', name: 'Monthly', desc: '12 months', color: 'from-purple-500 to-violet-500' }
              ].map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => setSaveSetup({...saveSetup, frequency: freq.id})}
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    saveSetup.frequency === freq.id
                      ? `bg-gradient-to-r ${freq.color} text-white shadow-xl scale-105`
                      : 'bg-white border border-gray-200 hover:border-green-400'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-bold">{freq.name}</div>
                    <div className={`text-xs ${saveSetup.frequency === freq.id ? 'text-white/80' : 'text-gray-500'}`}>
                      {freq.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Amount Selection */}
          {saveSetup.frequency && (
            <div className="mb-6 animate-fade-in">
              <h3 className="font-bold text-gray-900 mb-4 capitalize">
                Choose your {saveSetup.frequency} amount
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickAmounts.map((amounts, index) => {
                  const amount = getAmountForFrequency(amounts);
                  const isSelected = saveSetup.dailyAmount === amount.toString();
                  return (
                    <button
                      key={index}
                      onClick={() => setSaveSetup({...saveSetup, dailyAmount: amount.toString()})}
                      className={`p-4 rounded-xl transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl scale-105'
                          : 'bg-white border border-gray-200 hover:border-green-400'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-xl font-bold">₹{amount}</div>
                        <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                          per {saveSetup.frequency}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Purpose Selection */}
          {saveSetup.dailyAmount && (
            <div className="mb-6 animate-fade-in">
              <h3 className="font-bold text-gray-900 mb-4">What are you saving for?</h3>
              <div className="grid grid-cols-3 gap-3">
                {purposes.map((purpose) => (
                  <button
                    key={purpose.id}
                    onClick={() => {
                      setSelectedPurpose(purpose.name);
                      setSaveSetup({...saveSetup, goal: purpose.name});
                    }}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      selectedPurpose === purpose.name
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl scale-105'
                        : 'bg-white border border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{purpose.icon}</div>
                      <div className={`text-xs font-bold ${selectedPurpose === purpose.name ? 'text-white' : 'text-gray-700'}`}>
                        {purpose.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Preview */}
          {saveSetup.frequency && saveSetup.dailyAmount && saveSetup.goal && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-6 border border-green-200 animate-fade-in">
              <h4 className="font-bold text-green-800 mb-3 text-center">🎯 Your Dabba Challenge</h4>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div>
                  <div className="text-green-600">Frequency</div>
                  <div className="font-bold text-green-800 capitalize">{saveSetup.frequency}</div>
                </div>
                <div>
                  <div className="text-green-600">Amount</div>
                  <div className="font-bold text-green-800">₹{saveSetup.dailyAmount}</div>
                </div>
                <div>
                  <div className="text-green-600">Goal</div>
                  <div className="font-bold text-green-800">{saveSetup.goal}</div>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="mt-8">
            <Button
              onClick={() => setCurrentScreen('save-bank')}
              disabled={!saveSetup.frequency || !saveSetup.dailyAmount || !saveSetup.goal}
              className={`w-full h-14 rounded-xl font-bold text-base shadow-lg transition-all duration-300 ${
                (saveSetup.frequency && saveSetup.dailyAmount && saveSetup.goal)
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Bank Selection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const SaveBankScreen = () => {
    const banks = [
      { id: 'sbi', name: 'State Bank of India', short: 'SBI', logo: '🏦' },
      { id: 'hdfc', name: 'HDFC Bank', short: 'HDFC', logo: '🏪' },
      { id: 'icici', name: 'ICICI Bank', short: 'ICICI', logo: '🏢' },
      { id: 'axis', name: 'Axis Bank', short: 'AXIS', logo: '🏬' }
    ];

    return (
      <div className="min-h-full w-full bg-gradient-to-br from-gray-100 via-blue-50 to-green-50">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
          <div className="p-4 sm:p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen('save-setup')}
                className="p-2 hover:bg-gray-100 rounded-xl"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Select Bank</h1>
                <p className="text-sm text-gray-600">Choose your bank account</p>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-2/3"></div>
              </div>
              <span className="text-xs text-gray-500 font-semibold">Step 2 of 3</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 pb-8">
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Building2 className="h-4 w-4 text-blue-600 mr-2" />
              Select Your Bank
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {banks.map((bank) => {
                const isSelected = saveSetup.bankAccount === bank.name;
                return (
                  <button
                    key={bank.id}
                    onClick={() => setSaveSetup({...saveSetup, bankAccount: bank.name})}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl scale-105'
                        : 'bg-white border border-gray-200 hover:border-green-400 hover:shadow-lg'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{bank.logo}</div>
                      <div className={`font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {bank.short}
                      </div>
                      <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
                        8.5% interest
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick KYC */}
          {saveSetup.bankAccount && (
            <div className="bg-blue-50 rounded-2xl p-6 shadow-lg border border-blue-200 mb-6 animate-fade-in">
              <h4 className="font-bold text-blue-800 mb-4 text-center">Quick KYC Verification</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-blue-900 mb-2 block">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="w-full h-12 px-4 rounded-xl border-2 border-blue-200 focus:border-blue-500 bg-white"
                    defaultValue="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-blue-900 mb-2 block">PAN Number</label>
                  <input
                    type="text"
                    placeholder="Enter PAN number"
                    className="w-full h-12 px-4 rounded-xl border-2 border-blue-200 focus:border-blue-500 bg-white"
                    defaultValue="ABCDE1234F"
                  />
                </div>
                <div className="bg-white/70 rounded-xl p-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-700 font-semibold">
                      Instant verification via DigiLocker
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Continue Button */}
          <div className="mt-8">
            <Button
              onClick={() => setCurrentScreen('save-confirm')}
              disabled={!saveSetup.bankAccount}
              className={`w-full h-14 rounded-xl font-bold text-base shadow-lg transition-all duration-300 ${
                saveSetup.bankAccount
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Verify & Activate Challenge
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const SaveConfirmScreen = () => {
    const [isActivating, setIsActivating] = useState(false);

    const handleActivate = () => {
      setIsActivating(true);
      setTimeout(() => {
        setCurrentScreen('save-success');
      }, 2000);
    };

    return (
      <div className="min-h-full w-full bg-gradient-to-br from-gray-100 via-blue-50 to-green-50">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
          <div className="p-4 sm:p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen('save-bank')}
                className="p-2 hover:bg-gray-100 rounded-xl"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Confirm & Activate</h1>
                <p className="text-sm text-gray-600">Review and activate your challenge</p>
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-xs text-gray-500 font-semibold">Step 3 of 3</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 pb-8">
          {/* Challenge Summary */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 mb-6">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">🎯 Your Dabba Challenge</h3>
              <p className="text-gray-600 text-sm">Ready to activate</p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-green-800 capitalize">{saveSetup.frequency} Challenge</span>
                  <span className="font-bold text-green-900">₹{saveSetup.dailyAmount}</span>
                </div>
                <div className="text-sm text-green-600 mt-1">{saveSetup.goal}</div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-blue-800">Bank Account</span>
                  <span className="font-bold text-blue-900">{saveSetup.bankAccount}</span>
                </div>
                <div className="text-sm text-blue-600 mt-1">8.5% annual interest • KYC verified</div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <div className="text-center">
                  <div className="font-bold text-purple-900 mb-1">Challenge Projection</div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-purple-600">Total Savings</div>
                      <div className="font-bold text-purple-800">
                        ₹{(parseInt(saveSetup.dailyAmount) * (saveSetup.frequency === 'daily' ? 30 : saveSetup.frequency === 'weekly' ? 12 * 4 : 12)).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-purple-600">With Interest</div>
                      <div className="font-bold text-purple-800">
                        ₹{Math.round(parseInt(saveSetup.dailyAmount) * (saveSetup.frequency === 'daily' ? 30 : saveSetup.frequency === 'weekly' ? 12 * 4 : 12) * 1.085).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200">
            <div className="flex items-start space-x-3">
              <input type="checkbox" className="mt-1 rounded border-blue-300" defaultChecked />
              <div>
                <h4 className="font-bold text-blue-800 mb-2">📋 Quick Terms</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Auto-debit starts tomorrow at 6:00 AM</li>
                  <li>• 8.5% annual interest on your savings</li>
                  <li>• Cancel anytime through your bank or our app</li>
                  <li>• DICGC insured up to ₹5 lakhs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Activate Button */}
          <div className="mt-8">
            <Button
              onClick={handleActivate}
              disabled={isActivating}
              className={`w-full h-14 rounded-xl font-bold text-base shadow-lg transition-all duration-300 ${
                isActivating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-xl'
              }`}
            >
              {isActivating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Activating Challenge...</span>
                </div>
              ) : (
                <>
                  🚀 Activate My Challenge
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const SaveSuccessScreen = () => {
    return (
      <div className="min-h-full w-full bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 flex items-center justify-center">
        <div className="p-4 sm:p-6 max-w-md w-full">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 text-center">
            {/* Success Animation */}
            <div className="mb-6">
              <div className="inline-flex p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-xl animate-bounce">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Success Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">🎯 Challenge Activated!</h1>
            <p className="text-gray-600 mb-6">Your {saveSetup.frequency} Dabba Challenge is now live</p>

            {/* Challenge Summary */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 mb-6 border border-green-200">
              <h3 className="font-bold text-green-800 mb-3 text-center">
                🔥 {saveSetup.frequency.charAt(0).toUpperCase() + saveSetup.frequency.slice(1)} Dabba Challenge
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-green-600">Purpose</div>
                  <div className="font-bold text-green-800">{saveSetup.goal}</div>
                </div>
                <div>
                  <div className="text-green-600 capitalize">{saveSetup.frequency} Amount</div>
                  <div className="font-bold text-green-800">₹{saveSetup.dailyAmount}</div>
                </div>
                <div>
                  <div className="text-green-600">Duration</div>
                  <div className="font-bold text-green-800">
                    {saveSetup.frequency === 'daily' ? '30 Days' : saveSetup.frequency === 'weekly' ? '12 Weeks' : '12 Months'}
                  </div>
                </div>
                <div>
                  <div className="text-green-600">Bank</div>
                  <div className="font-bold text-green-800">{saveSetup.bankAccount}</div>
                </div>
              </div>
            </div>

            {/* Challenge Rules */}
            <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">🎯 Challenge Rules</h4>
              <ul className="text-sm text-blue-700 space-y-1 text-left">
                <li>• First debit: Tomorrow at 6:00 AM</li>
                <li>• Build your streak with consistent saving</li>
                <li>• Earn 8.5% annual interest + streak bonuses</li>
                <li>• Track daily progress in your dashboard</li>
                <li>• Complete challenge to unlock rewards!</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => setCurrentScreen('dashboard')}
                className="w-full h-12 rounded-xl font-bold text-base shadow-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-xl transition-all duration-300"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button
                onClick={() => setCurrentScreen('save-setup')}
                variant="outline"
                className="w-full h-12 rounded-xl font-bold text-base border-2 border-green-300 text-green-700 hover:bg-green-50 transition-all duration-300"
              >
                Create Another Goal
                <Plus className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const screens = {
    splash: () => <div className="min-h-screen bg-gray-100 flex items-center justify-center">Splash Screen</div>,
    login: LoginScreen,
    dashboard: Dashboard,
    'save-setup': SaveSetupScreen,
    'save-bank': SaveBankScreen,
    'save-confirm': SaveConfirmScreen,
    'save-success': SaveSuccessScreen,
    save: () => <div className="min-h-screen bg-gray-100 flex items-center justify-center">Save Screen</div>,
    pay: () => <div className="min-h-screen bg-gray-100 flex items-center justify-center">Pay Screen</div>,
    savepay: () => <div className="min-h-screen bg-gray-100 flex items-center justify-center">Save Pay Screen</div>,
    profile: () => <div className="min-h-screen bg-gray-100 flex items-center justify-center">Profile Screen</div>,
    'save-withdraw': () => <div className="min-h-screen bg-gray-100 flex items-center justify-center">Withdraw Screen</div>
  };

  const CurrentScreen = screens[currentScreen];

  return (
    <div className="h-screen w-full bg-slate-50 relative overflow-hidden flex flex-col">
      {/* Mobile App Base Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 -z-50"></div>
      
      {/* Main App Container - Flex Layout */}
      <div className="flex-1 w-full max-w-md mx-auto bg-slate-50 relative overflow-auto">
        <div className={`min-h-full ${
          (currentScreen === 'dashboard' || currentScreen === 'save-setup' || currentScreen === 'save' || currentScreen === 'pay' || currentScreen === 'profile') 
            ? 'pb-20' : 'pb-4'
        } sm:pb-4`}>
          <CurrentScreen />
        </div>
      </div>
      
      {/* Mobile Bottom Navigation - Fixed to Bottom */}
      {(currentScreen === 'dashboard' || currentScreen === 'save-setup' || currentScreen === 'save' || currentScreen === 'pay' || currentScreen === 'profile') && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-xl z-50 sm:hidden safe-area-inset-bottom">
          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-5 gap-1 p-3 pb-safe">
              {[
                { id: 'home', icon: Home, label: 'Home', screen: 'dashboard' },
                { id: 'save', icon: PiggyBank, label: 'Save', screen: 'save-setup' },
                { id: 'pay', icon: PayIcon, label: 'Pay', screen: 'pay' },
                { id: 'search', icon: Search, label: 'Search', screen: 'dashboard' },
                { id: 'profile', icon: User, label: 'Profile', screen: 'profile' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveBottomTab(tab.id);
                    if (tab.screen === 'dashboard') {
                      setCurrentScreen('dashboard');
                    } else {
                      setCurrentScreen(tab.screen as Screen);
                    }
                  }}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-all duration-200 ${
                    activeBottomTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-[9px] font-semibold">{tab.label}</span>
                  
                  {/* Active Indicator */}
                  {activeBottomTab === tab.id && (
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;