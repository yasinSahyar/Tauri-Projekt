import { Link } from "react-router-dom";

export default function PortfolioLayout({ children }: any) {

  return (

    <div>

      <nav style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/contact">Contact</Link>

      </nav>

      <hr />

      <main>{children}</main>

    </div>

  );

}