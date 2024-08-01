import Feed from "@components/Feed";

function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        {/* under score means that the stylings coming from globals.css */}
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Promptopia: Power AI with words</span>
      </h1>
      <p className="desc text-center">
      Marketing a product is an art, and writing product descriptions is the heart of it. With the right words, you can turn a simple product into a must-have item for customers. 
      </p>

      {/* feed */}
      <Feed />
    </section>
  );
}

export default Home;
