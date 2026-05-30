(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // view/datasetData.js
  var datasets, subjectFilters, processFilters, issueFilters, themeFilters, purposes, dataMapNodes, dataMapEdges, subjectColorMap;
  var init_datasetData = __esm({
    "view/datasetData.js"() {
      datasets = [
        {
          "id": "api_tables",
          "name": "api_tables (api_tables)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI api_tables \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 169\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 169,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "svc_no",
            "svc_nm",
            "cat",
            "detail_url",
            "type_cd",
            "description",
            "sample_url",
            "sample_data_length"
          ],
          "keys": [
            "svc_no"
          ],
          "usageExample": "SELECT * FROM api_tables LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C api_tables \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "svc_no",
              "svc_nm",
              "cat",
              "detail_url",
              "type_cd",
              "description",
              "sample_url",
              "sample_data_length",
              "field_count",
              "view_name"
            ],
            "joinKeys": [
              "PK: svc_no"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT svc_no, svc_nm, cat FROM api_tables"
            ]
          }
        },
        {
          "id": "api_columns",
          "name": "api_columns (api_columns)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI api_columns \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 1867\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 1867,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "svc_no",
            "field",
            "kor_nm",
            "sql_type",
            "data_type",
            "length",
            "orig_type",
            "orig_length"
          ],
          "keys": [
            "svc_no",
            "field"
          ],
          "usageExample": "SELECT * FROM api_columns LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C api_columns \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "svc_no",
              "field",
              "kor_nm",
              "sql_type",
              "data_type",
              "length",
              "orig_type",
              "orig_length",
              "description",
              "sample",
              "infer_reason"
            ],
            "joinKeys": [
              "PK: svc_no",
              "PK: field"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT svc_no, field, kor_nm FROM api_columns"
            ]
          }
        },
        {
          "id": "I0600",
          "name": "HACCP \uAD50\uC721\uD6C8\uB828\uAE30\uAD00 \uC9C0\uC815 \uD604\uD669 (I0600)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0600 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9",
          "includedData": [
            "EDC_INSTT_APPN_NO",
            "BSSH_NM",
            "BSSH_ADDR",
            "PRSDNT_NM",
            "PRMS_DT"
          ],
          "keys": [
            "EDC_INSTT_APPN_NO"
          ],
          "usageExample": "SELECT * FROM I0600 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C HACCP \uAD50\uC721\uD6C8\uB828\uAE30\uAD00 \uC9C0\uC815 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "EDC_INSTT_APPN_NO",
              "BSSH_NM",
              "BSSH_ADDR",
              "PRSDNT_NM",
              "PRMS_DT"
            ],
            "joinKeys": [
              "PK: EDC_INSTT_APPN_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT EDC_INSTT_APPN_NO, BSSH_NM, BSSH_ADDR FROM I0600"
            ]
          }
        },
        {
          "id": "I0580",
          "name": "HACCP \uC801\uC6A9\uC5C5\uC18C \uC9C0\uC815 \uD604\uD669 (I0580)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0580 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "INDUTY_CD_NM",
            "BSSH_NM",
            "PRSDNT_NM",
            "SITE_ADDR",
            "HACCP_APPN_DT",
            "HACCP_APPN_NO",
            "PRDLST_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I0580 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C HACCP \uC801\uC6A9\uC5C5\uC18C \uC9C0\uC815 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "INDUTY_CD_NM",
              "BSSH_NM",
              "PRSDNT_NM",
              "SITE_ADDR",
              "HACCP_APPN_DT",
              "HACCP_APPN_NO",
              "PRDLST_NM",
              "CLSBIZ_DVS_CD_NM",
              "CLSBIZ_DT",
              "ASGN_CANCL_DT",
              "CRTFC_ENDDT",
              "CRTFC_RETN_DT"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, INDUTY_CD_NM, BSSH_NM FROM I0580"
            ]
          }
        },
        {
          "id": "I0130",
          "name": "LMO \uC218\uC785 \uC2B9\uC778 \uD604\uD669 (I0130)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0130 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC218\uC785\uC2DD\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LMO_CONFM_NO",
            "CONFM_DT",
            "BSSH_NM",
            "ADDR",
            "COMMON_NM",
            "SYSTM_NM",
            "BNE_NM",
            "PRPOS"
          ],
          "keys": [
            "LMO_CONFM_NO"
          ],
          "usageExample": "SELECT * FROM I0130 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C LMO \uC218\uC785 \uC2B9\uC778 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LMO_CONFM_NO",
              "CONFM_DT",
              "BSSH_NM",
              "ADDR",
              "COMMON_NM",
              "SYSTM_NM",
              "BNE_NM",
              "PRPOS",
              "NATN_CD_NM"
            ],
            "joinKeys": [
              "PK: LMO_CONFM_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LMO_CONFM_NO, CONFM_DT, BSSH_NM FROM I0130"
            ]
          }
        },
        {
          "id": "I2580",
          "name": "\uAC1C\uBCC4\uAE30\uC900\uADDC\uACA9 (I2580)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2580 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "INDV_SPEC_SEQ",
            "PRDLST_CD",
            "PRDLST_CD_NM",
            "TESTITM_CD",
            "TESTITM_NM",
            "FNPRT_ITM_NM",
            "ATTRB_SEQ",
            "PIAM_KOR_NM"
          ],
          "keys": [
            "INDV_SPEC_SEQ"
          ],
          "usageExample": "SELECT * FROM I2580 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC1C\uBCC4\uAE30\uC900\uADDC\uACA9 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "INDV_SPEC_SEQ",
              "PRDLST_CD",
              "PRDLST_CD_NM",
              "TESTITM_CD",
              "TESTITM_NM",
              "FNPRT_ITM_NM",
              "ATTRB_SEQ",
              "PIAM_KOR_NM",
              "SPEC_VAL",
              "SPEC_VAL_SUMUP",
              "VALD_BEGN_DT",
              "VALD_END_DT",
              "SORC",
              "VALD_MANLI",
              "JDGMNT_FOM_CD",
              "A079_FNPRT_CD_NM",
              "MXMM_VAL",
              "MXMM_VAL_DVS_CD",
              "A081_FNPRT_CD_NM",
              "MIMM_VAL",
              "MIMM_VAL_DVS_CD",
              "A080_FNPRT_CD_NM",
              "CHOIC_FIT",
              "A082_CF_FNPRT_CD_NM",
              "CHOIC_IMPROPT",
              "A082_CI_FNPRT_CD_NM",
              "MCRRGNSM_2N",
              "MCRRGNSM_2C",
              "MCRRGNSM_2M",
              "MCRRGNSM_3M",
              "FNPRT_ITM_INCLS_YN",
              "INJRY_YN",
              "EMPHS_PRSEC_TESTITM_YN",
              "MONTRNG_TESTITM_YN",
              "RVLV_ELSE_TESTITM_YN",
              "NTR_PRSEC_ITM_YN",
              "UNIT_CD",
              "UNIT_NM",
              "UPDT_PRVNS",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [
              "PK: INDV_SPEC_SEQ",
              "FK: TESTITM_CD -> I2530.TESTITM_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT INDV_SPEC_SEQ, PRDLST_CD, PRDLST_CD_NM FROM I2580"
            ]
          }
        },
        {
          "id": "I-0050",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uAC1C\uBCC4\uC778\uC815\uD615 \uC815\uBCF4 (I-0050)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I-0050 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "HF_FNCLTY_MTRAL_RCOGN_NO",
            "DAY_INTK_HIGHLIMIT",
            "DAY_INTK_LOWLIMIT",
            "WT_UNIT",
            "RAWMTRL_NM",
            "IFTKN_ATNT_MATR_CN",
            "PRIMARY_FNCLTY"
          ],
          "keys": [
            "HF_FNCLTY_MTRAL_RCOGN_NO"
          ],
          "usageExample": "SELECT * FROM I-0050 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uAC1C\uBCC4\uC778\uC815\uD615 \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "HF_FNCLTY_MTRAL_RCOGN_NO",
              "DAY_INTK_HIGHLIMIT",
              "DAY_INTK_LOWLIMIT",
              "WT_UNIT",
              "RAWMTRL_NM",
              "IFTKN_ATNT_MATR_CN",
              "PRIMARY_FNCLTY"
            ],
            "joinKeys": [
              "PK: HF_FNCLTY_MTRAL_RCOGN_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT HF_FNCLTY_MTRAL_RCOGN_NO, DAY_INTK_HIGHLIMIT, DAY_INTK_LOWLIMIT FROM I-0050"
            ]
          }
        },
        {
          "id": "I-0040",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uAE30\uB2A5\uC131 \uC6D0\uB8CC\uC778\uC815\uD604\uD669 (I-0040)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I-0040 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC601\uC591\xB7\uAC74\uAC15",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "HF_FNCLTY_MTRAL_RCOGN_NO",
            "PRMS_DT",
            "BSSH_NM",
            "INDUTY_NM",
            "ADDR",
            "APLC_RAWMTRL_NM",
            "FNCLTY_CN",
            "DAY_INTK_CN"
          ],
          "keys": [
            "HF_FNCLTY_MTRAL_RCOGN_NO"
          ],
          "usageExample": "SELECT * FROM I-0040 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uAE30\uB2A5\uC131 \uC6D0\uB8CC\uC778\uC815\uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "HF_FNCLTY_MTRAL_RCOGN_NO",
              "PRMS_DT",
              "BSSH_NM",
              "INDUTY_NM",
              "ADDR",
              "APLC_RAWMTRL_NM",
              "FNCLTY_CN",
              "DAY_INTK_CN",
              "IFTKN_ATNT_MATR_CN"
            ],
            "joinKeys": [
              "PK: HF_FNCLTY_MTRAL_RCOGN_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT HF_FNCLTY_MTRAL_RCOGN_NO, PRMS_DT, BSSH_NM FROM I-0040"
            ]
          }
        },
        {
          "id": "I0310",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uC0DD\uC0B0\uC2E4\uC801 \uBCF4\uACE0 \uD488\uBAA9 \uD604\uD669 (I0310)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0310 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "BSSH_NM",
            "PRDLST_NM",
            "GUBUN",
            "H_ITEM_NM",
            "LCNS_NO",
            "EVL_YR",
            "PRDLST_REPORT_NO",
            "FYER_PRDCTN_ABRT_QY"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM I0310 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uC0DD\uC0B0\uC2E4\uC801 \uBCF4\uACE0 \uD488\uBAA9 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSSH_NM",
              "PRDLST_NM",
              "GUBUN",
              "H_ITEM_NM",
              "LCNS_NO",
              "EVL_YR",
              "PRDLST_REPORT_NO",
              "FYER_PRDCTN_ABRT_QY",
              "PRDCTN_QY"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSSH_NM, PRDLST_NM, GUBUN FROM I0310"
            ]
          }
        },
        {
          "id": "I0760",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uC601\uC591DB (I0760)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0760 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC601\uC591\xB7\uAC74\uAC15",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uD5EC\uC2A4\uCF00\uC5B4 \uC571 \uAC1C\uBC1C\uC6A9",
          "includedData": [
            "HELT_ITM_GRP_CD",
            "HELT_ITM_GRP_NM",
            "LCLAS_CD",
            "LCLAS_NM",
            "MLSFC_CD",
            "MLSFC_NM",
            "SCLAS_CD",
            "SCLAS_NM"
          ],
          "keys": [
            "HELT_ITM_GRP_CD"
          ],
          "usageExample": "SELECT * FROM I0760 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uC601\uC591DB \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "HELT_ITM_GRP_CD",
              "HELT_ITM_GRP_NM",
              "LCLAS_CD",
              "LCLAS_NM",
              "MLSFC_CD",
              "MLSFC_NM",
              "SCLAS_CD",
              "SCLAS_NM"
            ],
            "joinKeys": [
              "PK: HELT_ITM_GRP_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT HELT_ITM_GRP_CD, HELT_ITM_GRP_NM, LCLAS_CD FROM I0760"
            ]
          }
        },
        {
          "id": "I-0020",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uC804\uBB38.\uBCA4\uCC98\uC81C\uC870\uC5C5\uC778\uD5C8\uAC00 \uD604\uD669 (I-0020)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I-0020 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "TELNO",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I-0020 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uC804\uBB38.\uBCA4\uCC98\uC81C\uC870\uC5C5\uC778\uD5C8\uAC00 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "TELNO",
              "LOCP_ADDR"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I-0020"
            ]
          }
        },
        {
          "id": "I2822",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uD3D0\uC5C5\uC815\uBCF4 (I2822)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2822 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2822 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2822"
            ]
          }
        },
        {
          "id": "I2710",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uD488\uBAA9\uBD84\uB958\uC815\uBCF4 (I2710)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2710 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRDCT_NM",
            "IFTKN_ATNT_MATR_CN",
            "PRIMARY_FNCLTY",
            "DAY_INTK_LOWLIMIT",
            "DAY_INTK_HIGHLIMIT",
            "INTK_UNIT",
            "INTK_MEMO",
            "SKLL_IX_IRDNT_RAWMTRL"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2710 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uD488\uBAA9\uBD84\uB958\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDCT_NM",
              "IFTKN_ATNT_MATR_CN",
              "PRIMARY_FNCLTY",
              "DAY_INTK_LOWLIMIT",
              "DAY_INTK_HIGHLIMIT",
              "INTK_UNIT",
              "INTK_MEMO",
              "SKLL_IX_IRDNT_RAWMTRL",
              "CRET_DTM",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDCT_NM, IFTKN_ATNT_MATR_CN, PRIMARY_FNCLTY FROM I2710"
            ]
          }
        },
        {
          "id": "I0030",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uD488\uBAA9\uC81C\uC870 \uC2E0\uACE0\uC0AC\uD56D \uD604\uD669 (I0030)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0030 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRDLST_REPORT_NO",
            "PRDLST_NM",
            "PRMS_DT",
            "POG_DAYCNT",
            "DISPOS",
            "NTK_MTHD"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I0030 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uD488\uBAA9\uC81C\uC870 \uC2E0\uACE0\uC0AC\uD56D \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRDLST_REPORT_NO",
              "PRDLST_NM",
              "PRMS_DT",
              "POG_DAYCNT",
              "DISPOS",
              "NTK_MTHD",
              "PRIMARY_FNCLTY",
              "IFTKN_ATNT_MATR_CN",
              "CSTDY_MTHD",
              "PRDLST_CDNM",
              "STDR_STND",
              "HIENG_LNTRT_DVS_NM",
              "PRODUCTION",
              "CHILD_CRTFC_YN",
              "PRDT_SHAP_CD_NM",
              "FRMLC_MTRQLT",
              "RAWMTRL_NM",
              "INDUTY_CD_NM",
              "LAST_UPDT_DTM",
              "INDIV_RAWMTRL_NM",
              "ETC_RAWMTRL_NM",
              "CAP_RAWMTRL_NM",
              "FRMLC_MTHD"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM I0030"
            ]
          }
        },
        {
          "id": "C003",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uD488\uBAA9\uC81C\uC870\uC2E0\uACE0(\uC6D0\uC7AC\uB8CC) (C003)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI C003 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRDLST_REPORT_NO",
            "PRDLST_NM",
            "PRMS_DT",
            "POG_DAYCNT",
            "DISPOS",
            "NTK_MTHD"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM C003 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uD488\uBAA9\uC81C\uC870\uC2E0\uACE0(\uC6D0\uC7AC\uB8CC) \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRDLST_REPORT_NO",
              "PRDLST_NM",
              "PRMS_DT",
              "POG_DAYCNT",
              "DISPOS",
              "NTK_MTHD",
              "PRIMARY_FNCLTY",
              "IFTKN_ATNT_MATR_CN",
              "CSTDY_MTHD",
              "SHAP",
              "STDR_STND",
              "RAWMTRL_NM",
              "CRET_DTM",
              "LAST_UPDT_DTM",
              "PRDT_SHAP_CD_NM"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM C003"
            ]
          }
        },
        {
          "id": "I0630",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488GMP \uC9C0\uC815 \uD604\uD669 (I0630)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0630 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9",
          "includedData": [
            "GMP_APPN_NO",
            "APPN_DT",
            "BSSH_NM",
            "LCNS_NO",
            "APPN_CANCL_DT",
            "INDUTY_CD_NM",
            "PRSDNT_NM"
          ],
          "keys": [
            "GMP_APPN_NO"
          ],
          "usageExample": "SELECT * FROM I0630 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488GMP \uC9C0\uC815 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "GMP_APPN_NO",
              "APPN_DT",
              "BSSH_NM",
              "LCNS_NO",
              "APPN_CANCL_DT",
              "INDUTY_CD_NM",
              "PRSDNT_NM"
            ],
            "joinKeys": [
              "PK: GMP_APPN_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT GMP_APPN_NO, APPN_DT, BSSH_NM FROM I0630"
            ]
          }
        },
        {
          "id": "I0960",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488\uACF5\uC804 (I0960)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0960 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRDLST_CD",
            "PC_KOR_NM",
            "TESTITM_CD",
            "T_KOR_NM",
            "FNPRT_ITM_NM",
            "SPEC_VAL",
            "SPEC_VAL_SUMUP",
            "VALD_BEGN_DT"
          ],
          "keys": [
            "TESTITM_CD"
          ],
          "usageExample": "SELECT * FROM I0960 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488\uACF5\uC804 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDLST_CD",
              "PC_KOR_NM",
              "TESTITM_CD",
              "T_KOR_NM",
              "FNPRT_ITM_NM",
              "SPEC_VAL",
              "SPEC_VAL_SUMUP",
              "VALD_BEGN_DT",
              "VALD_END_DT",
              "SORC",
              "MXMM_VAL",
              "MIMM_VAL",
              "INJRY_YN",
              "UNIT_NM"
            ],
            "joinKeys": [
              "PK: TESTITM_CD",
              "FK: TESTITM_CD -> I2530.TESTITM_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDLST_CD, PC_KOR_NM, TESTITM_CD FROM I0960"
            ]
          }
        },
        {
          "id": "I2860",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488\uC5C5\uC18C \uC778\uD5C8\uAC00 \uBCC0\uACBD \uC815\uBCF4 (I2860)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2860 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "BSSH_NM",
            "INDUTY_CD_NM",
            "LCNS_NO",
            "TELNO",
            "SITE_ADDR",
            "CHNG_DT",
            "CHNG_BF_CN",
            "CHNG_AF_CN"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2860 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488\uC5C5\uC18C \uC778\uD5C8\uAC00 \uBCC0\uACBD \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSSH_NM",
              "INDUTY_CD_NM",
              "LCNS_NO",
              "TELNO",
              "SITE_ADDR",
              "CHNG_DT",
              "CHNG_BF_CN",
              "CHNG_AF_CN",
              "CHNG_PRVNS"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSSH_NM, INDUTY_CD_NM, LCNS_NO FROM I2860"
            ]
          }
        },
        {
          "id": "I2839",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488\uC81C\uC870\uC5C5, \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488\uD310\uB9E4\uC5C5 \uC9C0\uB3C4\uB2E8\uC18D\uACC4\uD68D \uBC0F \uC2E4\uC801\uD604\uD669 (I2839)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2839 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PLAN_CLCD",
            "CHCK_BGNDT",
            "CHCK_ENDDT",
            "EXC_INSTTCD",
            "BSSH_NM",
            "GIDCHCK_DT",
            "BLDINSCTR_NAME",
            "GIDCHCK_RSLTCD"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2839 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488\uC81C\uC870\uC5C5, \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488\uD310\uB9E4\uC5C5 \uC9C0\uB3C4\uB2E8\uC18D\uACC4\uD68D \uBC0F \uC2E4\uC801\uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PLAN_CLCD",
              "CHCK_BGNDT",
              "CHCK_ENDDT",
              "EXC_INSTTCD",
              "BSSH_NM",
              "GIDCHCK_DT",
              "BLDINSCTR_NAME",
              "GIDCHCK_RSLTCD",
              "PLAN_TITL"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PLAN_CLCD, CHCK_BGNDT, CHCK_ENDDT FROM I2839"
            ]
          }
        },
        {
          "id": "I1290",
          "name": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488\uD310\uB9E4\uC5C5 (I1290)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1290 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "TELNO",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1290 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488\uD310\uB9E4\uC5C5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "TELNO",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1290"
            ]
          }
        },
        {
          "id": "I2640",
          "name": "\uAC80\uC0AC\uBD80\uC801\uD569 \uD604\uD669(\uB18D\uC0B0\uBB3C) (I2640)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2640 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC548\uC804\uAD00\uB9AC\xB7\uC810\uAC80",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRDTNM",
            "BSSHNM",
            "MNFDT",
            "DISTBTMLMT",
            "ADDR",
            "INSTT_NM",
            "REGSTR_TELNO",
            "BRCDNO"
          ],
          "keys": [
            "RTRVLDSUSE_SEQ"
          ],
          "usageExample": "SELECT * FROM I2640 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC80\uC0AC\uBD80\uC801\uD569 \uD604\uD669(\uB18D\uC0B0\uBB3C) \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDTNM",
              "BSSHNM",
              "MNFDT",
              "DISTBTMLMT",
              "ADDR",
              "INSTT_NM",
              "REGSTR_TELNO",
              "BRCDNO",
              "FRMLCUNIT",
              "TEST_ITMNM",
              "STDR_STND",
              "TESTANALS_RSLT",
              "CRET_DTM",
              "RTRVLDSUSE_SEQ",
              "LCNS_NO",
              "REPORTR_TELNO"
            ],
            "joinKeys": [
              "PK: RTRVLDSUSE_SEQ"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDTNM, BSSHNM, MNFDT FROM I2640"
            ]
          }
        },
        {
          "id": "I2620",
          "name": "\uAC80\uC0AC\uBD80\uC801\uD569(\uAD6D\uB0B4) (I2620)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2620 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC548\uC804\uAD00\uB9AC\xB7\uC810\uAC80",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRDTNM",
            "BSSHNM",
            "MNFDT",
            "DISTBTMLMT",
            "ADDR",
            "INSTT_NM",
            "REGSTR_TELNO",
            "BRCDNO"
          ],
          "keys": [
            "RTRVLDSUSE_SEQ"
          ],
          "usageExample": "SELECT * FROM I2620 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAC80\uC0AC\uBD80\uC801\uD569(\uAD6D\uB0B4) \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDTNM",
              "BSSHNM",
              "MNFDT",
              "DISTBTMLMT",
              "ADDR",
              "INSTT_NM",
              "REGSTR_TELNO",
              "BRCDNO",
              "FRMLCUNIT",
              "TEST_ITMNM",
              "STDR_STND",
              "TESTANALS_RSLT",
              "CRET_DTM",
              "RTRVLDSUSE_SEQ",
              "PRDLST_REPORT_NO",
              "LCNS_NO",
              "REPORTR_TELNO",
              "PRDLST_CD_NM"
            ],
            "joinKeys": [
              "PK: RTRVLDSUSE_SEQ"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDTNM, BSSHNM, MNFDT FROM I2620"
            ]
          }
        },
        {
          "id": "I2857",
          "name": "\uACF5\uC720\uC8FC\uBC29\uC6B4\uC601\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 (I2857)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2857 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "TELNO",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2857 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uACF5\uC720\uC8FC\uBC29\uC6B4\uC601\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "TELNO",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO",
              "FK: LCNS_NO -> I2500.LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2857"
            ]
          }
        },
        {
          "id": "I2600",
          "name": "\uACF5\uD1B5\uAE30\uC900\uADDC\uACA9 (I2600)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2600 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "CMMN_SPEC_SEQ",
            "CMMN_SPEC_CD",
            "SPEC_NM",
            "PRDLST_CD",
            "PRDLST_CD_NM",
            "TESTITM_CD",
            "TESTITM_NM",
            "FNPRT_ITM_NM"
          ],
          "keys": [
            "CMMN_SPEC_SEQ"
          ],
          "usageExample": "SELECT * FROM I2600 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uACF5\uD1B5\uAE30\uC900\uADDC\uACA9 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "CMMN_SPEC_SEQ",
              "CMMN_SPEC_CD",
              "SPEC_NM",
              "PRDLST_CD",
              "PRDLST_CD_NM",
              "TESTITM_CD",
              "TESTITM_NM",
              "FNPRT_ITM_NM",
              "ATTRB_SEQ",
              "PIAM_KOR_NM",
              "SPEC_VAL",
              "SPEC_VAL_SUMUP",
              "VALD_BEGN_DT",
              "VALD_END_DT",
              "SORC",
              "VALD_MANLI",
              "JDGMNT_FOM_CD",
              "A079_FNPRT_CD_NM",
              "MXMM_VAL",
              "MXMM_VAL_DVS_CD",
              "A081_FNPRT_CD_NM",
              "MIMM_VAL",
              "MIMM_VAL_DVS_CD",
              "A080_FNPRT_CD_NM",
              "CHOIC_FIT",
              "A082_CF_FNPRT_CD_NM",
              "CHOIC_IMPROPT",
              "A082_CI_FNPRT_CD_NM",
              "MCRRGNSM_2N",
              "MCRRGNSM_2C",
              "MCRRGNSM_2M",
              "MCRRGNSM_3M",
              "FNPRT_ITM_INCLS_YN",
              "INJRY_YN",
              "EMPHS_PRSEC_TESTITM_YN",
              "MONTRNG_TESTITM_YN",
              "RVLV_ELSE_TESTITM_YN",
              "NTR_PRSEC_ITM_YN",
              "UNIT_CD",
              "UNIT_NM",
              "UPDT_PRVNS",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [
              "PK: CMMN_SPEC_SEQ",
              "FK: TESTITM_CD -> I2530.TESTITM_CD",
              "FK: PRDLST_CD -> I2510.PRDLST_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT CMMN_SPEC_SEQ, CMMN_SPEC_CD, SPEC_NM FROM I2600"
            ]
          }
        },
        {
          "id": "I2610",
          "name": "\uACF5\uD1B5\uAE30\uC900\uC81C\uC678 (I2610)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2610 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "CMMN_SPEC_CD",
            "SPEC_NM",
            "PRDLST_CD",
            "KOR_NM",
            "TESTITM_CD",
            "LAST_UPDT_DTM"
          ],
          "keys": [
            "PRDLST_CD",
            "TESTITM_CD"
          ],
          "usageExample": "SELECT * FROM I2610 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uACF5\uD1B5\uAE30\uC900\uC81C\uC678 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "CMMN_SPEC_CD",
              "SPEC_NM",
              "PRDLST_CD",
              "KOR_NM",
              "TESTITM_CD",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [
              "PK: PRDLST_CD",
              "PK: TESTITM_CD",
              "FK: TESTITM_CD -> I2530.TESTITM_CD",
              "FK: PRDLST_CD -> I2510.PRDLST_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT CMMN_SPEC_CD, SPEC_NM, PRDLST_CD FROM I2610"
            ]
          }
        },
        {
          "id": "I2590",
          "name": "\uACF5\uD1B5\uAE30\uC900\uC885\uB958 (I2590)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2590 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "CMMN_SPEC_CD",
            "SPEC_NM",
            "HRNK_CMMN_SPEC_CD",
            "LV",
            "DFN",
            "USE_YN",
            "LAST_UPDT_DTM"
          ],
          "keys": [
            "CMMN_SPEC_CD"
          ],
          "usageExample": "SELECT * FROM I2590 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uACF5\uD1B5\uAE30\uC900\uC885\uB958 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "CMMN_SPEC_CD",
              "SPEC_NM",
              "HRNK_CMMN_SPEC_CD",
              "LV",
              "DFN",
              "USE_YN",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [
              "PK: CMMN_SPEC_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT CMMN_SPEC_CD, SPEC_NM, HRNK_CMMN_SPEC_CD FROM I2590"
            ]
          }
        },
        {
          "id": "I1660",
          "name": "\uACFC\uC9D5\uAE08\uBD80\uACFC\uAE30\uC900 (I1660)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1660 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "DSPS_STDR_CD_NM",
            "LAWORD_CD_NM",
            "BASIS_LAWORD",
            "VILT_TYPE_NM",
            "LV_NO",
            "VALD_BGN_DT",
            "VALD_END_DT"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1660 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uACFC\uC9D5\uAE08\uBD80\uACFC\uAE30\uC900 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "DSPS_STDR_CD_NM",
              "LAWORD_CD_NM",
              "BASIS_LAWORD",
              "VILT_TYPE_NM",
              "LV_NO",
              "VALD_BGN_DT",
              "VALD_END_DT"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT DSPS_STDR_CD_NM, LAWORD_CD_NM, BASIS_LAWORD FROM I1660"
            ]
          }
        },
        {
          "id": "I1670",
          "name": "\uACFC\uD0DC\uB8CC\uBD80\uACFC\uAE30\uC900 (I1670)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1670 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "DSPS_STDR_CD",
            "DSPS_STDR_CD_NM",
            "LV_NO",
            "BASIS_LAWORD",
            "VILT_TYPE_NM",
            "VALD_BGN_DT",
            "VALD_END_DT"
          ],
          "keys": [
            "DSPS_STDR_CD"
          ],
          "usageExample": "SELECT * FROM I1670 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uACFC\uD0DC\uB8CC\uBD80\uACFC\uAE30\uC900 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "DSPS_STDR_CD",
              "DSPS_STDR_CD_NM",
              "LV_NO",
              "BASIS_LAWORD",
              "VILT_TYPE_NM",
              "VALD_BGN_DT",
              "VALD_END_DT"
            ],
            "joinKeys": [
              "PK: DSPS_STDR_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT DSPS_STDR_CD, DSPS_STDR_CD_NM, LV_NO FROM I1670"
            ]
          }
        },
        {
          "id": "I0910",
          "name": "\uAD6D\uC678\uAC80\uC0AC\uAE30\uAD00 \uC778\uC815 \uD604\uD669 (I0910)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0910 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC548\uC804\uAD00\uB9AC\xB7\uC810\uAC80",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRSEC_INSTT_RCOGN_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "APPN_BGN_DT",
            "PRSEC_ITM_CD_NM",
            "TELNO",
            "BSSH_ADDR"
          ],
          "keys": [
            "PRSEC_INSTT_RCOGN_NO"
          ],
          "usageExample": "SELECT * FROM I0910 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAD6D\uC678\uAC80\uC0AC\uAE30\uAD00 \uC778\uC815 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRSEC_INSTT_RCOGN_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "APPN_BGN_DT",
              "PRSEC_ITM_CD_NM",
              "TELNO",
              "BSSH_ADDR"
            ],
            "joinKeys": [
              "PK: PRSEC_INSTT_RCOGN_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRSEC_INSTT_RCOGN_NO, BSSH_NM, PRSDNT_NM FROM I0910"
            ]
          }
        },
        {
          "id": "I0990",
          "name": "\uAE30\uAD6C \uBC0F \uC6A9\uAE30.\uD3EC\uC7A5\uC758 \uD55C\uC2DC\uC801 \uAE30\uC900 \uBC0F \uADDC\uACA9 \uC778\uC815 \uD604\uD669 (I0990)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0990 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LIMIT_STDR_STND_RCOGN_NO",
            "RCOGN_DT",
            "BSSH_NM",
            "PRSDNT_NM",
            "TELNO",
            "MC_NM",
            "PRDT_NM",
            "MC_NATN_CD_NM"
          ],
          "keys": [
            "LIMIT_STDR_STND_RCOGN_NO"
          ],
          "usageExample": "SELECT * FROM I0990 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAE30\uAD6C \uBC0F \uC6A9\uAE30.\uD3EC\uC7A5\uC758 \uD55C\uC2DC\uC801 \uAE30\uC900 \uBC0F \uADDC\uACA9 \uC778\uC815 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LIMIT_STDR_STND_RCOGN_NO",
              "RCOGN_DT",
              "BSSH_NM",
              "PRSDNT_NM",
              "TELNO",
              "MC_NM",
              "PRDT_NM",
              "MC_NATN_CD_NM"
            ],
            "joinKeys": [
              "PK: LIMIT_STDR_STND_RCOGN_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LIMIT_STDR_STND_RCOGN_NO, RCOGN_DT, BSSH_NM FROM I0990"
            ]
          }
        },
        {
          "id": "I1240",
          "name": "\uAE30\uAD6C.\uC6A9\uAE30\uD3EC\uC7A5\uC81C\uC870\uC5C5 (I1240)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1240 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "TELNO",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1240 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAE30\uAD6C.\uC6A9\uAE30\uD3EC\uC7A5\uC81C\uC870\uC5C5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "TELNO",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1240"
            ]
          }
        },
        {
          "id": "I1100",
          "name": "\uAE30\uAD6C\uB4F1\uC758 \uC0B4\uADE0\uC18C\uB3C5\uC81C \uAE30\uC900\uADDC\uACA9 (I1100)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1100 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 0\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 0,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PC_KOR_NM",
            "T_KOR_NM",
            "FNPRT_ITM_NM",
            "PIAM_KOR_NM",
            "SPEC_VAL",
            "SPEC_VAL_SUMUP",
            "VALD_BEGN_DT",
            "VALD_END_DT"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1100 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAE30\uAD6C\uB4F1\uC758 \uC0B4\uADE0\uC18C\uB3C5\uC81C \uAE30\uC900\uADDC\uACA9 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PC_KOR_NM",
              "T_KOR_NM",
              "FNPRT_ITM_NM",
              "PIAM_KOR_NM",
              "SPEC_VAL",
              "SPEC_VAL_SUMUP",
              "VALD_BEGN_DT",
              "VALD_END_DT",
              "SORC",
              "MXMM_VAL",
              "MIMM_VAL",
              "INJRY_YN",
              "UNIT_NM",
              "UPDT_PRVNS",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PC_KOR_NM, T_KOR_NM, FNPRT_ITM_NM FROM I1100"
            ]
          }
        },
        {
          "id": "I1010",
          "name": "\uAE30\uAD6C\uB4F1\uC758 \uC0B4\uADE0\uC18C\uB3C5\uC81C \uD55C\uC2DC\uC801 \uAE30\uC900 \uBC0F \uADDC\uACA9 \uC778\uC815 \uD604\uD669 (I1010)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1010 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 2\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 2,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LIMIT_STDR_STND_RCOGN_NO",
            "RCOGN_DT",
            "BSSH_NM",
            "PRSDNT_NM",
            "TELNO",
            "MC_NM",
            "PRDT_NM",
            "MC_NATN_CD_NM"
          ],
          "keys": [
            "LIMIT_STDR_STND_RCOGN_NO"
          ],
          "usageExample": "SELECT * FROM I1010 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uAE30\uAD6C\uB4F1\uC758 \uC0B4\uADE0\uC18C\uB3C5\uC81C \uD55C\uC2DC\uC801 \uAE30\uC900 \uBC0F \uADDC\uACA9 \uC778\uC815 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LIMIT_STDR_STND_RCOGN_NO",
              "RCOGN_DT",
              "BSSH_NM",
              "PRSDNT_NM",
              "TELNO",
              "MC_NM",
              "PRDT_NM",
              "MC_NATN_CD_NM"
            ],
            "joinKeys": [
              "PK: LIMIT_STDR_STND_RCOGN_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LIMIT_STDR_STND_RCOGN_NO, RCOGN_DT, BSSH_NM FROM I1010"
            ]
          }
        },
        {
          "id": "I2847",
          "name": "\uB098\uD2B8\uB968 \uC904\uC774\uAE30 \uC2E4\uCC9C\uC74C\uC2DD\uC810 \uC9C0\uC815\uC5C5\uCCB4 \uB300\uC7A5 (I2847)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2847 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uCC3D\uC5C5 \uC0C1\uAD8C \uBD84\uC11D\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "INDUTY_CD_NM",
            "SITE_ADDR",
            "APPT_YMD",
            "ETC_INFO",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2847 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uB098\uD2B8\uB968 \uC904\uC774\uAE30 \uC2E4\uCC9C\uC74C\uC2DD\uC810 \uC9C0\uC815\uC5C5\uCCB4 \uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "INDUTY_CD_NM",
              "SITE_ADDR",
              "APPT_YMD",
              "ETC_INFO",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, INDUTY_CD_NM FROM I2847"
            ]
          }
        },
        {
          "id": "I1870",
          "name": "\uB18D\uC0B0\uBB3C \uC548\uC804\uC131\uAC80\uC0AC\uAE30\uAD00 \uC815\uBCF4 (I1870)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1870 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC548\uC804\uAD00\uB9AC\xB7\uC810\uAC80",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "APPN_NO",
            "APPN_DT",
            "APPN_INSTT_NM",
            "PRSEC_INSTT_LOCPLC",
            "PRSEC_WORK_SCOPE",
            "HRMF_MTTR_ITM",
            "TELNO"
          ],
          "keys": [
            "APPN_NO"
          ],
          "usageExample": "SELECT * FROM I1870 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uB18D\uC0B0\uBB3C \uC548\uC804\uC131\uAC80\uC0AC\uAE30\uAD00 \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "APPN_NO",
              "APPN_DT",
              "APPN_INSTT_NM",
              "PRSEC_INSTT_LOCPLC",
              "PRSEC_WORK_SCOPE",
              "HRMF_MTTR_ITM",
              "TELNO"
            ],
            "joinKeys": [
              "PK: APPN_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT APPN_NO, APPN_DT, APPN_INSTT_NM FROM I1870"
            ]
          }
        },
        {
          "id": "I1790",
          "name": "\uB18D\uC0B0\uBB3C\uC774\uB825\uCD94\uC801 \uC0DD\uC0B0\uC815\uBCF4 (I1790)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1790 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "HIST_TRACE_REG_NO",
            "REG_INSTT_NM",
            "RPRSNT_PRDLST_NM",
            "PRSDNT_NM",
            "ORGN_NM",
            "VALD_PRICE_BGN_DT",
            "VALD_PRICE_END_DT"
          ],
          "keys": [
            "HIST_TRACE_REG_NO"
          ],
          "usageExample": "SELECT * FROM I1790 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uB18D\uC0B0\uBB3C\uC774\uB825\uCD94\uC801 \uC0DD\uC0B0\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "HIST_TRACE_REG_NO",
              "REG_INSTT_NM",
              "RPRSNT_PRDLST_NM",
              "PRSDNT_NM",
              "ORGN_NM",
              "VALD_PRICE_BGN_DT",
              "VALD_PRICE_END_DT"
            ],
            "joinKeys": [
              "PK: HIST_TRACE_REG_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT HIST_TRACE_REG_NO, REG_INSTT_NM, RPRSNT_PRDLST_NM FROM I1790"
            ]
          }
        },
        {
          "id": "I1800",
          "name": "\uB18D\uC0B0\uBB3C\uC774\uB825\uCD94\uC801 \uC720\uD1B5\uC815\uBCF4 (I1800)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1800 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "HIST_TRACE_REG_NO",
            "GRP_NM",
            "PRSDNT_NM",
            "TELNO"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1800 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uB18D\uC0B0\uBB3C\uC774\uB825\uCD94\uC801 \uC720\uD1B5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "HIST_TRACE_REG_NO",
              "GRP_NM",
              "PRSDNT_NM",
              "TELNO"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT HIST_TRACE_REG_NO, GRP_NM, PRSDNT_NM FROM I1800"
            ]
          }
        },
        {
          "id": "I1910",
          "name": "\uB18D\uC57D \uB4F1\uB85D\uC815\uBCF4 (I1910)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1910 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uC720\uD574\uBB3C\uC9C8 \uAC80\uCD9C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRDLST_KOR_NM",
            "PRDLST_ENG_NM",
            "BRND_NM",
            "AGCHM_PRDLST_NO",
            "PRDLST_REG_NO",
            "MDC_SHAP_NM",
            "AGCHM_DVS_NM",
            "PRPOS_DVS_CD_NM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1910 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uB18D\uC57D \uB4F1\uB85D\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDLST_KOR_NM",
              "PRDLST_ENG_NM",
              "BRND_NM",
              "AGCHM_PRDLST_NO",
              "PRDLST_REG_NO",
              "MDC_SHAP_NM",
              "AGCHM_DVS_NM",
              "PRPOS_DVS_CD_NM",
              "SICKNS_HLSCT_NM_WEEDS_NM",
              "CROPS_NM",
              "AGCHM_USE_MTHD",
              "USE_PPRTM",
              "DILU_DRNG",
              "USE_QTY",
              "USE_UNIT",
              "USE_TMNO",
              "BUSS_REG_NO",
              "BUSS_REG_EVNT_NM",
              "CPR_NM",
              "PRSDNT_NM",
              "ADDR",
              "MNF_INCM_DVS_NM",
              "PRDLST_REG_VALD_DT",
              "PRDLST_REG_DT",
              "TEST_DRGS_NM",
              "PRDLST_REG_STND",
              "REG_YN_NM",
              "PERSN_LVSTCK_TOXCTY",
              "ECLGY_TOXCTY"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDLST_KOR_NM, PRDLST_ENG_NM, BRND_NM FROM I1910"
            ]
          }
        },
        {
          "id": "I1040",
          "name": "\uB18D\uC57D\uC794\uB958\uD5C8\uC6A9\uAE30\uC900 (I1040)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1040 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uC720\uD574\uBB3C\uC9C8 \uAC80\uCD9C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "AGCHM_KOR_NM",
            "FOOD_KOR_NM",
            "OPERTN_CITYPOINT",
            "STEP",
            "MRL_VAL",
            "DSUSE_YN"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1040 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uB18D\uC57D\uC794\uB958\uD5C8\uC6A9\uAE30\uC900 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "AGCHM_KOR_NM",
              "FOOD_KOR_NM",
              "OPERTN_CITYPOINT",
              "STEP",
              "MRL_VAL",
              "DSUSE_YN"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT AGCHM_KOR_NM, FOOD_KOR_NM, OPERTN_CITYPOINT FROM I1040"
            ]
          }
        },
        {
          "id": "I1850",
          "name": "\uB18D\uCD95\uC0B0\uBB3C\uC720\uD1B5\uAD00\uB9AC \uD5C8\uC704\uD45C\uC2DC\uACF5\uD45C\uC815\uBCF4 (I1850)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1850 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "BSN_KND_NM",
            "ENTRPS_NM",
            "ENTRPS_BASS_ADDR",
            "VILT_DTLS",
            "PUBLC_BGN_DT",
            "PUBLC_END_DT"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1850 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uB18D\uCD95\uC0B0\uBB3C\uC720\uD1B5\uAD00\uB9AC \uD5C8\uC704\uD45C\uC2DC\uACF5\uD45C\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSN_KND_NM",
              "ENTRPS_NM",
              "ENTRPS_BASS_ADDR",
              "VILT_DTLS",
              "PUBLC_BGN_DT",
              "PUBLC_END_DT"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSN_KND_NM, ENTRPS_NM, ENTRPS_BASS_ADDR FROM I1850"
            ]
          }
        },
        {
          "id": "I1860",
          "name": "\uB18D\uCD95\uC0B0\uBB3C\uC720\uD1B5\uAD00\uB9AC \uD5C8\uC704\uD45C\uC2DC\uD488\uBAA9\uC815\uBCF4 (I1860)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1860 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "BSN_KND_NM",
            "ENTRPS_NM",
            "ENTRPS_BASS_ADDR",
            "VILT_DTLS",
            "PUBLC_BGN_DT",
            "PUBLC_END_DT",
            "VILT_CN",
            "DSPS_CN"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1860 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uB18D\uCD95\uC0B0\uBB3C\uC720\uD1B5\uAD00\uB9AC \uD5C8\uC704\uD45C\uC2DC\uD488\uBAA9\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSN_KND_NM",
              "ENTRPS_NM",
              "ENTRPS_BASS_ADDR",
              "VILT_DTLS",
              "PUBLC_BGN_DT",
              "PUBLC_END_DT",
              "VILT_CN",
              "DSPS_CN",
              "PRDLST_NM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSN_KND_NM, ENTRPS_NM, ENTRPS_BASS_ADDR FROM I1860"
            ]
          }
        },
        {
          "id": "I2858",
          "name": "\uB3C4\uCD95\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 (I2858)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2858 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2858 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uB3C4\uCD95\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO",
              "FK: LCNS_NO -> I2500.LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2858"
            ]
          }
        },
        {
          "id": "I1070",
          "name": "\uB3D9\uBB3C\uC6A9\uC758\uC57D\uD488 \uD604\uD669 (I1070)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1070 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "ANIMAL_ONLY_MDCIN_NM_KOR",
            "ANIMAL_ONLY_MDCIN_NM_ENG",
            "APPLC_OBJ_ANIMAL",
            "MCFRL",
            "MCWGH",
            "SYSTM_NM",
            "IUPAC_NM",
            "CAS_NM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1070 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uB3D9\uBB3C\uC6A9\uC758\uC57D\uD488 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "ANIMAL_ONLY_MDCIN_NM_KOR",
              "ANIMAL_ONLY_MDCIN_NM_ENG",
              "APPLC_OBJ_ANIMAL",
              "MCFRL",
              "MCWGH",
              "SYSTM_NM",
              "IUPAC_NM",
              "CAS_NM",
              "SHAP_NM",
              "POIOF",
              "BOILPNT",
              "STEPR",
              "LOGPOW",
              "DENS_UNIT",
              "PKA",
              "SOLUB",
              "STBLY"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT ANIMAL_ONLY_MDCIN_NM_KOR, ANIMAL_ONLY_MDCIN_NM_ENG, APPLC_OBJ_ANIMAL FROM I1070"
            ]
          }
        },
        {
          "id": "I1080",
          "name": "\uB3D9\uBB3C\uC758\uC57D\uD488\uBCC4 \uC794\uB958\uD5C8\uC6A9 \uAE30\uC900 (I1080)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1080 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "CDX_KOREA_DVS_CD",
            "ANIMAL_ONLY_MDCIN_NM_KOR",
            "OPERTN_CITYPOINT",
            "STEP",
            "MRL",
            "FOOD_KOR_NM",
            "FOOD_ENG_NM",
            "ETC_YN"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1080 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uB3D9\uBB3C\uC758\uC57D\uD488\uBCC4 \uC794\uB958\uD5C8\uC6A9 \uAE30\uC900 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "CDX_KOREA_DVS_CD",
              "ANIMAL_ONLY_MDCIN_NM_KOR",
              "OPERTN_CITYPOINT",
              "STEP",
              "MRL",
              "FOOD_KOR_NM",
              "FOOD_ENG_NM",
              "ETC_YN",
              "TMPR_STDR_APPLC_YN",
              "DSUSE_YN"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT CDX_KOREA_DVS_CD, ANIMAL_ONLY_MDCIN_NM_KOR, OPERTN_CITYPOINT FROM I1080"
            ]
          }
        },
        {
          "id": "I2410",
          "name": "\uBB3C\uD658\uACBD \uC218\uC9C8\uC815\uBCF4 (I2410)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2410 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "EXAM_ARA_NM",
            "ABL_YN",
            "PRSEC_DT",
            "WATSA_DT",
            "WATSA_TM",
            "MESURE_DP",
            "TEMOD",
            "FLUX"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2410 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uBB3C\uD658\uACBD \uC218\uC9C8\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "EXAM_ARA_NM",
              "ABL_YN",
              "PRSEC_DT",
              "WATSA_DT",
              "WATSA_TM",
              "MESURE_DP",
              "TEMOD",
              "FLUX",
              "PH",
              "BOD",
              "COD",
              "SS",
              "EEC_QTY",
              "TN",
              "TP",
              "DOC",
              "EC",
              "TOC"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT EXAM_ARA_NM, ABL_YN, PRSEC_DT FROM I2410"
            ]
          }
        },
        {
          "id": "C005",
          "name": "\uBC14\uCF54\uB4DC\uC5F0\uACC4\uC81C\uD488\uC815\uBCF4 (C005)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI C005 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRDLST_REPORT_NO",
            "PRMS_DT",
            "END_DT",
            "PRDLST_NM",
            "POG_DAYCNT",
            "PRDLST_DCNM",
            "BSSH_NM",
            "INDUTY_NM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM C005 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uBC14\uCF54\uB4DC\uC5F0\uACC4\uC81C\uD488\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDLST_REPORT_NO",
              "PRMS_DT",
              "END_DT",
              "PRDLST_NM",
              "POG_DAYCNT",
              "PRDLST_DCNM",
              "BSSH_NM",
              "INDUTY_NM",
              "SITE_ADDR",
              "CLSBIZ_DT",
              "BAR_CD"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDLST_REPORT_NO, PRMS_DT, END_DT FROM C005"
            ]
          }
        },
        {
          "id": "I1030",
          "name": "\uBC29\uC0AC\uC120\uC870\uC0AC\uC2DD\uD488 \uD488\uBAA9 \uC778\uC815 \uD604\uD669 (I1030)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1030 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "SPEC_NM",
            "PC_KOR_NM",
            "T_KOR_NM",
            "PIAM_KOR_NM",
            "SPEC_VAL",
            "SPEC_VAL_SUMUP",
            "VALD_BEGN_DT",
            "VALD_END_DT"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1030 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uBC29\uC0AC\uC120\uC870\uC0AC\uC2DD\uD488 \uD488\uBAA9 \uC778\uC815 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "SPEC_NM",
              "PC_KOR_NM",
              "T_KOR_NM",
              "PIAM_KOR_NM",
              "SPEC_VAL",
              "SPEC_VAL_SUMUP",
              "VALD_BEGN_DT",
              "VALD_END_DT",
              "SORC",
              "MXMM_VAL",
              "MIMM_VAL",
              "UNIT_NM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT SPEC_NM, PC_KOR_NM, T_KOR_NM FROM I1030"
            ]
          }
        },
        {
          "id": "I2540",
          "name": "\uBC95\uB839\uCF54\uB4DC (I2540)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2540 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "FOOD_LAWORD_CD",
            "HRNK_LAWORD_CD",
            "WORK_REALM_CD_NM",
            "LAWORD_CD_NM",
            "ALL_LAWORD_CD_NM",
            "LV_NO",
            "USE_YN",
            "VALD_BGN_DT"
          ],
          "keys": [
            "FOOD_LAWORD_CD"
          ],
          "usageExample": "SELECT * FROM I2540 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uBC95\uB839\uCF54\uB4DC \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "FOOD_LAWORD_CD",
              "HRNK_LAWORD_CD",
              "WORK_REALM_CD_NM",
              "LAWORD_CD_NM",
              "ALL_LAWORD_CD_NM",
              "LV_NO",
              "USE_YN",
              "VALD_BGN_DT",
              "VALD_END_DT",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [
              "PK: FOOD_LAWORD_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT FOOD_LAWORD_CD, HRNK_LAWORD_CD, WORK_REALM_CD_NM FROM I2540"
            ]
          }
        },
        {
          "id": "I2381",
          "name": "\uC0C1\uC218\uB3C4 \uC218\uC9C8\uC815\uBCF4 (I2381)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2381 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "FCLTY_NM",
            "FCLTY_LOC",
            "PRSEC_YR",
            "PRSEC_MM",
            "PICK_DT",
            "PRSEC_ITM_NM",
            "MESURE_VAL",
            "UNIT_NM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2381 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC0C1\uC218\uB3C4 \uC218\uC9C8\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "FCLTY_NM",
              "FCLTY_LOC",
              "PRSEC_YR",
              "PRSEC_MM",
              "PICK_DT",
              "PRSEC_ITM_NM",
              "MESURE_VAL",
              "UNIT_NM",
              "DCMLPOINT",
              "EXCS_YN"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT FCLTY_NM, FCLTY_LOC, PRSEC_YR FROM I2381"
            ]
          }
        },
        {
          "id": "I2852",
          "name": "\uC0DD\uC0B0\uC911\uB2E8\uC81C\uD488\uC815\uBCF4 (I2852)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2852 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRDLST_REPORT_NO",
            "PRMS_DT",
            "PRDLST_NM",
            "END_DT",
            "PRDLST_DCNM",
            "LCNS_NO",
            "BSSH_NM",
            "FOOD_HF_LS_CL_CD_NM"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM I2852 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC0DD\uC0B0\uC911\uB2E8\uC81C\uD488\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDLST_REPORT_NO",
              "PRMS_DT",
              "PRDLST_NM",
              "END_DT",
              "PRDLST_DCNM",
              "LCNS_NO",
              "BSSH_NM",
              "FOOD_HF_LS_CL_CD_NM",
              "ARTCL_END_WHY"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDLST_REPORT_NO, PRMS_DT, PRDLST_NM FROM I2852"
            ]
          }
        },
        {
          "id": "I1830",
          "name": "\uC1E0\uACE0\uAE30(\uAD6D\uB0B4)\uC774\uB825\uCD94\uC801 \uAC00\uACF5\uAD00\uB9AC (I1830)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1830 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "ENTTY_IDNTFC_NO",
            "PRCSS_PLC_CD",
            "PRCSS_DT",
            "PRCSS_PLC_NM"
          ],
          "keys": [
            "ENTTY_IDNTFC_NO"
          ],
          "usageExample": "SELECT * FROM I1830 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC1E0\uACE0\uAE30(\uAD6D\uB0B4)\uC774\uB825\uCD94\uC801 \uAC00\uACF5\uAD00\uB9AC \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "ENTTY_IDNTFC_NO",
              "PRCSS_PLC_CD",
              "PRCSS_DT",
              "PRCSS_PLC_NM"
            ],
            "joinKeys": [
              "PK: ENTTY_IDNTFC_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT ENTTY_IDNTFC_NO, PRCSS_PLC_CD, PRCSS_DT FROM I1830"
            ]
          }
        },
        {
          "id": "I1810",
          "name": "\uC1E0\uACE0\uAE30(\uAD6D\uB0B4)\uC774\uB825\uCD94\uC801 \uC0DD\uC0B0\uC815\uBCF4 (I1810)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1810 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "ENTTY_IDNTFC_NO",
            "BRTH_DT",
            "ENTTY_STATS_NM",
            "COW_KND_NM",
            "GND_NM",
            "FMH_NM",
            "VACIN_LAST_INOCL_DT",
            "VACIN_LAST_INOCL_OPNO"
          ],
          "keys": [
            "ENTTY_IDNTFC_NO"
          ],
          "usageExample": "SELECT * FROM I1810 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC1E0\uACE0\uAE30(\uAD6D\uB0B4)\uC774\uB825\uCD94\uC801 \uC0DD\uC0B0\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "ENTTY_IDNTFC_NO",
              "BRTH_DT",
              "ENTTY_STATS_NM",
              "COW_KND_NM",
              "GND_NM",
              "FMH_NM",
              "VACIN_LAST_INOCL_DT",
              "VACIN_LAST_INOCL_OPNO"
            ],
            "joinKeys": [
              "PK: ENTTY_IDNTFC_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT ENTTY_IDNTFC_NO, BRTH_DT, ENTTY_STATS_NM FROM I1810"
            ]
          }
        },
        {
          "id": "I1820",
          "name": "\uC1E0\uACE0\uAE30(\uAD6D\uB0B4)\uC774\uB825\uCD94\uC801 \uC815\uBCF4 (I1820)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1820 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "ENTTY_IDNTFC_NO",
            "SLAU_PLC_NM",
            "SNTT_PRSEC_NM",
            "SLAU_YMD",
            "ADDR",
            "SNTT_PRSEC_PASS_ENNC",
            "PRCSS_DT",
            "PRCSS_PLC_NM"
          ],
          "keys": [
            "ENTTY_IDNTFC_NO"
          ],
          "usageExample": "SELECT * FROM I1820 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC1E0\uACE0\uAE30(\uAD6D\uB0B4)\uC774\uB825\uCD94\uC801 \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "ENTTY_IDNTFC_NO",
              "SLAU_PLC_NM",
              "SNTT_PRSEC_NM",
              "SLAU_YMD",
              "ADDR",
              "SNTT_PRSEC_PASS_ENNC",
              "PRCSS_DT",
              "PRCSS_PLC_NM",
              "BRTH_DT",
              "ENTTY_STATS_NM",
              "COW_KND_NM",
              "GND_NM",
              "FMH_NM",
              "VACIN_LAST_INOCL_DT",
              "VACIN_LAST_INOCL_OPNO"
            ],
            "joinKeys": [
              "PK: ENTTY_IDNTFC_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT ENTTY_IDNTFC_NO, SLAU_PLC_NM, SNTT_PRSEC_NM FROM I1820"
            ]
          }
        },
        {
          "id": "I0460",
          "name": "\uC218\uAC70\uAC80\uC0AC \uACC4\uD68D \uBC0F \uC2E4\uC801 \uAD00\uB828 \uD604\uD669 (I0460)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0460 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC548\uC804\uAD00\uB9AC\xB7\uC810\uAC80",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRCSCITYPOINT_INDUTYCD_NM",
            "BSSH_NM",
            "SITE_ADDR",
            "PRDTNM",
            "TKAWYDTM",
            "JDGMNT_CD_NM",
            "EXC_INSTT_NM",
            "TKAWYSPCI_TYPECD_NM"
          ],
          "keys": [
            "TKAWYPRNO"
          ],
          "usageExample": "SELECT * FROM I0460 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC218\uAC70\uAC80\uC0AC \uACC4\uD68D \uBC0F \uC2E4\uC801 \uAD00\uB828 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRCSCITYPOINT_INDUTYCD_NM",
              "BSSH_NM",
              "SITE_ADDR",
              "PRDTNM",
              "TKAWYDTM",
              "JDGMNT_CD_NM",
              "EXC_INSTT_NM",
              "TKAWYSPCI_TYPECD_NM",
              "PRDLST_REPORT_NO",
              "LAST_UPDT_DTM",
              "TKAWYPRNO",
              "PLAN_TITL"
            ],
            "joinKeys": [
              "PK: TKAWYPRNO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRCSCITYPOINT_INDUTYCD_NM, BSSH_NM, SITE_ADDR FROM I0460"
            ]
          }
        },
        {
          "id": "I1380",
          "name": "\uC218\uC0B0\uBB3C \uC218\uC785\uC5C5\uCCB4 \uD604\uD669 \uC815\uBCF4 (I1380)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1380 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "INDUTY_CD_NM",
            "BSN_PRMS_NO_1",
            "ENTRPS_KOR_NM",
            "ADDR",
            "RM",
            "PRSDNT_KOR_NM"
          ],
          "keys": [
            "BSN_PRMS_NO_1"
          ],
          "usageExample": "SELECT * FROM I1380 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC218\uC0B0\uBB3C \uC218\uC785\uC5C5\uCCB4 \uD604\uD669 \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "INDUTY_CD_NM",
              "BSN_PRMS_NO_1",
              "ENTRPS_KOR_NM",
              "ADDR",
              "RM",
              "PRSDNT_KOR_NM"
            ],
            "joinKeys": [
              "PK: BSN_PRMS_NO_1"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT INDUTY_CD_NM, BSN_PRMS_NO_1, ENTRPS_KOR_NM FROM I1380"
            ]
          }
        },
        {
          "id": "I2020",
          "name": "\uC218\uC0B0\uBB3C \uD45C\uC2DC\uB2E8\uC18D\uC815\uBCF4 (I2020)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2020 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "ENTRPS_NM",
            "BIZCND_DVS_NM",
            "CTPRVN_NM",
            "VILT_ENTRPS_RELS_YN",
            "VILT_ENTRPS_RELS_DT",
            "DISCL_DTM",
            "INSTT_NM",
            "ORGNP_DVS_NM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2020 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC218\uC0B0\uBB3C \uD45C\uC2DC\uB2E8\uC18D\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "ENTRPS_NM",
              "BIZCND_DVS_NM",
              "CTPRVN_NM",
              "VILT_ENTRPS_RELS_YN",
              "VILT_ENTRPS_RELS_DT",
              "DISCL_DTM",
              "INSTT_NM",
              "ORGNP_DVS_NM",
              "VILT_MATR_DVS_NM",
              "MPRC_DVS_NM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT ENTRPS_NM, BIZCND_DVS_NM, CTPRVN_NM FROM I2020"
            ]
          }
        },
        {
          "id": "I2050",
          "name": "\uC218\uC0B0\uBB3C \uD574\uC678\uB4F1\uB85D\uC2DC\uC124\uC815\uBCF4 (I2050)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2050 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uC678\uC9C1\uAD6C \uC548\uC804\uC131",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "REG_NO",
            "ENTRPS_NM",
            "KND_CD_NM",
            "NLTY_NM",
            "ENTRPS_ADDR",
            "ADDR_PRDT",
            "APPLC_DT",
            "STATS_DVS"
          ],
          "keys": [
            "REG_NO"
          ],
          "usageExample": "SELECT * FROM I2050 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC218\uC0B0\uBB3C \uD574\uC678\uB4F1\uB85D\uC2DC\uC124\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "REG_NO",
              "ENTRPS_NM",
              "KND_CD_NM",
              "NLTY_NM",
              "ENTRPS_ADDR",
              "ADDR_PRDT",
              "APPLC_DT",
              "STATS_DVS",
              "POSTPNE_BGN_DT",
              "POSTPNE_END_DT",
              "POSTPNE_RELS_DT",
              "CANCL_DT",
              "RM"
            ],
            "joinKeys": [
              "PK: REG_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT REG_NO, ENTRPS_NM, KND_CD_NM FROM I2050"
            ]
          }
        },
        {
          "id": "I1920",
          "name": "\uC218\uC0B0\uBB3C\uC774\uB825\uC815\uBCF4-\uAE30\uBCF8\uC815\uBCF4 (I1920)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1920 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "HIST_TRACE_REG_NO",
            "GOODS_NM",
            "PRDLST_GROUP_DVS_NM",
            "ENTRPS_NM",
            "TELNO",
            "ADDR"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1920 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC218\uC0B0\uBB3C\uC774\uB825\uC815\uBCF4-\uAE30\uBCF8\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "HIST_TRACE_REG_NO",
              "GOODS_NM",
              "PRDLST_GROUP_DVS_NM",
              "ENTRPS_NM",
              "TELNO",
              "ADDR"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT HIST_TRACE_REG_NO, GOODS_NM, PRDLST_GROUP_DVS_NM FROM I1920"
            ]
          }
        },
        {
          "id": "I1930",
          "name": "\uC218\uC0B0\uBB3C\uC774\uB825\uC815\uBCF4-\uC0DD\uC0B0\uC815\uBCF4 (I1930)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1930 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "HIST_TRACE_REG_NO",
            "LOTNO_WRHOUSNG",
            "GOODS_NM",
            "PRDLST_GROUP_DVS_NM",
            "SETT_QTY",
            "WRHOUSNG_DT",
            "WRHOUSNG_QTY",
            "PHHGH_UNIT_CD_NM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1930 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC218\uC0B0\uBB3C\uC774\uB825\uC815\uBCF4-\uC0DD\uC0B0\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "HIST_TRACE_REG_NO",
              "LOTNO_WRHOUSNG",
              "GOODS_NM",
              "PRDLST_GROUP_DVS_NM",
              "SETT_QTY",
              "WRHOUSNG_DT",
              "WRHOUSNG_QTY",
              "PHHGH_UNIT_CD_NM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT HIST_TRACE_REG_NO, LOTNO_WRHOUSNG, GOODS_NM FROM I1930"
            ]
          }
        },
        {
          "id": "I1940",
          "name": "\uC218\uC0B0\uBB3C\uC774\uB825\uC815\uBCF4-\uCD9C\uD558\uC815\uBCF4 (I1940)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1940 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "HIST_TRACE_REG_NO",
            "LOTNO_RELES",
            "LOTNO_WRHOUSNG",
            "PRDLST_GROUP_DVS_NM",
            "RELES_DVS_NM",
            "PRDCTN_DT",
            "PRDCTN_QTY",
            "RELES_DT"
          ],
          "keys": [
            "HIST_TRACE_REG_NO"
          ],
          "usageExample": "SELECT * FROM I1940 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC218\uC0B0\uBB3C\uC774\uB825\uC815\uBCF4-\uCD9C\uD558\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "HIST_TRACE_REG_NO",
              "LOTNO_RELES",
              "LOTNO_WRHOUSNG",
              "PRDLST_GROUP_DVS_NM",
              "RELES_DVS_NM",
              "PRDCTN_DT",
              "PRDCTN_QTY",
              "RELES_DT",
              "RELES_QTY",
              "RELES_UNIT_NM"
            ],
            "joinKeys": [
              "PK: HIST_TRACE_REG_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT HIST_TRACE_REG_NO, LOTNO_RELES, LOTNO_WRHOUSNG FROM I1940"
            ]
          }
        },
        {
          "id": "I2780",
          "name": "\uC218\uC785\uC1E0\uACE0\uAE30 \uB0C9\uB3D9\uC804\uD658 \uC815\uBCF4 (I2780)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2780 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC218\uC785\uC2DD\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "MEATWATCH_NO",
            "HIST_NO",
            "ORGNP_NM",
            "BSSH_NM",
            "APLC_DTM",
            "PRDLST_NM",
            "FREEZING_CNVRS_QTY",
            "FREEZING_CNVRS_WT"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2780 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC218\uC785\uC1E0\uACE0\uAE30 \uB0C9\uB3D9\uC804\uD658 \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "MEATWATCH_NO",
              "HIST_NO",
              "ORGNP_NM",
              "BSSH_NM",
              "APLC_DTM",
              "PRDLST_NM",
              "FREEZING_CNVRS_QTY",
              "FREEZING_CNVRS_WT",
              "FRESH_DISTB_TMLMT_BGN_DT",
              "FRESH_DISTB_TMLMT_DT",
              "FREEZING_CNVRS_OPRTN_DT",
              "FREEZING_CNVRS_PREARNGE_DT",
              "FREEZING_DISTB_TMLMT_DT",
              "ACCEPT_NO"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT MEATWATCH_NO, HIST_NO, ORGNP_NM FROM I2780"
            ]
          }
        },
        {
          "id": "I1720",
          "name": "\uC218\uC785\uC1E0\uACE0\uAE30 \uC720\uD1B5\uC774\uB825\uC815\uBCF4 (I1720)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1720 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC218\uC785\uC2DD\uD488",
          "process": "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "BL_NO",
            "INCM_BEEF_PRDLST_NM",
            "ORGNP_NATN_NM",
            "EXCOURY_SLAU_PLC_NM",
            "EXCOURY_SLAU_BGN_DT",
            "EXCOURY_SLAU_END_DT",
            "EXCOURY_PRCSS_PLC_NM",
            "EXCOURY_PRCSS_BGN_DT"
          ],
          "keys": [
            "BL_NO"
          ],
          "usageExample": "SELECT * FROM I1720 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC218\uC785\uC1E0\uACE0\uAE30 \uC720\uD1B5\uC774\uB825\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BL_NO",
              "INCM_BEEF_PRDLST_NM",
              "ORGNP_NATN_NM",
              "EXCOURY_SLAU_PLC_NM",
              "EXCOURY_SLAU_BGN_DT",
              "EXCOURY_SLAU_END_DT",
              "EXCOURY_PRCSS_PLC_NM",
              "EXCOURY_PRCSS_BGN_DT",
              "EXCOURY_PRCSS_END_DT",
              "XPORT_ENTRPS_NM",
              "INCM_ENTRPS_NM",
              "INCM_DT",
              "REGN_NM"
            ],
            "joinKeys": [
              "PK: BL_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BL_NO, INCM_BEEF_PRDLST_NM, ORGNP_NATN_NM FROM I1720"
            ]
          }
        },
        {
          "id": "C001",
          "name": "\uC218\uC785\uC2DD\uD488\uB4F1\uC601\uC5C5\uC2E0\uACE0\uB300\uC7A5 (C001)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI C001 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM",
            "TELNO"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM C001 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC218\uC785\uC2DD\uD488\uB4F1\uC601\uC5C5\uC2E0\uACE0\uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM",
              "TELNO"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM C001"
            ]
          }
        },
        {
          "id": "I2821",
          "name": "\uC218\uC785\uC2DD\uD488\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2821)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2821 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC218\uC785\uC2DD\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2821 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC218\uC785\uC2DD\uD488\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2821"
            ]
          }
        },
        {
          "id": "I2781",
          "name": "\uC218\uC785\uCD95\uC0B0\uBB3C \uB0C9\uB3D9\uC804\uD658 \uC815\uBCF4 (I2781)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2781 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC218\uC785\uC2DD\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "MEATWATCH_NO",
            "ACCEPT_NO",
            "HIST_NO",
            "ORGNP_NM",
            "BSSH_NM",
            "APLC_DTM",
            "PRDLST_NM",
            "FREEZING_CNVRS_QTY"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2781 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC218\uC785\uCD95\uC0B0\uBB3C \uB0C9\uB3D9\uC804\uD658 \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "MEATWATCH_NO",
              "ACCEPT_NO",
              "HIST_NO",
              "ORGNP_NM",
              "BSSH_NM",
              "APLC_DTM",
              "PRDLST_NM",
              "FREEZING_CNVRS_QTY",
              "FREEZING_CNVRS_WT",
              "FRESH_DISTB_TMLMT_BGN_DT",
              "FRESH_DISTB_TMLMT_DT",
              "FREEZING_CNVRS_OPRTN_DT",
              "FREEZING_CNVRS_PREARNGE_DT",
              "FREEZING_DISTB_TMLMT_DT"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT MEATWATCH_NO, ACCEPT_NO, HIST_NO FROM I2781"
            ]
          }
        },
        {
          "id": "I1060",
          "name": "\uC2DC\uC57D\uC815\uBCF4 (I1060)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1060 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "CITYMEDI_NM_CD",
            "CMPNY_NO",
            "CTPRVNACCTO_INTD_NO",
            "STATS_NO",
            "PUREDO",
            "VALD_TERM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1060 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DC\uC57D\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "CITYMEDI_NM_CD",
              "CMPNY_NO",
              "CTPRVNACCTO_INTD_NO",
              "STATS_NO",
              "PUREDO",
              "VALD_TERM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT CITYMEDI_NM_CD, CMPNY_NO, CTPRVNACCTO_INTD_NO FROM I1060"
            ]
          }
        },
        {
          "id": "I2530",
          "name": "\uC2DC\uD5D8\uD56D\uBAA9\uCF54\uB4DC (I2530)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2530 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "TESTITM_CD",
            "KOR_NM",
            "ENG_NM",
            "ABRV",
            "NCKNM",
            "TESTITM_NM",
            "TESTITM_LCLAS_CD",
            "L_ATTRB_CD"
          ],
          "keys": [
            "TESTITM_CD"
          ],
          "usageExample": "SELECT * FROM I2530 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DC\uD5D8\uD56D\uBAA9\uCF54\uB4DC \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "TESTITM_CD",
              "KOR_NM",
              "ENG_NM",
              "ABRV",
              "NCKNM",
              "TESTITM_NM",
              "TESTITM_LCLAS_CD",
              "L_ATTRB_CD",
              "L_KOR_NM",
              "TESTITM_MLSFC_CD",
              "M_ATTRB_CD",
              "M_KOR_NM",
              "REMN_MTTR_DFN",
              "USE_YN",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [
              "PK: TESTITM_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT TESTITM_CD, KOR_NM, ENG_NM FROM I2530"
            ]
          }
        },
        {
          "id": "I2836",
          "name": "\uC2DD\uC6A9\uB780\uC120\uBCC4\uD3EC\uC7A5\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 (I2836)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2836 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2836 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uC6A9\uB780\uC120\uBCC4\uD3EC\uC7A5\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO",
              "FK: LCNS_NO -> I2500.LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2836"
            ]
          }
        },
        {
          "id": "I2835",
          "name": "\uC2DD\uC721\uC989\uC11D\uD310\uB9E4\uAC00\uACF5\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 (I2835)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2835 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2835 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uC721\uC989\uC11D\uD310\uB9E4\uAC00\uACF5\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO",
              "FK: LCNS_NO -> I2500.LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2835"
            ]
          }
        },
        {
          "id": "I2827",
          "name": "\uC2DD\uC721\uC989\uC11D\uD310\uB9E4\uAC00\uACF5\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2827)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2827 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2827 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uC721\uC989\uC11D\uD310\uB9E4\uAC00\uACF5\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2827"
            ]
          }
        },
        {
          "id": "I2850",
          "name": "\uC2DD\uC911\uB3C5 \uC6D0\uC778\uBB3C\uC9C8\uBCC4 \uD604\uD669 (I2850)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2850 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uC2DD\uC911\uB3C5\xB7\uAC10\uC5FC\uBCD1",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "OCCRNC_YEAR",
            "OCCRNC_MM",
            "OCCRNC_VIRS",
            "OCCRNC_CNT",
            "PATNT_CNT"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2850 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uC911\uB3C5 \uC6D0\uC778\uBB3C\uC9C8\uBCC4 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "OCCRNC_YEAR",
              "OCCRNC_MM",
              "OCCRNC_VIRS",
              "OCCRNC_CNT",
              "PATNT_CNT"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT OCCRNC_YEAR, OCCRNC_MM, OCCRNC_VIRS FROM I2850"
            ]
          }
        },
        {
          "id": "I2849",
          "name": "\uC2DD\uC911\uB3C5 \uC6D0\uC778\uC2DC\uC124\uBCC4 \uD604\uD669 (I2849)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2849 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uC2DD\uC911\uB3C5\xB7\uAC10\uC5FC\uBCD1",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "OCCRNC_YEAR",
            "OCCRNC_MM",
            "OCCRNC_PLC",
            "OCCRNC_CNT",
            "PATNT_CNT"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2849 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uC911\uB3C5 \uC6D0\uC778\uC2DC\uC124\uBCC4 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "OCCRNC_YEAR",
              "OCCRNC_MM",
              "OCCRNC_PLC",
              "OCCRNC_CNT",
              "PATNT_CNT"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT OCCRNC_YEAR, OCCRNC_MM, OCCRNC_PLC FROM I2849"
            ]
          }
        },
        {
          "id": "I2848",
          "name": "\uC2DD\uC911\uB3C5 \uC9C0\uC5ED\uBCC4 \uD604\uD669 (I2848)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2848 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uC2DD\uC911\uB3C5\xB7\uAC10\uC5FC\uBCD1",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "OCCRNC_YEAR",
            "OCCRNC_MM",
            "OCCRNC_AREA",
            "OCCRNC_CNT",
            "PATNT_CNT"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2848 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uC911\uB3C5 \uC9C0\uC5ED\uBCC4 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "OCCRNC_YEAR",
              "OCCRNC_MM",
              "OCCRNC_AREA",
              "OCCRNC_CNT",
              "PATNT_CNT"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT OCCRNC_YEAR, OCCRNC_MM, OCCRNC_AREA FROM I2848"
            ]
          }
        },
        {
          "id": "I1250",
          "name": "\uC2DD\uD488(\uCCA8\uAC00\uBB3C)\uD488\uBAA9\uC81C\uC870\uBCF4\uACE0 (I1250)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1250 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRDLST_REPORT_NO",
            "PRMS_DT",
            "PRDLST_NM",
            "PRDLST_DCNM",
            "PRODUCTION",
            "HIENG_LNTRT_DVS_NM"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM I1250 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488(\uCCA8\uAC00\uBB3C)\uD488\uBAA9\uC81C\uC870\uBCF4\uACE0 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRDLST_REPORT_NO",
              "PRMS_DT",
              "PRDLST_NM",
              "PRDLST_DCNM",
              "PRODUCTION",
              "HIENG_LNTRT_DVS_NM",
              "CHILD_CRTFC_YN",
              "POG_DAYCNT",
              "LAST_UPDT_DTM",
              "INDUTY_CD_NM",
              "QLITY_MNTNC_TMLMT_DAYCNT",
              "USAGE",
              "PRPOS",
              "DISPOS",
              "FRMLC_MTRQLT",
              "ETQTY_XPORT_PRDLST_YN"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM I1250"
            ]
          }
        },
        {
          "id": "C002",
          "name": "\uC2DD\uD488(\uCCA8\uAC00\uBB3C)\uD488\uBAA9\uC81C\uC870\uBCF4\uACE0(\uC6D0\uC7AC\uB8CC) (C002)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI C002 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRDLST_REPORT_NO",
            "PRMS_DT",
            "PRDLST_NM",
            "PRDLST_DCNM",
            "RAWMTRL_NM",
            "RAWMTRL_ORDNO"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM C002 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488(\uCCA8\uAC00\uBB3C)\uD488\uBAA9\uC81C\uC870\uBCF4\uACE0(\uC6D0\uC7AC\uB8CC) \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRDLST_REPORT_NO",
              "PRMS_DT",
              "PRDLST_NM",
              "PRDLST_DCNM",
              "RAWMTRL_NM",
              "RAWMTRL_ORDNO",
              "CHNG_DT",
              "ETQTY_XPORT_PRDLST_YN"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM C002"
            ]
          }
        },
        {
          "id": "I0300",
          "name": "\uC2DD\uD488.\uC2DD\uD488\uCCA8\uAC00\uBB3C \uC0DD\uC0B0\uC2E4\uC801 \uBCF4\uACE0 \uD604\uD669 (I0300)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0300 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC6D0\uC7AC\uB8CC\xB7\uCCA8\uAC00\uBB3C",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "SITE_ADDR",
            "EVL_YR",
            "PRDLST_REPORT_NO",
            "H_ITEM_NM",
            "PRDLST_NM",
            "FYER_PRDCTN_ABRT_QY"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM I0300 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488.\uC2DD\uD488\uCCA8\uAC00\uBB3C \uC0DD\uC0B0\uC2E4\uC801 \uBCF4\uACE0 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "SITE_ADDR",
              "EVL_YR",
              "PRDLST_REPORT_NO",
              "H_ITEM_NM",
              "PRDLST_NM",
              "FYER_PRDCTN_ABRT_QY",
              "PRDCTN_QY"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, SITE_ADDR FROM I0300"
            ]
          }
        },
        {
          "id": "I0920",
          "name": "\uC2DD\uD488\uAC80\uC0AC\uAE30\uAD00\uBCC4 \uC2DC\uD5D8\uD56D\uBAA9\uC815\uBCF4\uC870\uD68C (I0920)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0920 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC548\uC804\uAD00\uB9AC\xB7\uC810\uAC80",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "REALM_NM",
            "CMPTNC_INSTT_NM",
            "INSTT_NM",
            "ADDR",
            "MSK_TELNO",
            "TESTITM_LCLAS_NM",
            "TESTITM_MLSFC_NM",
            "TESTITM_NM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I0920 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uAC80\uC0AC\uAE30\uAD00\uBCC4 \uC2DC\uD5D8\uD56D\uBAA9\uC815\uBCF4\uC870\uD68C \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "REALM_NM",
              "CMPTNC_INSTT_NM",
              "INSTT_NM",
              "ADDR",
              "MSK_TELNO",
              "TESTITM_LCLAS_NM",
              "TESTITM_MLSFC_NM",
              "TESTITM_NM",
              "RM",
              "CHNG_DT"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT REALM_NM, CMPTNC_INSTT_NM, INSTT_NM FROM I0920"
            ]
          }
        },
        {
          "id": "I0930",
          "name": "\uC2DD\uD488\uACF5\uC804 (I0930)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0930 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRDLST_NM",
            "T_KOR_NM",
            "FNPRT_ITM_NM",
            "PIAM_KOR_NM",
            "SPEC_VAL",
            "VALD_BEGN_DT",
            "VALD_END_DT",
            "SPEC_VAL_SUMUP"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I0930 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uACF5\uC804 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDLST_NM",
              "T_KOR_NM",
              "FNPRT_ITM_NM",
              "PIAM_KOR_NM",
              "SPEC_VAL",
              "VALD_BEGN_DT",
              "VALD_END_DT",
              "SPEC_VAL_SUMUP",
              "JDGMNT_FNPRT_CD_NM",
              "MXMM_VAL",
              "MXMM_VAL_FNPRT_CD_NM",
              "MIMM_VAL",
              "MIMM_VAL_FNPRT_CD_NM",
              "CHOIC_FIT_FNPRT_CD_NM",
              "CHOIC_IMPROPT_FNPRT_CD_NM",
              "INJRY_YN",
              "UNIT_NM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDLST_NM, T_KOR_NM, FNPRT_ITM_NM FROM I0930"
            ]
          }
        },
        {
          "id": "I2833",
          "name": "\uC2DD\uD488\uB0C9\uB3D9.\uB0C9\uC7A5\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 (I2833)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2833 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2833 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uB0C9\uB3D9.\uB0C9\uC7A5\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO",
              "FK: LCNS_NO -> I2500.LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2833"
            ]
          }
        },
        {
          "id": "I1260",
          "name": "\uC2DD\uD488\uB4F1\uC218\uC785\uD310\uB9E4\uC5C5\uC815\uBCF4 (I1260)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1260 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC218\uC785\uC2DD\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "TELNO",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1260 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uB4F1\uC218\uC785\uD310\uB9E4\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "TELNO",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1260"
            ]
          }
        },
        {
          "id": "I1590",
          "name": "\uC2DD\uD488\uBAA8\uBC94\uC74C\uC2DD\uC810 (I1590)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1590 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uCC3D\uC5C5 \uC0C1\uAD8C \uBD84\uC11D\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "SIGNGU_NM",
            "YEAR",
            "APLC_DT",
            "PNCPL_FOOD_NM",
            "APPN_DT",
            "OPERT_DT"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1590 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uBAA8\uBC94\uC74C\uC2DD\uC810 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "SIGNGU_NM",
              "YEAR",
              "APLC_DT",
              "PNCPL_FOOD_NM",
              "APPN_DT",
              "OPERT_DT"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, SIGNGU_NM FROM I1590"
            ]
          }
        },
        {
          "id": "I1050",
          "name": "\uC2DD\uD488\uBCC4 \uB18D\uC57D\uC794\uB958\uD5C8\uC6A9\uAE30\uC900 (I1050)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1050 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uC720\uD574\uBB3C\uC9C8 \uAC80\uCD9C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "FOOD_KOR_NM",
            "FOOD_ENG_NM",
            "AGCHM_KOR_NM",
            "DEDE_NTK_QTY",
            "TMPR_STDR_APPLC_YN",
            "LCLAS_NM",
            "MLSFC_NM",
            "SCLAS_NM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1050 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uBCC4 \uB18D\uC57D\uC794\uB958\uD5C8\uC6A9\uAE30\uC900 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "FOOD_KOR_NM",
              "FOOD_ENG_NM",
              "AGCHM_KOR_NM",
              "DEDE_NTK_QTY",
              "TMPR_STDR_APPLC_YN",
              "LCLAS_NM",
              "MLSFC_NM",
              "SCLAS_NM",
              "OPERTN_CITYPOINT",
              "STEP",
              "MRL_VAL",
              "ETC_YN",
              "DSUSE_YN"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT FOOD_KOR_NM, FOOD_ENG_NM, AGCHM_KOR_NM FROM I1050"
            ]
          }
        },
        {
          "id": "I2854",
          "name": "\uC2DD\uD488\uBCC4 \uC720\uD574\uC624\uC5FC\uBB3C\uC9C8 \uAC80\uCD9C\uB7C9 (I2854)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2854 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "SNT_GBN",
            "PRDLST_CD",
            "PRDLST_NM",
            "ANALS_YEAR",
            "COL_A_RESULT",
            "COL_B_RESULT",
            "COL_C_RESULT",
            "COL_D_RESULT"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2854 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uBCC4 \uC720\uD574\uC624\uC5FC\uBB3C\uC9C8 \uAC80\uCD9C\uB7C9 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "SNT_GBN",
              "PRDLST_CD",
              "PRDLST_NM",
              "ANALS_YEAR",
              "COL_A_RESULT",
              "COL_B_RESULT",
              "COL_C_RESULT",
              "COL_D_RESULT",
              "COL_E_RESULT",
              "COL_F_RESULT",
              "COL_G_RESULT",
              "COL_H_RESULT",
              "COL_I_RESULT",
              "COL_J_RESULT",
              "COL_K_RESULT",
              "COL_L_RESULT",
              "COL_M_RESULT",
              "COL_N_RESULT",
              "COL_O_RESULT",
              "COL_P_RESULT",
              "COL_Q_RESULT",
              "COL_R_RESULT",
              "COL_S_RESULT",
              "CRET_DTM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT SNT_GBN, PRDLST_CD, PRDLST_NM FROM I2854"
            ]
          }
        },
        {
          "id": "I2817",
          "name": "\uC2DD\uD488\uBCF4\uC874\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2817)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2817 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2817 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uBCF4\uC874\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2817"
            ]
          }
        },
        {
          "id": "I2831",
          "name": "\uC2DD\uD488\uC18C\uBD84\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 (I2831)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2831 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2831 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC18C\uBD84\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO",
              "FK: LCNS_NO -> I2500.LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2831"
            ]
          }
        },
        {
          "id": "I2815",
          "name": "\uC2DD\uD488\uC18C\uBD84\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2815)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2815 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2815 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC18C\uBD84\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2815"
            ]
          }
        },
        {
          "id": "I2859",
          "name": "\uC2DD\uD488\uC5C5\uC18C \uC778\uD5C8\uAC00 \uBCC0\uACBD \uC815\uBCF4 (I2859)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2859 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "BSSH_NM",
            "INDUTY_CD_NM",
            "LCNS_NO",
            "TELNO",
            "SITE_ADDR",
            "CHNG_DT",
            "CHNG_BF_CN",
            "CHNG_AF_CN"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2859 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC5C5\uC18C \uC778\uD5C8\uAC00 \uBCC0\uACBD \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSSH_NM",
              "INDUTY_CD_NM",
              "LCNS_NO",
              "TELNO",
              "SITE_ADDR",
              "CHNG_DT",
              "CHNG_BF_CN",
              "CHNG_AF_CN",
              "CHNG_PRVNS"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSSH_NM, INDUTY_CD_NM, LCNS_NO FROM I2859"
            ]
          }
        },
        {
          "id": "I0940",
          "name": "\uC2DD\uD488\uC6A9 \uAE30\uAD6C \uBC0F \uC6A9\uAE30.\uD3EC\uC7A5 \uACF5\uC804 (I0940)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0940 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRDLST_CD",
            "PC_KOR_NM",
            "TESTITM_CD",
            "T_KOR_NM",
            "FNPRT_ITM_NM",
            "SPEC_VAL",
            "SPEC_VAL_SUMUP",
            "VALD_BEGN_DT"
          ],
          "keys": [
            "TESTITM_CD"
          ],
          "usageExample": "SELECT * FROM I0940 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC6A9 \uAE30\uAD6C \uBC0F \uC6A9\uAE30.\uD3EC\uC7A5 \uACF5\uC804 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDLST_CD",
              "PC_KOR_NM",
              "TESTITM_CD",
              "T_KOR_NM",
              "FNPRT_ITM_NM",
              "SPEC_VAL",
              "SPEC_VAL_SUMUP",
              "VALD_BEGN_DT",
              "VALD_END_DT",
              "SORC",
              "MXMM_VAL",
              "MIMM_VAL",
              "INJRY_YN",
              "UNIT_NM"
            ],
            "joinKeys": [
              "PK: TESTITM_CD",
              "FK: TESTITM_CD -> I2530.TESTITM_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDLST_CD, PC_KOR_NM, TESTITM_CD FROM I0940"
            ]
          }
        },
        {
          "id": "I2830",
          "name": "\uC2DD\uD488\uC6B4\uBC18\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 (I2830)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2830 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2830 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC6B4\uBC18\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO",
              "FK: LCNS_NO -> I2500.LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2830"
            ]
          }
        },
        {
          "id": "I2814",
          "name": "\uC2DD\uD488\uC6B4\uBC18\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2814)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2814 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2814 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC6B4\uBC18\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2814"
            ]
          }
        },
        {
          "id": "I0980",
          "name": "\uC2DD\uD488\uC6D0\uB8CC\uC758 \uD55C\uC2DC\uC801 \uAE30\uC900 \uBC0F \uADDC\uACA9 \uC778\uC815 \uD604\uD669 (I0980)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0980 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LIMIT_STDR_STND_RCOGN_NO",
            "BSSH_NM",
            "BSSH_ADDR",
            "PRSDNT_NM",
            "RCOGN_DT",
            "PRDT_NM",
            "RAWMTRL_NM",
            "PRPOS"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I0980 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC6D0\uB8CC\uC758 \uD55C\uC2DC\uC801 \uAE30\uC900 \uBC0F \uADDC\uACA9 \uC778\uC815 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LIMIT_STDR_STND_RCOGN_NO",
              "BSSH_NM",
              "BSSH_ADDR",
              "PRSDNT_NM",
              "RCOGN_DT",
              "PRDT_NM",
              "RAWMTRL_NM",
              "PRPOS",
              "USED",
              "USING_UNIT"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LIMIT_STDR_STND_RCOGN_NO, BSSH_NM, BSSH_ADDR FROM I0980"
            ]
          }
        },
        {
          "id": "I1020",
          "name": "\uC2DD\uD488\uC6D0\uC7AC\uB8CC(\uC2DD\uBB3C,\uB3D9\uBB3C,\uBBF8\uC0DD\uBB3C,\uC218\uC0B0\uBB3C) \uC815\uBCF4 (I1020)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1020 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC6D0\uC7AC\uB8CC\xB7\uCCA8\uAC00\uBB3C",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCLAS_NM",
            "MLSFC_NM",
            "RPRSNT_RAWMTRL_NM",
            "RAWMTRL_NCKNM",
            "ENG_NM",
            "SCNM",
            "REGN_CD_NM",
            "RAWMTRL_STATS_CD_NM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1020 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC6D0\uC7AC\uB8CC(\uC2DD\uBB3C,\uB3D9\uBB3C,\uBBF8\uC0DD\uBB3C,\uC218\uC0B0\uBB3C) \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCLAS_NM",
              "MLSFC_NM",
              "RPRSNT_RAWMTRL_NM",
              "RAWMTRL_NCKNM",
              "ENG_NM",
              "SCNM",
              "REGN_CD_NM",
              "RAWMTRL_STATS_CD_NM",
              "USE_CND_NM",
              "USE_CND_STDR_CN"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCLAS_NM, MLSFC_NM, RPRSNT_RAWMTRL_NM FROM I1020"
            ]
          }
        },
        {
          "id": "I2520",
          "name": "\uC2DD\uD488\uC6D0\uC7AC\uB8CC\uCF54\uB4DC (I2520)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2520 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC6D0\uC7AC\uB8CC\xB7\uCCA8\uAC00\uBB3C",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "RAWMTRL_CD",
            "RAWMTRL_LCLAS_NM",
            "RAWMTRL_MLSFC_NM",
            "RPRSNT_RAWMTRL_NM",
            "RAWMTRL_NCKNM",
            "ENG_NM",
            "SCNM",
            "REGN_CD"
          ],
          "keys": [
            "RAWMTRL_CD"
          ],
          "usageExample": "SELECT * FROM I2520 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC6D0\uC7AC\uB8CC\uCF54\uB4DC \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "RAWMTRL_CD",
              "RAWMTRL_LCLAS_NM",
              "RAWMTRL_MLSFC_NM",
              "RPRSNT_RAWMTRL_NM",
              "RAWMTRL_NCKNM",
              "ENG_NM",
              "SCNM",
              "REGN_CD",
              "REGN_CD_NM",
              "PRCSS_PROCS_CD",
              "PRCSS_PROCS_CD_NM",
              "RAWMTRL_STATS_CD",
              "RAWMTRL_STATS_CD_NM",
              "VALD_BGN_DT",
              "VALD_END_DT",
              "USE_YN",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [
              "PK: RAWMTRL_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT RAWMTRL_CD, RAWMTRL_LCLAS_NM, RAWMTRL_MLSFC_NM FROM I2520"
            ]
          }
        },
        {
          "id": "I0890",
          "name": "\uC2DD\uD488\uC704\uC0DD\uAC80\uC0AC\uAE30\uAD00 \uC9C0\uC815 \uD604\uD669 (I0890)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0890 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9",
          "includedData": [
            "PRSEC_INSTT_RCOGN_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "APPN_BGN_DT",
            "APPN_END_DT",
            "WORK_SCOPE"
          ],
          "keys": [
            "PRSEC_INSTT_RCOGN_NO"
          ],
          "usageExample": "SELECT * FROM I0890 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC704\uC0DD\uAC80\uC0AC\uAE30\uAD00 \uC9C0\uC815 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRSEC_INSTT_RCOGN_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "APPN_BGN_DT",
              "APPN_END_DT",
              "WORK_SCOPE"
            ],
            "joinKeys": [
              "PK: PRSEC_INSTT_RCOGN_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRSEC_INSTT_RCOGN_NO, BSSH_NM, PRSDNT_NM FROM I0890"
            ]
          }
        },
        {
          "id": "I1560",
          "name": "\uC2DD\uD488\uC704\uC0DD\uAD50\uC721\uB0B4\uC5ED (I1560)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1560 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC548\uC804\uAD00\uB9AC\xB7\uC810\uAC80",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "EDC_TYPE_NM",
            "EDC_DVS_NM",
            "LCNS_NO",
            "BSSH_NM",
            "INDUTY_NM",
            "EDC_OBJ_NM",
            "CMPLTR_NAME",
            "CTFHV_NO"
          ],
          "keys": [
            "CTFHV_NO"
          ],
          "usageExample": "SELECT * FROM I1560 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC704\uC0DD\uAD50\uC721\uB0B4\uC5ED \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "EDC_TYPE_NM",
              "EDC_DVS_NM",
              "LCNS_NO",
              "BSSH_NM",
              "INDUTY_NM",
              "EDC_OBJ_NM",
              "CMPLTR_NAME",
              "CTFHV_NO",
              "COMPL_DTM",
              "EDC_MEDIA",
              "EDC_COMPL_NMPR",
              "INSTT_CD_NM",
              "EDC_PROCES_NM",
              "EDC_PLC",
              "ADDR"
            ],
            "joinKeys": [
              "PK: CTFHV_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT EDC_TYPE_NM, EDC_DVS_NM, LCNS_NO FROM I1560"
            ]
          }
        },
        {
          "id": "I1540",
          "name": "\uC2DD\uD488\uC704\uC0DD\uB4F1\uAE09\uD3C9\uAC00\uAD00\uB9AC\uB0B4\uC5ED (I1540)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1540 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9",
          "includedData": [
            "EVL_SEQ",
            "EVL_PLAN_DT",
            "EVL_TYPE_DVS_CD_NM",
            "EVL_DT",
            "EVL_SCORE",
            "EVL_GRD_CD_NM",
            "BSSH_LOC_CD_NM",
            "LCNS_NO"
          ],
          "keys": [
            "EVL_SEQ"
          ],
          "usageExample": "SELECT * FROM I1540 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC704\uC0DD\uB4F1\uAE09\uD3C9\uAC00\uAD00\uB9AC\uB0B4\uC5ED \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "EVL_SEQ",
              "EVL_PLAN_DT",
              "EVL_TYPE_DVS_CD_NM",
              "EVL_DT",
              "EVL_SCORE",
              "EVL_GRD_CD_NM",
              "BSSH_LOC_CD_NM",
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "ADDR",
              "EVL_INCPCTY_YN"
            ],
            "joinKeys": [
              "PK: EVL_SEQ"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT EVL_SEQ, EVL_PLAN_DT, EVL_TYPE_DVS_CD_NM FROM I1540"
            ]
          }
        },
        {
          "id": "I0320",
          "name": "\uC2DD\uD488\uC774\uB825\uCD94\uC801\uAD00\uB9AC \uB4F1\uB85D \uD604\uD669 (I0320)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0320 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "REG_NUM",
            "PDT_NM",
            "PDT_BARCD",
            "PDT_TYPE",
            "MAKE_TYPE",
            "ADDR",
            "BRNCH_NM",
            "BTYPE"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM I0320 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC774\uB825\uCD94\uC801\uAD00\uB9AC \uB4F1\uB85D \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "REG_NUM",
              "PDT_NM",
              "PDT_BARCD",
              "PDT_TYPE",
              "MAKE_TYPE",
              "ADDR",
              "BRNCH_NM",
              "BTYPE",
              "FOOD_TYPE",
              "PRDLST_REPORT_NO",
              "MNFT_DAY",
              "FOOD_HISTRACE_NUM",
              "CRCL_PRD",
              "MOD_DT"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT REG_NUM, PDT_NM, PDT_BARCD FROM I0320"
            ]
          }
        },
        {
          "id": "I2819",
          "name": "\uC2DD\uD488\uC811\uAC1D\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2819)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2819 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uCC3D\uC5C5 \uC0C1\uAD8C \uBD84\uC11D\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2819 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC811\uAC1D\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2819"
            ]
          }
        },
        {
          "id": "C004",
          "name": "\uC2DD\uD488\uC811\uAC1D\uC5C5\uC18C \uC704\uC0DD\uB4F1\uAE09 \uC9C0\uC815\uD604\uD669 (C004)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI C004 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uCC3D\uC5C5 \uC0C1\uAD8C \uBD84\uC11D\uC6A9",
          "includedData": [
            "HG_ASGN_NM",
            "HG_ASGN_LV",
            "HG_ASGN_NO",
            "HG_ASGN_YMD",
            "INDUTY_NM",
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM"
          ],
          "keys": [
            "HG_ASGN_NO"
          ],
          "usageExample": "SELECT * FROM C004 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC811\uAC1D\uC5C5\uC18C \uC704\uC0DD\uB4F1\uAE09 \uC9C0\uC815\uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "HG_ASGN_NM",
              "HG_ASGN_LV",
              "HG_ASGN_NO",
              "HG_ASGN_YMD",
              "INDUTY_NM",
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "ADDR",
              "ASGN_FROM",
              "ASGN_TO",
              "TELNO",
              "WRKR_REG_NO",
              "ASGN_CANCEL_YMD",
              "CLSBIZ_DVS_CD_NM",
              "CLSBIZ_DT",
              "CHNG_DT",
              "INSTT_CD_NM"
            ],
            "joinKeys": [
              "PK: HG_ASGN_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT HG_ASGN_NM, HG_ASGN_LV, HG_ASGN_NO FROM C004"
            ]
          }
        },
        {
          "id": "I1200",
          "name": "\uC2DD\uD488\uC811\uAC1D\uC5C5\uC815\uBCF4 (I1200)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1200 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uCC3D\uC5C5 \uC0C1\uAD8C \uBD84\uC11D\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "TELNO",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1200 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC811\uAC1D\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "TELNO",
              "INSTT_NM",
              "HG_LV",
              "ASGN_GIGAN_FROM",
              "ASGN_GIGAN_TO",
              "PART_GBN",
              "JOIN_YMD",
              "APPT_YMD",
              "CALC_YMD",
              "CLSBIZ_DT",
              "SITE_X",
              "SITE_Y",
              "LAST_UPDT_DTM",
              "CRET_DTM",
              "BSN_LCNS_LEDG_NO",
              "PET_OUTIN_YN"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1200"
            ]
          }
        },
        {
          "id": "I2811",
          "name": "\uC2DD\uD488\uC81C\uC870\uAC00\uACF5\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2811)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2811 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2811 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC81C\uC870\uAC00\uACF5\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2811"
            ]
          }
        },
        {
          "id": "I1220",
          "name": "\uC2DD\uD488\uC81C\uC870\uAC00\uACF5\uC5C5\uC815\uBCF4 (I1220)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1220 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "TELNO",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1220 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC81C\uC870\uAC00\uACF5\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "TELNO",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1220"
            ]
          }
        },
        {
          "id": "I-0010",
          "name": "\uC2DD\uD488\uC870\uC0AC\uCC98\uB9AC\uC5C5 \uC778\uD5C8\uAC00 \uD604\uD669 (I-0010)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I-0010 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 3\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 3,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "FOOD_HF_LS_CL_CD_NM",
            "PRMS_DT",
            "TELNO",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I-0010 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uC870\uC0AC\uCC98\uB9AC\uC5C5 \uC778\uD5C8\uAC00 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "FOOD_HF_LS_CL_CD_NM",
              "PRMS_DT",
              "TELNO",
              "LOCP_ADDR"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I-0010"
            ]
          }
        },
        {
          "id": "I0950",
          "name": "\uC2DD\uD488\uCCA8\uAC00\uBB3C\uACF5\uC804 (I0950)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0950 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC6D0\uC7AC\uB8CC\xB7\uCCA8\uAC00\uBB3C",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRDLST_CD",
            "PC_KOR_NM",
            "TESTITM_CD",
            "T_KOR_NM",
            "FNPRT_ITM_NM",
            "SPEC_VAL",
            "SPEC_VAL_SUMUP",
            "VALD_BEGN_DT"
          ],
          "keys": [
            "PRDLST_CD"
          ],
          "usageExample": "SELECT * FROM I0950 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uCCA8\uAC00\uBB3C\uACF5\uC804 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDLST_CD",
              "PC_KOR_NM",
              "TESTITM_CD",
              "T_KOR_NM",
              "FNPRT_ITM_NM",
              "SPEC_VAL",
              "SPEC_VAL_SUMUP",
              "VALD_BEGN_DT",
              "VALD_END_DT",
              "SORC",
              "MXMM_VAL",
              "MIMM_VAL",
              "INJRY_YN",
              "UNIT_NM"
            ],
            "joinKeys": [
              "PK: PRDLST_CD",
              "FK: TESTITM_CD -> I2530.TESTITM_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDLST_CD, PC_KOR_NM, TESTITM_CD FROM I0950"
            ]
          }
        },
        {
          "id": "I1101",
          "name": "\uC2DD\uD488\uCCA8\uAC00\uBB3C\uC758 \uAE30\uC900 \uBC0F \uADDC\uACA9 \uD604\uD669 (I1101)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1101 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 0\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 0,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PC_KOR_NM",
            "PRDLST_CD",
            "T_KOR_NM",
            "FNPRT_ITM_NM",
            "PIAM_KOR_NM",
            "SPEC_VAL",
            "SPEC_VAL_SUMUP",
            "VALD_BEGN_DT"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1101 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uCCA8\uAC00\uBB3C\uC758 \uAE30\uC900 \uBC0F \uADDC\uACA9 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PC_KOR_NM",
              "PRDLST_CD",
              "T_KOR_NM",
              "FNPRT_ITM_NM",
              "PIAM_KOR_NM",
              "SPEC_VAL",
              "SPEC_VAL_SUMUP",
              "VALD_BEGN_DT",
              "VALD_END_DT",
              "SORC",
              "MXMM_VAL",
              "MIMM_VAL",
              "INJRY_YN",
              "UNIT_NM",
              "UPDT_PRVNS",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PC_KOR_NM, PRDLST_CD, T_KOR_NM FROM I1101"
            ]
          }
        },
        {
          "id": "I1000",
          "name": "\uC2DD\uD488\uCCA8\uAC00\uBB3C\uC758 \uD55C\uC2DC\uC801 \uAE30\uC900 \uBC0F \uADDC\uACA9 \uC778\uC815 \uD604\uD669 (I1000)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1000 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LIMIT_STDR_STND_RCOGN_NO",
            "RCOGN_DT",
            "BSSH_NM",
            "PRSDNT_NM",
            "TELNO",
            "MC_NM",
            "PRDT_NM"
          ],
          "keys": [
            "LIMIT_STDR_STND_RCOGN_NO"
          ],
          "usageExample": "SELECT * FROM I1000 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uCCA8\uAC00\uBB3C\uC758 \uD55C\uC2DC\uC801 \uAE30\uC900 \uBC0F \uADDC\uACA9 \uC778\uC815 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LIMIT_STDR_STND_RCOGN_NO",
              "RCOGN_DT",
              "BSSH_NM",
              "PRSDNT_NM",
              "TELNO",
              "MC_NM",
              "PRDT_NM"
            ],
            "joinKeys": [
              "PK: LIMIT_STDR_STND_RCOGN_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LIMIT_STDR_STND_RCOGN_NO, RCOGN_DT, BSSH_NM FROM I1000"
            ]
          }
        },
        {
          "id": "I1230",
          "name": "\uC2DD\uD488\uCCA8\uAC00\uBB3C\uC81C\uC870\uC5C5 (I1230)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1230 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "TELNO",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1230 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uCCA8\uAC00\uBB3C\uC81C\uC870\uC5C5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "TELNO",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1230"
            ]
          }
        },
        {
          "id": "I2813",
          "name": "\uC2DD\uD488\uCCA8\uAC00\uBB3C\uC81C\uC870\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2813)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2813 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2813 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uCCA8\uAC00\uBB3C\uC81C\uC870\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2813"
            ]
          }
        },
        {
          "id": "I2832",
          "name": "\uC2DD\uD488\uD310\uB9E4\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 (I2832)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2832 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2832 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uD310\uB9E4\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO",
              "FK: LCNS_NO -> I2500.LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2832"
            ]
          }
        },
        {
          "id": "I2816",
          "name": "\uC2DD\uD488\uD310\uB9E4\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2816)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2816 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2816 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2DD\uD488\uD310\uB9E4\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2816"
            ]
          }
        },
        {
          "id": "I1650",
          "name": "\uC2E0\uACE0\uB300\uC0C1\uBD84\uB958\uAE30\uC900 (I1650)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1650 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "CMMN_CD_NM",
            "FNPRT_CD_NM",
            "USER_DFN_CLMN_1",
            "USER_DFN_CLMN_2"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1650 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC2E0\uACE0\uB300\uC0C1\uBD84\uB958\uAE30\uC900 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "CMMN_CD_NM",
              "FNPRT_CD_NM",
              "USER_DFN_CLMN_1",
              "USER_DFN_CLMN_2"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT CMMN_CD_NM, FNPRT_CD_NM, USER_DFN_CLMN_1 FROM I1650"
            ]
          }
        },
        {
          "id": "I1980",
          "name": "\uC5B4\uB958\uC9C8\uBCD1\uC815\uBCF4 (I1980)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1980 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "DISS_NM",
            "DISS_CL_DVS_NM",
            "ARA_DVS_NM",
            "FISHSPCS_NM",
            "SYMPTMS_CAUS_CN",
            "CURE_PREVNT_MESUR_CN",
            "DGNS_MTHD_CN"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1980 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC5B4\uB958\uC9C8\uBCD1\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "DISS_NM",
              "DISS_CL_DVS_NM",
              "ARA_DVS_NM",
              "FISHSPCS_NM",
              "SYMPTMS_CAUS_CN",
              "CURE_PREVNT_MESUR_CN",
              "DGNS_MTHD_CN"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT DISS_NM, DISS_CL_DVS_NM, ARA_DVS_NM FROM I1980"
            ]
          }
        },
        {
          "id": "I2846",
          "name": "\uC5B4\uB9B0\uC774 \uAE09\uC2DD\uC13C\uD130 \uC9C0\uC6D0\uD604\uD669 (I2846)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2846 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 2\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 2,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uCDE8\uC57D\uACC4\uCE35 \uBA39\uAC70\uB9AC",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "INSTT_NM",
            "CNTER_NM",
            "REPORT_YR",
            "REPORT_QU",
            "KNDRGR_REG_CO",
            "KNDRGR_NMPR_CO",
            "DCCNTR_REG_CO",
            "DCCNTR_NMPR_CO"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2846 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC5B4\uB9B0\uC774 \uAE09\uC2DD\uC13C\uD130 \uC9C0\uC6D0\uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "INSTT_NM",
              "CNTER_NM",
              "REPORT_YR",
              "REPORT_QU",
              "KNDRGR_REG_CO",
              "KNDRGR_NMPR_CO",
              "DCCNTR_REG_CO",
              "DCCNTR_NMPR_CO",
              "ETC_REG_CO",
              "ETC_NMPR_CO"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT INSTT_NM, CNTER_NM, REPORT_YR FROM I2846"
            ]
          }
        },
        {
          "id": "I0080",
          "name": "\uC5B4\uB9B0\uC774 \uAE30\uD638\uC2DD\uD488 \uD488\uC9C8\uC778\uC99D \uD604\uD669 \uBC0F \uC7AC\uC2EC\uC0AC \uD604\uD669 (I0080)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0080 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uCDE8\uC57D\uACC4\uCE35 \uBA39\uAC70\uB9AC",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "CHILD_FFQ_CRTFC_NO",
            "BSSH_NM",
            "LCNS_NO",
            "PRDLST_CD_NM",
            "PRDLST_NM",
            "CN_WT",
            "APPN_BGN_DT",
            "APPN_END_DT"
          ],
          "keys": [
            "CHILD_FFQ_CRTFC_NO"
          ],
          "usageExample": "SELECT * FROM I0080 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC5B4\uB9B0\uC774 \uAE30\uD638\uC2DD\uD488 \uD488\uC9C8\uC778\uC99D \uD604\uD669 \uBC0F \uC7AC\uC2EC\uC0AC \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "CHILD_FFQ_CRTFC_NO",
              "BSSH_NM",
              "LCNS_NO",
              "PRDLST_CD_NM",
              "PRDLST_NM",
              "CN_WT",
              "APPN_BGN_DT",
              "APPN_END_DT",
              "CHILD_FAVOR_FOOD_TYPE_NM",
              "PRDLST_REPORT_NO"
            ],
            "joinKeys": [
              "PK: CHILD_FFQ_CRTFC_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT CHILD_FFQ_CRTFC_NO, BSSH_NM, LCNS_NO FROM I0080"
            ]
          }
        },
        {
          "id": "I0340",
          "name": "\uC5B4\uB9B0\uC774 \uC2DD\uD488\uC548\uC804\uBCF4\uD638\uAD6C\uC5ED \uAD00\uB9AC \uD604\uD669 (I0340)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0340 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uCDE8\uC57D\uACC4\uCE35 \uBA39\uAC70\uB9AC",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "HOLD_INSTT_NM",
            "SCHL_NM",
            "FOOD_SAFE_PRTC_ZONE_NM",
            "ADDR",
            "APPN_DT",
            "BSSH_NO",
            "UPSO_NM",
            "UPJONG"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I0340 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC5B4\uB9B0\uC774 \uC2DD\uD488\uC548\uC804\uBCF4\uD638\uAD6C\uC5ED \uAD00\uB9AC \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "HOLD_INSTT_NM",
              "SCHL_NM",
              "FOOD_SAFE_PRTC_ZONE_NM",
              "ADDR",
              "APPN_DT",
              "BSSH_NO",
              "UPSO_NM",
              "UPJONG"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT HOLD_INSTT_NM, SCHL_NM, FOOD_SAFE_PRTC_ZONE_NM FROM I0340"
            ]
          }
        },
        {
          "id": "I2840",
          "name": "\uC5B4\uB9B0\uC774 \uC6B0\uC218\uD310\uB9E4\uC5C5\uC18C \uC9C0\uC815\uD604\uD669 (I2840)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2840 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uCDE8\uC57D\uACC4\uCE35 \uBA39\uAC70\uB9AC",
          "theme": "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9",
          "includedData": [
            "GNT_NO",
            "UPSO_NM",
            "UPJONG",
            "ADDR",
            "APLC_DT",
            "HOLD_INSTT_CD"
          ],
          "keys": [
            "GNT_NO"
          ],
          "usageExample": "SELECT * FROM I2840 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC5B4\uB9B0\uC774 \uC6B0\uC218\uD310\uB9E4\uC5C5\uC18C \uC9C0\uC815\uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "GNT_NO",
              "UPSO_NM",
              "UPJONG",
              "ADDR",
              "APLC_DT",
              "HOLD_INSTT_CD"
            ],
            "joinKeys": [
              "PK: GNT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT GNT_NO, UPSO_NM, UPJONG FROM I2840"
            ]
          }
        },
        {
          "id": "I2560",
          "name": "\uC601\uC5C5\uC18C\uC7AC\uC9C0 GIS \uCF54\uB4DC (I2560)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2560 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "LOCPLC",
            "SAN",
            "LNBR",
            "ISSNO",
            "TONG",
            "BAN"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2560 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC601\uC5C5\uC18C\uC7AC\uC9C0 GIS \uCF54\uB4DC \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "LOCPLC",
              "SAN",
              "LNBR",
              "ISSNO",
              "TONG",
              "BAN",
              "SPCLADDR",
              "SPCPPDONG",
              "SPCPPISSNO",
              "ROADNMSIGNGUCD",
              "ROADNMADDREMDDVS",
              "ROADNMADDREMDCD",
              "ROADNMADDRBDFLRDVS",
              "ROADNMADDRBDORIGNO",
              "ROADNMADDRBDSUBNO",
              "ROADNMADDRSPCLADDR",
              "PNU_CD",
              "BDMERGEMANAGENO",
              "UFID_CD"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, LOCPLC FROM I2560"
            ]
          }
        },
        {
          "id": "I2818",
          "name": "\uC6A9\uAE30.\uD3EC\uC7A5\uB958\uC81C\uC870\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2818)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2818 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2818 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC6A9\uAE30.\uD3EC\uC7A5\uB958\uC81C\uC870\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2818"
            ]
          }
        },
        {
          "id": "I2837",
          "name": "\uC6A9\uC5B4\uC0AC\uC804(\uAE30\uAD6C\uC6A9\uAE30\uD3EC\uC7A5\u2219\uC2DD\uC758\uC57D\uD488\uC6A9\uC5B4\uC9D1) (I2837)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2837 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "WORD",
            "FRNTNFISH",
            "DTL_DESC",
            "KEYWORD",
            "SAUS",
            "LAST_UPDT_DTM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2837 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC6A9\uC5B4\uC0AC\uC804(\uAE30\uAD6C\uC6A9\uAE30\uD3EC\uC7A5\u2219\uC2DD\uC758\uC57D\uD488\uC6A9\uC5B4\uC9D1) \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "WORD",
              "FRNTNFISH",
              "DTL_DESC",
              "KEYWORD",
              "SAUS",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT WORD, FRNTNFISH, DTL_DESC FROM I2837"
            ]
          }
        },
        {
          "id": "I0250",
          "name": "\uC6B0\uC218\uC218\uC785\uC5C5\uC18C \uB4F1\uB85D \uD604\uD669 (I0250)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0250 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "EXCLNC_INCM_BSSH_REGNO",
            "PRMS_DT",
            "BSSH_NM",
            "ADDR",
            "EXCOURY_NATN_CD_NM",
            "INCM_PRDT_XPORT_MC_NM",
            "PRDLST_CNT",
            "PRDLST_NM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I0250 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC6B0\uC218\uC218\uC785\uC5C5\uC18C \uB4F1\uB85D \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "EXCLNC_INCM_BSSH_REGNO",
              "PRMS_DT",
              "BSSH_NM",
              "ADDR",
              "EXCOURY_NATN_CD_NM",
              "INCM_PRDT_XPORT_MC_NM",
              "PRDLST_CNT",
              "PRDLST_NM",
              "LCNS_NO"
            ],
            "joinKeys": [
              "FK: LCNS_NO -> I1260.LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT EXCLNC_INCM_BSSH_REGNO, PRMS_DT, BSSH_NM FROM I0250"
            ]
          }
        },
        {
          "id": "I1550",
          "name": "\uC704\uC0DD\uACF5\uD1B5\uAD50\uC721\uAE30\uAD00\uB0B4\uC5ED (I1550)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1550 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC548\uC804\uAD00\uB9AC\xB7\uC810\uAC80",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "BSSH_NM",
            "ZIPNO",
            "LOCP_ADDR",
            "LOCP_ADDR_DTL",
            "TELNO",
            "PRMS_DT"
          ],
          "keys": [
            "ZIPNO"
          ],
          "usageExample": "SELECT * FROM I1550 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC704\uC0DD\uACF5\uD1B5\uAD50\uC721\uAE30\uAD00\uB0B4\uC5ED \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSSH_NM",
              "ZIPNO",
              "LOCP_ADDR",
              "LOCP_ADDR_DTL",
              "TELNO",
              "PRMS_DT"
            ],
            "joinKeys": [
              "PK: ZIPNO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSSH_NM, ZIPNO, LOCP_ADDR FROM I1550"
            ]
          }
        },
        {
          "id": "I0680",
          "name": "\uC704\uC0DD\uAD00\uB9AC\uB4F1\uAE09\uBCC4 \uC5C5\uC18C \uD604\uD669 (I0680)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0680 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "EVL_TYPE_DVS_NM",
            "EVL_GRD_NM",
            "EVL_DT"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I0680 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC704\uC0DD\uAD00\uB9AC\uB4F1\uAE09\uBCC4 \uC5C5\uC18C \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "EVL_TYPE_DVS_NM",
              "EVL_GRD_NM",
              "EVL_DT"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, EVL_TYPE_DVS_NM FROM I0680"
            ]
          }
        },
        {
          "id": "I2823",
          "name": "\uC704\uC0DD\uC6A9\uD488 \uD3D0\uC5C5\uC815\uBCF4 (I2823)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2823 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2823 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC704\uC0DD\uC6A9\uD488 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2823"
            ]
          }
        },
        {
          "id": "I2714",
          "name": "\uC704\uC0DD\uC6A9\uD488\uC218\uC785\uC5C5\uC601\uC5C5\uC2E0\uACE0\uB300\uC7A5 (I2714)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2714 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM",
            "TELNO"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2714 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC704\uC0DD\uC6A9\uD488\uC218\uC785\uC5C5\uC601\uC5C5\uC2E0\uACE0\uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM",
              "TELNO"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2714"
            ]
          }
        },
        {
          "id": "I2851",
          "name": "\uC704\uC0DD\uC6A9\uD488\uC601\uC5C5 \uC0DD\uC0B0\uC2E4\uC801\uBCF4\uACE0 (I2851)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2851 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "BSSH_NM",
            "PRDLST_NM",
            "GUBUN",
            "H_ITEM_NM",
            "LCNS_NO",
            "EVL_YR",
            "PRDLST_REPORT_NO",
            "PRDCTN_QY"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM I2851 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC704\uC0DD\uC6A9\uD488\uC601\uC5C5 \uC0DD\uC0B0\uC2E4\uC801\uBCF4\uACE0 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSSH_NM",
              "PRDLST_NM",
              "GUBUN",
              "H_ITEM_NM",
              "LCNS_NO",
              "EVL_YR",
              "PRDLST_REPORT_NO",
              "PRDCTN_QY"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSSH_NM, PRDLST_NM, GUBUN FROM I2851"
            ]
          }
        },
        {
          "id": "I2713",
          "name": "\uC704\uC0DD\uC6A9\uD488\uC601\uC5C5\uC815\uBCF4 (I2713)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2713 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "TELNO",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2713 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC704\uC0DD\uC6A9\uD488\uC601\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "TELNO",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2713"
            ]
          }
        },
        {
          "id": "I2711",
          "name": "\uC704\uC0DD\uC6A9\uD488\uD488\uBAA9\uC81C\uC870\uBCF4\uACE0 (I2711)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2711 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRDLST_REPORT_NO",
            "PRMS_DT",
            "PRDLST_NM",
            "PRDLST_DCNM",
            "PRODUCTION",
            "POG_DAYCNT"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM I2711 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC704\uC0DD\uC6A9\uD488\uD488\uBAA9\uC81C\uC870\uBCF4\uACE0 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRDLST_REPORT_NO",
              "PRMS_DT",
              "PRDLST_NM",
              "PRDLST_DCNM",
              "PRODUCTION",
              "POG_DAYCNT",
              "INDUTY_CD_NM",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM I2711"
            ]
          }
        },
        {
          "id": "I2712",
          "name": "\uC704\uC0DD\uC6A9\uD488\uD488\uBAA9\uC81C\uC870\uBCF4\uACE0(\uC6D0\uC7AC\uB8CC) (I2712)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2712 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRDLST_REPORT_NO",
            "PRMS_DT",
            "PRDLST_NM",
            "PRDLST_DCNM",
            "RAWMTRL_NM"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM I2712 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC704\uC0DD\uC6A9\uD488\uD488\uBAA9\uC81C\uC870\uBCF4\uACE0(\uC6D0\uC7AC\uB8CC) \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRDLST_REPORT_NO",
              "PRMS_DT",
              "PRDLST_NM",
              "PRDLST_DCNM",
              "RAWMTRL_NM"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM I2712"
            ]
          }
        },
        {
          "id": "I0140",
          "name": "\uC720\uC804\uC790\uBCC0\uD615\uC2DD\uD488\uB4F1\uC758 \uC548\uC804\uC131 \uD3C9\uAC00 \uC2EC\uC0AC \uACB0\uACFC \uD604\uD669 (I0140)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0140 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9",
          "includedData": [
            "PRDLST_NM",
            "GOODS_NM",
            "INJECTION_GENE_CN",
            "BSSH_NM",
            "PRSDNT_NM",
            "PRMS_DT",
            "ENDOW_CHARTR_CN",
            "GMO_SAFTY_NO"
          ],
          "keys": [
            "GMO_SAFTY_NO"
          ],
          "usageExample": "SELECT * FROM I0140 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC720\uC804\uC790\uBCC0\uD615\uC2DD\uD488\uB4F1\uC758 \uC548\uC804\uC131 \uD3C9\uAC00 \uC2EC\uC0AC \uACB0\uACFC \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDLST_NM",
              "GOODS_NM",
              "INJECTION_GENE_CN",
              "BSSH_NM",
              "PRSDNT_NM",
              "PRMS_DT",
              "ENDOW_CHARTR_CN",
              "GMO_SAFTY_NO",
              "GMO_PRDT_KND_CL_NM"
            ],
            "joinKeys": [
              "PK: GMO_SAFTY_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDLST_NM, GOODS_NM, INJECTION_GENE_CN FROM I0140"
            ]
          }
        },
        {
          "id": "I2570",
          "name": "\uC720\uD1B5\uBC14\uCF54\uB4DC (I2570)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2570 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "BRCD_NO",
            "PRDLST_REPORT_NO",
            "CMPNY_NM",
            "PRDT_NM",
            "LAST_UPDT_DTM",
            "PRDLST_NM",
            "HRNK_PRDLST_NM",
            "HTRK_PRDLST_NM"
          ],
          "keys": [
            "BRCD_NO"
          ],
          "usageExample": "SELECT * FROM I2570 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC720\uD1B5\uBC14\uCF54\uB4DC \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BRCD_NO",
              "PRDLST_REPORT_NO",
              "CMPNY_NM",
              "PRDT_NM",
              "LAST_UPDT_DTM",
              "PRDLST_NM",
              "HRNK_PRDLST_NM",
              "HTRK_PRDLST_NM"
            ],
            "joinKeys": [
              "PK: BRCD_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BRCD_NO, PRDLST_REPORT_NO, CMPNY_NM FROM I2570"
            ]
          }
        },
        {
          "id": "I2861",
          "name": "\uC74C\uC2DD\uC810\uC5C5\uC18C \uC778\uD5C8\uAC00 \uBCC0\uACBD \uC815\uBCF4 (I2861)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2861 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uCC3D\uC5C5 \uC0C1\uAD8C \uBD84\uC11D\uC6A9",
          "includedData": [
            "BSSH_NM",
            "INDUTY_CD_NM",
            "LCNS_NO",
            "TELNO",
            "SITE_ADDR",
            "CHNG_DT",
            "CHNG_BF_CN",
            "CHNG_AF_CN"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2861 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC74C\uC2DD\uC810\uC5C5\uC18C \uC778\uD5C8\uAC00 \uBCC0\uACBD \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSSH_NM",
              "INDUTY_CD_NM",
              "LCNS_NO",
              "TELNO",
              "SITE_ADDR",
              "CHNG_DT",
              "CHNG_BF_CN",
              "CHNG_AF_CN",
              "CHNG_PRVNS"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSSH_NM, INDUTY_CD_NM, LCNS_NO FROM I2861"
            ]
          }
        },
        {
          "id": "I2500",
          "name": "\uC778\uD5C8\uAC00 \uC5C5\uC18C \uC815\uBCF4 (I2500)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2500 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "INDUTY_CD_NM",
            "BSSH_NM",
            "PRSDNT_NM",
            "TELNO",
            "PRMS_DT",
            "ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2500 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC778\uD5C8\uAC00 \uC5C5\uC18C \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "INDUTY_CD_NM",
              "BSSH_NM",
              "PRSDNT_NM",
              "TELNO",
              "PRMS_DT",
              "ADDR"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, INDUTY_CD_NM, BSSH_NM FROM I2500"
            ]
          }
        },
        {
          "id": "I1090",
          "name": "\uC794\uB958\uB3D9\uBB3C\uC758\uC57D\uD488 \uC2DD\uD488\uBCC4 \uC794\uB958\uD5C8\uC6A9 \uAE30\uC900 (I1090)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1090 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "FOOD_KOR_NM",
            "FOOD_ENG_NM",
            "DEDE_NTK_QTY",
            "TMPR_STDR_APPLC_YN",
            "LCLAS_NM",
            "MLSFC_NM",
            "SCLAS_NM"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I1090 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC794\uB958\uB3D9\uBB3C\uC758\uC57D\uD488 \uC2DD\uD488\uBCC4 \uC794\uB958\uD5C8\uC6A9 \uAE30\uC900 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "FOOD_KOR_NM",
              "FOOD_ENG_NM",
              "DEDE_NTK_QTY",
              "TMPR_STDR_APPLC_YN",
              "LCLAS_NM",
              "MLSFC_NM",
              "SCLAS_NM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT FOOD_KOR_NM, FOOD_ENG_NM, DEDE_NTK_QTY FROM I1090"
            ]
          }
        },
        {
          "id": "COOKRCP01",
          "name": "\uC870\uB9AC\uC2DD\uD488\uC758 \uB808\uC2DC\uD53C DB (COOKRCP01)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI COOKRCP01 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "RCP_SEQ",
            "RCP_NM",
            "RCP_WAY2",
            "RCP_PAT2",
            "INFO_WGT",
            "INFO_ENG",
            "INFO_CAR",
            "INFO_PRO"
          ],
          "keys": [
            "RCP_SEQ"
          ],
          "usageExample": "SELECT * FROM COOKRCP01 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC870\uB9AC\uC2DD\uD488\uC758 \uB808\uC2DC\uD53C DB \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "RCP_SEQ",
              "RCP_NM",
              "RCP_WAY2",
              "RCP_PAT2",
              "INFO_WGT",
              "INFO_ENG",
              "INFO_CAR",
              "INFO_PRO",
              "INFO_FAT",
              "INFO_NA",
              "HASH_TAG",
              "ATT_FILE_NO_MAIN",
              "ATT_FILE_NO_MK",
              "RCP_PARTS_DTLS",
              "MANUAL01",
              "MANUAL_IMG01",
              "MANUAL02",
              "MANUAL_IMG02",
              "MANUAL03",
              "MANUAL_IMG03",
              "MANUAL04",
              "MANUAL_IMG04",
              "MANUAL05",
              "MANUAL_IMG05",
              "MANUAL06",
              "MANUAL_IMG06",
              "MANUAL07",
              "MANUAL_IMG07",
              "MANUAL08",
              "MANUAL_IMG08",
              "MANUAL09",
              "MANUAL_IMG09",
              "MANUAL10",
              "MANUAL_IMG10",
              "MANUAL11",
              "MANUAL_IMG11",
              "MANUAL12",
              "MANUAL_IMG12",
              "MANUAL13",
              "MANUAL_IMG13",
              "MANUAL14",
              "MANUAL_IMG14",
              "MANUAL15",
              "MANUAL_IMG15",
              "MANUAL16",
              "MANUAL_IMG16",
              "MANUAL17",
              "MANUAL_IMG17",
              "MANUAL18",
              "MANUAL_IMG18",
              "MANUAL19",
              "MANUAL_IMG19",
              "MANUAL20",
              "MANUAL_IMG20",
              "RCP_NA_TIP"
            ],
            "joinKeys": [
              "PK: RCP_SEQ"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT RCP_SEQ, RCP_NM, RCP_WAY2 FROM COOKRCP01"
            ]
          }
        },
        {
          "id": "I0060",
          "name": "\uC8FC\uB958\uC81C\uC870.\uBA74\uD5C8\uC790 \uC2DD\uD488\uC81C\uC870.\uAC00\uACF5\uC601\uC5C5 \uB4F1\uB85D \uD604\uD669 (I0060)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0060 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "BSSH_NM",
            "PRSDNT_NM",
            "ADDR",
            "LCNS_NO",
            "INDUTY_NM",
            "PRMS_DT",
            "INSTT_NM",
            "TELNO"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I0060 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC8FC\uB958\uC81C\uC870.\uBA74\uD5C8\uC790 \uC2DD\uD488\uC81C\uC870.\uAC00\uACF5\uC601\uC5C5 \uB4F1\uB85D \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSSH_NM",
              "PRSDNT_NM",
              "ADDR",
              "LCNS_NO",
              "INDUTY_NM",
              "PRMS_DT",
              "INSTT_NM",
              "TELNO"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSSH_NM, PRSDNT_NM, ADDR FROM I0060"
            ]
          }
        },
        {
          "id": "I2829",
          "name": "\uC989\uC11D\uD310\uB9E4\uC81C\uC870\uAC00\uACF5\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 (I2829)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2829 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2829 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC989\uC11D\uD310\uB9E4\uC81C\uC870\uAC00\uACF5\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO",
              "FK: LCNS_NO -> I2500.LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2829"
            ]
          }
        },
        {
          "id": "I2812",
          "name": "\uC989\uC11D\uD310\uB9E4\uC81C\uC870\uAC00\uACF5\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2812)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2812 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2812 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC989\uC11D\uD310\uB9E4\uC81C\uC870\uAC00\uACF5\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2812"
            ]
          }
        },
        {
          "id": "I2400",
          "name": "\uC9C0\uD558\uC218\uC218\uC9C8\uCE21\uC815\uB9DD \uCE21\uC815\uACB0\uACFC (I2400)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2400 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "YR",
            "QU",
            "SPOT_NO",
            "SIGNGU_NM",
            "ADDR",
            "PRPOS_NM",
            "DKPS_YN_NM",
            "HYDRIONDNSTY"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2400 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC9C0\uD558\uC218\uC218\uC9C8\uCE21\uC815\uB9DD \uCE21\uC815\uACB0\uACFC \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "YR",
              "QU",
              "SPOT_NO",
              "SIGNGU_NM",
              "ADDR",
              "PRPOS_NM",
              "DKPS_YN_NM",
              "HYDRIONDNSTY",
              "TOTEEC",
              "NO3N",
              "CI",
              "CDMM",
              "AS_",
              "CYN",
              "MRC",
              "ORGNICPH",
              "PHNL",
              "PB",
              "CR6",
              "TCE",
              "PCE",
              "TCE111",
              "BENZ",
              "TOLUE",
              "ETBEN",
              "XYLEN",
              "EC",
              "ARA_YN",
              "ARA"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT YR, QU, SPOT_NO FROM I2400"
            ]
          }
        },
        {
          "id": "I1210",
          "name": "\uC9D1\uB2E8\uAE09\uC2DD\uC18C \uC124\uCE58 \uD604\uD669 (I1210)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1210 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "CNCTR_MANAGE_BSSH_NO",
            "SIGNGU_CD_NM",
            "INDUTY_CL_CD_NM",
            "CNCTR_MANAGE_YN",
            "MLSV_MTHD_CD_NM",
            "FCPRV_NM",
            "FCPRV_PRSDNT_NM",
            "FCPRV_ADDR"
          ],
          "keys": [
            "CNCTR_MANAGE_BSSH_NO"
          ],
          "usageExample": "SELECT * FROM I1210 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC9D1\uB2E8\uAE09\uC2DD\uC18C \uC124\uCE58 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "CNCTR_MANAGE_BSSH_NO",
              "SIGNGU_CD_NM",
              "INDUTY_CL_CD_NM",
              "CNCTR_MANAGE_YN",
              "MLSV_MTHD_CD_NM",
              "FCPRV_NM",
              "FCPRV_PRSDNT_NM",
              "FCPRV_ADDR",
              "CNSGN_BSSH_NM",
              "ORGN_MLSV_YN",
              "CNSGN_PRSDNT_NM",
              "CNSGN_BSSH_ADDR",
              "RM"
            ],
            "joinKeys": [
              "PK: CNCTR_MANAGE_BSSH_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT CNCTR_MANAGE_BSSH_NO, SIGNGU_CD_NM, INDUTY_CL_CD_NM FROM I1210"
            ]
          }
        },
        {
          "id": "I2834",
          "name": "\uC9D1\uB2E8\uAE09\uC2DD\uC18C \uC778\uD5C8\uAC00 \uB300\uC7A5 (I2834)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2834 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2834 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC9D1\uB2E8\uAE09\uC2DD\uC18C \uC778\uD5C8\uAC00 \uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO",
              "FK: LCNS_NO -> I2500.LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2834"
            ]
          }
        },
        {
          "id": "I2820",
          "name": "\uC9D1\uB2E8\uAE09\uC2DD\uC18C \uD3D0\uC5C5\uC815\uBCF4 (I2820)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2820 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2820 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uC9D1\uB2E8\uAE09\uC2DD\uC18C \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2820"
            ]
          }
        },
        {
          "id": "I2550",
          "name": "\uCC98\uBD84\uAE30\uC900\uCF54\uB4DC (I2550)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2550 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uD589\uC815\uCC98\uBD84\xB7\uC81C\uC7AC",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC624\uD508\uB9C8\uCF13 \uD310\uB9E4\uC790 \uAC80\uC99D",
          "includedData": [
            "DSPS_STDR_CD",
            "HRNK_DSPS_STDR_CD",
            "LV_NO",
            "DSPS_STDR_CD_NM",
            "BASIS_LAWORD",
            "VILT_TYPE_CD",
            "VILT_TYPE_CD_NM",
            "USE_YN"
          ],
          "keys": [
            "DSPS_STDR_CD"
          ],
          "usageExample": "SELECT * FROM I2550 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCC98\uBD84\uAE30\uC900\uCF54\uB4DC \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "DSPS_STDR_CD",
              "HRNK_DSPS_STDR_CD",
              "LV_NO",
              "DSPS_STDR_CD_NM",
              "BASIS_LAWORD",
              "VILT_TYPE_CD",
              "VILT_TYPE_CD_NM",
              "USE_YN",
              "VALD_BGN_DT",
              "VALD_END_DT",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [
              "PK: DSPS_STDR_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT DSPS_STDR_CD, HRNK_DSPS_STDR_CD, LV_NO FROM I2550"
            ]
          }
        },
        {
          "id": "I2824",
          "name": "\uCD95\uC0B0\uBB3C \uAC00\uACF5\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2824)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2824 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2824 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C \uAC00\uACF5\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2824"
            ]
          }
        },
        {
          "id": "I1300",
          "name": "\uCD95\uC0B0\uBB3C \uAC00\uACF5\uC5C5\uD5C8\uAC00\uC815\uBCF4 (I1300)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1300 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM",
            "TELNO"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1300 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C \uAC00\uACF5\uC5C5\uD5C8\uAC00\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM",
              "TELNO"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1300"
            ]
          }
        },
        {
          "id": "I1330",
          "name": "\uCD95\uC0B0\uBB3C \uBCF4\uAD00\uC5C5\uC601\uC5C5\uD5C8\uAC00\uB300\uC7A5 (I1330)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1330 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1330 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C \uBCF4\uAD00\uC5C5\uC601\uC5C5\uD5C8\uAC00\uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1330"
            ]
          }
        },
        {
          "id": "I1420",
          "name": "\uCD95\uC0B0\uBB3C \uC0DD\uC0B0\uC2E4\uC801\uC815\uBCF4 (I1420)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1420 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "BSSH_NM",
            "PRDLST_NM",
            "GUBUN",
            "H_ITEM_NM",
            "LCNS_NO",
            "EVL_YR",
            "PRDLST_REPORT_NO",
            "FYER_PRDCTN_ABRT_QY"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM I1420 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C \uC0DD\uC0B0\uC2E4\uC801\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSSH_NM",
              "PRDLST_NM",
              "GUBUN",
              "H_ITEM_NM",
              "LCNS_NO",
              "EVL_YR",
              "PRDLST_REPORT_NO",
              "FYER_PRDCTN_ABRT_QY",
              "PRDCTN_QY"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSSH_NM, PRDLST_NM, GUBUN FROM I1420"
            ]
          }
        },
        {
          "id": "I2825",
          "name": "\uCD95\uC0B0\uBB3C \uC2DD\uC721\uD3EC\uC7A5\uCC98\uB9AC\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2825)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2825 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2825 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C \uC2DD\uC721\uD3EC\uC7A5\uCC98\uB9AC\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2825"
            ]
          }
        },
        {
          "id": "I1320",
          "name": "\uCD95\uC0B0\uBB3C \uC2DD\uC721\uD3EC\uC7A5\uCC98\uB9AC\uC5C5\uC601\uC5C5\uD5C8\uAC00\uB300\uC7A5 (I1320)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1320 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "CLSBIZ_DVS_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1320 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C \uC2DD\uC721\uD3EC\uC7A5\uCC98\uB9AC\uC5C5\uC601\uC5C5\uD5C8\uAC00\uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "CLSBIZ_DVS_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM",
              "TELNO"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1320"
            ]
          }
        },
        {
          "id": "I1340",
          "name": "\uCD95\uC0B0\uBB3C \uC6B4\uBC18\uC5C5\uC601\uC5C5\uC2E0\uACE0\uB300\uC7A5 (I1340)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1340 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1340 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C \uC6B4\uBC18\uC5C5\uC601\uC5C5\uC2E0\uACE0\uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1340"
            ]
          }
        },
        {
          "id": "I1370",
          "name": "\uCD95\uC0B0\uBB3C \uC9D1\uC720\uC5C5\uC601\uC5C5\uD5C8\uAC00\uB300\uC7A5 (I1370)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1370 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "CLSBIZ_DVS_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSTMP_BGN_DT"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1370 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C \uC9D1\uC720\uC5C5\uC601\uC5C5\uD5C8\uAC00\uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "CLSBIZ_DVS_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSTMP_BGN_DT",
              "CLSTMP_END_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1370"
            ]
          }
        },
        {
          "id": "I2826",
          "name": "\uCD95\uC0B0\uBB3C \uD310\uB9E4\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 (I2826)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2826 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2826 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C \uD310\uB9E4\uC5C5 \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2826"
            ]
          }
        },
        {
          "id": "I1350",
          "name": "\uCD95\uC0B0\uBB3C \uD310\uB9E4\uC5C5\uC601\uC5C5\uC2E0\uACE0\uB300\uC7A5 (I1350)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1350 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790",
          "process": "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "LOCP_ADDR",
            "INSTT_NM"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I1350 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C \uD310\uB9E4\uC5C5\uC601\uC5C5\uC2E0\uACE0\uB300\uC7A5 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I1350"
            ]
          }
        },
        {
          "id": "I1310",
          "name": "\uCD95\uC0B0\uBB3C \uD488\uBAA9\uC81C\uC870\uC815\uBCF4 (I1310)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1310 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRDLST_REPORT_NO",
            "PRMS_DT",
            "PRDLST_NM",
            "PRDLST_DCNM",
            "PRODUCTION",
            "HIENG_LNTRT_DVS_NM"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM I1310 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C \uD488\uBAA9\uC81C\uC870\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRDLST_REPORT_NO",
              "PRMS_DT",
              "PRDLST_NM",
              "PRDLST_DCNM",
              "PRODUCTION",
              "HIENG_LNTRT_DVS_NM",
              "CHILD_CRTFC_YN",
              "POG_DAYCNT",
              "INDUTY_CD_NM",
              "LAST_UPDT_DTM"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRDLST_REPORT_NO FROM I1310"
            ]
          }
        },
        {
          "id": "I2828",
          "name": "\uCD95\uC0B0\uBB3C(\uB3C4\uCD95\uC5C5,\uBCF4\uAD00\uC5C5,\uC6B4\uBC18\uC5C5,\uC9D1\uC720\uC5C5,\uC2DD\uC6A9\uB780\uC120\uBCC4\uD3EC\uC7A5\uC5C5) \uD3D0\uC5C5\uC815\uBCF4 (I2828)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2828 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "PRSDNT_NM",
            "INDUTY_NM",
            "PRMS_DT",
            "CLSBIZ_DT",
            "CLSBIZ_DVS_CD_NM",
            "LOCP_ADDR"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2828 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C(\uB3C4\uCD95\uC5C5,\uBCF4\uAD00\uC5C5,\uC6B4\uBC18\uC5C5,\uC9D1\uC720\uC5C5,\uC2DD\uC6A9\uB780\uC120\uBCC4\uD3EC\uC7A5\uC5C5) \uD3D0\uC5C5\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "PRSDNT_NM",
              "INDUTY_NM",
              "PRMS_DT",
              "CLSBIZ_DT",
              "CLSBIZ_DVS_CD_NM",
              "LOCP_ADDR",
              "INSTT_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, PRSDNT_NM FROM I2828"
            ]
          }
        },
        {
          "id": "I0610",
          "name": "\uCD95\uC0B0\uBB3CHACCP \uC9C0\uC815\uC815\uBCF4 (I0610)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0610 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "BSSH_NM",
            "INDUTY_CD_NM",
            "PRSDNT_NM",
            "CLSBIZ_DVS_CD_NM",
            "CLSBIZ_DT",
            "SITE_ADDR",
            "HACCP_APPN_DT"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I0610 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3CHACCP \uC9C0\uC815\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "BSSH_NM",
              "INDUTY_CD_NM",
              "PRSDNT_NM",
              "CLSBIZ_DVS_CD_NM",
              "CLSBIZ_DT",
              "SITE_ADDR",
              "HACCP_APPN_DT",
              "HACCP_APPN_NO",
              "ASGN_CANCL_DT",
              "CRTFC_ENDDT",
              "CRTFC_RETN_DT"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, BSSH_NM, INDUTY_CD_NM FROM I0610"
            ]
          }
        },
        {
          "id": "I0900",
          "name": "\uCD95\uC0B0\uBB3C\uC704\uC0DD\uAC80\uC0AC\uAE30\uAD00 \uC9C0\uC815 \uD604\uD669 (I0900)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0900 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9",
          "includedData": [
            "BSSH_NM",
            "PRSDNT_NM",
            "ADDR",
            "APPN_BGN_DT",
            "APPN_END_DT",
            "WORK_SCOPE"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I0900 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C\uC704\uC0DD\uAC80\uC0AC\uAE30\uAD00 \uC9C0\uC815 \uD604\uD669 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSSH_NM",
              "PRSDNT_NM",
              "ADDR",
              "APPN_BGN_DT",
              "APPN_END_DT",
              "WORK_SCOPE"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSSH_NM, PRSDNT_NM, ADDR FROM I0900"
            ]
          }
        },
        {
          "id": "C006",
          "name": "\uCD95\uC0B0\uBB3C\uD488\uBAA9\uC81C\uC870\uBCF4\uACE0(\uC6D0\uC7AC\uB8CC) (C006)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI C006 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "BSSH_NM",
            "PRDLST_REPORT_NO",
            "PRMS_DT",
            "PRDLST_NM",
            "PRDLST_DCNM",
            "RAWMTRL_NM",
            "LCNS_NO",
            "CHNG_DT"
          ],
          "keys": [
            "PRDLST_REPORT_NO"
          ],
          "usageExample": "SELECT * FROM C006 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uCD95\uC0B0\uBB3C\uD488\uBAA9\uC81C\uC870\uBCF4\uACE0(\uC6D0\uC7AC\uB8CC) \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSSH_NM",
              "PRDLST_REPORT_NO",
              "PRMS_DT",
              "PRDLST_NM",
              "PRDLST_DCNM",
              "RAWMTRL_NM",
              "LCNS_NO",
              "CHNG_DT",
              "RAWMTRL_ORDNO"
            ],
            "joinKeys": [
              "PK: PRDLST_REPORT_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSSH_NM, PRDLST_REPORT_NO, PRMS_DT FROM C006"
            ]
          }
        },
        {
          "id": "I2390",
          "name": "\uD1A0\uC591\uC9C0\uD558\uC218 \uD1A0\uC591\uC2E4\uD0DC\uC870\uC0AC\uC815\uBCF4 (I2390)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2390 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "SOIL_SEQ",
            "EXAM_YR",
            "CHARTR_CL_NM",
            "ADDR",
            "LNDCGR_NM",
            "AREA",
            "CDMM",
            "COPPR"
          ],
          "keys": [
            "SOIL_SEQ"
          ],
          "usageExample": "SELECT * FROM I2390 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD1A0\uC591\uC9C0\uD558\uC218 \uD1A0\uC591\uC2E4\uD0DC\uC870\uC0AC\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "SOIL_SEQ",
              "EXAM_YR",
              "CHARTR_CL_NM",
              "ADDR",
              "LNDCGR_NM",
              "AREA",
              "CDMM",
              "COPPR",
              "AS_",
              "MRC",
              "PB",
              "CR6",
              "ZINC",
              "NICKEL",
              "IMCOW",
              "ORGNICPH",
              "PCT",
              "CYN",
              "PHNL",
              "BENZ",
              "TOLUE",
              "ETBEN",
              "XYLEN",
              "TPH",
              "TCE",
              "PCE",
              "HYDRIONDNSTY",
              "RM"
            ],
            "joinKeys": [
              "PK: SOIL_SEQ"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT SOIL_SEQ, EXAM_YR, CHARTR_CL_NM FROM I2390"
            ]
          }
        },
        {
          "id": "I1960",
          "name": "\uD328\uB958\uB3C5\uC18C\uC815\uBCF4 (I1960)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I1960 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRDLST_NM",
            "EXAM_SPOT_NM",
            "EXAM_SEAR_NM",
            "SPLORE_NO",
            "INSTT_NM",
            "PICK_DT",
            "WTNESSMAN_NM",
            "ORGNP_NM"
          ],
          "keys": [
            "SPLORE_NO"
          ],
          "usageExample": "SELECT * FROM I1960 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD328\uB958\uB3C5\uC18C\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDLST_NM",
              "EXAM_SPOT_NM",
              "EXAM_SEAR_NM",
              "SPLORE_NO",
              "INSTT_NM",
              "PICK_DT",
              "WTNESSMAN_NM",
              "ORGNP_NM",
              "SALT",
              "TEMOD",
              "SPLORE_DSUSE_DT",
              "FIT_YN"
            ],
            "joinKeys": [
              "PK: SPLORE_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDLST_NM, EXAM_SPOT_NM, EXAM_SEAR_NM FROM I1960"
            ]
          }
        },
        {
          "id": "I2856",
          "name": "\uD478\uB4DC\uD2B8\uB7ED\uC9C0\uC815\uD604\uD669\uC870\uD68C (I2856)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2856 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9",
          "includedData": [
            "LCNS_NO",
            "PRMS_DT",
            "INSTT_CDNM",
            "INDUTY_CDNM",
            "BSSH_NM",
            "LOCP_ADDR",
            "PRSDNT_NM",
            "TELNO"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2856 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD478\uB4DC\uD2B8\uB7ED\uC9C0\uC815\uD604\uD669\uC870\uD68C \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LCNS_NO",
              "PRMS_DT",
              "INSTT_CDNM",
              "INDUTY_CDNM",
              "BSSH_NM",
              "LOCP_ADDR",
              "PRSDNT_NM",
              "TELNO",
              "CHNG_DT"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LCNS_NO, PRMS_DT, INSTT_CDNM FROM I2856"
            ]
          }
        },
        {
          "id": "I2510",
          "name": "\uD488\uBAA9\uC720\uD615\uCF54\uB4DC (I2510)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2510 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "LV",
            "PRDLST_CD",
            "KOR_NM",
            "ENG_NM",
            "DFN",
            "VALD_BEGN_DT",
            "VALD_END_DT",
            "HRNK_PRDLST_CD"
          ],
          "keys": [
            "PRDLST_CD"
          ],
          "usageExample": "SELECT * FROM I2510 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD488\uBAA9\uC720\uD615\uCF54\uB4DC \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "LV",
              "PRDLST_CD",
              "KOR_NM",
              "ENG_NM",
              "DFN",
              "VALD_BEGN_DT",
              "VALD_END_DT",
              "HRNK_PRDLST_CD",
              "HTRK_PRDLST_CD",
              "MXTR_PRDLST_YN",
              "ATTRB_SEQ",
              "PIAM_KOR_NM",
              "PRDLST_YN",
              "UPDT_PRVNS",
              "USE_YN",
              "RM",
              "FDGRP_YN",
              "LAST_UPDT_DTM",
              "CHD_SMBL_FD_YN"
            ],
            "joinKeys": [
              "PK: PRDLST_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT LV, PRDLST_CD, KOR_NM FROM I2510"
            ]
          }
        },
        {
          "id": "I2380",
          "name": "\uD558\uC218\uB3C4 \uC218\uC9C8\uC815\uBCF4 (I2380)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2380 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "FCLTY_NM",
            "CTPRVN_NM",
            "SIGNGU_NM",
            "ZIPNO",
            "BASS_ADDR",
            "DTL_ADDR",
            "ROADNM_BASS_ADDR",
            "ROADNM_DTL_ADDR"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2380 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD558\uC218\uB3C4 \uC218\uC9C8\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "FCLTY_NM",
              "CTPRVN_NM",
              "SIGNGU_NM",
              "ZIPNO",
              "BASS_ADDR",
              "DTL_ADDR",
              "ROADNM_BASS_ADDR",
              "ROADNM_DTL_ADDR",
              "MESURE_DT",
              "FCLTY_CD",
              "PAPRONSLF_NM",
              "RIVR_NM",
              "BASE_FCLTY_DVS_NM",
              "BOD",
              "COD",
              "SS",
              "TP",
              "TN",
              "EEC_QTY",
              "TEMOD",
              "ECLGY_TOXCTY"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT FCLTY_NM, CTPRVN_NM, SIGNGU_NM FROM I2380"
            ]
          }
        },
        {
          "id": "I2810",
          "name": "\uD574\uC678 \uC704\uD574\uC2DD\uD488 \uD68C\uC218\uC815\uBCF4 (I2810)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2810 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 1\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 1,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uC704\uD574\xB7\uD68C\uC218 \uC815\uBCF4",
          "theme": "\uC624\uD508\uB9C8\uCF13 \uD310\uB9E4\uC790 \uAC80\uC99D",
          "includedData": [
            "TITL",
            "DETECT_TITL",
            "CRET_DTM",
            "BDT",
            "DOWNLOAD_URL",
            "NTCTXT_NO"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I2810 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD574\uC678 \uC704\uD574\uC2DD\uD488 \uD68C\uC218\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "TITL",
              "DETECT_TITL",
              "CRET_DTM",
              "BDT",
              "DOWNLOAD_URL",
              "NTCTXT_NO"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT TITL, DETECT_TITL, CRET_DTM FROM I2810"
            ]
          }
        },
        {
          "id": "I2715",
          "name": "\uD574\uC678\uC9C1\uAD6C \uC704\uD574\uC2DD\uD488 \uCC28\uB2E8\uC815\uBCF4 (I2715)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2715 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uC704\uD574\xB7\uD68C\uC218 \uC815\uBCF4",
          "theme": "\uC77C\uBC18 \uC870\uD68C\uC6A9",
          "includedData": [
            "PRDT_NM",
            "MUFC_NM",
            "MUFC_CNTRY_NM",
            "INGR_NM_LST",
            "STT_YMD",
            "END_YMD",
            "CRET_DTM",
            "LAST_UPDT_DTM"
          ],
          "keys": [
            "SELF_IMPORT_SEQ"
          ],
          "usageExample": "SELECT * FROM I2715 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD574\uC678\uC9C1\uAD6C \uC704\uD574\uC2DD\uD488 \uCC28\uB2E8\uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDT_NM",
              "MUFC_NM",
              "MUFC_CNTRY_NM",
              "INGR_NM_LST",
              "STT_YMD",
              "END_YMD",
              "CRET_DTM",
              "LAST_UPDT_DTM",
              "IMAGE_URL",
              "SELF_IMPORT_SEQ",
              "BARCD_CTN"
            ],
            "joinKeys": [
              "PK: SELF_IMPORT_SEQ"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDT_NM, MUFC_NM, MUFC_CNTRY_NM FROM I2715"
            ]
          }
        },
        {
          "id": "I0470",
          "name": "\uD589\uC815\uCC98\uBD84\uACB0\uACFC (I0470)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0470 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uD589\uC815\uCC98\uBD84\xB7\uC81C\uC7AC",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC624\uD508\uB9C8\uCF13 \uD310\uB9E4\uC790 \uAC80\uC99D",
          "includedData": [
            "PRCSCITYPOINT_BSSHNM",
            "INDUTY_CD_NM",
            "LCNS_NO",
            "DSPS_DCSNDT",
            "DSPS_BGNDT",
            "DSPS_ENDDT",
            "DSPS_TYPECD_NM",
            "VILTCN"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I0470 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD589\uC815\uCC98\uBD84\uACB0\uACFC \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRCSCITYPOINT_BSSHNM",
              "INDUTY_CD_NM",
              "LCNS_NO",
              "DSPS_DCSNDT",
              "DSPS_BGNDT",
              "DSPS_ENDDT",
              "DSPS_TYPECD_NM",
              "VILTCN",
              "ADDR",
              "TELNO",
              "PRSDNT_NM",
              "DSPSCN",
              "LAWORD_CD_NM",
              "PUBLIC_DT",
              "LAST_UPDT_DTM",
              "DSPS_INSTTCD_NM",
              "DSPSDTLS_SEQ"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRCSCITYPOINT_BSSHNM, INDUTY_CD_NM, LCNS_NO FROM I0470"
            ]
          }
        },
        {
          "id": "I0482",
          "name": "\uD589\uC815\uCC98\uBD84\uACB0\uACFC(\uC218\uC785\uC2DD\uD488\uC5C5) (I0482)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0482 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC218\uC785\uC2DD\uD488",
          "process": "\uD589\uC815\uCC98\uBD84\xB7\uC81C\uC7AC",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC624\uD508\uB9C8\uCF13 \uD310\uB9E4\uC790 \uAC80\uC99D",
          "includedData": [
            "PRCSCITYPOINT_BSSHNM",
            "INDUTY_CD_NM",
            "LCNS_NO",
            "DSPS_DCSNDT",
            "DSPS_BGNDT",
            "DSPS_ENDDT",
            "DSPS_TYPECD_NM",
            "VILTCN"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I0482 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD589\uC815\uCC98\uBD84\uACB0\uACFC(\uC218\uC785\uC2DD\uD488\uC5C5) \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRCSCITYPOINT_BSSHNM",
              "INDUTY_CD_NM",
              "LCNS_NO",
              "DSPS_DCSNDT",
              "DSPS_BGNDT",
              "DSPS_ENDDT",
              "DSPS_TYPECD_NM",
              "VILTCN",
              "ADDR",
              "TELNO",
              "PRSDNT_NM",
              "LAWORD_CD_NM",
              "DSPSCN",
              "PUBLIC_DT",
              "LAST_UPDT_DTM",
              "DSPSDTLS_SEQ",
              "DSPS_INSTTCD_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRCSCITYPOINT_BSSHNM, INDUTY_CD_NM, LCNS_NO FROM I0482"
            ]
          }
        },
        {
          "id": "I2630",
          "name": "\uD589\uC815\uCC98\uBD84\uACB0\uACFC(\uC2DD\uD488\uC811\uAC1D\uC5C5) (I2630)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I2630 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uD589\uC815\uCC98\uBD84\xB7\uC81C\uC7AC",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC624\uD508\uB9C8\uCF13 \uD310\uB9E4\uC790 \uAC80\uC99D",
          "includedData": [
            "PRCSCITYPOINT_BSSHNM",
            "INDUTY_CD_NM",
            "LCNS_NO",
            "DSPS_DCSNDT",
            "DSPS_BGNDT",
            "DSPS_ENDDT",
            "DSPS_TYPECD_NM",
            "VILTCN"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I2630 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD589\uC815\uCC98\uBD84\uACB0\uACFC(\uC2DD\uD488\uC811\uAC1D\uC5C5) \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRCSCITYPOINT_BSSHNM",
              "INDUTY_CD_NM",
              "LCNS_NO",
              "DSPS_DCSNDT",
              "DSPS_BGNDT",
              "DSPS_ENDDT",
              "DSPS_TYPECD_NM",
              "VILTCN",
              "ADDR",
              "TEL_NO",
              "PRSDNT_NM",
              "DSPSCN",
              "LAWORD_CD_NM",
              "PUBLIC_DT",
              "LAST_UPDT_DTM",
              "DSPS_INSTTCD_NM",
              "DSPSDTLS_SEQ"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRCSCITYPOINT_BSSHNM, INDUTY_CD_NM, LCNS_NO FROM I2630"
            ]
          }
        },
        {
          "id": "I0480",
          "name": "\uD589\uC815\uCC98\uBD84\uACB0\uACFC(\uC2DD\uD488\uC81C\uC870\uAC00\uACF5\uC5C5) (I0480)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0480 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uC2DD\uD488\xB7\uC81C\uD488",
          "process": "\uD589\uC815\uCC98\uBD84\xB7\uC81C\uC7AC",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC624\uD508\uB9C8\uCF13 \uD310\uB9E4\uC790 \uAC80\uC99D",
          "includedData": [
            "PRCSCITYPOINT_BSSHNM",
            "INDUTY_CD_NM",
            "LCNS_NO",
            "DSPS_DCSNDT",
            "DSPS_BGNDT",
            "DSPS_ENDDT",
            "DSPS_TYPECD_NM",
            "VILTCN"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I0480 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD589\uC815\uCC98\uBD84\uACB0\uACFC(\uC2DD\uD488\uC81C\uC870\uAC00\uACF5\uC5C5) \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRCSCITYPOINT_BSSHNM",
              "INDUTY_CD_NM",
              "LCNS_NO",
              "DSPS_DCSNDT",
              "DSPS_BGNDT",
              "DSPS_ENDDT",
              "DSPS_TYPECD_NM",
              "VILTCN",
              "ADDR",
              "TELNO",
              "PRSDNT_NM",
              "LAWORD_CD_NM",
              "DSPSCN",
              "PUBLIC_DT",
              "LAST_UPDT_DTM",
              "DSPSDTLS_SEQ",
              "DSPS_INSTTCD_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRCSCITYPOINT_BSSHNM, INDUTY_CD_NM, LCNS_NO FROM I0480"
            ]
          }
        },
        {
          "id": "I0481",
          "name": "\uD589\uC815\uCC98\uBD84\uACB0\uACFC(\uC2DD\uD488\uD310\uB9E4\uC5C5) (I0481)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0481 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uD589\uC815\uCC98\uBD84\xB7\uC81C\uC7AC",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uC624\uD508\uB9C8\uCF13 \uD310\uB9E4\uC790 \uAC80\uC99D",
          "includedData": [
            "PRCSCITYPOINT_BSSHNM",
            "INDUTY_CD_NM",
            "LCNS_NO",
            "DSPS_DCSNDT",
            "DSPS_BGNDT",
            "DSPS_ENDDT",
            "DSPS_TYPECD_NM",
            "VILTCN"
          ],
          "keys": [
            "LCNS_NO"
          ],
          "usageExample": "SELECT * FROM I0481 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD589\uC815\uCC98\uBD84\uACB0\uACFC(\uC2DD\uD488\uD310\uB9E4\uC5C5) \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRCSCITYPOINT_BSSHNM",
              "INDUTY_CD_NM",
              "LCNS_NO",
              "DSPS_DCSNDT",
              "DSPS_BGNDT",
              "DSPS_ENDDT",
              "DSPS_TYPECD_NM",
              "VILTCN",
              "ADDR",
              "TELNO",
              "PRSDNT_NM",
              "LAWORD_CD_NM",
              "DSPSCN",
              "PUBLIC_DT",
              "LAST_UPDT_DTM",
              "DSPSDTLS_SEQ",
              "DSPS_INSTTCD_NM"
            ],
            "joinKeys": [
              "PK: LCNS_NO"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRCSCITYPOINT_BSSHNM, INDUTY_CD_NM, LCNS_NO FROM I0481"
            ]
          }
        },
        {
          "id": "I0490",
          "name": "\uD68C\uC218.\uD310\uB9E4\uC911\uC9C0 \uC815\uBCF4 (I0490)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0490 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC77C\uBC18\uC815\uBCF4",
          "issue": "\uC704\uD574\xB7\uD68C\uC218 \uC815\uBCF4",
          "theme": "\uC624\uD508\uB9C8\uCF13 \uD310\uB9E4\uC790 \uAC80\uC99D",
          "includedData": [
            "PRDTNM",
            "RTRVLPRVNS",
            "BSSHNM",
            "ADDR",
            "TELNO",
            "BRCDNO",
            "FRMLCUNIT",
            "MNFDT"
          ],
          "keys": [
            "PRDLST_CD"
          ],
          "usageExample": "SELECT * FROM I0490 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD68C\uC218.\uD310\uB9E4\uC911\uC9C0 \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "PRDTNM",
              "RTRVLPRVNS",
              "BSSHNM",
              "ADDR",
              "TELNO",
              "BRCDNO",
              "FRMLCUNIT",
              "MNFDT",
              "RTRVLPLANDOC_RTRVLMTHD",
              "DISTBTMLMT",
              "PRDLST_TYPE",
              "IMG_FILE_PATH",
              "PRDLST_CD",
              "CRET_DTM",
              "RTRVLDSUSE_SEQ",
              "PRDLST_REPORT_NO",
              "RTRVL_GRDCD_NM",
              "PRDLST_CD_NM",
              "LCNS_NO"
            ],
            "joinKeys": [
              "PK: PRDLST_CD"
            ],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT PRDTNM, RTRVLPRVNS, BSSHNM FROM I0490"
            ]
          }
        },
        {
          "id": "I0150",
          "name": "\uD6C4\uB300\uAD50\uBC30\uC885\uC758 \uC548\uC804\uC131 \uD3C9\uAC00 \uC2E0\uCCAD \uBC0F \uAC80\uD1A0 \uC815\uBCF4 (I0150)",
          "description": "\uC2DD\uC57D\uCC98 OpenAPI I0150 \uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uCD1D 5\uAC74\uC758 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
          "users": [
            "\uAC1C\uBC1C\uC790",
            "\uB370\uC774\uD130\uBD84\uC11D\uAC00"
          ],
          "dataCount": 5,
          "formats": [
            "SQLite",
            "Open API"
          ],
          "difficulty": "intermediate",
          "subject": "\uAE30\uD0C0",
          "process": "\uC2EC\uC0AC\xB7\uD3C9\uAC00",
          "issue": "\uD574\uB2F9\uC5C6\uC74C",
          "theme": "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9",
          "includedData": [
            "BSSH_NM",
            "PRSDNT_NM",
            "PRMS_DT",
            "PRDLST_NM",
            "LMOCHILD_BTHTR_CRSS_YN",
            "LMOCHILD_DFFPNT_YN",
            "LMOCHILD_CHARTR_CHNGE_YN",
            "GMO_PRDT_KND"
          ],
          "keys": [
            "PK \uC5C6\uC74C"
          ],
          "usageExample": "SELECT * FROM I0150 LIMIT 10;",
          "detail": {
            "overview": "\uC2DD\uC57D\uCC98 OpenAPI \uD30C\uC2F1\uC744 \uD1B5\uD574 RDBMS\uB85C \uAD6C\uCD95\uB41C \uD6C4\uB300\uAD50\uBC30\uC885\uC758 \uC548\uC804\uC131 \uD3C9\uAC00 \uC2E0\uCCAD \uBC0F \uAC80\uD1A0 \uC815\uBCF4 \uD14C\uC774\uBE14\uC758 \uBA54\uD0C0\uB370\uC774\uD130\uC785\uB2C8\uB2E4.",
            "includedList": [
              "BSSH_NM",
              "PRSDNT_NM",
              "PRMS_DT",
              "PRDLST_NM",
              "LMOCHILD_BTHTR_CRSS_YN",
              "LMOCHILD_DFFPNT_YN",
              "LMOCHILD_CHARTR_CHNGE_YN",
              "GMO_PRDT_KND",
              "GOODS_NM"
            ],
            "joinKeys": [],
            "scenarios": [
              "\uB370\uC774\uD130 \uD1B5\uD569 \uCFFC\uB9AC \uC791\uC131",
              "\uAD00\uACC4\uD615 \uB370\uC774\uD130 \uBD84\uC11D"
            ],
            "recommendedUsers": [
              "\uBC31\uC5D4\uB4DC \uAC1C\uBC1C\uC790",
              "\uB370\uC774\uD130 \uC5D4\uC9C0\uB2C8\uC5B4"
            ],
            "guideLinks": [
              {
                "label": "\uD14C\uC774\uBE14 \uAD6C\uC870 \uD655\uC778",
                "url": "#"
              }
            ],
            "examples": [
              "SELECT BSSH_NM, PRSDNT_NM, PRMS_DT FROM I0150"
            ]
          }
        }
      ];
      subjectFilters = [
        { value: "all", label: "\uC804\uCCB4" },
        { value: "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790", label: "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790" },
        { value: "\uC2DD\uD488\xB7\uC81C\uD488", label: "\uC2DD\uD488\xB7\uC81C\uD488" },
        { value: "\uC6D0\uC7AC\uB8CC\xB7\uCCA8\uAC00\uBB3C", label: "\uC6D0\uC7AC\uB8CC\xB7\uCCA8\uAC00\uBB3C" },
        { value: "\uC601\uC591\xB7\uAC74\uAC15", label: "\uC601\uC591\xB7\uAC74\uAC15" },
        { value: "\uC218\uC785\uC2DD\uD488", label: "\uC218\uC785\uC2DD\uD488" },
        { value: "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C", label: "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C" },
        { value: "\uAE30\uD0C0", label: "\uAE30\uD0C0" }
      ];
      processFilters = [
        { value: "all", label: "\uC804\uCCB4" },
        { value: "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0", label: "\uC778\uD5C8\uAC00\xB7\uC2E0\uACE0" },
        { value: "\uC2EC\uC0AC\xB7\uD3C9\uAC00", label: "\uC2EC\uC0AC\xB7\uD3C9\uAC00" },
        { value: "\uC548\uC804\uAD00\uB9AC\xB7\uC810\uAC80", label: "\uC548\uC804\uAD00\uB9AC\xB7\uC810\uAC80" },
        { value: "\uD589\uC815\uCC98\uBD84\xB7\uC81C\uC7AC", label: "\uD589\uC815\uCC98\uBD84\xB7\uC81C\uC7AC" },
        { value: "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801", label: "\uC720\uD1B5\xB7\uC774\uB825\uCD94\uC801" },
        { value: "\uC77C\uBC18\uC815\uBCF4", label: "\uC77C\uBC18\uC815\uBCF4" }
      ];
      issueFilters = [
        { value: "all", label: "\uC804\uCCB4" },
        { value: "\uC704\uD574\xB7\uD68C\uC218 \uC815\uBCF4", label: "\uC704\uD574\xB7\uD68C\uC218 \uC815\uBCF4" },
        { value: "\uC2DD\uC911\uB3C5\xB7\uAC10\uC5FC\uBCD1", label: "\uC2DD\uC911\uB3C5\xB7\uAC10\uC5FC\uBCD1" },
        { value: "\uC720\uD574\uBB3C\uC9C8 \uAC80\uCD9C", label: "\uC720\uD574\uBB3C\uC9C8 \uAC80\uCD9C" },
        { value: "\uCDE8\uC57D\uACC4\uCE35 \uBA39\uAC70\uB9AC", label: "\uCDE8\uC57D\uACC4\uCE35 \uBA39\uAC70\uB9AC" },
        { value: "\uD574\uC678\uC9C1\uAD6C \uC548\uC804\uC131", label: "\uD574\uC678\uC9C1\uAD6C \uC548\uC804\uC131" },
        { value: "\uD574\uB2F9\uC5C6\uC74C", label: "\uD574\uB2F9\uC5C6\uC74C" }
      ];
      themeFilters = [
        { value: "all", label: "\uC804\uCCB4" },
        { value: "\uC624\uD508\uB9C8\uCF13 \uD310\uB9E4\uC790 \uAC80\uC99D", label: "\uC624\uD508\uB9C8\uCF13 \uD310\uB9E4\uC790 \uAC80\uC99D" },
        { value: "\uD5EC\uC2A4\uCF00\uC5B4 \uC571 \uAC1C\uBC1C\uC6A9", label: "\uD5EC\uC2A4\uCF00\uC5B4 \uC571 \uAC1C\uBC1C\uC6A9" },
        { value: "\uCC3D\uC5C5 \uC0C1\uAD8C \uBD84\uC11D\uC6A9", label: "\uCC3D\uC5C5 \uC0C1\uAD8C \uBD84\uC11D\uC6A9" },
        { value: "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9", label: "\uD559\uC220\xB7\uC815\uCC45 \uC5F0\uAD6C\uC6A9" },
        { value: "\uC77C\uBC18 \uC870\uD68C\uC6A9", label: "\uC77C\uBC18 \uC870\uD68C\uC6A9" }
      ];
      purposes = [
        {
          id: "purpose-01",
          title: "\u{1F6D2} \uC624\uD508\uB9C8\uCF13 \uD310\uB9E4\uC790 \uAC80\uC99D \uC2DC\uC2A4\uD15C \uAD6C\uCD95",
          icon: "ri-store-2-line",
          description: "\uC774\uCEE4\uBA38\uC2A4 \uC785\uC810 \uC2DC \uD310\uB9E4\uC790\uC758 \uC778\uD5C8\uAC00 \uC5EC\uBD80\uC640 \uACFC\uAC70 \uC704\uBC18 \uC774\uB825\uC744 \uB300\uC870\uD558\uC5EC \uC548\uC804\uD55C \uC785\uC810 \uD658\uACBD\uC744 \uAD6C\uCD95\uD569\uB2C8\uB2E4.",
          recommendedDatasets: ["I1220", "I2500", "I0680"],
          reason: "\uC815\uC0C1 \uC601\uC5C5 \uC5EC\uBD80 \uBC0F \uACFC\uAC70 \uD589\uC815\uCC98\uBD84(\uC704\uBC18) \uC774\uB825\uC744 \uD655\uC778\uD558\uC5EC \uBD88\uB7C9 \uD310\uB9E4\uC790\uC758 \uC785\uC810\uC744 \uC0AC\uC804\uC5D0 \uCC28\uB2E8\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
          steps: ["\uC785\uC810 \uC5C5\uCCB4\uC758 \uC778\uD5C8\uAC00\uBC88\uD638(LCNS_NO) \uC870\uD68C", "\uC2DD\uD488\uC81C\uC870/\uC811\uAC1D\uC5C5 \uD5C8\uAC00 \uC720\uD6A8\uC131 \uAC80\uC99D", "\uACFC\uAC70 \uD589\uC815\uCC98\uBD84 \uC774\uB825 \uB300\uC870"],
          relatedApis: ["\uC2DD\uD488\uC81C\uC870\uAC00\uACF5\uC5C5", "\uD734\uAC8C\uC74C\uC2DD\uC810", "\uD589\uC815\uCC98\uBD84\uB0B4\uC5ED"],
          requiredLevel: "\uC911\uAE09",
          beginnerTip: "\uCD94\uCC9C \uB370\uC774\uD130\uC138\uD2B8\uB97C \uD074\uB9AD\uD558\uC5EC [\uC778\uD5C8\uAC00\uBC88\uD638]\uB97C \uAE30\uC900\uC73C\uB85C \uC5B4\uB5BB\uAC8C \uB370\uC774\uD130\uB97C \uC870\uD569\uD560\uC9C0 \uD655\uC778\uD574 \uBCF4\uC138\uC694.",
          devTip: "\uD310\uB9E4\uC790\uAC00 \uC785\uB825\uD55C \uC0AC\uC5C5\uC790\uB4F1\uB85D\uBC88\uD638\uC640 \uC2DD\uC57D\uCC98 \uC778\uD5C8\uAC00\uBC88\uD638\uB97C \uB9E4\uD551\uD558\uB294 \uC911\uAC04 \uD14C\uC774\uBE14 \uAD6C\uC870\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4."
        },
        {
          id: "purpose-02",
          title: "\u{1F4F1} \uB9DE\uCDA4\uD615 \uD5EC\uC2A4\uCF00\uC5B4\xB7\uC2DD\uB2E8 \uAD00\uB9AC \uC571 \uAC1C\uBC1C",
          icon: "ri-heart-pulse-line",
          description: "\uB2E4\uC774\uC5B4\uD2B8 \uBC0F \uC9C8\uD658 \uAD00\uB9AC\uB97C \uC704\uD55C \uCE7C\uB85C\uB9AC, \uC601\uC591\uC18C API\uB97C \uC5F0\uB3D9\uD558\uB294 \uBC29\uBC95\uC744 \uC548\uB0B4\uD569\uB2C8\uB2E4.",
          recommendedDatasets: ["I2510", "I1030", "I0950"],
          reason: "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488 \uC81C\uD488 \uC815\uBCF4\uC640 \uAC1C\uBCC4 \uADDC\uACA9\uC744 \uC5F0\uACB0\uD558\uC5EC \uC0AC\uC6A9\uC790 \uB9DE\uCDA4\uD615 \uC601\uC591\uC81C \uBC0F \uC2DD\uB2E8\uC744 \uCD94\uCC9C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
          steps: ["\uC81C\uD488\uBA85 \uB610\uB294 \uD488\uBAA9\uCF54\uB4DC(PRDLST_CD) \uAC80\uC0C9", "\uC81C\uD488\uBCC4 \uC601\uC591\uC131\uBD84 \uBC0F \uAE30\uB2A5\uC131 \uC6D0\uB8CC \uCD94\uCD9C", "\uC0AC\uC6A9\uC790 \uAC74\uAC15 \uB370\uC774\uD130\uC640 \uB9E4\uCE6D \uC54C\uACE0\uB9AC\uC998 \uC801\uC6A9"],
          relatedApis: ["\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488\uC81C\uD488", "\uAE30\uB2A5\uC131\uC6D0\uB8CC", "\uACF5\uD1B5\uAE30\uC900\uADDC\uACA9"],
          requiredLevel: "\uCD08\uAE09",
          beginnerTip: "\uC571\uC758 \uD575\uC2EC\uC778 [\uD488\uBAA9\uCF54\uB4DC]\uB97C \uAE30\uC900\uC73C\uB85C \uC5EC\uB7EC \uC601\uC591 \uC815\uBCF4\uAC00 \uC5B4\uB5BB\uAC8C \uC5F0\uACB0\uB418\uB294\uC9C0 \uC2A4\uD0A4\uB9C8\uB97C \uD655\uC778\uD558\uC138\uC694.",
          devTip: "\uC131\uBD84 \uB370\uC774\uD130\uB294 \uBB38\uC790\uC5F4 \uD615\uD0DC\uAC00 \uB9CE\uC73C\uBBC0\uB85C, \uD30C\uC2F1\uD558\uC5EC \uC22B\uC790\uD615(\uC218\uCE58) \uB370\uC774\uD130\uB85C \uC815\uC81C\uD558\uB294 \uC804\uCC98\uB9AC \uACFC\uC815\uC774 \uD544\uC218\uC801\uC785\uB2C8\uB2E4."
        },
        {
          id: "purpose-03",
          title: "\u{1F354} \uC678\uC2DD\uC5C5 \uCC3D\uC5C5 \uC9C0\uC5ED \uC0C1\uAD8C \uBC0F \uD2B8\uB80C\uB4DC \uBD84\uC11D",
          icon: "ri-map-pin-line",
          description: "\uC9C0\uC5ED\uBCC4 \uC74C\uC2DD\uC810 \uC778\uD5C8\uAC00 \uB3D9\uD5A5 \uBC0F \uD3D0\uC5C5\uB960\uC744 \uBD84\uC11D\uD558\uC5EC \uCC3D\uC5C5 \uB9AC\uC2A4\uD06C\uB97C \uC904\uC785\uB2C8\uB2E4.",
          recommendedDatasets: ["I2500", "I2400", "I2560"],
          reason: "\uC2DC\uAD70\uAD6C \uB2E8\uC704\uC758 \uCD5C\uC2E0 \uC601\uC5C5 \uD5C8\uAC00 \uB370\uC774\uD130\uC640 \uD3D0\uC5C5 \uC77C\uC790\uB97C \uBD84\uC11D\uD574 \uD574\uB2F9 \uC0C1\uAD8C\uC758 \uACBD\uC7C1 \uC2EC\uD654 \uC815\uB3C4\uB97C \uD30C\uC545\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
          steps: ["\uC6D0\uD558\uB294 \uC9C0\uC5ED\uCF54\uB4DC \uB610\uB294 \uC8FC\uC18C \uD544\uD130\uB9C1", "\uC5C5\uC885\uBCC4 \uC2E0\uADDC \uC778\uD5C8\uAC00 \uAC74\uC218 \uBC0F \uD3D0\uC5C5 \uAC74\uC218 \uC9D1\uACC4", "\uAE30\uAC04\uBCC4 \uD2B8\uB80C\uB4DC \uBD84\uC11D \uBC0F \uC2DC\uAC01\uD654"],
          relatedApis: ["\uD734\uAC8C\uC74C\uC2DD\uC810", "\uC77C\uBC18\uC74C\uC2DD\uC810", "\uC218\uC785\uC2DD\uD488\uD310\uB9E4\uC5C5"],
          requiredLevel: "\uC911\uAE09",
          beginnerTip: "\uC8FC\uC18C(\uC18C\uC7AC\uC9C0) \uCEEC\uB7FC\uC744 \uD65C\uC6A9\uD558\uC5EC \uB370\uC774\uD130\uB97C \uC9C0\uC5ED\uBCC4\uB85C \uBB36\uC5B4\uBCF4\uB294 \uC5F0\uC2B5\uC744 \uD574\uBCF4\uC138\uC694.",
          devTip: "\uACF5\uAC04 \uB370\uC774\uD130(GIS) \uBD84\uC11D \uD234\uC774\uB098 \uC2DC\uAC01\uD654 \uB77C\uC774\uBE0C\uB7EC\uB9AC\uC640 \uC5F0\uB3D9\uD558\uC5EC \uD788\uD2B8\uB9F5(Heatmap)\uC744 \uAD6C\uD604\uD574 \uBCFC \uC218 \uC788\uC2B5\uB2C8\uB2E4."
        },
        {
          id: "purpose-04",
          title: "\u{1F393} \uC2DD\uD488\uC548\uC804 \uC815\uCC45 \uC5F0\uAD6C \uBC0F \uD1B5\uACC4 \uBD84\uC11D",
          icon: "ri-bar-chart-box-line",
          description: "\uC2DD\uC911\uB3C5 \uBC1C\uC0DD, \uC704\uBC18 \uBE48\uB3C4 \uB4F1 \uAC70\uC2DC\uC801\uC778 \uC815\uCC45 \uC5F0\uAD6C\uB97C \uC704\uD55C \uD1B5\uACC4 \uB370\uC774\uD130 \uD65C\uC6A9\uBC95\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4.",
          recommendedDatasets: ["I1540", "I2580", "I2590"],
          reason: "\uC218\uC2ED \uB144\uAC04 \uB204\uC801\uB41C \uC704\uC0DD \uC810\uAC80 \uC774\uB825\uACFC \uBD80\uC801\uD569 \uD310\uC815 \uB0B4\uC5ED\uC744 \uD1B5\uD574 \uC548\uC804\uAD00\uB9AC \uC815\uCC45\uC758 \uC2E4\uD6A8\uC131\uC744 \uBD84\uC11D\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
          steps: ["\uC5F0\uB3C4\uBCC4 \uC218\uAC70\uAC80\uC0AC \uBD80\uC801\uD569 \uAC74\uC218 \uCD94\uCD9C", "\uC704\uD574\uBB3C\uC9C8\uBCC4 \uBC1C\uC0DD \uBE48\uB3C4 \uBC0F \uC6D0\uC778 \uBD84\uC11D", "\uC2DD\uD488 \uC548\uC804 \uC815\uCC45 \uAC1C\uC120\uC548 \uB3C4\uCD9C"],
          relatedApis: ["\uC704\uC0DD\uD3C9\uAC00\uB0B4\uC5ED", "\uAC1C\uBCC4\uAE30\uC900\uADDC\uACA9", "\uACF5\uD1B5\uAE30\uC900\uADDC\uACA9"],
          requiredLevel: "\uACE0\uAE09",
          beginnerTip: "\uB370\uC774\uD130 \uC6A9\uB7C9\uC774 \uBC29\uB300\uD558\uBBC0\uB85C \uC6D0\uD558\uB294 \uC5F0\uB3C4\uB098 \uD2B9\uC815 \uC704\uBC18 \uD56D\uBAA9\uB9CC \uBA3C\uC800 \uD544\uD130\uB9C1\uD558\uC5EC \uD655\uC778\uD574 \uBCF4\uC138\uC694.",
          devTip: "\uB370\uC774\uD130 \uD1B5\uD569 \uACFC\uC815\uC5D0\uC11C \uB204\uB77D\uB41C \uAC12(\uACB0\uCE21\uCE58)\uC774\uB098 \uD615\uC2DD \uC624\uB958\uB97C \uCC98\uB9AC\uD558\uB294 \uB370\uC774\uD130 \uD074\uB80C\uC9D5(Data Cleansing) \uB85C\uC9C1 \uC124\uACC4\uAC00 \uC911\uC694\uD569\uB2C8\uB2E4."
        }
      ];
      dataMapNodes = [
        {
          "id": "I2500",
          "label": "\uC778\uD5C8\uAC00 \uC5C5\uC18C \uC815\uBCF4",
          "type": "center",
          "x": 400,
          "y": 300,
          "datasets": [
            "I2500"
          ]
        },
        {
          "id": "I2530",
          "label": "\uC2DC\uD5D8\uD56D\uBAA9\uCF54\uB4DC",
          "type": "data",
          "x": 535.0755764670349,
          "y": 468.2941969615793,
          "datasets": [
            "I2530"
          ]
        },
        {
          "id": "I2600",
          "label": "\uACF5\uD1B5\uAE30\uC900\uADDC\uACA9",
          "type": "data",
          "x": 295.9632908632144,
          "y": 481.8594853651364,
          "datasets": [
            "I2600"
          ]
        },
        {
          "id": "I2510",
          "label": "\uD488\uBAA9\uC720\uD615\uCF54\uB4DC",
          "type": "data",
          "x": 152.50187584988865,
          "y": 328.22400161197345,
          "datasets": [
            "I2510"
          ]
        },
        {
          "id": "I2610",
          "label": "\uACF5\uD1B5\uAE30\uC900\uC81C\uC678",
          "type": "data",
          "x": 236.58909478409703,
          "y": 148.63950093841436,
          "datasets": [
            "I2610"
          ]
        },
        {
          "id": "I2580",
          "label": "\uAC1C\uBCC4\uAE30\uC900\uADDC\uACA9",
          "type": "data",
          "x": 470.91554636580656,
          "y": 108.2151450673723,
          "datasets": [
            "I2580"
          ]
        },
        {
          "id": "I0960",
          "label": "\uAC74\uAC15\uAE30\uB2A5\uC2DD\uD488\uACF5\uC804",
          "type": "data",
          "x": 640.0425716625915,
          "y": 244.11690036021483,
          "datasets": [
            "I0960"
          ]
        },
        {
          "id": "I2857",
          "label": "\uACF5\uC720\uC8FC\uBC29\uC6B4\uC601\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5",
          "type": "data",
          "x": 588.4755635858262,
          "y": 431.3973197437578,
          "datasets": [
            "I2857"
          ]
        },
        {
          "id": "I2858",
          "label": "\uB3C4\uCD95\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5",
          "type": "data",
          "x": 363.6249915478466,
          "y": 497.87164932467635,
          "datasets": [
            "I2858"
          ]
        },
        {
          "id": "I2836",
          "label": "\uC2DD\uC6A9\uB780\uC120\uBCC4\uD3EC\uC7A5\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5",
          "type": "data",
          "x": 172.21743452883078,
          "y": 382.4236970483513,
          "datasets": [
            "I2836"
          ]
        },
        {
          "id": "I2835",
          "label": "\uC2DD\uC721\uC989\uC11D\uD310\uB9E4\uAC00\uACF5\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5",
          "type": "data",
          "x": 190.2321177308869,
          "y": 191.19577782212605,
          "datasets": [
            "I2835"
          ]
        },
        {
          "id": "I2833",
          "label": "\uC2DD\uD488\uB0C9\uB3D9.\uB0C9\uC7A5\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5",
          "type": "data",
          "x": 401.1064244970127,
          "y": 100.0019586898593,
          "datasets": [
            "I2833"
          ]
        },
        {
          "id": "I2831",
          "label": "\uC2DD\uD488\uC18C\uBD84\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5",
          "type": "data",
          "x": 610.963489683123,
          "y": 192.685416399913,
          "datasets": [
            "I2831"
          ]
        },
        {
          "id": "I0940",
          "label": "\uC2DD\uD488\uC6A9 \uAE30\uAD6C \uBC0F \uC6A9\uAE30.\uD3EC\uC7A5 \uACF5\uC804",
          "type": "data",
          "x": 626.8616953625491,
          "y": 384.0334073653282,
          "datasets": [
            "I0940"
          ]
        },
        {
          "id": "I2830",
          "label": "\uC2DD\uD488\uC6B4\uBC18\uC5C5 \uC778\uD5C8\uAC00 \uB300\uC7A5",
          "type": "data",
          "x": 434.1843045519584,
          "y": 498.1214711389741,
          "datasets": [
            "I2830"
          ]
        }
      ];
      dataMapEdges = [
        {
          "from": "I2580",
          "to": "I2530",
          "label": "TESTITM_CD"
        },
        {
          "from": "I0960",
          "to": "I2530",
          "label": "TESTITM_CD"
        },
        {
          "from": "I2857",
          "to": "I2500",
          "label": "LCNS_NO"
        },
        {
          "from": "I2600",
          "to": "I2530",
          "label": "TESTITM_CD"
        },
        {
          "from": "I2600",
          "to": "I2510",
          "label": "PRDLST_CD"
        },
        {
          "from": "I2610",
          "to": "I2530",
          "label": "TESTITM_CD"
        },
        {
          "from": "I2610",
          "to": "I2510",
          "label": "PRDLST_CD"
        },
        {
          "from": "I2858",
          "to": "I2500",
          "label": "LCNS_NO"
        },
        {
          "from": "I2836",
          "to": "I2500",
          "label": "LCNS_NO"
        },
        {
          "from": "I2835",
          "to": "I2500",
          "label": "LCNS_NO"
        },
        {
          "from": "I2833",
          "to": "I2500",
          "label": "LCNS_NO"
        },
        {
          "from": "I2831",
          "to": "I2500",
          "label": "LCNS_NO"
        },
        {
          "from": "I0940",
          "to": "I2530",
          "label": "TESTITM_CD"
        },
        {
          "from": "I2830",
          "to": "I2500",
          "label": "LCNS_NO"
        }
      ];
      subjectColorMap = {
        "\uC2DD\uD488\xB7\uC81C\uD488": "bg-teal-50 text-teal-700 border-teal-200",
        "\uC5C5\uCCB4\xB7\uC601\uC5C5\uC790": "bg-gov-50 text-gov-700 border-gov-200",
        "\uC6D0\uC7AC\uB8CC\xB7\uCCA8\uAC00\uBB3C": "bg-rose-50 text-rose-700 border-rose-200",
        "\uC601\uC591\xB7\uAC74\uAC15": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "\uC218\uC785\uC2DD\uD488": "bg-amber-50 text-amber-700 border-amber-200",
        "\uB18D\xB7\uCD95\xB7\uC218\uC0B0\uBB3C": "bg-violet-50 text-violet-700 border-violet-200",
        "\uAE30\uD0C0": "bg-slate-50 text-slate-700 border-slate-200"
      };
    }
  });

  // view/components/datasetExplorer.js
  function renderDatasetExplorer(container, onSelectDataset) {
    let search = "";
    let subject = "all";
    let process = "all";
    let issue = "all";
    let theme = "all";
    const render = () => {
      const filtered = datasets.filter((ds) => {
        const matchesSearch = search === "" || ds.name.includes(search) || ds.description.includes(search) || ds.includedData.some((d) => d.includes(search));
        const matchesSubject = subject === "all" || ds.subject === subject;
        const matchesProcess = process === "all" || ds.process === process;
        const matchesIssue = issue === "all" || ds.issue === issue;
        const matchesTheme = theme === "all" || ds.theme === theme;
        return matchesSearch && matchesSubject && matchesProcess && matchesIssue && matchesTheme;
      });
      const createFilterButtons = (filters, currentValue, onClick) => {
        return filters.map((f) => {
          const isActive = currentValue === f.value;
          const baseClass = "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border";
          const activeClass = "bg-gov-600 text-white border-gov-600";
          const inactiveClass = "bg-white text-slate-600 border-slate-200 hover:border-gov-300 hover:text-gov-700";
          return `<button data-value="${f.value}" class="filter-btn ${baseClass} ${isActive ? activeClass : inactiveClass}">
          ${f.label}
        </button>`;
        }).join("");
      };
      container.innerHTML = `
      <section class="py-10 md:py-14 px-4 md:px-8">
        <div class="max-w-[1400px] mx-auto">
          <!-- Section title -->
          <div class="mb-8 md:mb-10">
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-2">\uB370\uC774\uD130\uC138\uD2B8 \uCC3E\uAE30</h2>
            <p class="text-sm text-slate-500">\uC8FC\uC81C\uBCC4, \uC5C5\uBB34\uBCC4, \uC774\uC288\uBCC4 \uB2E4\uCC28\uC6D0 \uD544\uD130\uB97C \uC0AC\uC6A9\uD558\uC5EC \uC6D0\uD558\uB294 \uB370\uC774\uD130\uB97C \uC815\uBC00\uD558\uAC8C \uD0D0\uC0C9\uD558\uC138\uC694.</p>
          </div>

          <!-- Filters -->
          <div class="bg-white border border-slate-200 rounded-xl p-4 md:p-6 mb-6 md:mb-8 shadow-sm">
            <!-- Search -->
            <div class="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 mb-5 focus-within:border-gov-400 focus-within:ring-2 focus-within:ring-gov-100 transition-all">
              <i class="ri-search-line text-slate-400"></i>
              <input type="text" id="search-input" value="${search}" placeholder="\uB370\uC774\uD130\uC138\uD2B8\uBA85 \uB610\uB294 \uD3EC\uD568 \uB370\uC774\uD130\uBA85 \uAC80\uC0C9" class="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" />
              ${search ? `<button id="clear-search-btn" class="text-slate-400 hover:text-slate-600"><i class="ri-close-line"></i></button>` : ""}
            </div>

            <!-- Filter groups -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div>
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">1. \uC8FC\uC81C\uBCC4 (\uB300\uC0C1)</label>
                <div class="flex flex-wrap gap-2" id="subject-filters">
                  ${createFilterButtons(subjectFilters, subject)}
                </div>
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">2. \uC5C5\uBB34\uBCC4 (\uD504\uB85C\uC138\uC2A4)</label>
                <div class="flex flex-wrap gap-2" id="process-filters">
                  ${createFilterButtons(processFilters, process)}
                </div>
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">3. \uC774\uC288\uBCC4 (\uAD00\uC2EC\uC0AC)</label>
                <div class="flex flex-wrap gap-2" id="issue-filters">
                  ${createFilterButtons(issueFilters, issue)}
                </div>
              </div>
              <div>
                <label class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">4. \uD14C\uB9C8\uBCC4 (\uD65C\uC6A9\uBAA9\uC801)</label>
                <div class="flex flex-wrap gap-2" id="theme-filters">
                  ${createFilterButtons(themeFilters, theme)}
                </div>
              </div>
            </div>

            <!-- Active filter count -->
            <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span class="text-sm text-slate-500">
                \uAC80\uC0C9 \uACB0\uACFC <strong class="text-gov-700">${filtered.length}\uAC74</strong> / \uC804\uCCB4 ${datasets.length}\uAC74
              </span>
              ${subject !== "all" || process !== "all" || issue !== "all" || theme !== "all" ? `
                <button id="reset-filters-btn" class="text-xs text-gov-600 hover:text-gov-800 font-medium">\uD544\uD130 \uCD08\uAE30\uD654</button>
              ` : ""}
            </div>
          </div>

          <!-- Dataset cards grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            ${filtered.map((ds) => `
              <div data-id="${ds.id}" class="dataset-card flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-gov-200 transition-all duration-300 cursor-pointer group h-full">
                <div class="p-5 md:p-6 flex-1">
                  <!-- Tags -->
                  <div class="flex items-center gap-2 mb-3 flex-wrap">
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold border ${subjectColorMap[ds.subject] || "bg-slate-50 text-slate-600 border-slate-200"}">
                      ${ds.subject}
                    </span>
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold border bg-slate-50 text-slate-600 border-slate-200">
                      ${ds.process}
                    </span>
                    ${ds.issue !== "\uD574\uB2F9\uC5C6\uC74C" ? `
                      <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold border bg-rose-50 text-rose-700 border-rose-200">
                        ${ds.issue}
                      </span>
                    ` : ""}
                    <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-50 text-slate-600 border border-slate-200">
                      \uB370\uC774\uD130 ${ds.dataCount}\uAC1C
                    </span>
                  </div>
                  
                  <h3 class="text-base md:text-lg font-bold text-slate-900 mb-2 group-hover:text-gov-700 transition-colors">
                    ${ds.name}
                  </h3>
                  <p class="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                    ${ds.description}
                  </p>
                  
                  <div class="flex items-center gap-1.5 mb-4 flex-wrap">
                    <span class="text-xs text-slate-400 font-medium">\uCD94\uCC9C \uD14C\uB9C8:</span>
                    <span class="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[11px] font-medium border border-blue-100">${ds.theme}</span>
                  </div>

                  <div class="border-t border-slate-100 pt-3 mt-auto">
                    <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">\uC8FC\uC694 \uCEEC\uB7FC \uAD6C\uC131</p>
                    <ul class="space-y-1">
                      ${ds.includedData.slice(0, 3).map((item) => `
                        <li class="text-xs text-slate-600 flex items-start gap-1.5">
                          <i class="ri-checkbox-circle-line text-teal-500 text-[10px] mt-0.5 shrink-0"></i>${item}
                        </li>
                      `).join("")}
                      ${ds.includedData.length > 3 ? `
                        <li class="text-xs text-slate-400 pl-4">\uC678 ${ds.includedData.length - 3}\uAC1C \uB370\uC774\uD130</li>
                      ` : ""}
                    </ul>
                  </div>
                </div>
                <div class="px-5 md:px-6 pb-5 md:pb-6 pt-0 flex gap-2 mt-auto">
                  <button class="flex-1 px-4 py-2.5 rounded-lg bg-gov-600 text-white text-xs font-semibold hover:bg-gov-700 transition-colors whitespace-nowrap">\uB370\uC774\uD130\uC14B \uBD84\uC11D\uD558\uAE30</button>
                  <button class="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:border-gov-300 hover:text-gov-700 transition-colors whitespace-nowrap">\uC2A4\uD0A4\uB9C8 \uBCF4\uAE30</button>
                </div>
              </div>
            `).join("")}
          </div>

          ${filtered.length === 0 ? `
            <div class="text-center py-16">
              <div class="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <i class="ri-search-line text-slate-400 text-2xl"></i>
              </div>
              <p class="text-slate-500 text-sm">\uB2E4\uC911 \uD544\uD130 \uC870\uAC74\uC5D0 \uC77C\uCE58\uD558\uB294 \uB370\uC774\uD130\uC138\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.</p>
              <button id="no-result-reset-btn" class="mt-3 text-sm text-gov-600 font-medium hover:text-gov-800">\uD544\uD130 \uCD08\uAE30\uD654\uD558\uAE30</button>
            </div>
          ` : ""}
        </div>
      </section>
    `;
      bindEvents();
    };
    const bindEvents = () => {
      const searchInput = container.querySelector("#search-input");
      if (searchInput) {
        searchInput.addEventListener("input", (e) => {
          search = e.target.value;
          render();
          const newSearchInput = container.querySelector("#search-input");
          if (newSearchInput) {
            newSearchInput.focus();
            const val = newSearchInput.value;
            newSearchInput.value = "";
            newSearchInput.value = val;
          }
        });
      }
      const clearSearchBtn = container.querySelector("#clear-search-btn");
      if (clearSearchBtn) {
        clearSearchBtn.addEventListener("click", () => {
          search = "";
          render();
        });
      }
      const bindFilters = (id, setter) => {
        const wrapper = container.querySelector(id);
        if (wrapper) {
          wrapper.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
              setter(e.currentTarget.dataset.value);
              render();
            });
          });
        }
      };
      bindFilters("#subject-filters", (v) => subject = v);
      bindFilters("#process-filters", (v) => process = v);
      bindFilters("#issue-filters", (v) => issue = v);
      bindFilters("#theme-filters", (v) => theme = v);
      const resetFiltersBtn = container.querySelector("#reset-filters-btn");
      if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener("click", () => {
          subject = "all";
          process = "all";
          issue = "all";
          theme = "all";
          render();
        });
      }
      const noResultResetBtn = container.querySelector("#no-result-reset-btn");
      if (noResultResetBtn) {
        noResultResetBtn.addEventListener("click", () => {
          search = "";
          subject = "all";
          process = "all";
          issue = "all";
          theme = "all";
          render();
        });
      }
      container.querySelectorAll(".dataset-card").forEach((card) => {
        card.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          const ds = datasets.find((d) => d.id === id);
          if (ds && onSelectDataset) {
            onSelectDataset(ds);
          }
        });
      });
    };
    render();
  }
  var init_datasetExplorer = __esm({
    "view/components/datasetExplorer.js"() {
      init_datasetData();
    }
  });

  // view/components/purposeRecommendation.js
  function renderPurposeRecommendation(container, onSelectDataset) {
    let selectedPurposeId = null;
    let mode = "beginner";
    const getDatasetById = (id) => datasets.find((d) => d.id === id);
    const render = () => {
      const selected = purposes.find((p) => p.id === selectedPurposeId);
      const renderPurposeCards = () => {
        return purposes.map((purpose) => {
          const isSelected = selectedPurposeId === purpose.id;
          const baseClass = "text-left bg-white border rounded-xl p-5 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md";
          const activeClass = "border-gov-400 ring-2 ring-gov-100 bg-gov-50/30";
          const inactiveClass = "border-slate-200 hover:border-gov-300";
          const iconBaseClass = "w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-lg";
          const iconActiveClass = "bg-gov-600 text-white";
          const iconInactiveClass = "bg-slate-100 text-slate-500";
          return `
          <button data-id="${purpose.id}" class="purpose-card ${baseClass} ${isSelected ? activeClass : inactiveClass}">
            <div class="${iconBaseClass} ${isSelected ? iconActiveClass : iconInactiveClass}">
              <i class="${purpose.icon}"></i>
            </div>
            <h3 class="text-sm font-bold text-slate-900 mb-1.5 leading-snug">${purpose.title}</h3>
            <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">${purpose.description}</p>
          </button>
        `;
        }).join("");
      };
      const renderSelectedDetails = () => {
        if (!selected) {
          return `
          <div class="text-center py-12 bg-slate-50 border border-slate-200 rounded-xl">
            <div class="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <i class="ri-cursor-line text-slate-400 text-2xl"></i>
            </div>
            <p class="text-sm text-slate-500">\uC704 \uBAA9\uC801 \uCE74\uB4DC \uC911 \uD558\uB098\uB97C \uC120\uD0DD\uD558\uBA74 \uCD94\uCC9C \uB370\uC774\uD130\uC138\uD2B8\uAC00 \uD45C\uC2DC\uB429\uB2C8\uB2E4.</p>
          </div>
        `;
        }
        const dsListHTML = selected.recommendedDatasets.map((dsId) => {
          const ds = getDatasetById(dsId);
          if (!ds) return "";
          return `
          <div data-dsid="${ds.id}" class="recommended-ds-item flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-gov-300 transition-colors group">
            <div class="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-gov-600 shrink-0 group-hover:border-gov-300 transition-colors">
              <i class="ri-database-2-line text-lg"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h5 class="text-sm font-bold text-slate-900 group-hover:text-gov-700 transition-colors truncate">${ds.name}</h5>
              <p class="text-xs text-slate-500 mt-0.5 line-clamp-2">${ds.description}</p>
              <div class="flex items-center gap-2 mt-2 flex-wrap">
                <span class="px-2 py-0.5 rounded-md text-[11px] font-semibold border ${subjectColorMap[ds.subject] || "bg-slate-50 text-slate-600 border-slate-200"}">${ds.subject}</span>
                <span class="px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[11px] font-medium border border-slate-200">${ds.process}</span>
                ${ds.formats.map((f) => `<span class="px-2 py-0.5 rounded-md bg-white text-slate-600 text-[11px] font-medium border border-slate-200">${f}</span>`).join("")}
              </div>
            </div>
            <i class="ri-arrow-right-s-line text-slate-400 text-lg shrink-0 mt-2 group-hover:text-gov-600 transition-colors"></i>
          </div>
        `;
        }).join("");
        const stepsHTML = selected.steps.map((step, i) => `
        <div class="flex items-start gap-4 relative">
          <div class="w-10 h-10 rounded-full bg-gov-600 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10">${i + 1}</div>
          <div class="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-3">
            <p class="text-sm text-slate-700">${step}</p>
          </div>
        </div>
      `).join("");
        return `
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-fade-in-up">
          <div class="bg-gov-50 border-b border-gov-100 px-5 md:px-8 py-4 flex items-start gap-3">
            <div class="w-10 h-10 rounded-lg bg-gov-600 flex items-center justify-center text-white shrink-0">
              <i class="${selected.icon}"></i>
            </div>
            <div>
              <h3 class="text-base font-bold text-slate-900">${selected.title}</h3>
              <p class="text-sm text-slate-600 mt-1">${selected.reason}</p>
            </div>
          </div>

          <div class="px-5 md:px-8 py-6">
            <!-- Recommended datasets -->
            <div class="mb-6">
              <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i class="ri-star-line text-gov-600"></i> \uCD94\uCC9C \uB370\uC774\uD130\uC138\uD2B8
              </h4>
              <div class="flex flex-col gap-3">
                ${dsListHTML}
              </div>
            </div>

            <!-- Steps -->
            <div class="mb-6">
              <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i class="ri-route-line text-gov-600"></i> \uD65C\uC6A9 \uB2E8\uACC4
              </h4>
              <div class="relative">
                <div class="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200"></div>
                <div class="space-y-4">
                  ${stepsHTML}
                </div>
              </div>
            </div>

            <!-- Mode-specific tip -->
            <div class="mb-6">
              <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i class="${mode === "beginner" ? "ri-user-line" : "ri-code-box-line"} text-gov-600"></i>
                ${mode === "beginner" ? "\uCD08\uBCF4\uC790\uB97C \uC704\uD55C \uD301" : "\uAC1C\uBC1C\uC790\uB97C \uC704\uD55C \uD301"}
              </h4>
              <div class="rounded-lg px-4 py-3 border ${mode === "beginner" ? "bg-emerald-50 border-emerald-100" : "bg-gov-50 border-gov-100"}">
                <p class="text-sm leading-relaxed ${mode === "beginner" ? "text-emerald-800" : "text-gov-800"}">
                  ${mode === "beginner" ? selected.beginnerTip : selected.devTip}
                </p>
              </div>
            </div>

            <!-- Related APIs -->
            <div class="mb-6">
              <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i class="ri-plug-line text-gov-600"></i> \uAD00\uB828 Open API
              </h4>
              <div class="flex flex-wrap gap-2">
                ${selected.relatedApis.map((api) => `<span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">${api}</span>`).join("")}
              </div>
            </div>

            <!-- Required level -->
            <div class="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
              <span class="text-sm font-semibold text-slate-700">\uD544\uC694\uD55C \uC0AC\uC6A9\uC790 \uC218\uC900</span>
              <span class="px-3 py-1 rounded-full bg-gov-50 text-gov-700 text-xs font-bold border border-gov-100">${selected.requiredLevel}</span>
            </div>
          </div>
        </div>
      `;
      };
      container.innerHTML = `
      <section class="py-10 md:py-14 px-4 md:px-8">
        <div class="max-w-[1400px] mx-auto">
          <!-- Section header -->
          <div class="text-center mb-8 md:mb-12">
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-2">\uC5B4\uB5A4 \uC2DD\uD488\uC548\uC804 \uB370\uC774\uD130\uB97C \uD65C\uC6A9\uD558\uACE0 \uC2F6\uC73C\uC2E0\uAC00\uC694?</h2>
            <p class="text-sm text-slate-500 max-w-xl mx-auto">\uBAA9\uC801\uC744 \uC120\uD0DD\uD558\uBA74 \uC801\uD569\uD55C \uB370\uC774\uD130\uC138\uD2B8\uC640 \uD65C\uC6A9 \uBC29\uBC95\uC744 \uCD94\uCC9C\uD574 \uB4DC\uB9BD\uB2C8\uB2E4.</p>
          </div>

          <!-- Mode toggle -->
          <div class="flex justify-center mb-8 md:mb-10">
            <div class="inline-flex bg-slate-100 rounded-full p-1 border border-slate-200">
              <button id="mode-beginner" class="px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${mode === "beginner" ? "bg-white text-gov-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}">
                <i class="ri-user-line mr-1.5"></i> \uCD08\uBCF4\uC790 \uC548\uB0B4 \uBAA8\uB4DC
              </button>
              <button id="mode-developer" class="px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${mode === "developer" ? "bg-white text-gov-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}">
                <i class="ri-code-box-line mr-1.5"></i> \uAC1C\uBC1C\uC790 \uC548\uB0B4 \uBAA8\uB4DC
              </button>
            </div>
          </div>

          <!-- Purpose cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10 md:mb-14">
            ${renderPurposeCards()}
          </div>

          <!-- Recommendation result -->
          ${renderSelectedDetails()}
        </div>
      </section>
    `;
      bindEvents();
    };
    const bindEvents = () => {
      const btnBeginner = container.querySelector("#mode-beginner");
      const btnDeveloper = container.querySelector("#mode-developer");
      if (btnBeginner) {
        btnBeginner.addEventListener("click", () => {
          mode = "beginner";
          render();
        });
      }
      if (btnDeveloper) {
        btnDeveloper.addEventListener("click", () => {
          mode = "developer";
          render();
        });
      }
      container.querySelectorAll(".purpose-card").forEach((card) => {
        card.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          selectedPurposeId = selectedPurposeId === id ? null : id;
          render();
        });
      });
      container.querySelectorAll(".recommended-ds-item").forEach((item) => {
        item.addEventListener("click", (e) => {
          const dsId = e.currentTarget.dataset.dsid;
          const ds = getDatasetById(dsId);
          if (ds && onSelectDataset) {
            onSelectDataset(ds);
          }
        });
      });
    };
    render();
  }
  var init_purposeRecommendation = __esm({
    "view/components/purposeRecommendation.js"() {
      init_datasetData();
    }
  });

  // view/components/dataMap.js
  function renderDataMap(container, onSelectDataset) {
    let selectedNode = null;
    const viewBoxW = 800;
    const viewBoxH = 520;
    const getNodePosition = (id) => {
      const n = dataMapNodes.find((node) => node.id === id);
      return n ? { x: n.x, y: n.y } : { x: 0, y: 0 };
    };
    const render = () => {
      const nodeData = dataMapNodes.find((n) => n.id === selectedNode);
      const relatedDatasets = nodeData?.datasets ? nodeData.datasets.map((id) => datasets.find((d) => d.id === id)).filter(Boolean) : [];
      const edgesHTML = dataMapEdges.map((edge) => {
        const from = getNodePosition(edge.from);
        const to = getNodePosition(edge.to);
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        return `
        <g>
          <line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 4" />
          <rect x="${midX - 32}" y="${midY - 10}" width="64" height="20" rx="4" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
          <text x="${midX}" y="${midY + 4}" text-anchor="middle" fill="#64748b" font-size="10" font-weight="500">${edge.label}</text>
        </g>
      `;
      }).join("");
      const nodesHTML = dataMapNodes.map((node) => {
        const isCenter = node.type === "center";
        const isSelected = selectedNode === node.id;
        const w = isCenter ? 160 : 130;
        const h = isCenter ? 56 : 52;
        const rx = 12;
        const fillColor = isSelected ? isCenter ? "#1a5fb4" : "#14b8a6" : isCenter ? "#1a5fb4" : "#ffffff";
        const strokeColor = isSelected ? isCenter ? "#154a8c" : "#0d9488" : isCenter ? "#154a8c" : "#cbd5e1";
        const textColor = isCenter || isSelected ? "#ffffff" : "#334155";
        const subTextColor = isCenter || isSelected ? "#ffffff" : "#64748b";
        const labelParts = node.label.split("\n");
        return `
        <g class="cursor-pointer map-node" data-id="${node.id}">
          <rect x="${node.x - w / 2}" y="${node.y - h / 2}" width="${w}" height="${h}" rx="${rx}" 
                fill="${fillColor}" stroke="${strokeColor}" stroke-width="${isSelected ? 3 : 2}" 
                class="transition-all duration-300" />
          <text x="${node.x}" y="${node.y - 4}" text-anchor="middle" fill="${textColor}" font-size="12" font-weight="600" class="transition-all duration-300">
            ${labelParts[0]}
          </text>
          ${labelParts.length > 1 ? `
            <text x="${node.x}" y="${node.y + 12}" text-anchor="middle" fill="${subTextColor}" font-size="11" font-weight="500" class="transition-all duration-300">
              ${labelParts[1]}
            </text>
          ` : ""}
        </g>
      `;
      }).join("");
      const renderDetailPanel2 = () => {
        if (!nodeData) {
          return `
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
            <div class="w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <i class="ri-map-pin-line text-slate-400 text-2xl"></i>
            </div>
            <p class="text-sm text-slate-500 font-medium">\uB370\uC774\uD130\uB9F5\uC758 \uB178\uB4DC\uB97C \uD074\uB9AD\uD558\uBA74</p>
            <p class="text-sm text-slate-500 mt-1">\uD574\uB2F9 \uB370\uC774\uD130\uAC00 \uD3EC\uD568\uB41C \uB370\uC774\uD130\uC138\uD2B8\uC640 \uC5F0\uACB0 \uC815\uBCF4\uB97C \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.</p>
          </div>
        `;
        }
        const dsListHTML = relatedDatasets.map((ds) => `
        <button data-dsid="${ds.id}" class="related-ds-btn text-left bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 hover:border-gov-300 hover:bg-gov-50/50 transition-colors group w-full">
          <div class="flex items-center justify-between">
            <span class="text-sm font-semibold text-slate-900 group-hover:text-gov-700 transition-colors">${ds.name}</span>
            <i class="ri-arrow-right-s-line text-slate-400 group-hover:text-gov-600"></i>
          </div>
          <p class="text-xs text-slate-500 mt-1 line-clamp-2">${ds.description}</p>
        </button>
      `).join("");
        const connectedEdges = dataMapEdges.filter((e) => e.from === selectedNode || e.to === selectedNode);
        const connectionsHTML = connectedEdges.map((edge) => {
          const otherId = edge.from === selectedNode ? edge.to : edge.from;
          const otherNode = dataMapNodes.find((n) => n.id === otherId);
          if (!otherNode) return "";
          return `
          <div class="flex items-center gap-2 text-sm text-slate-700">
            <span class="px-2 py-0.5 rounded bg-gov-50 text-gov-700 text-[11px] font-medium border border-gov-100">${edge.label}</span>
            <span class="text-slate-500 text-xs">\u2192</span>
            <span class="cursor-pointer hover:text-gov-600 transition-colors node-link" data-id="${otherId}">
              ${otherNode.label.replace("\n", " ")}
            </span>
          </div>
        `;
        }).join("");
        return `
        <div class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-fade-in">
          <div class="px-5 py-4 border-b ${nodeData.type === "center" ? "bg-gov-600 border-gov-700" : "bg-teal-500 border-teal-600"}">
            <h3 class="text-base font-bold text-white">${nodeData.label.replace("\n", " ")}</h3>
            <p class="text-xs text-white/80 mt-1">
              ${nodeData.type === "center" ? "\uC911\uC2EC \uB178\uB4DC: \uBAA8\uB4E0 \uB370\uC774\uD130\uC640 \uC5F0\uACB0\uB429\uB2C8\uB2E4" : "\uACF5\uACF5\uB370\uC774\uD130: \uB2E4\uC74C \uB370\uC774\uD130\uC138\uD2B8\uC5D0 \uD3EC\uD568\uB429\uB2C8\uB2E4"}
            </p>
          </div>
          <div class="p-5">
            ${relatedDatasets.length > 0 ? `
              <div>
                <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <i class="ri-folder-open-line text-gov-600"></i> \uD3EC\uD568\uB41C \uB370\uC774\uD130\uC138\uD2B8
                </h4>
                <div class="flex flex-col gap-2.5">
                  ${dsListHTML}
                </div>
              </div>
            ` : ""}

            <div class="mt-5 pt-5 border-t border-slate-100">
              <h4 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i class="ri-link text-gov-600"></i> \uC5F0\uACB0\uB41C \uB370\uC774\uD130
              </h4>
              <div class="flex flex-col gap-2">
                ${connectionsHTML}
              </div>
            </div>
          </div>
        </div>
      `;
      };
      container.innerHTML = `
      <section class="py-10 md:py-14 px-4 md:px-8">
        <div class="max-w-[1400px] mx-auto">
          <div class="mb-8 md:mb-10">
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-2">\uB370\uC774\uD130\uB9F5</h2>
            <p class="text-sm text-slate-500">\uB370\uC774\uD130 \uAC04 \uC5F0\uACB0\uC131\uC744 \uC2DC\uAC01\uC801\uC73C\uB85C \uD655\uC778\uD558\uACE0 \uC5B4\uB5A4 \uB370\uC774\uD130\uC138\uD2B8\uC5D0 \uD3EC\uD568\uB418\uB294\uC9C0 \uD655\uC778\uD558\uC138\uC694.</p>
          </div>

          <div class="flex flex-col xl:flex-row gap-6 md:gap-8">
            <!-- Map area -->
            <div class="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div class="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-gov-600"></div>
                  <span class="text-xs text-slate-500">\uC911\uC2EC \uB178\uB4DC</span>
                  <div class="w-3 h-3 rounded-full bg-teal-500 ml-3"></div>
                  <span class="text-xs text-slate-500">\uACF5\uACF5\uB370\uC774\uD130</span>
                </div>
                <span class="text-xs text-slate-400">\uB178\uB4DC\uB97C \uD074\uB9AD\uD558\uBA74 \uC0C1\uC138 \uC815\uBCF4\uAC00 \uD45C\uC2DC\uB429\uB2C8\uB2E4</span>
              </div>
              <div class="relative w-full overflow-auto bg-slate-50/50">
                <svg viewBox="0 0 ${viewBoxW} ${viewBoxH}" class="w-full h-auto min-h-[400px] md:min-h-[520px]" style="max-height: 600px;">
                  ${edgesHTML}
                  ${nodesHTML}
                </svg>
              </div>
            </div>

            <!-- Detail panel -->
            <div class="xl:w-[380px] shrink-0">
              ${renderDetailPanel2()}
            </div>
          </div>
        </div>
      </section>
    `;
      bindEvents();
    };
    const bindEvents = () => {
      container.querySelectorAll(".map-node").forEach((node) => {
        node.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          selectedNode = selectedNode === id ? null : id;
          render();
        });
      });
      container.querySelectorAll(".node-link").forEach((link) => {
        link.addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          selectedNode = id;
          render();
        });
      });
      container.querySelectorAll(".related-ds-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const dsId = e.currentTarget.dataset.dsid;
          const ds = datasets.find((d) => d.id === dsId);
          if (ds && onSelectDataset) {
            onSelectDataset(ds);
          }
        });
      });
    };
    render();
  }
  var init_dataMap = __esm({
    "view/components/dataMap.js"() {
      init_datasetData();
    }
  });

  // view/components/detailPanel.js
  function renderDetailPanel(dataset, onClose) {
    const container = document.getElementById("detail-panel-container");
    if (!container) return;
    if (!dataset) {
      container.innerHTML = "";
      return;
    }
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.removeEventListener("keydown", window._detailPanelEscHandler);
    window._detailPanelEscHandler = handleEsc;
    window.addEventListener("keydown", window._detailPanelEscHandler);
    const includedListHTML = dataset.detail.includedList.map((item, i) => `
    <li class="flex items-start gap-2.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-4 py-3">
      <span class="w-5 h-5 rounded-full bg-gov-50 text-gov-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
        ${i + 1}
      </span>
      ${item}
    </li>
  `).join("");
    const joinKeysHTML = dataset.detail.joinKeys.map((key) => `
    <div class="flex items-center gap-2 text-sm text-slate-700 bg-teal-50 border border-teal-100 rounded-lg px-4 py-2.5">
      <i class="ri-key-2-line text-teal-600"></i>
      ${key}
    </div>
  `).join("");
    const scenariosHTML = dataset.detail.scenarios.map((scenario) => `
    <li class="text-sm text-slate-700 flex items-start gap-2">
      <i class="ri-check-double-line text-emerald-500 mt-0.5 shrink-0"></i>
      ${scenario}
    </li>
  `).join("");
    const recommendedUsersHTML = dataset.detail.recommendedUsers.map((u) => `
    <span class="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">${u}</span>
  `).join("");
    const guideLinksHTML = dataset.detail.guideLinks.map((link) => `
    <a href="${link.url}" class="flex items-center gap-2 text-sm text-gov-700 hover:text-gov-900 bg-gov-50 hover:bg-gov-100 border border-gov-100 rounded-lg px-4 py-2.5 transition-colors">
      <i class="ri-external-link-line text-xs"></i>
      ${link.label}
    </a>
  `).join("");
    const examplesHTML = dataset.detail.examples.map((ex, i) => `
    <div class="mb-2 text-sm text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
      <span class="text-gov-600 font-semibold text-xs mr-1.5">\uC608\uC2DC ${i + 1}</span>
      ${ex}
    </div>
  `).join("");
    container.innerHTML = `
    <!-- Backdrop -->
    <div id="detail-backdrop" class="fixed inset-0 bg-black/40 z-[60] animate-fade-in"></div>
    
    <!-- Panel -->
    <div class="fixed top-0 right-0 h-full w-full md:w-[560px] lg:w-[640px] bg-white z-[70] shadow-2xl overflow-y-auto animate-slide-right">
      <div class="sticky top-0 bg-white border-b border-slate-200 px-5 md:px-8 py-4 flex items-center justify-between z-10">
        <h2 class="text-base md:text-lg font-bold text-slate-900 truncate pr-4">${dataset.name}</h2>
        <button id="close-panel-btn" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors shrink-0">
          <i class="ri-close-line"></i>
        </button>
      </div>

      <div class="px-5 md:px-8 py-6">
        <!-- Tags -->
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold border ${subjectColorMap[dataset.subject] || "bg-slate-100 text-slate-600 border-slate-200"}">
            ${dataset.subject}
          </span>
          <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            ${dataset.process}
          </span>
          <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gov-50 text-gov-700 border border-gov-100">
            \uB370\uC774\uD130 ${dataset.dataCount}\uAC1C \uD3EC\uD568
          </span>
        </div>

        <!-- Description -->
        <p class="text-sm text-slate-600 leading-relaxed mb-6">
          ${dataset.description}
        </p>

        <!-- Overview -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-file-list-3-line text-gov-600"></i> \uB370\uC774\uD130\uC138\uD2B8 \uAC1C\uC694
          </h3>
          <p class="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-4 border border-slate-100">
            ${dataset.detail.overview}
          </p>
        </div>

        <!-- Included data list -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-database-line text-gov-600"></i> \uD3EC\uD568 \uACF5\uACF5\uB370\uC774\uD130 \uBAA9\uB85D
          </h3>
          <ul class="space-y-2">
            ${includedListHTML}
          </ul>
        </div>

        <!-- Join keys -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-link text-gov-600"></i> \uACB0\uD569 \uAE30\uC900 \uD0A4
          </h3>
          <div class="grid grid-cols-1 gap-2">
            ${joinKeysHTML}
          </div>
        </div>

        <!-- Scenarios -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-lightbulb-line text-gov-600"></i> \uD65C\uC6A9 \uC2DC\uB098\uB9AC\uC624
          </h3>
          <ul class="space-y-2">
            ${scenariosHTML}
          </ul>
        </div>

        <!-- Recommended users -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-user-star-line text-gov-600"></i> \uCD94\uCC9C \uC0AC\uC6A9\uC790
          </h3>
          <div class="flex flex-wrap gap-2">
            ${recommendedUsersHTML}
          </div>
        </div>

        <!-- Guide links -->
        <div class="mb-6">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-book-open-line text-gov-600"></i> \uAD00\uB828 \uAC00\uC774\uB4DC
          </h3>
          <div class="flex flex-col gap-2">
            ${guideLinksHTML}
          </div>
        </div>

        <!-- Examples -->
        <div class="mb-8">
          <h3 class="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <i class="ri-bar-chart-box-line text-gov-600"></i> \uC608\uC0C1 \uD65C\uC6A9 \uC608\uC2DC
          </h3>
          ${examplesHTML}
        </div>

        <!-- Action buttons -->
        <div class="flex flex-col sm:flex-row gap-3 pb-6">
          <button class="flex-1 px-5 py-3 rounded-lg bg-gov-600 text-white text-sm font-semibold hover:bg-gov-700 transition-colors text-center whitespace-nowrap">
            <i class="ri-external-link-line mr-1.5"></i> Open API \uD3EC\uD138 \uBC14\uB85C\uAC00\uAE30
          </button>
          <button class="px-5 py-3 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:border-gov-300 hover:text-gov-700 transition-colors text-center whitespace-nowrap">
            <i class="ri-file-download-line mr-1.5"></i> \uC0D8\uD50C \uB370\uC774\uD130 \uB2E4\uC6B4\uB85C\uB4DC
          </button>
        </div>
      </div>
    </div>
  `;
    const doClose = () => {
      window.removeEventListener("keydown", window._detailPanelEscHandler);
      onClose();
    };
    container.querySelector("#detail-backdrop").addEventListener("click", doClose);
    container.querySelector("#close-panel-btn").addEventListener("click", doClose);
  }
  var init_detailPanel = __esm({
    "view/components/detailPanel.js"() {
      init_datasetData();
    }
  });

  // view/app.js
  var require_app = __commonJS({
    "view/app.js"() {
      init_datasetExplorer();
      init_purposeRecommendation();
      init_dataMap();
      init_detailPanel();
      var activeTab = "explorer";
      var selectedDataset = null;
      var tabContent = document.getElementById("tab-content");
      var onSelectDataset = (ds) => {
        selectedDataset = ds;
        renderDetailPanel(selectedDataset, () => {
          selectedDataset = null;
          renderDetailPanel(null);
        });
      };
      var renderTabContent = () => {
        tabContent.innerHTML = "";
        if (activeTab === "explorer") {
          renderDatasetExplorer(tabContent, onSelectDataset);
        } else if (activeTab === "recommend") {
          renderPurposeRecommendation(tabContent, onSelectDataset);
        } else if (activeTab === "datamap") {
          renderDataMap(tabContent, onSelectDataset);
        }
      };
      var updateActiveTabUI = () => {
        document.querySelectorAll(".nav-menu-btn, .tab-pill, .mobile-nav-btn").forEach((btn) => {
          const tabId = btn.dataset.tab || btn.dataset.nav;
          if (!tabId) return;
          if (btn.classList.contains("tab-pill")) {
            if (tabId === activeTab) {
              btn.className = "tab-pill px-4 md:px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all bg-gov-600 text-white shadow-sm";
            } else {
              btn.className = "tab-pill px-4 md:px-5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all text-slate-600 hover:text-gov-700 hover:bg-slate-50";
            }
          } else {
            if (tabId === activeTab) {
              btn.classList.add("bg-gov-50", "text-gov-700");
              btn.classList.remove("text-slate-600", "hover:text-gov-700", "hover:bg-slate-50");
            } else {
              btn.classList.remove("bg-gov-50", "text-gov-700");
              btn.classList.add("text-slate-600", "hover:text-gov-700", "hover:bg-slate-50");
            }
          }
        });
      };
      var changeTab = (tabId) => {
        activeTab = tabId;
        updateActiveTabUI();
        renderTabContent();
      };
      document.querySelectorAll(".nav-menu-btn, .tab-pill, .mobile-nav-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const tabId = e.currentTarget.dataset.tab || e.currentTarget.dataset.nav;
          if (tabId) {
            changeTab(tabId);
          }
        });
      });
      var mobileMenuBtn = document.getElementById("mobile-menu-btn");
      var mobileMenuIcon = document.getElementById("mobile-menu-icon");
      var mobileMenu = document.getElementById("mobile-menu");
      var mobileOpen = false;
      if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
          mobileOpen = !mobileOpen;
          if (mobileOpen) {
            mobileMenu.classList.remove("hidden");
            mobileMenuIcon.classList.remove("ri-menu-line");
            mobileMenuIcon.classList.add("ri-close-line");
          } else {
            mobileMenu.classList.add("hidden");
            mobileMenuIcon.classList.remove("ri-close-line");
            mobileMenuIcon.classList.add("ri-menu-line");
          }
        });
      }
      document.querySelectorAll(".mobile-nav-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          mobileOpen = false;
          mobileMenu.classList.add("hidden");
          mobileMenuIcon.classList.remove("ri-close-line");
          mobileMenuIcon.classList.add("ri-menu-line");
        });
      });
      updateActiveTabUI();
      renderTabContent();
    }
  });
  require_app();
})();
