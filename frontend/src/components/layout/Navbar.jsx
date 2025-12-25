import { Edit2 } from 'lucide-react';
import { scrollToSection } from '../../utils/scrollUtils';

const Navbar = ({ isOwner, onEditProfile }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <button onClick={() => scrollToSection('growth')} className="text-gray-700 hover:text-blue-600 font-medium transition">
            Growth
          </button>
          <button onClick={() => scrollToSection('skills')} className="text-gray-700 hover:text-blue-600 font-medium transition">
            Skills
          </button>
          <button onClick={() => scrollToSection('projects')} className="text-gray-700 hover:text-blue-600 font-medium transition">
            Projects
          </button>
        </div>
        
        {isOwner && (
          <button
            onClick={onEditProfile}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Edit2 size={16} />
            Edit Profile
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;