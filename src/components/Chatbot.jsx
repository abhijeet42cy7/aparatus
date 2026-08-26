import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
    const [inputValue, setInputValue] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [typingMessage, setTypingMessage] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    // API configuration
    const API_BASE_URL = 'http://localhost:8000';

    const typewriterEffect = (text, messageId) => {
        let index = 0;
        const speed = 5; // milliseconds per character - much faster!

        const typeNextChar = () => {
            if (index < text.length) {
                setTypingMessage(prev => ({
                    ...prev,
                    text: text.substring(0, index + 1)
                }));
                index++;
                // Scroll to bottom during typing
                setTimeout(() => {
                    scrollToBottom();
                    typeNextChar();
                }, speed);
            } else {
                // Typewriter effect complete
                setIsTyping(false);
                setTypingMessage(null);

                // Update the actual message with full text
                setMessages(prev => prev.map(msg =>
                    msg.id === messageId ? { ...msg, text: text } : msg
                ));

                // Final scroll after message is complete
                setTimeout(scrollToBottom, 100);
            }
        };

        typeNextChar();
    };

    // Function to detect current page context
    const getCurrentPageContext = () => {
        const pathname = window.location.pathname;
        if (pathname.includes('faq') || pathname.includes('help')) return 'support';
        if (pathname.includes('services') || pathname.includes('products')) return 'services';
        if (pathname.includes('about')) return 'about';
        if (pathname.includes('contact')) return 'contact';
        if (pathname.includes('pricing')) return 'pricing';
        return 'home'; // default to home page context
    };

    // Function to call the chatbot API
    const callChatbotAPI = async (message, pageId = null) => {
        try {
            // If no pageId provided, detect current page context
            const currentPage = pageId || getCurrentPageContext();

            const payload = {
                message: message,
                page_id: currentPage
            };

            console.log('Sending to API:', payload);

            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);
            return data.response;
        } catch (error) {
            console.error('Error calling chatbot API:', error);
            return "I'm sorry, I'm having trouble connecting to the server right now. Please try again later.";
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Listen for questions from FAQ component
    useEffect(() => {
        const handleQuestionClicked = (event) => {
            console.log('Chatbot: Event received!', event.detail);
            const { question, answer } = event.detail;
            setIsVisible(true);
            console.log('Chatbot: Setting visible to true');

            // Add the question as a user message immediately
            const userMessage = {
                id: messages.length + 1,
                text: question,
                type: 'user'
            };

            // Add the answer as a bot message with placeholder text
            const botMessage = {
                id: messages.length + 2,
                text: '', // Start with empty text
                type: 'bot'
            };

            setMessages(prev => [...prev, userMessage, botMessage]);

            // Start typewriter effect after 2 seconds
            setTimeout(() => {
                setIsTyping(true);
                setTypingMessage({
                    id: botMessage.id,
                    text: '',
                    type: 'bot'
                });

                // Scroll to bottom when typing starts
                setTimeout(scrollToBottom, 100);

                typewriterEffect(answer, botMessage.id);
            }, 2000);

            // Scroll to chatbot after a short delay to ensure it's rendered
            setTimeout(() => {
                const chatbotElement = document.querySelector('.chatbot-container');
                if (chatbotElement) {
                    import('../utils/smoothScroll.js').then(({ smoothScrollTo }) => {
                        smoothScrollTo(chatbotElement, { duration: 800, align: 'center' });
                    });
                }
            }, 300);
        };

        console.log('Chatbot: Adding event listener');
        window.addEventListener('questionClicked', handleQuestionClicked);

        return () => {
            window.removeEventListener('questionClicked', handleQuestionClicked);
        };
    }, []);

    const suggestedQuestions = [
        "WHAT FILE TYPES DOES A_PARATUS SUPPORT?"
    ];

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            setIsLoading(true);

            const userMessage = {
                id: messages.length + 1,
                text: inputValue.toUpperCase(),
                type: 'user'
            };
            setMessages(prev => [...prev, userMessage]);
            setInputValue('');

            // Add bot message placeholder
            const botMessage = {
                id: messages.length + 2,
                text: '',
                type: 'bot'
            };
            setMessages(prev => [...prev, botMessage]);

            try {
                // Call the chatbot API
                const apiResponse = await callChatbotAPI(userMessage.text);

                // Show typing indicator and start typewriter effect
                setIsTyping(true);
                setTypingMessage({
                    id: botMessage.id,
                    text: '',
                    type: 'bot'
                });

                // Scroll to bottom when typing starts
                setTimeout(scrollToBottom, 100);

                typewriterEffect(apiResponse, botMessage.id);
            } catch (error) {
                console.error('Error getting response:', error);
                const errorMessage = "I'm sorry, I'm having trouble processing your request right now.";
                setIsTyping(true);
                setTypingMessage({
                    id: botMessage.id,
                    text: '',
                    type: 'bot'
                });
                typewriterEffect(errorMessage, botMessage.id);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleSuggestedQuestion = async (question) => {
        const userMessage = {
            id: messages.length + 1,
            text: question,
            type: 'user'
        };
        setMessages(prev => [...prev, userMessage]);

        // Add bot message placeholder
        const botMessage = {
            id: messages.length + 2,
            text: '',
            type: 'bot'
        };
        setMessages(prev => [...prev, botMessage]);

        // Show typing indicator
        setIsTyping(true);
        setTypingMessage({
            id: botMessage.id,
            text: '',
            type: 'bot'
        });

        try {
            // Call the chatbot API
            const apiResponse = await callChatbotAPI(question);

            // Scroll to bottom when typing starts
            setTimeout(scrollToBottom, 100);

            // Start typewriter effect with API response
            typewriterEffect(apiResponse, botMessage.id);
        } catch (error) {
            console.error('Error getting response:', error);
            const errorMessage = "I'm sorry, I'm having trouble processing your request right now.";
            typewriterEffect(errorMessage, botMessage.id);
        }
    };

    return (
        <>
            {isVisible && (
                <div className="chatbot-container">
                    <div className="chatbot-box">
                        {/* Messages Section */}
                        <div className="chatbot-messages" ref={messagesContainerRef}>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`chatbot-message ${message.type === 'user' ? 'user' : 'bot'}`}
                                >
                                    {message.text}
                                </div>
                            ))}

                            {/* Show typing indicator */}
                            {isTyping && typingMessage && (
                                <div className="chatbot-message bot">
                                    {typingMessage.text}
                                    <span className="typing-cursor">|</span>
                                </div>
                            )}
                        </div>

                        {/* Input Section */}
                        <div className="chatbot-input-section">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="ASK ANY QUESTIONS"
                                className="chatbot-input"
                            />
                            <button
                                className="chatbot-send-button"
                                style={{
                                    padding: '5px',
                                }}
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim() || isLoading}
                            >
                                {isLoading ? (
                                    <div className="loading-spinner"></div>
                                ) : (
                                    <svg width="208" height="208" viewBox="0 0 208 208" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M72.8125 133.429L80.7165 134.377L76.6064 37L72.8125 133.429Z" fill={inputValue.trim() ? "white" : "black"} />
                                        <path d="M81.3488 133.112H72.8125L47.8359 172L81.3488 133.112Z" fill={inputValue.trim() ? "white" : "black"} />
                                        <path d="M74.709 136.906L80.3998 129.951L196.114 147.023L74.709 136.906Z" fill={inputValue.trim() ? "white" : "black"} />
                                        <path d="M80.4004 129.951L76.9227 136.274L8 165.677L80.4004 129.951Z" fill={inputValue.trim() ? "white" : "black"} fill-opacity="0.3" />
                                        <path d="M80.4016 129.951L200.542 75.5713L76.9238 136.274L80.4016 129.951Z" fill={inputValue.trim() ? "white" : "black"} />
                                    </svg>

                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;