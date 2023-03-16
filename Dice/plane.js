import * as CANNON from 'cannon-es'
function CreatePlane(){

    // Floor
    const floorShape = new CANNON.Plane()
    const floorBody = new CANNON.Body({ mass: 0 })
    floorBody.addShape(floorShape)
    floorBody1.quaternion.setFromEuler(0, Math.PI / 2, 0)
    floorBody.position.set(0, 0, 0)
    world.addBody(floorBody)

    const floorShape1 = new CANNON.Plane()
    const floorBody1 = new CANNON.Body({ mass: 0 })
    floorBody1.addShape(floorShape1)
    floorBody1.quaternion.setFromEuler(0, -Math.PI / 2, 0)
    floorBody1.position.set(10, 5, 0)

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
    const message = "How you doing?";

    module.exports = {
    CreatePlane
    };
}