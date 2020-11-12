// 이름 휴대폰 번호 *로 변환
module.exports = function(strName, hp){
    var namehp = {};
    if (strName.length > 2) {
        var originName = strName.split('');
        originName.forEach(function(name, i) {
        if (i === 0 || i === originName.length - 1) return;
        originName[i] = '*';
        });
        var joinName = originName.join();
        namehp.name = joinName.replace(/,/g, '');
    } else {
        var pattern = /.$/; // 정규식
        namehp.name = strName.replace(pattern, '*');
    }
    namehp.hp = hp.replace(  /(\d{3})(\d{4})(\d{4})/,  "$1****$3"  );

    return namehp;
}