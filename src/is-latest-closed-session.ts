/**
 * is-latest-closed-session
 * Test to determine if a date falls inside the most-recently closed session
 */

import ow from 'ow'
import moment from 'moment'
import is from '@sindresorhus/is'
import session from 'market-session'
import { utcDate } from '@hamroctopus/utc-date'
import getRecentSessions from '@strong-roots-capital/get-recent-sessions'
import { inTradingviewFormat } from '@strong-roots-capital/is-tradingview-format'

/**
 * Test to determine if a date falls inside the most-recently closed
 * session.
 *
 * @param dDate - Date under test
 * @param sTimeframe - Length of session in Trading View format
 * @param now - Used as current time when calculating most-recently closed session
 * @returns True if `date` falls inside the most-recently closed session from `now`
 */
export default function isLatestClosedSession(
    date: Date | number,
    timeframe: string | number,
    now: Date = utcDate()
): boolean {

    const dDate = is.date(date) ? date : new Date(date)
    const sTimeframe = is.string(timeframe) ? timeframe : session.toString(timeframe)

    ow(sTimeframe, ow.string.is(inTradingviewFormat))

    const time = moment.utc(dDate)

    const recentSessions = getRecentSessions(sTimeframe, now)
    const [currentlyOpenSessionOpen, mostRecentlyClosedSessionOpen] = recentSessions.reverse()

    return time.isSameOrAfter(mostRecentlyClosedSessionOpen) && time.isBefore(currentlyOpenSessionOpen)
}
