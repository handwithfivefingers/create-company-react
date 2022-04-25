import Document, { Html, Head, Main, NextScript } from "next/document";

export default function _Document() {
  return (
    <Html>
      <Head>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Bhaina+2:wght@400;500;600&display=swap"
          rel="stylesheet"
        /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Alata&display=swap" rel="stylesheet" />
        {/* <title>Thành Lập Công Ty</title> */}
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}