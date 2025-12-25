import { getScoreColor, getScoreBgColor } from '../../utils/scoreUtils';


const SkillCard = ({ skill }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-900">{skill.name}</h4>
        <span className={`text-3xl font-bold ${getScoreColor(skill.score)}`}>{skill.score}</span>
      </div>
      
      <div className="mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${skill.score >= 71 ? 'bg-green-600' : skill.score >= 41 ? 'bg-yellow-600' : 'bg-red-600'}`}
            style={{ width: `${skill.score}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className={`px-2 py-1 rounded ${getScoreBgColor(skill.score)} ${getScoreColor(skill.score)} font-medium`}>
          {skill.level}
        </span>
        <span className="text-gray-500">Last tested: {skill.lastTested}</span>
      </div>
    </div>
  );
};

export default SkillCard;