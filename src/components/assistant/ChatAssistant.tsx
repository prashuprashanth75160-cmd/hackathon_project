import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  Droplets,
  Trash2,
  Footprints,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  IndianRupee,
} from 'lucide-react';
import { ChatMessage } from '../../types/campus';
import { useCampus } from '../../context/CampusContext';

export const ChatAssistant: React.FC = () => {
  const { locations, metrics } = useCampus();

  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      timestamp: '10:00 AM',
      text: "Hello! I am Eco AI, Dayananda Sagar University's campus sustainability intelligence co-pilot. I analyze building telemetry, computer vision waste streams, and resource simulations to recommend data-driven green policies.",
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    'How can DSU reduce electricity usage?',
    'How can the campus save water?',
    'Which campus location needs attention?',
    'How can recycling improve?',
    'How can the university reduce its carbon footprint?',
  ];

  const handleSendMessage = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: queryText,
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI knowledge engine generator
    setTimeout(() => {
      const q = queryText.toLowerCase();
      let responseMsg: ChatMessage;

      if (q.includes('electricity') || q.includes('energy') || q.includes('power')) {
        responseMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Based on DSU's current telemetry (${metrics.totalElectricityKwh} kWh/day total draw), the Academic Block and Hostel represent over 45% of peak load. Unoccupied lecture halls and baseline night standby consumption are primary vectors for optimization.`,
          structuredData: {
            identifiedIssue: 'Ghost electricity draw in Academic Block (Floor 3) and off-peak electric geysers in Hostel.',
            recommendedActions: [
              'Install PIR motion-activated smart lighting controls in all 42 seminar halls',
              'Calibrate central HVAC temperature setpoints to 24.5°C across daytime peaks',
              'Schedule automated PC sleep policies across engineering computer labs by 7:00 PM',
            ],
            priority: 'High',
            environmentalBenefit: 'Avoids ~195 kg CO2e emissions daily across academic faculties',
            estimatedSavings: 'Estimated ₹1,200 to ₹1,800/day in utility bill reduction (₹5.2 Lakhs annually)',
          },
        };
      } else if (q.includes('water') || q.includes('leak') || q.includes('faucet')) {
        responseMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `DSU campus currently consumes approximately ${metrics.totalWaterLitres.toLocaleString()} Litres/day. Water audit flags the Campus Canteen kitchen wash area and sports field daytime sprinkler schedules as urgent conservation targets.`,
          structuredData: {
            identifiedIssue: 'Continuous flow micro-leaks in Canteen wash basins + evaporative loss from afternoon lawn irrigation.',
            recommendedActions: [
              'Retrofit 3.8 L/min pressure aerators on all cafeteria wash counters',
              'Reschedule sports turf sprinklers to early morning (05:00 - 06:30 AM) to curb 40% evaporation',
              'Deploy ultrasonic flow meters on Kaveri Hostel main risers for instant burst alarms',
            ],
            priority: 'Immediate',
            environmentalBenefit: 'Conserves up to 6,200 Litres of municipal and borewell water daily',
            estimatedSavings: '₹400/day direct savings + reduced overhead pumping energy',
          },
        };
      } else if (q.includes('attention') || q.includes('critical') || q.includes('location') || q.includes('building')) {
        const criticalLocs = locations.filter(l => l.status !== 'optimal');
        responseMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `The digital twin identifies ${criticalLocs.length} locations requiring intervention. Top focus: ${criticalLocs.map(l => l.name).join(' & ')}.`,
          structuredData: {
            identifiedIssue: 'Canteen waste segregation (44% recycled) and Academic Block after-hours power draw.',
            recommendedActions: [
              'Dispatch maintenance crew to Canteen tap #4 leak reported at 08:30 AM',
              'Audit Academic Block 3rd floor automated cutoff timers',
              'Deploy student eco-ambassadors during peak 1:00 PM lunch hours at food court',
            ],
            priority: 'High',
            environmentalBenefit: 'Elevates DSU Campus Green Score from 78 to 86/100',
            estimatedSavings: 'Recovers 42 kg/day recyclable materials from municipal landfill stream',
          },
        };
      } else if (q.includes('recycl') || q.includes('waste') || q.includes('plastic') || q.includes('segregat')) {
        responseMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Campus waste stream stands at ${metrics.totalWasteKg} kg/day with an overall ${metrics.wasteRecycledPct}% segregation rate. The Computer Vision Waste Sentinel detects high single-use plastics mixed into wet cafeteria bins.`,
          structuredData: {
            identifiedIssue: 'Food court container mixing and unsegregated beverage bottles.',
            recommendedActions: [
              'Introduce color-coded smart bin stations (Blue = Dry, Green = Wet, Red = Hazardous)',
              'Incentivize clean PET bottle returns via DSU Green Points leaderboard',
              'Partner with Bengaluru certified composters for 100% organic waste vermiculture conversion',
            ],
            priority: 'Medium',
            environmentalBenefit: 'Diverts 140+ tons of solid waste annually from landfills',
            estimatedSavings: 'Generates high-grade organic fertilizer for campus gardens',
          },
        };
      } else {
        responseMsg = {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Dayananda Sagar University's estimated carbon footprint is ${metrics.totalCarbonKg} kg CO2e/day. Grid electricity represents 72% of this baseline, followed by commuting transport (18%) and solid waste decomposition (10%).`,
          structuredData: {
            identifiedIssue: 'Reliance on fossil-heavy grid electricity during daytime cooling peaks.',
            recommendedActions: [
              'Expand DSU rooftop solar PV arrays to increase clean self-generation past 500 kWh/day',
              'Promote campus EV shuttle connectivity between Kudlu Gate & transit hubs',
              'Implement a paperless administrative exam and circular digital archive policy',
            ],
            priority: 'Medium',
            environmentalBenefit: 'Potential 30% reduction in campus scope 1 & 2 carbon emissions by 2028',
            estimatedSavings: 'Estimated ₹12 Lakhs annual savings in net-metered solar power',
          },
        };
      }

      setMessages(prev => [...prev, responseMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-eco-green/20 flex flex-col h-[700px]">
      
      {/* Assistant Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-eco-green to-eco-cyan flex items-center justify-center shadow-glow-green text-campus-darkest">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-white">Eco AI Assistant</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-eco-green/20 text-eco-green font-bold border border-eco-green/30">
                DSU Intelligence Agent (Demo Mode)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Campus Environmental Advisor • Context-Aware Telemetry Analysis
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-eco-green animate-ping" />
          <span>Rule Engine & LLM Ready</span>
        </div>
      </div>

      {/* Suggested Questions Pills */}
      <div className="py-3 flex-shrink-0 overflow-x-auto">
        <p className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-eco-cyan" />
          <span>Frequently Asked Sustainability Queries:</span>
        </p>
        <div className="flex space-x-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-lg bg-campus-darkest/70 hover:bg-campus-surface border border-white/10 text-[11px] text-slate-300 hover:text-white whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-2">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-eco-cyan/20 border border-eco-cyan/40 text-slate-100 rounded-br-none'
                  : 'bg-campus-darkest/80 border border-white/10 text-slate-200 rounded-bl-none space-y-3'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span className="font-bold uppercase tracking-wider">
                  {msg.sender === 'user' ? 'You' : 'Eco AI Sentinel'}
                </span>
                <span className="font-mono">{msg.timestamp}</span>
              </div>

              <p>{msg.text}</p>

              {/* Structured AI Analysis Card if present */}
              {msg.structuredData && (
                <div className="mt-3 p-3.5 rounded-xl bg-campus-card/90 border border-eco-green/20 space-y-2.5 text-xs">
                  
                  {msg.structuredData.identifiedIssue && (
                    <div>
                      <span className="font-bold text-eco-amber flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Identified Issue:</span>
                      </span>
                      <p className="text-slate-300 mt-0.5 pl-4">
                        {msg.structuredData.identifiedIssue}
                      </p>
                    </div>
                  )}

                  {msg.structuredData.recommendedActions && (
                    <div>
                      <span className="font-bold text-eco-green flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Recommended Actions:</span>
                      </span>
                      <ul className="mt-1 space-y-1 pl-6 list-disc text-slate-200">
                        {msg.structuredData.recommendedActions.map((act, i) => (
                          <li key={i}>{act}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    {msg.structuredData.priority && (
                      <div className="flex items-center space-x-1.5">
                        <span className="text-slate-400">Implementation Priority:</span>
                        <span
                          className={`font-bold px-1.5 py-0.2 rounded text-[10px] ${
                            msg.structuredData.priority === 'Immediate' || msg.structuredData.priority === 'High'
                              ? 'bg-eco-red/20 text-eco-red'
                              : 'bg-eco-amber/20 text-eco-amber'
                          }`}
                        >
                          {msg.structuredData.priority}
                        </span>
                      </div>
                    )}

                    {msg.structuredData.environmentalBenefit && (
                      <div className="text-eco-cyan">
                        <span className="text-slate-400">Impact: </span>
                        <span>{msg.structuredData.environmentalBenefit}</span>
                      </div>
                    )}
                  </div>

                  {msg.structuredData.estimatedSavings && (
                    <div className="p-2 rounded bg-eco-green/10 border border-eco-green/20 text-eco-green font-semibold text-[11px] flex items-center space-x-1">
                      <IndianRupee className="w-3.5 h-3.5" />
                      <span>{msg.structuredData.estimatedSavings}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="p-3 rounded-xl bg-campus-darkest/70 border border-white/10 text-xs text-eco-green flex items-center space-x-2 animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Eco AI is synthesizing telemetry data...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="pt-3 border-t border-white/10 flex items-center space-x-2 flex-shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Ask Eco AI about campus energy, water leaks, or recycling strategies..."
          className="flex-1 bg-campus-darkest border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-eco-green"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className={`p-2.5 rounded-xl text-campus-darkest transition-all ${
            !inputText.trim() || isTyping
              ? 'bg-slate-800 text-slate-500'
              : 'bg-eco-green hover:bg-eco-greenDark shadow-glow-green font-bold'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
