import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import {OrbitControls} from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import CannonDebugger from 'cannon-es-debugger'

      const plane = require('plane.js')

      let camera, scene, renderer
      let movementPlane
      let clickMarker
      let raycaster
      let cubeMesh

      // cannon.js variables
      let world
      let jointBody
      let jointConstraint 
      let cubeBody

      let isDragging = false

      // To be synced
      const meshes = []
      const bodies = []

      initThree()
      const controls = new OrbitControls( camera, renderer.domElement );
      initCannon()
      const cannonDebugger = new CannonDebugger(scene, world)

      animate()

      function initThree() {
        // Camera
        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.5, 1000)
        camera.position.set(0, 2, 10)

        // Scene
        scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0x000000, 500, 1000)

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(scene.fog.color)

        renderer.outputEncoding = THREE.sRGBEncoding

        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap

        document.body.appendChild(renderer.domElement)

        // Lights
        const ambientLight = new THREE.AmbientLight(0x666666)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
        const distance = 20
        directionalLight.position.set(-distance, distance, distance)

        directionalLight.castShadow = true

        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048

        directionalLight.shadow.camera.left = -distance
        directionalLight.shadow.camera.right = distance
        directionalLight.shadow.camera.top = distance
        directionalLight.shadow.camera.bottom = -distance

        directionalLight.shadow.camera.far = 3 * distance
        directionalLight.shadow.camera.near = distance

        scene.add(directionalLight)

        // Raycaster for mouse interaction
        raycaster = new THREE.Raycaster()

        // Floor
        const floorGeometry = new THREE.PlaneBufferGeometry(40, 40, 1, 1)
        floorGeometry.rotateX(-Math.PI / 2)
        const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x555577 })
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.position.set(0, -10, 0)
        floor.receiveShadow = true
        scene.add(floor)

        // Click marker to be shown on interaction
        const markerGeometry = new THREE.SphereBufferGeometry(0.1, 8, 8)
        const markerMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
        clickMarker = new THREE.Mesh(markerGeometry, markerMaterial)
        clickMarker.visible = false // Hide it..
        scene.add(clickMarker)

        // Cube
        const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1, 10, 10)
        const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x999999 })
        cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
        cubeMesh.castShadow = true
        meshes.push(cubeMesh)
        scene.add(cubeMesh)

        // Movement plane when dragging
        const planeGeometry = new THREE.PlaneBufferGeometry(100, 100)
        movementPlane = new THREE.Mesh(planeGeometry, floorMaterial)
        movementPlane.visible = false // Hide it..
        scene.add(movementPlane)

        window.addEventListener('resize', onWindowResize)
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      function initCannon() {
        // Setup world
        world = new CANNON.World()
        world.gravity.set(0, -10, 0)

        // Floor
        const floorShape0 = new CANNON.Plane()
        const floorBody0 = new CANNON.Body({ mass: 0 })
        floorBody0.addShape(floorShape0)
        floorBody0.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
        floorBody0.position.set(0, -10, 0)
        world.addBody(floorBody0)

        const floorShape10 = new CANNON.Plane()
        const floorBody10 = new CANNON.Body({ mass: 0 })
        floorBody10.addShape(floorShape10)
        floorBody10.quaternion.setFromEuler(Math.PI / 2, 0, 0)
        floorBody10.position.set(0, 30, 0)
        world.addBody(floorBody10)

        const floorShape1 = new CANNON.Plane()
        const floorBody1 = new CANNON.Body({ mass: 0 })
        floorBody1.addShape(floorShape1)
        floorBody1.quaternion.setFromEuler(0, -Math.PI / 2, 0)
        floorBody1.position.set(20, 10, 0)

        world.addBody(floorBody1)

        const floorShape12 = new CANNON.Plane()
        const floorBody12 = new CANNON.Body({ mass: 0 })
        floorBody12.addShape(floorShape12)
        floorBody12.quaternion.setFromEuler(0, Math.PI / 2, 0)
        floorBody12.position.set(-20, 10, 0)

        world.addBody(floorBody12)


        const floorShape21 = new CANNON.Plane()
        const floorBody21 = new CANNON.Body({ mass: 0 })
        floorBody21.addShape(floorShape21)
        floorBody21.quaternion.setFromEuler(0, 0, 0)
        floorBody21.position.set(0, 10, -20)

        world.addBody(floorBody21)

        const floorShape22 = new CANNON.Plane()
        const floorBody22 = new CANNON.Body({ mass: 0 })
        floorBody22.addShape(floorShape22)
        floorBody22.quaternion.setFromEuler(0, -Math.PI, 0 )
        floorBody22.position.set(0, 10, 20)

        world.addBody(floorBody22)

        // Cube body
        const cubeShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
        cubeBody = new CANNON.Body({ mass: 100 })
        cubeBody.addShape(cubeShape)
        cubeBody.position.set(0, 2, 0)
        bodies.push(cubeBody)
        world.addBody(cubeBody)

        // Joint body, to later constraint the cube
        const jointShape = new CANNON.Sphere(0.1)
        jointBody = new CANNON.Body({ mass: 0 })
        jointBody.addShape(jointShape)
        jointBody.collisionFilterGroup = 0
        jointBody.collisionFilterMask = 0
        world.addBody(jointBody)
      }

      window.addEventListener('pointerdown', (event) => {
        // Cast a ray from where the mouse is pointing and
        // see if we hit something
        const hitPoint = getHitPoint(event.clientX, event.clientY, cubeMesh, camera)

        // Return if the cube wasn't hit
        if (!hitPoint) {
          return
        }
        controls.enabled = false
        // Move marker mesh on contact point
        showClickMarker()
        moveClickMarker(hitPoint)

        // Move the movement plane on the z-plane of the hit
        moveMovementPlane(hitPoint, camera)

        // Create the constraint between the cube body and the joint body
        addJointConstraint(hitPoint, cubeBody)

        // Set the flag to trigger pointermove on next frame so the
        // movementPlane has had time to move
        requestAnimationFrame(() => {
          isDragging = true
        })
      })

      window.addEventListener('pointermove', (event) => {
        if (!isDragging) {
          return
        }

        // Project the mouse onto the movement plane
        const hitPoint = getHitPoint(event.clientX, event.clientY, movementPlane, camera)

        if (hitPoint) {
          // Move marker mesh on the contact point
          moveClickMarker(hitPoint)

          // Move the cannon constraint on the contact point
          moveJoint(hitPoint)
        }
      })

      window.addEventListener('pointerup', () => {
        isDragging = false
        controls.enabled = true

        // Hide the marker mesh
        hideClickMarker()

        // Remove the mouse constraint from the world
        removeJointConstraint()
      })

      function showClickMarker() {
        clickMarker.visible = true
      }

      function moveClickMarker(position) {
        clickMarker.position.copy(position)
      }

      function hideClickMarker() {
        clickMarker.visible = false
      }

      // This function moves the virtual movement plane for the mouseJoint to move in
      function moveMovementPlane(point, camera) {
        // Center at mouse position
        movementPlane.position.copy(point)

        // Make it face toward the camera
        movementPlane.quaternion.copy(camera.quaternion)
      }

      // Returns an hit point if there's a hit with the mesh,
      // otherwise returns undefined
      function getHitPoint(clientX, clientY, mesh, camera) {
        // Get 3D point form the client x y
        const mouse = new THREE.Vector2()
        mouse.x = (clientX / window.innerWidth) * 2 - 1
        mouse.y = -((clientY / window.innerHeight) * 2 - 1)

        // Get the picking ray from the point
        raycaster.setFromCamera(mouse, camera)

        // Find out if there's a hit
        const hits = raycaster.intersectObject(mesh)

        // Return the closest hit or undefined
        return hits.length > 0 ? hits[0].point : undefined
      }

      // Add a constraint between the cube and the jointBody
      // in the initeraction position
      function addJointConstraint(position, constrainedBody) {
        // Vector that goes from the body to the clicked point
        const vector = new CANNON.Vec3().copy(position).vsub(constrainedBody.position)

        // Apply anti-quaternion to vector to tranform it into the local body coordinate system
        const antiRotation = constrainedBody.quaternion.inverse()
        const pivot = antiRotation.vmult(vector) // pivot is not in local body coordinates

        // Move the cannon click marker body to the click position
        jointBody.position.copy(position)

        // Create a new constraint
        // The pivot for the jointBody is zero
        jointConstraint = new CANNON.PointToPointConstraint(constrainedBody, pivot, jointBody, new CANNON.Vec3(0, 0, 0))

        // Add the constraint to world
        world.addConstraint(jointConstraint)
      }

      // This functions moves the joint body to a new postion in space
      // and updates the constraint
      function moveJoint(position) {
        jointBody.position.copy(position)
        jointConstraint.update()
      }

      // Remove constraint from world
      function removeJointConstraint() {
        world.removeConstraint(jointConstraint)
        jointConstraint = undefined
      }

      function animate() {
        requestAnimationFrame(animate)
        controls.update()
        // Step the physics world
        world.fixedStep()
        // console.log(cubeMesh.position.distanceTo(camera.position))
        // Sync the three.js meshes with the bodies
        for (let i = 0; i !== meshes.length; i++) {
          meshes[i].position.copy(bodies[i].position)
          meshes[i].quaternion.copy(bodies[i].quaternion)
        }
        cannonDebugger.update()
        // Render three.js
        renderer.render(scene, camera)
      }