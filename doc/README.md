
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

▸ **isLatestClosedSession**(date: *`Date`*, timeframe: *`string`*, now?: *`Date`*): `boolean`

*Defined in [is-latest-closed-session.ts:21](https://github.com/strong-roots-capital/is-latest-closed-session/blob/1d0bee6/src/is-latest-closed-session.ts#L21)*

Test to determine if a date falls inside the most-recently closed session.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| date | `Date` | - |  Date under test |
| timeframe | `string` | - |  Length of session in Trading View format |
| `Default value` now | `Date` |  utcDate() |  Used as current time when calculating most-recently closed session |

**Returns:** `boolean`
True if `date` falls inside the most-recently closed session from `now`

___

