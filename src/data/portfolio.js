import projectData from '../Pages/ProjectsData.js';
import careerData from '../Pages/CareerData.js';
import educationData from '../Pages/educationData.js';
import awardData from '../Pages/AwardsData.js';
import skillsData from '../Pages/SkillsData.js';
import staticData from '../stringConst.js';
import resume from '../media/certificates/PriyanshChoudhary_Resume_01112026.pdf';

export const profile = { ...staticData, resume };
export const experience = careerData;
export const education = educationData;
export const awards = awardData;

const projectPresentation = {
  'Dear-Diary Mental Health Supervisor': { id: 'dear-diary', image: 'diary', title: 'Dear Diary', category: 'MOBILE / MACHINE LEARNING', tags: ['Kotlin', 'Firebase', 'NLTK'], featured: true },
  'HealthifyMe Medical Chatbot': { id: 'healthifyme', image: 'chatbot', title: 'HealthifyMe', category: 'MACHINE LEARNING', tags: ['Python', 'Decision Trees', 'Tkinter'] },
  'AI Enabled FinTech B2B Order Management Application': { id: 'fintech', image: 'fintech', title: 'B2B order management', category: 'FULL STACK / FINTECH', tags: ['React', 'Java', 'MySQL'], featured: true },
  'Virtual Hand Control': { id: 'hand-control', image: 'hand-control', title: 'Virtual hand control', category: 'COMPUTER VISION', tags: ['Python', 'OpenCV'], featured: true },
  'PG Life Website': { id: 'pg-life', image: 'pg-life', title: 'PG Life', category: 'WEB APPLICATION', tags: ['React', 'PHP', 'MySQL'] },
  'Online Delivery- Restaurant App': { id: 'restaurant', image: 'restaurant', title: 'Restaurant delivery', category: 'ANDROID APPLICATION', tags: ['Kotlin', 'Firebase'] },
};
export const projects = projectData.map(project => ({ ...project, ...projectPresentation[project.projectName] }));

const category = type => skillsData.filter(skill => skill.type === type).map(skill => skill.skill);
export const capabilities = [
  { title: 'Cloud & Platform', icon: 'cloud', color: 'blue', description: 'Infrastructure that supports real workloads.', tools: category('Cloud & Infrastructure') },
  { title: 'Software Engineering', icon: 'code', color: 'violet', description: 'From backend services to the systems around them.', tools: category('Programming Languages') },
  { title: 'Data & Storage', icon: 'database', color: 'green', description: 'Working with relational data and application storage.', tools: [...category('Databases'), 'Firebase'] },
  { title: 'DevOps & Observability', icon: 'activity', color: 'orange', description: 'Automating delivery. Understanding production.', tools: [...category('DevOps & Automation'), 'Prometheus', 'Grafana', 'Alertmanager'] },
  { title: 'Resilience & Recovery', icon: 'shield', color: 'violet', description: 'Keeping workloads recoverable when things go wrong.', tools: ['Azure BCDR', 'AKS backup & restore', 'Velero', 'Cross-region recovery', 'E2E & chaos testing'] },
  { title: 'Web & Applications', icon: 'layers', color: 'amber', description: 'Connecting useful interfaces to the services behind them.', tools: [...category('Web & Frameworks'), 'Django', 'Kotlin'] },
];
