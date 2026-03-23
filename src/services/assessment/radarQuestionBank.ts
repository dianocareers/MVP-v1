export interface RadarDomainDef {
  id: string;
  name: string;
  reflectionPrompt: string;
  questions: { id: string; text: string }[];
}

export const foundationDomains: RadarDomainDef[] = [
  {
    id: 'f1',
    name: 'Communication',
    reflectionPrompt: 'Reflect on a specific instance where your communication broke down or succeeded in the last 3 months.',
    questions: [
      { id: 'f1_q1', text: 'I have clearly articulated my ideas in writing over the last 3 months.' },
      { id: 'f1_q2', text: 'I have proactively shared status updates with stakeholders within the last 3 months.' },
      { id: 'f1_q3', text: 'I have actively listened and adjusted my approach based on feedback in the last 3 months.' },
      { id: 'f1_q4', text: 'I have managed difficult conversations calmly and professionally in the last 3 months.' },
      { id: 'f1_q5', text: 'I have presented information effectively in meetings within the last 3 months.' },
    ]
  },
  {
    id: 'f2',
    name: 'Problem Solving',
    reflectionPrompt: 'Describe a complex problem you navigated in the last 3 months and the steps you took.',
    questions: [
      { id: 'f2_q1', text: 'I have successfully broken down complex issues into manageable tasks over the last 3 months.' },
      { id: 'f2_q2', text: 'I have independently resolved roadblocks without needing immediate escalation in the last 3 months.' },
      { id: 'f2_q3', text: 'I have anticipated potential issues before they became critical in the last 3 months.' },
      { id: 'f2_q4', text: 'I have used data or structured logic to validate my solutions within the last 3 months.' },
      { id: 'f2_q5', text: 'I have learned from mistakes and implemented preventative measures in the last 3 months.' },
    ]
  },
  {
    id: 'f3',
    name: 'Execution & Delivery',
    reflectionPrompt: 'Detail your consistency in meeting commitments over the last 3 months.',
    questions: [
      { id: 'f3_q1', text: 'I have met my deadlines consistently over the last 3 months.' },
      { id: 'f3_q2', text: 'I have maintained high quality in my work output within the last 3 months.' },
      { id: 'f3_q3', text: 'I have effectively prioritized tasks when faced with competing demands in the last 3 months.' },
      { id: 'f3_q4', text: 'I have delivered work that required little to no rework by others in the last 3 months.' },
      { id: 'f3_q5', text: 'I have stayed focused and minimizing distractions during critical pushes in the last 3 months.' },
    ]
  },
  {
    id: 'f4',
    name: 'Collaboration',
    reflectionPrompt: 'Reflect on your teamwork and how you supported others in the last 3 months.',
    questions: [
      { id: 'f4_q1', text: 'I have actively contributed to team goals outside my direct responsibilities in the last 3 months.' },
      { id: 'f4_q2', text: 'I have offered help to peers who were struggling within the last 3 months.' },
      { id: 'f4_q3', text: 'I have shared credit and recognized the contributions of others in the last 3 months.' },
      { id: 'f4_q4', text: 'I have navigated disagreements with colleagues constructively in the last 3 months.' },
      { id: 'f4_q5', text: 'I have built positive rapport with cross-functional partners over the last 3 months.' },
    ]
  },
  {
    id: 'f5',
    name: 'Adaptability',
    reflectionPrompt: 'Describe a significant change you had to rapidly adjust to in the last 3 months.',
    questions: [
      { id: 'f5_q1', text: 'I have adjusted my plans quickly when strategic priorities shifted in the last 3 months.' },
      { id: 'f5_q2', text: 'I have learned a new tool or process rapidly when required within the last 3 months.' },
      { id: 'f5_q3', text: 'I have maintaned a positive attitude during times of uncertainty in the last 3 months.' },
      { id: 'f5_q4', text: 'I have received critical feedback and incorporated it without defensiveness in the last 3 months.' },
      { id: 'f5_q5', text: 'I have effectively navigated ambiguous requirements over the last 3 months.' },
    ]
  }
];

export const leadershipDomains: RadarDomainDef[] = [
  {
    id: 'l1',
    name: 'Strategic Thinking',
    reflectionPrompt: 'Reflect on a strategic decision you influenced or made in the last 3 months.',
    questions: [
      { id: 'l1_q1', text: 'I have aligned local team goals with broader organizational objectives in the last 3 months.' },
      { id: 'l1_q2', text: 'I have identified market or internal trends that impact our roadmap within the last 3 months.' },
      { id: 'l1_q3', text: 'I have evaluated the long-term consequences of short-term technical/business decisions in the last 3 months.' },
      { id: 'l1_q4', text: 'I have proposed new initiatives that drive distinct business value over the last 3 months.' },
      { id: 'l1_q5', text: 'I have successfully navigated tradeoffs between speed and quality in the last 3 months.' },
    ]
  },
  {
    id: 'l2',
    name: 'Mentorship',
    reflectionPrompt: 'Describe how you fostered the growth of a colleague in the last 3 months.',
    questions: [
      { id: 'l2_q1', text: 'I have actively coached a colleague through a difficult challenge over the last 3 months.' },
      { id: 'l2_q2', text: 'I have provided actionable, constructive feedback to peers within the last 3 months.' },
      { id: 'l2_q3', text: 'I have created opportunities for others to gain visibility in the last 3 months.' },
      { id: 'l2_q4', text: 'I have shared my knowledge through documentation or presentations in the last 3 months.' },
      { id: 'l2_q5', text: 'I have helped a teammate recover from a failure constructively in the last 3 months.' },
    ]
  },
  {
    id: 'l3',
    name: 'Executive Presence',
    reflectionPrompt: 'Reflect on a high-stakes meeting where you had to project confidence in the last 3 months.',
    questions: [
      { id: 'l3_q1', text: 'I have communicated confidently with senior leadership over the last 3 months.' },
      { id: 'l3_q2', text: 'I have remained composed and articulate under pressure within the last 3 months.' },
      { id: 'l3_q3', text: 'I have driven meetings to concise, actionable conclusions in the last 3 months.' },
      { id: 'l3_q4', text: 'I have represented my team or department effectively to external parties in the last 3 months.' },
      { id: 'l3_q5', text: 'I have commanded respect and attention when presenting critical information in the last 3 months.' },
    ]
  },
  {
    id: 'l4',
    name: 'Influence',
    reflectionPrompt: 'Detail a time you convinced others to adopt your perspective without having direct authority in the last 3 months.',
    questions: [
      { id: 'l4_q1', text: 'I have successfully gained buy-in for a controversial idea within the last 3 months.' },
      { id: 'l4_q2', text: 'I have influenced cross-functional teams to change their roadmap based on my input in the last 3 months.' },
      { id: 'l4_q3', text: 'I have navigated organizational politics to secure resources in the last 3 months.' },
      { id: 'l4_q4', text: 'I have built coalitions of support before proposing major changes over the last 3 months.' },
      { id: 'l4_q5', text: 'I have persuaded stakeholders to invest in technical/process debt reduction in the last 3 months.' },
    ]
  },
  {
    id: 'l5',
    name: 'Business Acumen',
    reflectionPrompt: 'Explain how your work directly impacted a key business metric in the last 3 months.',
    questions: [
      { id: 'l5_q1', text: 'I have explicitly linked my daily work to revenue, retention, or cost metrics in the last 3 months.' },
      { id: 'l5_q2', text: 'I have minimized waste by optimizing processes or reducing vendor costs within the last 3 months.' },
      { id: 'l5_q3', text: 'I have engaged in discussions about customer needs and market fit in the last 3 months.' },
      { id: 'l5_q4', text: 'I have modeled the financial or operational ROI of my proposals over the last 3 months.' },
      { id: 'l5_q5', text: 'I have factored business risk into my execution strategy within the last 3 months.' },
    ]
  }
];

export const technicalDomains: RadarDomainDef[] = [
  {
    id: 't1',
    name: 'Architecture',
    reflectionPrompt: 'Describe a significant architectural decision you owned or heavily influenced in the last 3 months.',
    questions: [
      { id: 't1_q1', text: 'I have designed systems that successfully scaled to handle increased load over the last 3 months.' },
      { id: 't1_q2', text: 'I have resolved complex integration issues between distinct subsystems within the last 3 months.' },
      { id: 't1_q3', text: 'I have made effective build-vs-buy decisions in the last 3 months.' },
      { id: 't1_q4', text: 'I have factored security and compliance into my system designs in the last 3 months.' },
      { id: 't1_q5', text: 'I have communicated technical vision through clear architectural diagrams over the last 3 months.' },
    ]
  },
  {
    id: 't2',
    name: 'Code Quality',
    reflectionPrompt: 'Reflect on how you improved the maintainability of the codebase in the last 3 months.',
    questions: [
      { id: 't2_q1', text: 'I have consistently written modular, reusable code within the last 3 months.' },
      { id: 't2_q2', text: 'I have left the codebase cleaner than I found it (Boy Scout rule) in the last 3 months.' },
      { id: 't2_q3', text: 'I have provided thorough, rigorous code reviews to peers over the last 3 months.' },
      { id: 't2_q4', text: 'I have adhered strictly to established linting and style guidelines in the last 3 months.' },
      { id: 't2_q5', text: 'I have refactored risky legacy code without breaking functionality within the last 3 months.' },
    ]
  },
  {
    id: 't3',
    name: 'Testing',
    reflectionPrompt: 'Detail a time a test you wrote prevented a critical regression in the last 3 months.',
    questions: [
      { id: 't3_q1', text: 'I have maintained high test coverage on all my new features over the last 3 months.' },
      { id: 't3_q2', text: 'I have written effective integration or end-to-end tests within the last 3 months.' },
      { id: 't3_q3', text: 'I have actively diagnosed and fixed flaky tests in the CI pipeline in the last 3 months.' },
      { id: 't3_q4', text: 'I have used test-driven development methodologies where appropriate over the last 3 months.' },
      { id: 't3_q5', text: 'I have anticipated edge cases and written tests to cover them within the last 3 months.' },
    ]
  },
  {
    id: 't4',
    name: 'Operational Excellence',
    reflectionPrompt: 'Reflect on an incident you mitigated or a monitoring gap you closed in the last 3 months.',
    questions: [
      { id: 't4_q1', text: 'I have effectively utilized monitoring and logging to debug issues within the last 3 months.' },
      { id: 't4_q2', text: 'I have responded to and mitigated production incidents calmly over the last 3 months.' },
      { id: 't4_q3', text: 'I have added proactive alerts to prevent silent failures in the last 3 months.' },
      { id: 't4_q4', text: 'I have automated repetitive operational tasks within the last 3 months.' },
      { id: 't4_q5', text: 'I have written comprehensive post-mortems or runbooks after incidents over the last 3 months.' },
    ]
  },
  {
    id: 't5',
    name: 'Domain Expertise',
    reflectionPrompt: 'Explain how you deepened your specific technical or product domain knowledge in the last 3 months.',
    questions: [
      { id: 't5_q1', text: 'I have acted as the primary technical subject matter expert for a feature within the last 3 months.' },
      { id: 't5_q2', text: 'I have successfully onboarded new engineers into my product area over the last 3 months.' },
      { id: 't5_q3', text: 'I have stayed up-to-date with the latest frameworks and language features in the last 3 months.' },
      { id: 't5_q4', text: 'I have rapidly ramped up on unfamiliar parts of the codebase when needed within the last 3 months.' },
      { id: 't5_q5', text: 'I have understood the nuances of the business domain well enough to push back on bad product requirements in the last 3 months.' },
    ]
  }
];
