import { getScoreColor } from '../../utils/scoreUtils';

const ProjectCard = ({ project }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-900">{project.name}</h4>
        <span className={`text-2xl font-bold ${getScoreColor(project.depthScore)}`}>{project.depthScore}</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {project.techStack.map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
            {tech}
          </span>
        ))}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${project.depthScore >= 71 ? 'bg-green-600' : project.depthScore >= 41 ? 'bg-yellow-600' : 'bg-red-600'}`}
          style={{ width: `${project.depthScore}%` }}
          ></div>
      </div>
    </div>
  );
};
export default ProjectCard;