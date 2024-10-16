import { useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import Header from './header';
import { getTimePeriod } from './helpers/utils';
import Neighborhood from './neighborhood';
import useData from './use_data';
import { theme } from './theme';

const classNames = {
    NEIGHBORHOODS: 'App-Neighborhoods',
    NEIGHBORHOODS_WRAP: 'App-NeighborhoodsWrap',
    FILTER_PERIOD_NOTICE: 'App-FilterPeriodNotice',
};

const AppContainer = styled.div`
    background-color: ${theme.color.background};
    padding: ${theme.size.space16};
    height: 100%;
    min-height: 100vh;

    .${classNames.NEIGHBORHOODS_WRAP} {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        margin: ${theme.size.space16};
        padding: ${theme.size.space8};
        border-radius: ${theme.size.borderRadius};
        gap: ${theme.size.space8};
        border: 2px solid ${theme.color.border};
    }

    .${classNames.NEIGHBORHOODS} {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: ${theme.size.space8};
    }

    .${classNames.FILTER_PERIOD_NOTICE} {
        background: ${theme.color.background};
        color: ${theme.color.text};
        padding: ${theme.size.space4} ${theme.size.space16};
        border-radius: ${theme.size.borderRadius};
        width: fit-content;
    }
`;

// App logic
// 1. The neighborhoods are filtered by current time period
//   - The time period is calculated from the current seconds of the current date
//   - The time period is calculated as current seconds rounded down to the nearest 10, so 0-9 becomes 0, 10-19 becomes 10, etc.
//   - Then, the time period is used to filter the neighborhoods, so when the period is 0, only neighborhoods with value of 0 - 9 are displayed
//   - When the number is 10, only neighborhoods with value of 10 - 19 are displayed, etc.
//   - When the number is 50, neighborhoods with value 50 - 72 are displayed.
// 2. The neighborhoods are optionally filtered by the currently selected symbol (if selected)
// 3. The time period filtering can be toggled on and off

// 4. Opening the popover should stop the time period filtering while the popover is open
function App() {
    const { neighborhoods, isLoading } = useData();
    const [filterByTimePeriod, setFilterByTimePeriod] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [currentSymbolFilter, setCurrentSymbolFilter] = useState(null);

    const currentSeconds = currentDateTime.getSeconds();
    const currentPeriod = Math.floor(currentSeconds / 10) * 10;
    const filterPeriod = getTimePeriod(currentDateTime);

    const maybeFilteredNeighborhoods = currentSymbolFilter
        ? neighborhoods.filter((neighborhood) => neighborhood.type === currentSymbolFilter)
        : neighborhoods;

    const neighborhoodsToShow = filterByTimePeriod
        ? maybeFilteredNeighborhoods.filter((neighborhood) => {
            const { value } = neighborhood;
            switch (currentPeriod) {
                case 0:
                    return value < 10;
                case 10:
                    return value >= 10 && value < 20;
                case 20:
                    return value >= 20 && value < 30;
                case 30:
                    return value >= 30 && value < 40;
                case 40:
                    return value >= 40 && value < 50;
                default:
                    return value >= 50;
            }
        })
        : maybeFilteredNeighborhoods;

    return (
        <AppContainer>
            <Header
                filterByTimePeriod={filterByTimePeriod}
                setFilterByTimePeriod={setFilterByTimePeriod}
                currentDateTime={currentDateTime}
                setCurrentDateTime={setCurrentDateTime}
                currentSymbolFilter={currentSymbolFilter}
                setCurrentSymbolFilter={setCurrentSymbolFilter as Dispatch<SetStateAction<string | null>>}
            />
            {isLoading ? (<div>Processing data</div>) : (
                <main>
                    <div className={classNames.NEIGHBORHOODS_WRAP}>
                        {filterByTimePeriod && <div className={classNames.FILTER_PERIOD_NOTICE}>
                            Filtering by time period {filterPeriod}
                        </div>}
                        <div className={classNames.NEIGHBORHOODS}>
                            {neighborhoodsToShow.map(({ id, type, value, cells }) => <Neighborhood key={id} type={type} value={value} cells={cells} />)}
                        </div>
                    </div>
                </main>
            )}
        </AppContainer>
    );
}

export default App;
