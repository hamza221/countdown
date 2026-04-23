const { performance } = require('perf_hooks');

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

const numPieces = 1000;
const numIterations = 100000;

function runOld() {
    const oldPieces = [];
    for (let i = 0; i < numPieces; i++) {
        oldPieces.push({
            rotation: randomRange(0, 360),
            rotationSpeed: randomRange(-8, 8),
        });
    }
    let dummy = 0;
    const startOld = performance.now();
    for (let iter = 0; iter < numIterations; iter++) {
        for (let i = 0; i < numPieces; i++) {
            const p = oldPieces[i];
            p.rotation += p.rotationSpeed;
            // The multiplication and division overhead
            const rad = (p.rotation * Math.PI) / 180;
            dummy += rad;
        }
    }
    const endOld = performance.now();
    return endOld - startOld;
}

function runNew() {
    const newPieces = [];
    for (let i = 0; i < numPieces; i++) {
        newPieces.push({
            rotation: randomRange(0, 2 * Math.PI),
            rotationSpeed: randomRange(-8 * Math.PI / 180, 8 * Math.PI / 180),
        });
    }
    let dummy = 0;
    const startNew = performance.now();
    for (let iter = 0; iter < numIterations; iter++) {
        for (let i = 0; i < numPieces; i++) {
            const p = newPieces[i];
            p.rotation += p.rotationSpeed;
            const rad = p.rotation;
            dummy += rad;
        }
    }
    const endNew = performance.now();
    return endNew - startNew;
}

// Interleave runs to avoid JVM/V8 warmup artifacts skewing results
let sumOld = 0;
let sumNew = 0;
const runs = 10;

for (let i = 0; i < runs; i++) {
    sumOld += runOld();
    sumNew += runNew();
}

const avgOld = sumOld / runs;
const avgNew = sumNew / runs;

console.log(`Average Old Time: ${avgOld.toFixed(2)} ms`);
console.log(`Average New Time: ${avgNew.toFixed(2)} ms`);
console.log(`Average Improvement: ${((avgOld - avgNew) / avgOld * 100).toFixed(2)}%`);
