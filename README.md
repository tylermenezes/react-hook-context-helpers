# react-hook-context-helpers

This library helps you use `withContext` the same way as you'd use `withState` in React.

## Creating a Context

Use the implementation of `createContext` from `react-hook-context-helpers`, instead of the native one:

```es6
import { createContext } from 'react-hook-context-helpers';
export const DarkModeContext = createContext(false);
```

You'll also need to register a context provider, but `react-hook-context-helpers` will automatically take care of
setting its `value` for you:

```es6
import { DarkModeContext } from `./yourcontext';
export default () => (
  <DarkModeContext.Provider>
    <App />
  </DarkModeContext.Provider>
);
```

Later, in other components which are children of a provider, you can use the built-in `useContext` (from `react`) as
follows:

```es6
const [darkMode, setDarkMode] = useContext(DarkModeContext);
return (
  <CheckBox
    checked={darkMode}
    onChange={(e) => setDarkMode(e.target.checked)}
);
```

(This is the same syntax you'd use for the `useState` hook!)

## Providing Lots of Context

If you have a lot of context, you can use the `withContextProviders` HOC to wrap them all:

```es6
import { withContextProviders } from 'react-hook-context-helpers';
import { DarkModeContext } from `./yourcontext';

export default withContextProviders(App, [DarkModeContext]);
```
