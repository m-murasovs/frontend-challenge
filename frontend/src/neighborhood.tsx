import styled from 'styled-components';

import { symbolToIcon } from './helpers/utils';
import { theme } from './theme';

type Cells = Array<Array<string | number>>;

export type NeighborhoodType = {
    id: string;
    type: string;
    value: number;
    cells: Cells;
}

const classNames = {
    CONTAINER: 'Neighborhood',
    ICON: 'Neighborhood-Icon',
};

const NeighborhoodContainer = styled.button`
    width: 70px;
    border: 1px solid ${theme.color.border};
    border-radius: ${theme.size.borderRadius};
    padding: ${theme.size.space4};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${theme.color.background};
    color: ${theme.color.text};

    .${classNames.ICON} {
        width: 20px;
        height: 20px;
        margin-right: ${theme.size.space8};
        fill: ${(props) => props.color};
        fill-opacity: 1;
    }
`;

// The component should display the value and the symbol of the neighborhood
// The symbol is displayed as an icon from the `symbolToIcon` map
// The icon representing the symbol should be colored based on the value
// - The value is a number between 0 and 72
// - The color should be calculated as follows:
//   - The value is converted to a percentage (0-100)
//   - The percentage is converted to a color value, where 0 is white and 100 is green, the values in between are shades of green
// The component displaying the icon and value should be a button

// The component should also display a popover with the neighborhood cells
// The popover should be displayed when the user clicks on the neighborhood (won't do)
// The popover should be closed when the user clicks on the neighborhood again (won't do)
// Optionally the popover can be closed when the user clicks outside of the popover
function Neighborhood({
    type,
    value,
    // cells, // not used yet - use when implementing tooltip
}: { type: string; value: number; cells: Cells }) {

    const Icon = symbolToIcon[type];

    const colorPercent = Math.round((value / 72) * 100);
    const color = `rgb(138, ${255 - colorPercent}, 138)`;

    return (
        <NeighborhoodContainer
            className={classNames.CONTAINER}
            onClick={() => console.log('hi')} // Open popover here
            color={color}
        >
            <Icon className={classNames.ICON} />
            <div>{value}</div>
        </NeighborhoodContainer>
    );
}

export default Neighborhood;
