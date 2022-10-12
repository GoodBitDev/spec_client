import React, {useEffect} from 'react';
import Head from "next/head";

const Yand = () => {

  return (
      <>
        <Head>
          <script src="https://api-maps.yandex.ru/2.1/?apikey=0a26d9e5-5a16-4107-acc2-f9a03f420d24&lang=ru_RU" type="text/javascript" />
        </Head>
        <div id='yandmap' />
      </>
  );
};

export default Yand;
