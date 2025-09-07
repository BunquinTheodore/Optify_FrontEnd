import { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface DateFilterProps {
  selectedMonth: string;
  selectedYear: string;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;
}

const months = [
  { value: 'january', label: 'Jan' },
  { value: 'february', label: 'Feb' },
  { value: 'march', label: 'Mar' },
  { value: 'april', label: 'Apr' },
  { value: 'may', label: 'May' },
  { value: 'june', label: 'Jun' },
  { value: 'july', label: 'Jul' },
  { value: 'august', label: 'Aug' },
  { value: 'september', label: 'Sep' },
  { value: 'october', label: 'Oct' },
  { value: 'november', label: 'Nov' },
  { value: 'december', label: 'Dec' }
];

const years = ['2023', '2024', '2025', '2026'];

export function DateFilter({ selectedMonth, selectedYear, onMonthChange, onYearChange }: DateFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedMonthLabel = months.find(m => m.value === selectedMonth)?.label || 'Aug';

  return (
    <div className="flex items-center gap-2 mb-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="glass-morphism shadow-card border-border/30 hover:shadow-luxury transition-all duration-200 px-3 py-2 h-auto"
            type="button"
          >
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span className="font-medium text-sm">
              {selectedMonthLabel} {selectedYear}
            </span>
            <ChevronDown className={`h-4 w-4 ml-2 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 glass-morphism shadow-luxury border-border/30" align="start">
          <div className="p-4">
            <div className="space-y-4">
              {/* Year Selection */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Year</label>
                <div className="grid grid-cols-4 gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => onYearChange(year)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        selectedYear === year
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Month Selection */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Month</label>
                <div className="grid grid-cols-3 gap-2">
                  {months.map((month) => (
                    <button
                      key={month.value}
                      type="button"
                      onClick={() => {
                        onMonthChange(month.value);
                        setIsOpen(false);
                      }}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        selectedMonth === month.value
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {month.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}