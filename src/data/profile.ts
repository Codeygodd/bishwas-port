/**
 * Single source of truth for every piece of text on the site.
 * Edit this file and the 3D room, the panels, the AI assistant, the SEO text
 * and the classic page all update together.
 *
 * Sources: CV (PDF), LinkedIn profile + certificates (screenshots), GitHub (pinned repos), old website contact section.
 */

export interface Fact { icon: string; text: string }
export interface SkillGroup { title: string; items: string[] }
export interface Project { title: string; icon: string; period: string; summary: string; points: string[]; tech: string[]; live?: string; repo?: string }
export interface Certificate { title: string; issuer: string; date: string; skills?: string[]; desc?: string; credentialId?: string; link?: string }
export interface Achievement { title: string; org: string; date: string }
export interface Job { role: string; org: string; place: string; period: string; points: string[] }
export interface Education { school: string; degree: string; place: string; period: string }
export interface PostSection { h: string; p: string }
export interface Post { title: string; date: string; read: string; summary: string; tag: string; icon: string; tldr: string; sections: PostSection[]; takeaway: string }
export type IdeaStage = 'IDEA' | 'PLANNING' | 'BUILDING' | 'SHIPPED'
export interface Idea { title: string; short: string; stage: IdeaStage; icon: string; tagline: string; why: string; steps: string[]; tech: string[] }
export interface Social { id: string; label: string; url: string; handle: string }

export const profile = {
  name: 'Bishwas Pandey',
  role: 'AI & ML Engineer',
  headline: 'AI & ML Engineer | Data Science | Full-Stack Dev | Turning Data into Products',
  location: 'Kathmandu, Nepal',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bishwaspandey.vercel.app',
  tagline: 'AI & ML engineer from Kathmandu with a data science and full-stack foundation. I build the model and ship the product around it.',
  /** LinkedIn "About" section, kept in his own words. */
  intro: {
    lead: "I don't spread thin. I go deep where it counts and stay sharp everywhere else.",
    focus: [
      { label: 'AI/ML', text: 'my core, my edge, where I build real systems, not just notebooks.' },
      { label: 'Data Science', text: 'near second nature. I think in data before I think in code.' },
      { label: 'Full-Stack & Backend', text: 'the foundation everything else is built on. Still strong, still reliable.' },
      { label: 'Cybersecurity', text: 'the one gap. Not faking it, not there yet.' },
    ],
    closing: 'Most people specialize and call the rest "familiar." I went deep and stayed broad, so I don\'t just build the model, I ship the product around it.',
    motto: 'Master one thing. Stay dangerous in the rest.',
  },
  summary:
    'AI/ML engineer with a data science and full-stack foundation and 2+ years of experience designing, building and shipping scalable web applications end to end. ' +
    'Strong in data structures, algorithms and system design, with hands-on experience across React.js, Node.js, REST APIs, SQL, Python, machine learning and agentic AI. ' +
    'Backed by certifications from HackerRank, Anthropic, IBM and Kaggle, and by regular LeetCode and Kaggle practice. ' +
    'Track record of leading technical initiatives, collaborating cross-functionally and delivering under real client and academic deadlines.',
  seeking: 'Looking for roles where AI/ML leads, but the work needs someone who can touch data, code, and architecture without blinking.',
  topSkills: ['Python', 'Machine Learning', 'Agentic AI Development', 'Data Engineering', 'React.js'],
  facts: [
    { icon: '📍', text: 'Kathmandu, Nepal' },
    { icon: '🧠', text: 'AI/ML · Data Science · Full-Stack' },
    { icon: '🎓', text: 'B.Sc. CSIT, Tribhuvan University (IOST)' },
    { icon: '🏆', text: '12 certifications · 1st place, CodeCraft' },
    { icon: '⚔️', text: 'Solves LeetCode problems and Kaggle competitions regularly' },
  ] as Fact[],
  contact: {
    email: 'pandeybiswas1@gmail.com',
    phone: '+977-9767550939',
    linkedin: 'https://www.linkedin.com/in/bishwas-pandey-5ab822316/',
    linkedinLabel: 'linkedin.com/in/bishwas-pandey-5ab822316',
    website: 'https://bishwaspandey.vercel.app',
    websiteLabel: 'bishwaspandey.vercel.app',
    github: 'https://github.com/Codeygodd',
    kaggle: 'https://www.kaggle.com/bishwaspandey',
    leetcode: 'https://leetcode.com/u/BishwastheGr8/',
    huggingface: 'https://huggingface.co/bishwasthegr8',
    instagram: 'https://www.instagram.com/bishwasthegr8',
  },
  socials: [
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/bishwas-pandey-5ab822316/', handle: 'bishwas-pandey' },
    { id: 'github', label: 'GitHub', url: 'https://github.com/Codeygodd', handle: 'Codeygodd' },
    { id: 'kaggle', label: 'Kaggle', url: 'https://www.kaggle.com/bishwaspandey', handle: 'bishwaspandey' },
    { id: 'leetcode', label: 'LeetCode', url: 'https://leetcode.com/u/BishwastheGr8/', handle: 'BishwastheGr8' },
    { id: 'huggingface', label: 'Hugging Face', url: 'https://huggingface.co/bishwasthegr8', handle: 'bishwasthegr8' },
    { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/bishwasthegr8', handle: 'bishwasthegr8' },
  ] as Social[],
  cvFile: '/Bishwas_Pandey_CV.pdf',
  skillGroups: [
    { title: 'AI / ML (core)', items: ['Machine Learning', 'Agentic AI Development', 'Feature Engineering', 'Neural Networks', 'Image Processing', 'Model Context Protocol (MCP)', 'Anthropic Claude'] },
    { title: 'Data Science & Engineering', items: ['Data Engineering', 'Data Analytics', 'Data Visualization', 'Pandas', 'Advanced SQL (window functions, CTEs)'] },
    { title: 'Full-Stack & Backend', items: ['React.js', 'Node.js', 'REST API Design & Integration', 'Frontend/Backend Architecture', 'UI/UX', 'TypeScript'] },
    { title: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'] },
    { title: 'Tools & Platforms', items: ['Git/GitHub', 'Database Management', 'CI/CD Fundamentals', 'Hugging Face', 'Kaggle'] },
    { title: 'Core CS', items: ['Data Structures & Algorithms', 'System Design Fundamentals', 'Agile/Project Management'] },
    { title: 'Other', items: ['Robotics & IoT (Arduino IDE)', 'Cybersecurity (still learning, honest about the gap)'] },
  ] as SkillGroup[],
  practice: {
    title: 'Competitive coding & data science',
    text: 'I solve LeetCode problems and take part in Kaggle questions and competitions regularly to keep my algorithms, SQL and ML skills sharp. I also publish on Hugging Face.',
  },
  projects: [
    {
      title: 'Smit Gifts — Company Website',
      icon: '🎁',
      period: 'GitHub',
      summary: 'An updated, neat and clean website for Smit Gifts Pvt. Ltd.',
      points: [
        'Rebuilt the company website as a clean, modern TypeScript project.',
        'Set up with Tailwind CSS and a shadcn/ui component system, and deployed on Vercel.',
      ],
      tech: ['TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Vercel'],
      live: 'https://smit-gift-react-99d4.vercel.app',
      repo: 'https://github.com/Codeygodd/smit-gift',
    },
    {
      title: 'Smit Gifts — Full-Stack React App',
      icon: '⚙️',
      period: 'GitHub',
      summary: 'A full-stack version of the Smit Gifts site using complex modules for optimization and the entire backend.',
      points: [
        'Full-stack TypeScript app with a client, server and shared code layout.',
        'Custom backend with an ORM-based database layer (Drizzle) and optimized modules.',
      ],
      tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Drizzle ORM'],
      repo: 'https://github.com/Codeygodd/smit-gift-react',
    },
    {
      title: 'Full-Stack Web Applications',
      icon: '🌐',
      period: '2024 – Present',
      summary: 'Multiple end-to-end web applications, owning the full lifecycle from requirements to production.',
      points: [
        'Designed and deployed multiple end-to-end web applications, owning the full development lifecycle from requirements to production.',
        'Integrated third-party REST APIs and built custom backend services, improving response times and maintainability.',
      ],
      tech: ['JavaScript', 'React', 'Node.js', 'REST APIs'],
    },
    {
      title: 'Data Analytics Pipeline',
      icon: '📊',
      period: '2025',
      summary: 'An end-to-end pipeline that extracts, cleans and visualizes structured datasets.',
      points: [
        'Built an end-to-end data pipeline using Python and SQL to extract, clean, and visualize structured datasets.',
        'Applied advanced SQL techniques (window functions, CTEs), validated by the HackerRank Advanced SQL certification.',
      ],
      tech: ['Python', 'SQL', 'Data Science'],
    },
    {
      title: 'Virtual Mouse',
      icon: '🖱️',
      period: 'GitHub',
      summary: 'A virtual mouse: control the cursor without touching a physical mouse.',
      points: [
        'Hands-free pointer control, an applied computer-vision / human-computer-interaction build.',
        'Built to explore how everyday input devices can be replaced by software.',
      ],
      tech: ['Python', 'Computer Vision', 'HCI'],
      repo: 'https://github.com/Codeygodd?tab=repositories',
    },
    {
      title: 'Basico',
      icon: '🧩',
      period: 'GitHub',
      summary: 'Basico: a hands-on build from my GitHub, kept simple on purpose.',
      points: [
        'One of my practice builds, focused on getting the fundamentals right before adding complexity.',
        'Full source is on my GitHub profile.',
      ],
      tech: ['Git', 'GitHub', 'Fundamentals'],
      repo: 'https://github.com/Codeygodd?tab=repositories',
    },
  ] as Project[],
  /** The 12 licenses & certifications from LinkedIn, newest first. */
  certificates: [
    { title: 'Software Engineer', issuer: 'HackerRank', date: 'Jul 2026', credentialId: 'D16159602ED3', skills: ['REST APIs', 'Databases'], desc: 'HackerRank Certified Software Engineer role certification.' },
    { title: 'Career Development Session Certification', issuer: 'Code for Change', date: 'Jun 2026', skills: ['Community Outreach', 'Outsourcing'], desc: 'Strengthened essential professional skills, from effective communication and teamwork to resume building, interview techniques and leadership.' },
    { title: 'Project Management Fundamentals', issuer: 'Code for Change', date: 'Apr 2026', skills: ['Team Management', 'Leadership'], desc: 'Certificate of Participation from Code for Change Kathmandu for a session on Project Management Fundamentals covering project planning and teamwork.' },
    { title: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic', date: 'Apr 2026', skills: ['Sampling', 'Manufacturing Scale-up'], desc: 'Advanced course on the Model Context Protocol (MCP).' },
    { title: 'Claude 101', issuer: 'Claude (Anthropic)', date: 'Apr 2026', skills: ['Anthropic Claude', 'AI for Project Management'], desc: 'Foundations of working with Claude.' },
    { title: 'Artificial Intelligence Fundamentals', issuer: 'IBM', date: 'Apr 2026', skills: ['Neural Networks', 'Image Processing'], desc: 'IBM SkillsBuild AI fundamentals.' },
    { title: 'Feature Engineering Certification', issuer: 'Kaggle', date: 'Jan 2026', skills: ['Feature Manipulation', 'Categorical Encoding'], desc: 'Mastered feature creation, categorical encoding strategies, PCA and feature selection, time-series techniques, outlier handling and multicollinearity management.' },
    { title: 'Data Visualization Certification', issuer: 'Kaggle', date: 'Jan 2026', skills: ['MATLAB', 'Data Modeling'], desc: 'Data Visualization Specialist certification from Kaggle Learn: turning complex data into compelling visual stories.' },
    { title: 'Advanced SQL Certification', issuer: 'HackerRank', date: 'Dec 2025', skills: ['Data Manipulation', 'Advanced Subqueries'], desc: 'HackerRank SQL (Advanced) skill certification.' },
    { title: 'Pandas Certification', issuer: 'Kaggle', date: 'Dec 2025', skills: ['Python', 'Data Entry'], desc: 'Strengthened skills in data manipulation, cleaning and analysis with Python.' },
    { title: 'Python Certification', issuer: 'Kaggle', date: 'Nov 2025', skills: ['Python', 'Back-End Web Development'], desc: 'Kaggle Python course completion: Python basics, visualization and DFD.' },
    { title: '7 Days Robotics Training', issuer: 'Engineers Vlogs', date: 'Mar 2025', skills: ['Arduino IDE', 'Robotics'], desc: 'Hands-on experience in robotics basics, sensors and micro-controller projects with the Arduino IDE.' },
  ] as Certificate[],
  achievements: [
    { title: '1st Place – CodeCraft: School Coding Challenge', org: 'National School of Sciences', date: 'Feb 2025' },
  ] as Achievement[],
  experience: [
    {
      role: 'College Representative',
      org: 'Code for Change',
      place: 'Kathmandu, Nepal',
      period: 'Feb 2026 – Present',
      points: [
        'Represent the organization at Tribhuvan University (IOST), driving awareness of technology-for-social-good initiatives among 100+ students.',
        'Coordinate cross-functional projects and workshops bridging technical skill-building with real-world community impact.',
        'Facilitate communication between student developers and stakeholders, improving delivery timelines.',
      ],
    },
    {
      role: 'Full-Stack Developer (Freelance)',
      org: 'Upwork & Independent Projects',
      place: 'Kathmandu, Nepal',
      period: 'Mar 2024 – Present',
      points: [
        'Designed and developed full-stack web applications using React.js and Node.js, ensuring scalability and optimal user experience.',
        'Architected and integrated RESTful APIs, enabling seamless data flow between frontend and backend systems.',
        'Owned the complete project lifecycle from requirements gathering and system design to deployment and post-launch iteration.',
        'Collaborated directly with clients to deliver solutions on time and within scope, earning repeat business.',
      ],
    },
  ] as Job[],
  education: [
    { school: 'Institute of Science and Technology (IOST), Tribhuvan University', degree: 'B.Sc. Computer Science and Information Technology (CSIT)', place: 'Kathmandu, Nepal', period: 'Dec 2025 – Dec 2030' },
    { school: 'National School of Sciences', degree: 'Higher Secondary Education, Computer Science', place: 'Kathmandu, Nepal', period: 'Sep 2021 – Apr 2025' },
  ] as Education[],
  // Short explainers written for the site. Replace or extend with your own posts any time.
  blog: [
    {
      title: 'Can AI Be Dangerous? The Real Risks', date: 'Oct 2026', read: '3 min read', tag: 'AI Safety', icon: '⚠️',
      summary: 'Where AI can actually cause harm, what is hype, and how we reduce the risk.',
      tldr: `No current AI "wants" to hurt anyone. The real danger is people misusing it, systems making confident mistakes in high-stakes places, and powerful goals that are specified badly.`,
      sections: [
        { h: '1. Misuse by people', p: `Deepfakes, scam calls in a cloned voice, automated phishing and cheaper cyberattacks. The tool is neutral; the user is the risk.` },
        { h: '2. Confident mistakes', p: `Models can sound sure while being wrong or biased. In medicine, hiring, credit or law, one wrong output can change a life, so a human must stay in the loop.` },
        { h: '3. Autonomy without limits', p: `Agents that can act (send money, run code, control machines) need hard limits: least privilege, approvals for risky actions, logs and a kill switch.` },
        { h: '4. Misaligned goals', p: `If you optimize the wrong objective, a very capable system can chase it in ways nobody intended. This is why alignment research, testing and red-teaming matter.` },
        { h: 'What helps', p: `Safety testing before release, human oversight, transparency, sensible regulation and engineers who treat safety as part of the build, not an afterthought.` },
      ],
      takeaway: `Be neither scared nor naive: the danger is real but manageable, and it mostly depends on how we build and use AI.`,
    },
    {
      title: 'The Math Behind Every LLM', date: 'Oct 2026', read: '4 min read', tag: 'Deep Learning', icon: '🧠',
      summary: 'The transformer recipe shared by GPT-style models, Llama and DeepSeek, in plain words.',
      tldr: `Chat models predict the next token. They do it with a stack of transformer layers whose core operation is attention, trained by gradient descent on huge amounts of text.`,
      sections: [
        { h: 'Step 1: Tokens and embeddings', p: `Text is cut into tokens (word pieces) and each token becomes a vector of numbers, so meaning can be computed with.` },
        { h: 'Step 2: Attention', p: `Each token looks at the others and decides what matters: Attention(Q,K,V) = softmax(QKᵀ / √d) · V. This is how "it" finds the noun it refers to.` },
        { h: 'Step 3: Feed-forward layers', p: `After attention, a small neural network transforms each token. Attention plus feed-forward, repeated dozens of times, is the whole model.` },
        { h: 'Step 4: Predict and learn', p: `The last layer gives probabilities for the next token. Training compares that with the real next token and uses backpropagation to nudge billions of weights. Later, fine-tuning and human feedback (RLHF) make it helpful.` },
        { h: 'GPT, Claude, DeepSeek', p: `GPT-style and open models like Llama and DeepSeek are published as decoder-only transformers. DeepSeek adds Mixture-of-Experts (only some "experts" run per token) and Multi-head Latent Attention to cut cost. Claude's exact architecture is not public, but it is built in the same broad transformer family.` },
      ],
      takeaway: `Different brands, same core idea: tokens, attention, a lot of data and a lot of compute. The differences are in scale, data, efficiency tricks and training.`,
    },
    {
      title: 'Run an LLM on Your Own Computer', date: 'Oct 2026', read: '3 min read', tag: 'Local AI', icon: '💻',
      summary: 'Why running a model locally is worth it, and how to start in ten minutes.',
      tldr: `Tools like Ollama, LM Studio and llama.cpp let you run open models on your laptop: private, offline and free per message.`,
      sections: [
        { h: 'Why go local', p: `Privacy (your data never leaves the machine), no per-token bill, works offline and you can customize the model for your own work.` },
        { h: 'How it fits', p: `Quantization stores weights in 4 or 8 bits instead of 16, shrinking a model a lot. As a rough guide, a 7B model at 4-bit needs around 4 to 5 GB of memory.` },
        { h: 'Get started', p: `Install Ollama or LM Studio, pull a small model (for example a Llama, Qwen or DeepSeek distill), and chat. Then connect it to your editor or your own documents.` },
        { h: 'Honest trade-offs', p: `Small local models are weaker than the biggest cloud models and need decent RAM or a GPU. Use local for private, repetitive or offline work, and cloud for the hardest tasks.` },
      ],
      takeaway: `A local model is a personal AI workshop: private, cheap and yours to tinker with.`,
    },
    {
      title: 'Machine Learning in 2 Minutes', date: 'Oct 2026', read: '2 min read', tag: 'ML Basics', icon: '🤖',
      summary: 'What machine learning really is, with the four ideas every beginner needs.',
      tldr: `Instead of writing rules by hand, you show a model examples and it learns the pattern.`,
      sections: [
        { h: 'Three flavours', p: `Supervised (learn from labelled examples), unsupervised (find structure without labels) and reinforcement learning (learn from rewards).` },
        { h: 'Train, validate, test', p: `Split your data. Learn on one part, tune on another and judge honestly on a part the model never saw.` },
        { h: 'Overfitting', p: `A model that memorizes the training data fails on new data. Simpler models, more data and regularization help.` },
        { h: 'Features matter', p: `Good inputs often beat fancy models. Cleaning data and engineering features is most of the real work.` },
      ],
      takeaway: `Start with a simple baseline, measure honestly, then improve. That habit beats any algorithm.`,
    },
    {
      title: 'Model Context Protocol, Explained Simply', date: 'Oct 2026', read: '3 min read', tag: 'AI Agents', icon: '🔌',
      summary: 'MCP is the USB-C of AI: one standard way to plug tools and data into models.',
      tldr: `MCP is an open standard that lets AI apps connect to tools and data through one common interface instead of a custom integration for each.`,
      sections: [
        { h: 'The problem', p: `Every AI app needed its own connector for every tool, files, database or calendar. That does not scale.` },
        { h: 'The idea', p: `An MCP server exposes tools, resources and prompts. An MCP client inside the AI app talks to it in one standard way.` },
        { h: 'Why it matters', p: `Build a connector once and any compatible AI app can use it. It is the base for agents that can really do things, safely and with permission.` },
      ],
      takeaway: `If agents are the hands of AI, MCP is the standard socket they plug into.`,
    },
  ] as Post[],
  ideas: [
    {
      title: 'Really cool IoT projects', short: 'IoT builds', stage: 'IDEA', icon: '📡',
      tagline: 'Smart devices that sense, think and act.',
      why: 'IoT is where AI meets the real world: sensors in, decisions out.',
      steps: ['Pick three builds: plant monitor, air-quality station, gesture gadget', 'Prototype on ESP32 / Arduino with sensors', 'Stream data to a live dashboard', 'Add on-device ML (TinyML) for smart decisions'],
      tech: ['ESP32', 'Arduino', 'MQTT', 'TinyML'],
    },
    {
      title: 'A ChatGPT-style model inside a calculator', short: 'LLM in a calculator', stage: 'IDEA', icon: '🧮',
      tagline: 'A tiny language model living in a calculator.',
      why: 'An extreme efficiency challenge. Calculator chips have very little memory, so the plan starts with a tiny quantized model on an ESP32-class board in a calculator body.',
      steps: ['Build a calculator body with keypad and display', 'Run a tiny quantized model on the board (or offload to a local server)', 'Add a math-tutor mode that explains each step', 'Optimize memory and speed'],
      tech: ['TinyML', 'Quantization', 'llama.cpp', 'ESP32'],
    },
    {
      title: 'Build my own LLM', short: 'My own LLM', stage: 'PLANNING', icon: '🧬',
      tagline: 'A small language model trained from scratch.',
      why: 'The best way to understand LLMs is to build one: tokenizer, attention, training loop, then a model that knows me.',
      steps: ['Implement a tiny GPT from scratch', 'Train it on a small dataset', 'Fine-tune on my own writing and portfolio data (LoRA)', 'Serve it locally and plug it into this site\'s assistant'],
      tech: ['PyTorch', 'Transformers', 'LoRA', 'Hugging Face'],
    },
    {
      title: 'Projects that can help the government', short: 'GovTech', stage: 'IDEA', icon: '🏛️',
      tagline: 'Useful civic tech for Nepal.',
      why: 'Public services run on forms, queues and paperwork: perfect places for good software and AI.',
      steps: ['Find a real citizen pain point', 'Prototype a simple, accessible service', 'Support Nepali language and open data', 'Pilot it with real users and iterate'],
      tech: ['Next.js', 'Python', 'Open data', 'NLP'],
    },
    {
      title: 'Profitable product ideas', short: 'Profitable ideas', stage: 'PLANNING', icon: '💰',
      tagline: 'AI products people actually pay for.',
      why: 'Skills turn into impact when someone is willing to pay. I want to ship small products that solve a narrow problem well.',
      steps: ['Talk to users before building', 'Pick a narrow problem, such as automation for small businesses', 'Ship an MVP in weeks', 'Charge early and iterate'],
      tech: ['Full-stack', 'AI APIs', 'Automation'],
    },
    {
      title: 'Agentic AI assistant with MCP', short: 'MCP agent', stage: 'PLANNING', icon: '🛠️',
      tagline: 'An assistant that can use tools safely.',
      why: 'Following my MCP certifications: build an agent that connects to real tools with clear permissions.',
      steps: ['Design a small MCP server', 'Connect an assistant to it', 'Add permissions and logging'],
      tech: ['MCP', 'Claude', 'TypeScript'],
    },
    {
      title: 'Kaggle competitions and Hugging Face projects', short: 'Kaggle & HF', stage: 'BUILDING', icon: '🏆',
      tagline: 'Practice in public.',
      why: 'Regular competitions and published models keep my ML skills sharp and visible.',
      steps: ['Enter competitions regularly', 'Write up what I learn', 'Publish models on Hugging Face'],
      tech: ['Python', 'Kaggle', 'Hugging Face'],
    },
    {
      title: 'This 3D portfolio', short: '3D portfolio', stage: 'SHIPPED', icon: '🚀',
      tagline: 'You are standing in it.',
      why: 'A portfolio you can walk through, built with Next.js, TypeScript and Three.js.',
      steps: ['Designed the room', 'Built every section', 'Deployed on Vercel'],
      tech: ['Next.js', 'TypeScript', 'Three.js'],
    },
  ] as Idea[],
  /** Extra Q&A the assistant can use (also shown to the live AI). Add anything visitors ask about you. */
  faq: [
    { q: 'What is Bishwas best at?', a: 'AI/ML is his core: building real systems, not just notebooks. Data science comes close to second nature, and full-stack and backend are the solid foundation under everything.' },
    { q: 'What is his weak spot?', a: "Cybersecurity. He says it's the one gap: he's not faking it and not there yet, although he has covered the fundamentals." },
    { q: 'What roles is he looking for?', a: 'Roles where AI/ML leads, but the work needs someone who can touch data, code and architecture without blinking.' },
    { q: 'What is his motto?', a: '"Master one thing. Stay dangerous in the rest."' },
    { q: 'Is he available to hire or freelance?', a: 'He freelances full-stack work (Upwork and independent projects) and is open to AI/ML roles. The best way to start is the contact form or his email.' },
    { q: 'Where did he study?', a: 'He is pursuing a B.Sc. CSIT at the Institute of Science and Technology (IOST), Tribhuvan University, after higher secondary education in Computer Science at National School of Sciences.' },
  ],
};

export type Profile = typeof profile;
