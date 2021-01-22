import React, { Component } from 'react'
import Bubble from './Bubble.js'
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

        let bubbleArray = []

        // get random number between two values
        function getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        // map through fetched audio analysis' segments
        bubbleArray = this.props.analysis.map(segment => {
            let radius = Math.abs(Math.round(segment.loudness_max * segment.confidence))

            let randomTimbre = Math.floor(Math.random() * 11)

            let randomX = Math.abs(segment.timbre[randomTimbre] * 2)
            let x = getRandomArbitrary(randomX, cWidth - radius)

            let randomY = Math.abs(segment.timbre[randomTimbre] * 2)
            let y = getRandomArbitrary(randomY, cHeight - radius)

            let dx = (Math.random() - 0.5) * 3
            let dy = (Math.random() - 0.5) * 3

            let rgba = `rgba(${Math.floor((segment.pitches[0] + segment.pitches[1] + segment.pitches[2] + segment.pitches[3]) * 63.75)},${Math.floor((segment.pitches[4] + segment.pitches[5] + segment.pitches[6] + segment.pitches[7]) * 63.75)},${Math.floor((segment.pitches[8] + segment.pitches[9] + segment.pitches[10] + segment.pitches[11]) * 63.75)},${segment.confidence})`

            let start = segment.start
            let duration = segment.duration

            return (new Bubble(x, y, dx, dy, radius, start, duration, rgba, cWidth, cHeight, c))
        })
        // for (let i = 0; i < bubbleArray.length; i++) {
        //  console.log(`Bubble No. ${i + 1} X variable:`, bubbleArray[i].x)
        // }

        let animate = () => {
            // let start = Date.now()

            c.clearRect(0, 0, cWidth, cHeight)
            bubbleArray.map(bubble => bubble.update())
            requestAnimationFrame(animate)
        }

        animate()
    }

    componentDidMount() {
        this.drawVisuals()
    }

    render() {
        return (
            <div>
                <h2>{this.props.track}</h2>
                <canvas width={window.innerWidth} height={window.innerHeight} ref={this.canvas}></canvas>
            </div>
        )
    }
}

export default Analysis
