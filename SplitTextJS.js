/**
 * Author: George Cht
 * License: MIT
 * Contact: georgecht@icloud.com
 */
class Segmentext {
    constructor(_target) {
        this.result = new Object()
        this.selector = document.querySelector(_target)
        this.result.originalText = this.selector.innerText
        this.result.segmentated = this.segmentate(this.selector)
        this.result.words = this.result.segmentated.querySelectorAll('.text-segment--wrapper')
        this.result.chars = this.result.segmentated.querySelectorAll('.text-segment--char')
        this.result.spaces = this.result.segmentated.querySelectorAll('.text-segment--spacer')
        return this.result
    }
    createSpan(_class) {
        let span = document.createElement('span')
        span.style.display = 'inline-block'
        span.className = _class
        return span
    }
    segmentate(_target) {
        let containerArray = new Array
        const segmentatedTarget = _target.innerText.split(' ')
        let counter = segmentatedTarget.length
        segmentatedTarget.map(word => {
            const wrapper = this.createSpan('text-segment--wrapper')
            wrapper.style.position = 'relative'
            wrapper.style.overflow = 'hidden'
            word.split(/(?!^)/).map(char => {
                let el = this.createSpan('text-segment--char')
                el.innerText = char
                wrapper.appendChild(el)
            })
            counter--
            containerArray.push(wrapper)
            if (counter > 0) {
                let space = this.createSpan('text-segment--char text-segment--spacer')
                space.innerHTML = '&nbsp;'
                containerArray.push(space)
            }
        })
        _target.innerHTML = ''
        containerArray.forEach(child => {
            _target.appendChild(child)
        })
        return _target
    }
}
module.exports = Segmentext;