import { DBStore } from "../stores/DBStore";

export default function Skills() {

  return (

    <div>

      <h1>Skills</h1>

      {DBStore.skills.map((skill) => (

        <p key={skill}>{skill}</p>

      ))}

    </div>

  );

}