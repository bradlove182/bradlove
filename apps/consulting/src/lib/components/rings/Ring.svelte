<script lang="ts">
    import { T, useTask, useThrelte } from "@threlte/core"
    import { Environment, FakeGlowMaterial } from "@threlte/extras"
    import { Color, ExtrudeGeometry, Mesh, Path, Shape, Vector3 } from "three"

    const { scene } = useThrelte()

    const isEven = (i: number) => i % 2 === 0

    const sphereColour = new Color("pink")

    const buildShape = (radius: number, index: number) => {
        const shape = new Shape()
            .absarc(0, 0, radius, 0, Math.PI * 2, false)

        const holePath = new Path()
            .absarc(0, 0, radius - 0.35, 0, Math.PI * 2, true)

        shape.holes.push(holePath)

        const geometry = new ExtrudeGeometry(shape, { curveSegments: 512, depth: 2, steps: 1, bevelEnabled: false })

        if (isEven(index)) {
            geometry.rotateX(index)
        }
        else {
            geometry.rotateY(index)
        }

        geometry.userData.isEven = isEven(index)
        geometry.center()
        geometry.name = "ring"

        return geometry
    }

    useTask((delta) => {
        const speed = delta * 1
        const rings = scene.children.filter(child => child instanceof Mesh && child.geometry.name === "ring")
        const evenRings = rings.filter(child => child instanceof Mesh && child.geometry.userData.isEven)
        const oddRings = rings.filter(child => child instanceof Mesh && !child.geometry.userData.isEven)

        evenRings.forEach((child, index) => {
            if (isEven(index)) {
                child.rotateOnAxis(new Vector3(-1, 0, 0), speed)
            }
            else {
                child.rotateOnAxis(new Vector3(1, 0, 0), speed)
            }
        })

        oddRings.forEach((child, index) => {
            if (isEven(index)) {
                child.rotateOnAxis(new Vector3(0, -1, 0), speed)
            }
            else {
                child.rotateOnAxis(new Vector3(0, 1, 0), speed)
            }
        })
    })

</script>

<Environment
    path="/"
    files="empty_warehouse_01_1k.hdr"
    colorSpace="srgb"
/>

{#each Array(8) as _, i}
    <T.Mesh geometry={buildShape(11 - i, i)} renderOrder={1}>
        <T.MeshStandardMaterial depthTest={true} metalness={1} roughness={0.2} color="#030712" />
    </T.Mesh>
{/each}

<T.Group>
    <T.PointLight distance={1000} position={[0, 0, 0]} intensity={1000} color={sphereColour} />
    <T.Mesh>
        <T.SphereGeometry args={[2.25, 32, 32]} />
        <FakeGlowMaterial glowColor={sphereColour} depthTest={true} glowInternalRadius={1} />
    </T.Mesh>

    <T.Mesh>
        <T.SphereGeometry args={[2, 32, 32]} />
        <T.MeshStandardMaterial metalness={0} roughness={1} depthTest={true} color={sphereColour} />
    </T.Mesh>
</T.Group>
