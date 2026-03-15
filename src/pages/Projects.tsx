import { DBStore } from "../stores/DBStore";

export default function Projects() {

  return (

    <div>

      <h1>Projects</h1>

      {DBStore.projects.map((project) => (

        <div key={project.name}>

          <h3>{project.name}</h3>

          <p>{project.description}</p>

        </div>

      ))}

    </div>

  );

}