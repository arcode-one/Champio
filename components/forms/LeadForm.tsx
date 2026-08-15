"use client";

import { FormEvent, useState } from "react";
import { ArrowIcon } from "@/components/ui/Icons";

type LeadFormProps = {
  compact?: boolean;
  title?: string;
};

export function LeadForm({ compact = false, title = "Запросите расчёт поставки" }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className={`lead-form${compact ? " lead-form--compact" : ""}`} onSubmit={handleSubmit}>
      <div className="lead-form__heading">
        <span className="eyebrow">Заявка на поставку</span>
        <h2>{title}</h2>
      </div>

      <div className="lead-form__grid">
        <label className="form-field">
          <span className="form-field__label">Имя *</span>
          <input className="form-field__input" name="name" type="text" autoComplete="name" required placeholder="Как к вам обращаться" />
        </label>
        <label className="form-field">
          <span className="form-field__label">Компания *</span>
          <input className="form-field__input" name="company" type="text" autoComplete="organization" required placeholder="Название компании" />
        </label>
        <label className="form-field">
          <span className="form-field__label">Телефон *</span>
          <input className="form-field__input" name="phone" type="tel" autoComplete="tel" required placeholder="+7 999 000-00-00" />
        </label>
        <label className="form-field">
          <span className="form-field__label">Регион поставки</span>
          <input className="form-field__input" name="region" type="text" placeholder="Город или область" />
        </label>
        <label className="form-field form-field--wide">
          <span className="form-field__label">Потребность</span>
          <textarea
            className="form-field__input form-field__textarea"
            name="message"
            rows={1}
            placeholder="Объём в неделю, калибр и формат упаковки"
            onInput={(event) => {
              const field = event.currentTarget;
              field.style.height = "auto";
              field.style.height = `${field.scrollHeight}px`;
            }}
          />
        </label>
      </div>

      <div className="lead-form__footer">
        <button className="form-submit" type="submit">
          <span>Отправить заявку</span>
          <ArrowIcon />
        </button>
        <p>Демонстрационный режим: данные никуда не отправляются и не сохраняются.</p>
      </div>

      <p className={`lead-form__success${submitted ? " lead-form__success--visible" : ""}`} role="status">
        Готово! Это демонстрация: заявка не отправлена, а данные не сохранены.
      </p>
    </form>
  );
}
