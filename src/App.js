import React, { useState, useEffect, Suspense, StrictMode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AITerminal from './components/AITerminal';
import EasterEggSystem from './components/EasterEggSystem';

// Error Boundary for 3D components
class ThreeJSErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log('3D Error caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900 to-blue-900">
                    <div className="flex items-center justify-center h-full text-white">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold mb-4">3D Background Unavailable</h3>
                            <p className="text-gray-300">Falling back to gradient background</p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

function App() {
    const [currentSection, setCurrentSection] = useState('home');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showAITerminal, setShowAITerminal] = useState(false);
    const [easterEggs, setEasterEggs] = useState([]);
    const [threeJSError, setThreeJSError] = useState(false);

    // Easter egg detection
    useEffect(() => {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        let konamiIndex = 0;

        const handleKeyDown = (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    setEasterEggs(prev => [...prev, 'konami']);
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setCurrentSection(sectionId);
        }
    };

    return (
        <StrictMode>
            <div className={`min-h-screen transition-colors duration-1000 ${isDarkMode
                ? 'bg-neural-darker text-white'
                : 'bg-gradient-to-br from-blue-50 to-purple-100 text-gray-900'
                }`}>
                {/* 3D Background */}
                {!threeJSError ? (
                    <ThreeJSErrorBoundary>
                        <div className="fixed inset-0 -z-10">
                            <Canvas
                                camera={{ position: [0, 0, 5], fov: 75 }}
                                onError={(error) => {
                                    console.log('Canvas error:', error);
                                    setThreeJSError(true);
                                }}
                            >
                                <Suspense fallback={null}>
                                    <ambientLight intensity={0.1} />
                                    <pointLight position={[10, 10, 10]} intensity={0.5} />
                                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                                    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                                        <mesh position={[-5, 2, -10]}>
                                            <octahedronGeometry args={[1, 0]} />
                                            <meshStandardMaterial color="#00F5FF" wireframe />
                                        </mesh>
                                    </Float>
                                    <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                                        <mesh position={[5, -2, -8]}>
                                            <icosahedronGeometry args={[0.8, 0]} />
                                            <meshStandardMaterial color="#8B5CF6" wireframe />
                                        </mesh>
                                    </Float>
                                    <Float speed={1} rotationIntensity={1.5} floatIntensity={2.5}>
                                        <mesh position={[0, 4, -12]}>
                                            <tetrahedronGeometry args={[1.2, 0]} />
                                            <meshStandardMaterial color="#00FF00" wireframe />
                                        </mesh>
                                    </Float>
                                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                                </Suspense>
                            </Canvas>
                        </div>
                    </ThreeJSErrorBoundary>
                ) : (
                    // Fallback when Three.js fails
                    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900">
                        <div className="absolute inset-0 bg-dots-pattern bg-dots opacity-20"></div>
                    </div>
                )}

                {/* Navigation */}
                <Navigation
                    currentSection={currentSection}
                    isDarkMode={isDarkMode}
                    onThemeToggle={toggleTheme}
                    onSectionChange={scrollToSection}
                    onAITerminalToggle={() => setShowAITerminal(!showAITerminal)}
                />

                {/* Main Content */}
                <main className="relative z-10">
                    {/* Hero Section */}
                    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
                        <Hero isDarkMode={isDarkMode} />
                    </section>

                    {/* About Section */}
                    <section id="about" className="min-h-screen py-20 relative">
                        <About isDarkMode={isDarkMode} />
                    </section>

                    {/* Skills Section */}
                    <section id="skills" className="min-h-screen py-20 relative">
                        <Skills isDarkMode={isDarkMode} />
                    </section>

                    {/* Projects Section */}
                    <section id="projects" className="min-h-screen py-20 relative">
                        <Projects isDarkMode={isDarkMode} />
                    </section>

                    {/* Experience Section */}
                    <section id="experience" className="min-h-screen py-20 relative">
                        <Experience isDarkMode={isDarkMode} />
                    </section>

                    {/* Contact Section */}
                    <section id="contact" className="min-h-screen py-20 relative">
                        <Contact isDarkMode={isDarkMode} />
                    </section>
                </main>

                {/* AI Terminal */}
                <AnimatePresence>
                    {showAITerminal && (
                        <AITerminal
                            isOpen={showAITerminal}
                            onClose={() => setShowAITerminal(false)}
                            isDarkMode={isDarkMode}
                        />
                    )}
                </AnimatePresence>

                {/* Easter Egg System */}
                <EasterEggSystem
                    easterEggs={easterEggs}
                    isDarkMode={isDarkMode}
                />

                {/* Scroll Progress Indicator */}
                <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
                    <div className="flex flex-col space-y-2">
                        {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSection === section
                                    ? 'bg-cyber-blue scale-125 shadow-lg shadow-cyber-blue/50'
                                    : 'bg-gray-500 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </StrictMode>
    );
}

export default App;
