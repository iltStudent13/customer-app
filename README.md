# Customer App

A React + TypeScript customer management application built with Vite.

## Overview

Application generates a list of customers and allows edit and removal of customers from list.

## Features

- View customers in a responsive table layout
- Search customers by name, email, phone, or city
- Add a new customer with form validation
- Edit an existing customer
- Delete a customer with confirmation
- Light/Dark theme toggle

## Custom Hooks

- `useCustomerApi`
  - Encapsulates customer-related API requests and data operations used by pages/components.

- `useLocalStorage`
  - Persists local UI state (for example theme preference) to browser `localStorage`.

## API Contract

Base URL during development: `http://localhost:3001`

### Endpoints

- `GET /customers`
  - Returns: `200 OK` with an array of customers

- `GET /customers/:id`
  - Returns: `200 OK` with a single customer
  - Returns: `404 Not Found` if the customer does not exist

- `POST /customers`
  - Body: customer fields (without `id`)
  - Returns: `201 Created` with created customer object (including `id`)

- `PUT /customers/:id`
  - Body: full customer object (without changing `id`)
  - Returns: `200 OK` with updated customer object
  - Returns: `404 Not Found` if the customer does not exist

- `DELETE /customers/:id`
  - Returns: `200 OK` on successful delete
  - Returns: `404 Not Found` if the customer does not exist

## Testing

Vitest and React Testing Library are used for tests covering rendering, form validation, list and error behavior.
To run tests `npm run test:run`

## Installation

### Prerequisites

- Node.js 18+
- npm 9+

### 1) Install dependencies

```bash
npm install
```

### 2) Start the API server (Terminal 1)

```bash
npm run api
```

Runs JSON Server on `http://localhost:3001`.

### 3) Start the frontend app (Terminal 2)

```bash
npm run dev
```

Open the app at the Vite URL shown in terminal (typically `http://localhost:5173`).

### 4) Build and preview (optional)

```bash
npm run build
npm run preview
```

## Deployment (GitHub Pages)

### One-time setup

1. In your GitHub repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch **`gh-pages`** and folder **`/(root)`**.

### Deploy

```bash
npm run deploy
```

This command runs `predeploy` (`npm run build`) and then publishes the `dist` folder to the `gh-pages` branch.

### Redeploy after changes

```bash
git pull
npm install
npm run deploy
```

### Notes

- The Vite base path is configured for GitHub Pages in `vite.config.ts` as `/customer-app/`.
- If deployment succeeds but the site looks stale, hard refresh the page or wait a minute for Pages to update.

## Project Structure

```text
├── src
│ ├── App.css
│ ├── App.tsx
│ ├── components
│ │ ├── CustomerForm.test.tsx
│ │ ├── CustomerForm.tsx
│ │ ├── CustomerList.test.tsx
│ │ ├── CustomerList.tsx
│ │ ├── ErrorBoundary.test.tsx
│ │ ├── ErrorBoundary.tsx
│ │ ├── Header.tsx
│ │ └── SearchFilter.tsx
│ ├── context
│ │ └── ThemeContext.tsx
│ ├── hooks
│ │ ├── useCustomerApi.tsx
│ │ └── useLocalStorage.ts
│ ├── index.css
│ ├── main.tsx
│ ├── pages
│ │ ├── AddCustomer.tsx
│ │ ├── Customers.tsx
│ │ ├── EditCustomer.tsx
│ │ └── Layout.tsx
│ ├── test
│ │ └── setup.ts
│ ├── types
│ │ └── customer.ts
│ └── utils
│ ├── customerSchema.ts
│ └── formatter.ts
```

## Technologies

- React
- TypeScript
- Vite
- React Router
- Vitest
- React Testing Library
