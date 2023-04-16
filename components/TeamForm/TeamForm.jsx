import classNames from "@/utils/classNames";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function TeamForm() {
  const router = useRouter();

  const [teams, setTeams] = useState([
    {
      name: "",
      creativity: 0,
      technicality: 0,
      usability: 0,
      robustness: 0,
      problemSolving: 0,
      members: [""],
    },
  ]);

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem("teams"));
    if (savedTeams) {
      setTeams(savedTeams);
    }
  }, []);

  function handleTeamNameChange(index, name) {
    const newTeams = [...teams];
    newTeams[index] = { ...newTeams[index], name };
    setTeams(newTeams);
  }

  function handleMemberNameChange(teamIndex, memberIndex, name) {
    const newTeams = [...teams];
    newTeams[teamIndex].members[memberIndex] = name;
    setTeams(newTeams);
  }

  function handleAddTeam() {
    setTeams([
      ...teams,
      {
        name: "",
        creativity: 0,
        technicality: 0,
        usability: 0,
        robustness: 0,
        problemSolving: 0,
        members: [""],
      },
    ]);
  }

  function handleRemoveTeam(index) {
    const newTeams = [...teams];
    newTeams.splice(index, 1);
    setTeams(newTeams);
  }

  function handleAddMember(index) {
    const newTeams = [...teams];
    newTeams[index].members.push("");
    setTeams(newTeams);
  }

  function handleRemoveMember(teamIndex, memberIndex) {
    const newTeams = [...teams];
    newTeams[teamIndex].members.splice(memberIndex, 1);
    setTeams(newTeams);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(teams);
    localStorage.setItem("teams", JSON.stringify(teams));
    router.push("/vote")
  }

  function handleSave(event) {
    event.preventDefault();
    localStorage.setItem("teams", JSON.stringify(teams));
  }

  function handleClear(event) {
    event.preventDefault();
    localStorage.removeItem("teams",);
    setTeams([
      {
        name: "",
        creativity: 0,
        technicality: 0,
        usability: 0,
        robustness: 0,
        problemSolving: 0,
        members: [""],
      },
    ])
  }

  return (
    <form onSubmit={handleSubmit}>
      {teams.map((team, teamIndex) => (
        <div
          className={classNames("mb-2", teamIndex > 0 && "mt-6")}
          key={teamIndex}
        >
          <div>
            <label className="flex items-center justify-between text-gray-50">
              Team Name:
              <input
                required
                type="text"
                className="rounded-lg text-gray-900"
                value={team.name}
                placeholder="Enter team name here..."
                onChange={(event) =>
                  handleTeamNameChange(teamIndex, event.target.value)
                }
              />
            </label>
          </div>
          {team.members.map((member, memberIndex) => (
            <div className="my-2 pl-2" key={memberIndex}>
              <label className="flex items-center justify-between text-gray-50">
                Member Name:
                <input
                  required
                  type="text"
                  className="w-[12.5rem] rounded-lg text-gray-900"
                  value={member}
                  placeholder="Enter member name here..."
                  onChange={(event) =>
                    handleMemberNameChange(
                      teamIndex,
                      memberIndex,
                      event.target.value
                    )
                  }
                />
              </label>
              {memberIndex > 0 && (
                <button
                  type="button"
                  className="mt-2 rounded-lg bg-red-600 px-2 py-1 text-gray-50 hover:bg-red-700"
                  onClick={() => handleRemoveMember(teamIndex, memberIndex)}
                >
                  ^ Remove Member
                </button>
              )}
            </div>
          ))}
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              className="rounded-lg bg-gray-100 px-2 py-1 hover:bg-gray-50"
              onClick={() => handleAddMember(teamIndex)}
            >
              + Add Member
            </button>
            {teamIndex > 0 && (
              <button
                type="button"
                className="rounded-lg bg-red-600 px-2 py-1 text-gray-50 hover:bg-red-700"
                onClick={() => handleRemoveTeam(teamIndex)}
              >
                Remove Team
              </button>
            )}
          </div>
        </div>
      ))}
      <div className="mt-6 flex w-full justify-between">
        <button
          type="button"
          className="rounded-lg bg-gray-100 px-2 py-1"
          onClick={handleAddTeam}
        >
          + Add Team
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg bg-red-600 px-4 py-1 font-semibold text-gray-50 hover:bg-red-700"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-green-700 px-4 py-1 font-semibold text-gray-50 hover:bg-green-800"
        >
          Save
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-2 py-1 font-semibold text-gray-50 hover:bg-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
