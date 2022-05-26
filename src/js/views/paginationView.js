import View from './view';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 and there are other pages

    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupButton(this._data.page, false);
    }
    // page 1 and the are NO other pages
    if (this._data.page === 1 && numPages === 1) {
      return '';
    }

    // other page
    if (this._data.page > 1 && this._data.page < numPages) {
      return `<button data-goto="${
        this._data.page - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
    </button>
    <button data-goto="${
      this._data.page + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    // last page
    if (this._data.page === numPages) {
      // console.log(this._data.page);
      return this._generateMarkupButton(this._data.page);
    }
  }

  _generateMarkupButton(page, minus = true) {
    return `
    <button data-goto="${
      minus ? page - 1 : page + 1
    }" class="btn--inline pagination__btn--${minus ? 'prev' : 'next'}">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-${minus ? 'left' : 'right'}"></use>
    </svg>
    <span>Page ${minus ? page - 1 : page + 1}</span>
  </button>
    `;
  }
}

export default new paginationView();
