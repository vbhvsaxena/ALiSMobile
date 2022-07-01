import AsyncStorage from '@react-native-async-storage/async-storage';

const APIUrl = 'https://s1.aithent.com/ALiS_Mobile_API/api';
// const APIUrl = 'http://172.16.2.73/ALiS_Mobile_API/api';

export const APICall = async (methodName, request) => {
  return await fetch(APIUrl + methodName, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'false',
      'Access-Control-Allow-Methods': 'GET,POST',
      'Access-Control-Allow-Headers':
        'X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma',
      'Access-Control-Expose-Headers': 'Token',
      ClientCode: await AsyncStorage.getItem('clientCode'),
      Token: '',
    },
    body: request,
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;
      if (statusCode == 200 && !!data) return data;
    })
    .catch(error => {
      console.error(error);
      return {name: 'network error', description: ''};
    });

  function processResponse(response) {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1],
    }));
  }
};
