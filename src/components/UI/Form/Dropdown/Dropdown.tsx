import {Select, Space, Typography} from 'antd';
import React from 'react';
import {OptionItem} from "./dropdown.types";

interface Props {
    options: OptionItem[];
    value?: string[];
    onChange?: (options: string[]) => void;
    multiple?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

export const Dropdown: React.FC<Props> = ({
                                              options,
                                              onChange,
                                              value,
                                              multiple = false,
                                              disabled,
                                              loading = false,
                                          }) => {
    return (
        <Select
            placeholder="Please Select"
            value={value}
            onChange={onChange}
            mode={multiple ? 'multiple' : 'tags'}
            optionFilterProp="label"
            maxTagCount="responsive"
            showArrow
            disabled={disabled}
            virtual={false}
            loading={loading}
            showSearch={true}
        >
            {options.length > 0
                ? options.map(option => (
                    <Select.Option
                        key={option.value}
                        value={option.value}
                        label={option.label}
                    >
                        <Space>
                            <Typography.Text>{option?.label}</Typography.Text>
                        </Space>
                    </Select.Option>
                ))
                : []}
        </Select>
    );
};
