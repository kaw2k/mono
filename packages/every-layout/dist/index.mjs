// src/web/space.ts
var ratio = 1.5;
function space(space2, unit) {
  const gap = typeof space2 === "string" ? parseInt(space2, 10) : space2;
  const size = Math.pow(ratio, gap);
  return unit ? `${size}${unit}` : size;
}
export {
  space
};
