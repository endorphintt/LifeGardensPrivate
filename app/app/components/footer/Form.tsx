'use client'
import { useForm, ValidationError } from '@formspree/react'
import c from './Footer.module.scss'

function ContactForm() {
    const [state, handleSubmit] = useForm('xqkorkjl')

    if (state.succeeded) {
        return <div>дякуємо </div>
    }

    return (
        <form className={c.form} onSubmit={handleSubmit}>
            <p className={c.form__title}>Зроби сторінку кращою!</p>
            <label htmlFor="email">
                <input
                    className={c.form__input}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="пошта"
                    required
                />
            </label>
            <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
            />
            <label htmlFor="message">
                <textarea
                    placeholder="проблема або побажання"
                    className={c.form__text}
                    id="message"
                    name="message"
                    required
                />
            </label>
            <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
            />
            <button
                className={c.form__button}
                type="submit"
                disabled={state.submitting}
            >
                НАДІСЛАТИ
            </button>
        </form>
    )
}

export default ContactForm
