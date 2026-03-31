import type{ Coefficient, UpdateCoefficient } from "../TypesToUse/Types.tsx";
import { useState, useRef, useEffect } from "react";
import { trueZero, cardano, getRoots } from "../Functions.tsx";

export default function CubicGraph

({ coefficients, update }: UpdateCoefficient) {

    const canvasRef = useRef<HTMLCanvasElement>(null); // Create a ref for canvas

    useEffect (() => {

        const a = coefficients.a;
        const b = coefficients.b;
        const c = coefficients.c;
        const d = coefficients.d;

        const p = (3 * a * c - b * b) / (3 * a * a);
        const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
        const delta = trueZero(Math.pow(q / 2, 2) + Math.pow(p / 3, 3));

        const roots = getRoots(a, b, p, q, delta);

        let x1 = Number(roots[0]); // x1 always has a value
        let x2 = Number(roots[1]); // MAY BE NaN
        let x3 = Number(roots[2]); // MAY BE NaN

        const canvas = canvasRef.current;
        if (!canvasRef.current) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const xMin = -12; // Determine how many units it extends for relative to axis origin, ideally square
        const xMax = 12;
        const yMin = -12;
        const yMax = 12;
        // Because Canvas's grid starts with index (0, 0) at top left corner, we must find the corresponding Canvas coords
        function coordToPixelX(x: number) { // Converts x/y-vals from the function into coords used by Canvas. 
            const width = canvas.width; // From width and height defined in HTML part
            const pixelPerGridX = width / (xMax - xMin); // Determine how many Canvas pixels per. Origin on normal graph corresponds to 24/2
            const px = (x - xMin) * pixelPerGridX; // First get Canvas x-coord (the one with origin at top left corner...) that corresponds to og x val, then multiply it by the no. pixels per grid to get the correct no. pixels
            return px; // Returns as an object
        }

        function coordToPixelY(y: number) {
            const height = canvas.height;
            const pixelPerGridY = height / (yMax - yMin);
            const py = (yMax - y) * pixelPerGridY;
            return py;
        }

        function calculateCubic(x: number) { // Simply to get x-y input-output
            return a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
        }

        function drawGrid() { // Draws the grid

            ctx.lineWidth = 1;

            for (let i = xMin; i <= xMax; i++) { // Draw all VERTICAL lines, including edges
            ctx.beginPath();
            ctx.strokeStyle = "rgba(103, 160, 149)";
            ctx.moveTo(coordToPixelX(i), coordToPixelY(yMax));
            ctx.lineTo(coordToPixelX(i), coordToPixelY(yMin));
            ctx.stroke();
            }

            for (let i = yMin; i <= yMax; i++) { // Draw all HORIZONTAL lines, including edges
            ctx.beginPath();
            ctx.strokeStyle = "rgba(103, 160, 149)";
            ctx.moveTo(coordToPixelX(xMin), coordToPixelY(i));
            ctx.lineTo(coordToPixelX(xMax), coordToPixelY(i));
            ctx.stroke();
            }

        }

        function drawAxis() {

            ctx.beginPath();
            ctx.strokeStyle = "rgba(9, 69, 74, 0.87)";

            const pxMin = coordToPixelX(xMin); // The leftmost edge of the grid
            const pxMax = coordToPixelX(xMax); // and rightmost
            ctx.moveTo(pxMin, coordToPixelY(0)); // Start line at leftmost
            ctx.lineTo(pxMax, coordToPixelY(0)); // End line at rightmost
            ctx.stroke(); // This draws the line

            ctx.beginPath();
            const pyMin = coordToPixelY(yMin); // The bottommost edge of the grid
            const pyMax = coordToPixelY(yMax); // and topmost
            ctx.moveTo(coordToPixelX(0), pyMin); // Start line at bottommost
            ctx.lineTo(coordToPixelX(0), pyMax); // End line at topmost
            ctx.stroke(); // Draws the line

        }

        function drawCurve() { // For actually drawing the curve

            let isFirstPoint = true;
            ctx.beginPath();
            ctx.strokeStyle = "rgba(93, 20, 21)";
            ctx.lineWidth = 3;

            for (let i = xMin; i <= xMax; i += 0.001) {
            const x = i;
            const y = calculateCubic(x);

            if (y < yMin || y > yMax) {
                // Make sure y is in range (x always in range)
                isFirstPoint = true;
                continue;
            }

            if (isFirstPoint) {
                // Only reaches this for first point, then locks it to false
                ctx.moveTo(coordToPixelX(x), coordToPixelY(y));
                isFirstPoint = false;
                continue;
            }

            ctx.lineTo(coordToPixelX(x), coordToPixelY(y));
            }

            ctx.stroke(); // Draws once all lineTo are marked

        }

        function drawDot(x: number, y: number, color: string) {

            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.arc(x, y, 3, 0, 2 * Math.PI); // (x-coord, y-coord, radius, start angle, end angle)
            ctx.fillStyle = color; // Circle fill color
            ctx.fill(); // Fills the circle so it's not just a circle
            ctx.stroke();

        }

        function drawRoots() { // roots were defined way at the top

            drawDot(coordToPixelX(x1), coordToPixelY(0), "rgba(65, 107, 186)"); // x1 will always be a root

            if (delta == 0) { // Case C

            if (p != 0) { // Case C2: Double root (x2 and x3 are the same so just draw one)

                drawDot(coordToPixelX(x2), coordToPixelY(0), "rgba(65, 107, 186)");
            } // Else, p = q = 0 and it's a triple root (no need to draw)

            } else if (delta < 0) { // Case A, three real roots

            drawDot(coordToPixelX(x2), coordToPixelY(0), "rgba(65, 107, 186)");
            drawDot(coordToPixelX(x3), coordToPixelY(0), "rgba(65, 107, 186)");
            } // Case B, 1 real and 2 complex roots, no need to draw

        }

        function drawYIntercept() {

            if (d >= yMin && d <= yMax) {
            drawDot(coordToPixelX(0), coordToPixelY(d), "rgba(191, 155, 21)");
            }

        }

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears before running all drawing functions
        drawGrid();
        drawAxis();
        drawCurve();
        drawRoots();
        drawYIntercept();
        
    }, [coefficients]); // useEffect's second [] parameter means it'll only run when [] udpates

    return (
        <div>
            <canvas ref={canvasRef} width="600" height="600" style={{ border: "1px solid black" }}>
            </canvas>
        </div>
    )
}