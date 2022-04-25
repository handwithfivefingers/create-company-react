import Head from "next/head";
import React, { useEffect, useState } from "react";
import Section1 from "./../components/Homepage/Section1";
import Section2 from "../components/Homepage/Section2";
// import Section3 from "./../components/Homepage/Section3";
import Section4 from "../components/Homepage/Section4";
// import ProductService from "../service/ProductService";
// import IconThanhLap from "../assets/img/thanhlap.png";
// import IconThayDoi from "../assets/img/thaydoi.png";
// import IconTamNgung from "../assets/img/tamngung.png";
// import IconGiaiThe from "../assets/img/giaithe.png";
// import Aos from "aos";
import { getSession, useSession } from "next-auth/react";
// import { useRouter } from "next/router";
import Router from "next/router";
// import { NextRequest } from "next/server";
export default function Home() {
  // const viewRef = React.useRef();
  // const [state, setState] = useState([]);
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   Aos.init({ duration: 600, offset: -100, once: true });
  // }, []);

  // if (status === "authenticated") {
  //   if (session.role?.toLowerCase() === "user") {
  //     Router.push("/user");
  //   }
  //   if (session.role?.toLowerCase() === "admin") {
  //     Router.push("/admin");
  //   }
  // }
  // if (status !== "authenticated") {
  //   Router.push("/login");
  // }
  // console.log(props.session);

  return (
    <div>
      <Head>
        <title>Thành lập công ty</title>
      </Head>
      {/* <div className="container-fluid" style={{ background: "#fff", padding: 0 }}>
        <section className="section-1" data-aos="fade-zoom-in">
          <Section1 />
        </section>
        <section className="section-2" data-aos="fade-zoom-in">
          <Section2 />
        </section>
        <section className="section-3" id="san-pham" data-aos="fade-up">
          <Section3 data={props.data} />
        </section>
        <section className="section-4" data-aos="fade-up">
          <Section4 />
        </section>
      </div> */}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  // let res = await ProductService.getCategories();
  // const desc = [
  //   {
  //     info: "Giải pháp thành lập doanh nghiệp trọn gói, dịch vụ chuyên nghiệp, thủ tục chính xác và nhanh gọn, hoàn thành hồ sơ đúng hẹn.",
  //     url: IconThanhLap.src,
  //   },
  //   {
  //     info: "Thời gian giải quyết nhanh, tư vấn chuyên nghiệp, thủ tục chính xác, không phát sinh chi phí.",
  //     url: IconThayDoi.src,
  //   },
  //   {
  //     info: "Dịch vụ trọn gói đã bao gồm mọi thủ tục soạn nộp hồ sơ và nhận kết quả, trả kết quả đến bạn.",
  //     url: IconTamNgung.src,
  //   },
  //   {
  //     info: "Quy trình tư vấn giải thể chặt chẽ, sự phối hợp của các bộ phận tư vấn thủ tục giải thể công ty được tiến hành nhanh chóng.",
  //     url: IconGiaiThe.src,
  //   },
  // ];
  // let newData = res.data.data.map((item, i) => ({
  //   name: item.name,
  //   info: desc[i].info,
  //   price: item.price,
  //   icon: desc[i].url,
  //   slug: item.slug,
  // }));
  const session = await getSession(ctx);

  console.log("session", session);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  if (session.role.toLowerCase() === "admin") {
    return {
      redirect: {
        permanent: false,
        destination: "/admin",
      },
    };
  }
  if (session.role.toLowerCase() === "user") {
    return {
      redirect: {
        permanent: false,
        destination: "/user",
      },
    };
  }

  // return {
  //   props: {
  //     redirect: {
  //       permanent: false,
  //       destination: "/",
  //     },
  //   },
  // };
};
