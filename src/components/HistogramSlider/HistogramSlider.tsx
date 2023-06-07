import Slider from "@kiwicom/orbit-components/lib/Slider";
import React from "react";
import {SetterOrUpdater} from "recoil";
import {calculateCountOf} from "@kiwicom/orbit-components";

const HistogramSlider = ({value, valueSetter, allData, step, maxValue}: {
    value: number[],
    valueSetter: SetterOrUpdater<number[]>,
    allData: number[]
    step: number,
    maxValue: number
}) => {
    const [selectedValues, totalValues] = calculateCountOf(
        allData,
        value.map((x) => x / step),
        0
    );
    return <Slider
        histogramData={allData}
        histogramDescription={`${selectedValues} of ${totalValues}`}
        defaultValue={value}
        ariaLabel={["Minimum price", "Maximum price"]}
        label={`Price`}
        minValue={0}
        step={step}
        maxValue={maxValue}

        valueDescription={`$${value[0]}–$${value[1]}`}
        onChange={(sliderValue) => {
            if (typeof sliderValue === "object") valueSetter(sliderValue);
        }}
    />

}

export default HistogramSlider;