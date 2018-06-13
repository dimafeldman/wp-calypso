/** @format */

/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import reducer from '../reducer';
import {
	SIGNUP_COMPLETE_RESET,
	SIGNUP_PROGRESS_ADD_OR_UPDATE,
	SIGNUP_PROGRESS_SET,
} from 'state/action-types';

describe( 'reducer', () => {
	test( 'should update the state', () => {
		expect(
			reducer( [], {
				type: SIGNUP_PROGRESS_SET,
				steps: [ { test: 123 } ],
			} )
		).to.be.eql( [ { test: 123 } ] );
	} );

	test( 'should reset the state', () => {
		expect(
			reducer( [ { test: 123 } ], {
				type: SIGNUP_COMPLETE_RESET,
			} )
		).to.be.eql( [] );
	} );

	describe( 'adding or updating steps', () => {
		test( 'should add a step to the state if it has a unique stepName', () => {
			const initialState = [ { stepName: 'whatever' } ];
			const action = {
				type: SIGNUP_PROGRESS_ADD_OR_UPDATE,
				step: { stepName: 'something' },
			};
			const finalState = [ { stepName: 'whatever' }, { stepName: 'something' } ];
			expect( reducer( initialState, action ) ).to.be.eql( finalState );
		} );
		test( 'should update a step in the state if it has the same stepName', () => {
			const initialState = [ { stepName: 'something', value: 'great' } ];
			const action = {
				type: SIGNUP_PROGRESS_ADD_OR_UPDATE,
				step: { stepName: 'something', anotherValue: 'also great' },
			};
			const finalState = [ { stepName: 'something', value: 'great', anotherValue: 'also great' } ];
			expect( reducer( initialState, action ) ).to.be.eql( finalState );
		} );
	} );
} );
