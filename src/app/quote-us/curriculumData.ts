// /quote-us 학년×과목 목차 데이터. 모든 단원명은 영어만 사용합니다(한글 목차 금지).
// 100P/200P 확장 규칙:
//  - English: 100P = 주어진 6개 단원 전체, 200P = 100P + "Review Tests"
//  - Math(학년) / 고교 수학 과목: 100P = 주어진 단원 전체, 200P = 100P + "Extra Practice" + "Mixed Review"
//  - AP: 100P = 유닛 중 앞쪽 절반 + "Skill Drills", 200P = 전체 유닛 + "Section Review 1" + "Section Review 2"

export type Grade =
  | "G1" | "G2" | "G3" | "G4" | "G5" | "G6" | "G7" | "G8" | "G9" | "G10" | "G11" | "G12";

export const GRADES: Grade[] = ["G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "G12"];

// 학년별 English 핵심 단원 (6개씩, 서로 다름)
export const ENGLISH_TOC: Record<Grade, string[]> = {
  G1: ["Phonics and Sight Words", "Story Elements", "Main Idea in Short Texts", "Complete Sentences", "Capital Letters and Periods", "Listening to Read-Alouds"],
  G2: ["Short Passages", "Beginning, Middle, End", "Nouns and Verbs", "Asking and Answering Questions", "Opinion Sentences", "Basic Vocabulary in Context"],
  G3: ["Chapter-Book Passages", "Character and Setting", "Context Clues", "Paragraph Writing", "Subject-Verb Agreement", "Compare and Contrast"],
  G4: ["Informational Text Features", "Theme", "Multi-Paragraph Writing", "Figurative Language (simile)", "Grammar Review", "Text Evidence"],
  G5: ["Literary vs Informational", "Summary and Paraphrase", "Argument Paragraphs", "Point of View", "Precise Vocabulary", "Editing and Revising"],
  G6: ["Short Stories and Articles", "Claim and Evidence", "Narrative and Expository Writing", "Grammar in Context", "Academic Vocabulary"],
  G7: ["Fiction and Nonfiction Pairings", "Thesis Statements", "Literary Devices", "Research Notes", "Formal vs Informal Tone"],
  G8: ["Analysis of Theme and Structure", "Argument Essays", "Rhetoric Basics", "Citing Sources", "Vocabulary from Grade-Level Texts"],
  G9: ["Literary Analysis", "Rhetorical Situation", "Research Writing", "Grammar for Clarity", "SAT-style Vocabulary in Context"],
  G10: ["World and American Literature Excerpts", "Synthesis Writing", "Rhetoric and Style", "Evidence-Based Paragraphs"],
  G11: ["American Literature Focus", "Rhetorical Analysis", "Extended Argument", "College-Ready Grammar"],
  G12: ["College Composition Skills", "Literary Criticism Basics", "Research Paper Structure", "Revision Workshops"],
};

// 학년별 Math 핵심 단원 (서로 다름)
export const MATH_TOC: Record<Grade, string[]> = {
  G1: ["Counting and Place Value to 120", "Addition and Subtraction within 20", "Shapes", "Measurement with Length", "Word Problems"],
  G2: ["Place Value to 1,000", "Addition/Subtraction within 100", "Arrays", "Time and Money", "Simple Data"],
  G3: ["Multiplication and Division Facts", "Fractions as Parts of a Whole", "Area", "Two-Step Word Problems"],
  G4: ["Multi-Digit Operations", "Equivalent Fractions", "Angles", "Factors and Multiples"],
  G5: ["Decimal Place Value", "Fraction Operations", "Volume", "Coordinate Grid (First Quadrant)"],
  G6: ["Ratios and Rates", "Fractions/Decimals/Percents", "Integers", "Area and Surface Area", "Statistical Questions"],
  G7: ["Proportional Relationships", "Rational Numbers", "Expressions and Equations", "Probability", "Scale Drawings"],
  G8: ["Linear Equations", "Functions Intro", "Systems of Two Equations", "Pythagorean Theorem", "Volume of Cylinders/Cones/Spheres"],
  G9: ["Algebra 1 Overlap: Linear and Quadratic Functions", "Inequalities", "Exponents", "Data Displays"],
  G10: ["Geometry Overlap: Congruence", "Similarity", "Right Triangles", "Circles", "Geometric Measurement"],
  G11: ["Algebra 2 / Precalculus Prep: Polynomials", "Exponential and Log", "Trig Intro", "Sequences"],
  G12: ["Precalculus / Calc Prep: Functions Review", "Limits Preview", "Trig Identities", "Series Intro"],
};

export interface CourseToc {
  title: string;
  toc: string[];
}

// 고교 수학 선택 과목 (G9–G12에서 활성화, 학년 무관 고정 목차)
export const HS_MATH_COURSES: Record<string, CourseToc> = {
  Geometry: {
    title: "Geometry",
    toc: ["Tools of Geometry", "Reasoning and Proof", "Parallel and Perpendicular Lines", "Congruent Triangles", "Relationships in Triangles", "Polygons and Quadrilaterals", "Similarity", "Right Triangles and Trigonometry", "Transformations", "Circles", "Area", "Surface Area and Volume"],
  },
  "Algebra 1": {
    title: "Algebra 1",
    toc: ["Real Numbers and Operations", "Linear Equations and Inequalities", "Systems of Equations", "Functions and Graphing", "Exponents and Exponential Functions", "Polynomials and Factoring", "Quadratic Functions", "Radical Expressions", "Data and Statistics"],
  },
  "Algebra 2": {
    title: "Algebra 2",
    toc: ["Linear Systems and Matrices", "Quadratic Functions", "Polynomial Functions", "Rational Expressions", "Radical Functions", "Exponential and Logarithmic Functions", "Sequences and Series", "Conic Sections", "Probability and Statistics", "Trigonometry Intro"],
  },
  Precalculus: {
    title: "Precalculus",
    toc: ["Functions and Graphs", "Polynomial and Rational Functions", "Exponential and Log", "Trigonometric Functions", "Analytic Trigonometry", "Applications of Trigonometry", "Systems and Matrices", "Analytic Geometry", "Sequences, Series, Probability", "Limits Intro"],
  },
  Calculus: {
    title: "Calculus",
    toc: ["Limits and Continuity", "Derivatives", "Applications of Derivatives", "Integrals", "Applications of Integrals", "Differential Equations Intro"],
  },
  Statistics: {
    title: "Statistics",
    toc: ["Exploring Data", "Sampling and Experiments", "Probability", "Random Variables", "Sampling Distributions", "Confidence Intervals", "Significance Tests"],
  },
};

export interface ApSubject {
  id: string;
  title: string;
  /** null = 고정 목차 없이 Inquire 안내만 표시 (예: 기타 언어) */
  toc: string[] | null;
}

export const AP_SUBJECTS: ApSubject[] = [
  { id: "ap-english-language", title: "AP English Language", toc: ["Rhetorical Situation", "Claims and Evidence", "Reasoning and Organization", "Style"] },
  { id: "ap-english-literature", title: "AP English Literature", toc: ["Short Fiction", "Poetry", "Longer Fiction or Drama", "Literary Argument"] },
  { id: "ap-calculus-ab", title: "AP Calculus AB", toc: ["Limits", "Differentiation", "Contextual Applications", "Analytical Applications", "Integration", "Differential Equations", "Applications of Integration"] },
  { id: "ap-calculus-bc", title: "AP Calculus BC", toc: ["Limits", "Differentiation", "Contextual Applications", "Analytical Applications", "Integration", "Differential Equations", "Applications of Integration", "Parametric, Polar, and Vector Functions", "Infinite Sequences and Series"] },
  { id: "ap-statistics", title: "AP Statistics", toc: ["Exploring One-Variable Data", "Exploring Two-Variable Data", "Collecting Data", "Probability and Random Variables", "Sampling Distributions", "Inference for Proportions", "Inference for Means", "Inference for Categories / Slope"] },
  { id: "ap-physics-1", title: "AP Physics 1", toc: ["Kinematics", "Dynamics", "Circular Motion and Gravitation", "Energy", "Momentum", "Simple Harmonic Motion", "Torque and Rotational Motion"] },
  { id: "ap-physics-2", title: "AP Physics 2", toc: ["Fluids", "Thermodynamics", "Electric Force and Circuits", "Magnetism and EM Induction", "Geometric and Physical Optics", "Modern Physics"] },
  { id: "ap-physics-c-mechanics", title: "AP Physics C: Mechanics", toc: ["Kinematics", "Newton's Laws", "Work, Energy, Power", "Systems of Particles", "Rotation", "Oscillations", "Gravitation"] },
  { id: "ap-physics-c-em", title: "AP Physics C: E&M", toc: ["Electrostatics", "Conductors, Capacitors, Dielectrics", "Electric Circuits", "Magnetic Fields", "Electromagnetism"] },
  { id: "ap-biology", title: "AP Biology", toc: ["Chemistry of Life", "Cell Structure and Function", "Cellular Energetics", "Cell Communication and Cycle", "Inheritance", "Gene Expression", "Natural Selection", "Ecology"] },
  { id: "ap-chemistry", title: "AP Chemistry", toc: ["Atomic Structure", "Compound Structure", "Properties of Substances", "Chemical Reactions", "Kinetics", "Thermochemistry", "Equilibrium", "Acids and Bases", "Applications of Thermodynamics"] },
  { id: "ap-environmental-science", title: "AP Environmental Science", toc: ["Ecosystems", "Biodiversity", "Populations", "Earth Systems", "Land and Water Use", "Energy Resources", "Atmospheric Pollution", "Aquatic and Terrestrial Pollution", "Global Change"] },
  { id: "ap-us-history", title: "AP US History", toc: ["Period 1: 1491–1607", "Period 2: 1607–1754", "Period 3: 1754–1800", "Period 4: 1800–1848", "Period 5: 1844–1877", "Period 6: 1865–1898", "Period 7: 1890–1945", "Period 8: 1945–1980", "Period 9: 1980–Present"] },
  { id: "ap-world-history", title: "AP World History", toc: ["The Global Tapestry", "Networks of Exchange", "Land-Based Empires", "Transoceanic Interconnections", "Revolutions", "Consequences of Industrialization", "Global Conflict", "Cold War and Decolonization", "Globalization"] },
  { id: "ap-european-history", title: "AP European History", toc: ["Renaissance and Exploration", "Age of Reformation", "Absolutism and Constitutionalism", "Scientific Revolution and Enlightenment", "Conflict and State-Building", "Industrialization", "19th-Century Perspectives", "20th-Century Global Conflicts", "Cold War and Contemporary Europe"] },
  { id: "ap-human-geography", title: "AP Human Geography", toc: ["Thinking Geographically", "Population and Migration", "Culture", "Political Patterns", "Agriculture", "Cities", "Industrial and Economic Development"] },
  { id: "ap-us-government", title: "AP US Government", toc: ["Foundations of Democracy", "Interactions Among Branches", "Civil Liberties and Rights", "American Political Ideologies and Beliefs", "Political Participation"] },
  { id: "ap-macroeconomics", title: "AP Macroeconomics", toc: ["Basic Economic Concepts", "Economic Indicators", "National Income and Price Determination", "Financial Sector", "Long-Run Consequences", "Open Economy"] },
  { id: "ap-microeconomics", title: "AP Microeconomics", toc: ["Basic Economic Concepts", "Supply and Demand", "Production Cost and Perfect Competition", "Imperfect Competition", "Factor Markets", "Market Failure and Government"] },
  { id: "ap-psychology", title: "AP Psychology", toc: ["Biological Bases", "Cognition", "Development", "Social Psychology and Personality", "Mental and Physical Health"] },
  { id: "ap-computer-science-a", title: "AP Computer Science A", toc: ["Primitive Types", "Using Objects", "Boolean Expressions and if", "Iteration", "Writing Classes", "Array", "ArrayList", "2D Array", "Inheritance", "Recursion"] },
  { id: "ap-computer-science-principles", title: "AP Computer Science Principles", toc: ["Creative Development", "Data", "Algorithms and Programming", "Computing Systems and Networks", "Impact of Computing"] },
  { id: "ap-spanish-language", title: "AP Spanish Language", toc: null },
];
