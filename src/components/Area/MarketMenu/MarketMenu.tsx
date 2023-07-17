import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Select, Space} from "antd";
import styles from './MarketMenu.module.css'
import CustomButton from "../../UI/Button/CustomButton";
import FloatMenu from "../FloatMenu";
import useFilterRegion from "./useFilterRegions";
import useAxios from "../../../hooks/useAxios";
import axios from './../../../apis/backend';
import {PlusOutlined} from "@ant-design/icons";
import {ModalGeographicalEntity} from "./ModalGeographicalEntity";
import {GeographicalEntity} from "./types";
import {CountryForm} from "./CountryForm/CountryForm";
import {MarketForm} from "./MarketForm/MarketForm";
import {SubMarketForm} from "./SubMarketForm/SubMarketForm";

const MarketMenu = ({onRegionChanged}: { onRegionChanged: (region: any) => void }) => {
    const {response: regions, error: errorRegions, loading: regionsLoading, axiosFetch: regionsFetch} = useAxios();
    const {response: regionsSearch, axiosFetch: regionsSearchFetch} = useAxios();
    const [openCreateCountryEntity, setOpenCreateCountryEntity] = useState(false);
    const [openCreateMarketEntity, setOpenCreateMarketEntity] = useState(false);
    const [openCreateSubMarketEntity, setOpenCreateSubMarketEntity] = useState(false);
    const [showDisplayRegionButton, setShowDisplayRegionButton] = useState(false);
    const [modalContent, setModalContent] = useState<{ title: string }>({title: ''});
    const {
        fetchCountries,
        countriesOptions,
        marketOptions,
        subMarketOptions,
        countrySelected,
        marketSelected,
        subMarketSelected,
        setCountrySelected,
        setMarketSelected,
        setSubMarketSelected,
        countryLoading,
        marketLoading,
        subMarketLoading
    } = useFilterRegion()

    useEffect(() => {
        regionsSearchFetch({
            axiosInstance: axios,
            url: `/regions`,
            method: "get",
            requestConfig: {
                params: {
                    strict: false,
                }
            }
        })
    }, [])

    useEffect(() => {
        console.log({marketSelected, subMarketSelected, regionsSearch})
        if (!Array.isArray(regionsSearch)) return;
        console.log(regionsSearch, "regionsSearch")
        const matchRegions: any[] = regionsSearch.filter((item: {
            marketId: number | null,
            subMarketId: number | null
        }) => {
            if (marketSelected && !subMarketSelected) {
                return item.marketId === marketSelected;
            }
            if (subMarketSelected) {
                return item.marketId === marketSelected && item.subMarketId === subMarketSelected;
            }
        })
        if(matchRegions.length === 0) {
            setShowDisplayRegionButton(false);
        } else {
            setShowDisplayRegionButton(true);
        }
    }, [marketSelected, subMarketSelected])

    const onClickRegionSelected = () => {
        if (!marketSelected && !subMarketSelected) throw new Error('must select market or submarket');
        regionsFetch({
            axiosInstance: axios,
            url: `/regions`,
            method: "get",
            requestConfig: {
                params: {
                    strict: true,
                    marketId: marketSelected,
                    subMarketId: subMarketSelected,
                }
            }
        })
    }

    useEffect(() => {
        if (regions.length > 0) {
            onRegionChanged(regions[0]);
        }
    }, [regions])

    // const onCreateEntityClicked = (entityType: GeographicalEntity) => {
    //     let title = '';
    //     switch (entityType) {
    //         case GeographicalEntity.Country: title = 'Country'; break;
    //         case GeographicalEntity.Market: title = 'Market'; break;
    //         case GeographicalEntity.SubMarket: title = 'Sub Market'; break;
    //     }
    //     setModalContent({title: `Create ${title}`});
    //     setOpenCreateGeographicalEntity(true);
    // }

    const onSuccessCountryEntity = () => {
        fetchCountries();
        setOpenCreateCountryEntity(false);
    }

    const onSuccessMarketEntity = () => {
        // refetchCountries();
        setOpenCreateMarketEntity(false);
    }

    const onSuccessSubMarketEntity = () => {
        // refetchCountries();
        setOpenCreateSubMarketEntity(false);
    }

    return (
        <>
            <ModalGeographicalEntity title={'Creat Country'} open={openCreateCountryEntity}
                                     onClose={() => setOpenCreateCountryEntity(false)}>
                <CountryForm onSuccess={onSuccessCountryEntity}/>
            </ModalGeographicalEntity>
            <ModalGeographicalEntity title={'Creat Market'} open={openCreateMarketEntity}
                                     onClose={() => setOpenCreateMarketEntity(false)}>
                <MarketForm onSuccess={onSuccessMarketEntity}/>
            </ModalGeographicalEntity>
            <ModalGeographicalEntity title={'Creat Sub Market'} open={openCreateSubMarketEntity}
                                     onClose={() => setOpenCreateSubMarketEntity(false)}>
                <SubMarketForm onSuccess={onSuccessSubMarketEntity}/>
            </ModalGeographicalEntity>
            <FloatMenu title={'Market Menu'} topStyle={140}>
                <Row style={{marginTop: 16}}>
                    <Col span={24}>
                        <Space direction={'vertical'} style={{width: '100%'}} size={"large"}>
                            <Space direction={'horizontal'}>
                                <Select options={countriesOptions} value={countrySelected}
                                        className={styles.marketMenuSelect} placeholder={'Select Country'}
                                        onChange={(selectedValue) => setCountrySelected(selectedValue)}
                                        loading={countryLoading} style={{width: 300}}/>
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>} size={'middle'}
                                        onClick={() => setOpenCreateCountryEntity(true)}/>
                            </Space>
                            <Space direction={'horizontal'}>

                                <Select options={marketOptions} value={marketSelected}
                                        className={styles.marketMenuSelect} placeholder={'Select Market'}
                                        onChange={(selectedValue) => setMarketSelected(selectedValue)}
                                        disabled={!countrySelected} loading={marketLoading} style={{width: 300}}/>
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>} size={'middle'}
                                        onClick={() => setOpenCreateMarketEntity(true)}/>

                            </Space>

                            <Space direction={'horizontal'}>
                                <Select options={subMarketOptions} value={subMarketSelected}
                                        onChange={(selectedValue) => setSubMarketSelected(selectedValue)}
                                        className={styles.marketMenuSelect} placeholder={'Select Sub Market'}
                                        disabled={!countrySelected || !marketSelected} loading={subMarketLoading}
                                        style={{width: 300}}/>
                                <Button type="primary" shape="circle" icon={<PlusOutlined/>} size={'middle'}
                                        onClick={() => setOpenCreateSubMarketEntity(true)}/>
                            </Space>
                        </Space>
                    </Col>
                </Row>
                <Row style={{marginTop: 24}} justify="space-between">
                    <Col>
                        <CustomButton title={'Add New'} onClick={() => console.log('Add new Region Clicked')}/>
                    </Col>
                    <Col>
                        <CustomButton title={'Lets Go!'} onClick={() => onClickRegionSelected()}
                                      type={'ghost'} disabled={!showDisplayRegionButton}/>
                    </Col>
                </Row>

            </FloatMenu>
        </>
    );
}

export default MarketMenu;



