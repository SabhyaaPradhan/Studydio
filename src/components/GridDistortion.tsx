'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './GridDistortion.css';

const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
}`;

const GridDistortion = ({ grid = 15, mouse = 0.1, strength = 0.15, relaxation = 0.9, imageSrc, className = '' }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const imageAspectRef = useRef(1);
  const animationIdRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!containerRef.current || !imageSrc) return;

    const container = containerRef.current as HTMLDivElement;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    
    // Clear previous content and append new renderer
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- Camera Setup ---
    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;
    
    // --- Uniforms and Shaders ---
    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uTexture: { value: null as THREE.Texture | null },
      uDataTexture: { value: null as THREE.DataTexture | null }
    };
    
    // --- Data Texture for distortion ---
    const size = grid;
    const data = new Float32Array(4 * size * size);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = Math.random() * 255 - 125;
      data[i * 4 + 1] = Math.random() * 255 - 125;
    }

    const dataTexture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat, THREE.FloatType);
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;

    // --- Material and Geometry ---
    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true
    });
    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
    const plane = new THREE.Mesh(geometry, material);
    planeRef.current = plane;
    scene.add(plane);

    // --- Texture Loading ---
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, texture => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      imageAspectRef.current = texture.image.width / texture.image.height;
      uniforms.uTexture.value = texture;
      handleResize(); // Initial resize after texture loads
    }, undefined, (err) => {
        console.error('An error occurred loading the texture:', err);
    });


    // --- Resize Handling ---
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current || !planeRef.current) return;

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) return;

      const containerAspect = width / height;
      const imageAspect = imageAspectRef.current;
      
      rendererRef.current.setSize(width, height);
      
      let planeScaleX = width;
      let planeScaleY = height;
      
      if (containerAspect > imageAspect) {
        // Container is wider than the image
        planeScaleY = width / imageAspect;
      } else {
        // Container is taller than the image
        planeScaleX = height * imageAspect;
      }
      
      planeRef.current.scale.set(planeScaleX, planeScaleY, 1);
      
      cameraRef.current.left = -width / 2;
      cameraRef.current.right = width / 2;
      cameraRef.current.top = height / 2;
      cameraRef.current.bottom = -height / 2;
      cameraRef.current.updateProjectionMatrix();

      uniforms.resolution.value.set(width, height, 1, 1);
    };

    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
      resizeObserverRef.current = resizeObserver;
    } else {
      window.addEventListener('resize', handleResize);
    }

    // --- Mouse Interaction ---
    const mouseState = {
      x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      mouseState.vX = x - mouseState.prevX;
      mouseState.vY = y - mouseState.prevY;
      Object.assign(mouseState, { x, y, prevX: x, prevY: y });
    };

    const handleMouseLeave = () => {
        if (dataTexture) dataTexture.needsUpdate = true;
        Object.assign(mouseState, { x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    handleResize(); // Initial call

    // --- Animation Loop ---
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !uniforms.uDataTexture.value) return;

      uniforms.time.value += 0.05;

      const dataTex = uniforms.uDataTexture.value;
      const dataArr = dataTex.image.data;

      for (let i = 0; i < size * size; i++) {
        dataArr[i * 4] *= relaxation;
        dataArr[i * 4 + 1] *= relaxation;
      }

      const gridMouseX = size * mouseState.x;
      const gridMouseY = size * mouseState.y;
      const maxDist = size * mouse;

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const distSq = Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2);
          if (distSq < maxDist * maxDist) {
            const index = 4 * (i + size * j);
            const power = Math.min(maxDist / Math.sqrt(distSq), 10);
            dataArr[index] += strength * 100 * mouseState.vX * power;
            dataArr[index + 1] -= strength * 100 * mouseState.vY * power;
          }
        }
      }

      dataTex.needsUpdate = true;
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // --- Cleanup ---
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      else window.removeEventListener('resize', handleResize);

      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      // Dispose Three.js objects
      if(rendererRef.current) {
          rendererRef.current.dispose();
          if (container && container.contains(rendererRef.current.domElement)) {
              container.removeChild(rendererRef.current.domElement);
          }
      }
      geometry.dispose();
      material.dispose();
      dataTexture.dispose();
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();
    };
  }, [grid, mouse, strength, relaxation, imageSrc]);

  return (
    <div
      ref={containerRef}
      className={`distortion-container ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minWidth: '0',
        minHeight: '0',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0
      }}
    />
  );
};

export default GridDistortion;
