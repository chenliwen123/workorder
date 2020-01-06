export default {
  formatDate(time){
    let date = null
    if ((time + '').length === 10) {
      date = new Date(time * 1000)
    } else {
      date = new Date(time)
    }
    const Y = date.getFullYear()
    const M = date.getMonth() + 1
    const D = date.getDate()
    const H = date.getHours()
    const MM = date.getMinutes()
    const S = date.getSeconds()
    return `${Y}-${(M > 9 ? M : ('0' + M))}-${(D > 9 ? D : ('0' + D))} ${(H > 9 ? H : ('0' + H))}:${(MM > 9 ? MM : ('0' + MM))}:${(S > 9 ? S : ('0' + S))}`
  }
}
