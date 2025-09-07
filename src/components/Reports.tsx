import { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, DollarSign, BarChart3, PieChart, ChevronRight, Lightbulb, AlertTriangle, Bot, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { DateFilter } from './DateFilter';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const monthlyTrends = [
  { month: 'Jan', income: 5000, expenses: 3200, savings: 1800, netWorth: 25000 },
  { month: 'Feb', income: 5200, expenses: 3400, savings: 1800, netWorth: 26800 },
  { month: 'Mar', income: 4800, expenses: 3100, savings: 1700, netWorth: 28500 },
  { month: 'Apr', income: 5100, expenses: 3300, savings: 1800, netWorth: 30300 },
  { month: 'May', income: 5300, expenses: 3500, savings: 1800, netWorth: 32100 },
  { month: 'Jun', income: 5000, expenses: 3200, savings: 1800, netWorth: 33900 },
  { month: 'Jul', income: 5400, expenses: 3600, savings: 1800, netWorth: 35700 },
  { month: 'Aug', income: 5000, expenses: 3350, savings: 1650, netWorth: 37350 },
];

const expenseBreakdown = [
  { category: 'Housing', amount: 1200, percentage: 35.8, color: '#22c55e' },
  { category: 'Food', amount: 800, percentage: 23.9, color: '#16a34a' },
  { category: 'Transportation', amount: 400, percentage: 11.9, color: '#15803d' },
  { category: 'Entertainment', amount: 300, percentage: 9.0, color: '#84cc16' },
  { category: 'Shopping', amount: 500, percentage: 14.9, color: '#65a30d' },
  { category: 'Healthcare', amount: 150, percentage: 4.5, color: '#166534' }
];

const reportTypes = [
  { 
    id: 'monthly', 
    title: 'Monthly Summary', 
    description: 'Complete overview of monthly financial activity',
    lastGenerated: '2025-08-26'
  },
  { 
    id: 'quarterly', 
    title: 'Quarterly Report', 
    description: 'Quarterly performance and trend analysis',
    lastGenerated: '2025-07-01'
  },
  { 
    id: 'annual', 
    title: 'Annual Review', 
    description: 'Comprehensive yearly financial review',
    lastGenerated: '2025-01-01'
  },
  { 
    id: 'tax', 
    title: 'Tax Summary', 
    description: 'Tax-relevant transactions and deductions',
    lastGenerated: '2025-04-15'
  },
  { 
    id: 'investment', 
    title: 'Investment Report', 
    description: 'Portfolio performance and asset allocation',
    lastGenerated: '2025-08-25'
  },
  { 
    id: 'cashflow', 
    title: 'Cash Flow Analysis', 
    description: 'Detailed cash flow patterns and projections',
    lastGenerated: '2025-08-20'
  }
];

// AI Insights Data moved from AIAdvisor
const aiInsights = [
  {
    id: '1',
    title: 'Optimize Your Savings Rate',
    description: 'Your savings rate is 34%. Consider increasing it to 40% by reducing entertainment expenses.',
    type: 'tip' as const,
    icon: Lightbulb
  },
  {
    id: '2',
    title: 'Investment Opportunity',
    description: 'Based on your income stability, consider increasing your investment allocation to 15%.',
    type: 'opportunity' as const,
    icon: TrendingUp
  },
  {
    id: '3',
    title: 'Budget Alert',
    description: 'Your dining expenses have increased 23% this month. Review your food budget.',
    type: 'warning' as const,
    icon: AlertTriangle
  }
];

export function Reports() {
  const [selectedMonth, setSelectedMonth] = useState('august');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [activeTab, setActiveTab] = useState('overview');
  const [showKeyInsights, setShowKeyInsights] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

  const totalIncome = monthlyTrends.reduce((sum, month) => sum + month.income, 0);
  const totalExpenses = monthlyTrends.reduce((sum, month) => sum + month.expenses, 0);
  const totalSavings = monthlyTrends.reduce((sum, month) => sum + month.savings, 0);
  const avgMonthlyIncome = totalIncome / monthlyTrends.length;
  const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(1);

  const handleGenerateReport = (reportType: string) => {
    console.log(`Generating ${reportType} report...`);
    // In a real app, this would generate and download the report
  };

  return (
    <div className="space-y-6">
      {/* Date Filter */}
      <DateFilter
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="trends" className="text-xs">Trends</TabsTrigger>
          <TabsTrigger value="breakdown" className="text-xs">Breakdown</TabsTrigger>
          <TabsTrigger value="reports" className="text-xs">Generate</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Card className="glass-morphism shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-muted-foreground mb-1 text-sm">Total Income</p>
                    <p className="text-xl font-bold text-green-600 truncate">₱{totalIncome.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      Avg: ₱{avgMonthlyIncome.toLocaleString()}/mo
                    </p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-muted-foreground mb-1 text-sm">Total Expenses</p>
                    <p className="text-xl font-bold truncate">₱{totalExpenses.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      Avg: ₱{(totalExpenses / monthlyTrends.length).toLocaleString()}/mo
                    </p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-red-100 to-red-200 rounded-full">
                    <DollarSign className="h-5 w-5 text-red-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-muted-foreground mb-1 text-sm">Total Savings</p>
                    <p className="text-xl font-bold text-blue-600 truncate">₱{totalSavings.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      Rate: {savingsRate}%
                    </p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full">
                    <PieChart className="h-5 w-5 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-muted-foreground mb-1 text-sm">Net Worth</p>
                    <p className="text-xl font-bold text-purple-600 truncate">
                      ₱{monthlyTrends[monthlyTrends.length - 1].netWorth.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +12.4% YTD
                    </p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full">
                    <BarChart3 className="h-5 w-5 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights - Collapsible */}
          <div className="space-y-4">
            <Collapsible open={showKeyInsights} onOpenChange={setShowKeyInsights}>
              <Card className="glass-morphism shadow-card">
                <CollapsibleTrigger asChild>
                  <CardHeader className="pb-4 hover:bg-accent/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <ChevronRight 
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                          showKeyInsights ? 'rotate-90' : ''
                        }`} 
                      />
                      <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                        <Search className="h-4 w-4 text-green-700" />
                      </div>
                      <CardTitle className="text-lg">Key Insights</CardTitle>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-green-50/50 rounded-lg border border-green-100/50">
                        <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-green-700">Strong Savings Performance</p>
                          <p className="text-sm text-green-600">Your {savingsRate}% savings rate is above the recommended 20%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
                        <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-blue-700">Stable Income Growth</p>
                          <p className="text-sm text-blue-600">Monthly income has remained consistent with slight upward trend</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 bg-yellow-50/50 rounded-lg border border-yellow-100/50">
                        <DollarSign className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-700">Expense Optimization</p>
                          <p className="text-sm text-yellow-600">Consider reviewing entertainment and shopping categories</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            {/* AI Recommendations - Moved from AIAdvisor */}
            <Collapsible open={showAIRecommendations} onOpenChange={setShowAIRecommendations}>
              <Card className="glass-morphism shadow-card">
                <CollapsibleTrigger asChild>
                  <CardHeader className="pb-4 hover:bg-accent/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <ChevronRight 
                        className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                          showAIRecommendations ? 'rotate-90' : ''
                        }`} 
                      />
                      <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                        <Bot className="h-4 w-4 text-green-700" />
                      </div>
                      <CardTitle className="text-lg">AI Recommendations</CardTitle>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                  <CardContent>
                    <div className="space-y-4">
                      {aiInsights.map((insight) => {
                        const Icon = insight.icon;
                        return (
                          <div key={insight.id} className="flex items-start gap-3 p-3 rounded-lg border transition-all hover:shadow-md">
                            <div className={`p-2 rounded-lg flex-shrink-0 ${
                              insight.type === 'tip' ? 'bg-blue-100 text-blue-600' :
                              insight.type === 'opportunity' ? 'bg-green-100 text-green-600' :
                              'bg-orange-100 text-orange-600'
                            }`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{insight.title}</span>
                                <Badge 
                                  variant={insight.type === 'warning' ? 'destructive' : 'secondary'}
                                  className="text-xs"
                                >
                                  {insight.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{insight.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          </div>

          {/* Financial Health Score */}
          <Card className="glass-morphism shadow-card">
            <CardHeader>
              <CardTitle>Financial Health Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-4">
                  <span className="text-3xl font-bold text-white">A-</span>
                </div>
                <p className="text-2xl font-semibold">Excellent</p>
                <p className="text-muted-foreground">87/100 Score</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Savings Rate</span>
                  <Badge className="bg-green-100 text-green-700">Excellent</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Expense Control</span>
                  <Badge className="bg-blue-100 text-blue-700">Good</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Budget Adherence</span>
                  <Badge className="bg-yellow-100 text-yellow-700">Fair</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Goal Progress</span>
                  <Badge className="bg-green-100 text-green-700">Excellent</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {/* Income vs Expenses Trend */}
          <Card className="glass-morphism shadow-card">
            <CardHeader>
              <CardTitle>Income vs Expenses Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₱${value?.toLocaleString()}`, '']} />
                  <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} name="Income" />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
                  <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={2} name="Savings" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Net Worth Growth */}
          <Card className="glass-morphism shadow-card">
            <CardHeader>
              <CardTitle>Net Worth Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₱${value?.toLocaleString()}`, 'Net Worth']} />
                  <Line 
                    type="monotone" 
                    dataKey="netWorth" 
                    stroke="url(#netWorthGradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  />
                  <defs>
                    <linearGradient id="netWorthGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <Card className="glass-morphism shadow-card">
            <CardHeader>
              <CardTitle>Expense Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Category List */}
              <div className="space-y-4 mb-6">
                {expenseBreakdown.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50/30 to-transparent border border-green-100/30">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₱{category.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{category.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Enhanced Bar Chart with Reference Lines */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expenseBreakdown} layout="horizontal">
                  <CartesianGrid 
                    strokeDasharray="2 4" 
                    opacity={0.4}
                    stroke="#16a34a"
                  />
                  <XAxis 
                    type="number" 
                    stroke="#16a34a"
                    fontSize={12}
                    tick={{ fill: '#16a34a' }}
                  />
                  <YAxis 
                    dataKey="category" 
                    type="category" 
                    width={80}
                    stroke="#16a34a"
                    fontSize={12}
                    tick={{ fill: '#16a34a' }}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`₱${value?.toLocaleString()}`, 'Amount']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #16a34a',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(22, 163, 74, 0.1)'
                    }}
                  />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="space-y-4">
            {reportTypes.map((report) => (
              <Card key={report.id} className="glass-morphism shadow-card hover:shadow-luxury transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                    </div>
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Last: {report.lastGenerated}
                    </div>
                    <Badge variant="secondary">PDF</Badge>
                  </div>
                  <Button 
                    className="w-full gradient-primary shadow-luxury"
                    onClick={() => handleGenerateReport(report.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom spacing for better scrolling */}
      <div className="h-6"></div>
    </div>
  );
}