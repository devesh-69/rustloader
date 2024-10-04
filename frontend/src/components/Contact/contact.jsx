import React from "react";
import { Link } from "react-router-dom";

function contact() {
  return (
    <div className="flex flex-col min-h-[100dvh">
      <main className="flex-1 mx-auto scale-90">
        <section className="bg-background py-12 md:py-24">
          <div className="container grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter pb-5 md:text-4xl text-gray-900">
                  Contact Us
                </h1>
                <p className="text-muted-foreground">
                  Have a question or need to rent some equipment? Fill out the
                  form and we'll get back to you as soon as possible.
                </p>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Devesh Tatkare"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="tatkaredevesh.com"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="91+ 989852508"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="How can we help you?"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-10 py-2 bg-yellow-300 text-white rounded-md shadow-sm hover:bg-yellow-400"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tighter pb-5 text-gray-900">
                  Our Services
                </h2>
                <p className="text-muted-foreground">
                  We offer a wide range of construction vehicles for rent,
                  including:
                </p>
              </div>
              <ul className="grid gap-4">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-gray-700" />
                  <span>Excavators</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-gray-700" />
                  <span>Backhoes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-gray-700" />
                  <span>Skid Steers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-gray-700" />
                  <span>Dump Trucks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-5 w-5 text-gray-700" />
                  <span>Forklifts</span>
                </li>
              </ul>
              <div>
                <h2 className="text-2xl font-bold tracking-tighter text-gray-900 py-5">
                  Contact Information
                </h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <span className="font-medium">Address:</span> 123 Main St,
                    Mumbai, Maharashtra.
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> 91+ 989852508
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    rustloader@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:p-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 Construction Vehicles. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default contact;
