/* =====================================================
 * anyidAdaptor - 정부 통합인증 SDK 연계 어댑터
 * (head.html에서 이동)
 * ===================================================== */
var anyidAdaptor = anyidAdaptor || {};

/*이용기관 수정 영역 Start*/
anyidAdaptor.orgLogin = function(data){
    if (data.ssob){
        anyidAdaptor.goAnyIdLogin(data);
    }else{
        anyidAdaptor.goLogin();
    }
}
/*이용기관 수정 영역 End*/

/*이용기관 문구수정 영역 Start*/
anyidAdaptor.JoinConfirm = function(portalJoinUri, memberData){
    if(!confirm('Any-ID 사용자등록 하시겠습니까?')) {
        anyidAdaptor.orgLogin(anyidAdaptor.certData);
        return;
    }else{
        anyidAdaptor.receiveAnyIdJoin(portalJoinUri, memberData);
    }
}
/*이용기관 문구수정 영역 End*/

anyidAdaptor.portalJoinUri = "null";
anyidAdaptor.certData = null;
anyidAdaptor.ssoByPass = "0";
anyidAdaptor.niRegYn = "null";
anyidAdaptor.agencyContextPath = "";

anyidAdaptor.success = function(data){
    if(anyidAdaptor.ssoByPass != 0 || !data.useSso) {
        anyidAdaptor.orgLogin(data);
    } else {
        anyidAdaptor.certData = data;
        anyidAdaptor.userCheck();
    }
}

anyidAdaptor.userCheck = function(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", anyidAdaptor.agencyContextPath + "/oidc/userCheck", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                anyidAdaptor.ssoLogin();
            } else {
                setTimeout(function() {
                    anyidAdaptor.receiveAnyIdJoin(response.uri, response.data);
                }, 100);
            }
        }
    };

    let jsonObject = new Object();
    jsonObject.txId = anyidAdaptor.certData.txId;
    jsonObject.ssob = anyidAdaptor.certData.ssob;
    jsonObject.userSeCd = anyidAdaptor.certData.userSeCd;

    let jsonStr = JSON.stringify(jsonObject);
    let encodedString = btoa(jsonStr);

    var data = "data=" + encodedString + "&txId=" + anyidAdaptor.certData.txId;
    xhr.send(data);
}

// anyid 가입
anyidAdaptor.receiveAnyIdJoin = function(portalJoinUri, memberData){
    var url = portalJoinUri + encodeURIComponent(memberData);
    anyidAdaptor.popup(url, "openAnyIdRegistUserIdv", 700, 740);

    window.addEventListener("message", function(event) {
        var result;
        try {
            result = JSON.parse(event.data);
        } catch (error) {
            console.error("Received message is not valid JSON:", error);
            return;
        }

        if(!result.funcName || (result.funcName !== "trmsAgreComplete" && result.funcName !== "registUserComplete")) {
            return;
        }
        if(result.status === "success") {
            if(result.trmsAgreYn == "Y"){
                anyidAdaptor.ssoLogin();
            }else{
                anyidAdaptor.orgLogin(anyidAdaptor.certData);
            }
        }else{
            anyidAdaptor.orgLogin(anyidAdaptor.certData);
        }
    }, false);
}

// 팝업 호출
anyidAdaptor.popup = function(url, name, width, height){
    let left = (screen.width) ? (screen.width - width) / 2 : 0;
    let top = (screen.height) ? (screen.height - height) / 2 : 0;
    let popup = window.open(url, name, "resizable=yes,toolbar=no,scrollbars=yes,location=no,top=" + top + "px,left=" + left + "px,width=" + width + "px,height=" + height + "px");
    if(popup){
        popup.focus();
    }
}

anyidAdaptor.ssoLogin = function(){
    let jsonObject = new Object();
    jsonObject.txId = anyidAdaptor.certData.txId;
    jsonObject.ssob = anyidAdaptor.certData.ssob;
    jsonObject.userSeCd = anyidAdaptor.certData.userSeCd;
    jsonObject.afData = anyidAdaptor.certData.afData;
    let jsonStr = JSON.stringify(jsonObject);
    let encodedString = btoa(jsonStr);
    var baseUrl = window.location.origin + anyidAdaptor.agencyContextPath + "/oidc/ssoLogin";
    var urlWithParams = baseUrl + "?data=" + encodedString;
    window.location.href = urlWithParams;
}

anyidAdaptor.ssoLoginPageSub = function(baseUrl, endPoint, acrValues){
    var subUrl = "";
    if (endPoint && endPoint.trim() !== "") {
        subUrl = "?endPoint=" + encodeURIComponent(endPoint);
    }
    if (!acrValues && acrValues.trim() == "") {
        acrValues = "3";
    }
    if (acrValues && acrValues.trim() !== "") {
        if(subUrl == ""){
            subUrl = "?";
        }else{
            subUrl = subUrl + "&";
        }
        subUrl = subUrl + "acrValues=" + acrValues;
    }
    window.location.replace(baseUrl + subUrl);
}

anyidAdaptor.ssoLogout = function(endPoint) {
    endPoint = typeof endPoint !== 'undefined' ? endPoint : "/";
    var baseUrl = window.location.origin + anyidAdaptor.agencyContextPath + "/oidc/ssoLogout";
    baseUrl = baseUrl + "?endPoint=" + encodeURIComponent(endPoint);
    window.location.replace(baseUrl);
}

anyidAdaptor.reAuthLevel = function(endPoint, acrValues){
    endPoint = typeof endPoint !== 'undefined' ? endPoint : "/";
    var baseUrl = window.location.origin + anyidAdaptor.agencyContextPath + "/oidc/reAuthLevel";
    anyidAdaptor.ssoLoginPageSub(baseUrl, endPoint, acrValues);
}

anyidAdaptor.ssoLoginPage = function(endPoint, acrValues){
    endPoint = typeof endPoint !== 'undefined' ? endPoint : "/";
    var baseUrl = window.location.origin + anyidAdaptor.agencyContextPath + "/oidc/auth";
    anyidAdaptor.ssoLoginPageSub(baseUrl, endPoint, acrValues);
}

anyidAdaptor.ssoSvcToSvc = function(url, endPoint){
    var baseUrl = url + "/oidc/svcToSvc?endPoint=" + encodeURIComponent(endPoint);
    window.open(baseUrl, "_blank");
}

anyidAdaptor.goAnyIdLogin = function(data) {
    const params = new URLSearchParams(location.search);
    var obj = {
        ssob: data.ssob,
        tag: params.get("tx")
    };
    $.ajax({
        url: "/chkLoginAnyid.do",
        type: "POST",
        dataType: "json",
        data: obj,
        beforeSend: function() { _cfn_loading.show(); },
        complete: function() { _cfn_loading.hide(); },
        success: function(response) {
            if (response.status === "success") {
                console.log("success");
                location.href = "/minwonMainNew.do";
            }else{
                console.log("fail");
                anyidAdaptor.goLogin();
            }
        },
        error: function(xhr, status, error) {
            console.error('API Error (No Local Backend)');
        }
    });
}

// 이용기관 로그인 함수
anyidAdaptor.goLogin = function() {
    var nowUrl = window.location.protocol;
    var urlSplit = nowUrl.split(":");
    var firstUrl = urlSplit[0];
    var fullUrl;
    if(firstUrl == "https" || firstUrl == "http"){
        fullUrl = "/portal/loginNew.do?menu_no=3817&menu_grp=MENU_NEW07";
    }
    console.log("fullUrl : " + fullUrl);
    location.href = fullUrl;
}

/* =====================================================
 * 팝업 / 쿠키 유틸리티 함수
 * (head.html에서 이동)
 * ===================================================== */

// 로그아웃 후 뒤로가기로 캐시 복원 시 강제 새로고침
window.addEventListener('pageshow', function(event) {
    if (event.persisted ||
        (window.performance && window.performance.navigation.type === 2)) {
        window.location.reload();
    }
});

function closeWinAt(winName, expiredays) {
    setCookieAt00(winName, "done", expiredays);
    $("#" + winName).hide();
}

function popclose(id) {
    $("#" + id).hide();
}

function setCookieAt00(name, value, expiredays) {
    var todayDate = new Date();
    todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
    if (todayDate > new Date()) {
        expiredays = expiredays - 1;
    }
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookie(name) {
    var nameOfCookie = name + "=";
    var x = 0;
    while (x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0)
            break;
    }
    return "";
}

// 페이지 로드 초기화
window.onload = main_init;

function main_init() {
    var nowDateObj = new Date();
    var year = nowDateObj.getFullYear();
    var month = (nowDateObj.getMonth() + 1).toString().padStart(2, '0');
    var day = nowDateObj.getDate().toString().padStart(2, '0');
    var hh = nowDateObj.getHours().toString().padStart(2, '0');
    var mm = nowDateObj.getMinutes().toString().padStart(2, '0');
    var nowDate = year + month + day + hh + mm;
    var chk = true;
    list = $(".draggable-popup");
    for (i = 0, len = list.length; i < len; i++) {
        obj = list[i];
        chk = true;
        if (getCookie(obj.getAttribute("id")) != "done") {
            $("#" + obj.getAttribute("id")).show();
        } else {
            chk = false;
        }
        var start_time = obj.getAttribute("start_to");
        var end_time = obj.getAttribute("end_to");
        if (start_time == null || start_time == "") {
            if (parseInt(nowDate) > parseInt(end_time)) {
                $(obj).hide();
            }
        } else {
            if (parseInt(nowDate) > parseInt(end_time)) {
                $(obj).hide();
            } else {
                if (parseInt(nowDate) >= parseInt(start_time) && chk) {
                    $(obj).show();
                } else {
                    $(obj).hide();
                }
            }
        }
    }
    let imgTag = document.getElementById('popuptableImg');
    if (imgTag) {
        imgTag.onclick = function(){
            window.open('https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do?menu_no=661&menu_grp=MENU_GRP31&start_idx=1&svc_no=I1200&p_svcTypeCd=API_TYPE06&svc_type_cd=&cl_cd=&provd_instt=&svcChkArr=&svc_nm=%EC%8B%9D%ED%92%88%EC%A0%91%EA%B0%9D%EC%97%85%EC%A0%95%EB%B3%B4&search_clCdCode=&search_provdInsttCode=&search_svcTypeCode=&search_keyword=%EC%8B%9D%ED%92%88%EC%A0%91%EA%B0%9D%EC%97%85&show_cnt=10');
        };
    }
}

function closeWinToday(winName, expiredays) {
    setCookieAt00(winName, "done", expiredays);
    $("#" + winName).hide();
}

function setCookie(cookieName, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}

function deleteCookie(cookieName) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= ;expires=" + expireDate.toGMTString();
}

function closeWinAt00(winName, expiredays) {
    setCookieAt00(winName, "done", expiredays);
    $('#' + winName).hide();
}

function openWin(winName) {
    var blnCookie = getCookie(winName);
    if (!blnCookie) {
        $('#' + winName).show();
    }
}

/* =====================================================
 * index.html 전용 로직
 * ===================================================== */
$(document).ready(function () {
    // jsTree 초기화
    if ($('#layerTree').length) {
        $('#layerTree').jstree({
            "temes": {
                "theme": "classic",
                "dots": true,
                "icons": false
            },
            "plugins": ["themes", "html_data"]
        });
    }

    // init 데이터구조 조회
    fn_dataStrutList('기준규격정보', '', '기준규격정보', '');

    /* 팝업 open 날짜 검증 (로컬 서버 구동 시 팝업 차단)
    $.each($('.popups'), function () {
        var openDtEl = $(this).attr("data-open");
        var openCheckDt = new Date(openDtEl);
        var ElementID = $(this).attr("id");

        if (nowDate.getTime() < openCheckDt.getTime()) {
            openWin(ElementID);
        }
    })
    */

    /* 임시 팝업 닫기*/
    $(".closePopLay").on('click', function () {
        $(this).parents('.popups').eq(0).hide();
    });

    /* 팝업위치 지정*/
    $.each($(".popups"), function () {
        var elementLeft = 0;
        $(this).css("left", elementLeft);
        if ($(this).css("display") != 'none') {
            elementLeft = elementLeft + ($(this).width() + 10);
        }
    });

    /* 팝업 드레그 */
    //	$(".popups").draggable();

    // 한눈에 보기
    $(".tm_view").click(function () {
        $("#menu_no").val(menu_no);
        $("#menu_grp").val(menu_grp);
        document.baseForm.action = "/api/datasetList.do";
        document.baseForm.target = "_self";
        document.baseForm.method = "post";
        document.baseForm.submit();
    });

    // 카테고리 클릭 시 로컬 검색 페이지로 이동하도록 가로채기
    $("a[href*='datasetList.do']").click(function (e) {
        e.preventDefault();

        // a 태그 내부의 텍스트 추출 (예: '·  기준규격정보' -> '기준규격정보')
        let text = $(this).text().replace(/·/g, '').trim();

        // 로컬 검색 매칭률을 높이기 위해 접미어 제거 (예: '기준규격정보' -> '기준규격')
        let keyword = text.replace(/정보|관리|현황/g, '').trim();

        // 텍스트가 없으면 그냥 /search/search.html 로 이동
        if (!keyword) {
            location.href = "/search/search.html";
        } else {
            location.href = "/search/search.html?search_keyword=" + encodeURIComponent(keyword);
        }
    });
});


// 서비스유형 상세 화면
function fn_listMoveDetail(svcNo, types, svcNm) {
    $("#svc_no").val(svcNo);
    $("#p_svcTypeCd").val(types);
    $("#svc_nm").val(svcNm);

    document.baseForm.action = "/api/newDatasetDetail.do";
    document.baseForm.target = "_self";
    document.baseForm.method = "post";
    document.baseForm.submit();
}

// 분류별데이터 서비스 이동
function moveToDatasetClcdList(cl_cd, menu_no, menu_grp) {
    $("#cl_cd").val(cl_cd);
    $("#menu_no").val(menu_no);
    $("#menu_grp").val(menu_grp);
    document.baseForm.action = "/api/datasetList.do";
    document.baseForm.target = "_self";
    document.baseForm.method = "post";
    document.baseForm.submit();
}

// 데이터통합검색
function datasetAllSearch(menu_no, menu_grp) {
    var input = document.getElementById("search_keyword");
    var keyword = input ? input.value.trim() : "";
    if (!keyword) {
        alert("검색어를 입력해주세요.");
        if (input) input.focus();
        return;
    }
    location.href = "/api/datasetAllSearch.do?search_keyword=" + encodeURIComponent(keyword);
}

//게시글페이지(공지사항)
function fn_moveDetail(bbs_no, ntctxt_no) {
    $("#bbs_no").val(bbs_no);
    $("#ntctxt_no").val(ntctxt_no);
    $("#menu_no").val("688");      		   //공지사항메뉴번호
    $("#menu_grp").val("MENU_GRP33");      //공지사항메뉴그룹번호

    document.baseForm.action = "/api/board/boardDetail.do";
    document.baseForm.target = "_self";
    document.baseForm.method = "post";
    document.baseForm.submit();
}

//해당 서비스의 API 상세페이지로 이동
function fn_moveApiInfo(cl_cd, svc_no) {
    $("#cl_cd").val(cl_cd);
    $("#svc_no").val(svc_no);
    $("#menu_no").val("661");				// /api/datasetList.do?svc_type_cd=API_TYPE06
    $("#menu_grp").val("MENU_GRP31");

    document.baseForm.action = "/api/newDatasetDetail.do";
    document.baseForm.target = "_self";
    document.baseForm.method = "post";
    document.baseForm.submit();
}

//페이지이동
function fn_movePage(url, menu_no, menu_grp) {
    $("#menu_no").val(menu_no);
    $("#menu_grp").val(menu_grp);
    document.baseForm.action = "" + url;
    document.baseForm.target = "_self";
    document.baseForm.method = "post";
    document.baseForm.submit();
}

// 파일 다운로드
function downloadFile(sVal) {
    $('#filePath').val("/upload/openApi");
    $('#fileName').val("2025_OpenAPI_Guidebook.pdf");
    $('#orgFileName').val("식품안전나라_공공데이터_가이드북.pdf");

    document.baseForm.action = "/common/downloadAttchdFile.do";
    document.baseForm.target = "_self";
    document.baseForm.submit();
}

// 파일 다운로드 2
function downloadFile2(sVal) {
    $('#filePath').val("/upload/openApi");
    $('#fileName').val("openApiList.zip");
    $('#orgFileName').val("식품안전나라_공공데이터_개방_목록.zip");

    document.baseForm.action = "/common/downloadAttchdFile.do";
    document.baseForm.target = "_self";
    document.baseForm.submit();
}

// 동영상 이동
function goVideoUrl(no, grp, mno, bno) {
    location.href = "/portal/board/boardDetail.do?ntctxt_no=" + no + "&menu_grp=" + grp + "&menu_no=" + mno + "&bbs_no=" + bno;
}

/* 인기데이터 MERGE 관련 (기존 주석처리된 부분 보존)
window.onload = function() {
    // 매달 01, 30, 31 일에는 공공데이터 최초 한번 머지문 실행
    var nowYear = '2026';
    var nowMonth = '05';
    var nowMonth2 = '06';
    var nowDay = '03';
    var nowDate = '20260603';
    var uselogCnt = '1';

    if(nowDay == "01" || nowDay == "30" || nowDay == "31"){
        if(uselogCnt == "0"){
            $.ajax({
                data: {nowYear: nowYear, nowMonth : nowMonth, nowMonth2 : nowMonth2, nowDay : nowDay, nowDate : nowDate, uselogCnt : uselogCnt},
                dataType:'json',
                type:'POST',
                url:"/ajax/popularListMerge.do",
                async : true,
                success:function(arg){
                    console.log("인기데이터 MERGE : " + arg);
                },
                error:function(request,status,error){
                }
            });
        }
    }
};
*/
