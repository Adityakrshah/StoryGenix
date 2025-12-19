


import { FaFilm, FaMagic, FaUsers, FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function About() {
  return (
    <div>
      
<div className="mt-24 text-center">
  <h2 className="text-2xl font-semibold mb-4 text-neutral-500">About the Creator</h2>

  <p className="text-neutral-400 max-w-3xl mx-auto leading-relaxed">
    StoryGenix is a personal project created by <span className="text-neutral-200 font-medium">Aditya Kr. Shah</span>,
    driven by a passion for web development, artificial intelligence, and
    cinematic storytelling. This project reflects a hands-on learning journey
    focused on building real-world, user-centered applications.
  </p>

  <p className="mt-4 text-neutral-400 max-w-3xl mx-auto leading-relaxed">
    From frontend architecture and UI design to AI prompt structuring,
    StoryGenix is built as both a creative and technical exploration.
  </p>

  {/* Social Links */}
  <div className="mt-6 flex justify-center gap-6 text-neutral-400">

     <a
        href="mailto:adityakrshah61@gmail.com"
        className="hover:text-red-400 transition"
        title="Email"
    >
        <FaEnvelope size={22} />
     </a>
 
    <a
      href="https://www.instagram.com/aditya_kr_shah/?utm_source=qr#"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-pink-500 transition"
    >
      <FaInstagram size={22} />
    </a>

    <a
      href="https://github.com/Adityakrshah"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition"
    >
      <FaGithub size={22} />
    </a>

    <a
      href="https://www.linkedin.com/in/aditya-kumar-shah-52a081295/"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-blue-500 transition"
    >
      <FaLinkedin size={22} />
    </a>
  </div>
</div>
    </div>
  );
}
