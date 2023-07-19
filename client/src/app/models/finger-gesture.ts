import * as fingerpose from 'fingerpose';

// HAND GESTURE FOR THUMBS UP 👍
const thumbsUpGesture = new fingerpose.GestureDescription('ok');
thumbsUpGesture.addCurl(
  fingerpose.Finger.Index,
  fingerpose.FingerCurl.FullCurl
);
thumbsUpGesture.addCurl(
  fingerpose.Finger.Middle,
  fingerpose.FingerCurl.FullCurl
);
thumbsUpGesture.addCurl(fingerpose.Finger.Ring, fingerpose.FingerCurl.FullCurl);
thumbsUpGesture.addCurl(
  fingerpose.Finger.Pinky,
  fingerpose.FingerCurl.FullCurl
);
thumbsUpGesture.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.NoCurl);

// HAND GESTURE FOR ZERO ✊
const zeroGesture = new fingerpose.GestureDescription('zero');
// all fingers must be curled
zeroGesture.addCurl(fingerpose.Finger.Index, fingerpose.FingerCurl.FullCurl);
zeroGesture.addCurl(fingerpose.Finger.Middle, fingerpose.FingerCurl.FullCurl);
zeroGesture.addCurl(fingerpose.Finger.Ring, fingerpose.FingerCurl.FullCurl);
zeroGesture.addCurl(fingerpose.Finger.Pinky, fingerpose.FingerCurl.FullCurl);
// thumb half or full curled
zeroGesture.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.HalfCurl);
zeroGesture.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.FullCurl);

// HAND GESTURE FOR ONE ☝️
const oneGesture = new fingerpose.GestureDescription('one');
oneGesture.addCurl(fingerpose.Finger.Index, fingerpose.FingerCurl.NoCurl);
oneGesture.addCurl(fingerpose.Finger.Middle, fingerpose.FingerCurl.FullCurl);
oneGesture.addCurl(fingerpose.Finger.Ring, fingerpose.FingerCurl.FullCurl);
oneGesture.addCurl(fingerpose.Finger.Pinky, fingerpose.FingerCurl.FullCurl);
// thumb half or full curled
oneGesture.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.HalfCurl);
oneGesture.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.FullCurl);

// HAND GESTURE FOR TWO ✌️
const twoGesture = new fingerpose.GestureDescription('two');
// index and middle finger: stretched out
twoGesture.addCurl(fingerpose.Finger.Index, fingerpose.FingerCurl.NoCurl);
twoGesture.addCurl(fingerpose.Finger.Middle, fingerpose.FingerCurl.NoCurl);
// ring: curled
twoGesture.addCurl(fingerpose.Finger.Ring, fingerpose.FingerCurl.FullCurl);
// pinky: curled
twoGesture.addCurl(fingerpose.Finger.Pinky, fingerpose.FingerCurl.FullCurl);
// thumb half or full curled
twoGesture.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.HalfCurl);
twoGesture.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.FullCurl);

// HAND GESTURE FOR THREE 👌
const threeGesture = new fingerpose.GestureDescription('three');
threeGesture.addCurl(fingerpose.Finger.Index, fingerpose.FingerCurl.FullCurl);
threeGesture.addCurl(fingerpose.Finger.Middle, fingerpose.FingerCurl.NoCurl);
threeGesture.addCurl(fingerpose.Finger.Ring, fingerpose.FingerCurl.NoCurl);
threeGesture.addCurl(fingerpose.Finger.Pinky, fingerpose.FingerCurl.NoCurl);
threeGesture.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.HalfCurl);
threeGesture.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.FullCurl);

// HAND GESTURE FOR BACK 👈
const backGesture = new fingerpose.GestureDescription('back');
backGesture.addCurl(fingerpose.Finger.Index, fingerpose.FingerCurl.NoCurl);
backGesture.addCurl(fingerpose.Finger.Middle, fingerpose.FingerCurl.FullCurl);
backGesture.addCurl(fingerpose.Finger.Ring, fingerpose.FingerCurl.FullCurl);
backGesture.addCurl(fingerpose.Finger.Pinky, fingerpose.FingerCurl.FullCurl);
backGesture.addCurl(fingerpose.Finger.Thumb, fingerpose.FingerCurl.NoCurl);
backGesture.addDirection(
  fingerpose.Finger.Thumb,
  fingerpose.FingerDirection.VerticalUp
);

export const GE = new fingerpose.GestureEstimator([
  thumbsUpGesture,
  zeroGesture,
  oneGesture,
  twoGesture,
  threeGesture,
  backGesture,
]);
