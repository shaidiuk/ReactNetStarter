import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as CounterStore from '../store/Counter';

type CounterProps =
    CounterStore.CounterState &
    typeof CounterStore.actionCreators;

function Counter({ count, increment }: CounterProps) {
    return (
        <>
            <h1>Counter</h1>

            <p>This is a simple example of a React component.</p>

            <p aria-live="polite">Current count: <strong>{count}</strong></p>

            <button type="button"
                className="btn btn-primary btn-lg"
                onClick={increment}>
                Increment
            </button>
        </>
    )};

export default connect(
    (state: ApplicationState) => state.counter,
    CounterStore.actionCreators
)(Counter);
