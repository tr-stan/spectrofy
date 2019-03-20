import React, { Component } from 'react'
import './App.css'

class Analysis extends Component {
    constructor(props) {
        super(props)
        // create a ref to store the canvas DOM element
        this.canvas = React.createRef()
        this.drawVisuals = this.drawVisuals.bind(this)
    }
    // create method for drawing visuals/animations on canvas
    // from the track audio analysis
    drawVisuals() {
        let cWidth = this.canvas.current.width
        let cHeight = this.canvas.current.height
        let c = this.canvas.current.getContext('2d')
        
        // create Circle class for instantiating circles based off
        // the track audio analysis's segments data
        class Circle {
            constructor(x, y, dx, dy, radius, start, duration, rgba) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.radius = radius;
                this.start = start;
                this.duration = duration;
                this.rgba = rgba;
            }

            // method for drawing each instantiated circle
            draw() {
                c.beginPath()
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
                c.strokeStyle = this.rgba
                c.stroke()
                c.fillStyle = this.rgba
                c.fill()
            }

            // method for how the animated circle will update/move
            update() {

            	// prevent circle from getting stuck on/going past sides of page
                if (this.x + this.radius > cWidth || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }

                // prevent circle from getting stuck on/going past top/bottom of page
                if (this.y + this.radius > cHeight || this.y - this.radius < 0) {
                    this.dy = -this.dy
                }

                // move circle at its set velocity
                this.x += this.dx
                this.y += this.dy

                this.draw()
            }
        }

        let circleArray = []

        // get random number between two values
        function getRandomArbitrary(min, max) {
        	return Math.floor(Math.random() * (max - min) + min);
        }

        // map through fetched audio analysis' segments
        circleArray = this.props.analysis.map(segment => {
        	let radius = Math.abs(Math.round((segment.loudness_max * segment.confidence) / 3))

        	let randomTimbre = Math.floor(Math.random() * 11)

        	let randomX = Math.abs(segment.timbre[randomTimbre] * 2)
        	let x = getRandomArbitrary(randomX, cWidth)

        	let randomY = Math.abs(segment.timbre[randomTimbre] * 2)
        	let y = getRandomArbitrary(randomY, cHeight)

        	let dx = (Math.random() - 0.5) * 3
            let dy = (Math.random() - 0.5) * 3

            let rgba = `rgba(${Math.floor((segment.pitches[0] + segment.pitches[1] + segment.pitches[2] + segment.pitches[3]) * 63.75)},${Math.floor((segment.pitches[4] + segment.pitches[5] + segment.pitches[6] + segment.pitches[7]) * 63.75)},${Math.floor((segment.pitches[8] + segment.pitches[9] + segment.pitches[10] + segment.pitches[11]) * 63.75)},${segment.confidence})`

            let start = segment.start
            let duration = segment.duration

        	return (new Circle(x, y, dx, dy, radius, start, duration, rgba))
        })
        // for (let i = 0; i < circleArray.length; i++) {
        // 	console.log(`Circle No. ${i + 1} X variable:`, circleArray[i].x)
        // }

        function animate() {
            requestAnimationFrame(animate)
            c.clearRect(0, 0, cWidth, cHeight)

            for (let i = 0; i < circleArray.length; i++) {
                circleArray[i].update()
            }
        }

        animate()
    }

    componentDidMount() {
        this.drawVisuals()
    }

    render() {
        return (
            <div className="snap">
				<h2>Visualization for {this.props.track}</h2>
				<canvas className="snap" width={window.innerWidth} height={window.innerHeight} ref={this.canvas}></canvas>
			</div>
        )
    }
}

export default Analysis