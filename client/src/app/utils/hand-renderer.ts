const fingerLookupIndices = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

export const drawKeypoints = (ctx: any, keypoints: any) => {
  const keypointsArray = keypoints;

  for (let i = 0; i < keypointsArray.length; i++) {
    const y = keypointsArray[i][0];
    const x = keypointsArray[i][1];
    drawPoint(ctx, x - 2, y - 2, 3);
  }

  const fingers: string[] = Object.keys(fingerLookupIndices);
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < fingers.length; i++) {
    const finger: string = fingers[i];
    // @ts-ignore
    const points = fingerLookupIndices[finger].map(
      (idx: any) => keypoints[idx]
    );
    drawPath(ctx, points, false);
  }
};

function drawPoint(ctx: any, y: any, x: any, r: any) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
}

function drawPath(ctx: any, points: any, closePath: any) {
  const region = new Path2D();
  region.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point[0], point[1]);
  }

  if (closePath) {
    region.closePath();
  }
  ctx.stroke(region);
}
