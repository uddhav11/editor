import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaUsers, FaLock, FaGlobe, FaRocket } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-blue-900 to-purple-900 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
              CodeCollab
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Real-time collaborative code editing for teams and classrooms
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="bg-transparent border-2 border-blue-400 hover:bg-blue-900/30 text-blue-100 font-bold py-3 px-8 rounded-lg text-lg transition-all"
            >
              Existing User? Login
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Powerful Features for Seamless Collaboration
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all">
            <div className="text-blue-400 mb-4">
              <FaCode className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-time Editing</h3>
            <p className="text-gray-300">
              See changes as they happen with our ultra-fast synchronization. No more waiting for refreshes or manual updates.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-400 transition-all">
            <div className="text-purple-400 mb-4">
              <FaUsers className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Multi-user Collaboration</h3>
            <p className="text-gray-300">
              Work simultaneously with your team members, students, or friends in shared coding rooms.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all">
            <div className="text-blue-400 mb-4">
              <FaLock className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Rooms</h3>
            <p className="text-gray-300">
              Private rooms with invite-only access to keep your code secure and your collaboration focused.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-purple-400 transition-all">
            <div className="text-purple-400 mb-4">
              <FaGlobe className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Multiple Languages</h3>
            <p className="text-gray-300">
              Supports JavaScript, Python, Java, C++, and more with syntax highlighting and auto-completion.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all">
            <div className="text-blue-400 mb-4">
              <FaRocket className="text-4xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Setup</h3>
            <p className="text-gray-300">
              Get started in seconds - no complicated configurations or installations required.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Experience the Power of Real-time Coding
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Watch how CodeCollab transforms the way teams write code together. See changes instantly appear across all connected devices.
              </p>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg inline-block transition-all transform hover:scale-105"
              >
                Try It Now
              </Link>
            </div>
            <div className="lg:w-1/2 bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
              {/* Placeholder for demo gif/video */}
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-center p-6">
                  <FaCode className="text-6xl text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-400">Live collaborative editor demo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <img 
                src="https://randomuser.me/api/portraits/women/32.jpg" 
                alt="User" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-bold">Sarah Johnson</h4>
                <p className="text-gray-400 text-sm">Lead Developer</p>
              </div>
            </div>
            <p className="text-gray-300">
              "CodeCollab has transformed how our remote team works. Pair programming sessions are now seamless and productive."
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <img 
                src="https://randomuser.me/api/portraits/men/45.jpg" 
                alt="User" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-bold">Michael Chen</h4>
                <p className="text-gray-400 text-sm">CS Instructor</p>
              </div>
            </div>
            <p className="text-gray-300">
              "My students love using CodeCollab for group projects. The real-time feedback has improved learning outcomes dramatically."
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center mb-4">
              <img 
                src="https://randomuser.me/api/portraits/women/68.jpg" 
                alt="User" 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-bold">Emma Rodriguez</h4>
                <p className="text-gray-400 text-sm">Open Source Maintainer</p>
              </div>
            </div>
            <p className="text-gray-300">
              "Reviewing pull requests is so much easier when we can collaboratively edit code in real-time. Game changer for OSS."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900/70 to-purple-900/70">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Coding Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers already collaborating with CodeCollab
          </p>
          <Link
            to="/register"
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-12 rounded-full text-lg inline-block transition-all transform hover:scale-105"
          >
            Start Coding Together Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                CodeCollab
              </h2>
              <p className="text-gray-400 mt-2">
                Real-time collaborative code editing
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 text-gray-400">
              <Link to="/about" className="hover:text-blue-400 transition-colors">
                About
              </Link>
              <Link to="/features" className="hover:text-blue-400 transition-colors">
                Features
              </Link>
              <Link to="/pricing" className="hover:text-blue-400 transition-colors">
                Pricing
              </Link>
              <Link to="/contact" className="hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} CodeCollab. All rights reserved.</p>
          </div>
        </div>
        <p>This is a practical projet, not an actual product</p>
      </footer>
    </div>
  );
};

export default LandingPage;