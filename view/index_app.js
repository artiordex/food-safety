// anyidAdaptor - 정부 통합인증(Any-ID) SDK 연계 어댑터
// index.html 홈페이지 전용 스크립트 (head.html에서 이동)
var anyidAdaptor = anyidAdaptor || {};

// SSO 여부에 따라 Any-ID 로그인 또는 일반 로그인으로 분기
anyidAdaptor.orgLogin = function (data) {
    if (data.ssob) {
        anyidAdaptor.goAnyIdLogin(data);
    } else {
        anyidAdaptor.goLogin();
    }
}

// Any-ID 가입 확인 팝업 후 가입 또는 로그인 처리
anyidAdaptor.JoinConfirm = function (portalJoinUri, memberData) {
    if (!confirm('Any-ID 사용자등록 하시겠습니까?')) {
        anyidAdaptor.orgLogin(anyidAdaptor.certData);
        return;
    } else {
        anyidAdaptor.receiveAnyIdJoin(portalJoinUri, memberData);
    }
}

// Any-ID SDK 설정 초기값
anyidAdaptor.portalJoinUri = "null";
anyidAdaptor.certData = null;
anyidAdaptor.ssoByPass = "0";
anyidAdaptor.niRegYn = "null";
anyidAdaptor.agencyContextPath = "";

// Any-ID 인증 성공 콜백: SSO 우회 여부에 따라 처리 분기
anyidAdaptor.success = function (data) {
    if (anyidAdaptor.ssoByPass != 0 || !data.useSso) {
        anyidAdaptor.orgLogin(data);
    } else {
        anyidAdaptor.certData = data;
        anyidAdaptor.userCheck();
    }
}

// 서버에 사용자 존재 여부 확인 후 SSO 로그인 또는 가입 처리
anyidAdaptor.userCheck = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", anyidAdaptor.agencyContextPath + "/oidc/userCheck", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                anyidAdaptor.ssoLogin();
            } else {
                setTimeout(function () {
                    anyidAdaptor.receiveAnyIdJoin(response.uri, response.data);
                }, 100);
            }
        }
    };

    // 인증 데이터를 Base64로 인코딩해서 전송
    let jsonObject = new Object();
    jsonObject.txId = anyidAdaptor.certData.txId;
    jsonObject.ssob = anyidAdaptor.certData.ssob;
    jsonObject.userSeCd = anyidAdaptor.certData.userSeCd;

    let jsonStr = JSON.stringify(jsonObject);
    let encodedString = btoa(jsonStr);

    var data = "data=" + encodedString + "&txId=" + anyidAdaptor.certData.txId;
    xhr.send(data);
}

// anyid 가입 팝업 열기 및 결과 메시지 수신 처리
anyidAdaptor.receiveAnyIdJoin = function (portalJoinUri, memberData) {
    var url = portalJoinUri + encodeURIComponent(memberData);
    anyidAdaptor.popup(url, "openAnyIdRegistUserIdv", 700, 740);

    window.addEventListener("message", function (event) {
        var result;
        try {
            result = JSON.parse(event.data);
        } catch (error) {
            console.error("Received message is not valid JSON:", error);
            return;
        }

        // 약관 동의 완료 또는 사용자 등록 완료 메시지만 처리
        if (!result.funcName || (result.funcName !== "trmsAgreComplete" && result.funcName !== "registUserComplete")) {
            return;
        }
        if (result.status === "success") {
            if (result.trmsAgreYn == "Y") {
                anyidAdaptor.ssoLogin();
            } else {
                anyidAdaptor.orgLogin(anyidAdaptor.certData);
            }
        } else {
            anyidAdaptor.orgLogin(anyidAdaptor.certData);
        }
    }, false);
}

// 화면 중앙에 팝업창 열기
anyidAdaptor.popup = function (url, name, width, height) {
    let left = (screen.width) ? (screen.width - width) / 2 : 0;
    let top = (screen.height) ? (screen.height - height) / 2 : 0;
    let popup = window.open(url, name, "resizable=yes,toolbar=no,scrollbars=yes,location=no,top=" + top + "px,left=" + left + "px,width=" + width + "px,height=" + height + "px");
    if (popup) {
        popup.focus();
    }
}

// SSO 로그인: 인증 데이터를 인코딩해서 ssoLogin 엔드포인트로 이동
anyidAdaptor.ssoLogin = function () {
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

// 인증 수준(acrValues)과 엔드포인트를 조합해서 SSO 로그인 페이지 URL 구성
anyidAdaptor.ssoLoginPageSub = function (baseUrl, endPoint, acrValues) {
    var subUrl = "";
    if (endPoint && endPoint.trim() !== "") {
        subUrl = "?endPoint=" + encodeURIComponent(endPoint);
    }
    if (!acrValues && acrValues.trim() == "") {
        acrValues = "3";
    }
    if (acrValues && acrValues.trim() !== "") {
        if (subUrl == "") {
            subUrl = "?";
        } else {
            subUrl = subUrl + "&";
        }
        subUrl = subUrl + "acrValues=" + acrValues;
    }
    window.location.replace(baseUrl + subUrl);
}

// SSO 로그아웃 후 지정된 엔드포인트로 이동
anyidAdaptor.ssoLogout = function (endPoint) {
    endPoint = typeof endPoint !== 'undefined' ? endPoint : "/";
    var baseUrl = window.location.origin + anyidAdaptor.agencyContextPath + "/oidc/ssoLogout";
    baseUrl = baseUrl + "?endPoint=" + encodeURIComponent(endPoint);
    window.location.replace(baseUrl);
}

// 재인증 수준 상향 요청
anyidAdaptor.reAuthLevel = function (endPoint, acrValues) {
    endPoint = typeof endPoint !== 'undefined' ? endPoint : "/";
    var baseUrl = window.location.origin + anyidAdaptor.agencyContextPath + "/oidc/reAuthLevel";
    anyidAdaptor.ssoLoginPageSub(baseUrl, endPoint, acrValues);
}

// SSO 로그인 페이지로 이동
anyidAdaptor.ssoLoginPage = function (endPoint, acrValues) {
    endPoint = typeof endPoint !== 'undefined' ? endPoint : "/";
    var baseUrl = window.location.origin + anyidAdaptor.agencyContextPath + "/oidc/auth";
    anyidAdaptor.ssoLoginPageSub(baseUrl, endPoint, acrValues);
}

// 서비스 간 SSO 전환 (새 탭으로 열기)
anyidAdaptor.ssoSvcToSvc = function (url, endPoint) {
    var baseUrl = url + "/oidc/svcToSvc?endPoint=" + encodeURIComponent(endPoint);
    window.open(baseUrl, "_blank");
}

// Any-ID 로그인: 서버에 ssob 검증 후 메인 화면으로 이동
anyidAdaptor.goAnyIdLogin = function (data) {
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
        beforeSend: function () { _cfn_loading.show(); },
        complete: function () { _cfn_loading.hide(); },
        success: function (response) {
            if (response.status === "success") {
                console.log("success");
                location.href = "/minwonMainNew.do";
            } else {
                console.log("fail");
                anyidAdaptor.goLogin();
            }
        },
        error: function (xhr, status, error) {
            console.error('API Error (No Local Backend)');
        }
    });
}

// 이용기관 로그인 페이지로 이동
anyidAdaptor.goLogin = function () {
    var nowUrl = window.location.protocol;
    var urlSplit = nowUrl.split(":");
    var firstUrl = urlSplit[0];
    var fullUrl;
    if (firstUrl == "https" || firstUrl == "http") {
        fullUrl = "/portal/loginNew.do?menu_no=3817&menu_grp=MENU_NEW07";
    }
    console.log("fullUrl : " + fullUrl);
    location.href = fullUrl;
}

// 팝업 / 쿠키 유틸리티 함수

// 로그아웃 후 뒤로가기로 캐시 복원 시 강제 새로고침
window.addEventListener('pageshow', function (event) {
    if (event.persisted ||
        (window.performance && window.performance.navigation.type === 2)) {
        window.location.reload();
    }
});

// 팝업 오늘 하루 안 보기: 쿠키 설정 후 숨김
function closeWinAt(winName, expiredays) {
    setCookieAt00(winName, "done", expiredays);
    $("#" + winName).hide();
}

// 팝업 즉시 닫기
function popclose(id) {
    $("#" + id).hide();
}

// 자정 00시 기준으로 만료되는 쿠키 설정
function setCookieAt00(name, value, expiredays) {
    var todayDate = new Date();
    todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
    if (todayDate > new Date()) {
        expiredays = expiredays - 1;
    }
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

// 쿠키 값 읽기
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
    // 현재 날짜/시간 (팝업 노출 기간 검증용)
    var nowDateObj = new Date();
    var year = nowDateObj.getFullYear();
    var month = (nowDateObj.getMonth() + 1).toString().padStart(2, '0');
    var day = nowDateObj.getDate().toString().padStart(2, '0');
    var hh = nowDateObj.getHours().toString().padStart(2, '0');
    var mm = nowDateObj.getMinutes().toString().padStart(2, '0');
    var nowDate = year + month + day + hh + mm;
    var chk = true;

    // 드래그 가능한 팝업 목록을 순회하며 쿠키/기간 조건에 맞게 표시/숨김
    list = $(".draggable-popup");
    for (i = 0, len = list.length; i < len; i++) {
        obj = list[i];
        chk = true;
        // 쿠키에 "done"이 없으면 팝업 표시
        if (getCookie(obj.getAttribute("id")) != "done") {
            $("#" + obj.getAttribute("id")).show();
        } else {
            chk = false;
        }
        var start_time = obj.getAttribute("start_to");
        var end_time = obj.getAttribute("end_to");
        // 노출 종료 시간이 지났으면 숨김, 시작 시간도 있으면 기간 내에만 표시
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
    // 팝업 이미지 클릭 시 식품접객업정보 상세 페이지로 이동
    let imgTag = document.getElementById('popuptableImg');
    if (imgTag) {
        imgTag.onclick = function () {
            window.open('https://www.foodsafetykorea.go.kr/api/newDatasetDetail.do?menu_no=661&menu_grp=MENU_GRP31&start_idx=1&svc_no=I1200&p_svcTypeCd=API_TYPE06&svc_type_cd=&cl_cd=&provd_instt=&svcChkArr=&svc_nm=%EC%8B%9D%ED%92%88%EC%A0%91%EA%B0%9D%EC%97%85%EC%A0%95%EB%B3%B4&search_clCdCode=&search_provdInsttCode=&search_svcTypeCode=&search_keyword=%EC%8B%9D%ED%92%88%EC%A0%91%EA%B0%9D%EC%97%85&show_cnt=10');
        };
    }
}

// 오늘 하루 닫기 (closeWinAt의 별칭)
function closeWinToday(winName, expiredays) {
    setCookieAt00(winName, "done", expiredays);
    $("#" + winName).hide();
}

// 일반 만료일 기준 쿠키 설정
function setCookie(cookieName, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}

// 쿠키 즉시 만료 (삭제)
function deleteCookie(cookieName) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= ;expires=" + expireDate.toGMTString();
}

// 자정 기준 오늘 하루 닫기
function closeWinAt00(winName, expiredays) {
    setCookieAt00(winName, "done", expiredays);
    $('#' + winName).hide();
}

// 쿠키가 없을 때만 팝업 열기
function openWin(winName) {
    var blnCookie = getCookie(winName);
    if (!blnCookie) {
        $('#' + winName).show();
    }
}

// index.html 전용 초기화 로직
$(document).ready(function () {
    // jsTree 초기화 (레이어 트리가 있을 때만)
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

    // 초기 데이터구조 목록 조회 (기준규격정보 카테고리)
    fn_dataStrutList('기준규격정보', '', '기준규격정보', '');

    // 팝업 닫기 버튼 이벤트
    $(".closePopLay").on('click', function () {
        $(this).parents('.popups').eq(0).hide();
    });

    // 팝업 위치 지정 (가로 누적 배치)
    $.each($(".popups"), function () {
        var elementLeft = 0;
        $(this).css("left", elementLeft);
        if ($(this).css("display") != 'none') {
            elementLeft = elementLeft + ($(this).width() + 10);
        }
    });

    /* 팝업 드래그 기능 (비활성화)
    $(".popups").draggable();
    */

    // 한눈에 보기 버튼 클릭 시 baseForm으로 이동
    $(".tm_view").click(function () {
        $("#menu_no").val(menu_no);
        $("#menu_grp").val(menu_grp);
        document.baseForm.action = "/api/datasetList.do";
        document.baseForm.target = "_self";
        document.baseForm.method = "post";
        document.baseForm.submit();
    });

    // 카테고리 링크 클릭 시 로컬 검색 페이지로 가로채기
    $("a[href*='datasetList.do']").click(function (e) {
        e.preventDefault();

        // a 태그 내부 텍스트 추출 (예: '·  기준규격정보' -> '기준규격정보')
        let text = $(this).text().replace(/·/g, '').trim();

        // 검색 매칭률을 높이기 위해 접미어 제거 (예: '기준규격정보' -> '기준규격')
        let keyword = text.replace(/정보|관리|현황/g, '').trim();
        if (!keyword) {
            location.href = "/search/search.html";
        } else {
            location.href = "/search/search.html?search_keyword=" + encodeURIComponent(keyword);
        }
    });
});

// 서비스유형 상세 화면으로 이동 (baseForm 폼 제출)
function fn_listMoveDetail(svcNo, types, svcNm) {
    $("#svc_no").val(svcNo);
    $("#p_svcTypeCd").val(types);
    $("#svc_nm").val(svcNm);

    document.baseForm.action = "/api/newDatasetDetail.do";
    document.baseForm.target = "_self";
    document.baseForm.method = "post";
    document.baseForm.submit();
}

// 분류별 데이터 서비스 목록으로 이동
function moveToDatasetClcdList(cl_cd, menu_no, menu_grp) {
    $("#cl_cd").val(cl_cd);
    $("#menu_no").val(menu_no);
    $("#menu_grp").val(menu_grp);
    document.baseForm.action = "/api/datasetList.do";
    document.baseForm.target = "_self";
    document.baseForm.method = "post";
    document.baseForm.submit();
}

// 키워드 통합검색 페이지로 이동 (검색어 미입력 시 알림)
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

// 공지사항 게시글 상세 페이지로 이동
function fn_moveDetail(bbs_no, ntctxt_no) {
    $("#bbs_no").val(bbs_no);
    $("#ntctxt_no").val(ntctxt_no);
    $("#menu_no").val("688");
    $("#menu_grp").val("MENU_GRP33");

    document.baseForm.action = "/api/board/boardDetail.do";
    document.baseForm.target = "_self";
    document.baseForm.method = "post";
    document.baseForm.submit();
}

// 해당 서비스의 API 상세 페이지로 이동
function fn_moveApiInfo(cl_cd, svc_no) {
    $("#cl_cd").val(cl_cd);
    $("#svc_no").val(svc_no);
    $("#menu_no").val("661");
    $("#menu_grp").val("MENU_GRP31");

    document.baseForm.action = "/api/newDatasetDetail.do";
    document.baseForm.target = "_self";
    document.baseForm.method = "post";
    document.baseForm.submit();
}

// 지정한 URL 페이지로 이동 (메뉴 번호 포함)
function fn_movePage(url, menu_no, menu_grp) {
    $("#menu_no").val(menu_no);
    $("#menu_grp").val(menu_grp);
    document.baseForm.action = "" + url;
    document.baseForm.target = "_self";
    document.baseForm.method = "post";
    document.baseForm.submit();
}

// OpenAPI 가이드북 PDF 다운로드
function downloadFile(sVal) {
    $('#filePath').val("/upload/openApi");
    $('#fileName').val("2025_OpenAPI_Guidebook.pdf");
    $('#orgFileName').val("식품안전나라_공공데이터_가이드북.pdf");

    document.baseForm.action = "/common/downloadAttchdFile.do";
    document.baseForm.target = "_self";
    document.baseForm.submit();
}

// 공공데이터 개방 목록 ZIP 다운로드
function downloadFile2(sVal) {
    $('#filePath').val("/upload/openApi");
    $('#fileName').val("openApiList.zip");
    $('#orgFileName').val("식품안전나라_공공데이터_개방_목록.zip");

    document.baseForm.action = "/common/downloadAttchdFile.do";
    document.baseForm.target = "_self";
    document.baseForm.submit();
}

// 동영상 게시글 상세 페이지로 이동
function goVideoUrl(no, grp, mno, bno) {
    location.href = "/portal/board/boardDetail.do?ntctxt_no=" + no + "&menu_grp=" + grp + "&menu_no=" + mno + "&bbs_no=" + bno;
}
