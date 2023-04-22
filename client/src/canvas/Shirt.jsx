import React,{Suspense} from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame ,Canvas} from '@react-three/fiber';
import { OrbitControls,Preload, Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';


const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/shirt_baked.glb');

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);
    useFrame((state, delta) =>{
        nodes.T_Shirt_male.rotation.y+=delta*0.5;
        easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)});
     const stateString=JSON.stringify(snap);

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
                        position={[0.06, 0.09, 0.15]}
                        rotation={[0, 0, 0]}
                        scale={0.07}
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

export default Shirt