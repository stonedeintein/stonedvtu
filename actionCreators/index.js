import * as actionsTypes from './actionTypes';

export function isLoaded(status) {
    return {
        type: actionsTypes.LOAD_STATUS,
        status
    }
}

export function saveAppData(payload) {
    return {
        type: actionsTypes.SAVE_APP_DATA,
        payload
    }
}

export function saveNewsData(payload) {
    return {
        type: actionsTypes.SAVE_NEWS_DATA,
        payload
    }
}

export function updateLoadStatus(status) {
    return {
        type: actionsTypes.SAVE_NEWS_DATA,
        status
    }
}

export function changeTab(payload) {
    return {
        type: actionsTypes.CHANGE_TAB,
        payload
    }
}

export function changeContentType(payload) {
    return {
        type: actionsTypes.CHANGE_CONTENT_TYPE,
        payload
    }
}