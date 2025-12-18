import { useNavigate } from "react-router-dom";
import { FaMagic, FaLanguage, FaFilm, FaArrowRight } from "react-icons/fa";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center px-6">

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Create <span className="text-blue-500">Cinematic Stories</span>
          <br /> with AI
        </h1>

        <p className="mt-6 text-neutral-400 text-lg leading-relaxed">
          StoryGenix transforms your imagination into emotionally rich,
          cinematic scripts using the power of artificial intelligence.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
          >
            Get Started <FaArrowRight />
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-neutral-600 hover:bg-neutral-800 px-6 py-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl w-full py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Feature
          icon={<FaMagic />}
          title="AI-Powered Writing"
          text="Generate cinematic-quality scripts instantly from simple prompts."
        />
        <Feature
          icon={<FaLanguage />}
          title="Multi-Language Support"
          text="Create stories in English, Nepali, Hindi, and more."
        />
        <Feature
          icon={<FaFilm />}
          title="Cinematic Tone"
          text="Emotion, mood, and storytelling crafted like a movie script."
        />
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-4xl py-24">
        <h2 className="text-3xl font-semibold mb-10">How It Works</h2>

        <div className="space-y-6 text-neutral-400 text-lg">
          <p>1. Write a simple prompt describing your story idea.</p>
          <p>2. Choose mood and language.</p>
          <p>3. Let StoryGenix generate a cinematic script.</p>
          <p>4. Save, revisit, and refine your creations.</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24">
        <h2 className="text-3xl font-semibold">
          Turn Ideas into Stories
        </h2>
        <p className="mt-4 text-neutral-400">
          Start your cinematic journey today.
        </p>

        <button
          onClick={() => navigate("/signup")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold"
        >
          Start Creating
        </button>
      </section>

    </div>
  );
}

/* Reusable Feature Card */
function Feature({ icon, title, text }) {
  return (
    <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-6 backdrop-blur-md">
      <div className="text-blue-500 text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-400">{text}</p>
    </div>
  );
}
