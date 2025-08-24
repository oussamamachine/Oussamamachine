import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const MagicalBrain = ({ consciousness = 0.5, isActive = true }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const brainRef = useRef(null);
  const particlesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Create brain geometry - organic neural structure
    const createBrainGeometry = () => {
      const group = new THREE.Group();
      
      // Main brain sphere with displacement for organic look
      const brainGeometry = new THREE.SphereGeometry(1.2, 64, 64);
      const brainMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          consciousness: { value: consciousness },
          mousePos: { value: new THREE.Vector2(0, 0) },
          pulse: { value: 1.0 }
        },
        vertexShader: `
          uniform float time;
          uniform float consciousness;
          uniform vec2 mousePos;
          varying vec3 vPosition;
          varying vec3 vNormal;
          varying float vDisplacement;
          
          void main() {
            vPosition = position;
            vNormal = normal;
            
            // Neural activity displacement
            float displacement = sin(position.x * 4.0 + time * 2.0) * 0.05 +
                               sin(position.y * 6.0 + time * 1.5) * 0.03 +
                               sin(position.z * 8.0 + time * 2.5) * 0.02;
            
            // Mouse interaction
            float mouseInfluence = smoothstep(0.5, 0.0, length(mousePos - position.xy * 0.5));
            displacement += mouseInfluence * 0.15;
            
            vDisplacement = displacement * consciousness;
            
            vec3 newPosition = position + normal * vDisplacement;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform float consciousness;
          uniform float pulse;
          varying vec3 vPosition;
          varying vec3 vNormal;
          varying float vDisplacement;
          
          void main() {
            // Neural patterns
            float neural = sin(vPosition.x * 8.0 + time) * 0.5 + 0.5;
            float synaptic = sin(vPosition.y * 12.0 + time * 1.5) * 0.5 + 0.5;
            float dendrite = sin(vPosition.z * 16.0 + time * 2.0) * 0.5 + 0.5;
            
            // Consciousness glow
            float consciousness_glow = consciousness * pulse;
            
            // Color mixing based on neural activity
            vec3 brainColor = mix(
              vec3(0.1, 0.2, 0.8), // Deep blue
              vec3(0.0, 1.0, 1.0), // Cyan
              neural * consciousness_glow
            );
            
            brainColor = mix(
              brainColor,
              vec3(0.8, 0.2, 1.0), // Purple
              synaptic * consciousness_glow
            );
            
            brainColor = mix(
              brainColor,
              vec3(1.0, 0.4, 0.8), // Pink
              dendrite * consciousness_glow
            );
            
            // Edge glow effect
            float fresnel = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
            float glow = pow(fresnel, 2.0) * consciousness_glow;
            
            float alpha = 0.7 + glow * 0.3 + abs(vDisplacement) * 2.0;
            
            gl_FragColor = vec4(brainColor + glow * 0.5, alpha);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide
      });

      const brainMesh = new THREE.Mesh(brainGeometry, brainMaterial);
      group.add(brainMesh);
      brainRef.current = brainMaterial;

      // Neural connections - synaptic web
      const connectionGeometry = new THREE.BufferGeometry();
      const connectionCount = 500;
      const positions = new Float32Array(connectionCount * 6); // 2 points per line
      const colors = new Float32Array(connectionCount * 6); // RGB for each point

      for (let i = 0; i < connectionCount; i++) {
        // Random points on sphere surface
        const phi1 = Math.random() * Math.PI * 2;
        const theta1 = Math.random() * Math.PI;
        const r1 = 1.3;

        const phi2 = phi1 + (Math.random() - 0.5) * 0.5;
        const theta2 = theta1 + (Math.random() - 0.5) * 0.5;
        const r2 = 1.3;

        const x1 = r1 * Math.sin(theta1) * Math.cos(phi1);
        const y1 = r1 * Math.sin(theta1) * Math.sin(phi1);
        const z1 = r1 * Math.cos(theta1);

        const x2 = r2 * Math.sin(theta2) * Math.cos(phi2);
        const y2 = r2 * Math.sin(theta2) * Math.sin(phi2);
        const z2 = r2 * Math.cos(theta2);

        positions[i * 6] = x1;
        positions[i * 6 + 1] = y1;
        positions[i * 6 + 2] = z1;
        positions[i * 6 + 3] = x2;
        positions[i * 6 + 4] = y2;
        positions[i * 6 + 5] = z2;

        // Neural colors
        const intensity = Math.random();
        colors[i * 6] = 0.0;
        colors[i * 6 + 1] = intensity;
        colors[i * 6 + 2] = 1.0;
        colors[i * 6 + 3] = 1.0;
        colors[i * 6 + 4] = intensity * 0.5;
        colors[i * 6 + 5] = 0.8;
      }

      connectionGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      connectionGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const connectionMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial);
      group.add(connections);

      return group;
    };

    // Create floating thought particles
    const createThoughtParticles = () => {
      const particleCount = 200;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        // Random position around brain
        const radius = 2 + Math.random() * 3;
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;

        positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
        positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positions[i * 3 + 2] = radius * Math.cos(theta);

        // Thought colors
        const thoughtType = Math.random();
        if (thoughtType < 0.33) {
          colors[i * 3] = 0.0; // R
          colors[i * 3 + 1] = 1.0; // G
          colors[i * 3 + 2] = 1.0; // B - Cyan thoughts
        } else if (thoughtType < 0.66) {
          colors[i * 3] = 1.0; // R
          colors[i * 3 + 1] = 0.4; // G
          colors[i * 3 + 2] = 0.8; // B - Pink thoughts
        } else {
          colors[i * 3] = 0.8; // R
          colors[i * 3 + 1] = 0.2; // G
          colors[i * 3 + 2] = 1.0; // B - Purple thoughts
        }

        sizes[i] = Math.random() * 0.02 + 0.01;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          attribute float size;
          uniform float time;
          varying vec3 vColor;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Floating animation
            mvPosition.y += sin(time + position.x * 3.0) * 0.1;
            mvPosition.x += cos(time + position.z * 2.0) * 0.05;
            
            gl_PointSize = size * 300.0 * (1.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            float distance = length(gl_PointCoord - vec2(0.5));
            float alpha = 1.0 - smoothstep(0.3, 0.5, distance);
            
            gl_FragColor = vec4(vColor, alpha * 0.8);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      particlesRef.current = material;
      return particles;
    };

    // Create the complete magical brain
    const brainGroup = createBrainGeometry();
    const thoughtParticles = createThoughtParticles();
    
    scene.add(brainGroup);
    scene.add(thoughtParticles);

    // Position camera
    camera.position.z = 3;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff00ff, 0.8, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Mouse interaction
    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    mountRef.current.addEventListener('mousemove', handleMouseMove);

    // Store current ref for cleanup
    const currentMount = mountRef.current;

    // Animation loop
    const animate = () => {
      if (!isActive) return;
      
      const time = Date.now() * 0.001;

      // Update brain shader
      if (brainRef.current) {
        brainRef.current.uniforms.time.value = time;
        brainRef.current.uniforms.consciousness.value = consciousness;
        brainRef.current.uniforms.mousePos.value.set(mouseRef.current.x, mouseRef.current.y);
        brainRef.current.uniforms.pulse.value = 1.0 + Math.sin(time * 2) * 0.3;
      }

      // Update particles
      if (particlesRef.current) {
        particlesRef.current.uniforms.time.value = time;
      }

      // Rotate the entire brain
      brainGroup.rotation.y = time * 0.2;
      brainGroup.rotation.x = Math.sin(time * 0.3) * 0.1;

      // Gentle floating motion
      brainGroup.position.y = Math.sin(time * 0.8) * 0.1;

      // Particle rotation
      thoughtParticles.rotation.y = time * 0.1;
      thoughtParticles.rotation.x = time * 0.05;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
        currentMount.removeEventListener('mousemove', handleMouseMove);
      }
      renderer.dispose();
    };
  }, [consciousness, isActive]);

  return (
    <div 
      ref={mountRef} 
      className="magical-brain-container"
      style={{
        width: '400px',
        height: '400px',
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1s ease-in-out'
      }}
    />
  );
};

export default MagicalBrain;
