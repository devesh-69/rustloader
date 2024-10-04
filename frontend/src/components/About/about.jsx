import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1">
        <section className="w-full lg:py-32">
          <div className="container px-4 md:px-6 pt-20 lg:pt-0 scale-90">
            <div className="grid gap-6 lg:grid-cols-[1fr_450px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl py-5 font-bold tracking-tighter sm:text-5xl xl:text-6xl text-gray-900">
                    Kharido nahi Rent Karo!
                  </h1>
                  <p className="max-w-[600px] pb-4 text-gray-700 md:text-xl">
                    RustLoader connects owners and renters of high-quality
                    construction vehicles, simplifying the process and ensuring
                    reliable access to the equipment you need.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    to="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-yellow-300 px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-yellow-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <video
                autoPlay
                muted
                loop
                width="650"
                height="550"
                alt="About us"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              >
                <source src="https://media.istockphoto.com/id/1790979527/video/back-view-of-hispanic-female-project-manager-and-caucasian-male-civil-engineer-walking-and.mp4?s=mp4-640x640-is&k=20&c=rfrW0Ws5Hqo-aEBNjon_BLQjp0orEMZOkEDGsgjFicM=" />
              </video>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 animate-fadeIn">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  Our Mission
                </h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed pt-5 lg:text-base/relaxed xl:text-xl/relaxed">
                  At RustLoader, our mission is to simplify the connection
                  between construction vehicle owners and renters, fostering a
                  future of efficiency, reliability, and trust. We are driven by
                  the values of innovation, trust, and efficiency, empowering
                  our clients to access the equipment they need when they need
                  it.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center animate-fadeIn">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  Our Journey
                </h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed py-8 lg:text-base/relaxed xl:text-xl/relaxed">
                  Since our founding in 2015, RustLoader has been on a mission
                  to revolutionize the construction equipment rental industry.
                  Here's a glimpse of our journey:
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-bold text-gray-900">2024</h3>
                  <p className="text-gray-700">Founded</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-bold text-gray-900">7 Days</h3>
                  <p className="text-gray-700">Launched in Maharashtra</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-bold text-gray-900">1 Month</h3>
                  <p className="text-gray-700">Helping over 1,000 owners</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-bold text-gray-900">2 Months</h3>
                  <p className="text-gray-700">
                    Integrated AI to find Perfect vehicles
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-bold text-gray-900">Now</h3>
                  <p className="text-gray-700">
                    Expanded into 7 cities in Maharashtra
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105">
                  <h3 className="text-xl font-bold text-gray-900">2023</h3>
                  <p className="text-gray-700">Serving 1,000+ projects</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 animate-fadeIn">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  Meet the Team
                </h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed py-8 lg:text-base/relaxed xl:text-xl/relaxed">
                  Our dedicated team is the driving force behind RustLoader's
                  success. Get to know the individuals who are committed to
                  revolutionizing the construction equipment rental industry.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105">
                  <div className="flex items-center gap-4">
                    <img
                      src="/placeholder-user.jpg"
                      alt="John Doe"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Devesh Tatkare
                      </h3>
                      <p className="text-gray-700">CEO</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">
                    John is the visionary behind RustLoader, leading the team
                    with a passion for innovation and excellence.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105">
                  <div className="flex items-center gap-4">
                    <img
                      src="/placeholder-user.jpg"
                      alt="Jane Smith"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Yash Magare
                      </h3>
                      <p className="text-gray-700">CTO</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">
                    Jane leads the technical team with a focus on delivering
                    cutting-edge solutions and ensuring product excellence.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105">
                  <div className="flex items-center gap-4">
                    <img
                      src="/placeholder-user.jpg"
                      alt="Michael Brown"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Chiraag Mahakaal
                      </h3>
                      <p className="text-gray-700">COO</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">
                    Michael ensures smooth operations and exceptional customer
                    service, driving RustLoader's growth and success.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm transition-transform transform hover:scale-105">
                  <div className="flex items-center gap-4">
                    <img
                      src="/placeholder-user.jpg"
                      alt="Michael Brown"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Mruthunjay
                      </h3>
                      <p className="text-gray-700">COO</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">
                    Michael ensures smooth operations and exceptional customer
                    service, driving RustLoader's growth and success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
