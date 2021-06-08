import * as React from 'react';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import { RangePickerProps } from '.';
export default function generateRangePicker<DateType>(generateConfig: GenerateConfig<DateType>): React.ComponentClass<RangePickerProps<DateType>>;
