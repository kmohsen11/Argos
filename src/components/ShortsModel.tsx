import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Group, Object3D } from 'three'

export function ShortsModel() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#111')

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    containerRef.current.appendChild(renderer.domElement)

    // Try to add environment map for reflections
    try {
      const envMapLoader = new THREE.CubeTextureLoader();
      envMapLoader.setPath('/envmap/');
      
      // Try to load the environment map
      envMapLoader.load(
        ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
        (texture) => {
          texture.mapping = THREE.CubeReflectionMapping;
          scene.environment = texture;
        },
        undefined,
        (error) => {
          console.warn('Failed to load environment map:', error);
          // Create a simple color environment as fallback
          scene.background = new THREE.Color(0x111111);
          scene.fog = new THREE.FogExp2(0x111111, 0.05);
          
          // Add more colored lights instead of environment map
          const backLight = new THREE.DirectionalLight(0x9370db, 0.5);
          backLight.position.set(-5, 5, -5);
          scene.add(backLight);
          
          const fillLight = new THREE.DirectionalLight(0x4b0082, 0.3);
          fillLight.position.set(5, -5, -5);
          scene.add(fillLight);
        }
      );
    } catch (error) {
      console.warn('Error setting up environment map:', error);
    }

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 3
    controls.maxDistance = 10

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Load FBX model
    const loader = new FBXLoader()
    loader.load(
      '/shorts.fbx',
      (fbx: Group) => {
        // Center the model
        const box = new THREE.Box3().setFromObject(fbx)
        const center = box.getCenter(new THREE.Vector3())
        fbx.position.sub(center)
        
        // Scale the model appropriately
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2 / maxDim
        fbx.scale.setScalar(scale)

        // Add materials
        fbx.traverse((child: Object3D) => {
          if (child instanceof THREE.Mesh) {
            // Apply a colorful material even without texture
            const material = new THREE.MeshPhysicalMaterial({
              color: 0x6a0dad, // Purple base color
              roughness: 0.3,
              metalness: 0.5,
              emissive: 0x2b0080, // Slight emissive glow
              emissiveIntensity: 0.2,
              envMapIntensity: 0.8,
              clearcoat: 0.3,
              clearcoatRoughness: 0.2,
            });
            
            // Try to load gradient texture
            new THREE.TextureLoader().load(
              '/gradient.png', 
              (texture) => {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                material.map = texture;
                material.needsUpdate = true;
              },
              undefined,
              (error) => {
                console.warn('Failed to load gradient texture:', error);
                // Create a procedural gradient texture as fallback
                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 512;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  const gradient = ctx.createLinearGradient(0, 0, 0, 512);
                  gradient.addColorStop(0, '#6a0dad');  // Purple at top
                  gradient.addColorStop(0.5, '#9370db'); // Medium purple in middle
                  gradient.addColorStop(1, '#4b0082');  // Indigo at bottom
                  
                  ctx.fillStyle = gradient;
                  ctx.fillRect(0, 0, 512, 512);
                  
                  const fallbackTexture = new THREE.CanvasTexture(canvas);
                  material.map = fallbackTexture;
                  material.needsUpdate = true;
                }
              }
            );
            
            // Try to load normal map for added detail
            new THREE.TextureLoader().load(
              '/normal.jpg',
              (texture) => {
                material.normalMap = texture;
                material.normalScale.set(0.5, 0.5);
                material.needsUpdate = true;
              },
              undefined,
              (error) => {
                console.warn('Failed to load normal map:', error);
                // Create a simple noise normal map as fallback
                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 512;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                  // Simple noise pattern
                  for (let y = 0; y < canvas.height; y++) {
                    for (let x = 0; x < canvas.width; x++) {
                      const r = Math.floor(Math.random() * 10) + 120;
                      const g = Math.floor(Math.random() * 10) + 120;
                      const b = 255;
                      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                      ctx.fillRect(x, y, 1, 1);
                    }
                  }
                  const normalTexture = new THREE.CanvasTexture(canvas);
                  material.normalMap = normalTexture;
                  material.normalScale.set(0.1, 0.1);
                  material.needsUpdate = true;
                }
              }
            );
            
            child.material = material;
            
            // Add a second directional light with color for highlights
            const highlightLight = new THREE.DirectionalLight(0x9370db, 0.8);
            highlightLight.position.set(-5, 3, -5);
            scene.add(highlightLight);
            
            child.castShadow = true;
            child.receiveShadow = true;
          }
        })

        scene.add(fbx)
      },
      (progress: { loaded: number; total: number }) => {
        console.log('Loading progress:', (progress.loaded / progress.total) * 100, '%')
      },
      (err: unknown) => {
        console.error('Error loading model:', err)
      }
    )

    // Animation
    let frameId: number
    let hue = 0;
    const colorShift = new THREE.Color();
    const baseColor = new THREE.Color(0x6a0dad);
    
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      
      // Slowly shift the hue for a subtle color animation
      hue = (hue + 0.001) % 1;
      colorShift.setHSL(hue, 0.7, 0.5);
      
      // Apply the color shift to all mesh materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh && 
            (object.material instanceof THREE.MeshStandardMaterial || 
             object.material instanceof THREE.MeshPhysicalMaterial)) {
          // Blend between base color and shifting color
          object.material.color.copy(baseColor).lerp(colorShift, 0.3);
          object.material.emissive.copy(colorShift).multiplyScalar(0.2);
          object.material.needsUpdate = true;
        }
      });
      
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameId)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        background: '#111'
      }} 
    />
  )
}