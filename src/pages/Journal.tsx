// import { useRef, useState, useEffect, Suspense, useMemo, Component, type ReactNode } from "react";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";
// import { Canvas, useFrame } from "@react-three/fiber";
// // ── GLTF ADDITION: useGLTF imported from drei ──────────────────────────
// import { Environment, MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
// import * as THREE from "three";

// // ── Responsive hook ────────────────────────────────────────────────────
// function useWindowWidth() {
//   const [width, setWidth] = useState(() =>
//     typeof window !== "undefined" ? window.innerWidth : 1200
//   );
//   useEffect(() => {
//     const handler = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", handler, { passive: true });
//     return () => window.removeEventListener("resize", handler);
//   }, []);
//   return width;
// }

// // ── WebGL support detection ────────────────────────────────────────────
// function detectWebGL(): boolean {
//   try {
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
//     return !!ctx;
//   } catch {
//     return false;
//   }
// }
// const HAS_WEBGL = detectWebGL();

// // ── Motion helpers ─────────────────────────────────────────────────────
// const EASE = [0.25, 0.1, 0.25, 1] as const;

// // ── Minimal Link shim ──────────────────────────────────────────────────
// function Link({ href, className, children, style, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
//   return <a href={href} className={className} style={style} {...rest}>{children}</a>;
// }

// // ── Sanity shims ───────────────────────────────────────────────────────
// const isSanityConfigured = false;
// function useSanityQuery<T>(_keys: string[], _query: string) {
//   return { data: null as T | null };
// }
// const JOURNAL_ARTICLES_QUERY = "";

// interface SanityArticle {
//   _id: string;
//   title: string;
//   slug: { current: string };
//   publishedAt: string;
//   category: string;
//   excerpt: string;
//   featured: boolean;
// }

// function formatDate(d: string) {
//   try { return new Date(d).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" }); } catch { return d; }
// }

// const up = {
//   hidden: { opacity: 0, y: 22 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
// };
// const stagger = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.12 } },
// };

// const ARTICLES = [
//   {
//     id: 1,
//     title: "Understanding GIA Certificate Comments",
//     date: "March 15, 2026",
//     category: "Expertise",
//     excerpt: "The true value of a diamond often lies in what the certificate comments reveal. A deep dive into interpreting GIA dossiers for conversion potential and investment positioning.",
//     featured: true,
//   },
//   {
//     id: 2,
//     title: "IF to FL: The Hidden Opportunity in Diamond Grading",
//     date: "February 28, 2026",
//     category: "Investment",
//     excerpt: "How precise evaluation and masterful regrinding can elevate an Internally Flawless stone to Flawless, unlocking significant premiums without changing carat weight.",
//     featured: false,
//   },
//   {
//     id: 3,
//     title: "Lab-Grown vs Natural: An Investment Perspective",
//     date: "January 12, 2026",
//     category: "Market Insights",
//     excerpt: "Navigating the diverging markets of lab-grown and natural diamonds. Where true long-term value resides for serious buyers and institutional portfolios.",
//     featured: false,
//   },
//   {
//     id: 4,
//     title: "The Evolution of Diamond Sourcing",
//     date: "December 05, 2025",
//     category: "Innovation",
//     excerpt: "From traditional craftsmanship to modern precision: how expertise and evaluation rigour are reshaping how premium stones are sourced and assessed globally.",
//     featured: false,
//   },
// ];

// // ══════════════════════════════════════════════════════════════════════
// // SHARED HELPERS
// // ══════════════════════════════════════════════════════════════════════

// function SparkleRig({ speed = 0.7 }: { speed?: number }) {
//   const rig = useRef<THREE.Group>(null);
//   useFrame((state) => {
//     if (!rig.current) return;
//     rig.current.rotation.y = state.clock.elapsedTime * speed;
//     rig.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
//   });
//   return (
//     <group ref={rig}>
//       <pointLight position={[2.5, 1.5, 0]} intensity={6} color="#ffffff" distance={8} decay={2} />
//       <pointLight position={[-2.5, 0.5, 0]} intensity={4} color="#c8e8ff" distance={8} decay={2} />
//       <pointLight position={[0, 2.5, -2]} intensity={5} color="#ffe8c0" distance={8} decay={2} />
//       <pointLight position={[1.5, -1.5, 2]} intensity={3} color="#ffc0d8" distance={8} decay={2} />
//       <pointLight position={[-1, 1, 2.5]} intensity={3} color="#d0c8ff" distance={8} decay={2} />
//     </group>
//   );
// }

// const GLINT_COUNT = 8;
// const GLINT_POSITIONS = Array.from({ length: GLINT_COUNT }, (_, i) => {
//   const phi = Math.acos(-1 + (2 * i) / GLINT_COUNT);
//   const theta = Math.sqrt(GLINT_COUNT * Math.PI) * phi;
//   return new THREE.Vector3(
//     1.3 * Math.sin(phi) * Math.cos(theta),
//     1.3 * Math.cos(phi),
//     1.3 * Math.sin(phi) * Math.sin(theta),
//   );
// });

// function GlintParticles() {
//   const groupRef = useRef<THREE.Group>(null);
//   useFrame((state) => {
//     if (!groupRef.current) return;
//     groupRef.current.children.forEach((child, i) => {
//       const mesh = child as THREE.Mesh;
//       const t = state.clock.elapsedTime * 1.4 + i * 1.1;
//       const s = Math.max(0, Math.sin(t) * 0.8);
//       mesh.scale.setScalar(s);
//       (mesh.material as THREE.MeshBasicMaterial).opacity = s;
//     });
//   });
//   return (
//     <group ref={groupRef}>
//       {GLINT_POSITIONS.map((pos, i) => (
//         <mesh key={i} position={pos}>
//           <sphereGeometry args={[0.045, 6, 6]} />
//           <meshBasicMaterial color="#ffffff" transparent opacity={0} />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// function buildBrilliantGeometry(crownH: number, pavH: number, R: number, tableR: number) {
//   const N = 8;
//   const angle = (Math.PI * 2) / N;
//   const half = angle / 2;
//   const gH = 0.04;
//   const top = new THREE.Vector3(0, crownH + gH * 0.5, 0);
//   const culet = new THREE.Vector3(0, -pavH - gH * 0.5, 0);
//   const tableRing: THREE.Vector3[] = [];
//   for (let i = 0; i < N; i++) {
//     const a = angle * i + half;
//     tableRing.push(new THREE.Vector3(tableR * Math.cos(a), crownH + gH * 0.5, tableR * Math.sin(a)));
//   }
//   const girdleUp: THREE.Vector3[] = [];
//   for (let i = 0; i < N; i++) {
//     const a = angle * i;
//     girdleUp.push(new THREE.Vector3(R * Math.cos(a), gH * 0.5, R * Math.sin(a)));
//   }
//   const girdleDn: THREE.Vector3[] = [];
//   for (let i = 0; i < N; i++) {
//     const a = angle * i;
//     girdleDn.push(new THREE.Vector3(R * Math.cos(a), -gH * 0.5, R * Math.sin(a)));
//   }
//   const positions: number[] = [];
//   function tri(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) {
//     const n = new THREE.Triangle(a, b, c).getNormal(new THREE.Vector3());
//     for (const v of [a, b, c]) positions.push(v.x, v.y, v.z, n.x, n.y, n.z);
//   }
//   for (let i = 0; i < N; i++) {
//     const i1 = (i + 1) % N;
//     tri(top, tableRing[i1], tableRing[i]);
//     tri(tableRing[i], girdleUp[i], girdleUp[i1]);
//     tri(tableRing[i], tableRing[i1], girdleUp[i1]);
//     tri(girdleUp[i], girdleDn[i1], girdleUp[i1]);
//     tri(girdleUp[i], girdleDn[i], girdleDn[i1]);
//     tri(girdleDn[i], culet, girdleDn[i1]);
//   }
//   const posArr: number[] = [];
//   const nrmArr: number[] = [];
//   for (let i = 0; i < positions.length; i += 6) {
//     posArr.push(positions[i], positions[i + 1], positions[i + 2]);
//     nrmArr.push(positions[i + 3], positions[i + 4], positions[i + 5]);
//   }
//   const geo2 = new THREE.BufferGeometry();
//   geo2.setAttribute("position", new THREE.BufferAttribute(new Float32Array(posArr), 3));
//   geo2.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(nrmArr), 3));
//   return geo2;
// }

// function makeRoughGeo() {
//   const geo = new THREE.IcosahedronGeometry(1, 1).toNonIndexed();
//   const pos = geo.attributes.position;
//   const disp = [0.14, -0.09, 0.19, -0.11, 0.07, -0.16, 0.12, -0.06, 0.18, -0.08, 0.13, -0.17,
//     0.09, -0.14, 0.21, -0.07, 0.11, -0.19, 0.15, -0.10, 0.08, -0.13, 0.20, -0.12];
//   for (let i = 0; i < pos.count; i++) {
//     const d = disp[i % disp.length];
//     pos.setX(i, pos.getX(i) + d * 0.9);
//     pos.setY(i, pos.getY(i) + disp[(i + 5) % disp.length] * 0.7);
//     pos.setZ(i, pos.getZ(i) + disp[(i + 9) % disp.length] * 0.8);
//   }
//   geo.computeVertexNormals();
//   return geo;
// }

// // ══════════════════════════════════════════════════════════════════════
// // ── GLTF DIAMOND MODEL ────────────────────────────────────────────────
// // Place your GLTF file at: /public/models/diamond.glb
// // The CAD developer should export the file as: diamond.glb
// //
// // This component replaces DiamondModel when USE_GLTF_MODEL = true.
// // The model auto-rotates and has the same SparkleRig + GlintParticles
// // lighting as the original PolishedDiamond procedural model.
// //
// // SCALE: Adjust `gltfScale` below if the model appears too large/small.
// // The default assumes the CAD model is ~1 unit in diameter; tweak as needed.
// // ─────────────────────────────────────────────────────────────────────

// // ┌─────────────────────────────────────────────────────────────────┐
// // │  SET THIS TO true ONCE YOU HAVE diamond.glb IN /public/models/  │
// // └─────────────────────────────────────────────────────────────────┘
// const USE_GLTF_MODEL = false;

// // Path to your GLTF/GLB file (served from the /public folder)
// const GLTF_MODEL_PATH = "/models/diamond.glb";

// // Scale multiplier — adjust if the model looks too big or too small
// const GLTF_MODEL_SCALE = 1.0;

// // Pre-load the model so it's cached before the Canvas mounts
// // (only runs when USE_GLTF_MODEL is true to avoid 404 errors during dev)
// if (USE_GLTF_MODEL) {
//   useGLTF.preload(GLTF_MODEL_PATH);
// }

// function GLTFDiamond() {
//   const group = useRef<THREE.Group>(null);
//   const { scene } = useGLTF(GLTF_MODEL_PATH);

//   // Clone the scene so multiple instances don't share the same object
//   const clonedScene = useMemo(() => scene.clone(), [scene]);

//   // Apply a physically-based glass/diamond material to every mesh in the model.
//   // If your GLTF already has materials baked in, remove this block and the
//   // model's own materials will be used as-is.
//   useMemo(() => {
//     const diamondMat = new THREE.MeshPhysicalMaterial({
//       color: new THREE.Color(0.94, 0.97, 1.0),
//       roughness: 0.0,
//       metalness: 0.0,
//       transmission: 1.0,
//       thickness: 1.6,
//       ior: 2.42,
//       reflectivity: 1.0,
//       envMapIntensity: 5.0,
//       transparent: true,
//       side: THREE.DoubleSide,
//     });
//     clonedScene.traverse((child) => {
//       if ((child as THREE.Mesh).isMesh) {
//         (child as THREE.Mesh).material = diamondMat;
//       }
//     });
//   }, [clonedScene]);

//   // Same gentle rotation as the procedural PolishedDiamond
//   useFrame((state, delta) => {
//     if (!group.current) return;
//     group.current.rotation.y += delta * 0.28;
//     group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
//   });

//   return (
//     <group ref={group} scale={GLTF_MODEL_SCALE}>
//       <SparkleRig speed={1.0} />
//       <GlintParticles />
//       <primitive object={clonedScene} />
//     </group>
//   );
// }

// // ══════════════════════════════════════════════════════════════════════
// // 3D DIAMOND MODELS  (original — untouched)
// // ══════════════════════════════════════════════════════════════════════

// function RoughStone() {
//   const group = useRef<THREE.Group>(null);
//   const geo = useMemo(makeRoughGeo, []);
//   useFrame((state, delta) => {
//     if (!group.current) return;
//     group.current.rotation.y += delta * 0.35;
//     group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
//   });
//   return (
//     <group ref={group} scale={1.1}>
//       <mesh geometry={geo}>
//         <meshPhysicalMaterial color={new THREE.Color(0.88, 0.92, 0.97)} roughness={0.18} metalness={0.0} transmission={0.55} thickness={1.8} ior={2.2} reflectivity={0.9} envMapIntensity={2.5} transparent />
//       </mesh>
//       <mesh geometry={geo} scale={0.88}>
//         <meshPhysicalMaterial color={new THREE.Color(0.75, 0.88, 1.0)} roughness={0.05} metalness={0} transmission={0.9} thickness={0.6} ior={2.0} envMapIntensity={1.5} transparent side={THREE.BackSide} />
//       </mesh>
//     </group>
//   );
// }

// function ScannedStone() {
//   const group = useRef<THREE.Group>(null);
//   const ring1 = useRef<THREE.Mesh>(null);
//   const ring2 = useRef<THREE.Mesh>(null);
//   const geo = useMemo(makeRoughGeo, []);
//   useFrame((state, delta) => {
//     if (!group.current) return;
//     group.current.rotation.y += delta * 0.3;
//     if (ring1.current) ring1.current.rotation.z = state.clock.elapsedTime * 1.2;
//     if (ring2.current) ring2.current.rotation.z = -state.clock.elapsedTime * 0.9;
//   });
//   return (
//     <group ref={group} scale={1.1}>
//       <mesh geometry={geo}>
//         <meshPhysicalMaterial color={new THREE.Color(0.82, 0.90, 0.98)} roughness={0.2} transmission={0.6} thickness={1.6} ior={2.1} envMapIntensity={2} transparent />
//       </mesh>
//       <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
//         <torusGeometry args={[1.25, 0.018, 8, 64]} />
//         <meshBasicMaterial color="#1CA9C9" transparent opacity={0.7} />
//       </mesh>
//       <mesh ref={ring2} rotation={[Math.PI / 3, 0.4, 0]}>
//         <torusGeometry args={[1.1, 0.012, 8, 64]} />
//         <meshBasicMaterial color="#60c8e8" transparent opacity={0.5} />
//       </mesh>
//       <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
//         <planeGeometry args={[2.6, 0.04]} />
//         <meshBasicMaterial color="#1CA9C9" transparent opacity={0.25} side={THREE.DoubleSide} />
//       </mesh>
//       <mesh position={[0.1, 0.15, 0.5]} rotation={[0.15, 0.1, 0]}>
//         <circleGeometry args={[0.38, 40]} />
//         <meshBasicMaterial color="#3a6fc0" transparent opacity={0.35} side={THREE.DoubleSide} />
//       </mesh>
//       <mesh position={[-0.05, -0.22, 0.48]} rotation={[-0.1, 0.1, 0]}>
//         <circleGeometry args={[0.26, 40]} />
//         <meshBasicMaterial color="#c46050" transparent opacity={0.32} side={THREE.DoubleSide} />
//       </mesh>
//     </group>
//   );
// }

// function LaserCutStone() {
//   const group = useRef<THREE.Group>(null);
//   const dot1 = useRef<THREE.Mesh>(null);
//   const dot2 = useRef<THREE.Mesh>(null);
//   const geo = useMemo(makeRoughGeo, []);
//   useFrame((state, delta) => {
//     if (!group.current) return;
//     group.current.rotation.y += delta * 0.28;
//     const pulse = 0.7 + 0.3 * Math.sin(state.clock.elapsedTime * 6);
//     if (dot1.current) (dot1.current.material as THREE.MeshBasicMaterial).opacity = pulse;
//     if (dot2.current) (dot2.current.material as THREE.MeshBasicMaterial).opacity = pulse * 0.8;
//   });
//   return (
//     <group ref={group} scale={1.1}>
//       <mesh geometry={geo}>
//         <meshPhysicalMaterial color={new THREE.Color(0.84, 0.90, 0.96)} roughness={0.22} transmission={0.5} thickness={1.5} ior={2.1} envMapIntensity={2} transparent />
//       </mesh>
//       <mesh position={[-0.35, 0.5, 0]} rotation={[0, 0, -Math.PI / 5.5]}>
//         <cylinderGeometry args={[0.008, 0.008, 2.8, 6]} />
//         <meshBasicMaterial color="#00ee55" transparent opacity={0.9} />
//       </mesh>
//       <mesh position={[-0.35, 0.5, 0]} rotation={[0, 0, -Math.PI / 5.5]}>
//         <cylinderGeometry args={[0.04, 0.04, 2.8, 6]} />
//         <meshBasicMaterial color="#00ee55" transparent opacity={0.12} />
//       </mesh>
//       <mesh ref={dot1} position={[0.65, -0.28, 0]}>
//         <sphereGeometry args={[0.07, 12, 12]} />
//         <meshBasicMaterial color="#00ff66" transparent opacity={0.9} />
//       </mesh>
//       <mesh position={[-0.55, -0.22, 0]} rotation={[0, 0, Math.PI / 7]}>
//         <cylinderGeometry args={[0.007, 0.007, 2.4, 6]} />
//         <meshBasicMaterial color="#00ee55" transparent opacity={0.8} />
//       </mesh>
//       <mesh position={[-0.55, -0.22, 0]} rotation={[0, 0, Math.PI / 7]}>
//         <cylinderGeometry args={[0.032, 0.032, 2.4, 6]} />
//         <meshBasicMaterial color="#00ee55" transparent opacity={0.10} />
//       </mesh>
//       <mesh ref={dot2} position={[0.38, 0.38, 0]}>
//         <sphereGeometry args={[0.055, 12, 12]} />
//         <meshBasicMaterial color="#00ff66" transparent opacity={0.85} />
//       </mesh>
//       <pointLight position={[0.65, -0.28, 0]} intensity={2} color="#00ff66" distance={1.5} />
//     </group>
//   );
// }

// function PlannedStone() {
//   const group = useRef<THREE.Group>(null);
//   const geo = useMemo(() => new THREE.OctahedronGeometry(1.0, 0).toNonIndexed(), []);
//   useFrame((state, delta) => {
//     if (!group.current) return;
//     group.current.rotation.y += delta * 0.32;
//     group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
//   });
//   return (
//     <group ref={group} scale={1.05}>
//       <mesh geometry={geo}>
//         <meshPhysicalMaterial color={new THREE.Color(0.86, 0.93, 1.0)} roughness={0.05} metalness={0.0} transmission={0.82} thickness={1.4} ior={2.35} reflectivity={1.0} envMapIntensity={3.5} transparent />
//       </mesh>
//       <mesh geometry={geo} scale={0.92}>
//         <meshPhysicalMaterial color={new THREE.Color(0.7, 0.86, 1.0)} roughness={0} transmission={0.95} thickness={0.5} ior={2.0} envMapIntensity={2} transparent side={THREE.BackSide} />
//       </mesh>
//       <SparkleRig speed={0.5} />
//     </group>
//   );
// }

// function PolishedDiamond() {
//   const group = useRef<THREE.Group>(null);
//   const brilliantGeo = useMemo(() => buildBrilliantGeometry(0.32, 0.52, 1.0, 0.56), []);
//   const mat = useMemo(() => new THREE.MeshPhysicalMaterial({
//     color: new THREE.Color(0.94, 0.97, 1.0),
//     roughness: 0.0, metalness: 0.0, transmission: 1.0, thickness: 1.6,
//     ior: 2.42, reflectivity: 1.0, envMapIntensity: 5.0, transparent: true, side: THREE.DoubleSide,
//   }), []);
//   useFrame((state, delta) => {
//     if (!group.current) return;
//     group.current.rotation.y += delta * 0.28;
//     group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
//   });
//   return (
//     <group ref={group} scale={1.08}>
//       <SparkleRig speed={1.0} />
//       <GlintParticles />
//       <mesh geometry={brilliantGeo} material={mat} />
//       <mesh geometry={brilliantGeo} scale={0.96}>
//         <meshPhysicalMaterial color={new THREE.Color(0.8, 0.92, 1.0)} roughness={0} transmission={1} thickness={0.8} ior={2.42} envMapIntensity={4} transparent side={THREE.BackSide} />
//       </mesh>
//     </group>
//   );
// }

// // ══════════════════════════════════════════════════════════════════════
// // STEP DATA
// // ══════════════════════════════════════════════════════════════════════

// const STEPS = [
//   {
//     id: 1, label: "Rough Birth Registration", progress: 5,
//     details: {
//       title: "Rough Birth Registration",
//       points: [
//         "Each rough diamond parcel is assigned a unique identification code once taken under manufacturing floor.",
//         "This code is recorded in the ERP system with the import document evidence.",
//       ],
//       subHeading: "Splitting & Barcoding",
//       subPoints: ["Unique identification number is assigned to each stone and entered in the ERP to track the stone in each process."],
//       tags: ["Kimberley Process Certification", "Invoice", "Barcode ID"],
//     },
//   },
//   {
//     id: 2, label: "Scanning & Planning", progress: 22,
//     details: {
//       title: "Scanning & Planning",
//       points: ["Each stone is scanned in galaxy scanning machine.", "Scanned stone is planned on the 3D model with optimum value and entered in ERP."],
//       subHeading: null, subPoints: [],
//       tags: ["Carat", "Color", "Shape", "Clarity"],
//     },
//   },
//   {
//     id: 3, label: "Laser Cutting", progress: 43,
//     details: {
//       title: "Laser Cutting",
//       points: ["The planned stone is then split as per the value and entered in ERP."],
//       subHeading: "Data Uploaded to ERP", subPoints: [],
//       tags: ["Carat", "Color", "Shape", "Clarity", "Cut"],
//     },
//   },
//   {
//     id: 4, label: "Plan Registration", progress: 64,
//     details: {
//       title: "Plan Registration",
//       points: [
//         "The split stones QC is done and the final registration of plan is done.",
//         "The expected polished is registered against the unique code in ERP.",
//       ],
//       subHeading: "Data Uploaded to ERP", subPoints: [],
//       tags: ["Carat", "Color", "Shape", "Clarity", "Cut"],
//     },
//   },
//   {
//     id: 5, label: "Shaping & Polishing", progress: 91,
//     details: {
//       title: "Shaping & Polishing",
//       points: [
//         "The shaping & polishing is done as per the plan registered.",
//         "Pre & post shaping & planning details are entered in ERP.",
//       ],
//       subHeading: "Data Uploaded to ERP", subPoints: [],
//       tags: ["Carat", "Color", "Shape", "Clarity", "Cut", "QC details"],
//     },
//   },
// ];

// // ══════════════════════════════════════════════════════════════════════
// // DiamondModel — routes to GLTF or procedural based on USE_GLTF_MODEL
// // ══════════════════════════════════════════════════════════════════════

// function DiamondModel({ stepId }: { stepId: number }) {
//   // ── GLTF PATH ────────────────────────────────────────────────────────
//   // When USE_GLTF_MODEL is true, every step shows the same GLTF model.
//   // If you want per-step GLTF variants, create separate files and add a
//   // switch here matching each stepId to its own path.
//   if (USE_GLTF_MODEL) {
//     return <GLTFDiamond />;
//   }

//   // ── PROCEDURAL PATH (original) ───────────────────────────────────────
//   switch (stepId) {
//     case 1: return <RoughStone />;
//     case 2: return <ScannedStone />;
//     case 3: return <LaserCutStone />;
//     case 4: return <PlannedStone />;
//     case 5: return <PolishedDiamond />;
//     default: return <RoughStone />;
//   }
// }

// // ── CSS Diamond Fallback ───────────────────────────────────────────────
// const CSS_STEP_THEMES: Record<number, { top: string; mid: string; bottom: string; accent: string }> = {
//   1: { top: "#c5d5e2", mid: "#a8bece", bottom: "#8fafc2", accent: "#b0c8da" },
//   2: { top: "#b8ccde", mid: "#5a88c0", bottom: "#3a6899", accent: "#7aaad4" },
//   3: { top: "#b8ccda", mid: "#90b8c8", bottom: "#6899ae", accent: "#00cc55" },
//   4: { top: "#bdd0e0", mid: "#90afc8", bottom: "#6890b0", accent: "#8ab8d8" },
//   5: { top: "#ddeeff", mid: "#aaddff", bottom: "#88c8f8", accent: "#1CA9C9" },
// };

// function CssDiamondFallback({ stepId }: { stepId: number }) {
//   const t = CSS_STEP_THEMES[stepId] ?? CSS_STEP_THEMES[5];
//   const id = `dfb-${stepId}`;
//   return (
//     <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
//       <style>{`
//         @keyframes diamond-rotate { 0%{transform:rotateY(0deg) rotateX(8deg)} 100%{transform:rotateY(360deg) rotateX(8deg)} }
//         @keyframes shimmer { 0%,100%{opacity:0.3} 50%{opacity:0.95} }
//         @keyframes glint { 0%,100%{opacity:0;transform:scale(0)} 40%,60%{opacity:1;transform:scale(1)} }
//         .d-wrap { animation: diamond-rotate 5s linear infinite; transform-style: preserve-3d; }
//         .d-shimmer { animation: shimmer 2.2s ease-in-out infinite; }
//         .d-shimmer2 { animation: shimmer 1.8s ease-in-out infinite 0.6s; }
//         .d-shimmer3 { animation: shimmer 2.6s ease-in-out infinite 1.1s; }
//         .d-glint1 { animation: glint 2.4s ease-in-out infinite 0.3s; }
//         .d-glint2 { animation: glint 2.1s ease-in-out infinite 1.2s; }
//         .d-glint3 { animation: glint 1.9s ease-in-out infinite 0.7s; }
//       `}</style>
//       <div className="d-wrap">
//         <svg viewBox="0 0 200 220" width="180" height="200" style={{ filter: "drop-shadow(0 8px 32px rgba(28,169,201,0.3)) drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }}>
//           <defs>
//             <linearGradient id={`g1-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="white" stopOpacity="0.95" />
//               <stop offset="50%" stopColor={t.top} stopOpacity="0.85" />
//               <stop offset="100%" stopColor={t.mid} stopOpacity="0.7" />
//             </linearGradient>
//             <linearGradient id={`g2-${id}`} x1="100%" y1="0%" x2="0%" y2="100%">
//               <stop offset="0%" stopColor={t.mid} stopOpacity="0.8" />
//               <stop offset="100%" stopColor={t.bottom} stopOpacity="0.9" />
//             </linearGradient>
//             <linearGradient id={`g3-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop offset="0%" stopColor={t.top} stopOpacity="0.6" />
//               <stop offset="100%" stopColor={t.bottom} stopOpacity="0.95" />
//             </linearGradient>
//             <linearGradient id={`gs-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="white" stopOpacity="0" />
//               <stop offset="50%" stopColor="white" stopOpacity="0.9" />
//               <stop offset="100%" stopColor="white" stopOpacity="0" />
//             </linearGradient>
//           </defs>
//           <polygon points="100,12 133,22 150,52 133,62 100,72 67,62 50,52 67,22" fill={`url(#g1-${id})`} stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
//           <polygon points="67,22 50,52 100,72" fill={`url(#g2-${id})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" opacity="0.9" />
//           <polygon points="67,22 100,12 100,72" fill={`url(#g1-${id})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" opacity="0.8" />
//           <polygon points="133,22 150,52 100,72" fill={`url(#g3-${id})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" opacity="0.85" />
//           <polygon points="133,22 100,12 100,72" fill={`url(#g2-${id})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" opacity="0.75" />
//           <polygon points="50,52 67,62 133,62 150,52 150,58 133,68 67,68 50,58" fill={t.accent} opacity="0.28" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
//           <polygon points="50,58 67,68 100,210" fill={`url(#g3-${id})`} stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" opacity="0.9" />
//           <polygon points="67,68 100,72 100,210" fill={`url(#g2-${id})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" opacity="0.8" />
//           <polygon points="150,58 133,68 100,210" fill={`url(#g2-${id})`} stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" opacity="0.85" />
//           <polygon points="133,68 100,72 100,210" fill={`url(#g1-${id})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" opacity="0.7" />
//           <polygon className="d-shimmer" points="67,22 133,22 150,52 133,62 100,72 67,62 50,52 67,22" fill={`url(#gs-${id})`} />
//           <polygon className="d-shimmer2" points="100,72 133,62 100,210" fill={`url(#gs-${id})`} opacity="0.6" />
//           <polygon className="d-shimmer3" points="100,72 67,62 100,210" fill={`url(#gs-${id})`} opacity="0.5" />
//           <g className="d-glint1">
//             <line x1="136" y1="19" x2="136" y2="29" stroke="white" strokeWidth="1.5" opacity="0.9" />
//             <line x1="131" y1="24" x2="141" y2="24" stroke="white" strokeWidth="1.5" opacity="0.9" />
//           </g>
//           <g className="d-glint2">
//             <line x1="60" y1="48" x2="60" y2="56" stroke="white" strokeWidth="1.2" opacity="0.8" />
//             <line x1="56" y1="52" x2="64" y2="52" stroke="white" strokeWidth="1.2" opacity="0.8" />
//           </g>
//           <g className="d-glint3">
//             <line x1="100" y1="165" x2="100" y2="173" stroke="white" strokeWidth="1" opacity="0.7" />
//             <line x1="96" y1="169" x2="104" y2="169" stroke="white" strokeWidth="1" opacity="0.7" />
//           </g>
//           <circle cx="100" cy="42" r="4" fill="white" opacity="0.85" />
//           <circle cx="100" cy="42" r="7" fill="white" opacity="0.2" />
//         </svg>
//       </div>
//     </div>
//   );
// }

// // ══════════════════════════════════════════════════════════════════════
// // TRACEABILITY SECTION — fully responsive
// // ══════════════════════════════════════════════════════════════════════

// const SLIDE_INTERVAL = 3500; // ms per step

// function DiamondTraceability() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [paused, setPaused] = useState(false);
//   const [progress, setProgress] = useState(0); // 0–100 ticker for the ring
//   const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const step = STEPS[activeStep];
//   const width = useWindowWidth();

//   // Advance to next step
//   const advance = () => {
//     setActiveStep((s) => (s + 1) % STEPS.length);
//     setProgress(0);
//   };

//   // Manual jump — pause auto-play for one full cycle then resume
//   const jumpTo = (i: number) => {
//     setActiveStep(i);
//     setProgress(0);
//     setPaused(true);
//     // resume after one interval
//     setTimeout(() => setPaused(false), SLIDE_INTERVAL);
//   };

//   // Main auto-advance interval
//   useEffect(() => {
//     if (paused) {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//       return;
//     }
//     intervalRef.current = setInterval(advance, SLIDE_INTERVAL);
//     return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
//   }, [paused, activeStep]);

//   // Progress ticker (60fps-ish) for the ring animation
//   useEffect(() => {
//     setProgress(0);
//     if (tickRef.current) clearInterval(tickRef.current);
//     if (paused) return;
//     const tickMs = 50;
//     tickRef.current = setInterval(() => {
//       setProgress((p) => Math.min(100, p + (tickMs / SLIDE_INTERVAL) * 100));
//     }, tickMs);
//     return () => { if (tickRef.current) clearInterval(tickRef.current); };
//   }, [activeStep, paused]);

//   // Ring SVG helpers
//   const R = 14;
//   const circ = 2 * Math.PI * R;
//   const dash = (progress / 100) * circ;

//   // Breakpoints
//   const isMobile = width < 640;
//   const isTablet = width >= 640 && width < 1024;
//   const isDesktop = width >= 1024;

//   // Canvas height scales with viewport
//   const canvasHeight = isMobile ? 260 : isTablet ? 340 : 420;

//   // Shared progress-ring dot nav used by all breakpoints
//   const DotNav = ({ mt = "28px" }: { mt?: string }) => (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: mt }}>
//       {STEPS.map((_, i) => {
//         const isActive = i === activeStep;
//         return (
//           <button
//             key={i}
//             onClick={() => jumpTo(i)}
//             aria-label={`Go to step ${i + 1}`}
//             style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
//           >
//             {isActive ? (
//               <svg width="20" height="20" viewBox="0 0 32 32">
//                 <circle cx="16" cy="16" r={R} fill="none" stroke="rgba(2,39,74,0.12)" strokeWidth="2.5" />
//                 <circle
//                   cx="16" cy="16" r={R} fill="none" stroke="#1CA9C9" strokeWidth="2.5"
//                   strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
//                   style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dasharray 0.05s linear" }}
//                 />
//                 <circle cx="16" cy="16" r="4" fill="#1CA9C9" />
//               </svg>
//             ) : (
//               <svg width="10" height="10" viewBox="0 0 10 10">
//                 <circle cx="5" cy="5" r="4" fill={i < activeStep ? "#1CA9C9" : "rgba(2,39,74,0.2)"} />
//               </svg>
//             )}
//           </button>
//         );
//       })}
//     </div>
//   );

//   return (
//     <section
//       style={{ background: "#f2f5f8", padding: isMobile ? "52px 0 40px" : "80px 0" }}
//       onMouseEnter={() => setPaused(true)}
//       onMouseLeave={() => setPaused(false)}
//     >
//       <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>

//         {/* Section header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           style={{ marginBottom: isMobile ? "32px" : "52px" }}
//         >
//           <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.45em", color: "#1CA9C9", marginBottom: "12px", fontWeight: 500 }}>
//             Diamond Journey
//           </p>
//           <h2 style={{ fontFamily: "Georgia, serif", fontSize: isMobile ? "1.75rem" : "clamp(2rem, 4vw, 3rem)", color: "#02274A", lineHeight: 1.2, margin: 0 }}>
//             From Rough to<br />
//             <span style={{ color: "rgba(2,39,74,0.25)" }}>Brilliant.</span>
//           </h2>
//           <span style={{ display: "block", width: "40px", height: "1px", background: "#1CA9C9", marginTop: "18px" }} />
//         </motion.div>

//         {/* ── MOBILE: pills → canvas → details (stacked) ── */}
//         {isMobile && (
//           <div>
//             {/* Horizontal scrolling step pills */}
//             <div style={{
//               display: "flex",
//               overflowX: "auto",
//               gap: "8px",
//               paddingBottom: "16px",
//               scrollbarWidth: "none",
//               WebkitOverflowScrolling: "touch",
//               msOverflowStyle: "none",
//             }}>
//               {STEPS.map((s, i) => {
//                 const isActive = i === activeStep;
//                 return (
//                   <button
//                     key={s.id}
//                     onClick={() => jumpTo(i)}
//                     style={{
//                       flexShrink: 0,
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "6px",
//                       padding: "8px 14px",
//                       background: isActive ? "#1CA9C9" : "white",
//                       color: isActive ? "white" : "rgba(2,39,74,0.5)",
//                       border: `1px solid ${isActive ? "#1CA9C9" : "rgba(2,39,74,0.12)"}`,
//                       borderRadius: "20px",
//                       fontSize: "11px",
//                       fontWeight: isActive ? 600 : 400,
//                       cursor: "pointer",
//                       whiteSpace: "nowrap",
//                       fontFamily: "'Inter', sans-serif",
//                       transition: "all 0.2s",
//                     }}
//                   >
//                     <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
//                       <polygon points="12,2 22,9 12,22 2,9" fill={isActive ? "white" : "#1CA9C9"} opacity="0.9" />
//                     </svg>
//                     {s.label}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Progress bar — mobile */}
//             <div style={{ marginBottom: "4px" }}>
//               <div style={{ height: "3px", background: "rgba(2,39,74,0.08)", borderRadius: "2px", marginBottom: "6px" }}>
//                 <motion.div
//                   style={{ height: "100%", background: "#1CA9C9", borderRadius: "2px", originX: 0 }}
//                   animate={{ width: `${step.progress}%` }}
//                   transition={{ duration: 0.5, ease: "easeOut" }}
//                 />
//               </div>
//               <span style={{ fontSize: "11px", color: "rgba(2,39,74,0.4)", letterSpacing: "0.05em" }}>{step.progress}% complete</span>
//             </div>

//             {/* Canvas */}
//             <div style={{
//               height: `${canvasHeight}px`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               position: "relative",
//               margin: "16px 0",
//             }}>
//               <div style={{
//                 position: "absolute", inset: 0,
//                 background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(28,169,201,0.10) 0%, transparent 70%)",
//                 pointerEvents: "none",
//               }} />
//               {HAS_WEBGL ? (
//                 <Canvas
//                   camera={{ position: [0, 0.1, 3.8], fov: 38 }}
//                   style={{ width: "100%", height: "100%", background: "transparent" }}
//                   gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
//                 >
//                   <ambientLight intensity={0.3} color="#c8e0ff" />
//                   <directionalLight position={[0, 8, 4]} intensity={1.5} color="#ffffff" castShadow />
//                   <directionalLight position={[-4, 2, -4]} intensity={0.6} color="#c0d8ff" />
//                   <Suspense fallback={null}>
//                     <Environment preset="warehouse" environmentIntensity={2.5} />
//                     <DiamondModel stepId={step.id} />
//                   </Suspense>
//                 </Canvas>
//               ) : (
//                 <CssDiamondFallback stepId={step.id} />
//               )}
//             </div>

//             {/* Step details card */}
//             <motion.div
//               key={activeStep}
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.35, ease: "easeOut" }}
//               style={{
//                 background: "white",
//                 padding: "20px 18px",
//                 boxShadow: "0 2px 20px rgba(2,39,74,0.07)",
//                 borderRadius: "2px",
//               }}
//             >
//               <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3px", flexShrink: 0 }}>
//                   <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid #1CA9C9", background: "white" }} />
//                   <div style={{ width: "1px", height: "20px", background: "rgba(28,169,201,0.3)", margin: "4px 0" }} />
//                   <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid rgba(28,169,201,0.4)", background: "white" }} />
//                 </div>
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <h3 style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "#02274A", margin: "0 0 10px", lineHeight: 1.3 }}>
//                     {step.details.title}
//                   </h3>
//                   <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
//                     {step.details.points.map((pt, i) => (
//                       <li key={i} style={{ fontSize: "12px", color: "rgba(2,39,74,0.6)", marginBottom: "6px", lineHeight: 1.5 }}>{pt}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//               {step.details.subHeading && (
//                 <p style={{ fontSize: "12px", fontWeight: 600, color: "#02274A", marginBottom: "8px", marginLeft: "22px" }}>
//                   {step.details.subHeading}
//                 </p>
//               )}
//               {step.details.subPoints.map((sp, i) => (
//                 <p key={i} style={{ fontSize: "12px", color: "rgba(2,39,74,0.55)", marginLeft: "22px", lineHeight: 1.5 }}>{sp}</p>
//               ))}
//               <div style={{ marginTop: "16px", marginLeft: "22px" }}>
//                 <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(2,39,74,0.35)", marginBottom: "10px" }}>
//                   Data Uploaded to ERP
//                 </p>
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
//                   {step.details.tags.map((tag) => (
//                     <span key={tag} style={{
//                       fontSize: "10px", padding: "4px 10px",
//                       border: "1px solid rgba(2,39,74,0.12)", color: "rgba(2,39,74,0.55)",
//                       borderRadius: "2px", letterSpacing: "0.02em",
//                     }}>{tag}</span>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             <DotNav mt="28px" />
//           </div>
//         )}

//         {/* ── TABLET: steps list left + canvas right, details below ── */}
//         {isTablet && (
//           <div>
//             <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "start" }}>

//               {/* Left: steps list */}
//               <div style={{ background: "white", borderRadius: "2px", overflow: "hidden", boxShadow: "0 2px 16px rgba(2,39,74,0.06)" }}>
//                 {STEPS.map((s, i) => {
//                   const isActive = i === activeStep;
//                   const isPast = i < activeStep;
//                   return (
//                     <button
//                       key={s.id}
//                       onClick={() => jumpTo(i)}
//                       style={{
//                         display: "flex", alignItems: "center", gap: "10px", width: "100%",
//                         padding: "14px 16px", background: isActive ? "white" : "transparent",
//                         border: "none", borderLeft: isActive ? "3px solid #1CA9C9" : "3px solid transparent",
//                         cursor: "pointer", textAlign: "left", transition: "all 0.2s",
//                         borderBottom: "1px solid rgba(2,39,74,0.06)",
//                       }}
//                     >
//                       <div style={{ width: "24px", height: "24px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: isActive ? 1 : isPast ? 0.7 : 0.3 }}>
//                         <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
//                           <polygon points="12,2 22,9 12,22 2,9" fill={isActive ? "#1CA9C9" : "#02274A"} opacity={isActive ? 0.9 : 0.5} />
//                         </svg>
//                       </div>
//                       <span style={{
//                         fontSize: "11px", fontWeight: isActive ? 600 : 400,
//                         color: isActive ? "#02274A" : isPast ? "#02274A" : "rgba(2,39,74,0.4)",
//                         lineHeight: 1.3, fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em",
//                       }}>{s.label}</span>
//                     </button>
//                   );
//                 })}
//                 <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(2,39,74,0.07)" }}>
//                   <div style={{ height: "3px", background: "rgba(2,39,74,0.08)", borderRadius: "2px", marginBottom: "6px" }}>
//                     <motion.div
//                       style={{ height: "100%", background: "#1CA9C9", borderRadius: "2px", originX: 0 }}
//                       animate={{ width: `${step.progress}%` }}
//                       transition={{ duration: 0.5, ease: "easeOut" }}
//                     />
//                   </div>
//                   <span style={{ fontSize: "11px", color: "rgba(2,39,74,0.4)", letterSpacing: "0.05em" }}>{step.progress}%</span>
//                 </div>
//               </div>

//               {/* Right: canvas */}
//               <div style={{ height: `${canvasHeight}px`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
//                 <div style={{
//                   position: "absolute", inset: 0,
//                   background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(28,169,201,0.10) 0%, transparent 70%)",
//                   pointerEvents: "none",
//                 }} />
//                 {HAS_WEBGL ? (
//                   <Canvas
//                     camera={{ position: [0, 0.1, 3.8], fov: 38 }}
//                     style={{ width: "100%", height: "100%", background: "transparent" }}
//                     gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
//                   >
//                     <ambientLight intensity={0.3} color="#c8e0ff" />
//                     <directionalLight position={[0, 8, 4]} intensity={1.5} color="#ffffff" castShadow />
//                     <directionalLight position={[-4, 2, -4]} intensity={0.6} color="#c0d8ff" />
//                     <Suspense fallback={null}>
//                       <Environment preset="warehouse" environmentIntensity={2.5} />
//                       <DiamondModel stepId={step.id} />
//                     </Suspense>
//                   </Canvas>
//                 ) : (
//                   <CssDiamondFallback stepId={step.id} />
//                 )}
//               </div>
//             </div>

//             {/* Details below the two-col row */}
//             <motion.div
//               key={activeStep}
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.35, ease: "easeOut" }}
//               style={{
//                 background: "white", padding: "24px 22px",
//                 boxShadow: "0 2px 20px rgba(2,39,74,0.07)", borderRadius: "2px", marginTop: "24px",
//               }}
//             >
//               <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3px", flexShrink: 0 }}>
//                   <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid #1CA9C9", background: "white" }} />
//                   <div style={{ width: "1px", height: "20px", background: "rgba(28,169,201,0.3)", margin: "4px 0" }} />
//                   <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid rgba(28,169,201,0.4)", background: "white" }} />
//                 </div>
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <h3 style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "#02274A", margin: "0 0 10px", lineHeight: 1.3 }}>
//                     {step.details.title}
//                   </h3>
//                   <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
//                     {step.details.points.map((pt, i) => (
//                       <li key={i} style={{ fontSize: "12px", color: "rgba(2,39,74,0.6)", marginBottom: "6px", lineHeight: 1.5 }}>{pt}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//               {step.details.subHeading && (
//                 <p style={{ fontSize: "12px", fontWeight: 600, color: "#02274A", marginBottom: "8px", marginLeft: "22px" }}>
//                   {step.details.subHeading}
//                 </p>
//               )}
//               {step.details.subPoints.map((sp, i) => (
//                 <p key={i} style={{ fontSize: "12px", color: "rgba(2,39,74,0.55)", marginLeft: "22px", lineHeight: 1.5 }}>{sp}</p>
//               ))}
//               <div style={{ marginTop: "20px", marginLeft: "22px" }}>
//                 <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(2,39,74,0.35)", marginBottom: "10px" }}>
//                   Data Uploaded to ERP
//                 </p>
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
//                   {step.details.tags.map((tag) => (
//                     <span key={tag} style={{
//                       fontSize: "10px", padding: "4px 10px",
//                       border: "1px solid rgba(2,39,74,0.12)", color: "rgba(2,39,74,0.55)",
//                       borderRadius: "2px", letterSpacing: "0.02em",
//                     }}>{tag}</span>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             <DotNav mt="36px" />
//           </div>
//         )}

//         {/* ── DESKTOP: original 3-column layout ── */}
//         {isDesktop && (
//           <>
//             <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 300px", gap: "32px", alignItems: "center" }}>

//               {/* LEFT — Steps list */}
//               <div style={{ background: "white", borderRadius: "2px", overflow: "hidden", boxShadow: "0 2px 16px rgba(2,39,74,0.06)" }}>
//                 {STEPS.map((s, i) => {
//                   const isActive = i === activeStep;
//                   const isPast = i < activeStep;
//                   return (
//                     <button
//                       key={s.id}
//                       onClick={() => jumpTo(i)}
//                       style={{
//                         display: "flex", alignItems: "center", gap: "12px", width: "100%",
//                         padding: "16px 18px", background: isActive ? "white" : "transparent",
//                         border: "none", borderLeft: isActive ? "3px solid #1CA9C9" : "3px solid transparent",
//                         cursor: "pointer", textAlign: "left", transition: "all 0.2s",
//                         borderBottom: "1px solid rgba(2,39,74,0.06)",
//                       }}
//                     >
//                       <div style={{ width: "28px", height: "28px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: isActive ? 1 : isPast ? 0.7 : 0.3 }}>
//                         <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
//                           <polygon points="12,2 22,9 12,22 2,9" fill={isActive ? "#1CA9C9" : "#02274A"} opacity={isActive ? 0.9 : 0.5} />
//                         </svg>
//                       </div>
//                       <span style={{
//                         fontSize: "12px", fontWeight: isActive ? 600 : 400,
//                         color: isActive ? "#02274A" : isPast ? "#02274A" : "rgba(2,39,74,0.4)",
//                         lineHeight: 1.3, fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em",
//                       }}>{s.label}</span>
//                     </button>
//                   );
//                 })}
//                 <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(2,39,74,0.07)" }}>
//                   <div style={{ height: "3px", background: "rgba(2,39,74,0.08)", borderRadius: "2px", marginBottom: "8px" }}>
//                     <motion.div
//                       style={{ height: "100%", background: "#1CA9C9", borderRadius: "2px", originX: 0 }}
//                       animate={{ width: `${step.progress}%` }}
//                       transition={{ duration: 0.5, ease: "easeOut" }}
//                     />
//                   </div>
//                   <span style={{ fontSize: "11px", color: "rgba(2,39,74,0.4)", letterSpacing: "0.05em" }}>{step.progress}%</span>
//                 </div>
//               </div>

//               {/* CENTER — 3D Canvas */}
//               <div style={{ height: `${canvasHeight}px`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
//                 <div style={{
//                   position: "absolute", inset: 0,
//                   background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(28,169,201,0.10) 0%, transparent 70%)",
//                   pointerEvents: "none",
//                 }} />
//                 {HAS_WEBGL ? (
//                   <Canvas
//                     camera={{ position: [0, 0.1, 3.8], fov: 38 }}
//                     style={{ width: "100%", height: "100%", background: "transparent" }}
//                     gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.4 }}
//                   >
//                     <ambientLight intensity={0.3} color="#c8e0ff" />
//                     <directionalLight position={[0, 8, 4]} intensity={1.5} color="#ffffff" castShadow />
//                     <directionalLight position={[-4, 2, -4]} intensity={0.6} color="#c0d8ff" />
//                     <Suspense fallback={null}>
//                       <Environment preset="warehouse" environmentIntensity={2.5} />
//                       <DiamondModel stepId={step.id} />
//                     </Suspense>
//                   </Canvas>
//                 ) : (
//                   <CssDiamondFallback stepId={step.id} />
//                 )}
//               </div>

//               {/* RIGHT — Step details */}
//               <motion.div
//                 key={activeStep}
//                 initial={{ opacity: 0, x: 16 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//                 style={{ background: "white", padding: "28px 24px", boxShadow: "0 2px 20px rgba(2,39,74,0.07)", borderRadius: "2px" }}
//               >
//                 <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
//                   <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3px" }}>
//                     <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid #1CA9C9", background: "white" }} />
//                     <div style={{ width: "1px", height: "24px", background: "rgba(28,169,201,0.3)", margin: "4px 0" }} />
//                     <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid rgba(28,169,201,0.4)", background: "white" }} />
//                   </div>
//                   <div style={{ flex: 1 }}>
//                     <h3 style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "#02274A", margin: "0 0 10px", lineHeight: 1.3 }}>
//                       {step.details.title}
//                     </h3>
//                     <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
//                       {step.details.points.map((pt, i) => (
//                         <li key={i} style={{ fontSize: "12px", color: "rgba(2,39,74,0.6)", marginBottom: "6px", lineHeight: 1.5 }}>{pt}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//                 {step.details.subHeading && (
//                   <p style={{ fontSize: "12px", fontWeight: 600, color: "#02274A", marginBottom: "8px", marginLeft: "22px" }}>
//                     {step.details.subHeading}
//                   </p>
//                 )}
//                 {step.details.subPoints.map((sp, i) => (
//                   <p key={i} style={{ fontSize: "12px", color: "rgba(2,39,74,0.55)", marginLeft: "22px", lineHeight: 1.5 }}>{sp}</p>
//                 ))}
//                 <div style={{ marginTop: "20px", marginLeft: "22px" }}>
//                   <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(2,39,74,0.35)", marginBottom: "10px" }}>
//                     Data Uploaded to ERP
//                   </p>
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
//                     {step.details.tags.map((tag) => (
//                       <span key={tag} style={{
//                         fontSize: "10px", padding: "4px 10px",
//                         border: "1px solid rgba(2,39,74,0.12)", color: "rgba(2,39,74,0.55)",
//                         borderRadius: "2px", letterSpacing: "0.02em",
//                       }}>{tag}</span>
//                     ))}
//                   </div>
//                 </div>
//               </motion.div>
//             </div>

//             <DotNav mt="40px" />
//           </>
//         )}

//       </div>
//     </section>
//   );
// }

// // ══════════════════════════════════════════════════════════════════════
// // JOURNAL PAGE
// // ══════════════════════════════════════════════════════════════════════

// export default function Journal() {
//   const { data: sanityArticles } = useSanityQuery<SanityArticle[]>(["journal-articles"], JOURNAL_ARTICLES_QUERY);

//   const articles = isSanityConfigured && sanityArticles && sanityArticles.length > 0
//     ? sanityArticles.map((a, i) => ({
//         id: i + 1, title: a.title, date: formatDate(a.publishedAt),
//         category: a.category, excerpt: a.excerpt, featured: a.featured, slug: a.slug?.current,
//       }))
//     : ARTICLES;

//   const [featured, ...rest] = articles;

//   return (
//     <div style={{ fontFamily: "'Inter', sans-serif" }}>

//       {/* ── Hero ── */}
//       <section className="pt-28 md:pt-40 pb-20 md:pb-28 px-8 md:px-14 lg:px-20" style={{ background: "#02274A" }}>
//         <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-end">
//           <div className="space-y-5 md:space-y-6">
//             <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] font-medium" style={{ color: "#1CA9C9" }}>
//               Knowledge &amp; Insight
//             </motion.p>
//             <motion.h1 variants={up} className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
//               Journal &amp;<br /><span style={{ color: "rgba(255,255,255,0.3)" }}>Insights.</span>
//             </motion.h1>
//             <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
//           </div>
//           <motion.p variants={up} className="text-white/40 text-sm md:text-base leading-relaxed md:pb-3">
//             Perspectives on diamond grading, investment-grade stones, and the IF→FL conversion process,
//             written for trade professionals who already understand the fundamentals.
//           </motion.p>
//         </motion.div>
//       </section>

//       {/* ── Featured Article ── */}
//       <section className="py-20 md:py-28 px-6" style={{ background: "#F4F8FC" }}>
//         <div className="max-w-7xl mx-auto">
//           <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[9px] uppercase tracking-[0.45em] mb-10 font-medium" style={{ color: "#1CA9C9" }}>
//             Featured
//           </motion.p>
//           <motion.article
//             initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: EASE }}
//             className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center p-8 md:p-14"
//             style={{ background: "white", border: "1px solid rgba(2,39,74,0.08)" }}
//           >
//             <div className="space-y-5">
//               <div className="flex items-center gap-4">
//                 <span className="text-[8px] uppercase tracking-[0.42em]" style={{ color: "#1CA9C9" }}>{featured.category}</span>
//                 <span className="w-6 h-px" style={{ background: "rgba(28,169,201,0.3)" }} />
//                 <span className="text-[8px] uppercase tracking-[0.3em]" style={{ color: "rgba(2,39,74,0.3)" }}>{featured.date}</span>
//               </div>
//               <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: "#02274A" }}>{featured.title}</h2>
//               <span className="block w-8 h-px" style={{ background: "#1CA9C9" }} />
//               <p className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.5)" }}>{featured.excerpt}</p>
//               <Link href={`/journal/${featured.id}`} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors hover:gap-3" style={{ color: "#1CA9C9" }}>
//                 Read Article <ArrowRight size={11} />
//               </Link>
//             </div>
//             <div className="aspect-[4/3] hidden lg:block" style={{ background: "linear-gradient(135deg, #02274A 0%, #04385E 100%)", position: "relative", overflow: "hidden" }}>
//               <div className="absolute inset-0 flex items-center justify-center opacity-5">
//                 <span className="font-serif" style={{ fontSize: "14rem", color: "white", letterSpacing: "-0.04em", lineHeight: 1 }}>01</span>
//               </div>
//               <div className="absolute bottom-8 left-8">
//                 <p className="text-[9px] uppercase tracking-[0.4em] mb-1" style={{ color: "rgba(28,169,201,0.6)" }}>GIA Documentation</p>
//                 <p className="text-white/20 text-xs">Certificate interpretation for professionals</p>
//               </div>
//             </div>
//           </motion.article>
//         </div>
//       </section>

//       {/* ── 3D Diamond Journey ── */}
//       <DiamondTraceability />

//       {/* ── Article List ── */}
//       <section className="py-20 md:py-28 px-6" style={{ background: "white" }}>
//         <div className="max-w-7xl mx-auto">
//           <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[9px] uppercase tracking-[0.45em] mb-10 font-medium" style={{ color: "#1CA9C9" }}>
//             All Articles
//           </motion.p>
//           <div className="divide-y" style={{ borderTop: "1px solid rgba(2,39,74,0.07)", borderColor: "rgba(2,39,74,0.07)" }}>
//             {rest.map((article, i) => (
//               <motion.article
//                 key={article.id}
//                 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
//                 className="py-10 grid md:grid-cols-[180px_1fr_auto] gap-6 md:gap-12 items-start group"
//               >
//                 <div className="space-y-1">
//                   <p className="text-[8px] uppercase tracking-[0.42em] font-medium" style={{ color: "#1CA9C9" }}>{article.category}</p>
//                   <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(2,39,74,0.3)" }}>{article.date}</p>
//                 </div>
//                 <div className="space-y-3">
//                   <h2 className="font-serif text-xl md:text-2xl leading-snug group-hover:text-[#1CA9C9] transition-colors" style={{ color: "#02274A" }}>
//                     {article.title}
//                   </h2>
//                   <p className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.45)" }}>{article.excerpt}</p>
//                 </div>
//                 <div className="flex items-start pt-1">
//                   <Link href={`/journal/${article.id}`} className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] shrink-0 group-hover:gap-3 transition-all" style={{ color: "rgba(2,39,74,0.3)" }}>
//                     Read <ArrowRight size={10} />
//                   </Link>
//                 </div>
//               </motion.article>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CTA strip ── */}
//       <section className="py-16 px-6" style={{ background: "#02274A", borderTop: "1px solid rgba(28,169,201,0.1)" }}>
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
//           <div>
//             <p className="text-[9px] uppercase tracking-[0.45em] mb-2" style={{ color: "#1CA9C9" }}>Trade Enquiries</p>
//             <p className="font-serif text-2xl text-white">Ready to discuss your stones?</p>
//           </div>
//           <Link href="/contact">
//             <button className="text-[10px] uppercase tracking-[0.3em] text-white transition-all hover:opacity-80" style={{ background: "#1CA9C9", height: "50px", padding: "0 2.5rem", border: "none" }}>
//               Begin the Conversation →
//             </button>
//           </Link>
//         </div>
//       </section>

//     </div>
//   );
// }

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ── Responsive hook ────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ── Motion helpers ─────────────────────────────────────────────────────
const EASE = [0.25, 0.1, 0.25, 1] as const;

// ── Minimal Link shim ──────────────────────────────────────────────────
function Link({ href, className, children, style, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return <a href={href} className={className} style={style} {...rest}>{children}</a>;
}

// ── Sanity shims ───────────────────────────────────────────────────────
const isSanityConfigured = false;
function useSanityQuery<T>(_keys: string[], _query: string) {
  return { data: null as T | null };
}
const JOURNAL_ARTICLES_QUERY = "";

interface SanityArticle {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category: string;
  excerpt: string;
  featured: boolean;
}

function formatDate(d: string) {
  try { return new Date(d).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" }); } catch { return d; }
}

const up = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const ARTICLES = [
  {
    id: 1,
    title: "Understanding GIA Certificate Comments",
    date: "March 15, 2026",
    category: "Expertise",
    excerpt: "The true value of a diamond often lies in what the certificate comments reveal. A deep dive into interpreting GIA dossiers for conversion potential and investment positioning.",
    featured: true,
  },
  {
    id: 2,
    title: "IF to FL: The Hidden Opportunity in Diamond Grading",
    date: "February 28, 2026",
    category: "Investment",
    excerpt: "How precise evaluation and masterful regrinding can elevate an Internally Flawless stone to Flawless, unlocking significant premiums without changing carat weight.",
    featured: false,
  },
  {
    id: 3,
    title: "Lab-Grown vs Natural: An Investment Perspective",
    date: "January 12, 2026",
    category: "Market Insights",
    excerpt: "Navigating the diverging markets of lab-grown and natural diamonds. Where true long-term value resides for serious buyers and institutional portfolios.",
    featured: false,
  },
  {
    id: 4,
    title: "The Evolution of Diamond Sourcing",
    date: "December 05, 2025",
    category: "Innovation",
    excerpt: "From traditional craftsmanship to modern precision: how expertise and evaluation rigour are reshaping how premium stones are sourced and assessed globally.",
    featured: false,
  },
];

// ══════════════════════════════════════════════════════════════════════
// STEP DATA
// ══════════════════════════════════════════════════════════════════════

const STEPS = [
  {
    id: 1, label: "Rough Birth Registration", progress: 5,
    details: {
      title: "Rough Birth Registration",
      points: [
        "Each rough diamond parcel is assigned a unique identification code once taken under manufacturing floor.",
        "This code is recorded in the ERP system with the import document evidence.",
      ],
      subHeading: "Splitting & Barcoding",
      subPoints: ["Unique identification number is assigned to each stone and entered in the ERP to track the stone in each process."],
      tags: ["Kimberley Process Certification", "Invoice", "Barcode ID"],
    },
  },
  {
    id: 2, label: "Scanning & Planning", progress: 22,
    details: {
      title: "Scanning & Planning",
      points: ["Each stone is scanned in galaxy scanning machine.", "Scanned stone is planned on the 3D model with optimum value and entered in ERP."],
      subHeading: null, subPoints: [],
      tags: ["Carat", "Color", "Shape", "Clarity"],
    },
  },
  {
    id: 3, label: "Laser Cutting", progress: 43,
    details: {
      title: "Laser Cutting",
      points: ["The planned stone is then split as per the value and entered in ERP."],
      subHeading: "Data Uploaded to ERP", subPoints: [],
      tags: ["Carat", "Color", "Shape", "Clarity", "Cut"],
    },
  },
  {
    id: 4, label: "Plan Registration", progress: 64,
    details: {
      title: "Plan Registration",
      points: [
        "The split stones QC is done and the final registration of plan is done.",
        "The expected polished is registered against the unique code in ERP.",
      ],
      subHeading: "Data Uploaded to ERP", subPoints: [],
      tags: ["Carat", "Color", "Shape", "Clarity", "Cut"],
    },
  },
  {
    id: 5, label: "Shaping & Polishing", progress: 91,
    details: {
      title: "Shaping & Polishing",
      points: [
        "The shaping & polishing is done as per the plan registered.",
        "Pre & post shaping & planning details are entered in ERP.",
      ],
      subHeading: "Data Uploaded to ERP", subPoints: [],
      tags: ["Carat", "Color", "Shape", "Clarity", "Cut", "QC details"],
    },
  },
];

// ══════════════════════════════════════════════════════════════════════
// VIDEO PLAYER — replaces the 3D Canvas
// ══════════════════════════════════════════════════════════════════════

function DiamondVideo({ height }: { height: number }) {
  return (
    <div
      style={{
        height: `${height}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Radial glow backdrop — same as original canvas wrapper */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(28,169,201,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <video
        src="/diamond-journey.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          background: "transparent",
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// TRACEABILITY SECTION — fully responsive
// ══════════════════════════════════════════════════════════════════════

const SLIDE_INTERVAL = 3500;

function DiamondTraceability() {
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const step = STEPS[activeStep];
  const width = useWindowWidth();

  const advance = () => {
    setActiveStep((s) => (s + 1) % STEPS.length);
    setProgress(0);
  };

  const jumpTo = (i: number) => {
    setActiveStep(i);
    setProgress(0);
    setPaused(true);
    setTimeout(() => setPaused(false), SLIDE_INTERVAL);
  };

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(advance, SLIDE_INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, activeStep]);

  useEffect(() => {
    setProgress(0);
    if (tickRef.current) clearInterval(tickRef.current);
    if (paused) return;
    const tickMs = 50;
    tickRef.current = setInterval(() => {
      setProgress((p) => Math.min(100, p + (tickMs / SLIDE_INTERVAL) * 100));
    }, tickMs);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [activeStep, paused]);

  const R = 14;
  const circ = 2 * Math.PI * R;
  const dash = (progress / 100) * circ;

  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  const canvasHeight = isMobile ? 260 : isTablet ? 340 : 420;

  const DotNav = ({ mt = "28px" }: { mt?: string }) => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginTop: mt }}>
      {STEPS.map((_, i) => {
        const isActive = i === activeStep;
        return (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            aria-label={`Go to step ${i + 1}`}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {isActive ? (
              <svg width="20" height="20" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r={R} fill="none" stroke="rgba(2,39,74,0.12)" strokeWidth="2.5" />
                <circle
                  cx="16" cy="16" r={R} fill="none" stroke="#1CA9C9" strokeWidth="2.5"
                  strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
                  style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dasharray 0.05s linear" }}
                />
                <circle cx="16" cy="16" r="4" fill="#1CA9C9" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 10 10">
                <circle cx="5" cy="5" r="4" fill={i < activeStep ? "#1CA9C9" : "rgba(2,39,74,0.2)"} />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <section
      style={{ background: "#f2f5f8", padding: isMobile ? "52px 0 40px" : "80px 0" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: isMobile ? "32px" : "52px" }}
        >
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.45em", color: "#1CA9C9", marginBottom: "12px", fontWeight: 500 }}>
            Diamond Journey
          </p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: isMobile ? "1.75rem" : "clamp(2rem, 4vw, 3rem)", color: "#02274A", lineHeight: 1.2, margin: 0 }}>
            From Rough to<br />
            <span style={{ color: "rgba(2,39,74,0.25)" }}>Brilliant.</span>
          </h2>
          <span style={{ display: "block", width: "40px", height: "1px", background: "#1CA9C9", marginTop: "18px" }} />
        </motion.div>

        {/* ── MOBILE ── */}
        {isMobile && (
          <div>
            {/* Horizontal scrolling step pills */}
            <div style={{
              display: "flex",
              overflowX: "auto",
              gap: "8px",
              paddingBottom: "16px",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
            }}>
              {STEPS.map((s, i) => {
                const isActive = i === activeStep;
                return (
                  <button
                    key={s.id}
                    onClick={() => jumpTo(i)}
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 14px",
                      background: isActive ? "#1CA9C9" : "white",
                      color: isActive ? "white" : "rgba(2,39,74,0.5)",
                      border: `1px solid ${isActive ? "#1CA9C9" : "rgba(2,39,74,0.12)"}`,
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: isActive ? 600 : 400,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      fontFamily: "'Inter', sans-serif",
                      transition: "all 0.2s",
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none">
                      <polygon points="12,2 22,9 12,22 2,9" fill={isActive ? "white" : "#1CA9C9"} opacity="0.9" />
                    </svg>
                    {s.label}
                  </button>
                );
              })}
            </div>

            {/* Progress bar — mobile */}
            <div style={{ marginBottom: "4px" }}>
              <div style={{ height: "3px", background: "rgba(2,39,74,0.08)", borderRadius: "2px", marginBottom: "6px" }}>
                <motion.div
                  style={{ height: "100%", background: "#1CA9C9", borderRadius: "2px", originX: 0 }}
                  animate={{ width: `${step.progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span style={{ fontSize: "11px", color: "rgba(2,39,74,0.4)", letterSpacing: "0.05em" }}>{step.progress}% complete</span>
            </div>

            {/* Video */}
            <div style={{ margin: "16px 0" }}>
              <DiamondVideo height={canvasHeight} />
            </div>

            {/* Step details card */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                background: "white",
                padding: "20px 18px",
                boxShadow: "0 2px 20px rgba(2,39,74,0.07)",
                borderRadius: "2px",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3px", flexShrink: 0 }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid #1CA9C9", background: "white" }} />
                  <div style={{ width: "1px", height: "20px", background: "rgba(28,169,201,0.3)", margin: "4px 0" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid rgba(28,169,201,0.4)", background: "white" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "#02274A", margin: "0 0 10px", lineHeight: 1.3 }}>
                    {step.details.title}
                  </h3>
                  <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                    {step.details.points.map((pt, i) => (
                      <li key={i} style={{ fontSize: "12px", color: "rgba(2,39,74,0.6)", marginBottom: "6px", lineHeight: 1.5 }}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {step.details.subHeading && (
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#02274A", marginBottom: "8px", marginLeft: "22px" }}>
                  {step.details.subHeading}
                </p>
              )}
              {step.details.subPoints.map((sp, i) => (
                <p key={i} style={{ fontSize: "12px", color: "rgba(2,39,74,0.55)", marginLeft: "22px", lineHeight: 1.5 }}>{sp}</p>
              ))}
              <div style={{ marginTop: "16px", marginLeft: "22px" }}>
                <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(2,39,74,0.35)", marginBottom: "10px" }}>
                  Data Uploaded to ERP
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {step.details.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: "10px", padding: "4px 10px",
                      border: "1px solid rgba(2,39,74,0.12)", color: "rgba(2,39,74,0.55)",
                      borderRadius: "2px", letterSpacing: "0.02em",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <DotNav mt="28px" />
          </div>
        )}

        {/* ── TABLET ── */}
        {isTablet && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "start" }}>

              {/* Left: steps list */}
              <div style={{ background: "white", borderRadius: "2px", overflow: "hidden", boxShadow: "0 2px 16px rgba(2,39,74,0.06)" }}>
                {STEPS.map((s, i) => {
                  const isActive = i === activeStep;
                  const isPast = i < activeStep;
                  return (
                    <button
                      key={s.id}
                      onClick={() => jumpTo(i)}
                      style={{
                        display: "flex", alignItems: "center", gap: "10px", width: "100%",
                        padding: "14px 16px", background: isActive ? "white" : "transparent",
                        border: "none", borderLeft: isActive ? "3px solid #1CA9C9" : "3px solid transparent",
                        cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                        borderBottom: "1px solid rgba(2,39,74,0.06)",
                      }}
                    >
                      <div style={{ width: "24px", height: "24px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: isActive ? 1 : isPast ? 0.7 : 0.3 }}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                          <polygon points="12,2 22,9 12,22 2,9" fill={isActive ? "#1CA9C9" : "#02274A"} opacity={isActive ? 0.9 : 0.5} />
                        </svg>
                      </div>
                      <span style={{
                        fontSize: "11px", fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#02274A" : isPast ? "#02274A" : "rgba(2,39,74,0.4)",
                        lineHeight: 1.3, fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em",
                      }}>{s.label}</span>
                    </button>
                  );
                })}
                <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(2,39,74,0.07)" }}>
                  <div style={{ height: "3px", background: "rgba(2,39,74,0.08)", borderRadius: "2px", marginBottom: "6px" }}>
                    <motion.div
                      style={{ height: "100%", background: "#1CA9C9", borderRadius: "2px", originX: 0 }}
                      animate={{ width: `${step.progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <span style={{ fontSize: "11px", color: "rgba(2,39,74,0.4)", letterSpacing: "0.05em" }}>{step.progress}%</span>
                </div>
              </div>

              {/* Right: video */}
              <DiamondVideo height={canvasHeight} />
            </div>

            {/* Details below the two-col row */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                background: "white", padding: "24px 22px",
                boxShadow: "0 2px 20px rgba(2,39,74,0.07)", borderRadius: "2px", marginTop: "24px",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3px", flexShrink: 0 }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid #1CA9C9", background: "white" }} />
                  <div style={{ width: "1px", height: "20px", background: "rgba(28,169,201,0.3)", margin: "4px 0" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid rgba(28,169,201,0.4)", background: "white" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "#02274A", margin: "0 0 10px", lineHeight: 1.3 }}>
                    {step.details.title}
                  </h3>
                  <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                    {step.details.points.map((pt, i) => (
                      <li key={i} style={{ fontSize: "12px", color: "rgba(2,39,74,0.6)", marginBottom: "6px", lineHeight: 1.5 }}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {step.details.subHeading && (
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#02274A", marginBottom: "8px", marginLeft: "22px" }}>
                  {step.details.subHeading}
                </p>
              )}
              {step.details.subPoints.map((sp, i) => (
                <p key={i} style={{ fontSize: "12px", color: "rgba(2,39,74,0.55)", marginLeft: "22px", lineHeight: 1.5 }}>{sp}</p>
              ))}
              <div style={{ marginTop: "20px", marginLeft: "22px" }}>
                <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(2,39,74,0.35)", marginBottom: "10px" }}>
                  Data Uploaded to ERP
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {step.details.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: "10px", padding: "4px 10px",
                      border: "1px solid rgba(2,39,74,0.12)", color: "rgba(2,39,74,0.55)",
                      borderRadius: "2px", letterSpacing: "0.02em",
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            <DotNav mt="36px" />
          </div>
        )}

        {/* ── DESKTOP ── */}
        {isDesktop && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 300px", gap: "32px", alignItems: "center" }}>

              {/* LEFT — Steps list */}
              <div style={{ background: "white", borderRadius: "2px", overflow: "hidden", boxShadow: "0 2px 16px rgba(2,39,74,0.06)" }}>
                {STEPS.map((s, i) => {
                  const isActive = i === activeStep;
                  const isPast = i < activeStep;
                  return (
                    <button
                      key={s.id}
                      onClick={() => jumpTo(i)}
                      style={{
                        display: "flex", alignItems: "center", gap: "12px", width: "100%",
                        padding: "16px 18px", background: isActive ? "white" : "transparent",
                        border: "none", borderLeft: isActive ? "3px solid #1CA9C9" : "3px solid transparent",
                        cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                        borderBottom: "1px solid rgba(2,39,74,0.06)",
                      }}
                    >
                      <div style={{ width: "28px", height: "28px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: isActive ? 1 : isPast ? 0.7 : 0.3 }}>
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                          <polygon points="12,2 22,9 12,22 2,9" fill={isActive ? "#1CA9C9" : "#02274A"} opacity={isActive ? 0.9 : 0.5} />
                        </svg>
                      </div>
                      <span style={{
                        fontSize: "12px", fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#02274A" : isPast ? "#02274A" : "rgba(2,39,74,0.4)",
                        lineHeight: 1.3, fontFamily: "'Inter', sans-serif", letterSpacing: "0.01em",
                      }}>{s.label}</span>
                    </button>
                  );
                })}
                <div style={{ padding: "14px 18px", borderTop: "1px solid rgba(2,39,74,0.07)" }}>
                  <div style={{ height: "3px", background: "rgba(2,39,74,0.08)", borderRadius: "2px", marginBottom: "8px" }}>
                    <motion.div
                      style={{ height: "100%", background: "#1CA9C9", borderRadius: "2px", originX: 0 }}
                      animate={{ width: `${step.progress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <span style={{ fontSize: "11px", color: "rgba(2,39,74,0.4)", letterSpacing: "0.05em" }}>{step.progress}%</span>
                </div>
              </div>

              {/* CENTER — Video */}
              <DiamondVideo height={canvasHeight} />

              {/* RIGHT — Step details */}
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ background: "white", padding: "28px 24px", boxShadow: "0 2px 20px rgba(2,39,74,0.07)", borderRadius: "2px" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid #1CA9C9", background: "white" }} />
                    <div style={{ width: "1px", height: "24px", background: "rgba(28,169,201,0.3)", margin: "4px 0" }} />
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "2px solid rgba(28,169,201,0.4)", background: "white" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "#02274A", margin: "0 0 10px", lineHeight: 1.3 }}>
                      {step.details.title}
                    </h3>
                    <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                      {step.details.points.map((pt, i) => (
                        <li key={i} style={{ fontSize: "12px", color: "rgba(2,39,74,0.6)", marginBottom: "6px", lineHeight: 1.5 }}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {step.details.subHeading && (
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#02274A", marginBottom: "8px", marginLeft: "22px" }}>
                    {step.details.subHeading}
                  </p>
                )}
                {step.details.subPoints.map((sp, i) => (
                  <p key={i} style={{ fontSize: "12px", color: "rgba(2,39,74,0.55)", marginLeft: "22px", lineHeight: 1.5 }}>{sp}</p>
                ))}
                <div style={{ marginTop: "20px", marginLeft: "22px" }}>
                  <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(2,39,74,0.35)", marginBottom: "10px" }}>
                    Data Uploaded to ERP
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {step.details.tags.map((tag) => (
                      <span key={tag} style={{
                        fontSize: "10px", padding: "4px 10px",
                        border: "1px solid rgba(2,39,74,0.12)", color: "rgba(2,39,74,0.55)",
                        borderRadius: "2px", letterSpacing: "0.02em",
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <DotNav mt="40px" />
          </>
        )}

      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════
// JOURNAL PAGE
// ══════════════════════════════════════════════════════════════════════

export default function Journal() {
  const { data: sanityArticles } = useSanityQuery<SanityArticle[]>(["journal-articles"], JOURNAL_ARTICLES_QUERY);

  const articles = isSanityConfigured && sanityArticles && sanityArticles.length > 0
    ? sanityArticles.map((a, i) => ({
        id: i + 1, title: a.title, date: formatDate(a.publishedAt),
        category: a.category, excerpt: a.excerpt, featured: a.featured, slug: a.slug?.current,
      }))
    : ARTICLES;

  const [featured, ...rest] = articles;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ── */}
      <section className="pt-28 md:pt-40 pb-20 md:pb-28 px-8 md:px-14 lg:px-20" style={{ background: "#02274A" }}>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-end">
          <div className="space-y-5 md:space-y-6">
            <motion.p variants={up} className="text-[10px] uppercase tracking-[0.45em] font-medium" style={{ color: "#1CA9C9" }}>
              Knowledge &amp; Insight
            </motion.p>
            <motion.h1 variants={up} className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
              Journal &amp;<br /><span style={{ color: "rgba(255,255,255,0.3)" }}>Insights.</span>
            </motion.h1>
            <motion.span variants={up} className="block w-10 h-px" style={{ background: "#1CA9C9" }} />
          </div>
          <motion.p variants={up} className="text-white/40 text-sm md:text-base leading-relaxed md:pb-3">
            Perspectives on diamond grading, investment-grade stones, and the IF→FL conversion process,
            written for trade professionals who already understand the fundamentals.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Featured Article ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#F4F8FC" }}>
        <div className="max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[9px] uppercase tracking-[0.45em] mb-10 font-medium" style={{ color: "#1CA9C9" }}>
            Featured
          </motion.p>
          <motion.article
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: EASE }}
            className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center p-8 md:p-14"
            style={{ background: "white", border: "1px solid rgba(2,39,74,0.08)" }}
          >
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <span className="text-[8px] uppercase tracking-[0.42em]" style={{ color: "#1CA9C9" }}>{featured.category}</span>
                <span className="w-6 h-px" style={{ background: "rgba(28,169,201,0.3)" }} />
                <span className="text-[8px] uppercase tracking-[0.3em]" style={{ color: "rgba(2,39,74,0.3)" }}>{featured.date}</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight" style={{ color: "#02274A" }}>{featured.title}</h2>
              <span className="block w-8 h-px" style={{ background: "#1CA9C9" }} />
              <p className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.5)" }}>{featured.excerpt}</p>
              <Link href={`/journal/${featured.id}`} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-medium transition-colors hover:gap-3" style={{ color: "#1CA9C9" }}>
                Read Article <ArrowRight size={11} />
              </Link>
            </div>
            <div className="aspect-[4/3] hidden lg:block" style={{ background: "linear-gradient(135deg, #02274A 0%, #04385E 100%)", position: "relative", overflow: "hidden" }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <span className="font-serif" style={{ fontSize: "14rem", color: "white", letterSpacing: "-0.04em", lineHeight: 1 }}>01</span>
              </div>
              <div className="absolute bottom-8 left-8">
                <p className="text-[9px] uppercase tracking-[0.4em] mb-1" style={{ color: "rgba(28,169,201,0.6)" }}>GIA Documentation</p>
                <p className="text-white/20 text-xs">Certificate interpretation for professionals</p>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ── Diamond Journey with Video ── */}
      <DiamondTraceability />

      {/* ── Article List ── */}
      <section className="py-20 md:py-28 px-6" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[9px] uppercase tracking-[0.45em] mb-10 font-medium" style={{ color: "#1CA9C9" }}>
            All Articles
          </motion.p>
          <div className="divide-y" style={{ borderTop: "1px solid rgba(2,39,74,0.07)", borderColor: "rgba(2,39,74,0.07)" }}>
            {rest.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="py-10 grid md:grid-cols-[180px_1fr_auto] gap-6 md:gap-12 items-start group"
              >
                <div className="space-y-1">
                  <p className="text-[8px] uppercase tracking-[0.42em] font-medium" style={{ color: "#1CA9C9" }}>{article.category}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(2,39,74,0.3)" }}>{article.date}</p>
                </div>
                <div className="space-y-3">
                  <h2 className="font-serif text-xl md:text-2xl leading-snug group-hover:text-[#1CA9C9] transition-colors" style={{ color: "#02274A" }}>
                    {article.title}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(2,39,74,0.45)" }}>{article.excerpt}</p>
                </div>
                <div className="flex items-start pt-1">
                  <Link href={`/journal/${article.id}`} className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] shrink-0 group-hover:gap-3 transition-all" style={{ color: "rgba(2,39,74,0.3)" }}>
                    Read <ArrowRight size={10} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="py-16 px-6" style={{ background: "#02274A", borderTop: "1px solid rgba(28,169,201,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-[9px] uppercase tracking-[0.45em] mb-2" style={{ color: "#1CA9C9" }}>Trade Enquiries</p>
            <p className="font-serif text-2xl text-white">Ready to discuss your stones?</p>
          </div>
          <Link href="/contact">
            <button className="text-[10px] uppercase tracking-[0.3em] text-white transition-all hover:opacity-80" style={{ background: "#1CA9C9", height: "50px", padding: "0 2.5rem", border: "none" }}>
              Begin the Conversation →
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}