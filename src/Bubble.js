// create Bubble class for instantiating bubbles based off
// the track audio analysis's segments data
class Bubble {
    constructor(x, y, dx, dy, radius, start, duration, rgba, cWidth, cHeight, c) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.start = start;
        this.duration = duration;
        this.rgba = rgba;
        this.cWidth = cWidth;
        this.cHeight = cHeight;
        this.c = c;
    }

    // method for drawing each instantiated bubble
    draw() {
        this.c.beginPath()
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        // this.c.strokeStyle = this.rgba
        // this.c.stroke()
        this.c.fillStyle = this.rgba
        this.c.fill()
    }

    // method for how the animated bubble will update/move
    update() {

        // prevent bubble from getting stuck on/going past sides of page
        if (this.x + this.radius > this.cWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        // prevent bubble from getting stuck on/going past top/bottom of page
        if (this.y + this.radius > this.cHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }

        // move bubble at its set velocity
        this.x += this.dx
        this.y += this.dy

        this.draw()
    }
}

export default Bubble