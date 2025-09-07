import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { DateFilter } from './DateFilter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, ChevronRight, CreditCard, Banknote } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', income: 50000, expenses: 32000 },
  { month: 'Feb', income: 52000, expenses: 34000 },
  { month: 'Mar', income: 48000, expenses: 31000 },
  { month: 'Apr', income: 51000, expenses: 33000 },
  { month: 'May', income: 53000, expenses: 35000 },
  { month: 'Jun', income: 50000, expenses: 32000 },
  { month: 'Jul', income: 54000, expenses: 36000 },
  { month: 'Aug', income: 50000, expenses: 33500 },
];

const expenseCategories = [
  { name: 'Bills & Utilities', value: 12000, color: '#22c55e' },
  { name: 'Food & Dining', value: 8000, color: '#16a34a' },
  { name: 'Transportation', value: 4000, color: '#15803d' },
  { name: 'Entertainment', value: 3000, color: '#84cc16' },
  { name: 'Shopping', value: 5000, color: '#65a30d' },
  { name: 'Healthcare', value: 2000, color: '#166534' },
];

const incomeCategories = [
  { name: 'Salary', value: 45000, color: '#22c55e' },
  { name: 'Freelance', value: 12000, color: '#16a34a' },
  { name: 'Investment', value: 3000, color: '#15803d' },
];

// Savings data connected to goals
const savingsData = [
  { fund: 'Emergency Fund', current: 85000, target: 100000, color: '#3b82f6' },
  { fund: 'Vacation Fund', current: 32000, target: 50000, color: '#8b5cf6' },
  { fund: 'Investment Fund', current: 150000, target: 250000, color: '#06b6d4' },
];

export function Analytics() {
  const [showExpenseBreakdown, setShowExpenseBreakdown] = useState(false);
  const [showIncomeSources, setShowIncomeSources] = useState(false);
  const [showGoalProgress, setShowGoalProgress] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('august');
  const [selectedYear, setSelectedYear] = useState('2025');
  
  const totalIncome = monthlyData[monthlyData.length - 1].income;
  const totalExpenses = monthlyData[monthlyData.length - 1].expenses;
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1);
  const monthlyGrowth = 2.3;

  return (
    <div className="space-y-4">
      {/* Date Filter */}
      <DateFilter
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onMonthChange={setSelectedMonth}
        onYearChange={setSelectedYear}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-1">This Month</p>
              <p className="text-sm font-semibold">₱{totalIncome.toLocaleString()}</p>
              <p className="text-green-600 flex items-center justify-center gap-1 mt-1 text-xs">
                <TrendingUp className="h-3 w-3" />
                +{monthlyGrowth}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingDown className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Expenses</p>
              <p className="text-sm font-semibold">₱{totalExpenses.toLocaleString()}</p>
              <p className="text-red-500 flex items-center justify-center gap-1 mt-1 text-xs">
                <TrendingUp className="h-3 w-3" />
                +1.8%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <Target className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Savings Rate</p>
              <p className="text-sm font-semibold">{savingsRate}%</p>
              <p className="text-green-600 flex items-center justify-center gap-1 mt-1 text-xs">
                <TrendingUp className="h-3 w-3" />
                +0.5%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Net Worth</p>
              <p className="text-sm font-semibold">₱{(totalIncome - totalExpenses).toLocaleString()}</p>
              <p className="text-green-600 flex items-center justify-center gap-1 mt-1 text-xs">
                <TrendingUp className="h-3 w-3" />
                +3.2%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="space-y-4">
        {/* Income vs Expenses Trend */}
        <Card className="glass-morphism shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => [`₱${value}`, '']} />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Income"
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Expenses"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Categories - Collapsible */}
        <Collapsible open={showExpenseBreakdown} onOpenChange={setShowExpenseBreakdown}>
          <Card className="glass-morphism shadow-card">
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-4 hover:bg-accent/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <ChevronRight 
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                      showExpenseBreakdown ? 'rotate-90' : ''
                    }`} 
                  />
                  <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                    <CreditCard className="h-4 w-4 text-green-700" />
                  </div>
                  <CardTitle className="text-lg">Expense Breakdown</CardTitle>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.map((category, index) => {
                    const maxValue = Math.max(...expenseCategories.map(cat => cat.value));
                    const percentage = Math.round((category.value / maxValue) * 100);
                    return (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="text-sm">{category.name}</span>
                          </div>
                          <span className="text-sm font-semibold">₱{category.value.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${percentage}%`,
                              background: `linear-gradient(90deg, ${category.color}, ${category.color}cc)`
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{percentage}% of highest expense</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Income Sources - Collapsible */}
        <Collapsible open={showIncomeSources} onOpenChange={setShowIncomeSources}>
          <Card className="glass-morphism shadow-card">
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-4 hover:bg-accent/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <ChevronRight 
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                      showIncomeSources ? 'rotate-90' : ''
                    }`} 
                  />
                  <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                    <Banknote className="h-4 w-4 text-green-700" />
                  </div>
                  <CardTitle className="text-lg">Income Sources</CardTitle>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
              <CardContent>
                <div className="space-y-4">
                  {incomeCategories.map((category, index) => {
                    const maxValue = Math.max(...incomeCategories.map(cat => cat.value));
                    const percentage = Math.round((category.value / maxValue) * 100);
                    return (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="text-sm">{category.name}</span>
                          </div>
                          <span className="text-sm font-semibold">₱{category.value.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${percentage}%`,
                              background: `linear-gradient(90deg, ${category.color}, ${category.color}cc)`
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{percentage}% of highest income</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      {/* Financial Goals - Collapsible */}
      <Collapsible open={showGoalProgress} onOpenChange={setShowGoalProgress}>
        <Card className="glass-morphism shadow-card">
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-4 hover:bg-accent/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <ChevronRight 
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                    showGoalProgress ? 'rotate-90' : ''
                  }`} 
                />
                <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                  <Target className="h-4 w-4 text-green-700" />
                </div>
                <CardTitle className="text-lg">Goals Progress</CardTitle>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
            <CardContent>
              <div className="space-y-4">
                {savingsData.map((savings, index) => {
                  const percentage = Math.round((savings.current / savings.target) * 100);
                  return (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">{savings.fund}</span>
                        <span className="text-sm font-semibold">₱{savings.current.toLocaleString()} / ₱{savings.target.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${percentage}%`,
                            background: `linear-gradient(90deg, ${savings.color}, ${savings.color}cc)`
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{percentage}% complete</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Bottom spacing for better scrolling */}
      <div className="h-6"></div>
    </div>
  );
}