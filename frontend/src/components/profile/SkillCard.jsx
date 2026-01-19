import { useNavigate } from 'react-router-dom';
import { getScoreColor, getScoreBgColor } from '../../utils/scoreUtils';
import { toast } from 'react-toastify';

const SkillCard = ({ skill }) => {
  const navigate = useNavigate();
  const takeTest = async () => {
    const res = await fetch("/api/test/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        skillName: skill.name
      })
    });
    const data = await res.json();
    if(data.success){
      navigate('/testStart', {
        state: {
          questions: data.questions,
          testId: data.testId,
          skillName: skill.name,
        }
      })
    }

  };

  const date = new Date(skill.lastTested);

  const notify = ()=>{
    toast.info('You can give test only once a week', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });
  }
  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const checkValidity = ()=>{
    if(skill.isTested){
      if(Date.now()-skill.lastTested >= (7 * 24 * 60 * 60 * 1000)){
        console.log("it is working");
        return true;
      }
      else{
        return false;
      }
    }
    return true;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-lg font-semibold text-gray-900">{skill.name}</h4>
      {(skill.isTested) ? (
        <span className={`text-2xl font-bold ${getScoreColor(skill.score)}`}>{skill.score}</span>
        
      ) : (
        <span className={`text-xl font-bold ${getScoreColor(skill.score)}`}>Not Tested Yet</span>
      )}
      </div>
      
      <div className="mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${skill.score >= 71 ? 'bg-green-600' : skill.score >= 41 ? 'bg-yellow-600' : 'bg-red-600'}`}
            style={{ width: `${skill.score}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-8 text-sm">
        {/* <span className={`px-2 py-1 rounded ${getScoreBgColor(skill.score)} ${getScoreColor(skill.score)} font-medium`}>
          {skill.level} */}
        {
          (skill.isTested) ?
            <span className="text-gray-500">Last tested: {formattedDate}</span>
            :
            <span className="text-gray-500">Please Get Your Skill Assessed</span>
        }
        {/* </span> */}
        {
          (checkValidity()) ?
            <button
                  onClick={() => takeTest()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Take Test
            </button>
          :
            <div>
              <button
                onClick={notify}

                className="px-6 py-2 bg-gray-300 text-white rounded-lg hover:bg-gray-500 transition"
              >
                  Take Test
              </button>
              {/* <h3>Can't Take Test before a week</h3> */}
            </div>
            

        }
      </div>
    </div>
  );
};

export default SkillCard;