import * as React from 'react';
import { FormInstance } from './interface';
import Field from './Field';
import List from './List';
import useForm from './useForm';
import { FormProps } from './Form';
import { FormProvider } from './FormContext';
declare const InternalForm: <Values = any>(props: FormProps<Values> & {
    children?: React.ReactNode;
} & {
    ref?: React.Ref<FormInstance<Values>>;
}) => React.ReactElement;
declare type InternalForm = typeof InternalForm;
interface RefForm extends InternalForm {
    FormProvider: typeof FormProvider;
    Field: typeof Field;
    List: typeof List;
    useForm: typeof useForm;
}
declare const RefForm: RefForm;
export { FormInstance, Field, List, useForm, FormProvider, FormProps };
export default RefForm;
