import { el } from 'redom';
import './style.scss'; //эти стили подключатся на страницу


export default el('header', { class: 'page-header' }, el('h1', {
  class: 'mb-3 page-header-title',
}, 'Форма оплаты')
);