import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Text, 
  Stars, 
  Float, 
  Sparkles,
  Sphere
} from '@react-three/drei';
import * as THREE from 'three';

// Custom Shaders
const DNAVertexShader = `
  uniform float time;
  uniform float consciousness;
  uniform float glitchIntensity;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;
    
    vec3 pos = position;
    
    // DNA helix deformation
    float twist = sin(pos.y * 0.5 + time) * consciousness * 0.3;
    pos.x += sin(twist) * 0.2;
    pos.z += cos(twist) * 0.2;
    
    // Glitch effect
    if (glitchIntensity > 0.5) {
      pos += normal * sin(time * 10.0 + pos.x * 5.0) * glitchIntensity * 0.1;
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const DNAFragmentShader = `
  uniform float time;
  uniform float consciousness;
  uniform float glitchIntensity;
  uniform vec3 color1;
  uniform vec3 color2;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    // Consciousness-based color mixing
    vec3 baseColor = mix(color1, color2, consciousness);
    
    // Glitch color distortion
    if (glitchIntensity > 0.3) {
      baseColor.r += sin(vPosition.x * 10.0 + time * 5.0) * glitchIntensity * 0.5;
      baseColor.g += sin(vPosition.y * 15.0 + time * 3.0) * glitchIntensity * 0.3;
    }
    
    // Fresnel glow effect
    float fresnel = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
    float glow = pow(fresnel, 2.0) * consciousness;
    
    // Pulsing intensity
    float pulse = sin(time * 2.0) * 0.5 + 0.5;
    float intensity = 0.8 + pulse * consciousness * 0.4;
    
    vec3 finalColor = baseColor * intensity + glow * 0.5;
    float alpha = 0.8 + glow * 0.2;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// DNA Helix Component
const DNAHelix = ({ consciousness, phase }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const [glitchActive, setGlitchActive] = useState(false);

  // Random glitch activation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.consciousness.value = consciousness;
      materialRef.current.uniforms.glitchIntensity.value = glitchActive ? 1.0 : 0.0;
    }
  });

  return (
    <group ref={meshRef}>
      {/* DNA Double Helix */}
      {[...Array(20)].map((_, i) => {
        const y = (i - 10) * 0.3;
        const angle1 = (i * Math.PI) / 5;
        const angle2 = angle1 + Math.PI;
        
        return (
          <group key={i}>
            {/* First strand */}
            <mesh position={[Math.cos(angle1) * 1.5, y, Math.sin(angle1) * 1.5]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <shaderMaterial
                ref={materialRef}
                vertexShader={DNAVertexShader}
                fragmentShader={DNAFragmentShader}
                uniforms={{
                  time: { value: 0 },
                  consciousness: { value: consciousness },
                  glitchIntensity: { value: 0 },
                  color1: { value: new THREE.Color('#0066ff') },
                  color2: { value: new THREE.Color('#8a2be2') }
                }}
                transparent
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            
            {/* Second strand */}
            <mesh position={[Math.cos(angle2) * 1.5, y, Math.sin(angle2) * 1.5]}>
              <sphereGeometry args={[0.1, 8, 8]} />
              <shaderMaterial
                vertexShader={DNAVertexShader}
                fragmentShader={DNAFragmentShader}
                uniforms={{
                  time: { value: 0 },
                  consciousness: { value: consciousness },
                  glitchIntensity: { value: 0 },
                  color1: { value: new THREE.Color('#00ffff') },
                  color2: { value: new THREE.Color('#ff00ff') }
                }}
                transparent
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            
            {/* Connecting base pairs */}
            <mesh 
              position={[0, y, 0]} 
              rotation={[0, angle1, Math.PI / 2]}
              scale={[3, 0.05, 0.05]}
            >
              <boxGeometry />
              <meshBasicMaterial 
                color={consciousness > 0.5 ? '#ff00ff' : '#00ffff'} 
                transparent 
                opacity={0.6}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// Particle System Component
const ParticleNeurons = ({ consciousness, triggerNeurons }) => {
  const particlesRef = useRef();
  const neuronsRef = useRef();
  const [showNeurons, setShowNeurons] = useState(false);

  useEffect(() => {
    if (triggerNeurons) {
      setShowNeurons(true);
    }
  }, [triggerNeurons]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002;
      
      // Animate particles towards DNA
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.001;
        positions[i + 1] += Math.cos(state.clock.elapsedTime + i * 0.5) * 0.001;
        positions[i + 2] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.3) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Generate particle positions
  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const radius = 8 + Math.random() * 12;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    // Consciousness-based colors
    const intensity = consciousness;
    colors[i * 3] = intensity; // R
    colors[i * 3 + 1] = 0.5 + intensity * 0.5; // G
    colors[i * 3 + 2] = 1.0; // B
  }

  return (
    <group>
      {/* Floating Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Neuron Network */}
      {showNeurons && (
        <group ref={neuronsRef}>
          {[...Array(50)].map((_, i) => {
            const x = (Math.random() - 0.5) * 15;
            const y = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 15;
            
            return (
              <Float key={i} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh position={[x, y, z]}>
                  <sphereGeometry args={[0.05, 8, 8]} />
                  <meshBasicMaterial 
                    color="#00ffff" 
                    transparent 
                    opacity={0.8}
                  />
                </mesh>
              </Float>
            );
          })}
        </group>
      )}
    </group>
  );
};

// Animated Text Component
const AnimatedText = ({ consciousness, textFormed, setTextFormed }) => {
  const textRef = useRef();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles that will form the text
    const textParticles = [];
    const text = "OUSSAMA.MIND";
    
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== ' ') {
        textParticles.push({
          char: text[i],
          targetX: (i - text.length / 2) * 0.8,
          targetY: 0,
          currentX: (Math.random() - 0.5) * 20,
          currentY: (Math.random() - 0.5) * 20,
          formed: false
        });
      }
    }
    setParticles(textParticles);
  }, []);

  useFrame((state, delta) => {
    if (consciousness > 0.3 && !textFormed) {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        currentX: THREE.MathUtils.lerp(particle.currentX, particle.targetX, delta * 2),
        currentY: THREE.MathUtils.lerp(particle.currentY, particle.targetY, delta * 2),
        formed: Math.abs(particle.currentX - particle.targetX) < 0.1
      })));

      // Check if all particles have formed the text
      const allFormed = particles.every(p => p.formed);
      if (allFormed && !textFormed) {
        setTextFormed(true);
      }
    }
  });

  return (
    <group>
      {particles.map((particle, i) => (
        <Float key={i} speed={1} rotationIntensity={0.1}>
          <Text
            position={[particle.currentX, particle.currentY, 2]}
            fontSize={0.8}
            color={consciousness > 0.7 ? "#ff00ff" : "#00ffff"}
            anchorX="center"
            anchorY="middle"
            font="/fonts/orbitron-black.woff"
          >
            {particle.char}
          </Text>
        </Float>
      ))}
      
      {textFormed && (
        <Text
          ref={textRef}
          position={[0, 0, 2]}
          fontSize={1.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/orbitron-black.woff"
        >
          OUSSAMA.MIND
          <meshBasicMaterial 
            color="#ffffff"
            transparent
            opacity={0.9}
          />
        </Text>
      )}
    </group>
  );
};

// HUD Component
const HUD = ({ consciousness, phase, state }) => {
  return (
    <div className="fixed top-6 right-6 z-50 bg-black/20 backdrop-blur-md border border-cyan-400/30 rounded-lg p-4 font-mono text-sm">
      <div className="mb-3">
        <div className="text-cyan-400 mb-1">CONSCIOUSNESS</div>
        <div className="flex items-center">
          <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden mr-2">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300"
              style={{ width: `${consciousness * 100}%` }}
            />
          </div>
          <span className="text-white">{Math.round(consciousness * 100)}%</span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="text-cyan-400 mb-1">PHASE</div>
        <div className="text-white">{phase}</div>
      </div>
      
      <div>
        <div className="text-cyan-400 mb-1">STATE</div>
        <div className="text-white">{state}</div>
      </div>
      
      <div className="mt-4 text-xs text-gray-400">
        Genesis of Digital Mind v2.1
      </div>
    </div>
  );
};

// Loading Component
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-40">
    <div className="text-center">
      <div className="text-4xl font-mono text-cyan-400 mb-4">OUSSAMA.MIND</div>
      <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse" />
      </div>
      <div className="text-sm text-gray-400 mt-2 font-mono">Initializing consciousness...</div>
    </div>
  </div>
);

// Main Scene Component
const Scene = ({ consciousness, phase, state, triggerNeurons }) => {
  const [textFormed, setTextFormed] = useState(false);

  return (
    <>
      {/* Environment */}
      <Stars radius={300} depth={60} count={3000} factor={5} saturation={0} fade />
      
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={consciousness * 2} color="#0066ff" />
      <pointLight position={[-10, -10, 10]} intensity={consciousness * 1.5} color="#8a2be2" />
      <spotLight
        position={[0, 20, 0]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={consciousness * 2}
        color="#00ffff"
      />
      
      {/* DNA Structure */}
      <DNAHelix consciousness={consciousness} />
      
      {/* Particle System */}
      <ParticleNeurons consciousness={consciousness} triggerNeurons={triggerNeurons} />
      
      {/* Animated Title */}
      <AnimatedText 
        consciousness={consciousness} 
        textFormed={textFormed}
        setTextFormed={setTextFormed}
      />
      
      {/* Sparkles */}
      <Sparkles 
        count={150} 
        scale={[15, 15, 15]} 
        size={3} 
        speed={0.3}
        opacity={consciousness * 0.8}
        color="#00ffff"
      />
    </>
  );
};

// Main Genesis Hero Component
const GenesisHero = () => {
  const [consciousness, setConsciousness] = useState(0.1);
  const [phase, setPhase] = useState("DORMANT");
  const [state, setState] = useState("INITIALIZING");
  const [triggerNeurons, setTriggerNeurons] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      setPhase("AWAKENING");
      setState("CALM");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle scroll interactions
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;
      const scrollPercent = Math.min(scrollY / maxScroll, 1);
      
      setConsciousness(0.1 + scrollPercent * 0.9);
      
      if (scrollPercent > 0.2) {
        setPhase("EVOLVING");
        setState("ACTIVE");
      }
      
      if (scrollPercent > 0.5) {
        setPhase("TRANSCENDING");
        setState("ELEVATED");
        setTriggerNeurons(true);
      }
      
      if (scrollPercent > 0.8) {
        setPhase("GENESIS COMPLETE");
        setState("ENLIGHTENED");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {loading && <LoadingScreen />}
      
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: false,
          powerPreference: "high-performance"
        }}
        shadows
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Scene 
            consciousness={consciousness}
            phase={phase}
            state={state}
            triggerNeurons={triggerNeurons}
          />
        </Suspense>
      </Canvas>
      
      {/* HUD Overlay */}
      {!loading && (
        <HUD 
          consciousness={consciousness} 
          phase={phase} 
          state={state} 
        />
      )}
      
      {/* Center Title (fallback for text formation) */}
      {!loading && consciousness < 0.3 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1 className="text-6xl md:text-8xl font-mono font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
            OUSSAMA.MIND
          </h1>
        </div>
      )}
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-cyan-400 animate-pulse">
        <div className="text-sm font-mono mb-2">SCROLL TO EVOLVE</div>
        <div className="w-1 h-12 border border-cyan-400 rounded-full mx-auto relative">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default GenesisHero;
