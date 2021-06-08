import * as React from 'react';
import { ModalStaticFunctions } from '../confirm';
export default function useModal(): [Omit<ModalStaticFunctions, 'warn'>, React.ReactElement];
