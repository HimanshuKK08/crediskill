import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import GrowthChart from './GrowthChart';
import SkillCard from './SkillCard';
import ProjectCard from './ProjectCard';


const ProfileDashboard = ({ userData, isOwner, onEditProfile }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
      <Sidebar userData={userData} />
      
      <div className="flex-1">
        <Navbar isOwner={isOwner} onEditProfile={onEditProfile} />
        
        <main className="max-w-6xl mx-auto p-8 space-y-12">
          {userData.bio && (
            <section className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
            </section>
          )}
          
          <section id="growth">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Overall Growth</h2>
            <GrowthChart data={userData.growthData} />
          </section>
          
          <section id="skills">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Skills</h2>
            {userData.skills.length === 0 ? (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <p className="text-gray-500 mb-4">NO SKLLS ADDED YET!! <br/>Add skills you want to improve and track</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {userData.skills.map(skill => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            )}
          </section>
          
          <section id="projects">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Projects</h2>
            {userData.projects.length === 0 ? (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <p className="text-gray-500 mb-4">Showcase what you've built</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                  + Add Project
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {userData.projects.map((project,i) => (
                  <ProjectCard key={i} project={project} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfileDashboard
