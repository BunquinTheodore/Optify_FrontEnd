import { useState } from 'react';
import { Plus, ArrowUpCircle, ArrowDownCircle, Edit, Trash2, PiggyBank, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'savings';
  amount: number;
  category: string;
  description: string;
  date: string;
}

const incomeCategories = [
  'Salary', 'Freelance', 'Business', 'Investment', 'Other Income'
];

const expenseCategories = [
  'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 
  'Bills & Utilities', 'Healthcare', 'Travel', 'Other Expenses'
];

const savingsCategories = [
  'Emergency Fund', 'Vacation Fund', 'Investment Fund'
];

interface TransactionManagerProps {
  showAddForm?: boolean;
  onToggleForm?: () => void;
}

export function TransactionManager({ showAddForm = false, onToggleForm }: TransactionManagerProps = {}) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'income',
      amount: 50000,
      category: 'Salary',
      description: 'Monthly salary',
      date: '2025-09-03'
    },
    {
      id: '2',
      type: 'expense',
      amount: 12000,
      category: 'Bills & Utilities',
      description: 'Rent payment',
      date: '2025-09-03'
    },
    {
      id: '3',
      type: 'expense',
      amount: 3500,
      category: 'Food & Dining',
      description: 'Grocery shopping',
      date: '2025-09-02'
    },
    {
      id: '4',
      type: 'savings',
      amount: 5000,
      category: 'Emergency Fund',
      description: 'Emergency fund contribution',
      date: '2025-09-02'
    },
    {
      id: '5',
      type: 'expense',
      amount: 800,
      category: 'Food & Dining',
      description: 'Lunch',
      date: '2025-09-01'
    },
    {
      id: '6',
      type: 'income',
      amount: 2000,
      category: 'Freelance',
      description: 'Design project',
      date: '2025-09-01'
    }
  ]);

  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense' | 'savings',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      date: formData.date
    };

    setTransactions([newTransaction, ...transactions]);
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    // Hide form after successful submission
    if (onToggleForm) {
      onToggleForm();
    }
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  // Sort dates in descending order (newest first)
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  // Calculate daily totals
  const getDailyTotals = (dayTransactions: Transaction[]) => {
    const income = dayTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = dayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const savings = dayTransactions
      .filter(t => t.type === 'savings')
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expenses, savings };
  };

  // Overall totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSavings = transactions
    .filter(t => t.type === 'savings')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses - totalSavings;

  // Format date for display - date only
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Overall Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <ArrowUpCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Total Income</p>
              <p className="text-sm font-semibold text-green-600">₱{totalIncome.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <ArrowDownCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Total Expenses</p>
              <p className="text-sm font-semibold text-red-600">₱{totalExpenses.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <PiggyBank className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground mb-1">Total Savings</p>
              <p className="text-sm font-semibold text-blue-600">₱{totalSavings.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <ArrowUpCircle className={`h-6 w-6 mx-auto mb-2 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              <p className="text-xs text-muted-foreground mb-1">Net Balance</p>
              <p className={`text-sm font-semibold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₱{balance.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bold separator line between overview and digital records */}
      <div className="w-full border-t-4 border-primary/80 my-6 rounded-full"></div>

      {/* Add Transaction Form */}
      {showAddForm && (
        <Card className="glass-morphism shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Transaction
              </div>
              {onToggleForm && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onToggleForm}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4 transform rotate-45" />
                </Button>
              )}
            </CardTitle>
          </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type Selection */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.type === 'income'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ArrowUpCircle className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Income</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.type === 'expense'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ArrowDownCircle className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Expense</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'savings', category: '' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.type === 'savings'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <PiggyBank className="h-5 w-5 mx-auto mb-1" />
                <span className="text-sm font-medium">Save</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="amount" className="text-sm">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="date" className="text-sm">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category" className="text-sm">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {(formData.type === 'income' 
                    ? incomeCategories 
                    : formData.type === 'expense' 
                    ? expenseCategories 
                    : savingsCategories
                  ).map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description" className="text-sm">Description (optional)</Label>
              <Input
                id="description"
                placeholder="Add a note..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full gradient-primary shadow-luxury">
              Add Transaction
            </Button>
          </form>
        </CardContent>
      </Card>
      )}

      {/* Daily Transaction Groups */}
      <div className="space-y-4">
        {sortedDates.map((date) => {
          const dayTransactions = groupedTransactions[date];
          const { income, expenses, savings } = getDailyTotals(dayTransactions);
          const dailyNet = income - expenses - savings;

          return (
            <div key={date} className="space-y-3">
              {/* Daily Summary - Above separator line */}
              <div className="space-y-2">
                <div className="bg-green-50/70 border border-green-100/50 rounded-lg p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-4 text-xs text-foreground/80">
                    <span className="font-semibold text-green-800">{formatDate(date)}</span>
                    {expenses > 0 && (
                      <span className="text-red-600 font-medium">Expenses: ₱{expenses.toLocaleString()}</span>
                    )}
                    {income > 0 && (
                      <span className="text-green-600 font-medium">Income: ₱{income.toLocaleString()}</span>
                    )}
                    {savings > 0 && (
                      <span className="text-blue-600 font-medium">Savings: ₱{savings.toLocaleString()}</span>
                    )}
                  </div>
                </div>
                <div className="w-full border-t-2 border-green-200/60"></div>
              </div>

              {/* Daily Transactions */}
              <div className="space-y-2">
                {dayTransactions.map((transaction) => (
                  <Card key={transaction.id} className="glass-morphism shadow-card border-l-4 border-l-primary/20">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`p-2 rounded-full ${
                            transaction.type === 'income' 
                              ? 'bg-green-100' 
                              : transaction.type === 'expense'
                              ? 'bg-red-100'
                              : 'bg-blue-100'
                          }`}>
                            {transaction.type === 'income' ? (
                              <ArrowUpCircle className="h-4 w-4 text-green-600" />
                            ) : transaction.type === 'expense' ? (
                              <ArrowDownCircle className="h-4 w-4 text-red-600" />
                            ) : (
                              <PiggyBank className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium truncate">
                                {transaction.description || transaction.category}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {transaction.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-sm font-semibold ${
                            transaction.type === 'income' 
                              ? 'text-green-600' 
                              : transaction.type === 'expense'
                              ? 'text-red-600'
                              : 'text-blue-600'
                          }`}>
                            {transaction.type === 'income' ? '+' : transaction.type === 'expense' ? '-' : ''}₱{transaction.amount.toLocaleString()}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteTransaction(transaction.id)}
                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom spacing for better scrolling */}
      <div className="h-6"></div>
    </div>
  );
}