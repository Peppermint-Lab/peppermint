/* tslint:disable: no-object-literal-type-assertion */
import * as React from 'react'; // We will never use default, here only to fix TypeScript warning

var MentionsContext = /*#__PURE__*/React.createContext(null);
export var MentionsContextProvider = MentionsContext.Provider;
export var MentionsContextConsumer = MentionsContext.Consumer;