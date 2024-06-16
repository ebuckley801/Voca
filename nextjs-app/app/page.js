/**
 * v0 by Vercel.
 * @see https://v0.dev/t/e5l7yrkr3E0
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <VibrateIcon className="h-6 w-6" />
          <span className="sr-only">Voca</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_400px] lg:gap-8 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-500">
                    Unlock a World of Possibilities with Voca
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Personalized lessons and a diverse language catalog to help you become fluent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-16 bg-blue-200 dark:bg-blue-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-500">
                  Discover the Joy of Learning
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Voca offers a range of features to make your language learning experience enjoyable and rewarding.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-4 py-6 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-4">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-500">Personalized Lessons</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Tailored lessons that cater to your unique learning style and proficiency level.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-500">Progress Tracking</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Celebrate your achievements and see how you're improving over time.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-blue-500">Diverse Catalog</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Explore a wide range of languages and find the one that ignites your passion.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-16 bg-blue-200 dark:bg-blue-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-500">
                  Meet your personal AI tutor, Ezro
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Ezro is an advanced AI assistant who will guide you through your language learning journey. With
                  personalized lessons and real-time feedback, Ezro will help you achieve your goals.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-16 bg-blue-200 dark:bg-blue-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-500">Before You Begin</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Turn your volume on, don't close the browser while learning, and speak clearly and slowly.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-16 bg-blue-200 dark:bg-blue-200">
          <div className="container px-4 md:px-6 flex justify-center">
            <Link
              href="/start"
              className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-950 disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Start Your Journey
            </Link>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-4 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 Voca. All rights reserved.</p>
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
    >
      <path d="m2 8 2 2-2 2 2 2-2 2" />
      <path d="m22 8-2 2 2 2-2 2 2 2" />
      <rect width="8" height="14" x="8" y="5" rx="1" />
    </svg>
  )
}