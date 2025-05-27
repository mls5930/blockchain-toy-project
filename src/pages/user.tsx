














// 1. useReducer(reducer, getInit()) 실행
//   ↳ 초기 상태: 로컬스토리지 있으면 그 값, 없으면 init 객체
//   ↳ 반환값: [state, dispatch]

// 2. <AppContext.Provider value={[state, dispatch]}>
//   ↳ 하위 컴포넌트에서 이걸 useContext(AppContext)로 받아서 사용

// 3. const [state, dispatch] = useContext(AppContext)
//   ↳ 전역 상태(state) 읽고, dispatch로 액션 보냄