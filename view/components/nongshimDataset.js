const { useState, useEffect, createElement: h } = React;

function NongshimDataset() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/nongshim-dataset')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { console.error(e); setLoading(false); });
  }, []);

  const styles = {
    container: { padding: '40px', fontFamily: 'Malgun Gothic, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' },
    headerBox: { display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px' },
    box: {
      flex: 1, backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '8px', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden', textAlign: 'center'
    },
    boxTitle: { backgroundColor: '#3b82f6', color: '#fff', padding: '12px', fontWeight: 'bold', fontSize: '18px' },
    boxContent: { padding: '20px', color: '#374151', fontWeight: '600', fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '10px' },
    mergeGraphic: {
      display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '40px 0', position: 'relative'
    },
    mergeArrow: {
      width: '0', height: '0', borderLeft: '100px solid transparent', borderRight: '100px solid transparent', borderTop: '60px solid #cbd5e1'
    },
    resultBox: {
      maxWidth: '800px', margin: '0 auto', backgroundColor: '#1e293b', color: '#fff', padding: '24px', 
      borderRadius: '12px', textAlign: 'center', boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
    },
    resultTitle: { fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' },
    tableWrapper: { backgroundColor: '#fff', borderRadius: '8px', overflow: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginTop: '40px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
    th: { backgroundColor: '#f3f4f6', padding: '12px', borderBottom: '2px solid #d1d5db', textAlign: 'left', fontWeight: 'bold', color: '#4b5563', whiteSpace: 'nowrap' },
    td: { padding: '10px 12px', borderBottom: '1px solid #e5e7eb', color: '#374151' }
  };

  return h('div', { style: styles.container },
    h('div', { style: { textAlign: 'center', marginBottom: '40px' } },
      h('h1', { style: { fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' } }, '농심 내부 시스템 연계 모듈'),
      h('p', { style: { color: '#6b7280', fontSize: '16px' } }, '식약처 공공데이터 4대 영역 7개 테이블 조인 파이프라인')
    ),

    h('div', { style: styles.headerBox },
      h('div', { style: styles.box },
        h('div', { style: styles.boxTitle }, '식품위해관리'),
        h('div', { style: styles.boxContent }, h('span', null, '행정처분결과'), h('span', null, '검사부적합(국내)'))
      ),
      h('div', { style: styles.box },
        h('div', { style: styles.boxTitle }, '기준규격정보'),
        h('div', { style: styles.boxContent }, h('span', null, '회수·판매중지'), h('span', null, '정보공통기준규격'))
      ),
      h('div', { style: styles.box },
        h('div', { style: styles.boxTitle }, '코드정보'),
        h('div', { style: styles.boxContent }, h('span', null, '품목유형코드'), h('span', null, '시험항목코드'))
      ),
      h('div', { style: styles.box },
        h('div', { style: styles.boxTitle }, 'HACCP지정현황'),
        h('div', { style: styles.boxContent }, h('span', null, 'HACCP 교육훈련기관'), h('span', null, '지정 현황'))
      )
    ),

    h('div', { style: styles.mergeGraphic },
      h('div', { style: styles.mergeArrow })
    ),

    h('div', { style: styles.resultBox },
      h('div', { style: styles.resultTitle }, '농심 사내 규격 데이터 세트 (Nongshim Specs)'),
      h('div', { style: { color: '#94a3b8' } }, '모든 식약처 위해/규격 정보가 하나로 통합된 사내 마스터 데이터입니다.')
    ),

    loading ? h('div', { style: { textAlign: 'center', padding: '40px', fontSize: '18px', color: '#6b7280' } }, '통합 데이터세트 조인 중...') : 
    h('div', { style: styles.tableWrapper },
      h('table', { style: styles.table },
        h('thead', null,
          h('tr', null,
            h('th', { style: styles.th }, '식품유형'),
            h('th', { style: styles.th }, '품목유형_표준명'),
            h('th', { style: styles.th }, '적발업체명'),
            h('th', { style: styles.th }, '회수_대상제품명'),
            h('th', { style: styles.th }, '행정처분유형'),
            h('th', { style: styles.th }, '검사_부적합결과'),
            h('th', { style: styles.th }, '회수사유'),
            h('th', { style: styles.th }, '검사항목'),
            h('th', { style: styles.th }, '시험항목_표준명'),
            h('th', { style: styles.th }, '기준규격'),
            h('th', { style: styles.th }, 'HACCP_지정번호')
          )
        ),
        h('tbody', null,
          data.map((row, i) => h('tr', { key: i, style: { backgroundColor: i % 2 === 0 ? '#fff' : '#f9fafb' } },
            h('td', { style: styles.td }, row['식품유형'] || '-'),
            h('td', { style: styles.td }, row['품목유형_표준명'] || '-'),
            h('td', { style: { ...styles.td, fontWeight: 'bold', color: '#dc2626' } }, row['적발업체명'] || '-'),
            h('td', { style: styles.td }, row['회수_대상제품명'] || '-'),
            h('td', { style: styles.td }, row['행정처분유형'] || '-'),
            h('td', { style: styles.td }, row['검사_부적합결과'] || '-'),
            h('td', { style: styles.td }, row['회수사유'] || '-'),
            h('td', { style: styles.td }, row['검사항목'] || '-'),
            h('td', { style: styles.td }, row['시험항목_표준명'] || '-'),
            h('td', { style: styles.td }, row['기준규격'] || '-'),
            h('td', { style: styles.td }, row['HACCP_지정번호'] || '-')
          ))
        )
      )
    )
  );
}

let _root = null;
export function renderNongshimDataset(container) {
  if (_root) _root.unmount();
  _root = ReactDOM.createRoot(container);
  _root.render(h(NongshimDataset));
}
