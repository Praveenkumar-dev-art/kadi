import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

// SVG Icons
const MicIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
);

const StopIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const CopyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5" />
  </svg>
);

const HistoryIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

const PlayIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" />
  </svg>
);

const PauseIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
  </svg>
);

const UploadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const TranslateIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

// Constants
const MODE_TANGLISH = 'tanglish';
const MODE_ENGLISH = 'english';
const MODE_TAMIL = 'tamil';
const MAX_RECORDING_TIME = 300; // 5 minutes

interface HistoryItem {
  id: string;
  text: string;
  timestamp: number;
}

const HistoryItemEditor = ({ 
  item, 
  onSave, 
  onUse 
}: { 
  item: HistoryItem, 
  onSave: (id: string, text: string) => void, 
  onUse: (text: string) => void 
}) => {
  const [localText, setLocalText] = useState(item.text);
  
  useEffect(() => {
    setLocalText(item.text);
  }, [item.text]);

  return (
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 hover:border-indigo-200 transition-colors group relative">
      <div className="text-xs text-gray-400 mb-1">
        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <textarea
        className="w-full bg-transparent text-sm text-gray-700 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-300 rounded p-1"
        value={localText}
        onChange={(e) => setLocalText(e.target.value)}
        onBlur={() => {
          if (localText !== item.text) onSave(item.id, localText);
        }}
        rows={3}
      />
      <button 
        onClick={() => onUse(localText)}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-indigo-100 text-indigo-600 p-1.5 rounded-md text-xs font-medium transition-opacity hover:bg-indigo-200"
      >
        Use
      </button>
    </div>
  );
};

const App = () => {
  const [mode, setMode] = useState<typeof MODE_TANGLISH | typeof MODE_ENGLISH | typeof MODE_TAMIL>(MODE_TANGLISH);
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Audio Confirmation State
  const [pendingAudioBlob, setPendingAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  // Timer & Audio State
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mimeTypeRef = useRef<string>('');
  const isPausedRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Audio Visualizer Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Load history on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('tanglish_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history when it changes
  useEffect(() => {
    try {
      localStorage.setItem('tanglish_history', JSON.stringify(history));
    } catch (e: any) {
      console.error("Storage error:", e);
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        // FIFO: Remove oldest 10 items to free up space
        setHistory(prev => prev.slice(0, Math.max(0, prev.length - 10)));
      }
    }
  }, [history]);

  // Handle errors and clear them after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Cleanup audio URL
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const getSupportedMimeType = () => {
    const types = ['audio/webm', 'audio/mp4', 'audio/ogg', 'audio/aac'];
    for (const t of types) {
      if (MediaRecorder.isTypeSupported(t)) return t;
    }
    return '';
  };

  const handleStartRecording = async () => {
    setError(null);
    setCopySuccess(false);
    setPendingAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    isPausedRef.current = false;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Set up Audio Visualizer
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const updateAudioLevel = () => {
        if (!analyserRef.current) return;
        
        if (isPausedRef.current) {
          setAudioLevel(0);
        } else {
          analyserRef.current.getByteFrequencyData(dataArray);
          
          // Calculate average volume
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          // Normalize to 0-100
          setAudioLevel(Math.min(100, (average / 128) * 100));
        }
        
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };
      
      updateAudioLevel();
      
      mimeTypeRef.current = getSupportedMimeType();
      const options = mimeTypeRef.current ? { mimeType: mimeTypeRef.current } : undefined;
      
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeTypeRef.current || 'audio/webm' });
        
        // Stop visualizer
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
        }
        setAudioLevel(0);
        
        // Stop all tracks to release microphone
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        // Save to pending state instead of processing immediately
        setPendingAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start Timer
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        if (!isPausedRef.current) {
          setRecordingTime(prev => {
            if (prev >= MAX_RECORDING_TIME - 1) {
              handleStopRecording();
              return MAX_RECORDING_TIME;
            }
            return prev + 1;
          });
        }
      }, 1000);

    } catch (err) {
      console.error("Microphone access error:", err);
      setError("Unable to access microphone. Please check permissions.");
    }
  };

  const handlePauseResume = () => {
    if (mediaRecorderRef.current) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        isPausedRef.current = false;
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        isPausedRef.current = true;
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPendingAudioBlob(file);
      setAudioUrl(URL.createObjectURL(file));
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      isPausedRef.current = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleRetake = () => {
    setPendingAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const handleSendAudio = async () => {
    if (!pendingAudioBlob) return;
    await processAudio(pendingAudioBlob);
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // Remove the Data-URL declaration (e.g. "data:audio/webm;base64,")
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        } else {
          reject(new Error('Failed to convert blob to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleSpeak = () => {
    if (!text) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find an Indian English voice for better Tanglish/Tamil pronunciation
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('ta-IN')) 
                        || voices.find(v => v.lang.includes('en-GB')) 
                        || voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Adjust rate and pitch for more natural sound
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    setText(''); 
    
    // Clear pending state
    setPendingAudioBlob(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    try {
      const base64Audio = await blobToBase64(audioBlob);

      // Determine system instruction based on mode
      const tanglishInstruction = 'You are a transcriber. Transcribe Tamil speech into Tanglish (Tamil words in English script). Do NOT translate the meaning. Keep the tone casual (e.g., input: "Eppadi irukinga" output: "Epdi iruka...?").';
      const englishInstruction = 'Translate spoken Tamil into casual, conversational English.';
      const tamilInstruction = 'You are a highly accurate transcription assistant. The user is speaking Tamil (or Tanglish). Your task is to transcribe their speech into pure, native Tamil script (தமிழ்). Ensure perfect spelling, grammar, and punctuation in Tamil. Only output the Tamil script, nothing else.';
      
      let systemInstruction = tanglishInstruction;
      if (mode === MODE_ENGLISH) systemInstruction = englishInstruction;
      if (mode === MODE_TAMIL) systemInstruction = tamilInstruction;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          role: 'user',
          parts: [{
            inlineData: {
              mimeType: audioBlob.type || 'audio/webm',
              data: base64Audio
            }
          }]
        },
        config: {
          systemInstruction: systemInstruction,
        }
      });

      if (response.text) {
        const generatedText = response.text.trim();
        setText(generatedText);
        
        // Add to history
        const newItem: HistoryItem = {
          id: Date.now().toString(),
          text: generatedText,
          timestamp: Date.now()
        };
        setHistory(prev => [newItem, ...prev]);
      } else {
        setError("No text generated. Please try speaking clearly.");
      }

    } catch (err) {
      console.error("AI API Error:", err);
      setError("Failed to process audio. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddEmojis = async () => {
    if (!text) {
      setError("Please record some text first.");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Add relevant emojis to this text without changing words or grammar: "${text}"`,
      });

      if (response.text) {
        const newText = response.text.trim();
        setText(newText);
        
        // Update the most recent history item if it matches the old text
        setHistory(prev => {
          if (prev.length > 0 && prev[0].text === text) {
            const newHistory = [...prev];
            newHistory[0] = { ...newHistory[0], text: newText };
            return newHistory;
          }
          return prev;
        });
      }
    } catch (err) {
      console.error("Emoji API Error:", err);
      setError("Failed to add emojis.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTranslateText = async () => {
    if (!text) {
      setError("Please enter or record some text first.");
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      // Determine system instruction based on mode
      const tanglishInstruction = 'Convert the following text into Tanglish (Tamil words written in the English alphabet). Keep it conversational. Do not output anything else.';
      const englishInstruction = 'Translate the following text into casual, conversational English. Do not output anything else.';
      const tamilInstruction = 'Translate or transliterate the following text into pure, native Tamil script (தமிழ்). Ensure perfect spelling and grammar in Tamil. Only output the Tamil script, nothing else.';
      
      let systemInstruction = tanglishInstruction;
      if (mode === MODE_ENGLISH) systemInstruction = englishInstruction;
      if (mode === MODE_TAMIL) systemInstruction = tamilInstruction;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: text,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      if (response.text) {
        const generatedText = response.text.trim();
        setText(generatedText);
        
        // Add to history
        const newItem: HistoryItem = {
          id: Date.now().toString(),
          text: generatedText,
          timestamp: Date.now()
        };
        setHistory(prev => [newItem, ...prev]);
      } else {
        setError("No text generated. Please try again.");
      }

    } catch (err) {
      console.error("Translation API Error:", err);
      setError("Failed to translate text. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      setError("Failed to copy text.");
    }
  };

  const handleHistoryItemClick = (itemText: string) => {
    setText(itemText);
    setIsHistoryOpen(false);
  };

  const handleHistoryItemEdit = (id: string, newText: string) => {
    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, text: newText } : item
    ));
    // If the edited item is currently displayed, update the main text too
    if (history.find(item => item.id === id)?.text === text) {
        setText(newText);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      {/* Container */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[80vh] md:h-[600px] relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center shrink-0 relative">
          <button 
            onClick={() => setIsHistoryOpen(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            title="View History"
          >
            <HistoryIcon className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-white tracking-tight">Talk Tanglish</h1>
          <p className="text-purple-100 text-sm mt-1">Speak in Tamil, get text instantly.</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 shrink-0">
          <button
            onClick={() => setMode(MODE_TANGLISH)}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${
              mode === MODE_TANGLISH
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Tanglish
          </button>
          <button
            onClick={() => setMode(MODE_ENGLISH)}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${
              mode === MODE_ENGLISH
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            English Translation
          </button>
          <button
            onClick={() => setMode(MODE_TAMIL)}
            className={`flex-1 py-4 text-sm font-semibold transition-colors duration-200 ${
              mode === MODE_TAMIL
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            தமிழ்
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="absolute top-24 left-4 right-4 z-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline text-sm">{error}</span>
          </div>
        )}

        {/* Main Display Area */}
        <div className="flex-1 p-6 relative flex flex-col">
          {isProcessing || isTranslating ? (
            <div className="flex-1 space-y-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ) : pendingAudioBlob ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Audio Recorded!</h3>
              
              {audioUrl && (
                <audio controls src={audioUrl} className="w-full max-w-[250px] h-10" />
              )}
              
              <div className="flex w-full space-x-3 mt-4">
                <button 
                  onClick={handleRetake}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <TrashIcon className="w-5 h-5 mr-2" />
                  Retake
                </button>
                <button 
                  onClick={handleSendAudio}
                  className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center shadow-md"
                >
                  <SendIcon className="w-5 h-5 mr-2" />
                  Transcribe
                </button>
              </div>
            </div>
          ) : (
            <textarea
              className="w-full h-full resize-none text-xl text-gray-800 placeholder-gray-300 focus:outline-none bg-transparent leading-relaxed"
              placeholder={mode === MODE_TANGLISH ? "Pesalam..." : "Speak now..."}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          )}
          
          {copySuccess && (
            <div className="absolute bottom-6 right-6 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow opacity-90 transition-opacity">
              Copied!
            </div>
          )}
        </div>

        {/* Action Bar / Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 shrink-0 flex items-center justify-between h-28">
          
          {isRecording ? (
            // ZEN RECORDING MODE
            <div className="w-full flex items-center justify-between px-4">
              {/* Pause/Resume Button */}
              <button
                onClick={handlePauseResume}
                className="w-14 h-14 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors shadow-sm"
              >
                {isPaused ? <PlayIcon className="w-6 h-6 ml-1" /> : <PauseIcon className="w-6 h-6" />}
              </button>

              {/* Center: Visualizer & Timer */}
              <div className="flex flex-col items-center justify-center w-32">
                <div className="flex items-end justify-center space-x-1 h-8 mb-2 w-full">
                  {[...Array(5)].map((_, i) => {
                    const height = isPaused ? 4 : Math.max(4, (audioLevel * (0.5 + Math.random() * 0.5)));
                    return (
                      <div 
                        key={i}
                        className={`w-1.5 rounded-t-full transition-all duration-75 ease-out ${isPaused ? 'bg-gray-400' : 'bg-red-500'}`}
                        style={{ height: `${height}%` }}
                      />
                    );
                  })}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold shadow-sm ${isPaused ? 'bg-gray-200 text-gray-600' : 'bg-red-100 text-red-600 animate-pulse'}`}>
                  {formatTime(recordingTime)} / 05:00
                </div>
              </div>

              {/* Stop Button */}
              <button
                onClick={handleStopRecording}
                className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow-lg transition-transform active:scale-95"
              >
                <StopIcon className="w-7 h-7" />
              </button>
            </div>
          ) : (
            // IDLE / NORMAL MODE
            <>
              <div className="flex space-x-2">
                {/* Magic Emoji Button */}
                <button
                  onClick={handleAddEmojis}
                  disabled={isProcessing || isTranslating || !text || !!pendingAudioBlob}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isProcessing || isTranslating || !text || !!pendingAudioBlob
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-indigo-500 hover:bg-indigo-100 active:scale-95'
                  }`}
                  title="Add Magic Emojis"
                >
                  <SparklesIcon className="w-6 h-6" />
                </button>

                {/* Translate Button */}
                <button
                  onClick={handleTranslateText}
                  disabled={isProcessing || isTranslating || !text || !!pendingAudioBlob}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isProcessing || isTranslating || !text || !!pendingAudioBlob
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-indigo-500 hover:bg-indigo-100 active:scale-95'
                  }`}
                  title="Translate to selected language"
                >
                  <TranslateIcon className={`w-6 h-6 ${isTranslating ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Microphone & Upload Container */}
              <div className="relative flex items-center justify-center">
                <button
                  onClick={handleStartRecording}
                  disabled={isProcessing || isTranslating || !!pendingAudioBlob}
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 active:scale-95 focus:outline-none z-10 ${
                    isProcessing || isTranslating || !!pendingAudioBlob ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  <MicIcon className="w-8 h-8" />
                </button>
                
                {/* Subtle Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing || isTranslating || !!pendingAudioBlob}
                  className={`absolute -right-12 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isProcessing || isTranslating || !!pendingAudioBlob ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
                  }`}
                  title="Upload Audio File"
                >
                  <UploadIcon className="w-5 h-5" />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  accept="audio/*" 
                  className="hidden" 
                />
              </div>

              <div className="flex space-x-2">
                {/* Speaker Button */}
                <button
                  onClick={handleSpeak}
                  disabled={!text || !!pendingAudioBlob}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    !text || !!pendingAudioBlob
                      ? 'text-gray-300 cursor-not-allowed'
                      : isSpeaking
                      ? 'text-blue-500 bg-blue-100 hover:bg-blue-200 active:scale-95'
                      : 'text-indigo-500 hover:bg-indigo-100 active:scale-95'
                  }`}
                  title={isSpeaking ? "Stop Speaking" : "Listen"}
                >
                  {isSpeaking ? <StopIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
                </button>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  disabled={!text || !!pendingAudioBlob}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    !text || !!pendingAudioBlob
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-indigo-500 hover:bg-indigo-100 active:scale-95'
                  }`}
                  title="Copy Text"
                >
                  <CopyIcon className="w-6 h-6" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* History Drawer Overlay */}
        {isHistoryOpen && (
          <div 
            className="absolute inset-0 bg-black/40 z-20 transition-opacity"
            onClick={() => setIsHistoryOpen(false)}
          />
        )}

        {/* History Drawer Panel */}
        <div 
          className={`absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white z-30 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
            isHistoryOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <HistoryIcon className="w-5 h-5 mr-2 text-indigo-600" />
              History
            </h2>
            <button 
              onClick={() => setIsHistoryOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-200 transition-colors"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {history.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">
                <HistoryIcon className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>No history yet.</p>
                <p className="text-xs mt-1">Record something to see it here!</p>
              </div>
            ) : (
              history.map((item) => (
                <HistoryItemEditor 
                  key={item.id} 
                  item={item} 
                  onSave={handleHistoryItemEdit} 
                  onUse={handleHistoryItemClick} 
                />
              ))
            )}
          </div>

          {history.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-white">
              <button 
                onClick={() => setShowClearConfirm(true)}
                className="w-full py-2.5 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Clear Full History
              </button>
            </div>
          )}
        </div>

        {/* Custom Confirmation Modal */}
        {showClearConfirm && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowClearConfirm(false)} />
            <div className="bg-white rounded-2xl p-6 shadow-2xl z-50 w-full max-w-xs transform scale-100 animate-in fade-in zoom-in duration-200">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <TrashIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 mb-2">Clear History?</h3>
              <p className="text-sm text-center text-gray-500 mb-6">
                Are you sure you want to delete all history? This cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleClearHistory}
                  className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors shadow-sm"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default App;
