import {AutoComplete, Select, Space, Typography} from 'antd';
import React, {useState} from 'react';
import {OptionItem} from "./../Dropdown/dropdown.types";

interface Props {
    options: OptionItem[];
    value?: string[];
    onSelect?: (option: string) => void;
    multiple?: boolean;
    disabled?: boolean;
    loading?: boolean;
}

export const InputAutoComplete: React.FC<Props> = ({
                                                       options,
                                                       onSelect,
                                                       value,
                                                       multiple = false,
                                                       disabled,
                                                       loading = false,
                                                   }) => {
    console.log(options, "options InputAutoComplete")
    // const [value, setValue] = useState('');
    const [inputOptions, setInputOptions] = useState<OptionItem[]>([]);
    // const [options, setOptions] = useState<{ value: string }[]>([]);

    // const getPanelValue = (searchText: string) =>
    //     !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

    // const onSelect = (data: string) => {
    //     console.log('onSelect', data);
    // };

    const onSearch = (text: string) => {
        console.log(text, "text");
        if(!text || options.some((item) => item.value === text)) {
            setInputOptions(options);
        } else {
            setInputOptions([{value: text, label: text}, ...options])
        }
    }

    // const onChange = (data: string) => {
    //     setValue(data);
    // };
    return (
        <AutoComplete
            // options={options}
            style={{width: 200}}
            onSelect={onSelect}
            onSearch={(text: string) => onSearch(text)}
            filterOption={true}
            placeholder="input here"
        >
            {inputOptions.length > 0
                ? inputOptions.map(option => (
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
        </AutoComplete>
    );
};
