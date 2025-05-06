import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Group, Object3D } from 'three'

// Create a loader singleton to avoid recreating it
const fbxLoader = new FBXLoader();

export function ShortsModel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    // Early return if already initialized
    if (rendererRef.current) return

    // Setup with reduced quality for faster loading
    const scene = new THREE.Scene()
    scene.background = null // Make background transparent
    sceneRef.current = scene

    // Camera with reduced quality
    const camera = new THREE.PerspectiveCamera(50, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 100)
    camera.position.set(3, 2, 3)
    camera.lookAt(0, 0, 0)

    // Renderer with lower quality settings for faster rendering
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable antialiasing for performance
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.shadowMap.enabled = false // Disable shadows for initial load
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping // Simpler tone mapping
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer
    
    // Simpler lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2)
    scene.add(ambientLight)

    // Just one directional light for better performance
    const keyLight = new THREE.DirectionalLight(0xffffff, 4)
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)
    
    // Simplified controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 2
    controls.maxDistance = 10
    controls.autoRotate = true
    controls.autoRotateSpeed = 1.0
    controls.target.set(0, 0.5, 0)
    controls.update()
    
    // Load FBX model with progress tracking
    fbxLoader.load(
      '/shorts.fbx',
      (fbx: Group) => {
        // Center the model
        const box = new THREE.Box3().setFromObject(fbx)
        const center = box.getCenter(new THREE.Vector3())
        fbx.position.sub(center)
        fbx.position.y += 1
        
        // Scale the model
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2 / maxDim
        fbx.scale.setScalar(scale)
        
        // Rotate to face camera
        fbx.rotation.y = Math.PI / 4
        
        // Simplified material application - one material for all meshes
        const material = new THREE.MeshPhysicalMaterial({
          color: 0x1D4ED8,
          metalness: 0.2,
          roughness: 0.4,
          clearcoat: 0.5,
          emissive: 0x10B981,
          emissiveIntensity: 0.2,
        })
        
        fbx.traverse((child: Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.material = material
          }
        })

        scene.add(fbx)
        
        // Gradually enable better quality after model loads
        setTimeout(() => {
          if (rendererRef.current) {
            rendererRef.current.shadowMap.enabled = true;
            rendererRef.current.toneMapping = THREE.ACESFilmicToneMapping;
          }
        }, 500);
        
        setLoading(false)
      },
      (xhr) => {
        const percent = xhr.loaded / (xhr.total || 1) * 100
        setLoadingProgress(Math.min(percent, 99))
      },
      (error) => {
        console.error('Error loading model:', error)
        setError('Failed to load 3D model')
        setLoading(false)
      }
    )

    // Simplified animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()
    
    // Handle window resize - throttled
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!containerRef.current || !rendererRef.current) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
        rendererRef.current.setSize(width, height)
      }, 250);
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId);
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
        rendererRef.current = null
      }
      
      // Clear the scene
      if (sceneRef.current) {
        sceneRef.current.clear()
        sceneRef.current = null
      }
    }
  }, [])

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface/30 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto mb-2"></div>
            <div className="text-textSecondary text-sm">{loadingProgress.toFixed(0)}%</div>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface/60">
          <div className="text-red-500 p-4 rounded-lg bg-surface shadow-lg">{error}</div>
        </div>
      )}
    </div>
  )
}