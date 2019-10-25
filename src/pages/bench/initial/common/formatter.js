const crop_age_formatter = (row, column, cellValue = '', index) => {
  const map = {
    0: '年',
    1: '月',
    2: '天'
  }

  let tmp = (column ? cellValue || '0' : row || '0')
    .split('-')
    .map((item, i) => (item === '0' ? '' : item + map[i]))
    .join('')
  return tmp || '未知'
}
const null_formatter = (row, column, cellValue = '', index) => {
  return cellValue || '未知'
}

export { crop_age_formatter as cropAgeFormatter, null_formatter as nullFormatter }
