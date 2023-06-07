import {atom} from "recoil";

export const squarePricesFilter = atom({
    key: 'squarePricesFilter',
    default: [0, 600],
});

export const propertiesPricesFilter = atom({
    key: 'propertiesPricesFilter',
    default: [0, 1060],
});