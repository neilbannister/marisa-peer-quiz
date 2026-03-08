'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, QuizOption } from '@/lib/questions';
import { createEmptyScores, calculateResults, QuizScores } from '@/lib/scoring';

export default function QuizPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<QuizScores>(createEmptyScores());
  const [answers, setAnswers] = useState<Record<number, { key: string; text: string }>>({});
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [ageRange, setAgeRange] = useState('35-44');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const question = questions[currentQ];
  const totalQuestions = questions.length;
  const progress = ((currentQ) / totalQuestions) * 100;

  // Replace {name} in strings
  const personalize = (text: string) => text.replace(/\{name\}/g, name || 'friend');

  const handleOptionSelect = useCallback((option: QuizOption) => {
    setSelectedOption(option.key);

    // Add scores
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([key, value]) => {
      if (key in newScores) {
        (newScores as any)[key] += value;
      }
    });
    setScores(newScores);

    // Save answer
    const newAnswers = { ...answers, [question.id]: { key: option.key, text: option.text } };
    setAnswers(newAnswers);

    // Advance after brief delay for animation
    setTimeout(() => {
      setSelectedOption(null);
      if (currentQ < totalQuestions - 1) {
        setCurrentQ(currentQ + 1);
      }
    }, 600);
  }, [scores, answers, question, currentQ, totalQuestions]);

  const handleNameSubmit = () => {
    if (name.trim().length > 0) {
      setAnswers({ ...answers, [question.id]: { key: 'name', text: name } });
      setCurrentQ(currentQ + 1);
    }
  };

  const handleGenderSelect = (g: string) => {
    setGender(g);
    setAnswers({ ...answers, [question.id]: { key: 'gender', text: g } });
    setTimeout(() => setCurrentQ(currentQ + 1), 400);
  };

  const handleEmailSubmit = async () => {
    if (!email.includes('@')) return;
    setIsSubmitting(true);

    // Calculate final results
    const result = calculateResults(scores);

    // Format answers for API
    const answerList = Object.entries(answers).map(([qId, ans]) => ({
      questionId: parseInt(qId),
      answerKey: ans.key,
      answerText: ans.text,
    }));

    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          ageRange,
          answers: answerList,
          result,
          scores,
        }),
      });

      const data = await res.json();

      // Store quiz data for report generation
      try {
        sessionStorage.setItem('quizData', JSON.stringify({
          name, gender, email, ageRange, answers: answerList, result, scores,
        }));
      } catch {}

      // Navigate to results page with the user ID
      router.push(`/results?id=${data.userId}&archetype=${result.archetype}&name=${encodeURIComponent(name)}&gender=${gender}`);
    } catch (err) {
      // If API fails, still navigate with data in URL params
      const result = calculateResults(scores);

      // Store quiz data for report generation
      try {
        const answerList = Object.entries(answers).map(([qId, ans]) => ({
          questionId: parseInt(qId), answerKey: ans.key, answerText: ans.text,
        }));
        sessionStorage.setItem('quizData', JSON.stringify({
          name, gender, email, ageRange, answers: answerList, result, scores,
        }));
      } catch {}

      router.push(`/results?archetype=${result.archetype}&name=${encodeURIComponent(name)}&gender=${gender}`);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-brand-dark/5">
        <motion.div
          className="h-full bg-brand-gold"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Question counter */}
      <div className="fixed top-4 right-4 z-50">
        <span className="text-xs text-brand-dark/30 font-medium">
          {currentQ + 1} / {totalQuestions}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl w-full"
          >
            {/* Question header (with name) */}
            {question.header && (
              <motion.p
                className="text-brand-gold text-sm font-medium mb-3 tracking-wide"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {personalize(question.header)}
              </motion.p>
            )}

            {/* Question text */}
            <h2 className="text-2xl md:text-3xl font-serif text-brand-dark leading-snug mb-2">
              {personalize(question.question)}
            </h2>

            {/* Subtext */}
            {question.subtext && (
              <p className="text-brand-dark/50 text-sm mb-8">
                {personalize(question.subtext)}
              </p>
            )}

            {/* ─── CHOICE QUESTION ─── */}
            {question.type === 'choice' && question.options && (
              <div className="space-y-3 mt-8">
                {question.options.map((option, i) => (
                  <motion.button
                    key={option.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    onClick={() => handleOptionSelect(option)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-300
                      ${selectedOption === option.key
                        ? 'border-brand-gold bg-brand-gold/10 scale-[1.02]'
                        : selectedOption !== null
                          ? 'border-brand-dark/5 bg-white/50 opacity-50'
                          : 'border-brand-dark/10 bg-white/80 hover:border-brand-gold/50 hover:bg-white hover:shadow-md'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5 transition-all
                        ${selectedOption === option.key
                          ? 'border-brand-gold bg-brand-gold text-white'
                          : 'border-brand-dark/20 text-brand-dark/40'
                        }`}>
                        {selectedOption === option.key ? '✓' : option.key}
                      </span>
                      <div>
                        <p className="font-medium text-brand-dark text-[15px] leading-snug">
                          {option.text}
                        </p>
                        {option.subtext && (
                          <p className="text-brand-dark/50 text-sm mt-1">
                            {option.subtext}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── NAME INPUT ─── */}
            {question.type === 'name' && (
              <div className="mt-8">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  placeholder="Your first name"
                  autoFocus
                  className="w-full text-2xl md:text-3xl font-serif bg-transparent border-b-2 border-brand-dark/20
                             focus:border-brand-gold outline-none pb-3 text-brand-dark placeholder:text-brand-dark/20
                             transition-colors"
                />
                <motion.button
                  onClick={handleNameSubmit}
                  disabled={name.trim().length === 0}
                  className="mt-8 bg-brand-dark text-brand-cream px-8 py-3 rounded-full font-medium
                             hover:bg-brand-plum transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              </div>
            )}

            {/* ─── GENDER SELECT ─── */}
            {question.type === 'gender' && (
              <div className="mt-8 space-y-3">
                {[
                  { key: 'female', label: 'Female' },
                  { key: 'male', label: 'Male' },
                  { key: 'non_binary', label: 'Non-binary' },
                  { key: 'prefer_not', label: 'Prefer not to say' },
                ].map((option, i) => (
                  <motion.button
                    key={option.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    onClick={() => handleGenderSelect(option.key)}
                    className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-300
                      ${gender === option.key
                        ? 'border-brand-gold bg-brand-gold/10 scale-[1.02]'
                        : 'border-brand-dark/10 bg-white/80 hover:border-brand-gold/50 hover:bg-white hover:shadow-md'
                      }`}
                  >
                    <p className="font-medium text-brand-dark text-[15px]">{option.label}</p>
                  </motion.button>
                ))}
              </div>
            )}

            {/* ─── EMAIL INPUT ─── */}
            {question.type === 'email' && (
              <div className="mt-8 space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
                  placeholder="your@email.com"
                  autoFocus
                  className="w-full text-lg bg-white border-2 border-brand-dark/10 rounded-xl
                             focus:border-brand-gold outline-none p-4 text-brand-dark placeholder:text-brand-dark/20
                             transition-colors"
                />

                <select
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full text-lg bg-white border-2 border-brand-dark/10 rounded-xl
                             focus:border-brand-gold outline-none p-4 text-brand-dark transition-colors"
                >
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>

                <motion.button
                  onClick={handleEmailSubmit}
                  disabled={!email.includes('@') || isSubmitting}
                  className="w-full bg-brand-dark text-brand-cream px-8 py-4 rounded-full font-medium text-lg
                             hover:bg-brand-plum transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="inline-block w-5 h-5 border-2 border-brand-cream/30 border-t-brand-cream rounded-full"
                      />
                      Generating {name}'s report...
                    </span>
                  ) : (
                    `Unlock ${name}'s Coaching Report`
                  )}
                </motion.button>

                <p className="text-xs text-brand-dark/30 text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Marisa Peer footer */}
      <div className="text-center pb-6">
        <p className="text-[10px] text-brand-dark/20 tracking-[0.2em] uppercase">
          Marisa Peer &middot; Rapid Transformational Therapy
        </p>
      </div>
    </div>
  );
}
