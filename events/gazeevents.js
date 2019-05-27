function gazeEnter(object) {
  // When the user looks at this object, play a sound
  object.original_col = V(object.col.x, object.col.y, object.col.z);
  room.playSound('gazeenter');
}
function gazeProgress(object, ev) {
  // As the user continues to stare at this object, we can do whatever we want
  // Here we animate the scale up to 1.2x its normal size
  var scale = 1 + (.2 * ev.data);
  object.scale = V(scale);
  object.col.y = ev.data;
}
function gazeLeave(object) {
  // The user stopped looking at this object, so reset it to its default state and play a sound
  object.col = object.original_col;
  object.scale = V(1, 1, 1);
  room.playSound('gazeleave');
}

function gazeActivateSound(object, sound) {
  // When activated, play the specified sound.  Throw in a particle explosion for visual effect, too
  object.col = V(0,1,0);
  throwConfetti(object, 'music');
  room.playSound(sound);
}
function gazeActivateVideo(object, video) {
  // When activated, play the specified video.  Throw in a particle explosion for visual effect, too
  object.col = V(0,1,0);
  throwConfetti(object);

  if (room.objects['videoscreen'].video_id) {
    room.stopVideo(room.objects['videoscreen'].video_id);
    room.seekVideo(room.objects['videoscreen'].video_id, 0);
  }
  room.objects['videoscreen'].video_id = video;
  room.playVideo(video);
}
function throwConfetti(object, imageid) {
  if (!object.confetti) {
    object.confetti = object.createObject('particle', {
      count: 20,
      scale: (imageid ? V(.4, .4, .4) : V(.1, .1, .1)),
      duration: 10,
      image_id: imageid,
      col: V(object.original_col),
      rand_vel: V(10,5,10),
      vel: V(-5, 5, -5),
      accel: V(0,-9.8,0)
    });
  } else {
    object.confetti.count = 20;
    object.confetti.play();
  }
}
room.update = function(dt) {
}
