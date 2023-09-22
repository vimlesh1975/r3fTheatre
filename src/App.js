// import * as THREE from 'three';
import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import { editable as e, SheetProvider } from '@theatre/r3f';

import { PerspectiveCamera } from '@theatre/r3f';

import demoProjectState from './state.json';

studio.initialize();
studio.extend(extension);

const project = getProject('Demo Project', { state: demoProjectState });

const demoSheet = project.sheet('Demo Sheet');

// const demoSheet = getProject('Demo Project').sheet('Demo Sheet');

const App = () => {
  useEffect(() => {
    demoSheet.project.ready.then(() =>
      demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 1] })
    );
  }, []);

  const aa = (i) => {
    return (
      <e.mesh theatreKey={'Cube' + i.toString()}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </e.mesh>
    );
  };

  useEffect(() => {
    for (let i = 1; i <= 5; i++) {
      console.log(i);
    }

    return () => {};
  }, []);

  return (
    <div
      style={{
        height: 1080,
        backgroundColor: 'grey',
        border: '1px solid red',
      }}
    >
      <Canvas>
        <SheetProvider sheet={demoSheet}>
          <PerspectiveCamera
            theatreKey="Camera"
            makeDefault
            position={[5, 5, -5]}
            fov={75}
          />
          <ambientLight />
          <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
          {['a', 'b', 'c', 'd'].map((val, i) => {
            return (
              <e.mesh theatreKey={'Cube' + i.toString()}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
              </e.mesh>
            );
          })}
        </SheetProvider>
      </Canvas>
    </div>
  );
};

export default App;
