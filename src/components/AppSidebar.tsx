import { 
  BarChart3, 
  Bot, 
  Menu, 
  PlusCircle, 
  Settings, 
  TrendingUp, 
  Wallet,
  Target,
  PieChart,
  FileText,
  CreditCard
} from "lucide-react";
import { Button } from "./ui/button";
import { OptifyLogo } from "./OptifyLogo";

interface AppSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}

export function AppSidebar({ 
  activeSection, 
  onSectionChange, 
  isCollapsed, 
  onToggleCollapsed 
}: AppSidebarProps) {
  const menuItems = [
    { id: 'transactions', label: 'Transactions', icon: Wallet, desc: 'Track income & expenses' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, desc: 'Financial insights' },
    { id: 'goals', label: 'Goals', icon: Target, desc: 'Financial objectives' },
    { id: 'budgets', label: 'Budgets', icon: PieChart, desc: 'Spending limits' },
    { id: 'reports', label: 'Reports', icon: FileText, desc: 'Financial reports' },
    { id: 'advisor', label: 'AI Advisor', icon: Bot, desc: 'Smart recommendations' },
  ];

  return (
    <div className={`flex flex-col h-full glass-morphism border-r border-sidebar-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-72'
    }`} style={{ backdropFilter: 'blur(20px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border/50">
        {!isCollapsed && (
          <OptifyLogo size="md" showText={true} />
        )}
        {isCollapsed && (
          <OptifyLogo size="md" showText={false} />
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapsed}
          className="h-8 w-8 p-0 hover:bg-sidebar-accent/50 transition-all"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4">
          <Button 
            className="w-full justify-start gap-2 gradient-primary shadow-luxury hover:shadow-xl transition-all"
            onClick={() => onSectionChange('transactions')}
          >
            <PlusCircle className="h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start gap-3 h-12 transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-green-500/20 to-green-600/10 text-primary border border-green-200/30 shadow-sm' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                } ${isCollapsed ? 'px-2' : 'px-3'}`}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.desc}</span>
                  </div>
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Premium Features */}
      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border/50">
          <div className="bg-gradient-to-r from-green-50/50 to-green-100/30 rounded-lg p-3 border border-green-200/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <TrendingUp className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-semibold text-green-700">Premium</span>
            </div>
            <p className="text-xs text-green-600 mb-3">Unlock advanced analytics and AI insights</p>
            <Button size="sm" className="w-full gradient-primary text-xs">
              Upgrade Now
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border/50">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 h-10 text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-all ${
            isCollapsed ? 'px-2' : 'px-3'
          }`}
        >
          <Settings className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </Button>
      </div>
    </div>
  );
}