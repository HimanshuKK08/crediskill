export const dummyUserData = {
  username: 'johndoe',
  name: 'John Doe',
  bio: 'Full-stack developer passionate about React and Node.js. Always learning, always building.',
  profilePhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  links: {
    email: 'john.doe@example.com',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    portfolio: 'https://johndoe.dev'
  },
  skills: [
    { id: 1, name: 'JavaScript', level: 'Advanced', score: 88, lastTested: '2025-01-15' },
    { id: 2, name: 'React', level: 'Advanced', score: 92, lastTested: '2025-01-10' },
    { id: 3, name: 'Node.js', level: 'Intermediate', score: 75, lastTested: '2025-01-05' },
    { id: 4, name: 'Python', level: 'Beginner', score: 45, lastTested: '2024-12-20' },
  ],
  projects: [
    {
      id: 1,
      name: 'E-Commerce Platform',
      depthScore: 85,
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      description: 'Full-featured online store with payment integration and admin dashboard.'
    },
    {
      id: 2,
      name: 'Task Management App',
      depthScore: 78,
      techStack: ['React', 'Firebase', 'Tailwind'],
      description: 'Collaborative task tracker with real-time updates and team features.'
    },
    {
      id: 3,
      name: 'Weather Dashboard',
      depthScore: 62,
      techStack: ['JavaScript', 'OpenWeather API', 'Chart.js'],
      description: 'Interactive weather visualization with historical data and forecasts.'
    }
  ],
  growthData: [
    { date: '2024-11', avgScore: 55 },
    { date: '2024-12', avgScore: 68 },
    { date: '2025-01', avgScore: 75 }
  ]
};
