import { subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'

export function isLastMonth(date) {

   let today = Date.now()
   let lastMonthDate = subMonths(today, 1);

   let firstDayOfLastMonth = startOfMonth(lastMonthDate)
   let lastDayOfLastMonth = endOfMonth(lastMonthDate)

   return isWithinInterval(new Date(date), { start: firstDayOfLastMonth, end: lastDayOfLastMonth })

}
