'use client'

const tools = [
  'Cursor',
  'GitHub Copilot',
  'Claude',
  'ChatGPT',
  'Anthropic API',
  'OpenAI API',
  'Gemini',
  'Windsurf',
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#030712] via-[#111827] to-[#1e293b] text-white flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-4xl">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-green-400 mb-2 tracking-tight">
            AI Spend Audit
          </h1>

          <p className="text-gray-400 text-lg">
            Find out if you are overpaying for AI tools
          </p>
        </div>

        {/* Main Glass Card */}
        <div className="bg-[#111827]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">

          {/* Team Section */}
          <div className="mb-8">

            <h2 className="text-3xl font-bold text-green-400 mb-6">
              Your Team
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Team Size */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Team Size
                </label>

                <input
                  type="number"
                  defaultValue={1}
                  className="w-full bg-[#0f172a] border border-[#1e293b] rounded-2xl px-5 py-4 text-white text-xl shadow-inner focus:outline-none focus:border-green-400"
                />
              </div>

              {/* Use Case */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">
                  Primary Use Case
                </label>

                <select
                  className="w-full bg-[#0f172a] border border-[#1e293b] rounded-2xl px-5 py-4 text-white text-xl shadow-inner focus:outline-none focus:border-green-400"
                >
                  <option>Coding</option>
                  <option>Writing</option>
                  <option>Research</option>
                  <option>Marketing</option>
                </select>
              </div>

            </div>
          </div>

          {/* Tools */}
          <div className="mb-8">

            <h2 className="text-3xl font-bold text-green-400 mb-6">
              Select Your AI Tools
            </h2>

            <div className="grid grid-cols-2 gap-4">

              {tools.map((tool) => (
                <button
                  key={tool}
                  className="
                    bg-[#1e293b]
                    hover:bg-green-500/10
                    border border-[#334155]
                    hover:border-green-400
                    rounded-2xl
                    py-5
                    text-lg
                    font-semibold
                    transition-all
                    duration-200
                    shadow-lg
                  "
                >
                  {tool}
                </button>
              ))}

            </div>
          </div>

          {/* Button */}
          <button
            className="
              w-full
              bg-white
              hover:bg-green-400
              text-black
              font-black
              text-2xl
              py-5
              rounded-2xl
              transition-all
              duration-200
              shadow-xl
            "
          >
            Run My Audit →
          </button>

        </div>
      </div>
    </main>
  )
}