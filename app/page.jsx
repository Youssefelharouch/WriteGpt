import Feed from "@components/Feed";

const Home = () => (
  <section className="w-full flex flex-col flex-center">
  <h1 className="text-3xl font-semibold text-center lg:text-6xl lg:text-left mt-20">Discover & Share</h1>
  <br  className="max-md:hidden"/>
  <span className="red_gradient text-center text-6xl font-black	max-w-xl	py-16 max-md:text-5xl ">AI-Powered Prompts</span>
  <p className='max-w-md mx-auto text-lg text-center text-gray-800 lg:text-2xl  lg:mt-0 lg:mx-0'>
  Promptopia is an open-source AI prompting tool for modern world to
  discover, create and share creative prompts
  </p>
  <Feed/>
</section>
);

export default Home;
