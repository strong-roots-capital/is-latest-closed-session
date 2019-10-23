
import test from 'ava'
import getRecentSessions from '@strong-roots-capital/get-recent-sessions'

/**
 * Library under test
 */

import isLatestClosedSession from '../src/is-latest-closed-session'

test('isLatestClosedSession calculates expected result with numerical timeframe representation', t => {
    const timeframe = 240
    const recentSessions = getRecentSessions('4H')
    const [_, latestClosedSessionOpen] = recentSessions.reverse()
    t.true(isLatestClosedSession(new Date(latestClosedSessionOpen), timeframe))
})

test('isLatestClosedSession calculates expected result with numerical session timestamp', t => {
    const timeframe = '4H'
    const recentSessions = getRecentSessions(timeframe)
    const [_, latestClosedSessionOpen] = recentSessions.reverse()
    t.true(isLatestClosedSession(latestClosedSessionOpen, timeframe))
})

test('isLatestClosedSession calculates expected result with numerical session timestamp and timeframe representation', t => {
    const timeframe = 240
    const recentSessions = getRecentSessions('4H')
    const [_, latestClosedSessionOpen] = recentSessions.reverse()
    t.true(isLatestClosedSession(latestClosedSessionOpen, timeframe))
})
