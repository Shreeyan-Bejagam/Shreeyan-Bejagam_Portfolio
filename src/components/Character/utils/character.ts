import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const CHARACTER_MODEL_URL = "/models/character.glb";

/** Center, scale to ~target world size, ground to y=0, aim camera at mesh */
function fitCharacterToView(
  root: THREE.Object3D,
  camera: THREE.PerspectiveCamera
) {
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root);
  if (box.isEmpty()) return;

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  root.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z, 1e-6);
  const targetSize = 5.8;
  root.scale.setScalar(targetSize / maxDim);

  root.updateMatrixWorld(true);
  const grounded = new THREE.Box3().setFromObject(root);
  root.position.y -= grounded.min.y;
  root.updateMatrixWorld(true);

  const finalBox = new THREE.Box3().setFromObject(root);
  const look = finalBox.getCenter(new THREE.Vector3());
  camera.lookAt(look);
}

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      loader.load(
        CHARACTER_MODEL_URL,
        async (gltf) => {
          try {
            const character = gltf.scene;
            try {
              await renderer.compileAsync(character, camera, scene);
            } catch (e) {
              console.warn("compileAsync (non-fatal):", e);
            }

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });

            fitCharacterToView(character, camera);

            try {
              setCharTimeline(character, camera);
              setAllTimeline();
            } catch (e) {
              console.warn("Scroll / rig hooks (OK if your GLB differs):", e);
            }

            resolve(gltf);
            dracoLoader.dispose();
          } catch (e) {
            console.error("Character setup failed:", e);
            dracoLoader.dispose();
            reject(e instanceof Error ? e : new Error(String(e)));
          }
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
          dracoLoader.dispose();
          reject(error);
        }
      );
    });
  };

  return { loadCharacter };
};

export default setCharacter;
