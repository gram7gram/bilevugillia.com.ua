$(function () {

  var video1 = $('#video-1');
  var video2 = $('#video-2');
  var container1 = video1.closest('section');
  var container2 = video2.closest('section');

  var originalHeight1 = parseInt(video1.attr('height')) || 1;
  var originalHeight2 = parseInt(video2.attr('height')) || 1;

  function updateVideo1() {

    var targetWidth = container1.width();

    var currentWidth = parseInt(video1.attr('width')) || 1;
    var currentHeight = parseInt(video1.attr('height')) || 1;

    var scale = 1.0 * targetWidth / currentWidth;

    video1.attr('width', (currentWidth * scale).toFixed(2));
    video1.attr('height', Math.min(originalHeight1, currentHeight * scale).toFixed(2));
  }

  function updateVideo2() {

    var targetWidth = container2.width();

    var currentWidth = parseInt(video2.attr('width')) || 1;
    var currentHeight = parseInt(video2.attr('height')) || 1;

    var scale = 1.0 * targetWidth / currentWidth;

    video2.attr('width', (currentWidth * scale).toFixed(2));
    video2.attr('height', Math.min(originalHeight2, currentHeight * scale).toFixed(2));
  }

  updateVideo1();

  updateVideo2();

  window.addEventListener('resize', updateVideo1, false);
  window.addEventListener('resize', updateVideo2, false)
});