<script lang="ts">
    import { T, useTask } from "@threlte/core"
    import { Clock, Group, Mesh, MeshStandardMaterial, type SphereGeometry, Vector3 } from "three"
    import { makeNoise3D } from "fast-simplex-noise"
    import { Float } from "@threlte/extras"

    let group: Group = $state()
    let blob: Mesh<SphereGeometry, MeshStandardMaterial> = $state()

    const BLOB_SIZE = 2
    const BLOB_INITIAL_SIZE = [BLOB_SIZE, 128, 128]
    const BLOB_INITIAL_SCALE = new Vector3(0, 0, 0)
    const BLOB_INITIAL_POSITION = new Vector3(0, 20, 0)

    const clock = new Clock()
    const positionVector = new Vector3(0, 0, 0)
    const scaleVector = new Vector3(1, 1, 1)
    const noise = makeNoise3D()

    useTask((delta) => {
        const speed = delta * 1.5
        const numberOfSpikes = Math.cos(1.25)
        const spikeSize = Math.sin(4)
        const time = clock.getElapsedTime() * 0.025

        group.scale.lerp(scaleVector, speed)
        positionVector.setScalar(0).setX(3)
        group.position.lerp(positionVector, speed)

        const position = blob.geometry.getAttribute("position")

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

        blob.geometry.computeVertexNormals()
        position.needsUpdate = true
    })
</script>

<T.DirectionalLight position={[30, 30, 20]} intensity={1} />
<T.AmbientLight intensity={0.5} />
<T.PointLight position={[0, 50, 10]} intensity={1} />

<Float
    renderOrder={1}
    floatIntensity={5}
    rotationIntensity={2}
    rotationSpeed={[1, 0.5, 0.2]}>
    <T.Group bind:ref={group} position={BLOB_INITIAL_POSITION.toArray()} scale={BLOB_INITIAL_SCALE.toArray()}>
        <T.Mesh bind:ref={blob} renderOrder={1}>
            <T.SphereGeometry args={BLOB_INITIAL_SIZE} />
            <T.MeshStandardMaterial color="red" metalness={0} roughness={0} depthTest={false} />
        </T.Mesh>
    </T.Group>
</Float>
