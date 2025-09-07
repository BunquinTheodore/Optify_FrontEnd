import { useState } from 'react';
import { Target, Plus, Calendar, DollarSign, TrendingUp, CheckCircle, Clock, AlertCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

interface Goal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'completed' | 'paused';
}

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>([
  {
    id: '1',
    title: 'Emergency Fund',
    description: '6 months of living expenses for financial security',
    targetAmount: 300000,
    currentAmount: 225000,
    deadline: '2024-12-31',
    category: 'Emergency',
    priority: 'high',
    status: 'active'
  },
  {
    id: '2',
    title: 'European Vacation',
    description: 'Dream trip to Europe including flights, hotels, and activities',
    targetAmount: 80000,
    currentAmount: 52000,
    deadline: '2024-06-15',
    category: 'Travel',
    priority: 'medium',
    status: 'active'
  },
  {
    id: '3',
    title: 'New Car Down Payment',
    description: '20% down payment for a new Tesla Model 3',
    targetAmount: 120000,
    currentAmount: 120000,
    deadline: '2024-03-01',
    category: 'Transportation',
    priority: 'high',
    status: 'completed'
  },
  {
    id: '4',
    title: 'Investment Portfolio',
    description: 'Build a diversified investment portfolio',
    targetAmount: 500000,
    currentAmount: 185000,
    deadline: '2025-12-31',
    category: 'Investment',
    priority: 'medium',
    status: 'active'
  },
  {
    id: '5',
    title: 'Home Renovation',
    description: 'Kitchen and bathroom renovation project',
    targetAmount: 250000,
    currentAmount: 87500,
    deadline: '2024-09-30',
    category: 'Home',
    priority: 'low',
    status: 'active'
  }
]);

const categories = ['Emergency', 'Travel', 'Transportation', 'Investment', 'Home', 'Education', 'Health', 'Other'];
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    deadline: '',
    category: '',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });

  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'active': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'paused': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.targetAmount || !formData.deadline || !formData.category) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: 0,
      deadline: formData.deadline,
      category: formData.category,
      priority: formData.priority,
      status: 'active'
    };

    setGoals([newGoal, ...goals]);
    setShowAddForm(false);
    setFormData({
      title: '',
      description: '',
      targetAmount: '',
      deadline: '',
      category: '',
      priority: 'medium'
    });
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1 text-sm">Active Goals</p>
                <p className="text-2xl font-bold">{activeGoals.length}</p>
              </div>
              <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full">
                <Target className="h-5 w-5 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedGoals.length}</p>
              </div>
              <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground mb-1 text-sm">Total Target</p>
                <p className="text-xl font-bold truncate">
                  ₱{activeGoals.reduce((sum, goal) => sum + goal.targetAmount, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full">
                <DollarSign className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1 text-sm">Progress</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    activeGoals.reduce((sum, goal) => sum + getProgressPercentage(goal.currentAmount, goal.targetAmount), 0) / activeGoals.length
                  )}%
                </p>
              </div>
              <div className="p-2 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full">
                <TrendingUp className="h-5 w-5 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
        <Card className="glass-morphism shadow-card">
          <CardHeader>
            <CardTitle>Create New Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Dream Vacation"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="targetAmount">Target Amount</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    placeholder="10000"
                    value={formData.targetAmount}
                    onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                    required
                  />
                </div>
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
                  <Label htmlFor="deadline">Target Date</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your goal..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value: 'high' | 'medium' | 'low') => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="gradient-primary shadow-luxury">Create Goal</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="space-y-6">
        {/* Active Goals */}
        <Card className="glass-morphism shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Active Goals
              </CardTitle>
              <Button 
                className="gradient-primary shadow-luxury"
                onClick={() => setShowAddForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeGoals.map((goal) => {
                const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
                const daysLeft = getDaysUntilDeadline(goal.deadline);
                
                return (
                  <div key={goal.id} className="p-4 rounded-lg bg-gradient-to-r from-green-50/30 to-transparent border border-green-100/30 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{goal.title}</h3>
                          <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                            {goal.priority}
                          </Badge>
                          {getStatusIcon(goal.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {daysLeft > 0 ? `${daysLeft} days left` : `${Math.abs(daysLeft)} days overdue`}
                          </span>
                          <Badge variant="secondary">{goal.category}</Badge>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteGoal(goal.id)}
                        className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>₱{goal.currentAmount.toLocaleString()} of ₱{goal.targetAmount.toLocaleString()}</span>
                        <span className="font-semibold">{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Completed Goals */}
        <Card className="glass-morphism shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Completed Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedGoals.map((goal) => (
                <div key={goal.id} className="p-4 rounded-lg bg-gradient-to-r from-green-50/50 to-transparent border border-green-200/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{goal.title}</h3>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>₱{goal.targetAmount.toLocaleString()} achieved</span>
                        <Badge variant="secondary">{goal.category}</Badge>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteGoal(goal.id)}
                      className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom spacing for better scrolling */}
      <div className="h-6"></div>
    </div>
  );
}