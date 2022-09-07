function ellipsis(string = '', maxlenght) {
  if (string.length > maxlenght) {
    return string.substring(0, maxlenght) + '...'
  }
  return string
}

class HtmlService {
  paintProduct(product) {
    return `
      <li class="goods" data-id="${product.id}">
        <img src="${product.image}" title="${product.title}" alt="">
        <small>${product.title}</small>
        <small><strong>$${product.price}</strong></small>
      </li>
    `
  }

  paintProducts(products = []) {
    return products.map(this.paintProduct).join('')
  }

  paintCartItem(item) {
    return `
      <li data-type="remove" data-id="${item.id}">
        (${item.amount})
        ${item.title}
        <strong>${item.price}</strong>
      </li>
    `
  }

  paintCart({items, totalPrice}) {
    if (items.length === 0) {
      return `<p>Корзина пуста</p>`
    }

    return `
        <ul class="cart-list">
          ${items.map(this.paintCartItem).join('')}
        </ul>
        <hr>
        <p class="info">
          <span>Общая цена: <strong>$${totalPrice.toFixed(2)}</strong></span>
          <button class="btn" data-type="clear">Очистить</button>
        </p>
    `
  }

  paintFlashDealsItem(product) {
    return `
      <li class="goods" data-id="${product.id}">
        <img src="${product.image}" title="${product.title}" alt="">
        <small>${product.title}</small>
        <small><strong>$${product.price}</strong></small>
        <div class="goods-action" id="goods-action">
          <button class="btn" data-action="add">Add to cart</button>
          <div class="counter">
            <button data-action="decrease">-</button>
            <input type="number" id="" value="1">
            <button data-action="increase">+</button>
          </div>
        </div>
      </li>
    `
  }

  paintFlashDeals(products = []) {
    return products.map(this.paintFlashDealsItem).join('')
  }

  paintError(e) {
    return `<p class="error">${e.message}</p>`
  }
}