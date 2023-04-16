import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function VoteForm() {
  const router = useRouter();
  const [teams, setTeams] = useState([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);

  useEffect(() => {
    const savedTeams = JSON.parse(localStorage.getItem("teams"));
    if (savedTeams) {
      setTeams(savedTeams);
    } else {
      router.push("/");
    }
  }, []);

  function handleVoteSubmit(event) {
    event.preventDefault();
    const categories = [
      "creativity",
      "technicality",
      "usability",
      "robustness",
      "problemSolving",
    ];

    let newTeams = [...teams];

    categories.forEach( category => {
      event.target.elements[category].forEach((el, i) => {
        let newVal = parseInt(newTeams[i][category]) + parseInt(el.value)
        newTeams[i][category] += newVal;
      });
    })

    console.log(teams)
    console.log(event.target.elements.creativity[0].value);

    if(currentMemberIndex + 1 < teams[currentTeamIndex].members.length) {
      setCurrentMemberIndex(currentMemberIndex + 1)
    } else if (currentTeamIndex + 1 < teams.length) {
      setCurrentTeamIndex(currentTeamIndex + 1)
      setCurrentMemberIndex(0)
    }
  }

  return (
    <div className="text-gray-50">
      {currentTeamIndex < teams.length && (
        <h2 className="text-center ">
          {teams[currentTeamIndex].members[currentMemberIndex]} - {teams[currentTeamIndex].name}
        </h2>
      )}
      <form onSubmit={handleVoteSubmit}>
        {teams.map((team, i) => (
          <div key={i}>
            <h3 className="mb-0 mt-2">{team.name}</h3>
            <div className="grid max-w-sm grid-cols-2">
              <label htmlFor="creativity">Creativity:</label>
              <input
                id="creativity"
                type="range"
                min="1"
                max="5"
                defaultValue={1}
              />
            </div>
            <div className="grid max-w-sm grid-cols-2">
              <label htmlFor="technicality">Technicality:</label>
              <input
                id="technicality"
                type="range"
                min="1"
                max="5"
                defaultValue={1}
              />
            </div>
            <div className="grid max-w-sm grid-cols-2">
              <label htmlFor="usability">Usability:</label>
              <input
                id="usability"
                type="range"
                min="1"
                max="5"
                defaultValue={1}

              />
            </div>
            <div className="grid max-w-sm grid-cols-2">
              <label htmlFor="robustness">Robustness:</label>
              <input
                id="robustness"
                type="range"
                min="1"
                max="5"
                defaultValue={1}
              />
            </div>
            <div className="grid max-w-sm grid-cols-2">
              <label htmlFor="problemSolving">Problem Solving:</label>
              <input
                id="problemSolving"
                type="range"
                min="1"
                max="5"
                defaultValue={1}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <button
            className="rounded-lg bg-blue-700 px-2 py-1 font-semibold text-gray-50"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
