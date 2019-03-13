import React, { Component } from 'react'
import './App.css'

class Analysis extends Component {
    constructor(props) {
        super(props)
        // create a ref to store the canvas DOM element
        this.canvas = React.createRef()
        this.draw = this.draw.bind(this)
    }

    draw() {
        let cWidth = this.canvas.current.width
        let cHeight = this.canvas.current.height
        let c = this.canvas.current.getContext('2d')

        class Circle {
            constructor(x, y, dx, dy, radius) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.radius = radius;
            }

            draw() {
                c.beginPath()
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
                c.strokeStyle = 'blue'
                c.stroke()
            }

            update() {
                if (this.x + this.radius > cWidth || this.x - this.radius < 0) {
                    this.dx = -this.dx;
                }

                if (this.y + this.radius > cHeight || this.y - this.radius < 0) {
                    this.dy = -this.dy
                }

                this.x += this.dx
                this.y += this.dy

                this.draw()
            }
        }

        let circleArray = []

        for (let i = 0; i < 10; i++) {
            let radius = 3
            let x = Math.random() * (cWidth - radius * 2) + radius
            let y = Math.random() * (cHeight - radius * 2) + radius
            let dx = (Math.random() - 0.5) * 3
            let dy = (Math.random() - 0.5) * 3

            circleArray.push(new Circle(x, y, dx, dy, radius))
        }


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
        this.draw()
    }

    render() {
        return (
            <div>
				<h2>Visualization for {this.props.match.params.trackName}</h2>
				<canvas height={500} width={500} ref={this.canvas}></canvas>
			</div>
        )
    }
}

export default Analysis