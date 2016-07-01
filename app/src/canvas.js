import React, { Component } from 'react';
import ReactDOM from 'react-dom';

(function ($) {
  "use strict";

  const AMOUNT = 100;

  let $container, stats;

  let camera, scene, renderer;

  let video;

  // canvas
  let image, imageContext,
    imageReflection, //imageReflectionContext, imageReflectionGradient,
    texture, textureReflection;

  let mesh;

  let mouseX = 0,
    mouseY = 0;

  let windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2;

  $(document).ready(initThreejs);

  function initThreejs() {
    initThreejsScene();
    animateThreejsScene();
  }

  function initThreejsScene() {
    $container = $('#threejs-wrap');
    video = $('#threejs-video').get(0);

    console.log('video.videoWidth :', video.videoWidth);
    console.log('video.videoHeight :', video.videoHeight);

    // create camera, scene

    // PerspectiveCamera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    /*
    // OrthographicCamera
    camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
    camera.position.z = 1000;
    */

    scene = new THREE.Scene();

    //
    image = document.createElement('canvas');
    image.width = 1536;
    image.height = 864;

    imageContext = image.getContext('2d');
    imageContext.fillStyle = '#000000';
    imageContext.fillRect(0, 0, 1536, 864);

    texture = new THREE.Texture(image);

    var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5});

    /*
    imageReflection = document.createElement('canvas');
    imageReflection.width = 1536;
    imageReflection.height = 864;

    imageReflectionContext = imageReflection.getContext('2d');
    imageReflectionContext.fillStyle = '#000000';
    imageReflectionContext.fillRect(0, 0, 1536, 864);

    imageReflectionGradient = imageReflectionContext.createLinearGradient(0, 0, 0, 864);
    imageReflectionGradient.addColorStop(0.2, 'rgba(240, 240, 240, 1)');
    imageReflectionGradient.addColorStop(1, 'rgba(240, 240, 240, 0.8)');

    textureReflection = new THREE.Texture(imageReflection);
     */

    // var materialReflection = new THREE.MeshBasicMaterial({map: textureReflection, side: THREE.BackSide, overdraw: 0.5});

    //
    var plane = new THREE.PlaneGeometry(1536, 864, 4, 4);

    mesh = new THREE.Mesh(plane, material);
    // mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.5;
    scene.add(mesh);

    /*
    mesh = new THREE.Mesh(plane, materialReflection);
    mesh.position.y = -306;
    mesh.rotation.x = -Math.PI;
    // mesh.scale.x = mesh.scale.y = mesh.scale.z = 1.5;
    scene.add(mesh);
    */

    //

    var separation = 150;
    var amountx = 10;
    var amounty = 10;

    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial({
      color: 0x0808080,
      program: function (context) {
        context.beginPath();
        context.arc(0, 0, 1, 0, PI2, true);
        context.fill();
      }
    });

    let particle;
    for (var ix = 0; ix < amountx; ix++) {
      for (var iy = 0; iy < amounty; iy++) {
        particle = new THREE.Sprite(material);
        particle.position.x = ix * separation - ( ( amountx * separation ) / 2 );
        particle.position.y = 0; //-864;
        particle.position.z = iy * separation - ( ( amounty * separation ) / 2 );
        //particle.scale.x = particle.scale.y = 2;
        scene.add(particle);
      }
    }

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $container.append(renderer.domElement);

    stats = new Stats();
    $container.append(stats.dom);

    $(document).on('mousemove', onDocumentMouseMove);
    $(document).on('mousewheel', onDocumentMouseWheel);

    $(window).on('resize', onWindowResize);
  }

  function onDocumentMouseWheel(event) {
    let evt = event.originalEvent,
      direction = (evt.detail < 0 || evt.wheelDelta > 0) ? 1 : -1;
    camera.position.z += direction * 20;
  }

  function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY ) * 0.2;
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    // Perspective camera
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();

    /*
    // Orthographic camera
    camera.left = window.innerWidth / - 2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / - 2;
    camera.updateProjectionMatrix();
     */

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animateThreejsScene() {
    requestAnimationFrame(animateThreejsScene);
    render();

    stats.update();
  }

  function render() {
    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( -mouseY - camera.position.y ) * 0.05;
    camera.lookAt(scene.position);

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      imageContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, image.width, image.height);

      if (texture) texture.needsUpdate = true;
      if (textureReflection) textureReflection.needsUpdate = true;
    }

    /*
    imageReflectionContext.drawImage(image, 0, 0);
    imageReflectionContext.fillStyle = imageReflectionGradient;
    imageReflectionContext.fillRect(0, 0, 1536, 864);
    */

    renderer.render(scene, camera);
  }


  /*
   let $doc = $(document);

   let video = $('#video').get(0),
   $canvas = $('#canvas'),
   canvas = $canvas.get(0),
   ctx;
   */

  /*
   function initScene() {
   let scene = new THREE.Scene(),
   camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1 , 1000 ), // field of view, aspect ratio, near, far
   renderer = new THREE.WebGLRenderer();

   renderer.setSize( window.innerWidth, window.innerHeight );

   $('#canvas-threejs').append( renderer.domElement );

   // make cube
   let geometry = new THREE.BoxGeometry(1, 1, 1); // object contains all the points(vertices) and fill(faces) of the cube.
   let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
   let cube = new THREE.Mesh( geometry, material );
   scene.add( cube );

   camera.position.z = 5;

   // start render
   render();

   function render() {
   window.requestAnimationFrame( render );

   cube.rotation.x += 0.05;
   cube.rotation.y += 0.05;

   renderer.render( scene, camera );
   }
   }

   function initCanvas() {
   //console.log('video.videoWidth :', video.videoWidth); // 1920
   //console.log('video.videoHeight :', video.videoHeight); // 1080

   if(canvas.getContext) {
   ctx = canvas.getContext("2d");
   }else{
   window.alert('canvas is not supported.');
   return;
   }

   $canvas.on('click', (event) => {
   if(video.paused || video.ended) {
   video.play();
   }else{
   video.pause();
   }
   });

   $(video).on('play', (event) => {
   event.preventDefault();
   timerCallback();
   });

   // test play
   video.play();

   $(window).on('resize', resize);
   resize();
   }

   function resize(event) {
   $canvas.prop({
   width: $doc.width(),
   height: $doc.height()
   });

   drawCanvasFromVideo();
   }

   function timerCallback() {
   if(video.paused || video.ended) {
   console.log('video is paused or ended');
   return;
   }
   drawCanvasFromVideo();

   window.setTimeout(() => {
   timerCallback();
   }, 0);
   }

   function drawCanvasFromVideo() {
   ctx.drawImage(video, 0, 0, window.outerWidth, window.outerHeight);
   }
   */
})(jQuery);