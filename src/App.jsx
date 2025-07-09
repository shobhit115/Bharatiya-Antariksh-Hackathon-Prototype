import React, { useState, useEffect, useRef } from 'react';
import { Send, Home, MessageCircle, Rocket, Satellite, Globe, Star, Search, Info, BookOpen, Sparkles } from 'lucide-react';

const SpaceChatApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your ISRO AI assistant. I can help you with information about space missions, satellites, astronomy, and space exploration. What would you like to know?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Page transition handler
  const handlePageTransition = (page) => {
    setIsPageTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsPageTransitioning(false);
    }, 300);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponses = getAIResponse(inputMessage);
      
      const botMessage = {
        id: messages.length + 2,
        text: botResponses,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const getAIResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('mars') || lowerInput.includes('mangalyaan')) {
      return "🚀 Mars Orbiter Mission (Mangalyaan) was launched in 2013 and made India the first country to reach Mars orbit on its first attempt! It cost only $74 million, making it one of the most cost-effective Mars missions ever. The orbiter studied Mars' atmosphere and surface features.";
    }
    
    if (lowerInput.includes('moon') || lowerInput.includes('chandrayaan')) {
      return "🌙 Chandrayaan missions have been groundbreaking! Chandrayaan-1 (2008) discovered water molecules on the Moon. Chandrayaan-2 (2019) included an orbiter, lander, and rover. Chandrayaan-3 (2023) successfully landed near the Moon's south pole, making India the 4th country to achieve a soft lunar landing.";
    }
    
    if (lowerInput.includes('satellite') || lowerInput.includes('pslv')) {
      return "🛰️ ISRO's PSLV (Polar Satellite Launch Vehicle) is known as the 'workhorse' for its reliability. It has launched over 400 satellites from 36 countries! ISRO operates various satellites for communication, weather monitoring, navigation (NavIC), and Earth observation.";
    }
    
    if (lowerInput.includes('gaganyaan') || lowerInput.includes('human') || lowerInput.includes('astronaut')) {
      return "👨‍🚀 Gaganyaan is India's first human spaceflight program! It aims to send a 3-member crew to low Earth orbit for 3 days. When successful, India will become the 4th country to independently send humans to space, after USA, Russia, and China.";
    }
    
    if (lowerInput.includes('sun') || lowerInput.includes('aditya')) {
      return "☀️ Aditya-L1 is India's first solar mission, launched in 2023! It's positioned at the L1 Lagrange point to study the Sun's corona, solar wind, and space weather. This mission helps us understand solar activities that affect Earth's climate and satellite communications.";
    }
    
    if (lowerInput.includes('rocket') || lowerInput.includes('launch')) {
      return "🚀 ISRO uses several launch vehicles: PSLV for smaller payloads, GSLV for heavier satellites, and the powerful GSLV Mk III (LVM3) for Gaganyaan and heavy payloads. The LVM3 can carry up to 4 tons to geostationary orbit!";
    }
    
    if (lowerInput.includes('cost') || lowerInput.includes('budget')) {
      return "💰 ISRO is famous for cost-effective missions! The Mars mission cost $74M (less than the movie Gravity!), and the entire Chandrayaan-3 mission cost only $75M. This frugal engineering approach makes space exploration accessible.";
    }
    
    if (lowerInput.includes('future') || lowerInput.includes('upcoming')) {
      return "🔮 ISRO's future missions include: Gaganyaan human spaceflight, Chandrayaan-4 lunar sample return, Mangalyaan-2 Mars mission, Venus mission (Shukrayaan-1), and collaboration with NASA on the NISAR Earth observation satellite.";
    }
    
    if (lowerInput.includes('space station') || lowerInput.includes('bharatiya')) {
      return "🏗️ India plans to build the Bharatiya Antariksha Station (BAS) - its own space station by 2030! It will be operational for 5-7 years and serve as a platform for microgravity experiments and space research.";
    }
    
    // Default responses for general queries
    const defaultResponses = [
      "That's an interesting question about space! ISRO has made remarkable achievements in space technology with cost-effective and innovative approaches. What specific aspect would you like to know more about?",
      "ISRO continues to push the boundaries of space exploration! From Mars missions to lunar landings, India's space program showcases incredible engineering. Would you like to know about any specific mission?",
      "Space exploration opens endless possibilities! ISRO's missions have contributed significantly to our understanding of the cosmos. Ask me about satellites, planetary missions, or future space plans.",
      "India's space program has achieved remarkable milestones! From discovering water on the Moon to reaching Mars, ISRO's journey is inspiring. What aspect of space exploration interests you most?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const quickQuestions = [
    { icon: Rocket, text: "Tell me about Mars mission", query: "Tell me about Mars mission Mangalyaan" },
    { icon: Globe, text: "Chandrayaan Moon missions", query: "What are Chandrayaan missions?" },
    { icon: Satellite, text: "ISRO satellites", query: "Tell me about ISRO satellites" },
    { icon: Star, text: "Future missions", query: "What are ISRO's future missions?" }
  ];

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Space Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
        <div className="shooting-stars"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-3xl animate-slide-up">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <Rocket className="w-12 h-12 text-orange-400 mr-4 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              ISRO AI Assistant
            </h1>
          </div>
          
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            Your AI guide to space exploration. Ask me about ISRO missions, satellites, and space science!
          </p>

          <button
            onClick={() => handlePageTransition('chat')}
            className="group relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 mb-12 animate-bounce-in overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Start Asking Questions
              <Sparkles className="w-4 h-4 ml-2 group-hover:animate-spin" />
            </div>
          </button>

          {/* Quick Topics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickQuestions.map((item, index) => (
              <button
                key={index}
                onClick={() => handlePageTransition('chat')}
                className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-orange-400/50 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-card-appear"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <item.icon className="w-6 h-6 text-orange-400 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12" />
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                </div>
                <h3 className="text-white font-medium text-xs group-hover:text-orange-200 transition-colors duration-300">{item.text}</h3>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes text-reveal {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes card-appear {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shooting-star {
          0% { transform: translateX(-100px) translateY(100px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw) translateY(-100px); opacity: 0; }
        }

        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-gradient { 
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-text-reveal { animation: text-reveal 1s ease-out 0.3s both; }
        .animate-card-appear { animation: card-appear 0.6s ease-out both; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out 0.5s both; }
        .animate-float-up { animation: float-up 0.8s ease-out both; }
        .animate-fade-in { animation: fade-in 1s ease-out both; }
        .animate-fade-in-delay { animation: fade-in 1s ease-out 0.5s both; }
        .animate-slide-up { animation: slide-up 0.8s ease-out both; }
        .animate-slide-down { animation: slide-down 0.5s ease-out both; }

        .stars, .twinkling, .clouds, .shooting-stars {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .stars {
          background: #000 url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="0.5" fill="white" opacity="0.8"/><circle cx="80" cy="40" r="0.3" fill="white" opacity="0.6"/><circle cx="40" cy="60" r="0.4" fill="white" opacity="0.7"/><circle cx="90" cy="80" r="0.2" fill="white" opacity="0.5"/><circle cx="10" cy="90" r="0.3" fill="white" opacity="0.6"/><circle cx="70" cy="10" r="0.4" fill="white" opacity="0.8"/><circle cx="30" cy="30" r="0.2" fill="white" opacity="0.5"/><circle cx="60" cy="70" r="0.3" fill="white" opacity="0.7"/></svg>') repeat;
        }

        .twinkling {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="0.3" fill="white" opacity="0.9"/><circle cx="75" cy="75" r="0.2" fill="white" opacity="0.8"/><circle cx="50" cy="10" r="0.2" fill="white" opacity="0.7"/><circle cx="10" cy="50" r="0.3" fill="white" opacity="0.6"/><circle cx="90" cy="20" r="0.2" fill="white" opacity="0.8"/></svg>') repeat;
          animation: move-twink-back 200s linear infinite;
        }

        .shooting-stars {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="10" cy="10" r="0.5" fill="white" opacity="0.8"/><circle cx="90" cy="90" r="0.3" fill="white" opacity="0.6"/></svg>') repeat;
          animation: shooting-star 15s linear infinite;
        }

        @keyframes move-twink-back {
          from {background-position: 0 0;}
          to {background-position: -10000px 5000px;}
        }
      `}</style>
    </div>
  );

  const ChatPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden flex flex-col">
      {/* Animated Space Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
        <div className="shooting-stars"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 bg-slate-800/60 backdrop-blur-sm border-b border-slate-700/50 p-4 shrink-0 animate-slide-down">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center group">
            <div className="relative">
              <Rocket className="w-6 h-6 text-orange-400 mr-3 group-hover:animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="font-semibold text-white group-hover:text-orange-200 transition-colors duration-300">ISRO AI Assistant</span>
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Ask me about space missions & technology</p>
            </div>
          </div>
          <button
            onClick={() => handlePageTransition('home')}
            className="flex items-center text-gray-400 hover:text-white transition-all duration-300 px-3 py-2 rounded-lg hover:bg-slate-700/50 transform hover:scale-105"
          >
            <Home className="w-4 h-4 mr-2 hover:animate-pulse" />
            <span className="hidden sm:inline">Home</span>
          </button>
        </div>
      </header>

      {/* Messages Container */}
      <div className="relative z-10 flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto flex flex-col">
          {/* Quick Questions */}
          <div className="p-4 border-b border-slate-700/50 animate-fade-in">
            <p className="text-sm text-gray-400 mb-3 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Quick questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputMessage(item.query);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="group bg-slate-700/60 backdrop-blur-sm hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 text-white text-xs px-3 py-1 rounded-full transition-all duration-300 flex items-center gap-1 transform hover:scale-105 hover:-translate-y-1 animate-bounce-in border border-slate-600/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className="w-3 h-3 group-hover:animate-spin" />
                  {item.text}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Area */}
           <div className="flex-1 overflow-y-auto p-4 space-y-4 animate-fade-in">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-float-up`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 transform hover:scale-105 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-orange-400/50 shadow-lg shadow-orange-500/25'
                      : 'bg-slate-700/60 text-white border-slate-600/50 shadow-lg shadow-slate-500/25'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-slate-700/60 backdrop-blur-sm border border-slate-600/50 rounded-2xl px-4 py-3 max-w-xs shadow-lg shadow-slate-500/25">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-700/50 animate-slide-up">
            <div className="flex items-center space-x-2 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me about ISRO missions, satellites, or space exploration..."
                  className="w-full bg-slate-700/60 backdrop-blur-sm text-white placeholder-gray-400 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400 border border-slate-600/50 transition-all duration-300 hover:bg-slate-700/80 focus:bg-slate-700/80"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="w-4 h-4 text-gray-400 animate-pulse" />
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-orange-500/25 disabled:cursor-not-allowed group"
              >
                <Send className="w-5 h-5 group-hover:animate-pulse" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Page transition wrapper
  const PageWrapper = ({ children }) => (
    <div className={`transition-all duration-300 ${isPageTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {children}
    </div>
  );

  return (
    <PageWrapper>
      {currentPage === 'home' ? <HomePage /> : <ChatPage />}
    </PageWrapper>
  );
};

export default SpaceChatApp;
// import React, { useState, useEffect, useRef } from 'react';
// import { Send, Home, MessageCircle, Rocket, Satellite, Globe, Star, Search, Info, BookOpen, Sparkles } from 'lucide-react';

// const SpaceChatApp = () => {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hello! I'm your ISRO AI assistant. I can help you with information about space missions, satellites, astronomy, and space exploration. What would you like to know?", sender: 'bot', timestamp: new Date() }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [isPageTransitioning, setIsPageTransitioning] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to bottom of messages
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Page transition handler
//   const handlePageTransition = (page) => {
//     setIsPageTransitioning(true);
//     setTimeout(() => {
//       setCurrentPage(page);
//       setIsPageTransitioning(false);
//     }, 300);
//   };

//   const handleSendMessage = () => {
//     if (!inputMessage.trim()) return;

//     const newMessage = {
//       id: messages.length + 1,
//       text: inputMessage,
//       sender: 'user',
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, newMessage]);
//     setInputMessage('');
//     setIsTyping(true);

//     setTimeout(() => {
//       const botResponses = getAIResponse(inputMessage);
      
//       const botMessage = {
//         id: messages.length + 2,
//         text: botResponses,
//         sender: 'bot',
//         timestamp: new Date()
//       };

//       setMessages(prev => [...prev, botMessage]);
//       setIsTyping(false);
//     }, 1200);
//   };

//   const getAIResponse = (input) => {
//     const lowerInput = input.toLowerCase();
    
//     if (lowerInput.includes('mars') || lowerInput.includes('mangalyaan')) {
//       return "🚀 Mars Orbiter Mission (Mangalyaan) was launched in 2013 and made India the first country to reach Mars orbit on its first attempt! It cost only $74 million, making it one of the most cost-effective Mars missions ever. The orbiter studied Mars' atmosphere and surface features.";
//     }
    
//     if (lowerInput.includes('moon') || lowerInput.includes('chandrayaan')) {
//       return "🌙 Chandrayaan missions have been groundbreaking! Chandrayaan-1 (2008) discovered water molecules on the Moon. Chandrayaan-2 (2019) included an orbiter, lander, and rover. Chandrayaan-3 (2023) successfully landed near the Moon's south pole, making India the 4th country to achieve a soft lunar landing.";
//     }
    
//     if (lowerInput.includes('satellite') || lowerInput.includes('pslv')) {
//       return "🛰️ ISRO's PSLV (Polar Satellite Launch Vehicle) is known as the 'workhorse' for its reliability. It has launched over 400 satellites from 36 countries! ISRO operates various satellites for communication, weather monitoring, navigation (NavIC), and Earth observation.";
//     }
    
//     if (lowerInput.includes('gaganyaan') || lowerInput.includes('human') || lowerInput.includes('astronaut')) {
//       return "👨‍🚀 Gaganyaan is India's first human spaceflight program! It aims to send a 3-member crew to low Earth orbit for 3 days. When successful, India will become the 4th country to independently send humans to space, after USA, Russia, and China.";
//     }
    
//     if (lowerInput.includes('sun') || lowerInput.includes('aditya')) {
//       return "☀️ Aditya-L1 is India's first solar mission, launched in 2023! It's positioned at the L1 Lagrange point to study the Sun's corona, solar wind, and space weather. This mission helps us understand solar activities that affect Earth's climate and satellite communications.";
//     }
    
//     if (lowerInput.includes('rocket') || lowerInput.includes('launch')) {
//       return "🚀 ISRO uses several launch vehicles: PSLV for smaller payloads, GSLV for heavier satellites, and the powerful GSLV Mk III (LVM3) for Gaganyaan and heavy payloads. The LVM3 can carry up to 4 tons to geostationary orbit!";
//     }
    
//     if (lowerInput.includes('cost') || lowerInput.includes('budget')) {
//       return "💰 ISRO is famous for cost-effective missions! The Mars mission cost $74M (less than the movie Gravity!), and the entire Chandrayaan-3 mission cost only $75M. This frugal engineering approach makes space exploration accessible.";
//     }
    
//     if (lowerInput.includes('future') || lowerInput.includes('upcoming')) {
//       return "🔮 ISRO's future missions include: Gaganyaan human spaceflight, Chandrayaan-4 lunar sample return, Mangalyaan-2 Mars mission, Venus mission (Shukrayaan-1), and collaboration with NASA on the NISAR Earth observation satellite.";
//     }
    
//     if (lowerInput.includes('space station') || lowerInput.includes('bharatiya')) {
//       return "🏗️ India plans to build the Bharatiya Antariksha Station (BAS) - its own space station by 2030! It will be operational for 5-7 years and serve as a platform for microgravity experiments and space research.";
//     }
    
//     // Default responses for general queries
//     const defaultResponses = [
//       "That's an interesting question about space! ISRO has made remarkable achievements in space technology with cost-effective and innovative approaches. What specific aspect would you like to know more about?",
//       "ISRO continues to push the boundaries of space exploration! From Mars missions to lunar landings, India's space program showcases incredible engineering. Would you like to know about any specific mission?",
//       "Space exploration opens endless possibilities! ISRO's missions have contributed significantly to our understanding of the cosmos. Ask me about satellites, planetary missions, or future space plans.",
//       "India's space program has achieved remarkable milestones! From discovering water on the Moon to reaching Mars, ISRO's journey is inspiring. What aspect of space exploration interests you most?"
//     ];
    
//     return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
//   };

//   const quickQuestions = [
//     { icon: Rocket, text: "Tell me about Mars mission", query: "Tell me about Mars mission Mangalyaan" },
//     { icon: Globe, text: "Chandrayaan Moon missions", query: "What are Chandrayaan missions?" },
//     { icon: Satellite, text: "ISRO satellites", query: "Tell me about ISRO satellites" },
//     { icon: Star, text: "Future missions", query: "What are ISRO's future missions?" }
//   ];

//   const HomePage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
//       {/* Animated Space Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="stars"></div>
//         <div className="twinkling"></div>
//         <div className="clouds"></div>
//         <div className="shooting-stars"></div>
//       </div>
      
//       {/* Floating Particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 10}s`,
//               animationDuration: `${8 + Math.random() * 4}s`
//             }}
//           />
//         ))}
//       </div>

//       {/* Header */}
//       <header className="relative z-10 p-6 animate-fade-in">
//         <div className="flex items-center justify-center">
//           <div className="relative">
//             <Rocket className="w-8 h-8 text-orange-400 mr-3 animate-pulse" />
//             <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-ping opacity-75"></div>
//           </div>
//           <span className="text-2xl font-bold text-white bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
//             ISRO AI Assistant
//           </span>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
//         <div className="text-center max-w-4xl animate-slide-up">
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-text-reveal">
//             Your AI Guide to
//             <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
//               Space Exploration
//             </span>
//           </h1>
          
//           <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
//             Get instant answers about ISRO missions, satellites, space science, and India's journey to the stars. Ask me anything about space!
//           </p>

//           <button
//             onClick={() => handlePageTransition('chat')}
//             className="group relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25 mb-12 animate-bounce-in overflow-hidden"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <div className="relative flex items-center">
//               <MessageCircle className="w-5 h-5 mr-2 group-hover:animate-pulse" />
//               Start Asking Questions
//               <Sparkles className="w-4 h-4 ml-2 group-hover:animate-spin" />
//             </div>
//           </button>

//           {/* Quick Topics */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
//             {quickQuestions.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => handlePageTransition('chat')}
//                 className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-orange-400/50 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 animate-card-appear"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="relative">
//                   <item.icon className="w-8 h-8 text-orange-400 mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12" />
//                   <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
//                 </div>
//                 <h3 className="text-white font-medium text-sm group-hover:text-orange-200 transition-colors duration-300">{item.text}</h3>
//               </button>
//             ))}
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
//             {[
//               { icon: Search, title: "Instant Information", desc: "Get quick answers about missions, satellites, and space facts", color: "blue" },
//               { icon: Info, title: "Mission Details", desc: "Learn about Chandrayaan, Mangalyaan, and upcoming missions", color: "green" },
//               { icon: BookOpen, title: "Space Knowledge", desc: "Explore astronomy, rockets, and space technology", color: "purple" }
//             ].map((feature, index) => (
//               <div 
//                 key={index}
//                 className="group bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animate-float-up"
//                 style={{ animationDelay: `${index * 0.2}s` }}
//               >
//                 <div className="relative mb-4">
//                   <feature.icon className={`w-10 h-10 text-${feature.color}-400 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`} />
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>
//                 </div>
//                 <h3 className="text-white font-semibold mb-2 group-hover:text-orange-200 transition-colors duration-300">{feature.title}</h3>
//                 <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Enhanced CSS for animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-10px) rotate(5deg); }
//         }
        
//         @keyframes gradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
        
//         @keyframes shimmer {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(100%); }
//         }
        
//         @keyframes text-reveal {
//           0% { opacity: 0; transform: translateY(30px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes card-appear {
//           0% { opacity: 0; transform: translateY(20px) scale(0.95); }
//           100% { opacity: 1; transform: translateY(0) scale(1); }
//         }
        
//         @keyframes bounce-in {
//           0% { opacity: 0; transform: scale(0.3); }
//           50% { transform: scale(1.05); }
//           70% { transform: scale(0.9); }
//           100% { opacity: 1; transform: scale(1); }
//         }
        
//         @keyframes float-up {
//           0% { opacity: 0; transform: translateY(30px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes fade-in {
//           0% { opacity: 0; }
//           100% { opacity: 1; }
//         }
        
//         @keyframes slide-up {
//           0% { opacity: 0; transform: translateY(40px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes shooting-star {
//           0% { transform: translateX(-100px) translateY(100px); opacity: 0; }
//           10% { opacity: 1; }
//           90% { opacity: 1; }
//           100% { transform: translateX(100vw) translateY(-100px); opacity: 0; }
//         }

//         .animate-float { animation: float 8s ease-in-out infinite; }
//         .animate-gradient { 
//           background-size: 400% 400%;
//           animation: gradient 3s ease infinite;
//         }
//         .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
//         .animate-text-reveal { animation: text-reveal 1s ease-out 0.3s both; }
//         .animate-card-appear { animation: card-appear 0.6s ease-out both; }
//         .animate-bounce-in { animation: bounce-in 0.6s ease-out 0.5s both; }
//         .animate-float-up { animation: float-up 0.8s ease-out both; }
//         .animate-fade-in { animation: fade-in 1s ease-out both; }
//         .animate-fade-in-delay { animation: fade-in 1s ease-out 0.5s both; }
//         .animate-slide-up { animation: slide-up 0.8s ease-out both; }

//         .stars, .twinkling, .clouds, .shooting-stars {
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//         }

//         .stars {
//           background: #000 url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="0.5" fill="white" opacity="0.8"/><circle cx="80" cy="40" r="0.3" fill="white" opacity="0.6"/><circle cx="40" cy="60" r="0.4" fill="white" opacity="0.7"/><circle cx="90" cy="80" r="0.2" fill="white" opacity="0.5"/><circle cx="10" cy="90" r="0.3" fill="white" opacity="0.6"/><circle cx="70" cy="10" r="0.4" fill="white" opacity="0.8"/><circle cx="30" cy="30" r="0.2" fill="white" opacity="0.5"/><circle cx="60" cy="70" r="0.3" fill="white" opacity="0.7"/></svg>') repeat;
//         }

//         .twinkling {
//           background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="0.3" fill="white" opacity="0.9"/><circle cx="75" cy="75" r="0.2" fill="white" opacity="0.8"/><circle cx="50" cy="10" r="0.2" fill="white" opacity="0.7"/><circle cx="10" cy="50" r="0.3" fill="white" opacity="0.6"/><circle cx="90" cy="20" r="0.2" fill="white" opacity="0.8"/></svg>') repeat;
//           animation: move-twink-back 200s linear infinite;
//         }

//         .shooting-stars {
//           background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="10" cy="10" r="0.5" fill="white" opacity="0.8"/><circle cx="90" cy="90" r="0.3" fill="white" opacity="0.6"/></svg>') repeat;
//           animation: shooting-star 15s linear infinite;
//         }

//         @keyframes move-twink-back {
//           from {background-position: 0 0;}
//           to {background-position: -10000px 5000px;}
//         }
//       `}</style>
//     </div>
//   );

//   const ChatPage = () => (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col">
//       {/* Header */}
//       <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 p-4 shrink-0 animate-slide-down">
//         <div className="flex items-center justify-between max-w-4xl mx-auto">
//           <div className="flex items-center group">
//             <div className="relative">
//               <Rocket className="w-6 h-6 text-orange-400 mr-3 group-hover:animate-pulse" />
//               <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//             </div>
//             <div>
//               <span className="font-semibold text-white group-hover:text-orange-200 transition-colors duration-300">ISRO AI Assistant</span>
//               <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Ask me about space missions & technology</p>
//             </div>
//           </div>
//           <button
//             onClick={() => handlePageTransition('home')}
//             className="flex items-center text-gray-400 hover:text-white transition-all duration-300 px-3 py-2 rounded-lg hover:bg-slate-700/50 transform hover:scale-105"
//           >
//             <Home className="w-4 h-4 mr-2 hover:animate-pulse" />
//             <span className="hidden sm:inline">Home</span>
//           </button>
//         </div>
//       </header>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-hidden">
//         <div className="h-full max-w-4xl mx-auto flex flex-col">
//           {/* Quick Questions */}
//           <div className="p-4 border-b border-slate-700 animate-fade-in">
//             <p className="text-sm text-gray-400 mb-3 flex items-center">
//               <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
//               Quick questions:
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {quickQuestions.map((item, index) => (
//                 <button
//                   key={index}
//                   onClick={() => {
//                     setInputMessage(item.query);
//                     setTimeout(() => handleSendMessage(), 100);
//                   }}
//                   className="group bg-slate-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 text-white text-xs px-3 py-1 rounded-full transition-all duration-300 flex items-center gap-1 transform hover:scale-105 hover:-translate-y-1 animate-bounce-in"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <item.icon className="w-3 h-3 group-hover:animate-spin" />
//                   {item.text}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Messages Area */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-4">
//             {messages.map((message, index) => (
//               <div
//                 key={message.id}
//                 className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-message-appear`}
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div
//                   className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
//                     message.sender === 'user'
//                       ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-br-md shadow-lg hover:shadow-orange-500/25'
//                       : 'bg-slate-700 text-gray-100 rounded-bl-md shadow-lg hover:shadow-slate-600/25'
//                   }`}
//                 >
//                   {message.sender === 'bot' && (
//                     <div className="flex items-center mb-2">
//                       <Rocket className="w-4 h-4 text-orange-400 mr-2 animate-pulse" />
//                       <span className="text-xs font-medium text-orange-400">ISRO AI</span>
//                     </div>
//                   )}
//                   <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
//                   <p className="text-xs opacity-70 mt-2">
//                     {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                   </p>
//                 </div>
//               </div>
//             ))}
            
//             {isTyping && (
//               <div className="flex justify-start animate-typing-appear">
//                 <div className="bg-slate-700 text-gray-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-lg">
//                   <div className="flex items-center mb-2">
//                     <Rocket className="w-4 h-4 text-orange-400 mr-2 animate-pulse" />
//                     <span className="text-xs font-medium text-orange-400">ISRO AI</span>
//                   </div>
//                   <div className="flex space-x-1">
//                     <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
//                     <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                     <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                   </div>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Area */}
//           <div className="p-4 border-t border-slate-700 animate-slide-up">
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                 placeholder="Ask about ISRO missions, satellites, or space science..."
//                 className="flex-1 bg-slate-700 text-white placeholder-gray-400 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300 focus:scale-105 hover:bg-slate-600"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 disabled={!inputMessage.trim()}
//                 className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 disabled:hover:scale-100 shadow-lg hover:shadow-orange-500/25"
//               >
//                 <Send className="w-5 h-5 group-hover:animate-pulse" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Chat Page Animations */}
//       <style jsx>{`
//         @keyframes slide-down {
//           0% { transform: translateY(-100%); opacity: 0; }
//           100% { transform: translateY(0); opacity: 1; }
//         }
        
//         @keyframes message-appear {
//           0% { opacity: 0; transform: translateY(20px) scale(0.95); }
//           100% { opacity: 1; transform: translateY(0) scale(1); }
//         }
        
//         @keyframes typing-appear {
//           0% { opacity: 0; transform: scale(0.8); }
//           100% { opacity: 1; transform: scale(1); }
//         }

//         .animate-slide-down { animation: slide-down 0.5s ease-out; }
//         .animate-message-appear { animation: message-appear 0.4s ease-out both; }
//         .animate-typing-appear { animation: typing-appear 0.3s ease-out; }
//       `}</style>
//     </div>
//   );

//   return (
//     <div className="font-sans">
//       {/* Page Transition Overlay */}
//       {isPageTransitioning && (
//         <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center">
//           <div className="flex items-center space-x-4">
//             <Rocket className="w-8 h-8 text-orange-400 animate-spin" />
//             <span className="text-white text-lg">Loading...</span>
//           </div>
//         </div>
//       )}
      
//       <div className={`transition-opacity duration-300 ${isPageTransitioning ? 'opacity-0' : 'opacity-100'}`}>
//         {currentPage === 'home' ? <HomePage /> : <ChatPage />}
//       </div>
//     </div>
//   );
// };

// export default SpaceChatApp;