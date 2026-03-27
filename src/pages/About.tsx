import React from "react";

const About: React.FC = () => {
  return (
    <div className="page about-page">
      <h2>About Me</h2>
      <section className="bio-content">
        <h3>My Story</h3>
        <p>I am a passionate developer learning the MERN stack and .NET Core.</p>
      </section>
      <section className="skills">
        <h3>Skills</h3>
        <ul>
          <li>React & TypeScript</li>
          <li>.NET Web API</li>
          <li>CSS & UI Design</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
