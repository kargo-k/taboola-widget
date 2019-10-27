API = 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init'

fetch(API).then(res => res.json()).then(json => {
  let data = json.list
  let contentList = document.getElementsByClassName('content')
  for (let contentDiv of contentList) {
    contentDiv.innerHTML = ""
    contentDiv.className = 'content'
    render(data, contentDiv)
  }
})

// renders the widget on page load with placeholders while the async fetch is completing
let renderWidget = (div, headerStr) => {
  let widget = document.createElement('div')
  widget.className = 'widget'
  div.appendChild(widget)

  let widgetHeading = document.createElement('div')
  widgetHeading.className = 'header'
  widget.appendChild(widgetHeading)

  let headerText = document.createElement('span')
  headerText.innerText = headerStr
  widgetHeading.appendChild(headerText)

  let disclaimer = document.createElement('span')
  disclaimer.className = 'disclaimer'
  disclaimer.innerText = 'Sponsored Links by Taboola'
  widgetHeading.appendChild(disclaimer)

  let content = document.createElement('div')
  content.className = 'content placeholder'
  content.innerText = 'Loading...'
  widget.appendChild(content)
}

// renders the content
let render = (data, content) => {
  data.forEach(item => {
    content.appendChild(renderItem(item))
  })
}

// renders each item's div
let renderItem = item => {
  let itemDiv = document.createElement('div')
  itemDiv.className = 'item'
  itemDiv.addEventListener('click', () => console.log(item.name))
  // itemDiv.addEventListener('click', () => window.open(item.url, '_blank'))

  let img = document.createElement('img')
  img.setAttribute('src', item.thumbnail[0].url)
  img.className = 'thumbnail'
  itemDiv.appendChild(img)

  let catStr = item.categories.join(', ')
  let catDiv = document.createElement('div')
  catDiv.innerText = catStr
  catDiv.className = 'categories'
  itemDiv.appendChild(catDiv)

  let title = document.createElement('div')
  title.innerText = item.name
  title.className = 'title'
  itemDiv.appendChild(title)

  let brand = document.createElement('div')
  brand.innerText = item.branding
  brand.className = 'brand'
  itemDiv.appendChild(brand)

  return itemDiv
}

// render the Taboola Widget in specified location with your choice of text
let main = document.querySelector('main')
renderWidget(main, 'You May Like')