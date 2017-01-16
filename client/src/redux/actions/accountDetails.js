import { createAction } from 'redux-actions';
import ApiUtils from '../../utils/ApiUtils';

export const FETCH_ACCOUNTDETAILS_REQUESTED = ' ACCOUNTDETAILS_REQUESTED';
export const FETCH_ACCOUNTDETAILS_SUCCESS = ' ACCOUNTDETAILS_SUCCESS';
export const FETCH_ACCOUNTDETAILS_FAILURE = ' ACCOUNTDETAILS_FAILURE';
export const fetchAccountDetailsRequested = createAction(FETCH_ACCOUNTDETAILS_REQUESTED);
export const fetchAccountDetailsSuccess = createAction(FETCH_ACCOUNTDETAILS_SUCCESS);
export const fetchAccountDetailsFailure = createAction(FETCH_ACCOUNTDETAILS_FAILURE);
export function getAccountDetails(account_number) {
    return dispatch => {
        dispatch(fetchAccountDetailsRequested());

        let url = 'accountDetails';
        let settings = {
            method: 'GET',
            headers: new Headers({'account_number': account_number}),
        };

        return ApiUtils.fetchResponse(url, settings, dispatch)
            .then(json => {
                return dispatch(fetchAccountDetailsSuccess(json));
            })
            .catch(err => {
                return dispatch(fetchAccountDetailsFailure(err));
            });
    };
}