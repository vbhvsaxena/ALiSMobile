import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';

const EmailDetail = () => {
  const APIUrl = 'http://172.16.2.145/ALiS_API/api/';
  const route = useRoute();

  //const _htmlContent=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml"> <head> <style type="text/css"> table.MsoNormalTable { font-size: 10.0pt; font-family: "Times New Roman"; } p.MsoNormal { margin-bottom: .0001pt; font-size: 10.0pt; font-family: "Times New Roman"; margin-left: 0in; margin-right: 0in; margin-top: 0in; } p.ListParagraphCxSpFirst { margin-top: 0in; margin-right: 0in; margin-bottom: 0in; margin-left: .5in; margin-bottom: .0001pt; font-size: 10.0pt; font-family: "Times New Roman"; } p.ListParagraphCxSpLast { margin-top: 0in; margin-right: 0in; margin-bottom: 0in; margin-left: .5in; margin-bottom: .0001pt; font-size: 10.0pt; font-family: "Times New Roman"; } a:link { color: blue; text-decoration: underline; text-underline: single; } </style> <style type="text/css"> p { font-family: Calibri, sans-serif; font-size: 10pt; margin: 7px 5px; } </style></head> <body> <table border="1" cellpadding="0" cellspacing="0" class="MsoNormalTable" style="width: 100%; background: #e3e7eb; border-collapse: collapse; border: none; mso-border-alt: solid windowtext .5pt; mso-padding-alt: 0in 5.4pt 0in 5.4pt; mso-border-insideh: .5pt solid windowtext; mso-border-insidev: .5pt solid windowtext" width="100%"> <colgroup> <col width="649" /> </colgroup> <tr> <td bgcolor="#e3e7eb" height="189" valign="TOP" width="100%"> <p style="margin-bottom: 0in"> Dear <b>VAIBHAV SAXENA</b></p> <p style="margin-bottom: 0in"> Thank you for using NV DPBH online services.</p> <ul> <li> <p style="margin-bottom: 0in"> Your <b>New Dietitian Application</b> has been submitted to <b>Dietitians and Music Therapist</b> of NV DPBH.Your transaction number for this online application is <b>5473</b>. </p> </li> <li> <p style="margin-bottom: 0in"> Make sure that you send all supporting documents for your online application. The application will not be reviewed until all required documents are received. To attach the documents electronically, please login into <a href="http://172.16.2.73/ALISDPBH11.2.1/login.aspx">http://172.16.2.73/ALISDPBH11.2.1/login.aspx</a> and follow the “View Incomplete/Pending Application” link. </p> </li> <li> <p style="margin-bottom: 0in"> Once the review of your application is complete; you will receive an email notification. </p> </li> <li> <p style="margin-bottom: 0in"> To check the status of your online application please login into <a href="http://172.16.2.73/ALISDPBH11.2.1/login.aspx">http://172.16.2.73/ALISDPBH11.2.1/login.aspx</a> and follow the “View Pending Application” link. </p> </li> <li> <p style="margin-bottom: 0in"> This is a system-generated message; please DO NOT reply to this email. If you have any questions, please <b>Dietitians and Music Therapist</b> contact customer service at: <br /><u><a href="mailto:donotreply@del.aithent.com"> donotreply@del.aithent.com</a></u> Please include your transaction number in your communication.</p> </li> </ul> <p style="margin-bottom: 0in"> Thank you,</p> <p class="MsoNormal"> Dietitians and Music Therapist</p> <p class="MsoNormal"> Nevada – Department of Public and Behavioral Health</p><img src='cid:logo' style='float:right'> </td> </tr> </table> </body> </html>`;
  const [EmailData, setEmailData] = useState(null);
   const _htmlContent = EmailData?.Body;

  useEffect(() => {
    GetEmailsData();
  }, []);

  //#region Get Emails Data
  const GetEmailsData = async () => {
    await fetch(APIUrl + '/Mobile/GetEmailLogDetails', {
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
      },
      body: JSON.stringify({
        EmailDetails_Req: {
          EmailLogId: route.params.EmailLogId,
        },
      }),
    })
      .then(processResponse)
      .then(res => {
        const {statusCode, data} = res;

        console.log('statusCode', statusCode);
        console.log('Email Detail data', data);

        if (statusCode == 200 && !!data) setEmailData(data.EmailDetails_Res);
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

  if (EmailData != null) {
    return (
      <ScrollView>
        <View
          style={{
            width: '95%',
            backgroundColor: 'white',
            alignSelf: 'center',
            alignItems: 'center',
            margin: 20,
            padding: 10,
          }}>
          {/* Subject */}
          <View style={{width: '95%', marginTop: 20, flexDirection: 'column'}}>
            <Text style={{fontSize: 22}}>Subject</Text>
            <TextInput
              editable={false}
              style={{
                backgroundColor: '#f2f2f2',
                fontSize: 22,
                flex: 1,
                flexWrap: 'wrap',
                height: 'auto',
              }}
              value={EmailData.Subject}></TextInput>
          </View>
          {/* From */}
          <View style={{width: '95%', margin: 10}}>
            <Text style={{fontSize: 22}}>From</Text>
            <TextInput
              editable={false}
              style={{backgroundColor: '#f2f2f2', fontSize: 22}}
              value={EmailData.FromEmail}></TextInput>
          </View>
          {/* To */}
          <View style={{width: '95%', margin: 10}}>
            <Text style={{fontSize: 22}}>To</Text>
            <TextInput
              editable={false}
              style={{backgroundColor: '#f2f2f2', fontSize: 22}}
              value={EmailData.EmailTo}></TextInput>
          </View>
          {/* Date */}
          <View style={{width: '95%', margin: 10}}>
            <Text style={{fontSize: 22}}>Date</Text>
            <TextInput
              editable={false}
              style={{backgroundColor: '#f2f2f2', fontSize: 22}}
              value={EmailData.MailLogDate}></TextInput>
          </View>
          {/* Mail Body */}
          <View style={{width: '95%', margin: 10}}>
            <Text style={{fontSize: 22}}>Body</Text>
            <HTMLView
              value={_htmlContent}
              style={{backgroundColor: '#f2f2f2', fontSize: 22}}
            />
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>No Record found</Text>
      </View>
    );
  }
};

export default EmailDetail;
