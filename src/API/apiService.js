

export default function APIService(){

    await fetch(APIUrl + '/Mobile/SignIn', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'false',
          'Access-Control-Allow-Methods': 'GET,POST',
          'Access-Control-Allow-Headers':
            'X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma',
          'Access-Control-Expose-Headers': 'Token',
          ClientCode: 'NVDPBH',
          Token: '',
        }
      })
}

// export const APIurl = 'http://172.16.2.142/ALiS3.0_API/api/';