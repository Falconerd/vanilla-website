function radius_fn() {
    let radius = 20
    const slider = document.createElement('input')
    slider.style.width = '100%'
    slider.type = 'range'
    slider.min = 10
    slider.max = 50
    slider.value = radius
    slider.addEventListener('change', e => {
        radius = e.target.value
        draw()
    })

    const canvas = document.getElementById('radius')
    canvas.width = 640
    canvas.height = 320

    canvas.style.border = '1px solid black'

    const ctx = canvas.getContext('2d')

    canvas.parentNode.insertBefore(slider, canvas.nextSibling)

    function draw() {
        canvas.width = 0
        canvas.width = 640

        ctx.fillStyle = '#ece5e1'
        ctx.strokeStyle = '#aea995'
        ctx.strokeWeight = 2

        ctx.beginPath()
        ctx.arc(320, 160, 2 * radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.fill()

        ctx.fillStyle = 'white'

        ctx.beginPath()
        ctx.arc(320, 160, radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.fill()

        ctx.beginPath()
        ctx.arc(320, 160, 4, 0, Math.PI * 2)
        ctx.stroke()
    }
    draw()
}

radius_fn()
