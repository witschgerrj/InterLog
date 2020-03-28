import React, { useEffect, useState } from 'react';
import { Dimensions, Linking, ActionSheetIOS, Alert } from 'react-native';
import styled from 'styled-components';
import backArrow from '../assets/backArrow.png';
import BackgroundScroll from '../components/bgScrollView';
import { NavigationActions, StackActions } from 'react-navigation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const BackButton = styled.Image`
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 3px;
`
const Finish = styled.Text`
  font-size: 22px;
  color: #248AC9;
  margin-right: 20px;
`
const Message = styled.TextInput`
  height: ${Math.floor(Dimensions.get('window').height)}px;
  margin-bottom: ${Math.floor(Dimensions.get('window').height) * 0.4}px;
  width: 100%;
  padding: 20px;
  color: white;
  font-size: 18px;
`

const MailMessage = (props) => {

  const [message, setMessage] = useState('');

  const _getBccRecipients = () => {
    let bccRecipients = [];
    const selectedClients = props.navigation.getParam('selectedClients');
    let keys = Object.keys(selectedClients);
    keys.map(key => {
      let email = selectedClients[key].email
      bccRecipients.push(email)
    })
    props.navigation.setParams({ bcc: bccRecipients})
  }
  
  const _getBody = () => {
    let body = ``;

    const selectedItems = props.navigation.getParam('selectedItems');
    const selectedDetails = props.navigation.getParam('selectedDetails');
    let selectedItemsKeys = Object.keys(selectedItems);

    selectedItemsKeys.map(key => {
      if (selectedDetails.includes('Name')) {
        let name = selectedItems[key].name;
        body += name;
      }
      if (selectedDetails.includes('Category')) {
        let category = selectedItems[key].category;
        let text = category
        body += text;
      } else {
        body += '';
      }
      if (selectedDetails.includes('Notes')) {
        let notes = selectedItems[key].notes;
        body += notes
      }
      if (selectedDetails.includes('Link')) {
        let link = selectedItems[key].link;
        body += link
      } 
    })
    props.navigation.setParams({ body: body})
  }

  const _formatEmail = async (bcc, body, message, callback) => {
    if (message) { 
      body = message + body;
    }

    let mail = `mailto:?body=${body}&bcc=${bcc}`;
    let gmail = `googlegmail://co?body=${body}&bcc=${bcc}`;
    let outlook = `ms-outlook://compose?body=${body}&bcc=${bcc}`;
    
    let gmailRequest = await Linking.canOpenURL(gmail);
    let outlookRequest = await Linking.canOpenURL(outlook);

    let options = ['Cancel', 'Mail'];

    if (gmailRequest) {
      options.push('Gmail');
    }
    if (outlookRequest) {
      options.push('Outlook');
    }
    
    //Gmail and Outlook will never show when testing through expo.
    ActionSheetIOS.showActionSheetWithOptions({
      options: options,
      cancelButtonIndex: 0,
    },
    (index => {
      switch(index){
        case 1:
          Linking.openURL(mail)
          .then(() => {
            callback();
          })
          .catch(error => {
            Alert.alert(
              'An Issue Occurred',
              'Cannot access Mail.',
            )
          });
          break;
        case 2:
          if (options[2] === 'Gmail') {
            Linking.openURL(gmail)
            .then(() => {
              callback();
            })
            .catch(error => {
              Alert.alert(
                'An Issue Occurred',
                'Cannot access Gmail.',
              )
            });
          } else {
            Linking.openURL(outlook)
            .then(() => {
              callback();
            })
            .catch(error => {
              Alert.alert(
                'An Issue Occurred',
                'Cannot access Outlook.',
              )
            });
          }
          break;
        case 3:
          Linking.openURL(outlook)
          .then(() => {
            callback();
          })
          .catch(error => {
            Alert.alert(
              'An Issue Occurred',
              'Cannot access Outlook.',
            )
          });
          break;
        }
    })
    )

  }

  const _updateMessage = (text) => {
    setMessage(text);
    props.navigation.setParams({ message: text });
  }

  useEffect(() => {
    props.navigation.setParams({ 'formatEmail': _formatEmail });
    _getBody();
    _getBccRecipients();
  }, []);


  return (
    <BackgroundScroll>
      <Message  multiline={true}
                onChangeText={text => _updateMessage(text)}/>
    </BackgroundScroll>
  );
}

MailMessage.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
      const callback = () => {
        props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'MailSelectItems'})],
        }))
        props.navigation.navigate('Clients');
      }
      
      props.navigation.getParam('formatEmail')(props.navigation.getParam('bcc'), 
                                                props.navigation.getParam('body'),
                                                props.navigation.getParam('message'),
                                                callback);

    }}>
    {
      <Finish>Finish</Finish>
    }
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.goBack();
    }}>
      <BackButton source={backArrow}/>
    </TouchableWithoutFeedback>
  ),
})

export default MailMessage;