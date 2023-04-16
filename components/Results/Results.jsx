import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import _ from "lodash";
import classNames from "@/utils/classNames";

export default function Results() {
  const router = useRouter();
  const [teamResults, setTeamResults] = useState([]);
  const [topScores, setTopScores] = useState({creativity: 0, technicality: 0, usability: 0, robustness: 0, problemSolving: 0, overall: 0});
  const [totalNumMembers, setTotalNumMembers] = useState(0);
  // const [bestCreativity, setBestCreativity] = useState(0);
  // const [bestTechnicality, setBestTechnicality] = useState(0);
  // const [bestUsability, setBestUsability] = useState(0);
  // const [bestRobustness, setBestRobustness] = useState(0);
  // const [bestProblemSolving, setBestProblemSolving] = useState(0);

  useEffect(() => {
    const savedTeamResults = JSON.parse(localStorage.getItem("teamResults"));
    const savedTeams = JSON.parse(localStorage.getItem("teams"));
    if (savedTeamResults) {
      setTeamResults(savedTeamResults);
    } else if (savedTeams) {
      router.push("/vote");
    } else {
      router.push("/")
    }
  }, []);

  useEffect(() => {
    if(teamResults.length > 0) {
      let totalMembers = 0;
      let highestOverallScore = 0;
      let highestCreativityScore = 0;
      let highestTechnicalityScore = 0;
      let highestUsabilityScore = 0;
      let highestRobustnessScore = 0;
      let highestProblemSolvingScore = 0;
      teamResults.forEach(({creativity, technicality, usability, robustness, problemSolving, members}) => {
        let teamOverallScore = creativity + technicality + usability + robustness + problemSolving;
        if(teamOverallScore > highestOverallScore) {
          highestOverallScore = teamOverallScore;
        }

        if(creativity > highestCreativityScore) {
          highestCreativityScore = creativity;
        }

        if(technicality > highestTechnicalityScore) {
          highestTechnicalityScore = technicality;
        }
        if(usability > highestUsabilityScore) {
          highestUsabilityScore = usability;
        }
        if(robustness > highestRobustnessScore) {
          highestRobustnessScore = robustness;
        }
        if(problemSolving > highestProblemSolvingScore) {
          highestProblemSolvingScore = problemSolving;
        }
        totalMembers += members.length;
      })
      setTotalNumMembers(totalMembers)
      setTopScores({creativity: highestCreativityScore, technicality: highestTechnicalityScore, usability: highestUsabilityScore, robustness: highestRobustnessScore,  problemSolving: highestProblemSolvingScore, overall: highestOverallScore})
    }
  
    // return () => {
    //   second
    // }
  }, [teamResults])
  


  return (
    <div className="text-gray-50">
        <h2 className="text-center ">
          Results
        </h2>
        <div className="max-w-sm mx-auto text-center">
        {teamResults?.length && 
          teamResults.map((team, i) => (
          <div className="mt-4" key={i}>
            <h3 className="mb-0 mt-2 leading-tight">{team.name}</h3>
            <hr/>
            <div className="grid max-w-sm grid-cols-2">
              <h5 className="text-left ml-10">Creativity:</h5>
              <p className={classNames("font-semibold text-lg", team.creativity == topScores.creativity && "text-green-500")}>{(team.creativity/totalNumMembers).toFixed(2)}</p>
            </div>
            <div className="grid max-w-sm grid-cols-2">
              <h5 className="text-left ml-10">Technicality:</h5>
              <p className={classNames("font-semibold text-lg", team.technicality == topScores.technicality && "text-green-500")}>{(team.technicality/totalNumMembers).toFixed(2)}</p>
            </div>
            <div className="grid max-w-sm grid-cols-2">
              <h5 className="text-left ml-10">Usability:</h5>
              <p className={classNames("font-semibold text-lg", team.usability == topScores.usability && "text-green-500")}>{(team.usability/totalNumMembers).toFixed(2)}</p>
            </div>
            <div className="grid max-w-sm grid-cols-2">
              <h5 className="text-left ml-10">Robustness:</h5>
              <p className={classNames("font-semibold text-lg", team.robustness == topScores.robustness && "text-green-500")}>{(team.robustness/totalNumMembers).toFixed(2)}</p>
            </div>
            <div className="grid max-w-sm grid-cols-2">
              <h5 className="text-left ml-10">Problem Solving:</h5>
              <p className={classNames("font-semibold text-lg", team.problemSolving == topScores.problemSolving && "text-green-500")}>{(team.problemSolving/totalNumMembers).toFixed(2)}</p>
            </div>
            <div className="grid max-w-sm grid-cols-2">
              <h5 className="text-left ml-10">Overall:</h5>
              <p className={classNames("font-semibold text-lg", team.creativity + team.technicality + team.usability + team.robustness + team.problemSolving == topScores.overall && "text-green-500")}>{((team.creativity + team.technicality + team.usability + team.robustness + team.problemSolving)/totalNumMembers).toFixed(2)}</p>
            </div>
          </div>
        ))}
        </div>
      {/* {bestOverall && 
        <div className="mt-6">
          <h2 className="text-center">
            Best Overall
          </h2>
          <hr/>
          <div className="grid max-w-sm grid-cols-2 mx-auto text-center">
            <h5>{bestOverall.name}</h5>
            <p>{bestOverall.score}</p>
          </div>
        </div>
      } */}
    </div>
  );
}