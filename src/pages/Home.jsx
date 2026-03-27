import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Camera Access",
      icon: "📷",
      desc: "Stream live video from your device",
      path: "/camera",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Voice Recognition",
      icon: "🎤",
      desc: "Convert speech into real-time text",
      path: "/voice",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Bluetooth Devices",
      icon: "🎧",
      desc: "Scan and connect nearby devices",
      path: "/bluetooth",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2 text-center">
        🔐 Dashboard
      </h1>
      <p className="text-gray-400 mb-10 text-center">
        Secure Hardware Interface Dashboard
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">

        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-slate-800 rounded-2xl p-6 shadow-lg hover:scale-105 transition transform hover:shadow-2xl"
          >
            {/* Icon */}
            <div className="text-4xl mb-4">{card.icon}</div>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-2">
              {card.title}
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4">
              {card.desc}
            </p>

            {/* CTA */}
            <div
              className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${card.color}`}
            >
              Open
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Home;