import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import _ from "lodash";
import classNames from "@/utils/classNames";

export default function Results() {
  const router = useRouter();

  const [teamResults, setTeamResults] = useState([]);
  const [topScores, setTopScores] = useState({
    creativity: 0,
    technicality: 0,
    usability: 0,
    robustness: 0,
    problemSolving: 0,
    overall: 0,
  });
  const [totalNumMembers, setTotalNumMembers] = useState(0);

  useEffect(() => {
    const savedTeamResults = JSON.parse(localStorage.getItem("teamResults"));
    const savedTeams = JSON.parse(localStorage.getItem("teams"));
    if (savedTeamResults) {
      let totalMembers = 0;
      savedTeamResults.forEach(({ members }) => {
        totalMembers += members.length;
      });
      setTotalNumMembers(totalMembers);
      setTeamResults(savedTeamResults);
    } else if (savedTeams) {
      router.push("/vote");
    } else {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (teamResults.length > 0) {
      let highestOverallScore = 0;
      let highestCreativityScore = 0;
      let highestTechnicalityScore = 0;
      let highestUsabilityScore = 0;
      let highestRobustnessScore = 0;
      let highestProblemSolvingScore = 0;
      teamResults.forEach(
        ({
          creativity,
          technicality,
          usability,
          robustness,
          problemSolving,
          members,
        }) => {
          let teamOverallScore =
            (creativity +
              technicality +
              usability +
              robustness +
              problemSolving) /
            (totalNumMembers - members.length);
          if (teamOverallScore > highestOverallScore) {
            highestOverallScore = teamOverallScore;
          }

          if (
            creativity / (totalNumMembers - members.length) >
            highestCreativityScore
          ) {
            highestCreativityScore =
              creativity / (totalNumMembers - members.length);
          }

          if (
            technicality / (totalNumMembers - members.length) >
            highestTechnicalityScore
          ) {
            highestTechnicalityScore =
              technicality / (totalNumMembers - members.length);
          }
          if (
            usability / (totalNumMembers - members.length) >
            highestUsabilityScore
          ) {
            highestUsabilityScore =
              usability / (totalNumMembers - members.length);
          }
          if (
            robustness / (totalNumMembers - members.length) >
            highestRobustnessScore
          ) {
            highestRobustnessScore =
              robustness / (totalNumMembers - members.length);
          }
          if (
            problemSolving / (totalNumMembers - members.length) >
            highestProblemSolvingScore
          ) {
            highestProblemSolvingScore =
              problemSolving / (totalNumMembers - members.length);
          }
        }
      );
      setTopScores({
        creativity: highestCreativityScore,
        technicality: highestTechnicalityScore,
        usability: highestUsabilityScore,
        robustness: highestRobustnessScore,
        problemSolving: highestProblemSolvingScore,
        overall: highestOverallScore,
      });
      console.log({
        creativity: highestCreativityScore,
        technicality: highestTechnicalityScore,
        usability: highestUsabilityScore,
        robustness: highestRobustnessScore,
        problemSolving: highestProblemSolvingScore,
        overall: highestOverallScore,
      });
    }
    // return () => {
    //   second
    // }
  }, [teamResults]);

  console.log();

  return (
    <div className="text-gray-50">
      <h2 className="text-center ">Results</h2>
      <div className="mx-auto max-w-sm text-center">
        {teamResults?.length &&
          teamResults.map((team, i) => (
            <div className="mt-4" key={i}>
              <h3 className="mb-0 mt-2 leading-tight">{team.name}</h3>
              <hr />
              <div className="grid max-w-sm grid-cols-2">
                <h5 className="ml-10 text-left">Creativity:</h5>
                <p
                  className={classNames(
                    "text-lg font-semibold",
                    team.creativity / (totalNumMembers - team.members.length) ==
                      topScores.creativity && "text-green-500"
                  )}
                >
                  {(
                    team.creativity /
                    (totalNumMembers - team.members.length)
                  ).toFixed(2)}
                </p>
              </div>
              <div className="grid max-w-sm grid-cols-2">
                <h5 className="ml-10 text-left">Technicality:</h5>
                <p
                  className={classNames(
                    "text-lg font-semibold",
                    team.technicality /
                      (totalNumMembers - team.members.length) ==
                      topScores.technicality && "text-green-500"
                  )}
                >
                  {(
                    team.technicality /
                    (totalNumMembers - team.members.length)
                  ).toFixed(2)}
                </p>
              </div>
              <div className="grid max-w-sm grid-cols-2">
                <h5 className="ml-10 text-left">Usability:</h5>
                <p
                  className={classNames(
                    "text-lg font-semibold",
                    team.usability / (totalNumMembers - team.members.length) ==
                      topScores.usability && "text-green-500"
                  )}
                >
                  {(
                    team.usability /
                    (totalNumMembers - team.members.length)
                  ).toFixed(2)}
                </p>
              </div>
              <div className="grid max-w-sm grid-cols-2">
                <h5 className="ml-10 text-left">Robustness:</h5>
                <p
                  className={classNames(
                    "text-lg font-semibold",
                    team.robustness / (totalNumMembers - team.members.length) ==
                      topScores.robustness && "text-green-500"
                  )}
                >
                  {(
                    team.robustness /
                    (totalNumMembers - team.members.length)
                  ).toFixed(2)}
                </p>
              </div>
              <div className="grid max-w-sm grid-cols-2">
                <h5 className="ml-10 text-left">Problem Solving:</h5>
                <p
                  className={classNames(
                    "text-lg font-semibold",
                    team.problemSolving /
                      (totalNumMembers - team.members.length) ==
                      topScores.problemSolving && "text-green-500"
                  )}
                >
                  {(
                    team.problemSolving /
                    (totalNumMembers - team.members.length)
                  ).toFixed(2)}
                </p>
              </div>
              <div className="grid max-w-sm grid-cols-2">
                <h5 className="ml-10 text-left">Overall:</h5>
                <p
                  className={classNames(
                    "text-lg font-semibold",
                    (team.creativity +
                      team.technicality +
                      team.usability +
                      team.robustness +
                      team.problemSolving) /
                    (totalNumMembers - team.members.length) ==
                      topScores.overall && "text-green-500"
                  )}
                >
                  {(
                    (team.creativity +
                      team.technicality +
                      team.usability +
                      team.robustness +
                      team.problemSolving) /
                    (totalNumMembers - team.members.length)
                  ).toFixed(2)}
                </p>
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
