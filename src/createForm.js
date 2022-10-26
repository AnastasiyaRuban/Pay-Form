import { el, setChildren } from 'redom';
import header from './header.js';

export function createForm() {

  const form = el('form', {
    class: 'd-flex flex-column',
    style: 'border: 2px solid #ced4da; border-radius: 10px; padding: 15px; max-width: 450px'
  }, [
    createInputGroup('Номер карты', 'numberCard', 'Введите номер карты', 'tel', 'groupNumber'),
    createInputGroup('Дата окончания действия карты (ММ/ГГ)', 'validityPeriod', 'Введите дату окончания действия карты', 'text', 'groupDate'),
    createInputGroup('CVC/CVV (3 цифры на обороте карты)', 'CVC/CVV', 'CVC/CVV', 'text', 'groupCVV'),
    createInputGroup('Email для отправки онлайн-чека', 'email', 'Введите email', 'email', 'groupEmail'),


    el('button', {
      class: 'btn btn-primary',
      disabled: 'true',
    }, 'Оплатить'),
  ]);

  const container = el('div', {
    class: 'container py-5',

  }, [
    header,
    form
  ])

  function createInputGroup(label, id, placeholder, type, classGroup) {

    const labelInput = el('label', {
      for: id,
      style: 'padding: 0 12px; font-size: 0.9rem; margin-bottom: 5px',
    }, label);

    const input = el('input', {
      class: 'form-control',
      placeholder: placeholder,
      id: id,
      type: type,
      required: true
    }, '');


    const inputBlock = el('div', {
      class: `form-group ${classGroup}  mb-3`,
    }, [
      labelInput,
      input,

    ]);

    return inputBlock;
  }

  setChildren(window.document.body, container);
}