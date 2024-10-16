import { useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import { SYMBOLS } from './helpers/generate_input_data';
import { dateToString, symbolToIcon } from './helpers/utils';
import { ClassNames } from './types';
import { theme } from './theme';

const classNames: ClassNames = {
    CONTAINER: 'Header',
    LEFT_WRAP: 'Header-LeftWrap',
    TIME: 'Header-Time',
    BUTTONS: 'Header-Buttons',
    BUTTON: 'Header-Button',
    BUTTON_ICON: 'Header-Button-Icon',
    FILTER_WRAP: 'Header-FilterWrap',
};

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: ${theme.size.space16};
    padding: ${theme.size.space8};
    border-radius: ${theme.size.borderRadius};
    background-color: ${theme.color.background};
    color: ${theme.color.text};
    border: 2px solid ${theme.color.border};

    .${classNames.LEFT_WRAP} {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: ${theme.size.space8};
    }

    .${classNames.BUTTONS} {
        display: flex;
    }

    .${classNames.BUTTON} {
        cursor: pointer;
        background-color: ${theme.color.buttonBackground};
        border: solid 1px ${theme.color.border};
        padding: ${theme.size.space2};
        display: flex;
        justify-content: center;
        align-items: center;

        &._selected {
            border: 1px solid ${theme.color.border};
            background-color: ${theme.color.buttonActive};
        }

        .${classNames.BUTTON_ICON} {
            width: 20px;
            height: 20px;
            fill: ${theme.color.buttonIcon};
            fill-opacity: 1;
        }

        &:first-child {
            border-bottom-left-radius: ${theme.size.borderRadius};
            border-top-left-radius: ${theme.size.borderRadius};
        }

        &:last-child {
            border-bottom-right-radius: ${theme.size.borderRadius};
            border-top-right-radius: ${theme.size.borderRadius};
        }
    }

    .${classNames.FILTER_WRAP} {
        input {
            margin-right: ${theme.size.space4};
            border: none;
        }
    }
`;

type HeaderProps = {
    filterByTimePeriod: boolean;
    setFilterByTimePeriod: (filter: boolean) => void;
    currentDateTime: Date;
    setCurrentDateTime: (date: Date) => void;
    currentSymbolFilter: string | null;
    setCurrentSymbolFilter: Dispatch<SetStateAction<string | null>>;
}

function Header({
    filterByTimePeriod,
    setFilterByTimePeriod,
    currentDateTime,
    setCurrentDateTime,
    currentSymbolFilter,
    setCurrentSymbolFilter,
}: HeaderProps) {
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [currentDateTime, setCurrentDateTime]);

    return (
        <HeaderContainer className={classNames.HEADER}>
            <div className={classNames.LEFT_WRAP}>
                <div className={classNames.BUTTONS}>
                    {SYMBOLS.map((symbol) => {
                        const Icon = symbolToIcon[symbol];
                        const isSelected = currentSymbolFilter === symbol;

                        return <button
                            type="button"
                            key={symbol}
                            onClick={() => setCurrentSymbolFilter(currentSymbolFilter === symbol ? null : symbol)}
                            className={`${classNames.BUTTON} ${isSelected && '_selected'}`}
                        >
                            <Icon className={classNames.BUTTON_ICON} />
                        </button>;
                    })}
                </div>
                <div className={classNames.FILTER_WRAP}>
                    <input
                        type="checkbox"
                        checked={filterByTimePeriod}
                        onChange={() => setFilterByTimePeriod(!filterByTimePeriod)}
                    />
                    Filter by time period
                </div>
            </div>
            <div className={classNames.TIME}>{dateToString(currentDateTime)}</div>
        </HeaderContainer>
    );
}

export default Header;
