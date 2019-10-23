import test from 'ava'
import * as moment from 'moment'
import { utcDate } from '@hamroctopus/utc-date'
import getRecentSessions from '@strong-roots-capital/get-recent-sessions'
import listTradingviewFormats from '@strong-roots-capital/list-tradingview-formats'

/**
 * Library under test
 */

import isLatestClosedSession from '../src/is-latest-closed-session'

/*********************************************************************
 * Macro definitions
 ********************************************************************/

const rejectsInvalidTradingviewFormats = (t: any, timeframe: string) => {
    const error = t.throws(() => {
        isLatestClosedSession(new Date(), timeframe)
    }, Error)
    t.is(error.name, 'ArgumentError')
}
rejectsInvalidTradingviewFormats.title = (_ = '', timeframe: string) => `should reject timeframe as invalid Trading View format: ${timeframe}`

const equalToCurrentlyOpenSessionOpenShouldFail = (t: any, date: Date, timeframe: string, from: Date = utcDate()) => t.false(isLatestClosedSession(date, timeframe, from))
equalToCurrentlyOpenSessionOpenShouldFail.title = (_ = '', date: Date, timeframe: string, from: Date = utcDate()) => `${date.toISOString()} is not inside most-recently closed ${timeframe} session from ${from.toISOString()} (equalToCurrentlyOpenSessionOpenShouldFail)`

const insideCurrentlyOpenSessionOpenShouldFail = (t: any, date: Date, timeframe: string, from: Date = utcDate()) => t.false(isLatestClosedSession(date, timeframe, from))
insideCurrentlyOpenSessionOpenShouldFail.title = (_ = '', date: Date, timeframe: string, from: Date = utcDate()) => `${date.toISOString()} is not inside most-recently closed ${timeframe} session from ${from.toISOString()} (insideCurrentlyOpenSessionOpenShouldFail)`

const oneSecondBeforeCurrentlyOpenSessionOpenShouldPass = (t: any, date: Date, timeframe: string, from: Date = utcDate()) => t.true(isLatestClosedSession(date, timeframe, from))
oneSecondBeforeCurrentlyOpenSessionOpenShouldPass.title = (_ = '', date: Date, timeframe: string, from: Date = utcDate()) => `${date.toISOString()} is inside most-recently closed ${timeframe} session from ${from.toISOString()} (oneSecondBeforeCurrentlyOpenSessionOpenShouldPass)`

const equalToMostRecentlyClosedSessionOpenShouldPass = (t: any, date: Date, timeframe: string, from: Date = utcDate()) => t.true(isLatestClosedSession(date, timeframe, from))
equalToMostRecentlyClosedSessionOpenShouldPass.title = (_ = '', date: Date, timeframe: string, from: Date = utcDate()) => `${date.toISOString()} is inside most-recently closed ${timeframe} session from ${from.toISOString()} (equalToMostRecentlyClosedSessionOpenShouldPass)`

const betweenMostRecentlyClosedSessionOpenAndOneSecondBeforeSameSessionCloseShouldPass = (t: any, date: Date, timeframe: string, from: Date = utcDate()) => t.true(isLatestClosedSession(date, timeframe, from))
betweenMostRecentlyClosedSessionOpenAndOneSecondBeforeSameSessionCloseShouldPass.title = (_ = '', date: Date, timeframe: string, from: Date = utcDate()) => `${date.toISOString()} is inside most-recently closed ${timeframe} session from ${from.toISOString()} (betweenMostRecentlyClosedSessionOpenAndOneSecondBeforeSameSessionCloseShouldPass)`

const oneSecondBeforeMostRecentlyClosedSessionOpenShouldFail = (t: any, date: Date, timeframe: string, from: Date = utcDate()) => t.false(isLatestClosedSession(date, timeframe, from))
oneSecondBeforeMostRecentlyClosedSessionOpenShouldFail.title = (_ = '', date: Date, timeframe: string, from: Date = utcDate()) => `${date.toISOString()} is not inside most-recently closed ${timeframe} session from ${from.toISOString()} (oneSecondBeforeMostRecentlyClosedSessionOpenShouldFail)`

const beforeMostRecentlyClosedSessionOpenShouldFail = (t: any, date: Date, timeframe: string, from: Date = utcDate()) => t.false(isLatestClosedSession(date, timeframe, from))
beforeMostRecentlyClosedSessionOpenShouldFail.title = (_ = '', date: Date, timeframe: string, from: Date = utcDate()) => `${date.toISOString()} is not inside most-recently closed ${timeframe} session from ${from.toISOString()} (beforeMostRecentlyClosedSessionOpenShouldFail)`

/*********************************************************************
 * Test definitions
 ********************************************************************/

const invalidTimeframes = [ 'Y', '!!', '.', 'bumble', '~<>']
invalidTimeframes.forEach((timeframe: string) => test(rejectsInvalidTradingviewFormats, timeframe))

for (const timeframe of listTradingviewFormats()) {
    const now = utcDate()
    const recentSessions = getRecentSessions(timeframe, now)
    const [currentlyOpenSessionOpen, latestClosedSessionOpen] = recentSessions.reverse()
    test(equalToCurrentlyOpenSessionOpenShouldFail, new Date(currentlyOpenSessionOpen), timeframe, now)
}

for (const timeframe of listTradingviewFormats()) {
    const now = utcDate()
    const recentSessions = getRecentSessions(timeframe, now)
    const [currentlyOpenSessionOpen, latestClosedSessionOpen] = recentSessions.reverse()
    const insideCurrentlyOpenSession = moment.utc(currentlyOpenSessionOpen).add(1, 'second').toDate()
    test(insideCurrentlyOpenSessionOpenShouldFail, insideCurrentlyOpenSession, timeframe, now)
}

for (const timeframe of listTradingviewFormats()) {
    const now = utcDate()
    const recentSessions = getRecentSessions(timeframe, now)
    const [currentlyOpenSessionOpen, latestClosedSessionOpen] = recentSessions.reverse()
    const oneSecondBeforeCurrentlyOpenSessionOpen = moment.utc(currentlyOpenSessionOpen).subtract(1, 'second').toDate()
    test(oneSecondBeforeCurrentlyOpenSessionOpenShouldPass, oneSecondBeforeCurrentlyOpenSessionOpen, timeframe, now)
}

for (const timeframe of listTradingviewFormats()) {
    const now = utcDate()
    const recentSessions = getRecentSessions(timeframe, now)
    const [currentlyOpenSessionOpen, latestClosedSessionOpen] = recentSessions.reverse()
    test(equalToMostRecentlyClosedSessionOpenShouldPass, new Date(latestClosedSessionOpen), timeframe, now)
}

for (const timeframe of listTradingviewFormats()) {
    const now = utcDate()
    const recentSessions = getRecentSessions(timeframe, now)
    const [currentlyOpenSessionOpen, latestClosedSessionOpen] = recentSessions.reverse()
    const beforeMostRecentlyClosedSessionClose = moment.utc(latestClosedSessionOpen).add(1, 'second').toDate()
    test(betweenMostRecentlyClosedSessionOpenAndOneSecondBeforeSameSessionCloseShouldPass, beforeMostRecentlyClosedSessionClose, timeframe, now)
}

for (const timeframe of listTradingviewFormats()) {
    const now = utcDate()
    const recentSessions = getRecentSessions(timeframe, now)
    const [currentlyOpenSessionOpen, latestClosedSessionOpen] = recentSessions.reverse()
    const beforeMostRecentlyClosedSessionOpen = moment.utc(latestClosedSessionOpen).subtract(1, 'second').toDate()
    test(oneSecondBeforeMostRecentlyClosedSessionOpenShouldFail, beforeMostRecentlyClosedSessionOpen, timeframe, now)
}

for (const timeframe of listTradingviewFormats()) {
    const now = utcDate()
    test(beforeMostRecentlyClosedSessionOpenShouldFail, new Date(0), timeframe, now)
}
