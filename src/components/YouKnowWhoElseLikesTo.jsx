import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import { WiggleBone } from "wiggle/spring";
import { wiggleAtom } from "./UI";

export function YouKnowWhoElseLikesTo({ animation, scale = 130, ...props }) {
  const group = useRef();
  const { nodes, scene, animations } = useGLTF(`/models/muscleman.glb`);
  const { actions } = useAnimations(animations, group);

  const [wiggle] = useAtom(wiggleAtom);
  const wiggleBones = useRef([]);

  useEffect(() => {
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = false;
      }
    });
  }, [scene]);

  useEffect(() => {
    wiggleBones.current.length = 0;

    if (!wiggle) {
      return;
    }

    ["Belly01"].forEach((rootBone) => {
      if (!nodes[rootBone]) {
        return;
      }
      nodes[rootBone].traverse((bone) => {
        if (bone.isBone) {
          const wiggleBone = new WiggleBone(bone, {
            damping: 10,
            stiffness: 300,
          });
          wiggleBones.current.push(wiggleBone);
        }
      });
    });

    ["Breast"].forEach((rootBone) => {
      if (!nodes[rootBone]) {
        return;
      }
      nodes[rootBone].traverse((bone) => {
        if (bone.isBone) {
          const wiggleBone = new WiggleBone(bone, {
            damping: 40,
            stiffness: 900,
          });
          wiggleBones.current.push(wiggleBone);
        }
      });
    });

    return () => {
      wiggleBones.current.forEach((wiggleBone) => {
        wiggleBone.reset();
        wiggleBone.dispose();
      });
    };
  }, [nodes, wiggle]);

  useFrame(() => {
    wiggleBones.current.forEach((wiggleBone) => {
      wiggleBone.update();
    });
  });

  useEffect(() => {
    actions[animation]?.fadeIn(0.5).play();
    return () => actions[animation]?.fadeOut(0.5).stop();
  }, [actions, animation]);

  return (
    <group ref={group} scale={scale} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(`/models/muscleman.glb`);