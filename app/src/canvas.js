import React, { Component } from 'react';
import ReactDOM from 'react-dom';

(function ($) {
  "use strict";

  /*
  let $doc = $(document);

  let video = $('#video').get(0),
    $canvas = $('#canvas'),
    canvas = $canvas.get(0),
    ctx;
  */



  $(document).ready(initScene);

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
})(jQuery);