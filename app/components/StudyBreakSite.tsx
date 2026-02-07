"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Timer, Heart, Archive, Shuffle, Coffee, Brain, Zap, Phone } from 'lucide-react';

export default function StudyBreakSite() {
  const [activeSection, setActiveSection] = useState('home');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentRoulette, setCurrentRoulette] = useState(null);
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [canChangeProtocol, setCanChangeProtocol] = useState(true);
  const [currentResponse, setCurrentResponse] = useState(null);
  const cooldownTimer = useRef(null);

  // Her exam end date
  const examEndDate = new Date('2026-04-10');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = examEndDate - now;
      
      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const rouletteOptions = {
    philosophy: [
      "If you could know the absolute truth of one thing, what would you choose?",
      "Is it better to be a big fish in a small pond or a small fish in a big ocean?",
      "Does everything happen for a reason, or do we create the reasons after?",
      "If we replace every part of a ship over time, is it still the same ship?",
      "Would you rather be wise and sad or blissfully ignorant?",
    ],
    thoughts: [
      "What if the version of me I'm becoming is better than the one I planned to be?",
      "Sometimes the best preparation is trusting that you've done enough.",
      "Every expert was once where you are now, wondering if they'd make it.",
      "The hardest battles are fought in silence, where no one can see your effort.",
      "What if uncertainty is just growth that hasn't shown its face yet?"
    ],
    songs: [
      "Raabta (Kehti Hain Khuda Ne) - Agent Vinod",
      "In The Air - Advaita (my fav)",
      "We're Best Friends - Hans Zimmer",
      "Magika - Thomas Bergersen",
      "Stronger - Kanye West",
      "Lonely Roads - MGK ft. Jelly Roll",
      "Time - Hans Zimmer (for deep focus)",
      "Cornfield Chase - Hans Zimmer (epic motivation)",
      "Dreams - Fleetwood Mac (smooth vibes)",
      "Sunset Lover - Petit Biscuit (chill study)"
    ],
    polls: [
      "Would you rather: Never have to study again OR have perfect memory but still need to study?",
      "Fight 100 duck-sized environment questions or 1 horse-sized society case study?",
      "Coffee at 2am or sleep? (There's only one right answer)",
      "Be able to pause time during exams OR read 10x faster?",
      "Would you rather: Master every subject overnight OR gain unshakeable exam confidence?"
    ]
  };

  const emergencyProtocols = {
    melting: {
      icon: Brain,
      color: "from-rose-400 to-pink-500",
      responses: [
        {
          message: "Brain is officially soup. Take 5.",
          action: "Close the book. Touch grass (or at least look at a plant). You've been going too hard."
        },
        {
          message: "Error 404: Brain not found.",
          action: "Step away from the desk. Do 10 jumping jacks. Drink water. Your neurons need a reboot."
        },
        {
          message: "You've hit the cognitive wall.",
          action: "That thing where you read the same line 5 times? Yeah, time for a real break. Walk around. Call someone. Eat something."
        },
        {
          message: "Mental capacity: 0%",
          action: "Fun fact: Your brain uses 20% of your body's energy. Right now it's running on fumes. Go refuel - snack, nap, or just stare at nothing for 10 minutes."
        },
        {
          message: "System overload detected.",
          action: "You know that feeling when words stop making sense? That's your brain's way of saying 'please stop'. Listen to it. Take an actual break, not a phone break."
        }
      ]
    },
    motivation: {
      icon: Zap,
      color: "from-amber-400 to-orange-500",
      responses: [
        {
          message: "You got this. Seriously.",
          action: "Remember: You've survived 100% of your worst days. This is just another one you'll conquer."
        },
        {
          message: "Future you is watching.",
          action: "Every minute you put in now is a gift to yourself later. When you're done with PSC prep, you'll be so grateful you pushed through today."
        },
        {
          message: "This is temporary.",
          action: "In a month, this will be a memory. In a year, you'll barely remember how stressed you felt. But the result of your effort? That stays."
        },
        {
          message: "You're stronger than you think.",
          action: "The fact that you're still going despite feeling tired? That's not weakness, that's resilience. You're doing better than you realize."
        },
        {
          message: "Small progress is still progress.",
          action: "You don't have to be perfect. You don't have to know everything. You just have to show up and try. And you're already doing that."
        },
        {
          message: "The hardest part is showing up.",
          action: "And you did. You're here. You're trying. Even on the days it feels impossible, you keep going. That's what makes the difference."
        }
      ]
    },
    existential: {
      icon: Sparkles,
      color: "from-indigo-400 to-purple-500",
      responses: [
        {
          message: "Why are we here? Just to suffer?",
          action: "Yes, but also: to eat good food, make each other laugh, and occasionally ace those current affairs. That's pretty cool."
        },
        {
          message: "What is the meaning of this?",
          action: "Objectively? Clearing the exam. Subjectively? Proving to yourself you can do hard things. Both matter."
        },
        {
          message: "Does any of this matter?",
          action: "In the grand cosmic scale? Probably not. But to you, right now, trying to build the life you want? Absolutely."
        },
        {
          message: "Is this worth it?",
          action: "Ask yourself in a year. But probably yes - not because exams are everything, but because finishing what you started is how you learn to trust yourself."
        },
        {
          message: "Why do we do this to ourselves?",
          action: "Because growth is uncomfortable. Because proving something to yourself matters. Because future opportunities need current effort. Take a breath, it's okay to question it."
        },
        {
          message: "Nothing makes sense right now.",
          action: "That's fine. Sometimes you just have to trust the process even when your brain is like 'but why tho'. The clarity comes later."
        }
      ]
    },
    tired: {
      icon: Coffee,
      color: "from-teal-400 to-cyan-500",
      responses: [
        {
          message: "Sleep is not a weakness.",
          action: "Your brain consolidates memories during sleep. Studying while exhausted is like trying to save a file on a computer that's shutting down."
        },
        {
          message: "Coffee won't fix this.",
          action: "You know what will? Actual sleep. Even 20 minutes can help. Your body is literally asking for rest. Listen to it."
        },
        {
          message: "Diminishing returns alert.",
          action: "After a certain point, more hours ≠ more learning. You're probably past that point. Sleep now, study better tomorrow."
        },
        {
          message: "You're running on empty.",
          action: "Tired studying is just performance theater. You're going through motions without actually absorbing anything. Go rest. Come back fresh."
        },
        {
          message: "Your brain needs downtime.",
          action: "It's not lazy to rest when you're exhausted. It's strategic. You'll retain more in 2 focused hours tomorrow than 4 zombie hours tonight."
        },
        {
          message: "Sleep = secret weapon.",
          action: "All-nighters sound hardcore but they're actually sabotage. Your brain processes and organizes info while you sleep. Don't skip the most important part."
        }
      ]
    }
  };

  const spinRoulette = () => {
    const categories = Object.keys(rouletteOptions);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const options = rouletteOptions[randomCategory];
    const randomOption = options[Math.floor(Math.random() * options.length)];
    
    setCurrentRoulette({ category: randomCategory, content: randomOption });
  };

  if (activeSection === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-15 blur-2xl"></div>
        
        <div className="max-w-2xl w-full text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-serif italic bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600 bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display, serif' }}>
              Survival Kit
            </h1>
            <p className="text-xl text-stone-600">
              For when the brain needs a break
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12">
            {[
              { id: 'roulette', icon: Shuffle, label: 'Study Break Roulette', desc: 'Random chaos', gradient: 'from-rose-500 to-pink-500' },
              { id: 'countdown', icon: Timer, label: 'Freedom Countdown', desc: 'Days until liberation', gradient: 'from-purple-500 to-indigo-500' },
              { id: 'emergency', icon: Heart, label: 'Emergency Protocols', desc: 'For crisis moments', gradient: 'from-orange-500 to-amber-500' },
              { id: 'capsule', icon: Archive, label: 'Time Capsule', desc: 'Coming after exams', gradient: 'from-teal-500 to-cyan-500' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                disabled={section.id === 'capsule'}
                className={`p-8 rounded-3xl border-2 transition-all duration-500 text-left group relative overflow-hidden ${
                  section.id === 'capsule' 
                    ? 'border-stone-300 bg-stone-50/50 opacity-40 cursor-not-allowed backdrop-blur-sm' 
                    : 'border-white/60 bg-white/40 hover:bg-white/60 backdrop-blur-sm hover:scale-105 hover:shadow-2xl hover:border-white/80'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <section.icon className={`w-10 h-10 mb-4 transition-all duration-500 ${section.id !== 'capsule' && 'group-hover:scale-110 group-hover:rotate-12'}`} 
                  style={{ color: section.id === 'capsule' ? '#999' : undefined }} />
                <h3 className="text-xl font-bold mb-2">{section.label}</h3>
                <p className="text-sm opacity-70">{section.desc}</p>
              </button>
            ))}
          </div>

          <p className="text-sm text-stone-500 mt-12 italic">
            Since we haven't met, this is something I want you to have — made with very little effort, more excitement, and care 💫
          </p>
        </div>
      </div>
    );
  }

  if (activeSection === 'roulette') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full opacity-20 blur-3xl"></div>
        
        <button 
          onClick={() => setActiveSection('home')} 
          className="absolute top-8 left-8 text-sm hover:underline text-stone-600 hover:text-stone-900 transition-colors"
        >
          ← Back
        </button>

        <div className="max-w-2xl w-full space-y-10 relative z-10">
          <h2 className="text-5xl font-serif italic text-center bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display, serif' }}>
            Study Break Roulette
          </h2>

          <div className="text-center space-y-8">
            {currentRoulette ? (
              <div className="p-10 rounded-3xl bg-white/60 backdrop-blur-lg border-2 border-white/80 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-orange-100 opacity-30"></div>
                <div className="relative z-10">
                  <div className="text-xs uppercase tracking-wider font-bold text-orange-700 mb-4">
                    {currentRoulette.category}
                  </div>
                  <p className="text-2xl font-medium leading-relaxed text-stone-800">
                    {currentRoulette.content}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-20 rounded-3xl border-2 border-dashed border-stone-300 bg-white/30 backdrop-blur-sm">
                <p className="text-xl text-stone-500">Hit the button and see what happens</p>
              </div>
            )}

            <button
              onClick={spinRoulette}
              className="px-10 py-5 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 mx-auto"
            >
              <Shuffle className="w-6 h-6" />
              {currentRoulette ? 'Spin Again' : 'Spin the Wheel'}
            </button>
          </div>

          <div className="text-center text-sm text-stone-500 space-y-1">
            <p>Random philosophy questions, reflections,</p>
            <p>song recs, and polls to reset your brain</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'countdown') {
    const messages = [
      "You're doing great. Keep the momentum going.",
      "Every hour of prep now = less stress when it begins.",
      "You've got time. Use it wisely, but also rest when needed.",
      "The preparation matters more than the panic. Stay steady.",
      "Future you will thank present you for showing up today.",
      "Consistency beats cramming. You're on the right track.",
      "This countdown is a reminder: you're not running out of time, you're using it well."
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute top-20 left-1/3 w-32 h-32 bg-gradient-to-br from-purple-200 to-indigo-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-300 rounded-full opacity-20 blur-3xl"></div>
        
        <button 
          onClick={() => setActiveSection('home')} 
          className="absolute top-8 left-8 text-sm hover:underline text-stone-600 hover:text-stone-900 transition-colors"
        >
          ← Back
        </button>

        <div className="max-w-2xl w-full space-y-12 text-center relative z-10">
          <h2 className="text-5xl font-serif italic bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display, serif' }}>
            Freedom Countdown
          </h2>

          <div className="p-12 rounded-3xl bg-white/60 backdrop-blur-lg border-2 border-white/80 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-indigo-100 opacity-30"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-purple-600 to-indigo-600 bg-clip-text text-transparent">{countdown.days}</div>
                  <div className="text-sm uppercase tracking-wider text-stone-600 mt-2">Days</div>
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-indigo-600 to-blue-600 bg-clip-text text-transparent">{countdown.hours}</div>
                  <div className="text-sm uppercase tracking-wider text-stone-600 mt-2">Hours</div>
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent">{countdown.minutes}</div>
                  <div className="text-sm uppercase tracking-wider text-stone-600 mt-2">Minutes</div>
                </div>
                <div>
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-cyan-600 to-teal-600 bg-clip-text text-transparent">{countdown.seconds}</div>
                  <div className="text-sm uppercase tracking-wider text-stone-600 mt-2">Seconds</div>
                </div>
              </div>
              <p className="text-lg italic text-stone-700">until exams END</p>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/60">
            <p className="text-lg italic text-stone-700">{randomMessage}</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'emergency') {
    const getRandomResponse = (protocolKey) => {
      const responses = emergencyProtocols[protocolKey].responses;
      return responses[Math.floor(Math.random() * responses.length)];
    };

    const handleProtocolClick = (key) => {
      if (!canChangeProtocol && activeProtocol === key) return;
      
      // Clear any existing timer
      if (cooldownTimer.current) {
        clearTimeout(cooldownTimer.current);
      }
      
      // Set new response immediately
      const newResponse = getRandomResponse(key);
      setCurrentResponse(newResponse);
      setActiveProtocol(key);
      
      // Start cooldown
      setCanChangeProtocol(false);
      cooldownTimer.current = setTimeout(() => {
        setCanChangeProtocol(true);
      }, 5000);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-rose-200 to-pink-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full opacity-20 blur-3xl"></div>
        
        <button 
          onClick={() => setActiveSection('home')} 
          className="absolute top-8 left-8 text-sm hover:underline text-stone-600 hover:text-stone-900 transition-colors"
        >
          ← Back
        </button>

        <div className="max-w-2xl w-full space-y-10 relative z-10">
          <div className="text-center space-y-2">
            <h2 className="text-5xl font-serif italic bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display, serif' }}>
              Emergency Protocols
            </h2>
            <p className="text-sm text-stone-600">Click when crisis strikes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Object.entries(emergencyProtocols).map(([key, protocol]) => {
              const Icon = protocol.icon;
              const isActive = activeProtocol === key;
              return (
                <button
                  key={key}
                  onClick={() => handleProtocolClick(key)}
                  className={`p-8 rounded-3xl border-2 transition-all duration-500 text-left group relative overflow-hidden ${
                    isActive
                      ? 'border-white/80 bg-white/60 backdrop-blur-lg shadow-2xl scale-105' 
                      : 'border-white/60 bg-white/40 backdrop-blur-sm hover:bg-white/50 hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${protocol.color} ${isActive ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'} transition-opacity duration-500`}></div>
                  <div className="relative z-10">
                    <Icon className={`w-10 h-10 mb-4 transition-all duration-500 ${!isActive && 'group-hover:scale-110 group-hover:rotate-12'}`} />
                    <h3 className="text-xl font-bold capitalize mb-2">{key.replace('_', ' ')}</h3>
                    <p className="text-xs text-stone-600">
                      {isActive && !canChangeProtocol ? '(Wait a moment...)' : isActive ? '(Click for new advice)' : '(Click to activate)'}
                    </p>
                  </div>
                </button>
              );
            })}
            
            {/* Call/Text Vineeth Button */}
            <a
              href="tel:+1234567890"
              className="p-8 rounded-3xl border-2 border-white/60 bg-white/40 backdrop-blur-sm hover:bg-white/50 hover:scale-105 hover:shadow-xl transition-all duration-500 text-left group relative overflow-hidden md:col-span-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center gap-4">
                <Phone className="w-10 h-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
                <div>
                  <h3 className="text-xl font-bold mb-1">Call/Text Vineeth</h3>
                  <p className="text-xs text-stone-600">(For when you need a real person)</p>
                </div>
              </div>
            </a>
          </div>

          {activeProtocol && currentResponse && (
            <div className={`p-10 rounded-3xl bg-gradient-to-br ${emergencyProtocols[activeProtocol].color} text-white relative shadow-2xl backdrop-blur-sm`}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveProtocol(null);
                  setCurrentResponse(null);
                  setCanChangeProtocol(true);
                  if (cooldownTimer.current) {
                    clearTimeout(cooldownTimer.current);
                  }
                }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all text-xl font-light"
              >
                ✕
              </button>
              <div className="flex items-center gap-4 mb-6">
                {React.createElement(emergencyProtocols[activeProtocol].icon, { className: "w-10 h-10" })}
                <h3 className="text-2xl font-bold">{currentResponse.message}</h3>
              </div>
              <p className="text-lg leading-relaxed opacity-95">
                {currentResponse.action}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}