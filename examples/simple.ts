
import isLatestClosedSession from '../src/is-latest-closed-session'

console.log(isLatestClosedSession(new Date(0), '4H'))
//=> false

console.log(isLatestClosedSession(new Date(0), '1', new Date(61 * 1000)))
//=> true

console.log(isLatestClosedSession(new Date(0), 240))
//=> false

console.log(isLatestClosedSession(1571871598069, '1'))
//=> true
