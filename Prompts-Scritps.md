npm install
npm run dev

__Type-Check Entire Project__
Run a type check across the whole project. Fix or recommend fixes for:
- Missing types
- Implicit `any`
- Props without interfaces
- Functions without return types


__Future-Proof Types__
Review the code for future-proofing:
- Suggest where generic types would help (e.g., utility functions).
- Recommend stricter interfaces for shared data.
- Point out areas where types may break if features expand.


__Check Types for 1 File__
Please review this file and:
- Ensure all functions, props, and variables are properly typed with TypeScript.
- Add missing type annotations.
- Replace `any` with more specific types where possible.
- Suggest improvements for stronger type safety.

__After adding a function/new page/component__
Check all React components for type safety:
- Ensure each component has a typed `props` interface.
- Add type definitions for optional vs required props.
- Check children types where applicable.
Review utility functions for type safety:
- Add explicit return types.
- Ensure function parameters are typed correctly.
- Infer generic types if possible.
- Replace `unknown` or `any` with stricter types.

