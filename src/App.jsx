import AppRouter from "./router/AppRouter";
import { Reset } from "styled-reset";

function App() {
  return (
    <>
    <Reset />
    <AppRouter />
    </>
  );
}

export default App;


//   const router = useRouter();
//   const { state, setstate, checkoutForMe } = useCheckout();

//   // 결제 후 성공 callback
//   const nicepaySubmit = async () => {
//     setAlertType("success");
//     setAlertMsg("결제에 성공했습니다.");
//     sendPaymentResult(true);
//   };

//   // 결제 후 실패 callback
//   const nicepayClose = async () => {
//     // TODO: 결제 실패시 처리
//     setAlertType("error");
//     setAlertMsg("결제를 다시 시도해주세요");
//     sendPaymentResult(false);
//   };

//   const sendPaymentResult = async () => {
//     const body = convertFormToObj(formRef.current);
//     body.success = success;
//     if (success) {
//       window.deleteLayer();
//       router.push("/payment/complete")
//     }
//   };

//     const handleCheckout = () => {
//     // 결제 관련 valiation 로직을 수행한 후 주문을 생성하는 api로 요청한다. 
//     createOrder();
//   }
  
// //   const createOrder = () => {
// //     try {
// //       mutate();
// //       // 결제 요청에 성공하면, 결제 유무를 판단하는 atom State의 불리언 값을 변경시킨다.
// //       setState((state) => ({
// //        ...state,
// //        isCheckout, !state.isCheckout;
// //       }));
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

//   const createForm = (order) => {
//     const EdiDate = moment().format("YYYYMMDDHHMMSS");
//     const MID = process.env.NEXT_PUBLIC_MID;
//     const Moid = order._id;
//     const TotalAmount = order.total.amount;
//     const TotalTaxFree = order.totalTaxFree;
//     const TotalTaxedAmount = TotalAmount - TotalTaxFree;
//     const TotalSupplyAmt = Math.ceil(TotalTaxedAmount / 1.1);
//     const TotalVAT = TotalTaxedAmount - TotalSupplyAmt;
//     const Amt = TotalAmount + ShippingFee;
//     const MerchantKey = process.env.NEXT_PUBLIC_MERCHANT_KEY;
//     const TestData = EdiDate + MID + Amt + MerchantKey;
//     const SignData = cryptoJs.SHA256(TestData).toString();
//     const successUrl = encodeURIComponent(
//       `${window.location.origin}/payment/complete?isMobile=${isMobile}`
//     );
//     const failUrl = encodeURIComponent(
//       `${window.location.origin}/payment/complete?isMobile=${isMobile}`
//     );
//     const returnUrl = isMobile ? process.env.NEXT_PUBLIC_RETUN_Mobile_URL : process.env.NEXT_PUBLIC_RETURN_URL
//     setReturnURL(returnUrl);
//     // 파라미터로 전달된 값에 따라 전달할 정보를 담아 form 상태를 업데이트 시킨다.
//     setForm({
//       // 상품이름
//       GoodsName,
//       // 결제 금액
//       Amt,
//       // 상점 아이디
//       MID,
//       // 전문생성일시
//       EdiDate,
//       // 상점 주문번호 상점 고유 식별값
//       Moid,
//       MerchantKey,
//       SignData,
//       BuyerName: order.address.billing.name.full,
//       BuyerTel: order.address.billing.name.phone,
//       BuyerEmail: "",
//       // 아래 값들중 하나 [CARD, VBANK, SSG_BANK, GIFT_CULT]
//       PayMethod: "CARD",
//       ReturnURL: returnUrl,
//       failURL: failUrl,
//       // 휴대폰 소액결제 추가 요청 파라미터 (0 = 컨텐츠, 1 = 현물)
//       GoodsCl: 1,
//       SupplyAmt: TotalSupplyAmt,
//       GoodsVat: TotalVAT,
//       TaxFreeAmt: TotalTaxFree,
//     });
//  }
//   useEffect(() => {
//     // 결제 성공과 mutation의 상태를 판단하는 지표를 사용해서 폼 데이터를 업데이트 하는 로직을 실행한다.
//     if (state.order && !isLoading && state.isCheckout) {
//       createForm(state.order)
//     }
//   }, [state.order]);

//   useEffect(() => {
//     // 폼이 빈 객체일때는 실행하지 않는다.
//     if (Object.keys(form).length === 0) return;
//     if (isMobile) {
//       // 모바일 결제창 진입
//       formRef.current.action = "https://web.nicepay.co.kr/v3/v3Payment.jsp";
//       formRef.current.acceptCharset = "euc-kr";
//       formRef.current.submit();
//     } else {
//         // PC 결제창 진입
//       if (typeof window !== "undefined") {
//         window.nicepaySubmit = nicepaySubmit;
//         window.nicepayClose = nicepayClose;
//         window.goPay(formRef.current);
//         }
//     }
//   }, [form]);