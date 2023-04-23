import React from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';

const Shirt = () => {
    const snap = useSnapshot(state);
    if(state.sleeve===false){
        var { nodes, materials } = useGLTF('/shirt_baked.glb');
    }else{
        var { nodes, materials } = useGLTF('/full_sleeve.glb');
    }
    const logoTexture = useTexture(snap.logoDecal);
    const logoTexture1 = useTexture(snap.logoDecal1);
    const logoTexture2 = useTexture(snap.logoDecal2);
    const logoTexture3 = useTexture(snap.logoDecal3);
    const logoTexture4 = useTexture(snap.logoDecal4);
    const fullTexture = useTexture(snap.fullDecal);
    useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));
     const stateString=JSON.stringify(snap);

     if(state.sleeve===false){

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
                {snap.fixed1 && (
                    <Decal
                        position={[0+state.x1Cordinate, 0+state.y1Cordinate, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.07+state.size1Cordinate}
                        map={logoTexture1}
                        map-anisotropy={16}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
                {snap.fixed2 && (
                    <Decal
                        position={[0+state.x2Cordinate, 0+state.y2Cordinate, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.07+state.size2Cordinate}
                        map={logoTexture2}
                        map-anisotropy={16}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
                {snap.fixed3 && (
                    <Decal
                        position={[0+state.x3Cordinate, 0+state.y3Cordinate, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.07+state.size3Cordinate}
                        map={logoTexture3}
                        map-anisotropy={16}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
                {snap.fixed4 && (
                    <Decal
                        position={[0+state.x4Cordinate, 0+state.y4Cordinate, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.07+state.size4Cordinate}
                        map={logoTexture4}
                        map-anisotropy={16}
                        depthTest={false}
                        depthWrite={true}
                    />
                )}
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
                        position={[0+state.xCordinate, 0+state.yCordinate, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.07+state.sizeCordinate}
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
                rotation={[1.7,0,0]}
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
                        position={[0+(state.xCordinate*100), 0.04-(state.yCordinate*100), 0.15]}
                        // rotation={[0, 0, 0]}
                        rotation={[-90,0,0]}
                        // scale={0.15}
                        scale={[6+(state.sizeCordinate*100),6+(state.sizeCordinate*100),11]}
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
