
is-latest-closed-session [![Build status](https://travis-ci.org/strong-roots-capital/is-latest-closed-session.svg?branch=master)](https://travis-ci.org/strong-roots-capital/is-latest-closed-session) [![npm version](https://img.shields.io/npm/v/@strong-roots-capital/is-latest-closed-session.svg)](https://npmjs.org/package/@strong-roots-capital/is-latest-closed-session) [![codecov](https://codecov.io/gh/strong-roots-capital/is-latest-closed-session/branch/master/graph/badge.svg)](https://codecov.io/gh/strong-roots-capital/is-latest-closed-session)
=======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

> Test to determine if a date falls inside the most-recently closed session

Install
-------

```shell
npm install @strong-roots-capital/is-latest-closed-session
```

Use
---

```typescript
import isLatestClosedSession from '@strong-roots-capital/is-latest-closed-session'

isLatestClosedSession(new Date(0), '4H')
//=> false

isLatestClosedSession(new Date(0), '1', new Date(61 * 1000))
//=> true

isLatestClosedSession(new Date(0), 240)
//=>false

isLatestClosedSession(1571871598069, '1')
//=> true
```

Related
-------

*   [is-tradingview-format](https://github.com/strong-roots-capital/is-tradingview-format)
*   [is-open-session](https://github.com/strong-roots-capital/is-open-session)
*   [get-recent-sessions](https://github.com/strong-roots-capital/get-recent-sessions)

## Index

### Functions

* [isLatestClosedSession](#islatestclosedsession)

---

## Functions

<a id="islatestclosedsession"></a>

###  isLatestClosedSession

▸ **isLatestClosedSession**(date: *`Date` \| `number`*, timeframe: *`string` \| `number`*, now?: *`Date`*): `boolean`

*Defined in [is-latest-closed-session.ts:23](https://github.com/strong-roots-capital/is-latest-closed-session/blob/f105150/src/is-latest-closed-session.ts#L23)*

Test to determine if a date falls inside the most-recently closed session.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| date | `Date` \| `number` | - |
| timeframe | `string` \| `number` | - |
| `Default value` now | `Date` |  utcDate() |  Used as current time when calculating most-recently closed session |

**Returns:** `boolean`
True if `date` falls inside the most-recently closed session from `now`

___

