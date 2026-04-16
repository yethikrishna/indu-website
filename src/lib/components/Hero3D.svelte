<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  interface Props { class?: string; }
  let { class: className = '' }: Props = $props();

  let canvasEl: HTMLCanvasElement | undefined = $state();
  let renderer: any, scene: any, camera: any, mesh: any, mat: any;
  let animId: number;
  let scrollY = 0;
  let time = 0;

      const vertexShader = `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPos;
        varying float vDisp;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
        float snoise(vec3 v) {
          const vec2 C = vec2(1./6., 1./3.);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - 0.5;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0., i1.z, i2.z, 1.)) +
            i.y + vec4(0., i1.y, i2.y, 1.)) +
            i.x + vec4(0., i1.x, i2.x, 1.));
          vec4 m = max(0.6 - vec4(
            dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.);
          m = m * m;
          return 42. * dot(m*m, vec4(
            dot(p.xyz, x0), dot(p.yzx, x1),
            dot(p.zxy, x2), dot(p.wxy, x3)));
        }

        void main() {
          vNormal = normalMatrix * normal;
          float n = snoise(position * 1.5 + uTime * 0.3);
          float n2 = snoise(position * 2.8 - uTime * 0.15);
          vDisp = n * 0.5 + n2 * 0.25;
          vec3 displaced = position + normal * vDisp * 0.35;
          vPos = displaced;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `;

      const fragmentShader = `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vPos;
        varying float vDisp;

        void main() {
          vec3 navy  = vec3(0.102, 0.102, 0.18);
          vec3 teal  = vec3(0.306, 0.804, 0.769);
          vec3 gold  = vec3(0.91, 0.659, 0.22);
          vec3 violet = vec3(0.5, 0.2, 0.9);

          float t = uTime * 0.2;
          float phase = vPos.y * 1.2 + vPos.x * 0.8 + t;
          float aurora = sin(phase) * 0.5 + 0.5;
          float aurora2 = sin(phase * 1.7 + 1.4) * 0.5 + 0.5;

          vec3 col = mix(navy, teal, aurora * 0.6);
          col = mix(col, gold, aurora2 * 0.4 * (vDisp + 0.5));
          col = mix(col, violet, sin(phase * 0.5) * 0.3);

          // Edge glow
          float fresnel = 1.0 - abs(dot(normalize(vNormal), vec3(0., 0., 1.)));
          col += teal * pow(fresnel, 3.0) * 0.8;
          col += gold * pow(fresnel, 6.0) * 0.4;

          gl_FragColor = vec4(col, 0.92);
        }
      `;

  onMount(() => {
    if (!browser || !canvasEl) return;
    
    let cleanup: () => void;
    
    (async () => {
      const THREE = await import('three');

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 5.5;

      renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

      const geo = new THREE.IcosahedronGeometry(2, 4);
      mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: { uTime: { value: 0 } },
        transparent: true
      });
      mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      // Wireframe overlay
      const wireMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.02, 2),
        new THREE.MeshBasicMaterial({ wireframe: true, color: 0x4ECDC4, transparent: true, opacity: 0.05 })
      );
      scene.add(wireMesh);

      const resize = () => {
        const w = canvasEl!.clientWidth, h = canvasEl!.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(canvasEl!);
      resize();

      const onScroll = () => { scrollY = window.scrollY; };
      window.addEventListener('scroll', onScroll, { passive: true });

      const tick = () => {
        animId = requestAnimationFrame(tick);
        time += 0.007;
        mat.uniforms.uTime.value = time;
        mesh.rotation.y = time * 0.12 + scrollY * 0.0004;
        mesh.rotation.x = Math.sin(time * 0.18) * 0.18 + scrollY * 0.0002;
        wireMesh.rotation.copy(mesh.rotation);
        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        ro.disconnect();
        window.removeEventListener('scroll', onScroll);
      };
    })();

    return () => {
      if (cleanup) cleanup();
    };
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      cancelAnimationFrame(animId);
    }
    if (renderer) renderer.dispose();
    if (mat) mat.dispose();
    if (scene) scene.clear();
  });
</script>

<canvas bind:this={canvasEl} class={`hero-3d-canvas ${className}`}></canvas>

<style>
  .hero-3d-canvas {
    width: 100%; height: 100%;
    display: block;
  }
</style>
