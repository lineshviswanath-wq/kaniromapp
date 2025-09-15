import React from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { 
  Bell, User, PiggyBank, CreditCard, Gift, Repeat, Users, TrendingUp, 
  Shield, Clock, Zap, Calendar, PlusCircle, Banknote, Compass,
  FileText, CheckCircle, Building2, Home, HelpCircle, Phone
} from 'lucide-react';

interface DashboardProps {
  kaniroLogo: string;
  promoImage: string;
  hasActiveData: boolean;
  savingsData: any;
  userProfile: any;
  loanAccounts: any[];
  dabbaPayData: any;
  currentServiceIndex: number;
  currentPromoIndex: number;
  setCurrentScreen: (screen: string) => void;
  setCurrentServiceIndex: (index: number) => void;
  setCurrentPromoIndex: (index: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  kaniroLogo,
  promoImage,
  hasActiveData,
  savingsData,
  userProfile,
  loanAccounts,
  dabbaPayData,
  currentServiceIndex,
  currentPromoIndex,
  setCurrentScreen,
  setCurrentServiceIndex,
  setCurrentPromoIndex
}) => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-3 pt-safe-or-4">
          <div className="flex items-center justify-between">
            <img src={kaniroLogo} alt="Kaniro" className="h-6" />
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('notifications')} className="relative">
                <Bell className="h-5 w-5" />
                {hasActiveData && <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('profile')}>
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Cards Carousel */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4 py-4">
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

      {/* Main Content */}
      <div className="max-w-md mx-auto p-4 space-y-4">
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
  );
};