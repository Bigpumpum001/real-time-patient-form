import Link from "next/link";

const roles = [
  {
    href: "/patient",
    role: "Patient",
    description: "Fill in your personal information\nfor registration",
    tag: "Self-registration",
    accent: "emerald",
  },
  {
    href: "/staff",
    role: "Staff",
    description: "Monitor patient submissions\nin real time",
    tag: "Internal access",
    accent: "stone",
  },
];

export default function RoleSelectPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Center content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-stone-900 sm:text-6xl">
            Select your 
            <span className="text-emerald-700"> role?</span>
          </h1>
        </div>

        {/* Cards */}
        <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
          {roles.map(({ href, role, description, tag, accent }) => (
            <Link
              key={href}
              href={href}
              className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-stone-200 bg-white px-7 py-8 transition-all duration-200 hover:border-${accent === "emerald" ? "emerald-300" : "stone-400"} hover:-translate-y-0.5 hover:shadow-md`}
            >
              {/* Top */}
              <div className="mb-10">
                <span
                  className={`mb-5 inline-block rounded border px-2 py-0.5 font-mono text-[9px] tracking-[0.14em] uppercase ${
                    accent === "emerald"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-stone-200 bg-stone-50 text-stone-400"
                  } `}
                >
                  {tag}
                </span>

                <h2 className="mb-3 font-serif text-4xl leading-none tracking-tight text-stone-900">
                  {role}
                </h2>

                <p className="font-mono text-[12px] leading-relaxed whitespace-pre-line text-stone-400">
                  {description}
                </p>
              </div>

              {/* Arrow */}
              <div
                className={`flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase transition-colors duration-150 ${
                  accent === "emerald"
                    ? "text-emerald-600 group-hover:text-emerald-700"
                    : "text-stone-400 group-hover:text-stone-600"
                } `}
              >
                Enter
                <span className="transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </div>

              {/* Subtle corner accent */}
              <div
                className={`absolute -right-6 -bottom-6 h-20 w-20 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accent === "emerald" ? "bg-emerald-50" : "bg-stone-50"} `}
              />
            </Link>
          ))}
        </div>

       
      </div>
    </main>
  );
}
