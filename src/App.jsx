import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";

function App() {
  return (
    <>
      <UI />
      <Loader />
      <Canvas camera={{ position: [-2, 1, 5], fov: 30 }}>
        <color attach="background" args={["#EBDFBC"]} />
        <fog attach="fog" args={["#EBDFBC", 5, 20]} />
        <group position-y={-1}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
