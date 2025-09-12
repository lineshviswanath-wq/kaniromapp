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

type Screen = 'splash' | 'onboarding' | 'login' | 'register' | 'dashboard' | 'save' | 'pay' | 'savepay' | 'profile' | 'notifications' | 'save-setup' | 'save-frequency' | 'save-amount' | 'save-bank' | 'save-confirm' | 'save-first-deposit' | 'save-success' | 'save-dashboard' | 'save-withdraw' | 'save-kyc' | 'save-complete' | 'save-summary' | 'save-receipt' | 'save-autopay';

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
    } else if (currentScreen === 'pay') {
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
          
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gray-100"></div>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/10 via-transparent to-green-200/8"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-200/5 via-transparent to-blue-200/10"></div>
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
                
                <div className="text-center mt-3 pt-3 border-t border-gray-200/60">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full animate-pulse"></div>
                    <p className="text-xs font-bold text-gray-700">Secured by Kaniro Financial Services</p>
                    <div 
                      className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-pulse" 
                      style={{ animationDelay: '0.5s' }}
                    ></div>
                  </div>
                  
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

            {/* Mobile Slide-out Menu */}
            {showMobileMenu && (
              <>
                <div 
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 sm:hidden"
                  onClick={() => setShowMobileMenu(false)}
                ></div>
                
                <div className="fixed top-0 left-0 h-full w-4/5 max-w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50 sm:hidden animate-fade-in">
                  <div className="p-6">
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

            {/* Financial Overview */}
            {hasActiveData && (
              <div className="mb-6">
                <div className="bg-gradient-to-r from-white/98 via-blue-50/40 to-green-50/35 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-gray-300/80 mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-br from-blue-300/40 to-green-300/30 rounded-full blur-xl"></div>
                    <div className="absolute bottom-2 left-6 w-12 h-12 bg-gradient-to-tl from-green-300/35 to-blue-300/25 rounded-full blur-lg"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-1">Good Morning, {userProfile.name.split(' ')[0]}! 👋</h2>
                        <p className="text-xs text-gray-600">Member since {userProfile.memberSince}</p>
                      </div>
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-green-50/80 to-emerald-50/70 backdrop-blur-sm rounded-lg px-2 py-1 border border-green-200/60">
                        <Award className="h-3 w-3 text-green-600" />
                        <span className="text-xs font-bold text-green-700">23-day streak</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="bg-gradient-to-br from-green-50/80 to-white/90 rounded-lg p-3 border border-green-200/50 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-emerald-600 rounded-l-lg"></div>
                        <div className="relative">
                          <div className="flex items-center justify-between mb-1">
                            <Wallet className="h-3 w-3 text-green-600" />
                            <TrendingUp className="h-2.5 w-2.5 text-green-500" />
                          </div>
                          <div className="text-xs text-gray-600 mb-1">Total Deposit</div>
                          <div className="font-bold text-gray-900">₹{savingsData.totalDeposits.toLocaleString()}</div>
                          <div className="text-xs text-green-600 font-semibold">+8.2%</div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50/80 to-white/90 rounded-lg p-3 border border-blue-200/50 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-600 rounded-l-lg"></div>
                        <div className="relative">
                          <div className="flex items-center justify-between mb-1">
                            <Calendar className="h-3 w-3 text-blue-600" />
                            <Repeat className="h-2.5 w-2.5 text-blue-500" />
                          </div>
                          <div className="text-xs text-gray-600 mb-1">This Month</div>
                          <div className="font-bold text-gray-900">₹1,550</div>
                          <div className="text-xs text-blue-600 font-semibold">31 deposits</div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50/80 to-white/90 rounded-lg p-3 border border-purple-200/50 relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-violet-600 rounded-l-lg"></div>
                        <div className="relative">
                          <div className="flex items-center justify-between mb-1">
                            <Target className="h-3 w-3 text-purple-600" />
                            <Star className="h-2.5 w-2.5 text-purple-500" />
                          </div>
                          <div className="text-xs text-gray-600 mb-1">Goal Progress</div>
                          <div className="font-bold text-gray-900">32%</div>
                          <div className="bg-gray-200 rounded-full h-1 mt-1">
                            <div className="bg-gradient-to-r from-purple-500 to-violet-600 h-1 rounded-full w-1/3"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-400/10 to-green-400/10 backdrop-blur-sm rounded-lg p-2 border border-emerald-200/40 text-center">
                      <span className="text-xs font-bold text-emerald-700">🎯 Emergency Fund: ₹6,153 remaining to reach goal</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                      <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-xs font-bold">
                        <Plus className="h-3 w-3 mr-1 inline" />
                        Open
                      </button>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setCurrentScreen('pay')}
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
                      <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-2.5 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-xs font-bold">
                        Pay
                      </button>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                  </div>
                </div>

                <div 
                  className="relative bg-white/98 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/80 hover:shadow-xl hover:border-purple-400/70 hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden cursor-pointer"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-500 to-violet-600 rounded-l-xl shadow-sm"></div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-2.5 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-bold text-gray-900">Dabba Save & Pay</h4>
                        <div className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">Premium</div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">Automated savings with smart payments</p>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 bg-purple-50 px-2 py-1 rounded-lg border border-purple-200/60">
                          <Repeat className="h-2.5 w-2.5 text-purple-600" />
                          <span className="text-xs text-purple-700 font-bold">Auto</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-violet-50 px-2 py-1 rounded-lg border border-violet-200/60">
                          <Target className="h-2.5 w-2.5 text-violet-600" />
                          <span className="text-xs text-violet-700 font-bold">Smart</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white px-2.5 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-xs font-bold">
                        Setup
                      </button>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity & Promotions */}
            <div className="space-y-6">
              {hasActiveData && (
                <div className="bg-white/98 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-gray-300/80 relative overflow-hidden">
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

              {/* Promotional Carousel */}
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
                        <div className="absolute inset-0">
                          <img 
                            src={promo.image} 
                            alt={promo.title}
                            className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-80"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-black/25 to-black/45"></div>
                          
                          <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 rounded-full blur-xl animate-float"></div>
                          <div 
                            className="absolute bottom-6 left-6 w-8 h-8 bg-white/10 rounded-full blur-lg animate-float" 
                            style={{ animationDelay: '1s' }}
                          ></div>
                        </div>
                        
                        <div className="relative z-20 p-4 sm:p-6 h-full flex items-center text-white">
                          <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                            <div className="relative">
                              <div className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                                <Star className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                              </div>
                              
                              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-125"></div>
                              
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white animate-bounce"></div>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="text-sm sm:text-lg font-bold text-white drop-shadow-lg">{promo.title}</h3>
                                <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs sm:text-xs font-bold rounded-full shadow-md border border-white/20">
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
                            
                            <div className="relative">
                              <div className="bg-white/25 backdrop-blur-md rounded-2xl p-3 group-hover:bg-white/35 transition-all duration-300 shadow-lg border border-white/20">
                                <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300 drop-shadow-lg" />
                              </div>
                              
                              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      </div>
                    ))}
                  </div>
                  
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
                  
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
                    <span className="text-xs text-white font-bold">
                      {currentPromoIndex + 1}/{promoCards.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Connect with Us Section */}
              {hasActiveData && (
                <div className="bg-white/98 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-gray-300/80 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-3 right-6 w-16 h-16 bg-gradient-to-br from-blue-300/40 to-green-300/30 rounded-full blur-xl"></div>
                    <div className="absolute bottom-3 left-6 w-12 h-12 bg-gradient-to-tl from-green-300/30 to-blue-300/25 rounded-full blur-lg"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center space-x-2 mb-2">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-md">
                          <Phone className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900">Connect with Us</h3>
                      </div>
                      <p className="text-xs text-gray-600">We're here to help you grow your wealth</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gradient-to-br from-blue-50/80 to-white/90 rounded-lg p-3 border border-blue-200/50 text-center">
                        <div className="inline-flex p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-md mb-2">
                          <HelpCircle className="h-3 w-3 text-white" />
                        </div>
                        <div className="text-xs font-bold text-gray-900 mb-1">24/7 Support</div>
                        <div className="text-xs text-blue-600 font-semibold">1800-123-KANIRO</div>
                        <div className="text-xs text-gray-500">support@kaniro.in</div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50/80 to-white/90 rounded-lg p-3 border border-green-200/50 text-center">
                        <div className="inline-flex p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-md mb-2">
                          <Phone className="h-3 w-3 text-white" />
                        </div>
                        <div className="text-xs font-bold text-gray-900 mb-1">WhatsApp</div>
                        <div className="text-xs text-green-600 font-semibold">+91 98765 00000</div>
                        <div className="text-xs text-gray-500">Quick assistance</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <button className="flex flex-col items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <Mail className="h-3 w-3 text-gray-600 mb-1" />
                        <span className="text-xs font-medium text-gray-700">Email</span>
                      </button>
                      
                      <button className="flex flex-col items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <FileText className="h-3 w-3 text-gray-600 mb-1" />
                        <span className="text-xs font-medium text-gray-700">Help</span>
                      </button>
                      
                      <button className="flex flex-col items-center p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <Building2 className="h-3 w-3 text-gray-600 mb-1" />
                        <span className="text-xs font-medium text-gray-700">Branch</span>
                      </button>
                    </div>

                    <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/40 rounded-lg p-3 border border-gray-200/60">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <img src={kaniroLogo} alt="Kaniro" className="h-4 w-auto" />
                          <span className="text-xs font-bold text-gray-800">Kaniro Financial Services</span>
                        </div>
                        
                        <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                          <Shield className="h-3 w-3 text-green-600" />
                          <span>Secure</span>
                          <div className="w-1 h-1 bg-gray-400 rounded-full mx-1"></div>
                          <Lock className="h-3 w-3 text-blue-600" />
                          <span>Encrypted</span>
                          <div className="w-1 h-1 bg-gray-400 rounded-full mx-1"></div>
                          <Award className="h-3 w-3 text-purple-600" />
                          <span>Trusted</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dabba Challenge Setup Flow Components
  const SaveSetupScreen = () => {
    const [selectedPurpose, setSelectedPurpose] = useState(saveSetup.goal || '');
    
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
            
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-1/3"></div>
              </div>
              <span className="text-xs text-gray-500 font-semibold">Step 1 of 3</span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 pb-8">
          {/* Debug section - Remove this later */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-xs">
            <div className="font-bold text-yellow-800 mb-2">Debug Info:</div>
            <div>Frequency: {saveSetup.frequency || 'None'}</div>
            <div>Amount: {saveSetup.dailyAmount || 'None'}</div>
            <div>selectedPurpose: {selectedPurpose || 'None'}</div>
            <div>saveSetup.goal: {saveSetup.goal || 'None'}</div>
            <div>Can proceed: {saveSetup.frequency && saveSetup.dailyAmount && (selectedPurpose || saveSetup.goal) ? 'Yes' : 'No'}</div>
          </div>

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

          {saveSetup.dailyAmount && (
            <div className="mb-6 animate-fade-in">
              <h3 className="font-bold text-gray-900 mb-4">What are you saving for?</h3>
              <div className="grid grid-cols-3 gap-3">
                {purposes.map((purpose) => (
                  <button
                    key={purpose.id}
                    onClick={() => {
                      console.log('Purpose clicked:', purpose.name); // Debug log
                      console.log('Current selectedPurpose:', selectedPurpose); // Debug log
                      console.log('Current saveSetup.goal:', saveSetup.goal); // Debug log
                      setSelectedPurpose(purpose.name);
                      setSaveSetup(prev => {
                        const updated = {...prev, goal: purpose.name};
                        console.log('Updated saveSetup:', updated); // Debug log
                        return updated;
                      });
                    }}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      selectedPurpose === purpose.name || saveSetup.goal === purpose.name
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl scale-105'
                        : 'bg-white border border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{purpose.icon}</div>
                      <div className={`text-xs font-bold ${(selectedPurpose === purpose.name || saveSetup.goal === purpose.name) ? 'text-white' : 'text-gray-700'}`}>
                        {purpose.name}
                      </div>
                      {(selectedPurpose === purpose.name || saveSetup.goal === purpose.name) && (
                        <div className="mt-1">
                          <div className="w-2 h-2 bg-white rounded-full mx-auto"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {saveSetup.frequency && saveSetup.dailyAmount && (selectedPurpose || saveSetup.goal) && (
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
                  <div className="font-bold text-green-800">{selectedPurpose || saveSetup.goal}</div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <Button
              onClick={() => setCurrentScreen('save-bank')}
              disabled={!saveSetup.frequency || !saveSetup.dailyAmount || (!selectedPurpose && !saveSetup.goal)}
              className={`w-full h-14 rounded-xl font-bold text-base shadow-lg transition-all duration-300 ${
                (saveSetup.frequency && saveSetup.dailyAmount && (selectedPurpose || saveSetup.goal))
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
    const [showComparison, setShowComparison] = useState(false);
    const [verificationStep, setVerificationStep] = useState('select'); // 'select', 'verify', 'confirmed'
    const [kycData, setKycData] = useState({
      pan: '',
      aadhar: '',
      aadharOtp: '',
      panVerified: false,
      aadharVerified: false,
      otpSent: false
    });

    const [allBanks] = useState([
      { 
        id: 'sbi', 
        name: 'State Bank of India', 
        short: 'SBI', 
        logo: '🏦',
        interestRate: 8.5,
        processingTime: '24 hours',
        features: ['Zero maintenance fee', 'Easy auto-debit', 'DICGC insured'],
        rating: 4.2,
        recommended: false
      },
      { 
        id: 'hdfc', 
        name: 'HDFC Bank', 
        short: 'HDFC', 
        logo: '🏪',
        interestRate: 8.7,
        processingTime: '12 hours',
        features: ['Premium support', 'Instant activation', 'Higher interest'],
        rating: 4.5,
        recommended: true
      },
      { 
        id: 'icici', 
        name: 'ICICI Bank', 
        short: 'ICICI', 
        logo: '🏢',
        interestRate: 8.3,
        processingTime: '18 hours',
        features: ['Digital first', 'Quick setup', 'Mobile banking'],
        rating: 4.3,
        recommended: false
      },
      { 
        id: 'axis', 
        name: 'Axis Bank', 
        short: 'AXIS', 
        logo: '🏬',
        interestRate: 8.6,
        processingTime: '16 hours',
        features: ['Flexible terms', 'Good support', 'Easy withdrawal'],
        rating: 4.1,
        recommended: false
      },
      { 
        id: 'kotak', 
        name: 'Kotak Mahindra Bank', 
        short: 'KOTAK', 
        logo: '🏛️',
        interestRate: 8.8,
        processingTime: '8 hours',
        features: ['Highest interest', 'Premium service', 'Quick processing'],
        rating: 4.6,
        recommended: false
      },
      { 
        id: 'yes', 
        name: 'Yes Bank', 
        short: 'YES', 
        logo: '🏢',
        interestRate: 8.4,
        processingTime: '20 hours',
        features: ['Good rates', 'Digital features', 'Easy management'],
        rating: 4.0,
        recommended: false
      },
      { 
        id: 'idfc', 
        name: 'IDFC First Bank', 
        short: 'IDFC', 
        logo: '🏛️',
        interestRate: 8.9,
        processingTime: '6 hours',
        features: ['Premium rates', 'Digital excellence', 'Fast processing'],
        rating: 4.4,
        recommended: false
      },
      { 
        id: 'indusind', 
        name: 'IndusInd Bank', 
        short: 'INDUS', 
        logo: '🏢',
        interestRate: 8.2,
        processingTime: '22 hours',
        features: ['Competitive rates', 'Branch network', 'Good service'],
        rating: 4.0,
        recommended: false
      },
      { 
        id: 'bandhan', 
        name: 'Bandhan Bank', 
        short: 'BANDHAN', 
        logo: '🏦',
        interestRate: 8.1,
        processingTime: '28 hours',
        features: ['Micro banking', 'Easy access', 'Rural focus'],
        rating: 3.9,
        recommended: false
      },
      { 
        id: 'rbl', 
        name: 'RBL Bank', 
        short: 'RBL', 
        logo: '🏪',
        interestRate: 8.3,
        processingTime: '20 hours',
        features: ['Tech-enabled', 'Quick services', 'Digital banking'],
        rating: 4.1,
        recommended: false
      },
      { 
        id: 'federal', 
        name: 'Federal Bank', 
        short: 'FEDERAL', 
        logo: '🏛️',
        interestRate: 8.4,
        processingTime: '18 hours',
        features: ['South Indian focus', 'Good rates', 'Reliable service'],
        rating: 4.2,
        recommended: false
      },
      { 
        id: 'karur', 
        name: 'Karur Vysya Bank', 
        short: 'KVB', 
        logo: '🏦',
        interestRate: 8.0,
        processingTime: '30 hours',
        features: ['Traditional banking', 'Stable rates', 'Regional focus'],
        rating: 3.8,
        recommended: false
      }
    ]);

    const [displayedBanks, setDisplayedBanks] = useState(6);
    const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'interest', 'rating', 'processing'

    const getSortedBanks = () => {
      let sortedBanks = [...allBanks];
      
      switch (sortBy) {
        case 'interest':
          sortedBanks.sort((a, b) => b.interestRate - a.interestRate);
          break;
        case 'rating':
          sortedBanks.sort((a, b) => b.rating - a.rating);
          break;
        case 'processing':
          sortedBanks.sort((a, b) => {
            const aHours = parseInt(a.processingTime);
            const bHours = parseInt(b.processingTime);
            return aHours - bHours;
          });
          break;
        case 'recommended':
        default:
          sortedBanks.sort((a, b) => {
            if (a.recommended && !b.recommended) return -1;
            if (!a.recommended && b.recommended) return 1;
            return b.interestRate - a.interestRate;
          });
      }
      
      return sortedBanks.slice(0, displayedBanks);
    };

    const banks = getSortedBanks();

    const selectedBank = banks.find(bank => bank.name === saveSetup.bankAccount);

    const handleBankSelect = (bankName: string) => {
      setSaveSetup({...saveSetup, bankAccount: bankName});
      setVerificationStep('select');
    };

    const proceedToVerification = () => {
      setVerificationStep('verify');
    };

    const verifyDocument = async (type: 'pan' | 'aadhar') => {
      // Simulate verification process
      setTimeout(() => {
        setKycData(prev => ({
          ...prev,
          [`${type}Verified`]: true
        }));
      }, 1500);
    };

    const allVerified = kycData.panVerified && kycData.aadharVerified;

    return (
      <div className="min-h-full w-full bg-gradient-to-br from-gray-100 via-blue-50 to-green-50">
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
          <div className="p-4 sm:p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (verificationStep === 'verify') {
                    setVerificationStep('select');
                  } else {
                    setCurrentScreen('save-setup');
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-xl"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {verificationStep === 'verify' ? 'KYC Verification' : 'Select Bank'}
                </h1>
                <p className="text-sm text-gray-600">
                  {verificationStep === 'verify' ? 'Complete your verification' : 'Choose your preferred bank partner'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-2/3"></div>
              </div>
              <span className="text-xs text-gray-500 font-semibold">Step 2 of 3</span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 pb-8">
          {verificationStep === 'select' && (
            <>
              {/* Bank Selection Header with Compare Toggle and Sort Options */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center">
                    <Building2 className="h-4 w-4 text-blue-600 mr-2" />
                    Choose Your Bank Partner
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowComparison(!showComparison)}
                    className="text-xs font-bold border-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                  >
                    {showComparison ? 'Hide' : 'Compare'} Banks
                  </Button>
                </div>

                {/* Sort and Filter Options */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xs font-bold text-gray-600">Sort by:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'recommended', label: 'Recommended', icon: '⭐' },
                      { id: 'interest', label: 'Interest Rate', icon: '📈' },
                      { id: 'rating', label: 'Rating', icon: '⭐' },
                      { id: 'processing', label: 'Speed', icon: '⚡' }
                    ].map((sort) => (
                      <button
                        key={sort.id}
                        onClick={() => setSortBy(sort.id)}
                        className={`px-2 py-1 rounded-lg text-xs font-bold transition-all duration-200 ${
                          sortBy === sort.id
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {sort.icon} {sort.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-2">
                  Showing {banks.length} of {allBanks.length} banks • Sorted by {sortBy.replace('_', ' ')}
                </div>
              </div>

              {/* Enhanced Comparison Table */}
              {showComparison && (
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200 mb-6 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900">Interest Rate Comparison</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600">Best:</span>
                      <span className="text-xs font-bold text-green-600">
                        {Math.max(...allBanks.map(b => b.interestRate))}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2">Bank</th>
                          <th className="text-center py-2">Interest</th>
                          <th className="text-center py-2">Processing</th>
                          <th className="text-center py-2">Rating</th>
                          <th className="text-center py-2">Benefits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {banks.map((bank) => (
                          <tr key={bank.id} className={`border-b border-gray-100 hover:bg-gray-50 ${
                            bank.interestRate === Math.max(...banks.map(b => b.interestRate)) ? 'bg-green-50' : ''
                          }`}>
                            <td className="py-2 flex items-center space-x-2">
                              <span>{bank.logo}</span>
                              <span className="font-semibold">{bank.short}</span>
                              {bank.recommended && (
                                <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">Best</span>
                              )}
                              {bank.interestRate === Math.max(...banks.map(b => b.interestRate)) && (
                                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">Highest</span>
                              )}
                            </td>
                            <td className="text-center py-2">
                              <span className={`font-bold ${
                                bank.interestRate >= 8.5 ? 'text-green-600' : 
                                bank.interestRate >= 8.0 ? 'text-blue-600' : 'text-gray-600'
                              }`}>
                                {bank.interestRate}%
                              </span>
                            </td>
                            <td className="text-center py-2">
                              <span className={`${
                                parseInt(bank.processingTime) <= 12 ? 'text-green-600 font-bold' : 
                                parseInt(bank.processingTime) <= 20 ? 'text-blue-600' : 'text-gray-600'
                              }`}>
                                {bank.processingTime}
                              </span>
                            </td>
                            <td className="text-center py-2">
                              <div className="flex items-center justify-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="font-semibold">{bank.rating}</span>
                              </div>
                            </td>
                            <td className="text-center py-2">
                              <div className="text-xs text-gray-600">
                                {bank.features[0]}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Interest Rate Analysis */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-bold text-blue-800 mb-2">💡 Interest Rate Analysis</h5>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-blue-600">Highest Rate</div>
                        <div className="font-bold text-blue-800">
                          {allBanks.find(b => b.interestRate === Math.max(...allBanks.map(bank => bank.interestRate)))?.short}: {Math.max(...allBanks.map(b => b.interestRate))}%
                        </div>
                      </div>
                      <div>
                        <div className="text-blue-600">Average Rate</div>
                        <div className="font-bold text-blue-800">
                          {(allBanks.reduce((sum, b) => sum + b.interestRate, 0) / allBanks.length).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Selection Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {banks.map((bank) => {
                  const isSelected = saveSetup.bankAccount === bank.name;
                  return (
                    <button
                      key={bank.id}
                      onClick={() => handleBankSelect(bank.name)}
                      className={`relative p-4 rounded-xl transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-xl scale-105'
                          : 'bg-white border border-gray-200 hover:border-green-400 hover:shadow-lg'
                      }`}
                    >
                      {bank.recommended && (
                        <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                          Best
                        </div>
                      )}
                      
                      <div className="text-center">
                        <div className="text-2xl mb-2">{bank.logo}</div>
                        <div className={`font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                          {bank.short}
                        </div>
                        <div className={`text-xs mb-1 ${isSelected ? 'text-white/90' : 'text-green-600'} font-bold`}>
                          {bank.interestRate}% interest
                        </div>
                        <div className={`text-xs ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                          {bank.processingTime}
                        </div>
                        
                        <div className="flex items-center justify-center space-x-1 mt-2">
                          <Star className={`h-3 w-3 ${isSelected ? 'text-yellow-200' : 'text-yellow-500'} fill-current`} />
                          <span className={`text-xs font-semibold ${isSelected ? 'text-white/90' : 'text-gray-700'}`}>
                            {bank.rating}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Selected Bank Details */}
              {selectedBank && (
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-4 shadow-lg border border-blue-200 mb-6 animate-fade-in">
                  <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                    <span className="text-2xl mr-2">{selectedBank.logo}</span>
                    {selectedBank.name} Selected
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="text-xs text-blue-600 mb-1">Interest Rate</div>
                      <div className="font-bold text-blue-900">{selectedBank.interestRate}% p.a.</div>
                    </div>
                    <div className="bg-white/70 rounded-lg p-3">
                      <div className="text-xs text-blue-600 mb-1">Processing Time</div>
                      <div className="font-bold text-blue-900">{selectedBank.processingTime}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-blue-600 mb-2">Key Features</div>
                    <div className="grid grid-cols-1 gap-1">
                      {selectedBank.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-blue-800 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Load More Banks */}
              {displayedBanks < allBanks.length && (
                <div className="text-center mb-6">
                  <Button
                    onClick={() => setDisplayedBanks(prev => Math.min(prev + 6, allBanks.length))}
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-xl font-bold"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Load More Banks ({allBanks.length - displayedBanks} remaining)
                  </Button>
                </div>
              )}

              <div className="mt-8">
                <Button
                  onClick={proceedToVerification}
                  disabled={!saveSetup.bankAccount}
                  className={`w-full h-14 rounded-xl font-bold text-base shadow-lg transition-all duration-300 ${
                    saveSetup.bankAccount
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Proceed to KYC Verification
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </>
          )}

          {verificationStep === 'verify' && (
            <div className="space-y-6 animate-fade-in">
              {/* Verification Progress */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 text-center">Complete KYC Verification</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className={`text-center p-4 rounded-lg border-2 ${kycData.panVerified ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                    <CreditCard className={`h-6 w-6 mx-auto mb-2 ${kycData.panVerified ? 'text-green-600' : 'text-gray-400'}`} />
                    <div className="text-xs font-bold">PAN Card</div>
                    {kycData.panVerified && <CheckCircle className="h-4 w-4 text-green-600 mx-auto mt-1" />}
                  </div>
                  <div className={`text-center p-4 rounded-lg border-2 ${kycData.aadharVerified ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                    <User className={`h-6 w-6 mx-auto mb-2 ${kycData.aadharVerified ? 'text-green-600' : 'text-gray-400'}`} />
                    <div className="text-xs font-bold">Aadhar Card</div>
                    {kycData.aadharVerified && <CheckCircle className="h-4 w-4 text-green-600 mx-auto mt-1" />}
                  </div>
                </div>
              </div>



              {/* PAN Verification */}
              <div className="bg-purple-50 rounded-2xl p-4 shadow-lg border border-purple-200">
                <h5 className="font-bold text-purple-800 mb-3 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  PAN Verification
                  {kycData.panVerified && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                </h5>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-bold text-purple-900 mb-1 block">PAN Number</label>
                    <input
                      type="text"
                      value={kycData.pan}
                      onChange={(e) => setKycData({...kycData, pan: e.target.value.toUpperCase()})}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      className="w-full h-10 px-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 bg-white text-sm uppercase"
                      disabled={kycData.panVerified}
                    />
                  </div>
                  {!kycData.panVerified && kycData.pan.length === 10 && (
                    <Button
                      onClick={() => verifyDocument('pan')}
                      size="sm"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Verify via Income Tax Portal
                    </Button>
                  )}
                </div>
              </div>

              {/* Aadhar Verification with OTP */}
              <div className="bg-orange-50 rounded-2xl p-4 shadow-lg border border-orange-200">
                <h5 className="font-bold text-orange-800 mb-3 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Aadhar Verification
                  {kycData.aadharVerified && <CheckCircle className="h-4 w-4 text-green-600 ml-2" />}
                </h5>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-bold text-orange-900 mb-1 block">Aadhar Number</label>
                    <input
                      type="text"
                      value={kycData.aadhar}
                      onChange={(e) => setKycData({...kycData, aadhar: e.target.value.replace(/\D/g, '')})}
                      placeholder="1234 5678 9012"
                      maxLength={12}
                      className="w-full h-10 px-3 rounded-lg border-2 border-orange-200 focus:border-orange-500 bg-white text-sm"
                      disabled={kycData.aadharVerified}
                    />
                  </div>
                  
                  {!kycData.aadharVerified && kycData.aadhar.length === 12 && !kycData.otpSent && (
                    <Button
                      onClick={() => {
                        // Simulate sending OTP
                        setKycData(prev => ({...prev, otpSent: true, aadharOtp: ''}));
                      }}
                      size="sm"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Send OTP via UIDAI
                    </Button>
                  )}
                  
                  {kycData.otpSent && !kycData.aadharVerified && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-bold text-orange-900 mb-1 block">Enter Aadhar OTP</label>
                        <input
                          type="text"
                          value={kycData.aadharOtp}
                          onChange={(e) => setKycData({...kycData, aadharOtp: e.target.value.replace(/\D/g, '')})}
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          className="w-full h-10 px-3 rounded-lg border-2 border-orange-200 focus:border-orange-500 bg-white text-sm"
                        />
                        <div className="text-xs text-orange-600 mt-1">OTP sent to mobile linked with Aadhar</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          onClick={() => verifyDocument('aadhar')}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={kycData.aadharOtp.length !== 6}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verify OTP
                        </Button>
                        
                        <Button
                          onClick={() => {
                            // Resend OTP simulation
                            setKycData(prev => ({...prev, aadharOtp: ''}));
                          }}
                          size="sm"
                          variant="outline"
                          className="border-orange-300 text-orange-700 hover:bg-orange-50"
                        >
                          <Repeat className="h-3 w-3 mr-1" />
                          Resend OTP
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Note */}
              <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                <div className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-green-800">Secure Verification</div>
                    <div className="text-xs text-green-700">PAN verified via Income Tax Portal and Aadhar via UIDAI with OTP. All data is encrypted and never stored.</div>
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <div className="mt-8">
                <Button
                  onClick={() => setCurrentScreen('save-confirm')}
                  disabled={!allVerified}
                  className={`w-full h-14 rounded-xl font-bold text-base shadow-lg transition-all duration-300 ${
                    allVerified
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {allVerified ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Proceed to Final Confirmation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  ) : (
                    'Complete All Verifications'
                  )}
                </Button>
              </div>
            </div>
          )}
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
            
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-full"></div>
              </div>
              <span className="text-xs text-gray-500 font-semibold">Step 3 of 3</span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 pb-8">
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
            <div className="mb-6">
              <div className="inline-flex p-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-xl animate-bounce">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">🎯 Challenge Activated!</h1>
            <p className="text-gray-600 mb-6">Your {saveSetup.frequency} Dabba Challenge is now live</p>

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

  const NotificationsScreen = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [notifications, setNotifications] = useState([
      {
        id: 1,
        type: 'success',
        category: 'dabba_save',
        title: 'Daily Deposit Successful',
        message: 'Your ₹50 daily deposit for Emergency Fund has been processed successfully.',
        time: '2 minutes ago',
        read: false,
        icon: '✅',
        amount: 50,
        account: 'Emergency Fund'
      },
      {
        id: 2,
        type: 'reminder',
        category: 'dabba_save',
        title: 'Upcoming Deposit Reminder',
        message: 'Your next deposit of ₹75 for Vacation Fund is scheduled for tomorrow at 6:30 AM.',
        time: '1 hour ago',
        read: false,
        icon: '⏰',
        amount: 75,
        account: 'Vacation Fund'
      },
      {
        id: 3,
        type: 'achievement',
        category: 'rewards',
        title: 'Streak Milestone Achieved! 🔥',
        message: 'Congratulations! You\'ve completed 23 consecutive days of saving. Keep it up!',
        time: '3 hours ago',
        read: true,
        icon: '🎯',
        streak: 23
      },
      {
        id: 4,
        type: 'info',
        category: 'dabba_pay',
        title: 'Interest Credit',
        message: 'Monthly interest of ₹127 has been credited to your Emergency Fund account.',
        time: '1 day ago',
        read: true,
        icon: '💰',
        amount: 127,
        account: 'Emergency Fund'
      },
      {
        id: 5,
        type: 'security',
        category: 'account',
        title: 'Login from New Device',
        message: 'We detected a login from a new device. If this wasn\'t you, please secure your account.',
        time: '2 days ago',
        read: true,
        icon: '🔒',
        device: 'iPhone 15 Pro'
      },
      {
        id: 6,
        type: 'promotion',
        category: 'offers',
        title: 'Limited Time Offer',
        message: 'Start a new Dabba Save goal and get ₹100 instant bonus! Offer valid till Dec 31.',
        time: '3 days ago',
        read: true,
        icon: '🎁',
        bonus: 100
      },
      {
        id: 7,
        type: 'update',
        category: 'app',
        title: 'App Update Available',
        message: 'New features and security improvements are available. Update to version 2.1.0.',
        time: '1 week ago',
        read: true,
        icon: '📱',
        version: '2.1.0'
      }
    ]);

    const getFilteredNotifications = () => {
      if (activeTab === 'all') return notifications;
      if (activeTab === 'unread') return notifications.filter(n => !n.read);
      return notifications.filter(n => n.category === activeTab);
    };

    const markAsRead = (id: number) => {
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    };

    const markAllAsRead = () => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getNotificationColor = (type: string) => {
      switch (type) {
        case 'success': return 'from-green-500 to-emerald-500';
        case 'reminder': return 'from-blue-500 to-cyan-500';
        case 'achievement': return 'from-purple-500 to-violet-500';
        case 'info': return 'from-indigo-500 to-blue-500';
        case 'security': return 'from-red-500 to-rose-500';
        case 'promotion': return 'from-orange-500 to-amber-500';
        case 'update': return 'from-gray-500 to-slate-500';
        default: return 'from-gray-500 to-slate-500';
      }
    };

    const filteredNotifications = getFilteredNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
      <div className="min-h-full bg-gray-50 relative w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/40 to-green-50/30 -z-10"></div>
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-300/15 to-green-300/12 rounded-full blur-3xl animate-float opacity-30"></div>
          <div 
            className="absolute bottom-1/3 left-1/5 w-36 h-36 bg-gradient-to-br from-green-300/12 to-blue-300/10 rounded-full blur-2xl animate-float opacity-25" 
            style={{ animationDelay: '3s', animationDuration: '6s' }}
          ></div>
        </div>

        {/* Header */}
        <div className="relative bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-xl w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 via-transparent to-green-100/30"></div>
          
          <div className="relative z-10 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentScreen('dashboard')}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Button>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                    {unreadCount > 0 && (
                      <div className="px-2 py-1 bg-red-500 rounded-full">
                        <span className="text-xs font-bold text-white">{unreadCount}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">Stay updated with your account</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-xl transition-all duration-200 text-xs font-bold"
                  >
                    Mark All Read
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-xl transition-all duration-200"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-gradient-to-r from-white/98 via-blue-50/40 to-green-50/35 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-gray-300/80 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-br from-blue-300/40 to-green-300/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-2 left-6 w-12 h-12 bg-gradient-to-tl from-green-300/35 to-blue-300/25 rounded-full blur-lg"></div>
              </div>
              
              <div className="relative z-10">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-red-50/80 to-white/90 rounded-lg p-3 border border-red-200/50 text-center">
                    <BellRing className="h-4 w-4 text-red-600 mx-auto mb-1" />
                    <div className="text-xs text-red-600 mb-1">Unread</div>
                    <div className="font-bold text-red-800">{unreadCount}</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50/80 to-white/90 rounded-lg p-3 border border-blue-200/50 text-center">
                    <Bell className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs text-blue-600 mb-1">Total</div>
                    <div className="font-bold text-blue-800">{notifications.length}</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50/80 to-white/90 rounded-lg p-3 border border-green-200/50 text-center">
                    <TrendingUp className="h-4 w-4 text-green-600 mx-auto mb-1" />
                    <div className="text-xs text-green-600 mb-1">This Week</div>
                    <div className="font-bold text-green-800">{notifications.filter(n => ['2 minutes ago', '1 hour ago', '3 hours ago', '1 day ago', '2 days ago', '3 days ago'].includes(n.time)).length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 pb-8 space-y-6">
          {/* Filter Tabs */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200">
            <div className="grid grid-cols-5 gap-1">
              {[
                { id: 'all', label: 'All', icon: Bell, count: notifications.length },
                { id: 'unread', label: 'Unread', icon: BellRing, count: unreadCount },
                { id: 'dabba_save', label: 'Savings', icon: PiggyBank, count: notifications.filter(n => n.category === 'dabba_save').length },
                { id: 'rewards', label: 'Rewards', icon: Gift, count: notifications.filter(n => n.category === 'rewards').length },
                { id: 'account', label: 'Account', icon: User, count: notifications.filter(n => n.category === 'account').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 relative ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mb-1" />
                  <span className="text-xs font-bold">{tab.label}</span>
                  {tab.count > 0 && activeTab !== tab.id && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{tab.count > 9 ? '9+' : tab.count}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-bold text-gray-600 mb-2">No notifications</h3>
                <p className="text-sm text-gray-500">
                  {activeTab === 'unread' ? "You're all caught up!" : `No ${activeTab} notifications at the moment.`}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                  className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-300 cursor-pointer hover:shadow-xl hover:-translate-y-0.5 ${
                    notification.read 
                      ? 'border-gray-200 opacity-90' 
                      : 'border-blue-300 shadow-blue-100'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Notification Icon */}
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${getNotificationColor(notification.type)} shadow-lg flex-shrink-0`}>
                        <div className="text-white text-sm font-bold">
                          {notification.icon}
                        </div>
                      </div>

                      {/* Notification Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-bold text-sm ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                            <span className={`text-xs ${notification.read ? 'text-gray-500' : 'text-gray-600'}`}>
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>

                        <p className={`text-sm mb-3 ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                          {notification.message}
                        </p>

                        {/* Additional Info */}
                        {(notification.amount || notification.account || notification.streak || notification.device || notification.bonus || notification.version) && (
                          <div className="bg-gray-50 rounded-lg p-3 text-xs">
                            <div className="grid grid-cols-2 gap-2">
                              {notification.amount && (
                                <div className="flex items-center space-x-1">
                                  <IndianRupee className="h-3 w-3 text-green-600" />
                                  <span className="font-semibold text-green-700">₹{notification.amount}</span>
                                </div>
                              )}
                              {notification.account && (
                                <div className="flex items-center space-x-1">
                                  <Target className="h-3 w-3 text-blue-600" />
                                  <span className="text-blue-700">{notification.account}</span>
                                </div>
                              )}
                              {notification.streak && (
                                <div className="flex items-center space-x-1">
                                  <Flame className="h-3 w-3 text-orange-600" />
                                  <span className="text-orange-700">{notification.streak} days</span>
                                </div>
                              )}
                              {notification.device && (
                                <div className="flex items-center space-x-1">
                                  <Smartphone className="h-3 w-3 text-purple-600" />
                                  <span className="text-purple-700">{notification.device}</span>
                                </div>
                              )}
                              {notification.bonus && (
                                <div className="flex items-center space-x-1">
                                  <Gift className="h-3 w-3 text-pink-600" />
                                  <span className="text-pink-700">₹{notification.bonus} bonus</span>
                                </div>
                              )}
                              {notification.version && (
                                <div className="flex items-center space-x-1">
                                  <Download className="h-3 w-3 text-indigo-600" />
                                  <span className="text-indigo-700">v{notification.version}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons for certain notifications */}
                        {(notification.type === 'promotion' || notification.type === 'update' || notification.type === 'security') && (
                          <div className="flex items-center space-x-2 mt-3">
                            {notification.type === 'promotion' && (
                              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs">
                                <Gift className="h-3 w-3 mr-1" />
                                Claim Offer
                              </Button>
                            )}
                            {notification.type === 'update' && (
                              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white text-xs">
                                <Download className="h-3 w-3 mr-1" />
                                Update App
                              </Button>
                            )}
                            {notification.type === 'security' && (
                              <Button size="sm" className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white text-xs">
                                <Shield className="h-3 w-3 mr-1" />
                                Review Security
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {filteredNotifications.length > 0 && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200 text-center">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  onClick={() => {
                    // Clear all notifications (simulation)
                    setNotifications([]);
                  }}
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
                
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Notification Settings
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ProfileScreen = () => {
    const [activeSection, setActiveSection] = useState('overview');

    return (
      <div className="min-h-full bg-gray-50 relative w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/40 to-green-50/30 -z-10"></div>
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-300/15 to-green-300/12 rounded-full blur-3xl animate-float opacity-30"></div>
          <div 
            className="absolute bottom-1/3 left-1/5 w-36 h-36 bg-gradient-to-br from-green-300/12 to-blue-300/10 rounded-full blur-2xl animate-float opacity-25" 
            style={{ animationDelay: '3s', animationDuration: '6s' }}
          ></div>
        </div>

        {/* Header */}
        <div className="relative bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-xl w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 via-transparent to-green-100/30"></div>
          
          <div className="relative z-10 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentScreen('dashboard')}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Profile</h1>
                  <p className="text-sm text-gray-600">Manage your account</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-xl transition-all duration-200"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Profile Header Card */}
            <div className="bg-gradient-to-r from-white/98 via-blue-50/40 to-green-50/35 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-300/80 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-br from-blue-300/40 to-green-300/30 rounded-full blur-xl"></div>
                <div className="absolute bottom-2 left-6 w-12 h-12 bg-gradient-to-tl from-green-300/35 to-blue-300/25 rounded-full blur-lg"></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-xl">
                      <span className="text-white font-bold text-xl">{userProfile.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-gray-900">{userProfile.name}</h2>
                    <p className="text-sm text-gray-600">{userProfile.phone}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Award className="h-3 w-3 text-green-600" />
                      <span className="text-xs font-semibold text-green-700">Member since {userProfile.memberSince}</span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-xl shadow-md"
                  >
                    <User className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-green-50/80 to-white/90 rounded-lg p-3 border border-green-200/50 text-center">
                    <Wallet className="h-4 w-4 text-green-600 mx-auto mb-1" />
                    <div className="text-xs text-green-600 mb-1">Total Savings</div>
                    <div className="font-bold text-green-800">₹{userProfile.totalSavings.toLocaleString()}</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50/80 to-white/90 rounded-lg p-3 border border-blue-200/50 text-center">
                    <Target className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs text-blue-600 mb-1">Active Plans</div>
                    <div className="font-bold text-blue-800">{userProfile.activePlans}</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50/80 to-white/90 rounded-lg p-3 border border-purple-200/50 text-center">
                    <TrendingUp className="h-4 w-4 text-purple-600 mx-auto mb-1" />
                    <div className="text-xs text-purple-600 mb-1">Credit Score</div>
                    <div className="font-bold text-purple-800">{userProfile.creditScore}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 pb-8 space-y-6">
          {/* Navigation Tabs */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200">
            <div className="grid grid-cols-4 gap-1">
              {[
                { id: 'overview', label: 'Overview', icon: Home },
                { id: 'savings', label: 'Savings', icon: PiggyBank },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'support', label: 'Support', icon: HelpCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                    activeSection === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mb-1" />
                  <span className="text-xs font-bold">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="space-y-4 animate-fade-in">
              {/* Account Status */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Account Status
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-green-800">KYC Status</span>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-xs text-green-600">Verified</div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-blue-800">Account Level</span>
                      <Star className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-xs text-blue-600">Premium</div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-purple-800">Transactions</span>
                      <Repeat className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-xs text-purple-600">{userProfile.completedTransactions} completed</div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-orange-800">Referrals</span>
                      <Users className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="text-xs text-orange-600">3 friends</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Zap className="h-4 w-4 text-blue-600 mr-2" />
                  Quick Actions
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Download, label: 'Download Statement', color: 'blue' },
                    { icon: QrCode, label: 'My QR Code', color: 'green' },
                    { icon: Gift, label: 'Refer Friends', color: 'purple' },
                    { icon: Calculator, label: 'EMI Calculator', color: 'orange' }
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 group"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${
                        action.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                        action.color === 'green' ? 'from-green-500 to-emerald-500' :
                        action.color === 'purple' ? 'from-purple-500 to-violet-500' :
                        'from-orange-500 to-amber-500'
                      } group-hover:scale-105 transition-transform duration-200`}>
                        <action.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Savings Section */}
          {activeSection === 'savings' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <PiggyBank className="h-4 w-4 text-green-600 mr-2" />
                  My Savings Plans
                </h3>
                
                <div className="space-y-3">
                  {activePlans.filter(plan => plan.type === 'DABBA SAVE').map((plan) => (
                    <div key={plan.id} className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-green-800">{plan.name}</h4>
                        <span className="text-sm font-semibold text-green-600">₹{plan.balance}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-green-600">
                        <span>Target: ₹{plan.target?.toLocaleString()}</span>
                        <span>{plan.progress}% complete</span>
                      </div>
                      <div className="bg-green-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${plan.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-4 w-4 text-blue-600 mr-2" />
                  Security Settings
                </h3>
                
                <div className="space-y-3">
                  {[
                    { icon: Lock, label: 'Change MPIN', desc: 'Update your login PIN', action: 'Change' },
                    { icon: Fingerprint, label: 'Biometric Login', desc: 'Enable fingerprint/face unlock', action: 'Enable' },
                    { icon: Smartphone, label: 'Two-Factor Auth', desc: 'SMS verification for transactions', action: 'Setup' },
                    { icon: Bell, label: 'Security Alerts', desc: 'Get notified of account activity', action: 'Manage' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                          <item.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
                          <div className="text-xs text-gray-600">{item.desc}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        {item.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Support Section */}
          {activeSection === 'support' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <HelpCircle className="h-4 w-4 text-green-600 mr-2" />
                  Help & Support
                </h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button className="bg-green-50 rounded-xl p-4 border border-green-200 text-center hover:bg-green-100 transition-colors">
                    <Phone className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-bold text-green-800">Call Support</div>
                    <div className="text-xs text-green-600">24/7 Available</div>
                  </button>

                  <button className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center hover:bg-blue-100 transition-colors">
                    <Mail className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm font-bold text-blue-800">Email Us</div>
                    <div className="text-xs text-blue-600">Quick Response</div>
                  </button>
                </div>

                <div className="space-y-2">
                  {[
                    'Frequently Asked Questions',
                    'Terms & Conditions',
                    'Privacy Policy',
                    'About Kaniro Financial',
                    'App Version 2.1.0'
                  ].map((item, index) => (
                    <button key={index} className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <span className="text-sm font-semibold text-gray-700">{item}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Logout */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
                <Button
                  onClick={() => setCurrentScreen('login')}
                  className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Logout from Account
                </Button>
              </div>
            </div>
          )}
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
    profile: ProfileScreen,
    notifications: NotificationsScreen,
    'save-withdraw': () => <div className="min-h-screen bg-gray-100 flex items-center justify-center">Withdraw Screen</div>
  };

  const CurrentScreen = screens[currentScreen];

  return (
    <div className="h-screen w-screen bg-slate-50 overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 -z-50"></div>
      
      <div className="flex-1 w-full max-w-md mx-auto bg-slate-50 relative flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <CurrentScreen />
        </div>
        
        {(currentScreen === 'dashboard' || currentScreen === 'save-setup' || currentScreen === 'save-bank' || currentScreen === 'save-confirm' || currentScreen === 'save' || currentScreen === 'pay' || currentScreen === 'profile' || currentScreen === 'notifications') && (
          <div className="flex-shrink-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl sm:hidden">
            <div className="grid grid-cols-5 gap-0">
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