const ClientCheck = {
  isMobile: function () {
    const u = navigator.userAgent
    // android终端
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    // ios终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    return isAndroid || isiOS
  }
}

export default ClientCheck
