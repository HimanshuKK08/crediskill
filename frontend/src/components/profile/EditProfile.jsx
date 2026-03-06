import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { FaSearch } from "react-icons/fa";

const EditProfile = ({ userData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...userData });
  const [newSkill, setNewSkill] = useState("");
  const [skillArray, setskillArray] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    githubURL: "",
    description: "",
  });

  // Autocomplete states
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const [detectedTech, setDetectedTech] = useState([]);
  const [temppskill, setTempPSkill] = useState("");

  // New state for tracking which project is being edited
  const [editingProjectId, setEditingProjectId] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/skill", {
          method: "POST",
        });
        const data = await res.json();
        setskillArray(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);
  // Filter skills based on input (case-insensitive)
  useEffect(() => {
    if (newSkill.trim() === "") {
      setFilteredSkills([]);
      setShowDropdown(false);
      return;
    }

    const filtered = skillArray.filter((skill) =>
      skill.toLowerCase().includes(newSkill.toLowerCase()),
    );

    setFilteredSkills(filtered);
    setShowDropdown(filtered.length > 0);
    setSelectedIndex(-1);
  }, [newSkill, skillArray]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle skill selection from dropdown
  const handleSelectSkill = (skill) => {
    setNewSkill(skill);
    setShowDropdown(false);
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showDropdown) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSkills.length - 1 ? prev + 1 : prev,
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && filteredSkills[selectedIndex]) {
          handleSelectSkill(filteredSkills[selectedIndex]);
        } else if (filteredSkills.length === 1) {
          handleSelectSkill(filteredSkills[0]);
        }
        break;

      case "Escape":
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;

      default:
        break;
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLinkChange = (linkType, value) => {
    setFormData((prev) => ({
      ...prev,
      links: { ...prev.links, [linkType]: value },
    }));
  };

  const addSkill = () => {
    // Check if entered skill exists in skillArray (case-insensitive)
    const exactMatch = skillArray.find(
      (skill) => skill.toLowerCase() === newSkill.toLowerCase(),
    );

    if (exactMatch) {
      const skill = {
        name: exactMatch,
        level: "Beginner",
        score: 0,
        lastTested: null,
      };
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setNewSkill("");
    } else {
      alert("Please select a valid skill from the list");
    }
  };

  const removeSkill = (id) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s._id !== id),
    }));
  };

  const analyzeProject = () => {
    const projectDetails = async () => {
      const data = await fetch("/api/projects/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          githubUrl: newProject.githubURL,
        }),
      });
      const result = await data.json();
      setDetectedTech(result.techStack);
    }
    projectDetails();
  };

  const addProject = () => {
    if (editingProjectId) {
      // Update existing project in formData.projects
      setFormData((prev) => ({
        ...prev,
        projects: prev.projects.map((p) =>
          p._id === editingProjectId
            ? {
                ...p,
                name: newProject.name,
                githubURL: newProject.githubURL,
                description: newProject.description,
                techStack: detectedTech,
              }
            : p
        ),
      }));
      setEditingProjectId(null);
    } else {
      // Create new project (existing behaviour)
      const project = {
        name: newProject.name,
        githubURL: newProject.githubURL,
        description: newProject.description,
        techStack: detectedTech,
      };
      setFormData((prev) => ({
        ...prev,
        projects: [...prev.projects, project],
      }));
    }

    setNewProject({
      name: "",
      githubURL: "",
      description: "",
    });
    setDetectedTech([]);
  };

  const addManualStack = () => {
    if (temppskill != "" && newProject.name != "" && newProject.githubURL != "") {
      setDetectedTech(prev => [
        ...prev,
        { name: temppskill, source: "manual" }
      ]);
      setTempPSkill("");
    } else {
      alert("Please Enter A Vaild Skill and Project First");
    }
  };

  // 1. Delete tech stack item by name (since items have no _id)
  const deleteTech = (name) => {
    setDetectedTech((prev) => prev.filter((tech) => tech.name !== name));
  };

  // 2. Edit project: load project data into form fields and set editingProjectId
  const editProject = (project) => {
    setNewProject({
      name: project.name,
      githubURL: project.githubURL,
      description: project.description,
    });
    setDetectedTech(project.techStack || []);
    setEditingProjectId(project._id);
  };

  // 3. Fixed removeProject: filter using _id instead of id
  const removeProject = (id) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p._id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(formData)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Profile Info */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo URL
                </label>
                <input
                  type="text"
                  value={formData.profilePhoto}
                  onChange={(e) => handleChange("profilePhoto", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* External Links */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">External Links</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.links.email}
                  onChange={(e) => handleLinkChange("email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub
                </label>
                <input
                  type="url"
                  value={formData.links.github}
                  onChange={(e) => handleLinkChange("github", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.links.linkedin}
                  onChange={(e) => handleLinkChange("linkedin", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio
                </label>
                <input
                  type="url"
                  value={formData.links.portfolio}
                  onChange={(e) =>
                    handleLinkChange("portfolio", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Skills Management */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Skills Management</h2>

            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() =>
                    newSkill && setShowDropdown(filteredSkills.length > 0)
                  }
                  placeholder="Skill name (e.g., JavaScript)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoComplete="off"
                />

                {/* Dropdown */}
                {showDropdown && filteredSkills.length > 0 && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                  >
                    {filteredSkills.map((skill, index) => (
                      <div
                        key={skill}
                        onClick={() => handleSelectSkill(skill)}
                        className={`px-4 py-2 cursor-pointer transition-colors ${
                          index === selectedIndex
                            ? "bg-blue-100 text-blue-900"
                            : "hover:bg-gray-100 text-gray-900"
                        }`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}

                {/* No results message */}
                {newSkill && filteredSkills.length === 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-red-200 rounded-lg shadow-lg p-3 text-sm text-red-600">
                    No matching skills found
                  </div>
                )}
              </div>
              <button
                onClick={addSkill}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={16} />
                Add Skill
              </button>
            </div>

            <div className="space-y-2">
              {formData.skills.map((skill) => (
                <div
                  key={skill._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">{skill.name}</span>
                  <button
                    onClick={() => removeSkill(skill._id)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Management */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Projects Management</h2>

            <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-lg">
              <input
                type="text"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Project name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                type="text"
                value={newProject.githubURL}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev,
                    githubURL: e.target.value,
                  }))
                }
                placeholder="Enter Github URL for the Project"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <textarea
                value={newProject.description}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Project description"
                rows="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <div className="flex w-full justify-between">
                <button
                onClick={analyzeProject}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaSearch/>
                Analyze Project
              </button>
              <button
                onClick={addProject}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Project
              </button>
              </div>
              {/* <div>{detectedTech}</div> */}
            </div>

            <div className="bg-gray-50 p-5">
              <h1 className="font-semibold text-center w-full text-xl">
                {newProject.name}
              </h1>
              <br />
              <div className="space-y-2 grid grid-cols-2 gap-2">
                {detectedTech.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-3 bg-gray-200 rounded-lg"
                  >
                    <span className="font-medium">{skill.name}</span>
                    <button
                      onClick={() => deleteTech(skill.name)}
                      className="text-red-600 hover:text-red-700 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              {(newProject.githubURL=="") 
                ?
                  // console.log(newProject.githubURL)
                  // <h1 className=" text-xl">Please Enter the Project First ....</h1>
                  <p></p>                  
                :
                <div className="flex bg-gray-200 w-1/2  justify-between px-4 mt-3 rounded-xl h-12 text-center py-2">
                  <input
                    type="text"
                    value={temppskill}
                    onChange={(e) => setTempPSkill(e.target.value)}
                    placeholder="Add Any Other SKill"
                    className="focus: outline-none"
                  />
                  <button
                  onClick={addManualStack}
                  className="bg-blue-600 p-2 text-white flex items-center justify-center rounded-2xl w-10 px-8"
                  >
                    Add
                  </button>
                </div>
              }
              </div>
            <h1 className="text-center font-bold text-2xl mt-2">Previous Projects </h1>

            {/* Existing Projects List */}
            <div className="space-y-2 mt-4">
              {formData.projects.map((project) => (
                <div
                  key={project._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">{project.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editProject(project)}
                      className="text-blue-600 hover:text-blue-700 transition px-3 py-1 border border-blue-600 rounded-lg text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeProject(project._id)}
                      className="text-red-600 hover:text-red-700 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default EditProfile;