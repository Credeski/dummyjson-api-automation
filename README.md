# DummyJSON API Testing & Automation

API testing and automation project built with **Postman, Playwright, and TypeScript** using the DummyJSON REST API.

## What I Tested

- Authentication
- Users
- Products
- Carts
- Positive and negative scenarios
- Status code and response validation
- JSON data validation

## Tools

- Postman: API testing and test design
- Playwright: API automation
- TypeScript

## Project Structure

```text
postman/
  DummyJSON.postman_collection.json

tests/
  auth.spec.ts
  users.spec.ts
  products.spec.ts
  carts.spec.ts

playwright.config.ts
```

## Running Tests

```bash
npm install
npx playwright test
npx playwright show-report
```
