export type PanelId =
  | 'about' | 'skills' | 'projects' | 'certs' | 'exp' | 'blog'
  | 'ideas' | 'contact' | 'cv' | 'ai' | 'time';

export interface OpenRequest { id: PanelId; arg?: number }

export const PANEL_META: Record<PanelId, { icon: string; title: string; sub: string }> = {
  about: { icon: '👤', title: 'About me', sub: 'Who is behind the lab' },
  skills: { icon: '🧩', title: 'Skills', sub: 'What I build with' },
  projects: { icon: '🛠', title: 'Projects', sub: 'Pulled off the bookshelf' },
  certs: { icon: '🏆', title: 'Certificates', sub: 'Awards and achievements' },
  exp: { icon: '💼', title: 'Experience & education', sub: 'Where I have worked and studied' },
  blog: { icon: '📝', title: 'Blog', sub: 'Notes pinned on the board' },
  ideas: { icon: '💡', title: 'Upcoming ideas', sub: 'What I am planning next' },
  contact: { icon: '✉️', title: 'Contact', sub: 'Send me a message' },
  cv: { icon: '📄', title: 'My CV', sub: 'View or download' },
  ai: { icon: '🤖', title: 'Ask my AI', sub: 'Ask anything about me' },
  time: { icon: '🕐', title: 'Kathmandu time', sub: 'Nepal Standard Time' },
};

export const MENU_ORDER: PanelId[] = ['about', 'skills', 'projects', 'certs', 'exp', 'blog', 'ideas', 'contact', 'cv', 'ai', 'time'];
