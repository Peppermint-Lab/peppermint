import * as React from 'react';
import canUseDom from "rc-util/es/Dom/canUseDom";
export var useLayoutEffect = canUseDom() ? React.useLayoutEffect : React.useEffect;