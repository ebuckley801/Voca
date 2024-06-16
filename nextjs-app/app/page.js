/**
 * v0 by Vercel.
 * @see https://v0.dev/t/u02rX4HbhKP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <VibrateIcon className="h-6 w-6" />
          <span className="sr-only">Voca</span>
        </Link>
      </header>
      <main className="flex-1 bg-white">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 bg-white">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] bg-white">
              <div className="flex flex-col justify-center space-y-4 bg-white">
                <div className="space-y-2 bg-white">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-500 bg-white">
                    Unlock a World of Possibilities with Voca
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 bg-white">
                    Personalized lessons and a diverse language catalog to help you become fluent.
                  </p>
                </div>
                <Link
                  href="/start"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-950 hover:bg-blue-500 disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Start Your Journey
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 bg-white">
            <div className="flex flex-col items-center justify-center space-y-4 text-center bg-white">
              <div className="space-y-2 bg-white">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-500 bg-white">
                  Discover the Joy of Learning
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 bg-white">
                  Voca offers a range of features to make your language learning experience enjoyable and rewarding.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12 bg-white">
              <div className="flex flex-col justify-center space-y-4 bg-white">
                <ul className="grid gap-6 bg-white">
                  <li className="bg-white">
                    <div className="grid gap-1 bg-white">
                      <h3 className="text-xl font-bold text-blue-500 bg-white">Personalized Lessons</h3>
                      <p className="text-gray-500 dark:text-gray-400 bg-white">
                        Tailored lessons that cater to your unique learning style and proficiency level.
                      </p>
                    </div>
                  </li>
                  <li className="bg-white">
                    <div className="grid gap-1 bg-white">
                      <h3 className="text-xl font-bold text-blue-500 bg-white">Progress Tracking</h3>
                      <p className="text-gray-500 dark:text-gray-400 bg-white">
                        Celebrate your achievements and see how you're improving over time.
                      </p>
                    </div>
                  </li>
                  <li className="bg-white">
                    <div className="grid gap-1 bg-white">
                      <h3 className="text-xl font-bold text-blue-500 bg-white">Diverse Catalog</h3>
                      <p className="text-gray-500 dark:text-gray-400 bg-white">
                        Explore a wide range of languages and find the one that ignites your passion.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-gray-500 dark:text-gray-400 bg-white">&copy; 2024 Voca. All rights reserved.</p>
      </footer>
    </div>
  )
}

function VibrateIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="bg-white"
    >
      <path d="m2 8 2 2-2 2 2 2-2 2" className="bg-white" />
      <path d="m22 8-2 2 2 2-2 2 2 2" className="bg-white" />
      <rect width="8" height="14" x="8" y="5" rx="1" className="bg-white" />
    </svg>
  )
}