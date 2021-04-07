# What is it?

Is a supermarket pricing practice, by the [codekata.com](http://codekata.com/kata/kata01-supermarket-pricing/) description.

The main goal is to practice with the
pricing and various discount programs, how the discounts shown and
calculated within a cart.

Also practicing Vue3 + TS bundle.

See the demo: https://invisiburu.github.io/kata-cart/

## Available discount programs:

Per product:

- 1 + 1 = 1
- 1 + 1 = 1 but for the first occurrence only
- Static (like -10%)
- Progressive (3 items -20%, 6 items -25%)
- three for a dollar (custom price for purchasing dedicated amount)
- 10$ for 1 kilo (pricing for fractional amounts, like 0.25 kilo, 1.5 kilo)

Cart overall:

- Cart -10%
- Cart after 100$ -10%
- Any second good -40%
- Any second cheapest good -40%

Cart overall discounts can be applied by promo codes and on a
configurable disable/enable basis.

## Installation and run

```
npm ci
npm run serve
```
