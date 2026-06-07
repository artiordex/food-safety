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
    fn_dataStrutList('기준규격정보', '', 'API_SRT01', '');

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

//데이터구조 검색 조회
function fn_dataStrutList(subjct, svcTypeCode, clCdCode, provdInsttCode) {
    $.ajax({
        data: {
            search_svcTypeCode: svcTypeCode,
            search_clCdCode: clCdCode,
            search_provdInsttCode: provdInsttCode
        },
        dataType: 'json',
        type: 'POST',
        url: "/ajax/datasetSearch.do",
        success: function (resultList) {
            var list = resultList.dataStrutList;
            var listLength = list.length;

            $("#datasetSjct").text(subjct);

            if (listLength > 0) {
                var strHtml = '';

                for (var i in list) {
                    /*230627 정보원요청으로 숨김처리 ydj*/
                    if (list[i].svc_nm != '품목제조보고번호유효성확인(대한상공회의소사용)' && list[i].svc_nm != '불량식품 신고이력 조회(내부용)' && list[i].svc_nm != '불량식품 신고정보 조회(내부용)') {
                        strHtml += '<tr>';
                        strHtml += '<td>' + list[i].provd_instt_nm + '</td>';
                        strHtml += '<td>' + list[i].cl_cd_nm + '</td>';
                        strHtml += '<td class=taL><a href=\'javascript:fn_listMoveDetail(' + '"' + list[i].svc_no + '"' + ',' + '"' + list[i].svc_type_cd + '"' + ',' + '"' + list[i].svc_nm + '"' + ');\'>' + list[i].svc_nm + '</a></td>';

                        if (list[i].svc_type_cd == 'API_TYPE03') {
                            strHtml += '<td>' + 'F' + '</td>';
                        } else if (list[i].svc_type_cd == 'API_TYPE06') {
                            strHtml += '<td>' + 'O' + '</td>';
                        } else {
                            strHtml += '<td></td>';
                        }
                        strHtml += '</tr>';
                    }
                }

                $("#tb_struct_list").html(strHtml);
            } else {
                $("#tb_struct_list").html("<tr><td colspan='4'>검색된 정보가 없습니다.</td></tr>");
            }
        },
        error: function (request, status, error) {
            console.error('API Error (No Local Backend)');   //시스템에러
        }
    });
}

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
