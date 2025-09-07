import { useState } from 'react';
import { PieChart, Plus, AlertTriangle, CheckCircle, TrendingUp, DollarSign, Trash2, ChevronRight, BarChart3, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface Budget {
  id: string;
  category: string;
  budgetAmount: number;
  spentAmount: number;
  period: 'monthly' | 'weekly' | 'yearly';
  color: string;
}

export function Budgets() {
  const [budgets, setBudgets] = useState<Budget[]>([
  {
    id: '1',
    category: 'Food & Dining',
    budgetAmount: 800,
    spentAmount: 650,
    period: 'monthly',
    color: '#22c55e'
  },
  {
    id: '2',
    category: 'Transportation',
    budgetAmount: 400,
    spentAmount: 420,
    period: 'monthly',
    color: '#ef4444'
  },
  {
    id: '3',
    category: 'Entertainment',
    budgetAmount: 300,
    spentAmount: 180,
    period: 'monthly',
    color: '#3b82f6'
  },
  {
    id: '4',
    category: 'Shopping',
    budgetAmount: 500,
    spentAmount: 380,
    period: 'monthly',
    color: '#f59e0b'
  },
  {
    id: '5',
    category: 'Healthcare',
    budgetAmount: 200,
    spentAmount: 150,
    period: 'monthly',
    color: '#8b5cf6'
  },
  {
    id: '6',
    category: 'Utilities',
    budgetAmount: 250,
    spentAmount: 240,
    period: 'monthly',
    color: '#06b6d4'
  }
]);

const categories = [
  'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 
  'Bills & Utilities', 'Healthcare', 'Travel', 'Education', 'Other'
];
  const [showAddForm, setShowAddForm] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    budgetAmount: '',
    period: 'monthly' as 'monthly' | 'weekly' | 'yearly'
  });

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budgetAmount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spentAmount, 0);
  const overBudgetCount = budgets.filter(budget => budget.spentAmount > budget.budgetAmount).length;
  const onTargetCount = budgets.filter(budget => {
    const percentage = (budget.spentAmount / budget.budgetAmount) * 100;
    return percentage <= 100 && percentage >= 80;
  }).length;

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage > 100) return { status: 'over', color: 'text-red-600', icon: AlertTriangle };
    if (percentage >= 80) return { status: 'warning', color: 'text-yellow-600', icon: AlertTriangle };
    return { status: 'good', color: 'text-green-600', icon: CheckCircle };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.budgetAmount) return;

    const newBudget: Budget = {
      id: Date.now().toString(),
      category: formData.category,
      budgetAmount: parseFloat(formData.budgetAmount),
      spentAmount: 0,
      period: formData.period,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };

    setBudgets([newBudget, ...budgets]);
    setShowAddForm(false);
    setFormData({ category: '', budgetAmount: '', period: 'monthly' });
  };

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground mb-1 text-sm">Total Budget</p>
                <p className="text-xl font-bold truncate">₱{totalBudget.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full">
                <DollarSign className="h-5 w-5 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground mb-1 text-sm">Total Spent</p>
                <p className="text-xl font-bold truncate">₱{totalSpent.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">
                  {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
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
              <div>
                <p className="text-muted-foreground mb-1 text-sm">Over Budget</p>
                <p className="text-2xl font-bold text-red-600">{overBudgetCount}</p>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
              <div className="p-2 bg-gradient-to-br from-red-100 to-red-200 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1 text-sm">On Target</p>
                <p className="text-2xl font-bold text-green-600">{onTargetCount}</p>
                <p className="text-xs text-muted-foreground">Categories</p>
              </div>
              <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Budget Form */}
      {showAddForm && (
        <Card className="glass-morphism shadow-card">
          <CardHeader>
            <CardTitle>Create New Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budgetAmount">Budget Amount</Label>
                  <Input
                    id="budgetAmount"
                    type="number"
                    placeholder="500"
                    value={formData.budgetAmount}
                    onChange={(e) => setFormData({ ...formData, budgetAmount: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="period">Period</Label>
                  <Select value={formData.period} onValueChange={(value: 'monthly' | 'weekly' | 'yearly') => setFormData({ ...formData, period: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="gradient-primary shadow-luxury">Create Budget</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Budget Categories */}
      <Card className="glass-morphism shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Budget Categories
            </CardTitle>
            <Button 
              className="gradient-primary shadow-luxury"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Budget
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgets.map((budget) => {
              const percentage = (budget.spentAmount / budget.budgetAmount) * 100;
              const status = getBudgetStatus(budget.spentAmount, budget.budgetAmount);
              const StatusIcon = status.icon;
              
              return (
                <div key={budget.id} className="p-4 rounded-lg bg-gradient-to-r from-green-50/30 to-transparent border border-green-100/30 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: budget.color }}
                      />
                      <div>
                        <h3 className="font-semibold">{budget.category}</h3>
                        <p className="text-xs text-muted-foreground capitalize">{budget.period}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`h-4 w-4 ${status.color}`} />
                      <Badge 
                        variant={status.status === 'over' ? 'destructive' : status.status === 'warning' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {percentage.toFixed(0)}%
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteBudget(budget.id)}
                        className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>₱{budget.spentAmount.toLocaleString()} spent</span>
                      <span className="text-muted-foreground">₱{budget.budgetAmount.toLocaleString()} budget</span>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        ₱{(budget.budgetAmount - budget.spentAmount).toLocaleString()} remaining
                      </span>
                      <span>
                        {Math.max(0, 31 - Math.floor(percentage / 3.2))} days left
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget Insights - Separate Collapsibles */}
      <div className="space-y-4">
        {/* Spending Insights */}
        <Collapsible open={showInsights} onOpenChange={setShowInsights}>
          <Card className="glass-morphism shadow-card">
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-4 hover:bg-accent/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <ChevronRight 
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                      showInsights ? 'rotate-90' : ''
                    }`} 
                  />
                  <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                    <BarChart3 className="h-4 w-4 text-green-700" />
                  </div>
                  <CardTitle className="text-lg">Budget Insights</CardTitle>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50/50 rounded-lg border border-red-100/50">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium text-red-700">Transportation Over Budget</p>
                        <p className="text-sm text-red-600">₱20 over this month</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50/50 rounded-lg border border-yellow-100/50">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-700">Food & Dining Near Limit</p>
                        <p className="text-sm text-yellow-600">81% of budget used</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50/50 rounded-lg border border-green-100/50">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-700">Entertainment On Track</p>
                        <p className="text-sm text-green-600">60% of budget used</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Recommendations */}
        <Collapsible open={showRecommendations} onOpenChange={setShowRecommendations}>
          <Card className="glass-morphism shadow-card">
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-4 hover:bg-accent/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <ChevronRight 
                    className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                      showRecommendations ? 'rotate-90' : ''
                    }`} 
                  />
                  <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                    <Lightbulb className="h-4 w-4 text-green-700" />
                  </div>
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
                    <h4 className="font-medium text-blue-700 mb-2">Optimize Transportation</h4>
                    <p className="text-sm text-blue-600">Consider carpooling or public transport to reduce costs by ₱50/month.</p>
                  </div>
                  
                  <div className="p-3 bg-green-50/50 rounded-lg border border-green-100/50">
                    <h4 className="font-medium text-green-700 mb-2">Meal Planning</h4>
                    <p className="text-sm text-green-600">Planning meals in advance could save you ₱120/month on food expenses.</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100/50">
                    <h4 className="font-medium text-purple-700 mb-2">Entertainment Budget</h4>
                    <p className="text-sm text-purple-600">You have ₱120 remaining for entertainment this month.</p>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      {/* Bottom spacing for better scrolling */}
      <div className="h-6"></div>
    </div>
  );
}