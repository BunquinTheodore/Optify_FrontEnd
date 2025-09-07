import { useState } from 'react';
import { Send, Bot, User, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// Suggestion interface moved to Reports component

// AI Insights moved to Reports component

export function AIAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI financial advisor. I've analyzed your financial data and I'm here to help you make better financial decisions. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (question: string): string => {
    const responses: { [key: string]: string } = {
      'savings': "Based on your current financial data, here are some ways to improve your savings rate:\n\n1. **Reduce dining expenses**: You're spending $800/month on food. Try meal planning to cut this by 20%.\n2. **Automate savings**: Set up automatic transfers of $500 right after payday.\n3. **Review subscriptions**: Cancel unused services to save $50-100/month.\n\nYour current savings rate of 34% is already good, but reaching 40% would put you ahead of 90% of people your age.",
      
      'investment': "Given your financial profile, here's my investment recommendation:\n\n**Current situation**: Stable income, good savings rate\n**Risk tolerance**: Moderate (based on age and income stability)\n\n**Recommended allocation**:\n• 60% Stock index funds (diversified growth)\n• 30% Bond funds (stability)\n• 10% International funds (diversification)\n\nStart with $500/month and increase by $50 monthly. This could grow to $180,000 in 10 years with 7% average returns.",
      
      'spending': "Here's your spending pattern analysis:\n\n**Top categories**:\n1. Bills & Utilities: $1,200 (36% of expenses)\n2. Food & Dining: $800 (24% of expenses)\n3. Shopping: $500 (15% of expenses)\n\n**Insights**:\n• Your housing costs are well within the 30% rule ✅\n• Food spending is above average for your income level ⚠️\n• Entertainment spending increased 23% this month 📈\n\n**Recommendation**: Focus on meal planning to reduce food costs by $150/month.",
      
      'emergency': "Let's build your emergency fund strategically:\n\n**Target amount**: $15,000 (3-6 months of expenses)\n**Current progress**: Need to determine your existing savings\n\n**Action plan**:\n1. **Start small**: Save $500 this month\n2. **Automate**: Set up automatic transfer of $400/month\n3. **Use windfalls**: Put tax refunds, bonuses directly into emergency fund\n4. **High-yield account**: Earn 4-5% APY while building\n\n**Timeline**: You could reach your goal in 30 months with consistent saving."
    };

    // Simple keyword matching for demo
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('savings') || lowerQuestion.includes('save')) {
      return responses.savings;
    } else if (lowerQuestion.includes('invest') || lowerQuestion.includes('stock') || lowerQuestion.includes('bond')) {
      return responses.investment;
    } else if (lowerQuestion.includes('spending') || lowerQuestion.includes('pattern') || lowerQuestion.includes('expense')) {
      return responses.spending;
    } else if (lowerQuestion.includes('emergency') || lowerQuestion.includes('fund')) {
      return responses.emergency;
    }

    return "That's a great question! Based on your financial data, I can provide personalized advice. Could you be more specific about what aspect of your finances you'd like to focus on? I can help with budgeting, investing, savings strategies, debt management, or financial goal planning.";
  };



  return (
    <div className="h-full flex flex-col">
      {/* Chat Interface */}
      <Card className="flex-1 flex flex-col min-h-[500px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Financial Advisor
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-muted'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 opacity-70`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>



          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything about your finances..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom spacing for better scrolling */}
      <div className="h-6"></div>
    </div>
  );
}