const Contact = () => {
  return (
    <div className="min-h-full  bg-gradient-to-r from-violet-400 to-violet-200 p-2 md:p-4 flex items-center justify-center">
      <div className="my-28 text-center ">
        <h1 className="text-7xl font-bold tracking-wide text-slate-800">
          Hello
        </h1>
        <p className="mt-7 text-slate-600">What can we help you with ?</p>
        <div className="flex gap-6 items-center mt-7">
          <button className="bg-slate-500 text-white px-20 py-4  hover:bg-slate-600 cursor-pointer">
            Join us
          </button>
          <p className="text-slate-600">Or</p>
          <button className="bg-slate-500 text-white px-20 py-4  hover:bg-slate-600 cursor-pointer">
            Hire us
          </button>
        </div>
        <p className="mt-5 text-slate-600">For everything else</p>
        <p>
          <a
            href="mailto:aditisan7@gmail.com"
            target="_blank"
            className="text-red-500"
          >
            aditisan7@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
