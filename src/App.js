import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import { editable as e, SheetProvider } from '@theatre/r3f';

import demoProjectState from './state.json';

studio.initialize();
studio.extend(extension);

const project = getProject('Demo Project', { state: demoProjectState });

const App = () => {
  const [scene1, setScene1] = useState();
  const [camera1, setCamera1] = useState();
  const [raycaster1, setRaycaster1] = useState(new THREE.Raycaster());
  const [gl1, setGl1] = useState();
  useEffect(() => {
    setTimeout(() => {
      console.log(scene1);
    }, 5000);
    project.ready.then(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          project
            .sheet('Demo Sheet', 'a' + (i + 1).toString())
            .sequence.play({ iterationCount: Infinity, range: [0, 5] });
        }, i * 1000);
      }
    });
  }, []);

  return (
    <>
      <div>
        <button onClick={() => console.log(scene1)}>log</button>
      </div>
      <div
        style={{
          height: 1080,
          backgroundColor: 'grey',
          border: '1px solid red',
        }}
      >
        <Canvas
          gl={{ preserveDrawingBuffer: true }}
          onCreated={({ gl, raycaster, scene, camera }) => {
            setScene1(scene);
            console.log(scene);
            setCamera1(camera);
            setRaycaster1(raycaster);
            setGl1(gl);
          }}
        >
          <ambientLight />
          <pointLight theatreKey="Light" position={[10, 10, 10]} />
          {[1, 2, 3, 4, 5].map((_, i) => {
            return (
              <SheetProvider
                key={i}
                sheet={project.sheet('Demo Sheet', 'a' + (i + 1).toString())}
              >
                <e.mesh theatreKey={'Cube1'}>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color={`hsl(${i * 20}, 100%, 50%)`} />
                </e.mesh>
              </SheetProvider>
            );
          })}
        </Canvas>
      </div>
    </>
  );
};

export default App;
