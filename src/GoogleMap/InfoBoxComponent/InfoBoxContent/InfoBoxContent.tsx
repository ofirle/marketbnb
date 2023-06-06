import {FullInfoSquare} from "../../interfaces";
import InfoBoxContentRow from "./InfoBoxContentRow";

const InfoBoxContent = ({square}: { square: FullInfoSquare | null }) => {
    if (square === null) return <></>;
    return <>
        <InfoBoxContentRow label={'Count'} value={square.properties_count ?? 0}/>
        <InfoBoxContentRow label={'Occupancy'} value={`${square.occupancy ?? '-'}%`}/>
        <InfoBoxContentRow label={'Avg. Per Night'} value={square.cost_per_night ?? '-'}/>
    </>

};

export default InfoBoxContent;