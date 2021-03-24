// 格式化日期
export function formateDate(time) {
    console.log(222)
    if (!time) return ''
    let date = new Date(time)
    date.setDate((date.getDate()-7))
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + (date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours()) + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ':' + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds())
}