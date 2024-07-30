import Feed from "@components/Feed";

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        {/* under score means that the stylings coming from globals.css */}
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Blogsie: A Private Space</span>
      </h1>
      <p className="desc text-center">
        A Peronalized Blog Site where you can Share your thoughts and ideas and discover
        new Ideas from others in the community.
      </p>

      {/* feed */}
      <Feed />
    </section>
  );
}

export default Home;
