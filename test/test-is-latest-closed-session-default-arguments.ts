import test from 'ava'
import getRecentSessions from '@strong-roots-capital/get-recent-sessions'

/**
 * Library under test
 */

import isLatestClosedSession from '../src/is-latest-closed-session'

test('isLatestClosedSession calculates expected result with default arguments', t => {
    const timeframe = '4H'
    const recentSessions = getRecentSessions(timeframe)
    const [currentlyOpenSessionOpen, latestClosedSessionOpen, ..._] = recentSessions.reverse()
    t.true(isLatestClosedSession(new Date(latestClosedSessionOpen), timeframe))
})
