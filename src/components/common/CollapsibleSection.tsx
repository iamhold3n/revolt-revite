import Details from "../ui/Details";
import { State, store } from "../../redux";
import { Action } from "../../redux/reducers";
import { Children } from "../../types/Preact";
import { ChevronDown } from "@styled-icons/boxicons-regular";

interface Props {
    id: string;
    defaultValue: boolean;

    sticky?: boolean;
    large?: boolean;

    summary: Children;
    children: Children;
}

export default function CollapsibleSection({ id, defaultValue, summary, children, ...detailsProps }: Props) {
    const state: State = store.getState();

    function setState(state: boolean) {
        if (state === defaultValue) {
            store.dispatch({
                type: 'SECTION_TOGGLE_UNSET',
                id
            } as Action);
        } else {
            store.dispatch({
                type: 'SECTION_TOGGLE_SET',
                id,
                state
            } as Action);
        }
    }

    return (
        <Details
            open={state.sectionToggle[id] ?? defaultValue}
            onToggle={e => setState(e.currentTarget.open)}
            {...detailsProps}>
            <summary>
                <ChevronDown size={20} />
                { summary }
                {/*<Overline type="subtle" className="overline">*/}
                    {/*<div className="title">*/}
                    {/*</div>*/}
                {/*</Overline>*/}
            </summary>
            { children }
        </Details>
    )
}
