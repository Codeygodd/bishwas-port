import type { PanelId } from '@/lib/types';

export type Vec3 = [number, number, number];

export interface Station {
  /** camera position */ c: Vec3;
  /** look-at target */ l: Vec3;
  kicker: string;
  heading: string;
  text: string;
  name: string;
  hero?: boolean;
  buttons?: [PanelId, string][];
}

export const STATIONS: Station[] = [
  {
    c: [0, 5.8, 14.5], l: [0, 4.2, -3], kicker: 'Interactive 3D portfolio', heading: 'Bishwas Pandey',
    text: 'AI & ML engineer from Kathmandu with a data science and full-stack foundation. Step into my lab: every object in the room is a part of my portfolio. Scroll for the tour.',
    name: 'Overview', hero: true,
  },
  {
    c: [0.6, 4.5, 2.6], l: [0.5, 4, -4], kicker: 'Desk · About & AI', heading: 'Say hi to the toy me',
    text: 'The figure on the desk is me. The monitor is an AI assistant that can answer anything about me: my work, skills, certificates, GitHub projects and more.',
    buttons: [['about', '👤 About me'], ['ai', '🤖 Ask my AI']], name: 'Desk',
  },
  {
    c: [-4.4, 4.4, 4.4], l: [-6.5, 4.3, -6], kicker: 'Shelf · Skills, projects, trophy', heading: 'Everything has its place',
    text: 'Skill blocks on the first shelf, one big projects book on the second, and a trophy for certificates on the top. The briefcase on the floor holds my experience.',
    buttons: [['skills', '🧩 Skills'], ['projects', '🛠 Projects'], ['certs', '🏆 Certificates'], ['exp', '💼 Experience']], name: 'Shelf',
  },
  {
    c: [4.8, 5, 1.4], l: [7, 5.3, -6.4], kicker: 'Corkboard · Upcoming ideas', heading: "What I'm working on next",
    text: 'Sticky notes track every idea from Idea to Planning to Building to Shipped.',
    buttons: [['ideas', '💡 Upcoming ideas']], name: 'Corkboard',
  },
  {
    c: [3, 5, 0.4], l: [10, 5.2, -2.2], kicker: 'Board · Blog & clock', heading: 'Notes from the lab',
    text: 'Every blog post is pinned to the board as its own note, and the clock shows the time in Kathmandu.',
    buttons: [['blog', '📝 Blog'], ['time', '🕐 Kathmandu time']], name: 'Blog board',
  },
  {
    c: [-3.2, 4.7, 0.6], l: [-10, 4.5, -2.2], kicker: 'Window · CV & contact', heading: 'Say hello to the bird',
    text: 'The bird on the window sill carries your message to me. The framed page is my CV.',
    buttons: [['contact', '✉️ Contact me'], ['cv', '📄 View CV']], name: 'Window & CV',
  },
];
