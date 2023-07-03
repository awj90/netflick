import * as fingerpose from 'fingerpose';

const oneFingerGesture = new fingerpose.GestureDescription('one_finger');
oneFingerGesture.addCurl(
  fingerpose.Finger.Index,
  fingerpose.FingerCurl.NoCurl,
  1.0
);
oneFingerGesture.addCurl(
  fingerpose.Finger.Thumb,
  fingerpose.FingerCurl.FullCurl,
  1.0
);
oneFingerGesture.addCurl(
  fingerpose.Finger.Middle,
  fingerpose.FingerCurl.FullCurl,
  1.0
);
oneFingerGesture.addCurl(
  fingerpose.Finger.Ring,
  fingerpose.FingerCurl.FullCurl,
  1.0
);
oneFingerGesture.addCurl(
  fingerpose.Finger.Pinky,
  fingerpose.FingerCurl.FullCurl,
  1.0
);

// const thumbsDownGesture = new fingerpose.GestureDescription('thumbs_down');
// thumbsDownGesture.addCurl(
//   fingerpose.Finger.Thumb,
//   fingerpose.FingerCurl.NoCurl
// );
// thumbsDownGesture.addDirection(
//   fingerpose.Finger.Thumb,
//   fingerpose.FingerDirection.VerticalDown,
//   1.0
// );
// thumbsDownGesture.addDirection(
//   fingerpose.Finger.Thumb,
//   fingerpose.FingerDirection.DiagonalDownLeft,
//   0.9
// );
// thumbsDownGesture.addDirection(
//   fingerpose.Finger.Thumb,
//   fingerpose.FingerDirection.DiagonalDownRight,
//   0.9
// );
// // do this for all other fingers
// for (let finger of [
//   fingerpose.Finger.Index,
//   fingerpose.Finger.Middle,
//   fingerpose.Finger.Ring,
//   fingerpose.Finger.Pinky,
// ]) {
//   thumbsDownGesture.addCurl(finger, fingerpose.FingerCurl.FullCurl, 1.0);
//   thumbsDownGesture.addCurl(finger, fingerpose.FingerCurl.HalfCurl, 0.9);
// }

// // create new gesture with id "rock"
// const rockGesture = new fingerpose.GestureDescription('rock');

// // all fingers must be curled
// rockGesture.addCurl(fingerpose.Finger.Index, fingerpose.FingerCurl.FullCurl);
// rockGesture.addCurl(fingerpose.Finger.Middle, fingerpose.FingerCurl.FullCurl);
// rockGesture.addCurl(fingerpose.Finger.Ring, fingerpose.FingerCurl.FullCurl);
// rockGesture.addCurl(fingerpose.Finger.Pinky, fingerpose.FingerCurl.FullCurl);

// // thumb can be either stretched out or half curled
// rockGesture.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.HalfCurl);
// rockGesture.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.NoCurl);

export const GE = new fingerpose.GestureEstimator([
  fingerpose.Gestures.VictoryGesture,
  fingerpose.Gestures.ThumbsUpGesture,
  oneFingerGesture,
  // thumbsDownGesture,
  // rockGesture,
]);
