import React, { useState, useEffect } from 'react';

const QUESTIONS = [
  // Physical Dimension - Embodiment
  { id: 1, dimension: "Physical", subdimension: "Embodiment", text: "I feel disconnected from my body", reverse_scored: true },
  { id: 2, dimension: "Physical", subdimension: "Embodiment", text: "My body is my own", reverse_scored: false },
  { id: 3, dimension: "Physical", subdimension: "Embodiment", text: "I regularly bump into things", reverse_scored: true },
  { id: 4, dimension: "Physical", subdimension: "Embodiment", text: "I can comfortably hold a balancing pose", reverse_scored: false },
  { id: 5, dimension: "Physical", subdimension: "Embodiment", text: "I unapologetically take up space", reverse_scored: false },
  
  // Physical Dimension - Body Awareness
  { id: 6, dimension: "Physical", subdimension: "Body Awareness", text: "My body reacts to different foods in different ways", reverse_scored: false },
  { id: 7, dimension: "Physical", subdimension: "Body Awareness", text: "I can identify movements that feel good in my body", reverse_scored: false },
  { id: 8, dimension: "Physical", subdimension: "Body Awareness", text: "My body has preferences that I am aware of", reverse_scored: false },
  { id: 9, dimension: "Physical", subdimension: "Body Awareness", text: "I make adjustments when I feel pain or discomfort during a workout", reverse_scored: false },
  { id: 10, dimension: "Physical", subdimension: "Body Awareness", text: "I understand how my physical environment impacts my body", reverse_scored: false },
  
  // Physical Dimension - Body Acceptance
  { id: 11, dimension: "Physical", subdimension: "Body Acceptance", text: "I feel at home in my physical body", reverse_scored: false },
  { id: 12, dimension: "Physical", subdimension: "Body Acceptance", text: "Given the option, I would alter my physical body", reverse_scored: true },
  { id: 13, dimension: "Physical", subdimension: "Body Acceptance", text: "I feel gratitude for my body", reverse_scored: false },
  { id: 14, dimension: "Physical", subdimension: "Body Acceptance", text: "I accept my body as it is", reverse_scored: false },
  { id: 15, dimension: "Physical", subdimension: "Body Acceptance", text: "I regularly criticize my physical appearance", reverse_scored: true },
  
  // Energetic Dimension - Breath Quality
  { id: 16, dimension: "Energetic", subdimension: "Breath Quality", text: "I find myself sighing often", reverse_scored: true },
  { id: 17, dimension: "Energetic", subdimension: "Breath Quality", text: "My shoulders rise when I breathe deeply", reverse_scored: true },
  { id: 18, dimension: "Energetic", subdimension: "Breath Quality", text: "I breathe through my nose", reverse_scored: false },
  { id: 19, dimension: "Energetic", subdimension: "Breath Quality", text: "My belly fills up with each inhale", reverse_scored: false },
  { id: 20, dimension: "Energetic", subdimension: "Breath Quality", text: "I breathe into my chest", reverse_scored: true },
  
  // Energetic Dimension - Energy Points
  { id: 21, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Root", text: "I feel financially secure", reverse_scored: false },
  { id: 22, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Root", text: "I am grounded", reverse_scored: false },
  { id: 23, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Sacral", text: "I am comfortable taking risks", reverse_scored: false },
  { id: 24, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Sacral", text: "I worry that someone I care about will betray me", reverse_scored: true },
  { id: 25, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Solar Plexus", text: "My inner critic is loud", reverse_scored: true },
  { id: 26, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Solar Plexus", text: "I am self-compassionate", reverse_scored: false },
  { id: 27, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Heart", text: "I have a tendency to be clingy", reverse_scored: true },
  { id: 28, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Heart", text: "I find it easy to forgive", reverse_scored: false },
  { id: 29, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Throat", text: "I feel the need to be in control", reverse_scored: true },
  { id: 30, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Throat", text: "I am comfortable expressing myself", reverse_scored: false },
  { id: 31, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Third Eye", text: "I feel uninspired", reverse_scored: true },
  { id: 32, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Third Eye", text: "I live my life on autopilot", reverse_scored: true },
  { id: 33, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Crown", text: "I am empathetic", reverse_scored: false },
  { id: 34, dimension: "Energetic", subdimension: "Energy Points", energy_point: "Crown", text: "I feel insignificant in the bigger picture", reverse_scored: true },
  
  // Mental + Emotional Dimension - Input
  { id: 35, dimension: "Mental + Emotional", subdimension: "Input", text: "I am a multitasker", reverse_scored: true },
  { id: 36, dimension: "Mental + Emotional", subdimension: "Input", text: "My friends support my growth", reverse_scored: false },
  { id: 37, dimension: "Mental + Emotional", subdimension: "Input", text: "The content I consume promotes my wellbeing", reverse_scored: false },
  { id: 38, dimension: "Mental + Emotional", subdimension: "Input", text: "My job challenges me", reverse_scored: false },
  { id: 39, dimension: "Mental + Emotional", subdimension: "Input", text: "I have opportunities to use my intellect", reverse_scored: false },
  
  // Mental + Emotional Dimension - Sleep
  { id: 40, dimension: "Mental + Emotional", subdimension: "Sleep", text: "I prioritize sleep", reverse_scored: false },
  { id: 41, dimension: "Mental + Emotional", subdimension: "Sleep", text: "I know how much sleep my body needs", reverse_scored: false },
  { id: 42, dimension: "Mental + Emotional", subdimension: "Sleep", text: "It is hard for me to fall asleep", reverse_scored: true },
  { id: 43, dimension: "Mental + Emotional", subdimension: "Sleep", text: "I wake up multiple times during the night", reverse_scored: true },
  { id: 44, dimension: "Mental + Emotional", subdimension: "Sleep", text: "I feel rested when I wake up", reverse_scored: false },
  
  // Mental + Emotional Dimension - Emotions
  { id: 45, dimension: "Mental + Emotional", subdimension: "Emotions", text: "I can identify my emotions", reverse_scored: false },
  { id: 46, dimension: "Mental + Emotional", subdimension: "Emotions", text: "I choose to work through my emotions", reverse_scored: false },
  { id: 47, dimension: "Mental + Emotional", subdimension: "Emotions", text: "I am able to express how I feel", reverse_scored: false },
  { id: 48, dimension: "Mental + Emotional", subdimension: "Emotions", text: "I avoid uncomfortable emotions", reverse_scored: true },
  { id: 49, dimension: "Mental + Emotional", subdimension: "Emotions", text: "I allow myself to feel my feelings", reverse_scored: false },
  
  // Wisdom Dimension - Self-trust
  { id: 50, dimension: "Wisdom", subdimension: "Self-trust", text: "I trust myself", reverse_scored: false },
  { id: 51, dimension: "Wisdom", subdimension: "Self-trust", text: "I can discern what is right for me", reverse_scored: false },
  { id: 52, dimension: "Wisdom", subdimension: "Self-trust", text: "I honor my gut feelings", reverse_scored: false },
  { id: 53, dimension: "Wisdom", subdimension: "Self-trust", text: "My self talk is positive", reverse_scored: false },
  { id: 54, dimension: "Wisdom", subdimension: "Self-trust", text: "I believe that I can do hard things", reverse_scored: false },
  
  // Wisdom Dimension - Focus
  { id: 55, dimension: "Wisdom", subdimension: "Focus", text: "I find it difficult to be present", reverse_scored: true },
  { id: 56, dimension: "Wisdom", subdimension: "Focus", text: "I am preoccupied with the future", reverse_scored: true },
  { id: 57, dimension: "Wisdom", subdimension: "Focus", text: "I find myself replaying past events", reverse_scored: true },
  { id: 58, dimension: "Wisdom", subdimension: "Focus", text: "I am comfortable with silence", reverse_scored: false },
  { id: 59, dimension: "Wisdom", subdimension: "Focus", text: "I regularly get lost in the task at hand", reverse_scored: false },
  
  // Wisdom Dimension - Aligned Action
  { id: 60, dimension: "Wisdom", subdimension: "Aligned Action", text: "My actions support my highest good", reverse_scored: false },
  { id: 61, dimension: "Wisdom", subdimension: "Aligned Action", text: "My decisions are rooted in self-love", reverse_scored: false },
  { id: 62, dimension: "Wisdom", subdimension: "Aligned Action", text: "I honor my future self with my decisions", reverse_scored: false },
  { id: 63, dimension: "Wisdom", subdimension: "Aligned Action", text: "My actions support my values", reverse_scored: false },
  { id: 64, dimension: "Wisdom", subdimension: "Aligned Action", text: "I self-sabotage", reverse_scored: true },
  
  // Bliss Dimension - Connection to Self
  { id: 65, dimension: "Bliss", subdimension: "Connection to Self", text: "I bring my full self to situations", reverse_scored: false },
  { id: 66, dimension: "Bliss", subdimension: "Connection to Self", text: "My thoughts, words, and actions align", reverse_scored: false },
  { id: 67, dimension: "Bliss", subdimension: "Connection to Self", text: "I allow myself to just \"be\"", reverse_scored: false },
  
  // Bliss Dimension - Connection to Community
  { id: 68, dimension: "Bliss", subdimension: "Connection to Community", text: "I have a support system", reverse_scored: false },
  { id: 69, dimension: "Bliss", subdimension: "Connection to Community", text: "I am a part of a community", reverse_scored: false },
  { id: 70, dimension: "Bliss", subdimension: "Connection to Community", text: "I support causes with my time or money", reverse_scored: false },
  { id: 71, dimension: "Bliss", subdimension: "Connection to Community", text: "I see examples of interconnectedness in my own life", reverse_scored: false },
  { id: 72, dimension: "Bliss", subdimension: "Connection to Community", text: "I feel like I have to go it alone", reverse_scored: true },
  
  // Bliss Dimension - Connection to Something Bigger
  { id: 73, dimension: "Bliss", subdimension: "Connection to Something Bigger", text: "I regularly spend time in nature", reverse_scored: false },
  { id: 74, dimension: "Bliss", subdimension: "Connection to Something Bigger", text: "I feel connected to something bigger than myself", reverse_scored: false },
  { id: 75, dimension: "Bliss", subdimension: "Connection to Something Bigger", text: "I have values that guide my life", reverse_scored: false },
];

const SCORE_MAP = {
  "Strongly Disagree": 0,
  "Disagree": 3,
  "Neutral": 5,
  "Agree": 7,
  "Strongly Agree": 10
};

const REVERSE_SCORE_MAP = {
  "Strongly Disagree": 10,
  "Disagree": 7,
  "Neutral": 5,
  "Agree": 3,
  "Strongly Agree": 0
};

const TakeCareAssessment = () => {
  const [stage, setStage] = useState('intro'); // intro, assessment, results
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  
  const questionsPerPage = 10;
  const totalPages = Math.ceil(QUESTIONS.length / questionsPerPage);
  
  useEffect(() => {
    // Randomize questions once on component mount
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
    setRandomizedQuestions(shuffled);
  }, []);
  
  const getCurrentPageQuestions = () => {
    const start = currentPage * questionsPerPage;
    const end = start + questionsPerPage;
    return randomizedQuestions.slice(start, end);
  };
  
  const handleStartAssessment = async (e) => {
    e.preventDefault();
    
    if (!email || !firstName) {
      alert('Please enter your name and email address.');
      return;
    }
    
    setSubmitting(true);
    
    // Submit to Flodesk
    try {
      await fetch('/api/flodesk-subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName })
      });
    } catch (error) {
      console.error('Error subscribing to Flodesk:', error);
    }
    
    setSubmitting(false);
    setStage('assessment');
  };
  
  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  
  const handleNext = () => {
    const currentQuestions = getCurrentPageQuestions();
    const allAnswered = currentQuestions.every(q => answers[q.id]);
    
    if (!allAnswered) {
      alert('Please answer all questions on this page before continuing.');
      return;
    }
    
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      calculateAndShowResults();
    }
  };
  
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const calculateScore = (questions) => {
    let total = 0;
    let count = 0;
    
    questions.forEach(q => {
      if (answers[q.id]) {
        const scoreMap = q.reverse_scored ? REVERSE_SCORE_MAP : SCORE_MAP;
        total += scoreMap[answers[q.id]];
        count++;
      }
    });
    
    return count > 0 ? Math.round((total / (count * 10)) * 100) : 0;
  };
  
  const calculateAndShowResults = () => {
    // Calculate scores by dimension and subdimension
    const results = {};
    
    randomizedQuestions.forEach(q => {
      if (!results[q.dimension]) {
        results[q.dimension] = { overall: [], subdimensions: {} };
      }
      
      if (!results[q.dimension].subdimensions[q.subdimension]) {
        results[q.dimension].subdimensions[q.subdimension] = [];
      }
      
      results[q.dimension].overall.push(q);
      results[q.dimension].subdimensions[q.subdimension].push(q);
    });
    
    // Calculate percentages
    const calculatedScores = {};
    Object.keys(results).forEach(dimension => {
      calculatedScores[dimension] = {
        overall: calculateScore(results[dimension].overall),
        subdimensions: {}
      };
      
      Object.keys(results[dimension].subdimensions).forEach(subdimension => {
        calculatedScores[dimension].subdimensions[subdimension] = 
          calculateScore(results[dimension].subdimensions[subdimension]);
      });
    });
    
    console.log('Assessment Results:', calculatedScores);
    
    // Store scores in state
    window.assessmentScores = calculatedScores;
    
    setStage('results');
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const progress = ((currentPage + 1) / totalPages) * 100;
  
  if (stage === 'intro') {
    return (
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '40px 20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#F2EBD7',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img 
            src="/logo.png" 
            alt="Inner Workout" 
            style={{ 
              height: '60px', 
              margin: '0 auto 20px', 
              display: 'block' 
            }}
          />
        </div>
        
        <div style={{ 
          background: 'white', 
          padding: '30px', 
          borderRadius: '12px',
          marginBottom: '30px',
          boxShadow: '0 2px 8px rgba(26, 26, 26, 0.1)'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1A1A1A' }}>
            It's time to <em>Take Care</em>.
          </h2>
          
          <p style={{ marginBottom: '15px', lineHeight: '1.6', color: '#1A1A1A' }}>
            Our 75-question assessment gives you a snapshot of your current relationship to self-care, 
            and then it shares three personalized practices for you to try.
          </p>
          
          <p style={{ 
            background: '#CAE2EF', 
            padding: '15px', 
            borderRadius: '8px',
            marginBottom: '15px',
            lineHeight: '1.6',
            color: '#1A1A1A'
          }}>
            <strong>FYI:</strong> Our software requires you to complete the assessment in one sitting, 
            so we recommend setting aside at least 10 minutes.
          </p>
          
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#1A1A1A' }}>
            You ready?
          </p>
        </div>
        
        <form onSubmit={handleStartAssessment} style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(26, 26, 26, 0.1)'
        }}>
          <h3 style={{ 
            textAlign: 'center', 
            marginBottom: '20px',
            fontSize: '18px',
            fontWeight: '600',
            color: '#1A1A1A'
          }}>
            Contact Information
          </h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500',
              color: '#1A1A1A'
            }}>
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #DFA36D',
                borderRadius: '6px',
                boxSizing: 'border-box',
                color: '#1A1A1A'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: '500',
              color: '#1A1A1A'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #DFA36D',
                borderRadius: '6px',
                boxSizing: 'border-box',
                color: '#1A1A1A'
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              background: submitting ? '#ACB884' : '#CB6B4D',
              border: 'none',
              borderRadius: '6px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              marginBottom: '20px'
            }}
          >
            {submitting ? 'STARTING...' : 'BEGIN ASSESSMENT →'}
          </button>
          
          <p style={{ fontSize: '12px', lineHeight: '1.5', color: '#1A1A1A' }}>
            We'll use your information to create your downloadable Take Care profile and deliver 
            ongoing communications from Taylor Elyse Morrison. By taking the assessment, you agree 
            to our <a href="https://www.innerworkout.co/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#CB6B4D', textDecoration: 'underline' }}>Privacy Policy</a>. You can unsubscribe at any time.
          </p>
        </form>
        
        <p style={{ 
          textAlign: 'center', 
          marginTop: '30px',
          fontSize: '14px',
          color: '#1A1A1A'
        }}>
          Copyright ©2020-2023 Inner Workout. All rights reserved.
        </p>
      </div>
    );
  }
  
  if (stage === 'assessment') {
    const currentQuestions = getCurrentPageQuestions();
    
    return (
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '40px 20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#F2EBD7',
        minHeight: '100vh'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img 
            src="/logo.png" 
            alt="Inner Workout" 
            style={{ 
              height: '50px', 
              margin: '0 auto 15px', 
              display: 'block' 
            }}
          />
        </div>
        
        <div style={{ marginBottom: '30px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '14px',
            color: '#1A1A1A'
          }}>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div style={{
            height: '8px',
            background: 'white',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: '#DFA36D',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>
        
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          boxShadow: '0 2px 8px rgba(26, 26, 26, 0.1)'
        }}>
          <h2 style={{ 
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '20px',
            color: '#1A1A1A'
          }}>
            Rate your level of agreement with the following statements:
          </h2>
          
          {currentQuestions.map((question, index) => (
            <div key={question.id} style={{
              background: '#F2EBD7',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: index < currentQuestions.length - 1 ? '20px' : '0',
              border: '2px solid #DFA36D'
            }}>
              <p style={{ 
                marginBottom: '15px',
                fontSize: '16px',
                fontWeight: '500',
                color: '#1A1A1A'
              }}>
                {question.text}
              </p>
              
              {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map(option => (
                <label 
                  key={option}
                  style={{ 
                    display: 'block',
                    padding: '10px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    border: '2px solid',
                    borderColor: answers[question.id] === option ? '#CB6B4D' : '#ACB884',
                    background: answers[question.id] === option ? '#CAE2EF' : 'white',
                    color: '#1A1A1A'
                  }}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  {option}
                </label>
              ))}
            </div>
          ))}
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          gap: '15px'
        }}>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            style={{
              flex: 1,
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#1A1A1A',
              background: 'white',
              border: '2px solid #1A1A1A',
              borderRadius: '6px',
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 0 ? 0.5 : 1
            }}
          >
            ← Previous
          </button>
          
          <button
            onClick={handleNext}
            style={{
              flex: 1,
              padding: '14px',
              fontSize: '16px',
              fontWeight: '600',
              color: 'white',
              background: '#CB6B4D',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {currentPage < totalPages - 1 ? 'Next →' : 'Submit & Get Results'}
          </button>
        </div>
      </div>
    );
  }
  
  if (stage === 'results') {
    const scores = window.assessmentScores || {};
    
    return (
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '40px 20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#F2EBD7',
        minHeight: '100vh'
      }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            button { display: none !important; }
            body { background: white !important; }
            @page { margin: 1in; }
          }
        `}} />
        
        <img 
          src="/logo.png" 
          alt="Inner Workout" 
          style={{ 
            height: '60px', 
            margin: '0 auto 20px', 
            display: 'block' 
          }}
        />
        
        <h1 style={{ fontSize: '36px', marginBottom: '10px', textAlign: 'center', color: '#1A1A1A' }}>
          Your Take Care Profile
        </h1>
        
        <p style={{ fontSize: '18px', marginBottom: '30px', color: '#1A1A1A', textAlign: 'center' }}>
          An Inner Workout Assessment
        </p>
        
        <div style={{
          background: '#CAE2EF',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '20px', marginBottom: '10px', color: '#1A1A1A' }}>
            <strong>{firstName}</strong>
          </p>
          <p style={{ color: '#1A1A1A' }}>
            Assessment Completed: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          boxShadow: '0 2px 8px rgba(26, 26, 26, 0.1)'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '25px', color: '#1A1A1A' }}>
            Your Results
          </h2>
          
          {Object.keys(scores).map(dimension => (
            <div key={dimension} style={{ marginBottom: '30px' }}>
              <div style={{
                background: '#F2EBD7',
                padding: '15px 20px',
                borderRadius: '8px',
                marginBottom: '15px',
                borderLeft: '4px solid #CB6B4D'
              }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  marginBottom: '5px',
                  color: '#1A1A1A'
                }}>
                  {dimension}
                </h3>
                <p style={{ 
                  fontSize: '32px', 
                  fontWeight: '700',
                  color: '#CB6B4D',
                  margin: 0
                }}>
                  {scores[dimension].overall}%
                </p>
              </div>
              
              <div style={{ paddingLeft: '20px' }}>
                {Object.keys(scores[dimension].subdimensions).map(subdimension => (
                  <div key={subdimension} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 15px',
                    marginBottom: '8px',
                    background: '#F2EBD7',
                    borderRadius: '6px',
                    border: '1px solid #DFA36D'
                  }}>
                    <span style={{ fontSize: '16px', color: '#1A1A1A' }}>
                      {subdimension}
                    </span>
                    <span style={{ 
                      fontSize: '18px', 
                      fontWeight: '600',
                      color: '#CB6B4D'
                    }}>
                      {scores[dimension].subdimensions[subdimension]}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{
          background: '#ACB884',
          padding: '25px',
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '15px', color: '#1A1A1A' }}>
            🎉 Assessment Complete!
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '10px', color: '#1A1A1A' }}>
            Your results are displayed above. You can download this page as a PDF using the button below.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#1A1A1A' }}>
            Your results have also been saved and will be emailed to <strong>{email}</strong> shortly with personalized practices.
          </p>
        </div>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <button
            onClick={handlePrint}
            style={{
              padding: '15px 40px',
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              background: '#CB6B4D',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.target.style.background = '#1A1A1A'}
            onMouseOut={(e) => e.target.style.background = '#CB6B4D'}
          >
            📄 Download as PDF
          </button>
          <p style={{ 
            fontSize: '14px', 
            color: '#1A1A1A',
            marginTop: '15px'
          }}>
            Click the button above, then choose "Save as PDF" in the print dialog
          </p>
        </div>
        
        <p style={{ 
          fontSize: '14px',
          color: '#1A1A1A',
          marginTop: '30px',
          textAlign: 'center'
        }}>
          innerworkout.co | @innerworkout
        </p>
      </div>
    );
  }
  
  return null;
};

export default TakeCareAssessment;
