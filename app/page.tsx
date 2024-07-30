import Feed from "@components/Feed";

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        {/* under score means that the stylings coming from globals.css */}
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for moden world to
        discover, create and share creative Prompts
      </p>

      {/* feed */}
      <Feed />
    </section>
  );
}

export default Home;
