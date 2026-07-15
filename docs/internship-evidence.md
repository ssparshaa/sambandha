# Sambandhaa Internship Evidence

## Component Development Evidence

| Evidence Area | File / Location | What It Shows |
| --- | --- | --- |
| Product detail page | `sambandha/app/product/[productSlug]/SingleProductPage.tsx` | Product API loading, state management, image switching, currency selection, quantity control, and add-to-cart logic. |
| Rich text editor | `sambandha/components/TextEditor.jsx` | Reusable editor component using dynamic import and React Quill. |
| Reusable button UI | `sambandha/components/ui/button.tsx` | Variant-based reusable button component with TypeScript props. |
| Memory card component | `sambandha/components/memory-card.tsx` | Reusable visual card component built with Next.js image rendering and responsive styling. |

## Testing Evidence

| Aspect | Details |
| --- | --- |
| Application Tested | Sambandhaa product detail page, cart interaction, rich text editor, and reusable UI components. |
| Testing Type | Functional, UI, component-level, and integration testing during development. |
| Objective of Testing | To verify that product display, image switching, option selection, quantity changes, and add-to-cart interactions worked correctly. |
| Functionalities Tested | Product API loading, product image thumbnails, currency selection, color selection, quantity increment/decrement, cart item creation, and rich text editor rendering. |
| Expected Behaviour | Product information should load correctly, users should select options and quantity, and clicking Add to Bag should add the selected item to the cart. |
| Testing Activities Performed | Product pages were opened repeatedly, product options were changed, cart actions were tested, and reusable UI components were reviewed for display consistency. |
| Issues / Observations Identified | Minor UI spacing and option-display observations were reviewed while validating the shopping experience. |
| Evidence Collected | Screenshots of product detail page, selected options, cart interaction, rich text editor, and reusable button component code. |
| Outcome | Testing confirmed that the selected Sambandhaa components and e-commerce interaction flow worked as expected. |

## Recommended Screenshot Ranges

| File | Lines | Evidence Purpose |
| --- | --- | --- |
| `sambandha/app/product/[productSlug]/SingleProductPage.tsx` | 26-65 | Product API calls, React state, and add-to-cart logic. |
| `sambandha/app/product/[productSlug]/SingleProductPage.tsx` | 177-226 | Color selection, quantity controls, and Add to Bag action. |
| `sambandha/components/TextEditor.jsx` | 1-58 | Reusable rich text editor component. |
| `sambandha/components/ui/button.tsx` | 1-57 | Reusable TypeScript button variant component. |
