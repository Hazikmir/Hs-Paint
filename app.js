// Main App Variables
const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.7;

let tool = 'pencil';
let isDrawing = false;
let startX, startY;
let primaryColor = '#000000';
let brushSize = 5;
let shapeType = '';

// Welcome Screen
document.getElementById('start').addEventListener('click', () => {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
});

// Tool Selection
document.querySelectorAll('#toolbar button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === 'shapeBtn') {
            document.getElementById('shapesPopup').style.display = 'block';
        } else {
            tool = button.getAttribute('data-tool');
            shapeType = '';
        }
    });
});

// Shapes Popup
document.getElementById('rectangle').addEventListener('click', () => {
    shapeType = 'rectangle';
    document.getElementById('shapesPopup').style.display = 'none';
});

document.getElementById('circle').addEventListener('click', () => {
    shapeType = 'circle';
    document.getElementById('shapesPopup').style.display = 'none';
});

document.getElementById('line').addEventListener('click', () => {
    shapeType = 'line';
    document.getElementById('shapesPopup').style.display = 'none';
});

document.getElementById('polygon').addEventListener('click', () => {
    shapeType = 'polygon';
    document.getElementById('shapesPopup').style.display = 'none';
});

document.getElementById('closeShapes').addEventListener('click', () => {
    document.getElementById('shapesPopup').style.display = 'none';
});

// Canvas Drawing Events
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;

    if (tool === 'fill') {
        ctx.fillStyle = primaryColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const x = e.offsetX;
    const y = e.offsetY;

    if (tool === 'pencil' || tool === 'brush') {
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
        startX = x;
        startY = y;
    }
    
    if (tool === 'eraser') {
        ctx.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
    }

    if (shapeType) {
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = brushSize;
        if (shapeType === 'rectangle') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeRect(startX, startY, x - startX, y - startY);
        } else if (shapeType === 'circle') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.beginPath();
});