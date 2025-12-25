import { Mail, Github, Linkedin, Globe } from 'lucide-react';

const Sidebar = ({ userData }) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 flex flex-col items-center sticky top-0 h-screen overflow-y-auto">
      <img
        src={userData.profilePhoto}
        alt={userData.name}
        className="w-32 h-32 rounded-full mb-4 border-4 border-blue-100"
      />
      
      <h2 className="text-2xl font-bold text-gray-900 text-center">{userData.name}</h2>
      <p className="text-sm text-gray-500 mb-6">@{userData.username}</p>
      
      <div className="w-full space-y-3">
        {userData.links.email && (
          <a href={`mailto:${userData.links.email}`} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <Mail size={20} />
            <span className="text-sm truncate">{userData.links.email}</span>
          </a>
        )}
        
        {userData.links.github && (
          <a href={userData.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <Github size={20} />
            <span className="text-sm">GitHub</span>
          </a>
        )}
        
        {userData.links.linkedin && (
          <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <Linkedin size={20} />
            <span className="text-sm">LinkedIn</span>
          </a>
        )}
        
        {userData.links.portfolio && (
          <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
            <Globe size={20} />
            <span className="text-sm">Portfolio</span>
          </a>
        )}
      </div>
    </div>
  );
};
export default Sidebar