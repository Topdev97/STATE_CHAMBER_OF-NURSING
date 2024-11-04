/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Linking,
  Alert,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';


import { WebView } from 'react-native-webview';
import { OneSignal } from 'react-native-onesignal';

function App(): React.JSX.Element {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = React.useState(false);
  const hideSearchInputJS = `
    (function() {
      var searchInput = document.querySelector('search[role="search"]');
      if (searchInput) {
        searchInput.style.display = 'none';
      }
    })();
  `;

  const [isLoading, setIsLoading] = useState(true);
  // const openLink = async () => {
  //   try {
  //     const url = 'https://pflegekammer-rlp.de/';
  //     if (await InAppBrowser.isAvailable()) {
  //       const result = await InAppBrowser.open(url, {
  //         // iOS Properties
  //         dismissButtonStyle: 'cancel',
  //         preferredBarTintColor: '#453AA4',
  //         preferredControlTintColor: 'white',
  //         readerMode: false,
  //         animated: true,
  //         modalPresentationStyle: 'fullScreen',
  //         modalTransitionStyle: 'coverVertical',
  //         modalEnabled: true,
  //         enableBarCollapsing: false,
  //         // Android Properties
  //         showTitle: false,
  //         toolbarColor: '#0d9ddb',
  //         secondaryToolbarColor: 'black',
  //         navigationBarColor: 'black',
  //         navigationBarDividerColor: 'white',
  //         enableUrlBarHiding: false,
  //         enableDefaultShare: true,
  //         forceCloseOnRedirection: false,
  //         // Specify full animation resource identifier(package:anim/name)
  //         // or only resource name(in case of animation bundled with app).
  //         animations: {
  //           startEnter: 'slide_in_right',
  //           startExit: 'slide_out_left',
  //           endEnter: 'slide_in_left',
  //           endExit: 'slide_out_right',
  //         },
  //         headers: {
  //           'my-custom-header': 'my custom header value',
  //         },
  //       });
  //       await sleep(800);
  //       Alert.alert(JSON.stringify(result));
  //     } else Linking.openURL(url);
  //   } catch (error: any) {
  //     Alert.alert(error.message);
  //   }
  // };

  useEffect(() => {
    // OneSignal Initialization
    OneSignal.initialize('8c17c838-c4d6-4856-8879-5439e5f10cb3');

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });


    

    const initLoading = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () =>clearTimeout(initLoading);

  }, []); 

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.splashContainer}>
          <Image 
            source={require('./assets/splash.png')} // Replace with the path to your splash image
            style={styles.splashImage}
            resizeMode="contain"
          />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          <WebView
            ref={webViewRef}
            source={{ uri: 'https://pflegekammer-rlp.de/wp-login.php?ismobileapp=1' }}
            injectedJavaScript={hideSearchInputJS}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              Alert.alert("WebView Error", nativeEvent.description);
            }}
            onNavigationStateChange={navState => {
              setCanGoBack(navState.canGoBack);
            }}
          />
          {canGoBack && (
            <TouchableOpacity style={styles.backButton} onPress={() => webViewRef.current?.goBack()}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      )}
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splashImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#0d9ddb',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});


export default App;
