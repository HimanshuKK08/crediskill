import { getScoreColor } from '../../utils/scoreUtils';
import { FaGithub } from 'react-icons/fa'
const ProjectCard = ({ project }) => {
  // DUMMY DATA - Replace this with actual API data later
  // This simulates what the new schema structure will look like
  const dummyTechStack = [
    { name: 'React', source: 'detected' },
    { name: 'Node.js', source: 'detected' },
    { name: 'MongoDB', source: 'manual' },
    { name: 'Tailwind', source: 'detected' },
    { name: 'Redux', source: 'manual' }
  ];

  // Helper to get chip styling based on source
  const getChipStyle = (source) => {
    if (source === 'detected') {
      return 'bg-blue-100 text-blue-700';
    }
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-900">{project.name}</h4>
        
        {/* GitHub Link - using dummy URL for now */}
        <a 
          href={project.githubURL} 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-3 py-1.5 items-center gap-2 flex bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full font-medium transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <FaGithub size={15} color="#000000" />GitHub
        </a>
      </div>
       <p className="text-sm text-gray-600 mb-4">{project.description}</p>
      {/* Using dummy data for now - will use project.techStack when backend is ready */}
      <div className="flex flex-wrap gap-2 mb-3">
        {project.techStack.map((tech, i) => (
          <span 
            key={i} 
            className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${getChipStyle(tech.source)}`}
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;