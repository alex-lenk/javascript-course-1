'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const totalProductsCount = document.querySelector('.js__total-products');
  const basketTotalCost    = document.querySelector('.js__basket-total-cost');
  const basket             = document.querySelector('.js__basket');
  const basketHeader       = document.querySelector('.basketHeader');
  const products           = {};
  let countProduct         = 0;

  document.addEventListener('click', e => {
    if (e.target.classList.contains('js__total-products')) {
      basket.classList.toggle('d-none');
    }

    if (e.target.classList.contains('js-product__add')) {
      const item  = e.target.closest('.product__item'),
            id    = +item.dataset.id,
            name  = item.dataset.name,
            price = +item.dataset.price;

      addBasket(id, name, price);

      /* прибавляем общее количество добавленных товаров в корзине */
      totalProductsCount.dataset.basketAmount = String(++countProduct);
    }
  });


  /**
   * функция добавляет в объект добавленные товары
   * @param {number} id    - ID товара.
   * @param {string} name  - наименования товара.
   * @param {number} price - Цена товара.
   */
  function addBasket(id, name, price) {
    if (!(id in products)) {
      products[id] = {id, name, price, count: 0};
    }
    products[id].count++;
    basketTotalCost.textContent = returnTotalPrice().toString();

    const basketRow = basket
      .querySelector(`.basketRow[data-id-product="${id}"]`);

    if (!basketRow) {
      return setProduct(id);
    }

    basketRow
      .querySelector('.js__basket-row__count')
      .textContent = products[id].count;

    basketRow
      .querySelector('.js__basket-row__total')
      .textContent = (products[id].price * products[id].count).toString();
  }


  /**
   * Функция возвращает общую стоимость всех добавленных в корзину товаров
   * @returns {number} - итоговая сумма всех товаров
   */
  function returnTotalPrice() {
    return Object.values(products)
      .reduce((acc, item) => acc + item.price * item.count, 0);
  }


  /**
   * Функция создает добавленный товар
   * @param {number} id - это ID продукта
   */
  function setProduct(id) {
    const row = `
      <div class="basketRow" data-id-product="${id}">
        <div>${products[id].name}</div>
        <div>
            <span class="js__basket-row__count">${products[id].count}</span> шт.
        </div>
        <div>$${products[id].price}</div>
        <div>
          $<span class="js__basket-row__total">
              ${(products[id].price * products[id].count).toString()}
          </span>
        </div>
      </div>
    `;
    basketHeader.insertAdjacentHTML('afterend', row);
  }
});
