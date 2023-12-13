import React, { useEffect, useState } from 'react';
import { Dimensions, Linking, ActionSheetIOS, Alert } from 'react-native';
import styled from 'styled-components';
import backArrow from '../assets/backArrow.png';
import BackgroundScroll from '../components/bgScrollView';
import { NavigationActions, StackActions } from 'react-navigation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getData, storeData, debounce } from '../backend/asyncStorage';

const BackButton = styled.Image`
  margin-left: 20px;
  margin-top: auto;
  margin-bottom: auto;
`
const HeaderSelectionBox = styled.View`
  width: 60px;
  height: 100%;
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

  const [message, setMessage] = useState("");

  const _getBccRecipients = () => {
    let bccRecipients = [];
    const selectedClients = props.navigation.getParam('selectedClients');

    for (key of Object.keys(selectedClients)) {
      bccRecipients.push(selectedClients[key].email)
    }
    return bccRecipients;
  }
  
  const _getBodyMail = (message) => {
    let body = ``;

    const selectedItems = props.navigation.getParam('selectedItems');
    const selectedDetails = props.navigation.getParam('selectedDetails');
    let selectedItemsKeys = Object.keys(selectedItems);

    //if theres a message, add it
    if (message) { 
      body += `${message}\n\n\n\n\n`
    }

    selectedItemsKeys.map(key => {
      let name = selectedItems[key].name;
      if (selectedDetails.includes('Name')) {
        body += `<strong style='font-size: 18px;'>${name}\n</strong>`;
      }
      let category = selectedItems[key].category;
      if (selectedDetails.includes('Category')) {
        body += `${category}\n\n`;
      } else {
        body += `\n`;
      }
      let notes = selectedItems[key].notes;
      if (selectedDetails.includes('Notes') && notes !== '') {
        body += `${notes}\n\n`
      }
      let link = selectedItems[key].link;
      if (selectedDetails.includes('Link') && link !== '') {
        body += `<a href=${link}>${name}</a>\n\n\n`
      } 
    })
    return body;
  }

  const _getBodyGmail = (message) => {
    let body = '';

    const selectedItems = props.navigation.getParam('selectedItems');
    const selectedDetails = props.navigation.getParam('selectedDetails');
    let selectedItemsKeys = Object.keys(selectedItems);
    
    if (message) { 
      body += message;
    }

    selectedItemsKeys.map(key => {
      let name = selectedItems[key].name;
      if (selectedDetails.includes('Name')) {
        body += name;
      }
      let category = selectedItems[key].category;
      if (selectedDetails.includes('Category')) {
        body += category
      } else {
         body += `\n`;
      }
      let notes = selectedItems[key].notes;
      if (selectedDetails.includes('Notes') && notes !== '') {
        body += notes
      }
      let link = selectedItems[key].link;
      if (selectedDetails.includes('Link') && link !== '') {
        body += link
      } 
    })
    return body;
  }

  const _getBodyOutlook = (message) => {
    let body = ``;

    const selectedItems = props.navigation.getParam('selectedItems');
    const selectedDetails = props.navigation.getParam('selectedDetails');
    let selectedItemsKeys = Object.keys(selectedItems);

    if (message) { 
      body += `${message}\n\n\n\n\n`;
    }

    selectedItemsKeys.map(key => {
      let name = selectedItems[key].name;
      if (selectedDetails.includes('Name')) {
        body += `${name}\n`;
      }
      let category = selectedItems[key].category;
      if (selectedDetails.includes('Category')) {
        body += `${category}\n\n`;
      } else {
        body += `\n`;
      }
      let notes = selectedItems[key].notes;
      if (selectedDetails.includes('Notes') && notes !== '') {
        body += `${notes}\n\n`
      }
      let link = selectedItems[key].link;
      if (selectedDetails.includes('Link') && link !== '') {
        body += `${link}\n\n\n`
      } 
    })
    return body;
  }

  const _formatEmail = async (message, callback) => {

    let bcc = _getBccRecipients();
    let mailBody = _getBodyMail(message);
    let gmailBody = _getBodyGmail(message);
    let outlookBody = _getBodyOutlook(message);

    let mail = `mailto:?body=${mailBody}&bcc=${bcc}`;
    let gmail = `googlegmail://co?body=${gmailBody}&bcc=${bcc}`;
    let outlook = `ms-outlook://compose?body=${outlookBody}&bcc=${bcc}`;
 
    
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

  const _getLocallyStoredMessage = async () => {
    let message = await getData('message');
    //if a message exists
    if (message !== null) {
      props.navigation.setParams({ message: message });
      setMessage(message);
    } else {
      //set empty message if there is none.
      props.navigation.setParams({ message: "" });
    }
  }

  useEffect(() => {
    props.navigation.setParams({ formatEmail: _formatEmail });
    _getLocallyStoredMessage();
    this.messagearea.focus();
  }, []);


  return (
    <BackgroundScroll>
      <Message  multiline={true}
                value={message}
                onChangeText={text => _updateMessage(text)}
                ref={(messagearea) => { this.messagearea = messagearea }}/>
    </BackgroundScroll>
  );
}

const _executeSendEmail = (props) => {
  const callback = () => {
    props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'MailSelectItems'})],
    }))
    props.navigation.navigate('Clients');
  }
  let message = props.navigation.getParam('message');
  //store latest message in local storage
  storeData('message', message);
  
  props.navigation.getParam('formatEmail')(message, callback);
}

MailMessage.navigationOptions = (props) => ({
  headerRight: () => (
    <TouchableWithoutFeedback onPress={() => {
      debounce(_executeSendEmail(props), 1000);
    }}>
      <Finish>Finish</Finish>
    </TouchableWithoutFeedback>
  ),
  headerLeft: () => (
    <TouchableWithoutFeedback onPress={() => {
      props.navigation.goBack();
    }}>
      <HeaderSelectionBox>
        <BackButton source={backArrow}/>
      </HeaderSelectionBox>
    </TouchableWithoutFeedback>
  ),
})

export default MailMessage