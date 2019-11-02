import React from 'react'
import PropTypes from 'prop-types'
import styles from './App.scss'

export default function App (props) {
  const { items } = props

  React.useEffect(() => {
    const scroller = document.querySelector('.scroller_horizontal')
    let isDown = false
    let startX
    let scrollLeft

    scroller.addEventListener('mousedown', e => {
      isDown = true
      scroller.classList.add('active')
      startX = e.pageX - scroller.offsetLeft
      scrollLeft = scroller.scrollLeft
    })
    scroller.addEventListener('mouseleave', () => {
      isDown = false
      scroller.classList.remove('active')
    })
    scroller.addEventListener('mouseup', () => {
      isDown = false
      scroller.classList.remove('active')
    })
    scroller.addEventListener('mousemove', e => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - scroller.offsetLeft
      const walk = (x - startX) * 3
      scroller.scrollLeft = scrollLeft - walk
    })
  }, [])

  return (
    <div className={styles.main}>
      <div className='scroller_horizontal'>
        {items &&
          items.map((item, key) => {
            return <div key={key}>{item}</div>
          })}
      </div>
    </div>
  )
}

App.propTypes = {
  items: PropTypes.array
}

App.defaultProps = {
  onClick () {}
}
