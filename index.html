/* ============================================================
   MERCEDES-BENZ — HERO 3D ENGINEERING CORE
   Requires three.js (r128 global THREE) loaded before this file.
   Renders into <canvas class="hero-canvas" id="hero-canvas">
   ============================================================ */
(function(){
  var canvas = document.getElementById('hero-canvas');
  if(!canvas || typeof THREE === 'undefined') return;

  var TEAL = 0x00e5c7;
  var CHROME = 0x5a6b73;

  var scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x05070a, 0.045);

  var camera = new THREE.PerspectiveCamera(52, canvas.clientWidth/canvas.clientHeight, 0.1, 200);
  camera.position.set(0, 1.6, 11);

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  function resize(){
    var w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w/h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // ---------- CORE: nested wireframe icosahedra ----------
  var coreGroup = new THREE.Group();
  scene.add(coreGroup);

  var innerGeo = new THREE.IcosahedronGeometry(2.05, 1);
  var innerEdges = new THREE.EdgesGeometry(innerGeo);
  var innerLines = new THREE.LineSegments(innerEdges, new THREE.LineBasicMaterial({ color: TEAL, transparent:true, opacity:.85 }));
  coreGroup.add(innerLines);

  var outerGeo = new THREE.IcosahedronGeometry(3.1, 0);
  var outerEdges = new THREE.EdgesGeometry(outerGeo);
  var outerLines = new THREE.LineSegments(outerEdges, new THREE.LineBasicMaterial({ color: CHROME, transparent:true, opacity:.5 }));
  coreGroup.add(outerLines);

  var coreDot = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 12, 12),
    new THREE.MeshBasicMaterial({ color: TEAL })
  );
  coreGroup.add(coreDot);

  // orbit rings (flattened torus) — like a HUD gyroscope
  function makeRing(radius, tilt, color, opacity){
    var geo = new THREE.TorusGeometry(radius, 0.006, 8, 90);
    var mat = new THREE.MeshBasicMaterial({ color: color, transparent:true, opacity: opacity });
    var m = new THREE.Mesh(geo, mat);
    m.rotation.x = tilt;
    return m;
  }
  var ring1 = makeRing(4.1, Math.PI/2.4, TEAL, .35);
  var ring2 = makeRing(4.6, Math.PI/1.7, CHROME, .25);
  coreGroup.add(ring1, ring2);

  // ---------- PARTICLE FIELD (assembles on load) ----------
  var COUNT = 420;
  var startPos = new Float32Array(COUNT*3);
  var endPos = new Float32Array(COUNT*3);
  var positions = new Float32Array(COUNT*3);

  for(var i=0;i<COUNT;i++){
    // random far spawn
    var sr = 26 + Math.random()*34;
    var st = Math.random()*Math.PI*2, sp = Math.acos(2*Math.random()-1);
    startPos[i*3]   = sr*Math.sin(sp)*Math.cos(st);
    startPos[i*3+1] = sr*Math.sin(sp)*Math.sin(st)*0.6;
    startPos[i*3+2] = sr*Math.cos(sp);

    // target: shell around core
    var er = 4.4 + Math.random()*3.4;
    var et = Math.random()*Math.PI*2, ep = Math.acos(2*Math.random()-1);
    endPos[i*3]   = er*Math.sin(ep)*Math.cos(et);
    endPos[i*3+1] = er*Math.sin(ep)*Math.sin(et);
    endPos[i*3+2] = er*Math.cos(ep);

    positions[i*3]=startPos[i*3]; positions[i*3+1]=startPos[i*3+1]; positions[i*3+2]=startPos[i*3+2];
  }
  var particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  var particleMat = new THREE.PointsMaterial({ color: TEAL, size: 0.045, transparent:true, opacity:.9, sizeAttenuation:true });
  var particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ---------- INFINITE HUD GRID FLOOR ----------
  var gridGroup = new THREE.Group();
  scene.add(gridGroup);
  var grids = [];
  var GRID_LEN = 40;
  for(var g=0; g<2; g++){
    var grid = new THREE.GridHelper(GRID_LEN, 28, 0x00e5c7, 0x16333030);
    grid.material.transparent = true;
    grid.material.opacity = 0.14;
    grid.position.y = -3.4;
    grid.position.z = -g*GRID_LEN;
    gridGroup.add(grid);
    grids.push(grid);
  }

  // ---------- LIGHT TOUCH (points are unlit, lines unlit — pure wireframe look) ----------

  // ---------- INTERACTION: mouse parallax ----------
  var mouseX=0, mouseY=0, targetX=0, targetY=0;
  window.addEventListener('mousemove', function(e){
    mouseX = (e.clientX/window.innerWidth - .5);
    mouseY = (e.clientY/window.innerHeight - .5);
  });

  // ---------- ASSEMBLY ANIMATION ----------
  var startTime = performance.now();
  var ASSEMBLE_MS = 2400;
  function easeOutCubic(t){ return 1-Math.pow(1-t,3); }

  function animate(now){
    requestAnimationFrame(animate);
    var t = (now - startTime)/1000;

    // assembly progress
    var prog = Math.min(1, (now-startTime)/ASSEMBLE_MS);
    var eased = easeOutCubic(prog);
    var posAttr = particleGeo.attributes.position;
    for(var i=0;i<COUNT;i++){
      posAttr.array[i*3]   = startPos[i*3]   + (endPos[i*3]-startPos[i*3])*eased;
      posAttr.array[i*3+1] = startPos[i*3+1] + (endPos[i*3+1]-startPos[i*3+1])*eased;
      posAttr.array[i*3+2] = startPos[i*3+2] + (endPos[i*3+2]-startPos[i*3+2])*eased;
    }
    posAttr.needsUpdate = true;

    // ambient rotation
    coreGroup.rotation.y = t*0.18;
    coreGroup.rotation.x = Math.sin(t*0.15)*0.12;
    outerLines.rotation.y = -t*0.1;
    ring1.rotation.z = t*0.3;
    ring2.rotation.z = -t*0.22;
    particles.rotation.y = t*0.05;
    coreDot.scale.setScalar(1 + Math.sin(t*2.2)*0.18);

    // scale-in the whole core at start (materialize)
    var scaleIn = 0.4 + eased*0.6;
    coreGroup.scale.setScalar(scaleIn);

    // infinite grid scroll (toward camera)
    for(var gi=0; gi<grids.length; gi++){
      grids[gi].position.z += 0.05;
      if(grids[gi].position.z > GRID_LEN/2){ grids[gi].position.z -= GRID_LEN*grids.length; }
    }

    // mouse parallax lerp
    targetX += (mouseX-targetX)*0.04;
    targetY += (mouseY-targetY)*0.04;
    camera.position.x = targetX*2.2;
    camera.position.y = 1.6 - targetY*1.2;
    camera.lookAt(0,0.3,0);

    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);
})();
