import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Send,
  HelpCircle,
  Award,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  Lightbulb,
  Cpu,
  GraduationCap
} from 'lucide-react';
import { LearnerProfile, SectorType } from '../types';
import { ASSESSMENT_QUESTIONS, COURSES_DATA } from '../data/mockData';

interface SkillAdvisorAIProps {
  profile: LearnerProfile;
  onSelectCourse: (courseId: string) => void;
  lang: 'en' | 'mr' | 'hi';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const SkillAdvisorAI: React.FC<SkillAdvisorAIProps> = ({
  profile,
  onSelectCourse,
  lang
}) => {
  // Assessment Quiz State
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [recommendedSector, setRecommendedSector] = useState<SectorType>('EV & Automotive');

  // AI Chatbot State
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text:
        lang !== 'en'
          ? 'नमस्कार! मी तुमचा कौशल्य सल्लागार (Kaushal Guru AI) आहे. आपण आपल्या कौशल्य विकास, NSQF पातळी अपग्रेड, अप्रेंटिसशिप किंवा वेतन अंदाजाबद्दल कोणताही प्रश्न विचारू शकता.'
          : 'Greetings! I am your Kaushal AI Career & Vocational Advisor. Ask me anything about NSQF progression, apprenticeship stipends, trade certifications, or high-demand job pathways.',
      timestamp: 'Just now'
    }
  ]);

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentStep] = optionIndex;
    setSelectedAnswers(updated);

    if (currentStep < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate scores
      const sectorScores: Record<string, number> = {
        'EV & Automotive': 0,
        'Clean Energy & Solar': 0,
        'Advanced Manufacturing & CNC': 0,
        'Drone Tech & Robotics': 0,
        'Healthcare & Caregiving': 0,
        'Artisan & Traditional Crafts': 0
      };

      updated.forEach((ansIdx, qIdx) => {
        const q = ASSESSMENT_QUESTIONS[qIdx];
        const opt = q.options[ansIdx];
        if (opt && opt.scoreWeight) {
          Object.entries(opt.scoreWeight).forEach(([sec, weight]) => {
            if (sectorScores[sec] !== undefined) {
              sectorScores[sec] += weight;
            }
          });
        }
      });

      // Find top sector
      let maxScore = -1;
      let topSector: SectorType = 'EV & Automotive';
      Object.entries(sectorScores).forEach(([sec, score]) => {
        if (score > maxScore) {
          maxScore = score;
          topSector = sec as SectorType;
        }
      });

      setRecommendedSector(topSector);
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          learnerProfile: profile,
          currentTopic: recommendedSector
        })
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Guidance generated.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Advisor query error:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text:
          'Based on industry data: NSQF Level 5 certification in EV and Solar provides the highest starting wage growth (+35% in first year) with NAPS guaranteed apprenticeship stipends.',
        timestamp: 'Just now'
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'How do I upgrade from NSQF Level 4 to Level 5 in EV?',
    'What are highest paying solar technician jobs in Gujarat?',
    'What is the difference between NAPS apprenticeship and regular job?'
  ];

  // Matching course for recommended sector
  const recommendedCourse = COURSES_DATA.find((c) => c.sector === recommendedSector) || COURSES_DATA[0];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 text-xs font-bold">
          <Compass className="w-3.5 h-3.5 text-orange-600" />
          <span>AI-Powered Vocational Guidance</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B3C5D]">
          {lang !== 'en' ? 'कौशल्य मार्ग आणि करिअर सल्लागार' : 'Skill Path Diagnostic & AI Advisor'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">
          Discover your optimal NSQF trade pathway, match your hands-on aptitude, and plan your career
          with India-wide industry benchmarks.
        </p>
      </div>

      {/* Two Column Layout: Diagnostic Quiz & Live Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Diagnostic Quiz (5 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-[#0B3C5D] text-sm sm:text-base">
                  {lang !== 'en' ? 'कौशल्य योग्यता आणि ट्रेड डायग्नोस्टिक' : 'Aptitude & Trade Matcher'}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                {quizCompleted ? 'Completed' : `Step ${currentStep + 1} of ${ASSESSMENT_QUESTIONS.length}`}
              </span>
            </div>

            {!quizCompleted ? (
              <div className="space-y-4">
                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0B3C5D] h-full transition-all duration-300"
                    style={{
                      width: `${((currentStep + 1) / ASSESSMENT_QUESTIONS.length) * 100}%`
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-orange-600 font-bold uppercase tracking-wider">
                    Question {currentStep + 1}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {lang === 'hi'
                      ? ASSESSMENT_QUESTIONS[currentStep].hindiQuestion
                      : ASSESSMENT_QUESTIONS[currentStep].question}
                  </h4>
                </div>

                {/* Options list */}
                <div className="space-y-2.5 pt-2">
                  {ASSESSMENT_QUESTIONS[currentStep].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className="w-full text-left p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-[#0B3C5D] text-xs sm:text-sm text-slate-800 transition cursor-pointer flex items-start gap-3 group"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-200 group-hover:bg-[#0B3C5D] group-hover:text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 transition">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="leading-relaxed font-medium">
                        {lang === 'hi' ? opt.hindiText : opt.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Quiz Completed Result */
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm text-emerald-800">
                      Assessment Successfully Calibrated
                    </div>
                    <div className="font-medium">
                      Your analytical approach and practical aptitude match high-growth vocational
                      demands.
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs text-slate-500 font-bold uppercase">Recommended Sector</div>
                  <div className="text-xl font-black text-[#0B3C5D]">{recommendedSector}</div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    National skill gap audits show a projected 32% growth in certified technicians for{' '}
                    <span className="text-slate-900 font-bold">{recommendedSector}</span> over the next 24
                    months.
                  </p>

                  {/* Course recommendation banner */}
                  {recommendedCourse && (
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-3">
                      <div className="text-xs">
                        <div className="text-[11px] text-slate-500 font-bold">Featured NSQF Track</div>
                        <div className="font-bold text-slate-900 text-xs line-clamp-1">
                          {recommendedCourse.title}
                        </div>
                      </div>
                      <button
                        onClick={() => onSelectCourse(recommendedCourse.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#F37021] hover:bg-[#E05F12] text-white font-bold text-xs shrink-0 cursor-pointer shadow-xs"
                      >
                        View Track
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleRestartQuiz}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 border border-slate-300 transition cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-orange-600" />
                  <span>Retake Aptitude Matcher</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Kaushal Guru Career Chat (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between h-[520px]">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0B3C5D] flex items-center justify-center text-white font-black text-xs shadow-xs">
                कौ
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Kaushal Guru AI</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  Powered by Gemini 3.8 Flash • Government & Industry Vocations
                </div>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
              Live Advisor
            </span>
          </div>

          {/* Messages list scrollable */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs sm:text-sm">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0B3C5D] text-white font-medium rounded-tr-none shadow-xs'
                      : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none space-y-1.5 font-medium'
                  }`}
                >
                  <div className="whitespace-pre-line text-xs sm:text-sm">{msg.text}</div>
                  <div
                    className={`text-[9px] mt-1 text-right font-medium ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-orange-600 font-bold p-2">
                <Sparkles className="w-4 h-4 animate-spin text-orange-600" />
                <span>Consulting vocational standards & apprenticeship databases...</span>
              </div>
            )}
          </div>

          {/* Prompt suggestions pills */}
          <div className="pt-2 pb-2">
            <div className="text-[10px] text-slate-500 font-bold mb-1.5 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-orange-600" />
              <span>Suggested Inquiries:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {samplePrompts.map((p, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] whitespace-nowrap border border-slate-200 transition cursor-pointer font-medium"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 pt-2 border-t border-slate-100"
          >
            <input
              type="text"
              placeholder={
                lang !== 'en'
                  ? 'आपल्या कौशल्याबद्दल, अप्रेंटिसशिप किंवा वेतनाबद्दल विचारा...'
                  : 'Ask about NSQF levels, NAPS stipends, trade exams...'
              }
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B3C5D] transition"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="p-2.5 rounded-xl bg-[#F37021] hover:bg-[#E05F12] disabled:opacity-50 text-white font-bold transition cursor-pointer shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
