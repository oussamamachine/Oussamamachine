import React, { useState, useRef, useEffect } from 'react';

const ContactNexus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: 'oussama.machine@example.com',
      action: 'mailto:oussama.machine@example.com',
      description: 'Drop me a line'
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: '/in/oussama-machine',
      action: 'https://linkedin.com/in/oussama-machine',
      description: 'Professional network'
    },
    {
      icon: '🐱',
      label: 'GitHub',
      value: '/oussama-machine',
      action: 'https://github.com/oussama-machine',
      description: 'Code repositories'
    },
    {
      icon: '🌐',
      label: 'Website',
      value: 'oussama.machine',
      action: 'https://oussama.machine',
      description: 'Digital presence'
    }
  ];

  const collaborationAreas = [
    { icon: '🚀', title: 'Web Applications', desc: 'Full-stack React & Node.js projects' },
    { icon: '⛓️', title: 'Blockchain Solutions', desc: 'Smart contracts & DeFi applications' },
    { icon: '🎨', title: '3D Experiences', desc: 'Three.js & interactive visualizations' },
    { icon: '🏢', title: 'Enterprise Systems', desc: '.NET & database-driven solutions' }
  ];

  return (
    <section
      ref={sectionRef}
      data-section="contact"
      className="min-h-screen py-20 px-4 relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-blue-900/20"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-px h-px bg-cyan-400/20 rounded-full transition-all duration-1000 ${
              isVisible ? 'animate-pulse' : 'opacity-0'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Contact Nexus
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Ready to build something extraordinary together?
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
              <span className="text-3xl mr-3">🌐</span>
              Let's Connect
            </h3>

            {/* Contact Methods */}
            <div className="space-y-6 mb-12">
              {contactMethods.map((method, index) => (
                <div
                  key={method.label}
                  className={`group p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:bg-gray-800/50 hover:scale-105 cursor-pointer transition-all duration-500 delay-${index * 100}`}
                  onClick={() => window.open(method.action, '_blank')}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500/20 to-blue-600/20 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-white">{method.label}</h4>
                        <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <p className="text-cyan-400 font-mono text-sm">{method.value}</p>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Collaboration Areas */}
            <h4 className="text-xl font-bold text-white mb-6">Collaboration Areas</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {collaborationAreas.map((area, index) => (
                <div
                  key={area.title}
                  className={`p-4 rounded-lg bg-gray-800/20 border border-gray-700/30 hover:border-cyan-500/30 transition-all duration-300 hover:bg-gray-800/30 transition-all duration-500 delay-${(index + 4) * 100}`}
                >
                  <div className="text-2xl mb-2">{area.icon}</div>
                  <h5 className="text-white font-semibold mb-1">{area.title}</h5>
                  <p className="text-gray-400 text-sm">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="bg-gray-800/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">📬</span>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    placeholder="Project collaboration, job opportunity, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or what you have in mind..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-cyan-500/25 transform hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center animate-fade-in">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-lg text-gray-300 mb-4">
            Based in <span className="text-cyan-400 font-semibold">Rabat, Morocco</span> • Available for remote work worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span>🕒 UTC+1 Timezone</span>
            <span>•</span>
            <span>🌍 Global Collaboration</span>
            <span>•</span>
            <span>⚡ Quick Response</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactNexus;
