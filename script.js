import data from './titanic-data.js'

const titanic = document.querySelector('#titanic')

const portColors = {
  S: 'tomato',
  C: 'cornflowerBlue',
  Q: 'gold',
  undefined: 'limeGreen',
  total: 'black'
}

titanic.style.display = 'grid'
titanic.style.gridTemplateColumns = 'repeat(34, 20px)'
titanic.style.gridGap = '3px'

// Map over the data and make a new element for each passenger
const passengers = data.map(p => {
  const el = document.createElement('div')
  titanic.appendChild(el)
  return el
})

// Let's loop over each passenger and set some styles
function renderPassengers() {
  passengers.forEach((p, i) => {
    const { survived, sex, age } = data[i].fields
    p.classList.add('passenger')
    p.dataset.id = i
    p.style.backgroundColor = '#000'

    p.style.opacity = survived === 'Yes' ? '100%' : '50%'

    p.style.borderRadius = sex === 'female' ? '50%' : '0'

    p.style.backgroundColor = portColors[data[i].fields.embarked]

    if (age < 18) {
      p.style.width = '11px'
      p.style.height = '11px'
      p.style.margin = '5px'
    } else {
      p.style.width = '20px'
      p.style.height = '20px'
      p.style.margin = 0
    }
  })
}

renderPassengers()

const titanicEmbarked = document.querySelector('#titanic-embarked')

const embarkedCounts = data.reduce((acc, p) => {
  if (acc[p.fields.embarked] === undefined) {
    acc[p.fields.embarked] = 1
  } else {
    acc[p.fields.embarked] += 1
  }
  return acc
}, {})

const embarkedKeys = Object.keys(embarkedCounts)

embarkedKeys.forEach((e) => {
  const el = document.createElement('div')
  titanicEmbarked.appendChild(el)
  el.style.width = '30px'
  const count = embarkedCounts[e]
  const percent = count / data.length * 100
  el.style.height = `${percent}%`
  el.style.backgroundColor = portColors[e]
  el.style.margin = '1px'
})

const passengerDetails = document.querySelector('#passenger-details')

document.body.addEventListener('mouseover', (e) => {
  if (e.target.matches('.passenger')) {
    const id = e.target.dataset.id
    const fields = data[id].fields
    passengerDetails.style.color = 'black'
    passengerDetails.style.display = 'block'
    passengerDetails.style.position = 'absolute'
    passengerDetails.style.left = `${e.pageX}px`
    passengerDetails.style.top = `${e.pageY}px`
    passengerDetails.style.backgroundColor = '#FFF'
    passengerDetails.style.border = '1px solid'
    passengerDetails.style.padding = '0.5em'
    passengerDetails.innerHTML = `
    <strong>${fields.name}</strong>
    <ul>
      <li>Age: ${fields.age}</li>
      <li>Fare: ${fields.fare}</li>
      <li>Embarked: ${fields.embarked}</li>
    </ul>`
  }
})

document.body.addEventListener('mouseout', (e) => {
  if (e.target.matches('.passenger')) {
    passengerDetails.style.display = 'none'
  }
})

function sortSurvived() {
  data.sort((a, b) => {
    if (a.fields.survived === 'Yes') {
      return -1
    }
    return 1
  })
}

function sortAge() {
  data.sort((a, b) => {
    if (a.fields.age < 18) {
      return -1
    }
    return 1
  })
}

function sortSex() {
  data.sort((a, b) => {
    if (a.fields.sex === 'female') {
      return -1
    }
    return 1
  })
}

function sortFare() {
  data.sort((a, b) => {
    return a.fields.fare - b.fields.fare
  })
}

function sortEmbarked() {
  data.sort((a, b) => {
    if (a.fields.embarked < b.fields.embarked) {
      return -1
    } else if (a.fields.embarked > b.fields.embarked) {
      return 1
    }
    return 0
  })
}

document.body.addEventListener('click', (e) => {
  console.log(e.target)
  if (e.target.matches('.sort-by-survived')) {
    sortSurvived()
    renderPassengers()
  } else if (e.target.matches('.sort-by-age')) {
    sortAge()
    renderPassengers()
  } else if (e.target.matches('.sort-by-sex')) {
    sortSex()
    renderPassengers()
  } else if (e.target.matches('.sort-by-fare')) {
    sortFare()
    renderPassengers()
  } else if (e.target.matches('.sort-by-embarked')) {
    sortEmbarked()
    renderPassengers()
  }
})


