import React from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';

const Shirt = () => {
    let shirt=1;
    const snap = useSnapshot(state);
    if(state.sleeve===true){
        var { nodes, materials } = useGLTF('/shirt_baked.glb');
    }else{
        var { nodes, materials } = useGLTF('/full_sleeve.glb');
    }
    

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);
    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
     const stateString=JSON.stringify(snap);

     if(state.sleeve===true){

    return (
        <group
        key={stateString}
        >
            <mesh
                castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
            >
                {snap.isFullTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={1}
                        map={fullTexture}
                    />
                )}
                {snap.isLogoTexture && (
                    <Decal
                        position={[0, 0.04, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.15}
                        map={logoTexture}
                        map-anisotropy={16}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
            </mesh>
        </group>
    )
}else{
    return (
        <group
        key={stateString}
        >
            <mesh
                castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null}
                rotation={[90,0,0]}
                scale={[0.03,0.03,0.03]}
            >
                {snap.isFullTexture && (
                    <Decal
                        position={[0, 0, 0]}
                        // rotation={[0, 0, 0]}
                        rotation={[-90,0,0]}
                        // scale={1}
                        scale={[30,30,30]}
                        map={fullTexture}
                    />
                )}
                {snap.isLogoTexture && (
                    <Decal
                        position={[0, 0.04, 0.15]}
                        // rotation={[0, 0, 0]}
                        rotation={[-90,0,0]}
                        // scale={0.15}
                        scale={[6,6,11]}
                        map={logoTexture}
                        map-anisotropy={16}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
            </mesh>
        </group>
    )
}
}

export default Shirt
