# EmailJS templates

Copy these into the EmailJS dashboard when you set up sending.

| File | Used by | Variables |
|------|---------|-----------|
| `contact-form.html` | `/contact` (Get in Touch) | `{{name}}` `{{email}}` `{{phone}}` `{{message}}` |
| `quote-request-form.html` | Send Quote modal (enzymes + industry product cards) | `{{subject}}` `{{phone}}` `{{code}}` `{{enzyme}}` `{{application}}` `{{quantity}}` `{{message}}` |

## Credentials

1. Copy `.env.example` → `.env`
2. Fill Service ID, Template ID, and Public Key
3. Restart Vite

IDs are read in `src/lib/emailjs.ts` from `VITE_EMAILJS_*` env vars. Never commit `.env`.
