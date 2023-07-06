import { CustomIconComponentProps } from '@ant-design/icons/es/components/Icon';
import { ComponentType, ForwardRefExoticComponent, SVGProps } from 'react';

export type AntdIcon =
    | ComponentType<SVGProps<SVGSVGElement> | CustomIconComponentProps>
    | ForwardRefExoticComponent<CustomIconComponentProps>;