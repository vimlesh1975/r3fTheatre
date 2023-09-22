// import * as THREE from 'three';
import { useEffect } from 'react';
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
  useEffect(() => {
    project.ready.then(() => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          project.sheet('Demo Sheet', 'a' + (i + 1).toString()).sequence.play({ iterationCount: Infinity, range: [0, 5] })
        }, i*1000);
  
      }
     
    });
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
        <ambientLight />
        <pointLight theatreKey="Light" position={[10, 10, 10]} />
        {[1, 2, 3, 4, 5].map((_, i) => {
          return (
            <SheetProvider sheet={project.sheet('Demo Sheet', 'a' + (i + 1).toString())}>
              <e.mesh theatreKey={'Cube1'}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={`hsl(${i*20}, 100%, 50%)`} />
              </e.mesh>
            </SheetProvider>
          )
        })}
      </Canvas>
    </div>
  );
};

export default App;
