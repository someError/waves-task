import moment from 'moment'

export const getDaysList = (daysCount = 31) => (
  Array.apply(0, Array(daysCount)).map((_, i) => {
   let strInx = i + 1 + ''

   if (strInx.length < 2) strInx = `0${strInx}`

   return strInx
  })
)

export const getMonthsList = (format = 'MMMM') => (
  Array.apply(0, Array(12)).map((_, i) => moment().month(i).format('MMMM'))
)

export const getYearsList = (start = 1920, end = 2012) => (
  Array(end - start + 1).fill().map((_, i) => start + i + '')
)