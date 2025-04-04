import { Float, Gltf, TransformControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useRef } from "react";
import { MathUtils } from "three";
import { YouKnowWhoElseLikesTo } from "./YouKnowWhoElseLikesTo";
import { youknowwhoelselikestoAtom } from "./UI";

export const Experience = () => {
  const tvs = useRef();
  const environmentRef = useRef();
  const [youknowwhoelselikesto] = useAtom(youknowwhoelselikestoAtom);
  
  // Hardcoded TV circumference factor (0.5 = 50% of original size)
  const tvCircumference = 0.5;
  
  useFrame(({}) => {
    tvs.current.rotation.y += 0.01;
    tvs.current.scale.x =
      tvs.current.scale.y =
      tvs.current.scale.z =
        MathUtils.lerp(tvs.current.scale.x, youknowwhoelselikesto ? 1 : 100, 1);
  });

  return (
    <>
      {/* Custom environment model with detailed positioning */}
      <Gltf 
        ref={environmentRef}
        src="/models/environment.glb" 
        scale={10} // Overall size scaling of the environment model
        position={[
          3,
          0,
          -1
        ]} 
        rotation={[
          0,   // X pitch
          0,   // Y yaw
          0    // Z roll
        ]}
      />

      <group ref={tvs}>
        <Float
          position={[2.5 * tvCircumference, 1.3, 1 * tvCircumference]}
          speed={6}
          floatIntensity={3}
          rotationIntensity={2}
        >
          <Gltf scale={0.2} src="/models/Tv.glb" />
        </Float>
        <Float
          position={[-2.5 * tvCircumference, 1.3, 1 * tvCircumference]}
          speed={8}
          floatIntensity={2}
          rotationIntensity={6}
        >
          <Gltf scale={0.2} src="/models/Tv.glb" />
        </Float>
        <Float
          position={[0, 1.3, -2.5 * tvCircumference]}
          speed={12}
          rotationIntensity={4}
          floatIntensity={3}
        >
          <Gltf scale={0.2} src="/models/Tv.glb" />
        </Float>
      </group>
      <TransformControls position-y={1.3}>
        <YouKnowWhoElseLikesTo animation={youknowwhoelselikesto ? "DancingSwing" : "IdleBreath"} position-y={-1} />
      </TransformControls>
      <directionalLight position={[11, 5, 11]} intensity={5.5} />
      <directionalLight position={[1, 14, 11]} intensity={10.5} color={"#EBDFBC"}/>
      <mesh rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#EBDFBC" />
      </mesh>
    </>
  );
};