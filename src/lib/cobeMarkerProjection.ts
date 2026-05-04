/** Entspricht der Projektion in cobe (GLOBE_R, applyRotation, project). */

const GLOBE_R = 0.8;
const PI = Math.PI;

export function latLonTo3D([lat, lon]: [number, number]): [number, number, number] {
  const latRad = (lat * PI) / 180;
  const lonRad = (lon * PI) / 180 - PI;
  const cosLat = Math.cos(latRad);
  return [-cosLat * Math.cos(lonRad), Math.sin(latRad), cosLat * Math.sin(lonRad)];
}

export function projectMarkerOnCanvas(
  canvas: HTMLCanvasElement,
  dpr: number,
  phi: number,
  theta: number,
  scaleOpt: number,
  offsetOpt: [number, number],
  markerElevation: number,
  location: [number, number],
): { x: number; y: number; rz: number; inFront: boolean } {
  const pos3D = latLonTo3D(location);
  const r = GLOBE_R + markerElevation;
  const elevated: [number, number, number] = [pos3D[0] * r, pos3D[1] * r, pos3D[2] * r];

  const cx = Math.cos(theta);
  const cy = Math.cos(phi);
  const sx = Math.sin(theta);
  const sy = Math.sin(phi);

  const aspect = canvas.width / canvas.height;
  const [px, py, pz] = elevated;

  const rx = cy * px + sy * pz;
  const ry = sy * sx * px + cx * py - cy * sx * pz;
  const rz = -sy * cx * px + sx * py + cy * cx * pz;

  const x =
    ((rx / aspect) * scaleOpt + (offsetOpt[0] * scaleOpt * dpr) / canvas.width + 1) / 2;
  const y =
    (-ry * scaleOpt + (offsetOpt[1] * scaleOpt * dpr) / canvas.height + 1) / 2;

  return { x, y, rz, inFront: rz >= 0 };
}
