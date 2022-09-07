let productService
const cartService = new CartService()
const htmlService = new HtmlService()

const productsContainer = document.getElementById('products')
const cartContainer = document.getElementById('cart')
const filterInput = document.getElementById('filter')
const flashDealsContainer = document.getElementById('flash-deals')

// фильтрация
filterInput.addEventListener('input', event => {
  const value = event.target.value

  const filteredProducts = productService.filterBy(value)

  renderProducts(filteredProducts)
})

// добавление товаров из листинга в корзину
productsContainer.addEventListener('click', event => {
  const id = event.target.dataset.id
    ? event.target.dataset.id
    : event.target.closest('li')?.dataset.id

  if (id) {
    cartService.add(
      productService.getById(+id)
    )
    renderCart()
  }
})

// добавление, уменьшение/увеличения кол-ва горящих товаров в корзину
flashDealsContainer.addEventListener('click', event => {
  const action = event.target?.dataset.action
  const id = event.target.dataset.id
    ? event.target.dataset.id
    : event.target.closest('li')?.dataset.id

  switch (action) {
    case 'add':
      cartService.add(
        productService.getById(+id)
      )
      renderCart()
      break
    case 'increase':
      cartService.increase(
        productService.getById(+id)
      )
      renderCart()
      break
    case 'decrease':
      cartService.decrease(
        productService.getById(+id)
      )
      renderCart()
      break
  }
  if (id) {
    cartService.add(
      productService.getById(+id)
    )
    renderCart()
  }
})

// удаление товаров из корзины и очистка
cartContainer.addEventListener('click', event => {
  const type = event.target?.dataset.type
  const id = event.target.dataset.id
    ? event.target.dataset.id
    : event.target.closest('li')?.dataset.id

  switch (type) {
    case 'clear':
      cartService.clear()
      renderCart()
      break
    case 'remove':
      cartService.remove(id)
      renderCart()
      break
  }
})

// отрисовка товаров
function renderProducts(products) {
  productsContainer.innerHTML = htmlService.paintProducts(products)
}

// отрисовка горящих товаров
function renderFlashDeals(products) {
  flashDealsContainer.innerHTML = htmlService.paintFlashDeals(products)
}

// отрисовка корзины
function renderCart() {
  cartContainer.innerHTML = htmlService.paintCart(
    cartService.getInfo()
  )
}

async function startApplication() {
  renderCart()
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()

    productService = new ProductService(data)

    renderProducts(productService.products)
    renderFlashDeals(productService.products)
  } catch (e) {
    productsContainer.innerHTML = htmlService.paintError(e)
    flashDealsContainer.innerHTML = htmlService.paintError(e)
  }
}

startApplication()
