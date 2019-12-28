/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable react/prefer-es6-class */
const React = require('react');
const createReactClass = require('create-react-class');

module.exports.createContext = (defaultContext) => {
  const context = React.createContext([{}, () => {}]);
  const DefaultProvider = context.Provider;

  context.Provider = createReactClass({
    getInitialState: () => ({ inner: defaultContext }),
    render: function () {
      return React.createElement(
        DefaultProvider,
        { value: [this.state.inner, (inner) => this.setState({ inner })], ...this.props }
      );
    },
  });

  return context;
};

module.exports.withContextProviders = (WrappedComponent, contextProviders) => createReactClass({
  render: function () {
    const contextProvidersArray = Array.isArray(contextProviders) ? contextProviders : [contextProviders];
    let InnerElem = React.createElement(WrappedComponent, this.props);

    contextProvidersArray.forEach((ContextElem) => {
      if ('Provider' in ContextElem) {
        InnerElem = React.createElement(ContextElem.Provider, {}, [InnerElem]);
      } else {
        throw new Error('"Context" supplied to providesContext is not an actual context.');
      }
    });

    return InnerElem;
  },
});
