/**
 * is-latest-closed-session
 * Test to determine if a date falls inside the most-recently closed session
 */

import ow from 'ow'
import moment from 'moment'
import { utcDate } from '@hamroctopus/utc-date'
import getRecentSessions from '@strong-roots-capital/get-recent-sessions'
import { inTradingviewFormat } from '@strong-roots-capital/is-tradingview-format'

/**
 * Test to determine if a date falls inside the most-recently closed
 * session.
 *
 * @param date - Date under test
 * @param timeframe - Length of session in Trading View format
 * @param now - Used as current time when calculating most-recently closed session
 * @returns True if `date` falls inside the most-recently closed session from `now`
 */
export default function isLatestClosedSession(date: Date, timeframe: string, now: Date = utcDate()): boolean {

    ow(timeframe, ow.string.is(inTradingviewFormat))

    const time = moment.utc(date)

    const recentSessions = getRecentSessions(timeframe, now)
    const [currentlyOpenSessionOpen, mostRecentlyClosedSessionOpen, ..._] = recentSessions.reverse()

    return time.isSameOrAfter(mostRecentlyClosedSessionOpen) && time.isBefore(currentlyOpenSessionOpen)
}
