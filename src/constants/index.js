/**
 * Application-wide constants for VoteWise AI.
 * Centralizing constants improves maintainability and code quality.
 */

export const LANGUAGES = ['English', 'Hindi', 'Telugu', 'Tamil'];

export const MODES = ['Simple', 'Student', 'Exam', 'First Voter'];

export const VIEWS = [
  { id: 'chat', label: '🤖 AI Assistant' },
  { id: 'quiz', label: '🧠 Quiz' },
  { id: 'flashcards', label: '🃏 Flashcards' },
  { id: 'simulation', label: '🗳️ Simulation' },
  { id: 'timeline', label: '📅 Timeline' },
  { id: 'myths', label: '🔍 Myth vs Fact' },
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    difficulty: 'Beginner',
    question: 'Who appoints the Chief Election Commissioner of India?',
    options: ['Prime Minister', 'President of India', 'Chief Justice of India', 'Parliament'],
    correctAnswer: 1,
    explanation: 'Under Article 324 of the Constitution, the President appoints the CEC and other Election Commissioners.',
    wrongExplanation: 'While the Parliament passes laws and PM advises, the formal appointment is strictly done by the President of India.',
  },
  {
    id: 2,
    difficulty: 'Intermediate',
    question: 'Which Constitutional Amendment lowered the voting age from 21 to 18?',
    options: ['42nd Amendment', '44th Amendment', '61st Amendment', '73rd Amendment'],
    correctAnswer: 2,
    explanation: 'The 61st Amendment Act of 1988 lowered the voting age from 21 to 18 years for Lok Sabha and Assembly elections.',
    wrongExplanation: "The 42nd is the 'Mini Constitution', 44th reversed it, and 73rd is Panchayati Raj. The 61st deals specifically with voting age.",
  },
  {
    id: 3,
    difficulty: 'UPSC Exam Mode',
    question: 'According to the Anti-Defection Law (10th Schedule), who decides questions of disqualification of a member of Parliament?',
    options: ['Election Commission', 'President', 'Supreme Court', 'Presiding Officer of the House'],
    correctAnswer: 3,
    explanation: 'The 52nd Amendment (1985) states that the Chairman or the Speaker of the House makes the final decision on disqualification due to defection.',
    wrongExplanation: 'The Election Commission advises the President on general disqualifications, but defection specifically is decided by the Speaker/Chairman.',
  },
  {
    id: 4,
    difficulty: 'Intermediate',
    question: 'What is the minimum age to contest for Lok Sabha elections?',
    options: ['18 years', '21 years', '25 years', '30 years'],
    correctAnswer: 2,
    explanation: 'As per Article 84(b) of the Constitution, a candidate must be at least 25 years of age to contest for the Lok Sabha.',
    wrongExplanation: '18 is the voting age (61st Amendment), 21 is the minimum age for State Assemblies, and 30 is for Rajya Sabha.',
  },
  {
    id: 5,
    difficulty: 'Beginner',
    question: 'What does ECI stand for?',
    options: ['Electoral Commission of India', 'Election Commission of India', 'Electoral Control Institute', 'Election Council of India'],
    correctAnswer: 1,
    explanation: 'ECI stands for Election Commission of India, a constitutional body established under Article 324 to conduct free and fair elections.',
    wrongExplanation: "The correct full form is 'Election Commission of India'. The other options are incorrect expansions.",
  },
];

export const FLASHCARDS = [
  { term: 'Article 324', definition: 'Vests the superintendence, direction, and control of elections in an Election Commission.', category: 'Constitution' },
  { term: 'VVPAT', definition: 'Voter Verified Paper Audit Trail. An independent verification system for voting machines.', category: 'EVM' },
  { term: 'Model Code of Conduct', definition: 'Guidelines issued by ECI for conduct of political parties and candidates during elections.', category: 'Election Laws' },
  { term: 'NOTA', definition: 'None Of The Above. Allows voters to officially register a vote of rejection for all candidates.', category: 'Voting' },
  { term: 'Delimitation', definition: 'The act of redrawing boundaries of Lok Sabha and Assembly seats to represent changes in population.', category: 'Constitution' },
  { term: 'RP Act 1951', definition: 'Representation of the People Act, 1951 - governs the conduct of elections to the Parliament and State Legislatures.', category: 'Election Laws' },
  { term: 'Article 326', definition: 'Grants universal adult suffrage - every citizen above 18 has the right to vote.', category: 'Constitution' },
];

export const MYTHS = [
  { myth: 'EVMs can be hacked via Bluetooth or WiFi.', fact: 'Indian EVMs are standalone machines with no radio frequency transmission or reception capability.' },
  { myth: "If I don't vote, someone else can vote in my name.", fact: 'Polling officers verify identity rigorously. Also, VVPATs allow voters to verify their cast vote.' },
  { myth: 'NOTA votes can disqualify winning candidates.', fact: 'Even if NOTA gets the highest votes, the candidate with the next highest votes is declared the winner.' },
  { myth: 'You need a Voter ID card to vote.', fact: 'If your name is on the electoral roll, you can vote using 11 other alternate photo ID documents (like Aadhaar, Passport).' },
  { myth: 'You can be disqualified from voting if you have a criminal case.', fact: 'A criminal case alone does not disqualify you. Only a conviction with 2+ years imprisonment can cause disqualification.' },
];

export const SIMULATION_STEPS = [
  {
    title: 'Polling Booth Entry',
    description: 'You arrive at the polling booth. The First Polling Officer checks your identity against the electoral roll.',
    action: 'Show Voter ID',
    icon: 'UserCheck',
  },
  {
    title: 'Verification & Ink',
    description: 'The Second Polling Officer marks your left forefinger with indelible ink, gives you a voter slip, and takes your signature.',
    action: 'Get Inked & Sign',
    icon: 'CheckCircle2',
  },
  {
    title: 'Voting Compartment',
    description: 'The Third Polling Officer takes your slip. You enter the voting compartment and press the blue button on the EVM next to your chosen candidate.',
    action: 'Press EVM Button',
    icon: 'Inbox',
  },
  {
    title: 'VVPAT Verification',
    description: 'A red light glows on the EVM, you hear a beep, and a printed slip appears in the VVPAT window for 7 seconds so you can verify your vote.',
    action: 'Verify Vote',
    icon: 'ShieldCheck',
  },
];

export const TIMELINE_EVENTS = [
  { phase: 'Notification', desc: 'ECI announces election dates and enforces the Model Code of Conduct.' },
  { phase: 'Nominations', desc: 'Candidates file nomination papers and submit security deposits.' },
  { phase: 'Scrutiny & Withdrawal', desc: 'Returning Officer checks papers. Candidates can withdraw names.' },
  { phase: 'Campaigning', desc: 'Ends 48 hours before polling begins (Silence Period).' },
  { phase: 'Polling Day', desc: 'Voters cast votes via EVMs. Presiding officers seal machines.' },
  { phase: 'Counting Day', desc: 'EVMs opened. VVPAT slips verified randomly. Results declared.' },
];

export const QUICK_CHAT_ACTIONS = [
  'What is an EVM?',
  'How do I register to vote?',
  'What is NOTA?',
  'Explain Article 324',
  'What is Model Code of Conduct?',
];
