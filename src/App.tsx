import { useState } from 'react';
import { TransactionManager } from './components/TransactionManager';
import { Analytics } from './components/Analytics';
import { Goals } from './components/Goals';
import { Budgets } from './components/Budgets';
import { Reports } from './components/Reports';
import { AIAdvisor } from './components/AIAdvisor';
import { OptifyLogo } from './components/OptifyLogo';
import { 
  Wallet, 
  BarChart3, 
  Target, 
  PieChart, 
  FileText, 
  Bot, 
  Plus,
  Menu,
  Bell
} from 'lucide-react';
import { Button } from './components/ui/button';

export default function App() {
  const [activeSection, setActiveSection] = useState('transactions');
  const [showMenu, setShowMenu] = useState(false);
  const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);

  // Reset add form when switching sections
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId !== 'transactions') {
      setShowAddTransactionForm(false);
    }
  };

  const menuItems = [
    { id: 'transactions', label: 'Transactions', icon: Wallet, shortLabel: 'Wallet' },
    { id: 'budgets', label: 'Budgets', icon: PieChart, shortLabel: 'Budget' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, shortLabel: 'Stats' },
    { id: 'goals', label: 'Goals', icon: Target, shortLabel: 'Goals' },
    { id: 'reports', label: 'Reports', icon: FileText, shortLabel: 'Reports' },
    { id: 'advisor', label: 'AI Advisor', icon: Bot, shortLabel: 'AI' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'transactions':
        return (
          <TransactionManager 
            showAddForm={showAddTransactionForm}
            onToggleForm={() => setShowAddTransactionForm(!showAddTransactionForm)}
          />
        );
      case 'analytics':
        return <Analytics />;
      case 'goals':
        return <Goals />;
      case 'budgets':
        return <Budgets />;
      case 'reports':
        return <Reports />;
      case 'advisor':
        return <AIAdvisor />;
      default:
        return (
          <TransactionManager 
            showAddForm={showAddTransactionForm}
            onToggleForm={() => setShowAddTransactionForm(!showAddTransactionForm)}
          />
        );
    }
  };

  // Fixed header - no longer depends on active section

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden max-w-md mx-auto">
      {/* Fixed Header */}
      <div className="glass-morphism border-b border-border/50 safe-area-top" style={{ backdropFilter: 'blur(20px)' }}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <OptifyLogo size="sm" showText={false} />
              <div>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text text-transparent tracking-tight">
                  OPTIFY
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Optimize Finance
                </p>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 pb-24">
          {renderContent()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto glass-morphism border-t border-border/50 safe-area-bottom" style={{ backdropFilter: 'blur(20px)' }}>
        <div className="grid grid-cols-7 gap-1 p-2">
          {menuItems.slice(0, 3).map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-br from-green-500/20 to-green-600/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.shortLabel}</span>
                {isActive && (
                  <div className="w-1 h-1 bg-primary rounded-full mt-1"></div>
                )}
              </button>
            );
          })}
          
          {/* Center Plus Button */}
          <button 
            onClick={() => {
              if (activeSection !== 'transactions') {
                handleSectionChange('transactions');
              }
              setShowAddTransactionForm(!showAddTransactionForm);
            }}
            className="flex flex-col items-center justify-center p-1 transition-all duration-200"
          >
            <div className="w-14 h-14 gradient-primary rounded-full shadow-luxury flex items-center justify-center mb-1 hover:shadow-xl transition-shadow">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Add</span>
          </button>
          
          {menuItems.slice(3).map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-br from-green-500/20 to-green-600/10 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.shortLabel}</span>
                {isActive && (
                  <div className="w-1 h-1 bg-primary rounded-full mt-1"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>


    </div>
  );
}