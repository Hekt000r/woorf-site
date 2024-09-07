
function AboutGameFinder() {
    return (
      <div>
        <div className="text-center">
         
          <h1 className="text-6xl text-center m-4">About AI game search</h1>
          <div className="w-[600px] shadow-md center rounded-xl p-8">
            {" "}
            <p className="text-center text-xl">
            The model the AI Game Finder uses is llama3-8b-8192, hosted by GroqCloud.
            Please note, depending on the amount of users, the AI may be at full capacity.
            Because of that, if it doesn't work the first time, wait a minute and the prompting quota will reset.
            It's no GPT-4, but its excellent at doing stuff like finding games based on a given prompt, and it's response's are almost always extremely interesting and well-written. It's made by Meta.
            You can also use it to prompt for software if you wish, although its not quite as good 
            as finding things like alternatives to paid software, which is way i manually
            update those.
            </p>
          </div>
         
          <h1 className="mt-12">the end</h1>
        </div>
      </div>
    );
  }
  
  export default AboutGameFinder;
  