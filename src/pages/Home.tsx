import React from "react";

const Home: React.FC = () => {
  return (
    <div className="page home-page">
      <h2>Home Page</h2>
      <section className="hero">
        <h3>Welcome!</h3>
        <p>This is the landing page of my personal website built for the Finals Assignment.</p>
      </section>
      <section className="bio">
        <h3>About This Project</h3>
        <p>This site demonstrates React routing, state management with Context API, and form handling.</p>
      </section>
    </div>
  );
};

export default Home;
