import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Group, Object3D } from 'three'

export function ShortsModel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    console.log('Initializing 3D model container')

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = null // Make background transparent

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000)
    camera.position.set(3, 2, 3)
    camera.lookAt(0, 0, 0)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
    })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5
    renderer.setClearColor(0x000000, 0) // Make background transparent
    containerRef.current.appendChild(renderer.domElement)
    
    console.log('Renderer added to container')

    // Add colored lights for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 2)
    scene.add(ambientLight)

    // Add key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 4)
    keyLight.position.set(5, 5, 5)
    keyLight.castShadow = true
    scene.add(keyLight)
    
    // Add fill light
    const fillLight = new THREE.DirectionalLight(0x9370db, 3)
    fillLight.position.set(-5, 0, 5)
    scene.add(fillLight)
    
    // Add rim light
    const rimLight = new THREE.DirectionalLight(0x4b0082, 3)
    rimLight.position.set(0, 5, -5)
    scene.add(rimLight)

    // Add point lights for extra glow
    const pointLight1 = new THREE.PointLight(0xff00ff, 1, 10)
    pointLight1.position.set(2, 2, 2)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x00ffff, 1, 10)
    pointLight2.position.set(-2, -2, -2)
    scene.add(pointLight2)
    
    console.log('Lights added to scene')

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 2
    controls.maxDistance = 10
    controls.autoRotate = true
    controls.autoRotateSpeed = 2.0
    controls.target.set(0, 0.5, 0) // Look at center of shorts
    controls.update()
    
    console.log('Controls initialized')

    // Load FBX model
    const loader = new FBXLoader()
    console.log('Starting to load model from /shorts.fbx')
    
    loader.load(
      '/shorts.fbx',
      (fbx: Group) => {
        console.log('Model loaded successfully', fbx)
        
        // Center the model
        const box = new THREE.Box3().setFromObject(fbx)
        const center = box.getCenter(new THREE.Vector3())
        fbx.position.sub(center)
        fbx.position.y += 1 // Raise shorts up a bit
        
        // Scale the model appropriately
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2 / maxDim
        fbx.scale.setScalar(scale)
        
        // Rotate to face camera
        fbx.rotation.y = Math.PI / 4
        
        console.log('Model centered and scaled', { center, size, scale })

        // Add materials
        fbx.traverse((child: Object3D) => {
          if (child instanceof THREE.Mesh) {
            console.log('Applying material to mesh', child)
            const material = new THREE.MeshPhysicalMaterial({
              color: 0x9370db,
              metalness: 0.2,
              roughness: 0.4,
              clearcoat: 0.8,
              clearcoatRoughness: 0.2,
              emissive: 0x330033,
              emissiveIntensity: 0.5,
            })
            child.material = material
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        scene.add(fbx)
        console.log('Model added to scene')
        setLoading(false)
      },
      (xhr) => {
        const percent = (xhr.loaded / xhr.total) * 100
        console.log(`Loading model: ${percent.toFixed(2)}% loaded`)
      },
      (error) => {
        console.error('Error loading model:', error)
        setError('Failed to load 3D model')
        setLoading(false)
      }
    )

    // Animation loop with glowing effect
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Animate point lights
      const time = Date.now() * 0.001
      pointLight1.position.x = Math.sin(time) * 3
      pointLight1.position.z = Math.cos(time) * 3
      pointLight2.position.x = Math.sin(time + Math.PI) * 3
      pointLight2.position.z = Math.cos(time + Math.PI) * 3
      
      controls.update()
      renderer.render(scene, camera)
    }
    animate()
    
    console.log('Animation loop started')

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div className="w-full h-full relative">
      <div ref={containerRef} className="w-full h-full" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-purple-400 animate-pulse">Loading</div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-red-400">{error}</div>
        </div>
      )}
    </div>
  )
}