<script lang="ts">
    import { T, useTask } from "@threlte/core"
    import { Clock, type Mesh, type MeshPhysicalMaterial, type SphereGeometry, Vector3 } from "three"
    import { makeNoise3D } from "fast-simplex-noise"

    let mesh: Mesh<SphereGeometry, MeshPhysicalMaterial>

    const BLOB_SIZE = 2
    const BLOB_INITIAL_SIZE = [BLOB_SIZE, 64, 64]
    const BLOB_INITIAL_SCALE = new Vector3(0, 0, 0)
    const BLOB_INITIAL_POSITION = new Vector3(0, 0, -10)

    const clock = new Clock()
    const positionVector = new Vector3(0, 0, 0)
    const scaleVector = new Vector3(1, 1, 1)
    const noise = makeNoise3D()

    useTask((delta) => {
        const speed = delta * 2
        const numberOfSpikes = Math.cos(2)
        const spikeSize = Math.sin(2)
        const time = clock.getElapsedTime() * 0.05

        mesh.scale.lerp(scaleVector, speed)
        mesh.position.lerp(positionVector.setScalar(0), speed)

        const position = mesh.geometry.getAttribute("position")

        for (let index = 0; index < position.count; index++) {
            positionVector.fromBufferAttribute(position, index)
            positionVector.normalize()
            positionVector.multiplyScalar(
                BLOB_SIZE
                    + spikeSize
                    * noise(
                        positionVector.x * numberOfSpikes + time,
                        positionVector.y * numberOfSpikes + time,
                        positionVector.z * numberOfSpikes + time,
                    ),
            )
            position.setXYZ(
                index,
                positionVector.x,
                positionVector.y,
                positionVector.z,
            )
        }

        mesh.geometry.computeVertexNormals()
        position.needsUpdate = true
    })
</script>

<T.PointLight color="white" intensity={1} position={[0, 0, 100]} />
<T.DirectionalLight color="white" position={[-1, 1, 1]} />
<T.AmbientLight color="white" />

<T.Group>
    <T.Mesh bind:ref={mesh} position={BLOB_INITIAL_POSITION.toArray()} scale={BLOB_INITIAL_SCALE.toArray()}>
        <T.SphereGeometry args={BLOB_INITIAL_SIZE} />
        <T.MeshPhysicalMaterial />
    </T.Mesh>
</T.Group>
